import { useState } from 'react'

interface MenuItem {
  label: string
  items: string[]
}

const MENU_ITEMS: MenuItem[] = [
  {
    label: '파일',
    items: [
      '새 문서  Ctrl+N',
      '새 위키  Ctrl+Shift+N',
      '열기  Ctrl+O',
      '저장  Ctrl+S',
      '다른 이름으로 저장  Ctrl+Shift+S',
      '—',
      '내보내기 (PDF)',
      '인쇄  Ctrl+P',
      '—',
      '종료  Alt+F4'
    ]
  },
  {
    label: '편집',
    items: [
      '실행 취소  Ctrl+Z',
      '재실행  Ctrl+Y',
      '—',
      '잘라내기  Ctrl+X',
      '복사  Ctrl+C',
      '붙여넣기  Ctrl+V',
      '—',
      '찾기  Ctrl+F',
      '바꾸기  Ctrl+H'
    ]
  },
  {
    label: '보기',
    items: [
      '좌측 탐색기  Ctrl+B',
      '우측 컨텍스트  Ctrl+Alt+B',
      '명령 팔레트  Ctrl+Shift+P',
      '—',
      '마크다운 미리보기',
      '전체화면  F11'
    ]
  },
  {
    label: '도구',
    items: [
      '파일 ingest  Ctrl+I',
      '자동 분류 실행',
      '—',
      '체크리스트 동기화',
      '세법 변경 다시 스캔',
      '—',
      'Claude 어시스턴트  Ctrl+J'
    ]
  },
  { label: '도움말', items: ['단축키 안내', '업데이트 확인', '정보'] }
]

/**
 * Top menu bar — opens a flyout per menu when clicked. Hovering siblings
 * while one is open switches the active menu without requiring a re-click,
 * matching native menu behavior.
 */
export function MenuBar(): React.JSX.Element {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="winMenuBar">
      {MENU_ITEMS.map((m, i) => (
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
                  <div key={j} className="mb-row" onClick={() => setOpen(null)}>
                    {it}
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
