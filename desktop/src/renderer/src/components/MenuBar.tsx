import { useState } from 'react'

/*
 * Menu items can be either a separator string ("—") or an object with an
 * optional click action. Items without an action close the menu but don't do
 * anything yet — placeholders for features we haven't wired up.
 */
type MenuRow = { label: string; action?: () => void }
type MenuEntry = MenuRow | '—'

interface MenuColumn {
  label: string
  items: MenuEntry[]
}

interface MenuBarProps {
  onPickTargetFolder: () => void
}

export function MenuBar({ onPickTargetFolder }: MenuBarProps): React.JSX.Element {
  const [open, setOpen] = useState<number | null>(null)

  const columns: MenuColumn[] = [
    {
      label: '파일',
      items: [
        { label: '타겟 폴더 지정...', action: onPickTargetFolder },
        '—',
        { label: '다른 이름으로 저장  Ctrl+Shift+S' },
        '—',
        { label: '내보내기 (PDF)' },
        { label: '인쇄  Ctrl+P' },
        '—',
        { label: '종료  Alt+F4' }
      ]
    },
    {
      label: '편집',
      items: [
        { label: '실행 취소  Ctrl+Z' },
        { label: '재실행  Ctrl+Y' },
        '—',
        { label: '잘라내기  Ctrl+X' },
        { label: '복사  Ctrl+C' },
        { label: '붙여넣기  Ctrl+V' },
        '—',
        { label: '찾기  Ctrl+F' },
        { label: '바꾸기  Ctrl+H' }
      ]
    },
    {
      label: '보기',
      items: [
        { label: '좌측 탐색기  Ctrl+B' },
        { label: '우측 컨텍스트  Ctrl+Alt+B' },
        { label: '명령 팔레트  Ctrl+Shift+P' },
        '—',
        { label: '마크다운 미리보기' },
        { label: '전체화면  F11' }
      ]
    },
    {
      label: '도구',
      items: [
        { label: '파일 ingest  Ctrl+I' },
        { label: '자동 분류 실행' },
        '—',
        { label: '체크리스트 동기화' },
        { label: '세법 변경 다시 스캔' },
        '—',
        { label: 'Claude 어시스턴트  Ctrl+J' }
      ]
    },
    {
      label: '도움말',
      items: [{ label: '단축키 안내' }, { label: '업데이트 확인' }, { label: '정보' }]
    }
  ]

  return (
    <div className="winMenuBar">
      {columns.map((m, i) => (
        <div
          key={i}
          className={'mb-item' + (open === i ? ' is-open' : '')}
          onClick={() => setOpen(open === i ? null : i)}
          onMouseEnter={() => open !== null && setOpen(i)}
        >
          <span>
            <u>{m.label[0]}</u>
            {m.label.slice(1)}
          </span>
          {open === i && (
            <div className="mb-menu" onClick={(e) => e.stopPropagation()}>
              {m.items.map((it, j) =>
                it === '—' ? (
                  <div key={j} className="mb-sep" />
                ) : (
                  <div
                    key={j}
                    className="mb-row"
                    onClick={() => {
                      setOpen(null)
                      it.action?.()
                    }}
                  >
                    {it.label}
                  </div>
                )
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
