import { WinIcon } from './WinIcon'

interface TitleBarProps {
  title: string
  setPanels: React.Dispatch<React.SetStateAction<{ left: boolean; right: boolean }>>
}

/**
 * Custom in-renderer title bar — the OS window is frameless (`frame: false`
 * in main process), so this owns the drag region (CSS `-webkit-app-region`
 * in desktop.css) and the min/maximize/close buttons (wired through the
 * `window.api.window` IPC bridge from preload).
 */
export function TitleBar({ title, setPanels }: TitleBarProps): React.JSX.Element {
  return (
    <div className="winTitleBar">
      <div className="wtb-app">
        <div className="wtb-mark">W</div>
        <div className="wtb-name">WikiDo</div>
        <div className="wtb-doc">— {title}</div>
      </div>
      <div className="wtb-spacer" />
      <div className="wtb-actions">
        <button
          className="wtb-icon"
          title="좌측 패널 토글"
          onClick={() => setPanels((p) => ({ ...p, left: !p.left }))}
        >
          <WinIcon name="panel-l" size={13} />
        </button>
        <button
          className="wtb-icon"
          title="우측 패널 토글"
          onClick={() => setPanels((p) => ({ ...p, right: !p.right }))}
        >
          <WinIcon name="panel-r" size={13} />
        </button>
        <span className="wtb-divider" />
        <button className="wtb-icon" title="최소화" onClick={() => window.api.window.minimize()}>
          <WinIcon name="minus" size={13} />
        </button>
        <button
          className="wtb-icon"
          title="최대화"
          onClick={() => window.api.window.toggleMaximize()}
        >
          <WinIcon name="restore" size={11} />
        </button>
        <button className="wtb-icon close" title="닫기" onClick={() => window.api.window.close()}>
          <WinIcon name="x" size={13} />
        </button>
      </div>
    </div>
  )
}
