import { useState } from 'react'
import { WinIcon, type IconName } from './WinIcon'
import { MiniSpark } from './MiniSpark'

const RIGHT_TABS: Array<{ id: string; label: string; icon: IconName; badge?: number }> = [
  { id: 'company', label: '회사 정보', icon: 'folder' },
  { id: 'related', label: '관련 위키', icon: 'link' },
  { id: 'alerts', label: '세법 변경', icon: 'bell', badge: 2 },
  { id: 'ai', label: 'Claude', icon: 'sparkle' }
]

function RightCompanyTab(): React.JSX.Element {
  const rev = [120, 180, 240, 310, 420, 580]
  const op = [-15, -8, 5, 22, 48, 92]
  const debt = [80, 95, 110, 130, 120, 59]

  return (
    <div className="rt-pane">
      <div className="rt-co-head">
        <div className="rt-co-mark">한</div>
        <div>
          <div className="rt-co-name">㈜한미산업</div>
          <div className="rt-co-sub">자동차 부품 · 12월 결산 · 자본금 85억</div>
        </div>
      </div>

      <div className="rt-mini-grid">
        <div className="rt-mini">
          <div className="rt-mini-label">매출 (억)</div>
          <div className="rt-mini-row">
            <span className="rt-mini-val mono">580</span>
            <span className="rt-mini-delta up">+38%</span>
          </div>
          <MiniSpark data={rev} color="var(--accent)" width={140} height={22} />
        </div>
        <div className="rt-mini">
          <div className="rt-mini-label">영업이익 (억)</div>
          <div className="rt-mini-row">
            <span className="rt-mini-val mono">92</span>
            <span className="rt-mini-delta up">+92%</span>
          </div>
          <MiniSpark data={op} color="var(--accent-2)" width={140} height={22} />
        </div>
        <div className="rt-mini rt-mini-flag">
          <div className="rt-mini-label">차입금 (억)</div>
          <div className="rt-mini-row">
            <span className="rt-mini-val mono">59</span>
            <span className="rt-mini-delta down">-51%</span>
          </div>
          <MiniSpark data={debt} color="var(--c-alert)" width={140} height={22} />
        </div>
      </div>

      <div className="rt-section-title">
        최근 특이사항{' '}
        <span className="rt-section-tag">
          <WinIcon name="sparkle" size={9} /> AI 추출
        </span>
      </div>
      <ul className="rt-notes">
        <li>
          <span className="rt-note-y mono">2025</span> 한일은행 차입금 만기상환 — 8.5억 → 5.9억
        </li>
        <li>
          <span className="rt-note-y mono">2025</span> 평택공장 가동 (2025.03) — 매출 +12%
        </li>
        <li>
          <span className="rt-note-y mono">2025</span> 대표이사 변경 (김정훈→김도현, 2025.04)
        </li>
        <li>
          <span className="rt-note-y mono">2024</span> 이전가격 신고 대상 신규 편입
        </li>
        <li>
          <span className="rt-note-y mono">2023</span> 비상장주식 평가 수행
        </li>
      </ul>

      <div className="rt-section-title">수행 업무 타임라인</div>
      <div className="rt-tl">
        {[
          { y: '20', items: ['감사', '세무'] },
          { y: '21', items: ['감사', '세무', '용역'] },
          { y: '22', items: ['감사', '세무'] },
          { y: '23', items: ['감사', '세무', '평가'] },
          { y: '24', items: ['감사', '세무', '용역'] },
          { y: '25', items: ['감사', '세무'], active: true }
        ].map((yr) => (
          <div key={yr.y} className={'rt-tl-yr' + (yr.active ? ' is-active' : '')}>
            <div className="rt-tl-y mono">&apos;{yr.y}</div>
            <div className="rt-tl-dots">
              {yr.items.map((t, i) => (
                <span key={i} className={'rt-tl-dot t-' + t} title={t} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="rt-section-title">주요 주주</div>
      <ul className="rt-shr">
        <li>
          <span>박미경 (대표)</span>
          <span className="mono">41%</span>
        </li>
        <li>
          <span>전략적 투자자</span>
          <span className="mono">28%</span>
        </li>
        <li>
          <span>임직원 우리사주</span>
          <span className="mono">8%</span>
        </li>
        <li>
          <span>기타</span>
          <span className="mono">23%</span>
        </li>
      </ul>

      <div className="rt-quick-links">
        <a href="#">
          <WinIcon name="folder" size={11} /> 영구조서 전체 열기
        </a>
        <a href="#">
          <WinIcon name="folder" size={11} /> 2024 감사조서 비교
        </a>
      </div>
    </div>
  )
}

function RightRelatedTab(): React.JSX.Element {
  const items = [
    { type: '이전 연도', t: '한미산업_2024_감사조서.md', sub: '동일 회사 · 작년 동일 업무', score: 97 },
    { type: '유사 케이스', t: '대성바이오_2023_KAM_특수관계자거래.md', sub: '동일 KAM 항목 · 제약·바이오', score: 84 },
    { type: '유사 케이스', t: '한일홀딩스_2024_연결감사.md', sub: '한미산업과 동일 그룹', score: 82 },
    { type: '위키 가이드', t: '특수관계자 거래 — KAM 작성 가이드', sub: '우리회계 위키 · 7개 회사 사례', score: 76 },
    { type: '법규', t: '외부감사법 시행령 §15 KAM 공시 기준', sub: '2025.10 개정', score: 71 },
    { type: '이전 연도', t: '한미산업_2023_감사조서.md', sub: '동일 회사 · 2년 전', score: 68 }
  ]

  return (
    <div className="rt-pane">
      <div className="rt-rel-head">
        <span className="mono">
          <WinIcon name="sparkle" size={11} /> 현재 문서 컨텍스트 기반 자동 추천
        </span>
      </div>
      <ul className="rt-rel-list">
        {items.map((it, i) => (
          <li key={i} className="rt-rel-item">
            <div className="rt-rel-type">{it.type}</div>
            <div className="rt-rel-title">{it.t}</div>
            <div className="rt-rel-sub">{it.sub}</div>
            <div className="rt-rel-score mono">유사도 {it.score}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

function RightAlertsTab(): React.JSX.Element {
  return (
    <div className="rt-pane">
      <div className="rt-alert-head">
        <span className="rt-alert-pulse" />
        <span>
          현재 문서에 영향 가능 — <strong>2건</strong>
        </span>
      </div>
      <div className="rt-alert-card sev-high">
        <div className="rt-alert-title">K-IFRS 1115호 — 변동대가 추정 가이던스 보충</div>
        <div className="rt-alert-meta mono">2025-11-20 · 기업회계기준원</div>
        <p className="rt-alert-body">
          마일스톤·로열티 수익에서 변동대가 제약 적용 시 <em>&quot;매우 높은 가능성&quot;</em> 판단 기준 강화. 현재
          문서의 <span className="rt-alert-tag">@한미산업</span>은 2025.09 기술이전 계약 1건 보유 — 검토 필요.
        </p>
        <div className="rt-alert-actions">
          <button className="rt-alert-btn">체크리스트 항목 추가</button>
          <button className="rt-alert-btn ghost">자세히</button>
        </div>
      </div>
      <div className="rt-alert-card sev-med">
        <div className="rt-alert-title">외부감사법 시행령 — KAM 공시 확대</div>
        <div className="rt-alert-meta mono">2025-10-18 · 금융위원회</div>
        <p className="rt-alert-body">
          자산총액 5,000억 미만 기업도 KAM 공시 권장 범위 확대. 한미산업(자산 1,200억) 해당.
        </p>
        <div className="rt-alert-actions">
          <button className="rt-alert-btn">현재 조서에 KAM 섹션 추가</button>
        </div>
      </div>
      <div className="rt-alert-foot">
        <a href="#">알림 센터 전체 보기 →</a>
      </div>
    </div>
  )
}

type AIMessage =
  | { who: 'user'; text: string }
  | { who: 'ai'; text: string; meta?: string; actions?: string[] }
  | { who: 'ai-table'; rows: string[][] }

function RightAITab(): React.JSX.Element {
  const [msgs, setMsgs] = useState<AIMessage[]>([
    { who: 'user', text: '한미산업의 작년 차입금 변동 요약해줘' },
    {
      who: 'ai',
      text: '㈜한미산업의 차입금은 다음과 같이 변동했습니다.',
      meta: '한미산업/2024/차입금명세서.xlsx · 2024 감사조서'
    },
    {
      who: 'ai-table',
      rows: [
        ['연도', '차입금(억)', '변동'],
        ['2022', '11.0', '+15.8%'],
        ['2023', '13.0', '+18.2%'],
        ['2024', '12.0', '-7.7%'],
        ['2025', '5.9', '-50.8%']
      ]
    },
    {
      who: 'ai',
      text: '핵심 변동: 2025년 8월 한일은행 차입금 5억 만기상환. 평택공장(2023~) 자금 회수 효과로 보입니다. 2024 조서의 "차입금 분석" 메모와 함께 보시면 좋습니다.',
      actions: ['2024 차입금 분석 열기', '현재 조서에 인용 삽입']
    }
  ])
  const [draft, setDraft] = useState('')

  const send = (): void => {
    if (!draft.trim()) return
    setMsgs((m) => [...m, { who: 'user', text: draft }])
    setDraft('')
    /* Mock backend echo so the user sees their message land followed by a
       placeholder "thinking" response — wire up a real RAG client later. */
    setTimeout(
      () =>
        setMsgs((m) => [
          ...m,
          { who: 'ai', text: '검토 중…', meta: '관련 문서 4건 조회 중' }
        ]),
      250
    )
  }

  return (
    <div className="rt-pane rt-ai">
      <div className="rt-ai-context">
        <div className="rt-ai-ctx-label mono">컨텍스트 (자동)</div>
        <div className="rt-ai-ctx-chips">
          <span>@한미산업</span>
          <span>@2025</span>
          <span>현재 조서 (감사)</span>
          <span>+ 영구조서 6건</span>
        </div>
      </div>
      <div className="rt-ai-msgs">
        {msgs.map((m, i) => {
          if (m.who === 'user') {
            return (
              <div key={i} className="rt-ai-msg user">
                {m.text}
              </div>
            )
          }
          if (m.who === 'ai-table') {
            return (
              <div key={i} className="rt-ai-msg ai rt-ai-tbl-wrap">
                <table className="rt-ai-tbl">
                  <thead>
                    <tr>
                      {m.rows[0].map((c, j) => (
                        <th key={j}>{c}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {m.rows.slice(1).map((r, j) => (
                      <tr key={j}>
                        {r.map((c, k) => (
                          <td key={k} className={k > 0 ? 'mono' : ''}>
                            {c}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          }
          return (
            <div key={i} className="rt-ai-msg ai">
              <div className="rt-ai-text">{m.text}</div>
              {m.meta && <div className="rt-ai-meta mono">▾ 출처: {m.meta}</div>}
              {m.actions && (
                <div className="rt-ai-actions">
                  {m.actions.map((a, j) => (
                    <button key={j} className="rt-ai-action">
                      {a}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
      <div className="rt-ai-input">
        <textarea
          rows={2}
          placeholder="Claude에게 질문… (Ctrl+J로 어디서나)"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              send()
            }
          }}
        />
        <button className="rt-ai-send" onClick={send}>
          <WinIcon name="send" size={13} />
        </button>
      </div>
    </div>
  )
}

export function RightContext(): React.JSX.Element {
  const [tab, setTab] = useState('company')

  return (
    <div className="rightContext">
      <div className="rc-tabs">
        {RIGHT_TABS.map((t) => (
          <button
            key={t.id}
            className={'rc-tab' + (tab === t.id ? ' is-active' : '')}
            onClick={() => setTab(t.id)}
          >
            <WinIcon name={t.icon} size={12} />
            <span>{t.label}</span>
            {t.badge && <span className="rc-badge">{t.badge}</span>}
          </button>
        ))}
      </div>
      <div className="rc-body">
        {tab === 'company' && <RightCompanyTab />}
        {tab === 'related' && <RightRelatedTab />}
        {tab === 'alerts' && <RightAlertsTab />}
        {tab === 'ai' && <RightAITab />}
      </div>
    </div>
  )
}
