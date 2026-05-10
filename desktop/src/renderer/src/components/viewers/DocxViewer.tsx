import { useEffect, useState } from 'react'
import mammoth from 'mammoth'
import type { ViewerProps } from './types'

/**
 * Read-only docx viewer. Mammoth converts to semantic HTML — paragraphs,
 * lists, tables, basic styling. Complex layout (multi-column, footnotes,
 * embedded objects) won't survive the conversion. Edit support requires
 * a docx-write round-trip path which we haven't built yet.
 */
export function DocxViewer({ path }: ViewerProps): React.JSX.Element {
  const [html, setHtml] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [warnings, setWarnings] = useState<string[]>([])

  useEffect(() => {
    let cancelled = false
    setHtml(null)
    setError(null)
    setWarnings([])
    window.api.fs
      .readBinary(path)
      .then((buf) => mammoth.convertToHtml({ arrayBuffer: buf }))
      .then((result) => {
        if (cancelled) return
        setHtml(result.value)
        setWarnings(result.messages.map((m) => m.message).slice(0, 5))
      })
      .catch((e) => !cancelled && setError(String(e)))
    return () => {
      cancelled = true
    }
  }, [path])

  if (error) return <div className="vw-error">DOCX 파싱 실패: {error}</div>
  if (html === null) return <div className="vw-loading">변환 중…</div>

  return (
    <div className="vw-docx">
      {warnings.length > 0 && (
        <div className="vw-banner">
          ⚠ 변환 경고 {warnings.length}건 — 일부 서식이 손실되었을 수 있습니다.
        </div>
      )}
      <div className="vw-docx-doc" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}
