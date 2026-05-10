import { extOf } from '../../lib/files'
import type { ViewerProps } from './types'
import { WinIcon } from '../WinIcon'

/**
 * Fallback for any extension the router doesn't recognize. Same handoff
 * pattern as HwpViewer — tells the user the format isn't supported in-app
 * and offers to open it with the OS default. Used both as the catch-all
 * and as the explicit choice for formats we know we'll never edit (zip,
 * exe, dwg, psd, etc.).
 */
export function UnsupportedViewer({ path }: ViewerProps): React.JSX.Element {
  const ext = extOf(path)
  return (
    <div className="vw-handoff">
      <div className="vw-handoff-icon">
        <WinIcon name="file" size={32} />
      </div>
      <div className="vw-handoff-title">
        지원되지 않는 형식{ext && <span className="vw-handoff-ext"> · .{ext}</span>}
      </div>
      <p className="vw-handoff-body">
        인앱 편집은 지원하지 않습니다. 시스템 기본 앱으로 열거나, 폴더를 직접 열 수 있습니다.
      </p>
      <div className="vw-handoff-actions">
        <button className="vw-handoff-btn primary" onClick={() => window.api.shell.openPath(path)}>
          기본 앱으로 열기
        </button>
      </div>
      <div className="vw-handoff-path">{path}</div>
    </div>
  )
}
