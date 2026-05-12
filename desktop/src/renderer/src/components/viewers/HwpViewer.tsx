import { useEffect, useRef, useState } from 'react'
import init, { HwpDocument } from '@rhwp/core'
/* Vite serves the .wasm as a hashed asset and we hand the URL to the
   wasm-bindgen init() so it loads via fetch(). Avoids the runtime hunting
   for the file on disk inside the asar. */
import rhwpWasmUrl from '@rhwp/core/rhwp_bg.wasm?url'
import { extOf } from '../../lib/files'
import type { ViewerProps } from './types'
import { WinIcon } from '../WinIcon'

/**
 * HWP / HWPX viewer powered by @rhwp/core (Rust + WebAssembly).
 *
 * Renders each page as an SVG that mirrors the original layout — text,
 * tables, fonts, images, page geometry — much closer to Hancom's own
 * renderer than the previous html-based libraries we tried (hwp.js /
 * @ssabrojs/hwpxjs both produced flat HTML that lost page chrome).
 *
 * The wasm module is initialized once per app session (lazy) and reused
 * across viewer mounts.
 */

/*
 * The rhwp wasm module calls out to JS for text width measurement during
 * layout (line wrapping, alignment). It expects a `globalThis.measureTextWidth(
 * font: cssFontString, text: string): number` and panics with the
 * "globalThis.measureTextWidth is not a function" error if it's missing.
 *
 * We install a Canvas-backed measurer once. The context + last-set font
 * string are cached because setting ctx.font is the dominant cost when this
 * gets called many thousands of times per page render.
 */
declare global {
  interface Window {
    measureTextWidth?: (font: string, text: string) => number
  }
}

function installMeasureTextWidth(): void {
  if (typeof globalThis.measureTextWidth === 'function') return
  let ctx: CanvasRenderingContext2D | null = null
  let lastFont = ''
  globalThis.measureTextWidth = (font: string, text: string): number => {
    if (!ctx) {
      const c = document.createElement('canvas')
      ctx = c.getContext('2d')
      if (!ctx) return 0
    }
    if (font !== lastFont) {
      ctx.font = font
      lastFont = font
    }
    return ctx.measureText(text).width
  }
}

/* Module-level wasm init promise — first viewer to mount kicks it off,
   later mounts reuse the same promise. Errors reset the cache so a retry
   gets a fresh attempt instead of forever-failing on the stored rejection. */
let wasmInitPromise: Promise<unknown> | null = null
function ensureWasm(): Promise<unknown> {
  if (!wasmInitPromise) {
    installMeasureTextWidth()
    /* Bare URL — the wrapped `{ module_or_path }` form is deprecated and
       produces a console warn on every call. */
    console.log('[hwp] initializing wasm from', rhwpWasmUrl)
    wasmInitPromise = init(rhwpWasmUrl).catch((e) => {
      console.error('[hwp] wasm init failed:', e)
      wasmInitPromise = null
      throw new Error(`WASM 초기화 실패: ${(e as Error).message ?? e}`)
    })
  }
  return wasmInitPromise
}

export function HwpViewer({ path }: ViewerProps): React.JSX.Element {
  const ext = extOf(path)
  const containerRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pageCount, setPageCount] = useState(0)

  useEffect(() => {
    let cancelled = false
    let doc: HwpDocument | null = null
    setLoading(true)
    setError(null)
    setPageCount(0)
    const container = containerRef.current
    if (container) container.innerHTML = ''

    void (async () => {
      try {
        await ensureWasm()
        if (cancelled) return
        const buf = await window.api.fs.readBinary(path)
        if (cancelled || !container) return

        doc = new HwpDocument(new Uint8Array(buf))
        const pages = doc.pageCount()
        setPageCount(pages)

        /* Render each page as an SVG and append. Building an HTML string
           and assigning innerHTML once is cheaper than appendChild per
           page for large docs, but we want the user to see pages stream
           in for very long docs — chunk by 8 with a yield in between so
           the UI stays responsive. */
        const chunks: string[] = []
        for (let i = 0; i < pages; i++) {
          if (cancelled) return
          /* Each SVG already carries its own width/height from the
             original page geometry. We wrap in a sheet div for visual
             separation + drop shadow. */
          chunks.push(`<div class="rhwp-sheet">${doc.renderPageSvg(i)}</div>`)
          /* Yield to the event loop every 8 pages so the loading state
             can paint and a path-change cancel can interrupt. */
          if (i % 8 === 7) {
            container.innerHTML = chunks.join('')
            await new Promise((r) => setTimeout(r, 0))
            if (cancelled) return
          }
        }
        if (!cancelled) container.innerHTML = chunks.join('')
      } catch (e) {
        if (!cancelled) {
          const label = ext === 'hwpx' ? 'HWPX' : 'HWP'
          setError(`${label} 파싱 실패: ${(e as Error).message ?? e}`)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()

    return () => {
      cancelled = true
      try {
        doc?.free?.()
      } catch {
        /* free() is the wasm-bindgen handle release; cleanup errors are noise. */
      }
    }
  }, [path, ext])

  return (
    <div className="vw-hwp">
      <div className="vw-docx-banner">
        <span>
          📄 보기 전용 — 편집은 한컴 오피스에서
          {pageCount > 0 && ` · ${pageCount}페이지`}
        </span>
        <button
          className="vw-docx-handoff"
          onClick={() => window.api.shell.openPath(path)}
          title="시스템 기본 앱(한컴 오피스 등)으로 열기"
        >
          한컴으로 열기
        </button>
      </div>
      {loading && <div className="vw-loading">렌더링 중…</div>}
      {error ? (
        <HwpFallback path={path} ext={ext} reason={error} />
      ) : (
        <div className="vw-hwp-pages" ref={containerRef} />
      )}
    </div>
  )
}

function HwpFallback({
  path,
  ext,
  reason
}: {
  path: string
  ext: string
  reason: string
}): React.JSX.Element {
  return (
    <div className="vw-handoff">
      <div className="vw-handoff-icon">
        <WinIcon name="file" size={32} />
      </div>
      <div className="vw-handoff-title">
        인앱 미리보기 불가
        <span className="vw-handoff-ext"> · .{ext}</span>
      </div>
      <p className="vw-handoff-body">{reason}</p>
      <div className="vw-handoff-actions">
        <button
          className="vw-handoff-btn primary"
          onClick={() => window.api.shell.openPath(path)}
        >
          한컴으로 열기
        </button>
      </div>
      <div className="vw-handoff-path">{path}</div>
    </div>
  )
}
