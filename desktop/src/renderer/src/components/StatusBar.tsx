import { WinIcon } from './WinIcon'

/**
 * Status bar — shows ingest progress (Implementation.md §3.5), last sync time,
 * and editor metadata (word count, encoding, mode, user/org). Mock for now.
 */
export function StatusBar(): React.JSX.Element {
  return (
    <div className="winStatusBar">
      <div className="sb-left">
        <span className="sb-item">
          <span className="sb-dot ok" /> 자동 저장됨 · 방금
        </span>
        <span className="sb-sep">|</span>
        <span className="sb-item">
          <WinIcon name="sync" size={10} /> ingest 진행:{' '}
          <span className="mono">한미산업 / 차입금명세서.xlsx (3/3)</span>
        </span>
        <span className="sb-sep">|</span>
        <span className="sb-item">
          마지막 동기화 <span className="mono">11:47</span>
        </span>
      </div>
      <div className="sb-right">
        <span className="sb-item">
          단어 <span className="mono">412</span>
        </span>
        <span className="sb-sep">|</span>
        <span className="sb-item">
          줄 <span className="mono">38</span>
        </span>
        <span className="sb-sep">|</span>
        <span className="sb-item">UTF-8</span>
        <span className="sb-sep">|</span>
        <span className="sb-item">Markdown</span>
        <span className="sb-sep">|</span>
        <span className="sb-item">
          <WinIcon name="wifi" size={10} /> 이재훈 · 우리회계법인
        </span>
      </div>
    </div>
  )
}
