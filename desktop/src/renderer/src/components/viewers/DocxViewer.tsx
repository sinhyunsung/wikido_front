import { useEffect, useRef, useState } from 'react'
import { renderAsync } from 'docx-preview'
import type { ViewerProps } from './types'

/**
 * Read-only docx viewer.
 *
 * Uses `docx-preview` which renders the OOXML directly to a styled HTML
 * approximation — preserves page layout, fonts, table styles, headers/footers,
 * and most direct character formatting. Much higher fidelity than mammoth
 * (which collapses to semantic HTML and discards visual styling on purpose).
 *
 * Editing is intentionally not supported in-app: docx is a complex format
 * and any HTML-round-trip approach would silently lose features (styles,
 * sections, fields, comments, track changes…). The "Word/한글로 편집"
 * button in the banner hands off to the OS default app for editing — fully
 * reliable. If lossy in-app edit becomes a requirement, we can add an
 * opt-in TipTap+html-to-docx editor with an explicit "fidelity may be lost"
 * warning.
 */
export function DocxViewer({ path }: ViewerProps): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    const container = containerRef.current
    if (container) container.innerHTML = ''

    void (async () => {
      try {
        const buf = await window.api.fs.readBinary(path)
        if (cancelled || !container) return
        await renderAsync(new Uint8Array(buf), container, undefined, {
          /* Preserve fidelity over performance — we want the rendered page
             to look as close to Word as possible. */
          className: 'docx-page',
          inWrapper: true,
          breakPages: true,
          ignoreLastRenderedPageBreak: true,
          ignoreFonts: false,
          ignoreWidth: false,
          ignoreHeight: false,
          renderHeaders: true,
          renderFooters: true,
          renderFootnotes: true,
          renderEndnotes: true,
          renderChanges: false,
          /* Turn on docx-preview's experimental rendering — picks up more
             complex layouts (nested tables, text frames) at the cost of
             occasional new bugs. Worth the trade for fidelity in our use case. */
          experimental: true,
          trimXmlDeclaration: true,
          /* base64 inline images — no file:/blob: needed at runtime, plays
             nice with strict CSP and survives if the temp folder churns. */
          useBase64URL: true
        })
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
    <div className="vw-docx">
      <div className="vw-docx-banner">
        <span>📄 보기 전용 — 편집은 원본 앱에서 (서식 100% 보존)</span>
        <button
          className="vw-docx-handoff"
          onClick={() => window.api.shell.openPath(path)}
          title="Word / 한컴오피스 등 시스템 기본 앱에서 열기"
        >
          Word/한글로 편집
        </button>
      </div>
      {loading && <div className="vw-loading">렌더링 중…</div>}
      {error && <div className="vw-error">DOCX 렌더링 실패: {error}</div>}
      <div className="vw-docx-pages" ref={containerRef} />
    </div>
  )
}
