import { useEffect, useRef, useState } from 'react'
/*
 * Use the legacy build — the modern entry assumes Uint8Array.prototype.toHex
 * (Chromium 132+ / Firefox 134+). Electron 33 ships Chromium 130, so the
 * modern build throws "a.toHex is not a function" on first PDF parse.
 * Legacy emits the same API but with the polyfilled byte routines.
 */
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs'
/* Vite-friendly worker import: ?url returns the bundled URL string. We have
   to set workerSrc before any pdf.js call, or it spawns a fake worker on the
   main thread (slow + warns). */
import pdfWorkerUrl from 'pdfjs-dist/legacy/build/pdf.worker.min.mjs?url'
import type { ViewerProps } from './types'

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl

/**
 * Read-only PDF viewer. Loads the file as ArrayBuffer (no file:// needed,
 * keeps the CSP tight) and renders all pages to canvas. Suitable for review;
 * for actual PDF *editing* we'd need PDF-Lib + a richer UI on top.
 */
export function PdfViewer({ path }: ViewerProps): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null)
  const [pageCount, setPageCount] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    setPageCount(0)
    const container = containerRef.current
    if (container) container.innerHTML = ''

    void (async () => {
      try {
        const buf = await window.api.fs.readBinary(path)
        if (cancelled) return
        const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(buf) }).promise
        if (cancelled) return
        setPageCount(pdf.numPages)
        const dpr = window.devicePixelRatio || 1
        for (let i = 1; i <= pdf.numPages; i++) {
          if (cancelled) return
          const page = await pdf.getPage(i)
          /* Pick a render scale that gets a comfortable on-screen size for
             a typical letter/A4 (~600px wide). dpr scaling keeps it sharp on
             hi-DPI displays without changing the layout box size. */
          const baseViewport = page.getViewport({ scale: 1 })
          const targetWidth = 720
          const scale = targetWidth / baseViewport.width
          const viewport = page.getViewport({ scale: scale * dpr })

          const canvas = document.createElement('canvas')
          canvas.width = viewport.width
          canvas.height = viewport.height
          canvas.style.width = `${viewport.width / dpr}px`
          canvas.style.height = `${viewport.height / dpr}px`
          const ctx = canvas.getContext('2d')
          if (!ctx) continue
          await page.render({ canvasContext: ctx, viewport, canvas }).promise
          if (cancelled) return
          container?.appendChild(canvas)
        }
      } catch (e) {
        if (!cancelled) setError(String(e))
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [path])

  return (
    <div className="vw-pdf">
      {loading && <div className="vw-loading">렌더링 중…</div>}
      {error && <div className="vw-error">PDF 읽기 실패: {error}</div>}
      {pageCount > 0 && (
        <div className="vw-banner">{pageCount} 페이지 · 보기 전용</div>
      )}
      <div className="vw-pdf-pages" ref={containerRef} />
    </div>
  )
}
