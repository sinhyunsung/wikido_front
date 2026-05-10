import { useEffect, useRef, useState } from 'react'
import { WinIcon } from './WinIcon'
import { iconForFile } from '../lib/files'
import { ViewerForFile } from './viewers'

/**
 * One open file. `path` doubles as the unique id (paths are unique per
 * filesystem). `dirty` mirrors the active viewer's unsaved state — set by
 * App in response to viewer onDirtyChange callbacks so the tab strip can
 * paint the dirty dot.
 */
export interface EditorTab {
  path: string
  name: string
  dirty?: boolean
}

// ─── Right-click context menu (VS Code-style tab actions) ────────────────────

interface MenuItem {
  label: string
  action: () => void
  disabled?: boolean
  danger?: boolean
}

interface ContextMenuProps {
  x: number
  y: number
  items: Array<MenuItem | 'sep'>
  onClose: () => void
}

function ContextMenu({ x, y, items, onClose }: ContextMenuProps): React.JSX.Element {
  const ref = useRef<HTMLDivElement>(null)
  /* Reposition if the menu would overflow the viewport — flip horizontally /
     pin to bottom edge as needed. Done after first paint so we know our own
     measured size. */
  const [pos, setPos] = useState({ x, y })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    let nx = x
    let ny = y
    if (x + r.width > window.innerWidth) nx = Math.max(4, window.innerWidth - r.width - 4)
    if (y + r.height > window.innerHeight) ny = Math.max(4, window.innerHeight - r.height - 4)
    if (nx !== pos.x || ny !== pos.y) setPos({ x: nx, y: ny })
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [x, y])

  /* Close on outside click, Escape, scroll, or window blur — anything that
     suggests the user moved on. */
  useEffect(() => {
    const onDown = (e: MouseEvent): void => {
      if (!ref.current?.contains(e.target as Node)) onClose()
    }
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') onClose()
    }
    /* mousedown (not click) so the menu closes before the next click target
       receives its own onClick — matches OS native menu feel. */
    document.addEventListener('mousedown', onDown, true)
    document.addEventListener('keydown', onKey)
    window.addEventListener('blur', onClose)
    return () => {
      document.removeEventListener('mousedown', onDown, true)
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('blur', onClose)
    }
  }, [onClose])

  return (
    <div ref={ref} className="ctx-menu" style={{ left: pos.x, top: pos.y }}>
      {items.map((it, i) =>
        it === 'sep' ? (
          <div key={i} className="ctx-sep" />
        ) : (
          <button
            key={i}
            className={'ctx-row' + (it.danger ? ' is-danger' : '')}
            disabled={it.disabled}
            onClick={() => {
              onClose()
              it.action()
            }}
          >
            {it.label}
          </button>
        )
      )}
    </div>
  )
}

// ─── Tab strip ───────────────────────────────────────────────────────────────

interface EditorTabsProps {
  tabs: EditorTab[]
  activeId: string | null
  onActivate: (path: string) => void
  onClose: (path: string) => void
  onCloseOthers: (path: string) => void
  onCloseToRight: (path: string) => void
  onCloseSaved: () => void
  onCloseAll: () => void
}

function EditorTabs({
  tabs,
  activeId,
  onActivate,
  onClose,
  onCloseOthers,
  onCloseToRight,
  onCloseSaved,
  onCloseAll
}: EditorTabsProps): React.JSX.Element {
  const [menu, setMenu] = useState<{ x: number; y: number; path: string } | null>(null)

  const buildItems = (path: string): Array<MenuItem | 'sep'> => {
    const idx = tabs.findIndex((t) => t.path === path)
    const tabsToRight = idx < 0 ? 0 : tabs.length - idx - 1
    const others = tabs.length - 1
    const cleanCount = tabs.filter((t) => !t.dirty).length

    return [
      { label: '닫기', action: () => onClose(path) },
      {
        label: `다른 탭 모두 닫기${others > 0 ? ` (${others})` : ''}`,
        action: () => onCloseOthers(path),
        disabled: others === 0
      },
      {
        label: `오른쪽 탭 모두 닫기${tabsToRight > 0 ? ` (${tabsToRight})` : ''}`,
        action: () => onCloseToRight(path),
        disabled: tabsToRight === 0
      },
      'sep',
      {
        label: `저장된 탭 모두 닫기${cleanCount > 0 ? ` (${cleanCount})` : ''}`,
        action: () => onCloseSaved(),
        disabled: cleanCount === 0
      },
      {
        label: `모두 닫기 (${tabs.length})`,
        action: () => onCloseAll(),
        disabled: tabs.length === 0
      },
      'sep',
      {
        label: '경로 복사',
        action: () => {
          void navigator.clipboard.writeText(path)
        }
      },
      {
        label: '폴더에서 보기',
        action: () => window.api.shell.showInFolder(path)
      },
      {
        label: '기본 앱으로 열기',
        action: () => {
          void window.api.shell.openPath(path)
        }
      }
    ]
  }

  return (
    <>
      <div className="ed-tabs">
        {tabs.map((t) => (
          <div
            key={t.path}
            className={'ed-tab' + (t.path === activeId ? ' is-active' : '')}
            onClick={() => onActivate(t.path)}
            onContextMenu={(e) => {
              e.preventDefault()
              /* Activate the right-clicked tab too — matches VS Code: you
                 can right-click any tab without losing your editing focus
                 on it. */
              onActivate(t.path)
              setMenu({ x: e.clientX, y: e.clientY, path: t.path })
            }}
            /* Middle-click closes — common power-user shortcut. */
            onAuxClick={(e) => {
              if (e.button === 1) {
                e.preventDefault()
                onClose(t.path)
              }
            }}
            title={t.path}
          >
            <WinIcon name={iconForFile(t.name)} size={12} />
            <span className="ed-tab-name">{t.name}</span>
            {t.dirty && <span className="ed-tab-dirty" />}
            <button
              className="ed-tab-close"
              onClick={(e) => {
                e.stopPropagation()
                onClose(t.path)
              }}
            >
              <WinIcon name="x" size={11} />
            </button>
          </div>
        ))}
      </div>
      {menu && (
        <ContextMenu
          x={menu.x}
          y={menu.y}
          items={buildItems(menu.path)}
          onClose={() => setMenu(null)}
        />
      )}
    </>
  )
}

// ─── Toolbar ─────────────────────────────────────────────────────────────────

interface EditorToolbarProps {
  activeTab: EditorTab | null
}

function EditorToolbar({ activeTab }: EditorToolbarProps): React.JSX.Element {
  /* Save/tag/cite are placeholders — the actual save happens inside each
     editable viewer (Ctrl+S). "기본 앱으로 열기" is wired via shell.openPath. */
  return (
    <div className="ed-toolbar">
      <div className="ed-tb-group">
        <button
          className="ed-tb-btn"
          disabled={!activeTab}
          title={activeTab ? `${activeTab.path} 저장 (Ctrl+S)` : ''}
        >
          <WinIcon name="save" size={13} /> 저장 <kbd>Ctrl+S</kbd>
        </button>
        <button className="ed-tb-btn" disabled={!activeTab}>
          <WinIcon name="tag" size={13} /> 태그 추가
        </button>
        <button className="ed-tb-btn" disabled={!activeTab}>
          <WinIcon name="link" size={13} /> 출처 첨부
        </button>
      </div>
      <div className="ed-tb-spacer" />
      <div className="ed-tb-group">
        <button
          className="ed-tb-btn"
          disabled={!activeTab}
          onClick={() => activeTab && window.api.shell.openPath(activeTab.path)}
          title="시스템 기본 앱으로 열기"
        >
          기본 앱으로 열기
        </button>
      </div>
    </div>
  )
}

// ─── Panel ───────────────────────────────────────────────────────────────────

interface EditorPanelProps {
  tabs: EditorTab[]
  activeId: string | null
  onActivate: (path: string) => void
  onClose: (path: string) => void
  onCloseOthers: (path: string) => void
  onCloseToRight: (path: string) => void
  onCloseSaved: () => void
  onCloseAll: () => void
  onDirtyChange: (path: string, dirty: boolean) => void
}

export function EditorPanel({
  tabs,
  activeId,
  onActivate,
  onClose,
  onCloseOthers,
  onCloseToRight,
  onCloseSaved,
  onCloseAll,
  onDirtyChange
}: EditorPanelProps): React.JSX.Element {
  const activeTab = tabs.find((t) => t.path === activeId) ?? null

  return (
    <div className="editorPanel">
      <EditorTabs
        tabs={tabs}
        activeId={activeId}
        onActivate={onActivate}
        onClose={onClose}
        onCloseOthers={onCloseOthers}
        onCloseToRight={onCloseToRight}
        onCloseSaved={onCloseSaved}
        onCloseAll={onCloseAll}
      />
      <EditorToolbar activeTab={activeTab} />
      <div className="ed-body">
        {activeTab ? (
          <ViewerForFile
            path={activeTab.path}
            onDirtyChange={(d) => onDirtyChange(activeTab.path, d)}
          />
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  )
}

function EmptyState(): React.JSX.Element {
  return (
    <div className="ed-empty">
      <div className="ed-empty-title">파일을 선택해 시작하세요</div>
      <div className="ed-empty-sub">
        좌측 탐색기 <b>원본</b> 탭에서 파일을 클릭하면 여기서 열립니다.
        <br />
        지원 형식: 텍스트/코드, 마크다운, 이미지, PDF, DOCX, XLSX, HWP(보기·핸드오프)
      </div>
    </div>
  )
}
