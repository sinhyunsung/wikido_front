import type { ViewerProps } from './types'
import { WinIcon } from '../WinIcon'

/**
 * HWP / HWPX viewer — currently a hand-off panel. The format is closed and
 * the only viable JS reader (`hwp.js`) can't round-trip edits, so we punt
 * to the OS default app (Hancom Office, if installed) for both viewing and
 * editing. When/if we add inline preview via hwp.js it goes here.
 */
export function HwpViewer({ path }: ViewerProps): React.JSX.Element {
  return (
    <div className="vw-handoff">
      <div className="vw-handoff-icon">
        <WinIcon name="file" size={32} />
      </div>
      <div className="vw-handoff-title">HWP 파일은 인앱 편집이 지원되지 않습니다</div>
      <p className="vw-handoff-body">
        한컴 오피스가 설치되어 있다면 시스템 기본 앱으로 열 수 있습니다.
        <br />
        텍스트 추출 / 표 변환은 ingest 파이프라인(우측 상단 도구)에서 처리합니다.
      </p>
      <div className="vw-handoff-actions">
        <button className="vw-handoff-btn primary" onClick={() => window.api.shell.openPath(path)}>
          한컴으로 열기
        </button>
      </div>
      <div className="vw-handoff-path">{path}</div>
    </div>
  )
}
