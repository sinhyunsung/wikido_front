// WikiDO Desktop — editor (center) + context (right)

const { useState: useS2, useRef: useR2, useEffect: useE2 } = React;

// ────────── Editor / Tabs ──────────
const INITIAL_TABS = [
  { id: 't1', name: '한미산업_2025_감사조서.md', icon: 'file-md', active: true, dirty: true },
  { id: 't2', name: '법인세_체크리스트.md', icon: 'file-md' },
  { id: 't3', name: '신규 위키 — 마일스톤 수익인식.md', icon: 'file-md', dirty: true },
  { id: 't4', name: '한미산업_차입금명세서.xlsx', icon: 'file' },
];

function EditorTabs({ tabs, activeId, onActivate, onClose }) {
  return (
    <div className="ed-tabs">
      {tabs.map(t => (
        <div key={t.id}
             className={"ed-tab" + (t.id === activeId ? " is-active" : "")}
             onClick={() => onActivate(t.id)}>
          <WinIcon name={t.icon} size={12} />
          <span className="ed-tab-name">{t.name}</span>
          {t.dirty && <span className="ed-tab-dirty" />}
          <button className="ed-tab-close" onClick={(e) => { e.stopPropagation(); onClose(t.id); }}>
            <WinIcon name="x" size={11} />
          </button>
        </div>
      ))}
      <button className="ed-tab-new" title="새 탭"><WinIcon name="plus" size={12} /></button>
    </div>
  );
}

function EditorToolbar() {
  return (
    <div className="ed-toolbar">
      <div className="ed-tb-group">
        <button className="ed-tb-btn"><WinIcon name="save" size={13} /> 저장 <kbd>Ctrl+S</kbd></button>
        <button className="ed-tb-btn"><WinIcon name="tag" size={13} /> 태그 추가</button>
        <button className="ed-tb-btn"><WinIcon name="link" size={13} /> 출처 첨부</button>
      </div>
      <div className="ed-tb-divider" />
      <div className="ed-tb-group">
        <button className="ed-tb-mini" title="굵게"><b>B</b></button>
        <button className="ed-tb-mini" title="기울임"><i>I</i></button>
        <button className="ed-tb-mini" title="제목">H₁</button>
        <button className="ed-tb-mini" title="목록">≡</button>
        <button className="ed-tb-mini" title="표"><WinIcon name="table" size={12} /></button>
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
  );
}

function EditorBody({ showInline, setShowInline }) {
  return (
    <div className="ed-body" onMouseLeave={() => setShowInline(false)}>
      <div className="ed-doc">
        <div className="ed-frontmatter">
          <span className="ed-fm-key">---</span>
          <div className="ed-fm-row"><span className="ed-fm-key">company:</span> <span className="ed-fm-str">㈜한미산업</span></div>
          <div className="ed-fm-row"><span className="ed-fm-key">fiscal_year:</span> <span className="ed-fm-num">2025</span></div>
          <div className="ed-fm-row"><span className="ed-fm-key">work_type:</span> <span className="ed-fm-str">외부감사</span></div>
          <div className="ed-fm-row"><span className="ed-fm-key">tags:</span> [<span className="ed-fm-str">감사, 차입금, 특수관계자거래</span>]</div>
          <div className="ed-fm-row"><span className="ed-fm-key">linked_perm:</span> <span className="ed-fm-link">@hanmi/영구조서</span></div>
          <span className="ed-fm-key">---</span>
        </div>

        <h1 className="ed-h1">㈜한미산업 2025 사업연도 외부감사조서</h1>

        <h2 className="ed-h2">1. 감사 개요</h2>
        <p className="ed-p">
          본 조서는 <span className="ed-link">㈜한미산업</span>의 <strong>제24기(2025.01.01 ~ 2025.12.31)</strong> 재무제표에 대한
          외부감사 결과를 기록한다. 감사인은 우리회계법인이며, 감사기준은 한국회계감사기준(KSA)을 적용한다.
        </p>

        <h2 className="ed-h2">2. 회사 일반사항</h2>
        <ul className="ed-ul">
          <li>업종: 자동차 부품 제조 (KSIC 30310)</li>
          <li>결산월: 12월</li>
          <li>자본금: 8,500,000,000원 (변동 없음)</li>
          <li>대표이사: 김도현 <span className="ed-comment">{'// 2025.04 변경, 김정훈→김도현'}</span></li>
          <li>외감 대상 여부: 예 (자산총액 1,200억)</li>
        </ul>

        <h2 className="ed-h2">3. 주요 변동사항 <span className="ed-h2-tag">자동 추출</span></h2>
        <p className="ed-p ed-llm-block">
          <span className="ed-llm-mark"><WinIcon name="sparkle" size={11} /> WikiDO 자동 요약 — ingest된 파일에서 추출</span>
        </p>
        <ul className="ed-ul">
          <li>
            <strong className="ed-strong">차입금 변동:</strong>{' '}
            전기말 <span className="ed-num">8.5억</span> → 당기말 <span className="ed-num">5.9억</span>{' '}
            <span className="ed-delta-down">(-30.6%)</span>{' '}
            <span className="ed-comment">{'// 한일은행 만기상환 (2025.08)'}</span>
          </li>
          <li><strong className="ed-strong">신규 공장 가동:</strong> 평택공장 2025.03 가동 → 매출 +12%</li>
          <li><strong className="ed-strong">대표이사 변경:</strong> 2025.04, 김정훈 → 김도현</li>
          <li><strong className="ed-strong">특수관계자 거래 확대:</strong> 한일홀딩스向 매출 비중 12% → 18%</li>
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
              <WinIcon name="sparkle" size={11} /> WikiDO 인라인 액션
            </div>
            <button className="ed-inline-action">
              <span className="ed-inline-shortcut">↵</span> 유사 KAM 케이스 3건 검색 (한일홀딩스 그룹)
            </button>
            <button className="ed-inline-action">
              <span className="ed-inline-shortcut">⌥1</span> 영구조서의 "특수관계자 거래" 페이지로 자동 반영
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
  );
}

function EditorPanel({ tabs, setTabs }) {
  const [activeId, setActiveId] = useS2('t1');
  const [showInline, setShowInline] = useS2(false);

  useE2(() => {
    const t = setTimeout(() => setShowInline(true), 800);
    return () => clearTimeout(t);
  }, []);

  const close = (id) => {
    setTabs(prev => {
      const next = prev.filter(t => t.id !== id);
      if (id === activeId && next.length) setActiveId(next[0].id);
      return next;
    });
  };

  return (
    <div className="editorPanel">
      <EditorTabs tabs={tabs} activeId={activeId} onActivate={setActiveId} onClose={close} />
      <EditorToolbar />
      <EditorBody showInline={showInline} setShowInline={setShowInline} />
    </div>
  );
}

// ────────── Right context ──────────
const RIGHT_TABS = [
  { id: 'company', label: '회사 정보', icon: 'folder' },
  { id: 'related', label: '관련 위키', icon: 'link' },
  { id: 'alerts',  label: '세법 변경', icon: 'bell', badge: 2 },
  { id: 'ai',      label: 'Claude', icon: 'sparkle' },
];

function MiniSpark({ data, color = 'currentColor', width = 60, height = 18 }) {
  const min = Math.min(...data), max = Math.max(...data);
  const xs = i => (i / (data.length - 1)) * width;
  const ys = v => height - 1 - ((v - min) / (max - min || 1)) * (height - 2);
  const pts = data.map((v, i) => `${xs(i)},${ys(v)}`).join(' ');
  return (
    <svg width={width} height={height} style={{ display: 'block' }}>
      <polyline fill="none" stroke={color} strokeWidth="1.25" strokeLinecap="round" points={pts} />
    </svg>
  );
}

function RightCompanyTab() {
  const rev  = [120, 180, 240, 310, 420, 580];
  const op   = [-15, -8, 5, 22, 48, 92];
  const debt = [80, 95, 110, 130, 120, 59];
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

      <div className="rt-section-title">최근 특이사항 <span className="rt-section-tag"><WinIcon name="sparkle" size={9}/> AI 추출</span></div>
      <ul className="rt-notes">
        <li><span className="rt-note-y mono">2025</span> 한일은행 차입금 만기상환 — 8.5억 → 5.9억</li>
        <li><span className="rt-note-y mono">2025</span> 평택공장 가동 (2025.03) — 매출 +12%</li>
        <li><span className="rt-note-y mono">2025</span> 대표이사 변경 (김정훈→김도현, 2025.04)</li>
        <li><span className="rt-note-y mono">2024</span> 이전가격 신고 대상 신규 편입</li>
        <li><span className="rt-note-y mono">2023</span> 비상장주식 평가 수행</li>
      </ul>

      <div className="rt-section-title">수행 업무 타임라인</div>
      <div className="rt-tl">
        {[
          {y:'20',items:['감사','세무']},
          {y:'21',items:['감사','세무','용역']},
          {y:'22',items:['감사','세무']},
          {y:'23',items:['감사','세무','평가']},
          {y:'24',items:['감사','세무','용역']},
          {y:'25',items:['감사','세무'],active:true},
        ].map(yr => (
          <div key={yr.y} className={"rt-tl-yr" + (yr.active ? ' is-active' : '')}>
            <div className="rt-tl-y mono">'{yr.y}</div>
            <div className="rt-tl-dots">
              {yr.items.map((t, i) => <span key={i} className={"rt-tl-dot t-" + t} title={t} />)}
            </div>
          </div>
        ))}
      </div>

      <div className="rt-section-title">주요 주주</div>
      <ul className="rt-shr">
        <li><span>박미경 (대표)</span><span className="mono">41%</span></li>
        <li><span>전략적 투자자</span><span className="mono">28%</span></li>
        <li><span>임직원 우리사주</span><span className="mono">8%</span></li>
        <li><span>기타</span><span className="mono">23%</span></li>
      </ul>

      <div className="rt-quick-links">
        <a href="#"><WinIcon name="folder" size={11}/> 영구조서 전체 열기</a>
        <a href="#"><WinIcon name="folder" size={11}/> 2024 감사조서 비교</a>
      </div>
    </div>
  );
}

function RightRelatedTab() {
  const items = [
    { type:'이전 연도', t:'한미산업_2024_감사조서.md', sub:'동일 회사 · 작년 동일 업무', score:97 },
    { type:'유사 케이스', t:'대성바이오_2023_KAM_특수관계자거래.md', sub:'동일 KAM 항목 · 제약·바이오', score:84 },
    { type:'유사 케이스', t:'한일홀딩스_2024_연결감사.md', sub:'한미산업과 동일 그룹', score:82 },
    { type:'위키 가이드', t:'특수관계자 거래 — KAM 작성 가이드', sub:'우리회계 위키 · 7개 회사 사례', score:76 },
    { type:'법규', t:'외부감사법 시행령 §15 KAM 공시 기준', sub:'2025.10 개정', score:71 },
    { type:'이전 연도', t:'한미산업_2023_감사조서.md', sub:'동일 회사 · 2년 전', score:68 },
  ];
  return (
    <div className="rt-pane">
      <div className="rt-rel-head">
        <span className="mono"><WinIcon name="sparkle" size={11}/> 현재 문서 컨텍스트 기반 자동 추천</span>
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
  );
}

function RightAlertsTab() {
  return (
    <div className="rt-pane">
      <div className="rt-alert-head">
        <span className="rt-alert-pulse" />
        <span>현재 문서에 영향 가능 — <strong>2건</strong></span>
      </div>
      <div className="rt-alert-card sev-high">
        <div className="rt-alert-title">K-IFRS 1115호 — 변동대가 추정 가이던스 보충</div>
        <div className="rt-alert-meta mono">2025-11-20 · 기업회계기준원</div>
        <p className="rt-alert-body">
          마일스톤·로열티 수익에서 변동대가 제약 적용 시 <em>"매우 높은 가능성"</em> 판단 기준 강화. 
          현재 문서의 <span className="rt-alert-tag">@한미산업</span>은 2025.09 기술이전 계약 1건 보유 — 검토 필요.
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
  );
}

function RightAITab() {
  const [msgs, setMsgs] = useS2([
    { who: 'user', text: '한미산업의 작년 차입금 변동 요약해줘' },
    { who: 'ai', text: '㈜한미산업의 차입금은 다음과 같이 변동했습니다.', meta: '한미산업/2024/차입금명세서.xlsx · 2024 감사조서' },
    { who: 'ai-table', rows: [
      ['연도', '차입금(억)', '변동'],
      ['2022', '11.0', '+15.8%'],
      ['2023', '13.0', '+18.2%'],
      ['2024', '12.0', '-7.7%'],
      ['2025', '5.9',  '-50.8%'],
    ]},
    { who: 'ai', text: '핵심 변동: 2025년 8월 한일은행 차입금 5억 만기상환. 평택공장(2023~) 자금 회수 효과로 보입니다. 2024 조서의 "차입금 분석" 메모와 함께 보시면 좋습니다.', actions: ['2024 차입금 분석 열기', '현재 조서에 인용 삽입'] },
  ]);
  const [draft, setDraft] = useS2('');

  const send = () => {
    if (!draft.trim()) return;
    setMsgs(m => [...m, { who: 'user', text: draft }]);
    setDraft('');
    setTimeout(() => setMsgs(m => [...m, { who: 'ai', text: '검토 중…', meta: '관련 문서 4건 조회 중' }]), 250);
  };

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
          if (m.who === 'user') return <div key={i} className="rt-ai-msg user">{m.text}</div>;
          if (m.who === 'ai-table') return (
            <div key={i} className="rt-ai-msg ai rt-ai-tbl-wrap">
              <table className="rt-ai-tbl">
                <thead><tr>{m.rows[0].map((c,j) => <th key={j}>{c}</th>)}</tr></thead>
                <tbody>{m.rows.slice(1).map((r,j) => <tr key={j}>{r.map((c,k) => <td key={k} className={k>0?'mono':''}>{c}</td>)}</tr>)}</tbody>
              </table>
            </div>
          );
          return (
            <div key={i} className="rt-ai-msg ai">
              <div className="rt-ai-text">{m.text}</div>
              {m.meta && <div className="rt-ai-meta mono">▾ 출처: {m.meta}</div>}
              {m.actions && (
                <div className="rt-ai-actions">
                  {m.actions.map((a, j) => <button key={j} className="rt-ai-action">{a}</button>)}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="rt-ai-input">
        <textarea
          rows={2}
          placeholder="Claude에게 질문… (Ctrl+J로 어디서나)"
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
        />
        <button className="rt-ai-send" onClick={send}><WinIcon name="send" size={13} /></button>
      </div>
    </div>
  );
}

function RightContext() {
  const [tab, setTab] = useS2('company');
  return (
    <div className="rightContext">
      <div className="rc-tabs">
        {RIGHT_TABS.map(t => (
          <button key={t.id} className={"rc-tab" + (tab === t.id ? " is-active" : "")} onClick={() => setTab(t.id)}>
            <WinIcon name={t.icon} size={12} />
            <span>{t.label}</span>
            {t.badge && <span className="rc-badge">{t.badge}</span>}
          </button>
        ))}
      </div>
      <div className="rc-body">
        {tab === 'company' && <RightCompanyTab />}
        {tab === 'related' && <RightRelatedTab />}
        {tab === 'alerts'  && <RightAlertsTab />}
        {tab === 'ai'      && <RightAITab />}
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="winStatusBar">
      <div className="sb-left">
        <span className="sb-item"><span className="sb-dot ok" /> 자동 저장됨 · 방금</span>
        <span className="sb-sep">|</span>
        <span className="sb-item"><WinIcon name="sync" size={10} /> ingest 진행: <span className="mono">한미산업 / 차입금명세서.xlsx (3/3)</span></span>
        <span className="sb-sep">|</span>
        <span className="sb-item">마지막 동기화 <span className="mono">11:47</span></span>
      </div>
      <div className="sb-right">
        <span className="sb-item">단어 <span className="mono">412</span></span>
        <span className="sb-sep">|</span>
        <span className="sb-item">줄 <span className="mono">38</span></span>
        <span className="sb-sep">|</span>
        <span className="sb-item">UTF-8</span>
        <span className="sb-sep">|</span>
        <span className="sb-item">Markdown</span>
        <span className="sb-sep">|</span>
        <span className="sb-item"><WinIcon name="wifi" size={10}/> 이재훈 · 우리회계법인</span>
      </div>
    </div>
  );
}

window.EditorPanel = EditorPanel;
window.RightContext = RightContext;
window.StatusBar = StatusBar;
window.INITIAL_TABS = INITIAL_TABS;
