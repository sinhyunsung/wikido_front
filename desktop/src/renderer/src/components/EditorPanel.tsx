import { useEffect, useState } from 'react'
import { WinIcon, type IconName } from './WinIcon'

export interface EditorTab {
  id: string
  name: string
  icon: IconName
  active?: boolean
  dirty?: boolean
}

export const INITIAL_TABS: EditorTab[] = [
  { id: 't1', name: '한미산업_2025_감사조서.md', icon: 'file-md', active: true, dirty: true },
  { id: 't2', name: '법인세_체크리스트.md', icon: 'file-md' },
  { id: 't3', name: '신규 위키 — 마일스톤 수익인식.md', icon: 'file-md', dirty: true },
  { id: 't4', name: '한미산업_차입금명세서.xlsx', icon: 'file' }
]

interface EditorTabsProps {
  tabs: EditorTab[]
  activeId: string
  onActivate: (id: string) => void
  onClose: (id: string) => void
}

function EditorTabs({ tabs, activeId, onActivate, onClose }: EditorTabsProps): React.JSX.Element {
  return (
    <div className="ed-tabs">
      {tabs.map((t) => (
        <div
          key={t.id}
          className={'ed-tab' + (t.id === activeId ? ' is-active' : '')}
          onClick={() => onActivate(t.id)}
        >
          <WinIcon name={t.icon} size={12} />
          <span className="ed-tab-name">{t.name}</span>
          {t.dirty && <span className="ed-tab-dirty" />}
          <button
            className="ed-tab-close"
            onClick={(e) => {
              e.stopPropagation()
              onClose(t.id)
            }}
          >
            <WinIcon name="x" size={11} />
          </button>
        </div>
      ))}
      <button className="ed-tab-new" title="새 탭">
        <WinIcon name="plus" size={12} />
      </button>
    </div>
  )
}

function EditorToolbar(): React.JSX.Element {
  return (
    <div className="ed-toolbar">
      <div className="ed-tb-group">
        <button className="ed-tb-btn">
          <WinIcon name="save" size={13} /> 저장 <kbd>Ctrl+S</kbd>
        </button>
        <button className="ed-tb-btn">
          <WinIcon name="tag" size={13} /> 태그 추가
        </button>
        <button className="ed-tb-btn">
          <WinIcon name="link" size={13} /> 출처 첨부
        </button>
      </div>
      <div className="ed-tb-divider" />
      <div className="ed-tb-group">
        <button className="ed-tb-mini" title="굵게">
          <b>B</b>
        </button>
        <button className="ed-tb-mini" title="기울임">
          <i>I</i>
        </button>
        <button className="ed-tb-mini" title="제목">
          H₁
        </button>
        <button className="ed-tb-mini" title="목록">
          ≡
        </button>
        <button className="ed-tb-mini" title="표">
          <WinIcon name="table" size={12} />
        </button>
      </div>
      <div className="ed-tb-divider" />
      <div className="ed-tb-group">
        <button className="ed-tb-btn ed-tb-conv">→ 한글(.hwp) 변환</button>
        <button className="ed-tb-btn ed-tb-conv">→ Excel 표 추출</button>
      </div>
      <div className="ed-tb-spacer" />
      <div className="ed-tb-tags">
        <span className="ed-tag">@한미산업</span>
        <span className="ed-tag">@2025</span>
        <span className="ed-tag">#감사</span>
        <span className="ed-tag">#차입금</span>
      </div>
    </div>
  )
}

interface EditorBodyProps {
  showInline: boolean
  setShowInline: (v: boolean) => void
}

function EditorBody({ showInline, setShowInline }: EditorBodyProps): React.JSX.Element {
  return (
    <div className="ed-body" onMouseLeave={() => setShowInline(false)}>
      <div className="ed-doc">
        <div className="ed-frontmatter">
          <span className="ed-fm-key">---</span>
          <div className="ed-fm-row">
            <span className="ed-fm-key">company:</span> <span className="ed-fm-str">㈜한미산업</span>
          </div>
          <div className="ed-fm-row">
            <span className="ed-fm-key">fiscal_year:</span> <span className="ed-fm-num">2025</span>
          </div>
          <div className="ed-fm-row">
            <span className="ed-fm-key">work_type:</span> <span className="ed-fm-str">외부감사</span>
          </div>
          <div className="ed-fm-row">
            <span className="ed-fm-key">tags:</span> [<span className="ed-fm-str">감사, 차입금, 특수관계자거래</span>]
          </div>
          <div className="ed-fm-row">
            <span className="ed-fm-key">linked_perm:</span>{' '}
            <span className="ed-fm-link">@hanmi/영구조서</span>
          </div>
          <span className="ed-fm-key">---</span>
        </div>

        <h1 className="ed-h1">㈜한미산업 2025 사업연도 외부감사조서</h1>

        <h2 className="ed-h2">1. 감사 개요</h2>
        <p className="ed-p">
          본 조서는 <span className="ed-link">㈜한미산업</span>의{' '}
          <strong>제24기(2025.01.01 ~ 2025.12.31)</strong> 재무제표에 대한 외부감사 결과를
          기록한다. 감사인은 우리회계법인이며, 감사기준은 한국회계감사기준(KSA)을 적용한다.
        </p>

        <h2 className="ed-h2">2. 회사 일반사항</h2>
        <ul className="ed-ul">
          <li>업종: 자동차 부품 제조 (KSIC 30310)</li>
          <li>결산월: 12월</li>
          <li>자본금: 8,500,000,000원 (변동 없음)</li>
          <li>
            대표이사: 김도현 <span className="ed-comment">{'// 2025.04 변경, 김정훈→김도현'}</span>
          </li>
          <li>외감 대상 여부: 예 (자산총액 1,200억)</li>
        </ul>

        <h2 className="ed-h2">
          3. 주요 변동사항 <span className="ed-h2-tag">자동 추출</span>
        </h2>
        <p className="ed-p ed-llm-block">
          <span className="ed-llm-mark">
            <WinIcon name="sparkle" size={11} /> WikiDo 자동 요약 — ingest된 파일에서 추출
          </span>
        </p>
        <ul className="ed-ul">
          <li>
            <strong className="ed-strong">차입금 변동:</strong>{' '}
            전기말 <span className="ed-num">8.5억</span> → 당기말{' '}
            <span className="ed-num">5.9억</span> <span className="ed-delta-down">(-30.6%)</span>{' '}
            <span className="ed-comment">{'// 한일은행 만기상환 (2025.08)'}</span>
          </li>
          <li>
            <strong className="ed-strong">신규 공장 가동:</strong> 평택공장 2025.03 가동 → 매출 +12%
          </li>
          <li>
            <strong className="ed-strong">대표이사 변경:</strong> 2025.04, 김정훈 → 김도현
          </li>
          <li>
            <strong className="ed-strong">특수관계자 거래 확대:</strong> 한일홀딩스向 매출 비중 12% → 18%
          </li>
        </ul>

        <h2 className="ed-h2">4. 핵심감사사항(KAM) 후보</h2>
        <p className="ed-p">
          <span className="ed-cursor-line">
            특수관계자 거래의 적정성 — <span className="ed-cursor"></span>
          </span>
        </p>

        {showInline && (
          <div className="ed-inline-llm">
            <div className="ed-inline-llm-eyebrow">
              <WinIcon name="sparkle" size={11} /> WikiDo 인라인 액션
            </div>
            <button className="ed-inline-action">
              <span className="ed-inline-shortcut">↵</span> 유사 KAM 케이스 3건 검색 (한일홀딩스 그룹)
            </button>
            <button className="ed-inline-action">
              <span className="ed-inline-shortcut">⌥1</span> 영구조서의 &quot;특수관계자 거래&quot; 페이지로 자동 반영
            </button>
            <button className="ed-inline-action">
              <span className="ed-inline-shortcut">⌥2</span> 작년(2024) 동일 항목과 비교 표 삽입
            </button>
            <button className="ed-inline-action">
              <span className="ed-inline-shortcut">⌥3</span> 감사보고서 KAM 문구 초안 생성
            </button>
          </div>
        )}

        <h2 className="ed-h2">5. 위험평가 결과</h2>
        <p className="ed-p ed-placeholder">작성 중…</p>
      </div>
    </div>
  )
}

interface EditorPanelProps {
  tabs: EditorTab[]
  setTabs: React.Dispatch<React.SetStateAction<EditorTab[]>>
}

export function EditorPanel({ tabs, setTabs }: EditorPanelProps): React.JSX.Element {
  const [activeId, setActiveId] = useState('t1')
  const [showInline, setShowInline] = useState(false)

  /* Demo: pop the inline LLM panel after a short delay so the UI shows the
     "auto-suggest after pause" behavior the design implies. */
  useEffect(() => {
    const t = setTimeout(() => setShowInline(true), 800)
    return () => clearTimeout(t)
  }, [])

  const close = (id: string): void => {
    setTabs((prev) => {
      const next = prev.filter((t) => t.id !== id)
      if (id === activeId && next.length) setActiveId(next[0].id)
      return next
    })
  }

  return (
    <div className="editorPanel">
      <EditorTabs tabs={tabs} activeId={activeId} onActivate={setActiveId} onClose={close} />
      <EditorToolbar />
      <EditorBody showInline={showInline} setShowInline={setShowInline} />
    </div>
  )
}
