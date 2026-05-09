// shell.jsx — shared chrome: sidebar, topbar, design tokens
// Renders the app shell that every screen sits inside. Pure visual; no routing.

const T = {
  bg: '#f7f7f5',
  panel: '#ffffff',
  ink: '#1a1a1a',
  sub: '#6b6b6b',
  muted: '#9a9a9a',
  line: '#e7e5e0',
  lineSoft: '#efece6',
  accent: '#3949ab',         // indigo, single accent
  accentSoft: '#e8eaf6',
  warn: '#b8741b',           // amber for tax-change alerts
  warnSoft: '#fdf3e3',
  good: '#2e7d4f',
  goodSoft: '#e8f1ec',
  bad: '#b3261e',
  badSoft: '#fbe9e7',
  font: 'Pretendard, "Apple SD Gothic Neo", -apple-system, BlinkMacSystemFont, "Noto Sans KR", system-ui, sans-serif',
  mono: '"JetBrains Mono", "SF Mono", ui-monospace, Menlo, monospace',
};

// inject font + base
if (typeof document !== 'undefined' && !document.getElementById('shell-styles')) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.min.css';
  document.head.appendChild(link);

  const s = document.createElement('style');
  s.id = 'shell-styles';
  s.textContent = `
    .ww-screen{ font-family:${T.font}; color:${T.ink}; background:${T.bg}; width:100%; height:100%; display:flex; }
    .ww-screen *{ box-sizing:border-box; }
    .ww-side{ width:220px; flex:0 0 220px; background:#fbfaf7; border-right:1px solid ${T.line}; display:flex; flex-direction:column; }
    .ww-brand{ padding:18px 18px 14px; display:flex; align-items:center; gap:9px; border-bottom:1px solid ${T.lineSoft}; }
    .ww-brand-mark{ width:24px; height:24px; border-radius:6px; background:${T.ink}; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:12px; letter-spacing:-0.02em; }
    .ww-brand-name{ font-weight:700; font-size:14.5px; letter-spacing:-0.01em; }
    .ww-brand-sub{ font-size:10.5px; color:${T.muted}; margin-left:auto; }
    .ww-nav{ padding:10px 8px; flex:1; overflow:auto; }
    .ww-nav-h{ font-size:10.5px; color:${T.muted}; padding:10px 12px 6px; letter-spacing:0.04em; text-transform:uppercase; }
    .ww-nav-i{ display:flex; align-items:center; gap:9px; padding:7px 10px; border-radius:6px; font-size:13px; color:${T.sub}; cursor:pointer; }
    .ww-nav-i.on{ background:#fff; color:${T.ink}; box-shadow:0 0 0 1px ${T.line}, 0 1px 2px rgba(0,0,0,0.02); font-weight:500; }
    .ww-nav-i:hover:not(.on){ background:${T.lineSoft}; color:${T.ink}; }
    .ww-nav-dot{ width:5px; height:5px; border-radius:50%; background:${T.accent}; margin-left:auto; }
    .ww-nav-num{ margin-left:auto; font-size:11px; color:${T.muted}; }
    .ww-side-foot{ padding:12px; border-top:1px solid ${T.lineSoft}; display:flex; align-items:center; gap:9px; }
    .ww-avatar{ width:28px; height:28px; border-radius:50%; background:${T.accentSoft}; color:${T.accent}; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:600; }
    .ww-user{ display:flex; flex-direction:column; }
    .ww-user-n{ font-size:12.5px; font-weight:500; }
    .ww-user-r{ font-size:10.5px; color:${T.muted}; }

    .ww-main{ flex:1; min-width:0; display:flex; flex-direction:column; }
    .ww-top{ height:52px; flex:0 0 52px; border-bottom:1px solid ${T.line}; background:#fff; display:flex; align-items:center; padding:0 22px; gap:14px; }
    .ww-bcrumb{ display:flex; align-items:center; gap:8px; font-size:12.5px; color:${T.sub}; }
    .ww-bcrumb b{ color:${T.ink}; font-weight:500; }
    .ww-bcrumb-sep{ color:${T.muted}; }
    .ww-search{ flex:1; max-width:520px; height:32px; border:1px solid ${T.line}; border-radius:7px; padding:0 12px; display:flex; align-items:center; gap:9px; background:#fbfaf7; }
    .ww-search input{ flex:1; border:0; background:transparent; outline:none; font-family:inherit; font-size:13px; color:${T.ink}; }
    .ww-search kbd{ font-family:${T.mono}; font-size:10px; background:#fff; color:${T.muted}; padding:1.5px 5px; border-radius:3px; border:1px solid ${T.line}; }
    .ww-top-act{ display:flex; align-items:center; gap:6px; margin-left:auto; }
    .ww-iconbtn{ width:32px; height:32px; border-radius:7px; display:flex; align-items:center; justify-content:center; color:${T.sub}; cursor:pointer; position:relative; }
    .ww-iconbtn:hover{ background:${T.lineSoft}; color:${T.ink}; }
    .ww-iconbtn .badge{ position:absolute; top:5px; right:5px; width:7px; height:7px; background:${T.warn}; border-radius:50%; border:1.5px solid #fff; }

    .ww-body{ flex:1; overflow:auto; padding:22px 26px; }
    .ww-h1{ font-size:22px; font-weight:700; letter-spacing:-0.02em; }
    .ww-h2{ font-size:15px; font-weight:600; letter-spacing:-0.01em; }
    .ww-h3{ font-size:13px; font-weight:600; letter-spacing:-0.005em; }
    .ww-meta{ font-size:11.5px; color:${T.muted}; }

    .ww-card{ background:#fff; border:1px solid ${T.line}; border-radius:10px; }
    .ww-card-h{ padding:14px 16px 12px; border-bottom:1px solid ${T.lineSoft}; display:flex; align-items:center; gap:10px; }
    .ww-card-b{ padding:14px 16px; }

    .ww-tag{ display:inline-flex; align-items:center; gap:5px; height:22px; padding:0 8px; border-radius:5px; font-size:11.5px; background:${T.lineSoft}; color:${T.sub}; border:1px solid transparent; }
    .ww-tag.year{ background:#fff; border-color:${T.line}; color:${T.ink}; font-family:${T.mono}; font-size:11px; }
    .ww-tag.task{ background:${T.accentSoft}; color:${T.accent}; }
    .ww-tag.co{ background:#f1efea; color:${T.ink}; font-weight:500; }
    .ww-tag.warn{ background:${T.warnSoft}; color:${T.warn}; }
    .ww-tag.good{ background:${T.goodSoft}; color:${T.good}; }
    .ww-tag.bad{ background:${T.badSoft}; color:${T.bad}; }

    .ww-btn{ height:32px; padding:0 13px; border-radius:7px; border:1px solid ${T.line}; background:#fff; font-family:inherit; font-size:12.5px; font-weight:500; color:${T.ink}; cursor:pointer; display:inline-flex; align-items:center; gap:7px; }
    .ww-btn:hover{ background:${T.lineSoft}; }
    .ww-btn.primary{ background:${T.ink}; color:#fff; border-color:${T.ink}; }
    .ww-btn.primary:hover{ background:#000; }
    .ww-btn.accent{ background:${T.accent}; color:#fff; border-color:${T.accent}; }
    .ww-btn.sm{ height:26px; padding:0 10px; font-size:11.5px; }

    .ww-divider{ height:1px; background:${T.lineSoft}; margin:14px 0; }
    .ww-row{ display:flex; align-items:center; gap:10px; }
    .ww-grid{ display:grid; gap:14px; }
    .ww-kv{ display:flex; flex-direction:column; gap:3px; }
    .ww-kv-k{ font-size:11px; color:${T.muted}; }
    .ww-kv-v{ font-size:13px; color:${T.ink}; font-weight:500; }

    /* mini-icons drawn via SVG inline; no external icon font */
    .ico{ width:14px; height:14px; flex:0 0 14px; stroke:currentColor; fill:none; stroke-width:1.6; stroke-linecap:round; stroke-linejoin:round; }
    .ico-lg{ width:16px; height:16px; flex:0 0 16px; }

    /* citation pill — used in wiki bodies */
    .ww-cite{ display:inline-flex; align-items:center; gap:4px; height:18px; padding:0 6px; border-radius:4px; background:${T.accentSoft}; color:${T.accent}; font-size:10.5px; font-family:${T.mono}; vertical-align:middle; margin:0 2px; cursor:pointer; }
    .ww-cite:hover{ background:#dde0f4; }

    /* sparkline default stroke */
    .spark{ stroke:${T.accent}; fill:none; stroke-width:1.8; }
    .spark-area{ fill:${T.accent}; opacity:0.08; }

    /* table */
    .ww-tbl{ width:100%; border-collapse:collapse; font-size:12.5px; }
    .ww-tbl th{ text-align:left; font-weight:500; color:${T.muted}; font-size:11px; padding:8px 10px; border-bottom:1px solid ${T.line}; text-transform:uppercase; letter-spacing:0.04em; }
    .ww-tbl td{ padding:11px 10px; border-bottom:1px solid ${T.lineSoft}; vertical-align:middle; }
    .ww-tbl tr:hover td{ background:${T.lineSoft}; }
    .ww-tbl tr:last-child td{ border-bottom:0; }

    /* placeholder image */
    .ph{ background:repeating-linear-gradient(135deg, #f3f1ec 0 8px, #ebe8e1 8px 16px); display:flex; align-items:center; justify-content:center; color:${T.muted}; font-family:${T.mono}; font-size:10.5px; border-radius:6px; }
  `;
  document.head.appendChild(s);
}

// Tiny inline icons. Keep set minimal.
const Ico = ({ name, lg }) => {
  const cn = 'ico' + (lg ? ' ico-lg' : '');
  switch (name) {
    case 'home': return <svg className={cn} viewBox="0 0 24 24"><path d="M3 12l9-8 9 8"/><path d="M5 10v10h14V10"/></svg>;
    case 'search': return <svg className={cn} viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.5-4.5"/></svg>;
    case 'building': return <svg className={cn} viewBox="0 0 24 24"><path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"/><path d="M16 9h2a2 2 0 0 1 2 2v10"/><path d="M8 7h2M8 11h2M8 15h2"/></svg>;
    case 'book': return <svg className={cn} viewBox="0 0 24 24"><path d="M4 5a2 2 0 0 1 2-2h13v18H6a2 2 0 0 1-2-2V5z"/><path d="M19 17H6a2 2 0 0 0 0 4h13"/></svg>;
    case 'file': return <svg className={cn} viewBox="0 0 24 24"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/></svg>;
    case 'bell': return <svg className={cn} viewBox="0 0 24 24"><path d="M6 8a6 6 0 1 1 12 0c0 7 3 7 3 9H3c0-2 3-2 3-9z"/><path d="M10 21a2 2 0 0 0 4 0"/></svg>;
    case 'check': return <svg className={cn} viewBox="0 0 24 24"><path d="M5 12l5 5 9-11"/></svg>;
    case 'list': return <svg className={cn} viewBox="0 0 24 24"><path d="M9 6h12M9 12h12M9 18h12"/><circle cx="4.5" cy="6" r="1"/><circle cx="4.5" cy="12" r="1"/><circle cx="4.5" cy="18" r="1"/></svg>;
    case 'gauge': return <svg className={cn} viewBox="0 0 24 24"><path d="M3 14a9 9 0 1 1 18 0"/><path d="M12 14l5-3"/></svg>;
    case 'plus': return <svg className={cn} viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>;
    case 'filter': return <svg className={cn} viewBox="0 0 24 24"><path d="M3 5h18l-7 9v6l-4-2v-4z"/></svg>;
    case 'tag': return <svg className={cn} viewBox="0 0 24 24"><path d="M3 13l8-8h7v7l-8 8z"/><circle cx="14.5" cy="9.5" r="1"/></svg>;
    case 'arrow-r': return <svg className={cn} viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>;
    case 'link': return <svg className={cn} viewBox="0 0 24 24"><path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 1 0-5.66-5.66L11 7"/><path d="M14 10a4 4 0 0 0-5.66 0l-3 3A4 4 0 0 0 11 18.66L13 17"/></svg>;
    case 'upload': return <svg className={cn} viewBox="0 0 24 24"><path d="M12 16V4M6 10l6-6 6 6"/><path d="M4 18v2h16v-2"/></svg>;
    case 'doc': return <svg className={cn} viewBox="0 0 24 24"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M9 13h6M9 17h4"/></svg>;
    case 'spark': return <svg className={cn} viewBox="0 0 24 24"><path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z"/></svg>;
    case 'cog': return <svg className={cn} viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8L4.2 7a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>;
    case 'alert': return <svg className={cn} viewBox="0 0 24 24"><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/></svg>;
    case 'clock': return <svg className={cn} viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>;
    case 'folder': return <svg className={cn} viewBox="0 0 24 24"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>;
    case 'chart': return <svg className={cn} viewBox="0 0 24 24"><path d="M3 21h18"/><path d="M6 17V9M11 17V5M16 17v-7M21 17V12"/></svg>;
    case 'users': return <svg className={cn} viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.5"/><path d="M2 20a7 7 0 0 1 14 0"/><circle cx="17" cy="8" r="2.5"/><path d="M22 19a5 5 0 0 0-6-4.9"/></svg>;
    case 'kebab': return <svg className={cn} viewBox="0 0 24 24"><circle cx="12" cy="6" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="12" cy="18" r="1.2"/></svg>;
    case 'ext': return <svg className={cn} viewBox="0 0 24 24"><path d="M14 4h6v6"/><path d="M20 4l-9 9"/><path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/></svg>;
    case 'down': return <svg className={cn} viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>;
    case 'sort': return <svg className={cn} viewBox="0 0 24 24"><path d="M7 4v16M4 17l3 3 3-3M17 20V4M14 7l3-3 3 3"/></svg>;
    case 'eye': return <svg className={cn} viewBox="0 0 24 24"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>;
    case 'sigma': return <svg className={cn} viewBox="0 0 24 24"><path d="M19 4H6l7 8-7 8h13"/></svg>;
    default: return null;
  }
};

const SideNav = ({ active = 'home', alerts = 3 }) => {
  const items = [
    { g: '메인', items: [
      { id: 'home', label: '대시보드', icon: 'home' },
      { id: 'search', label: '통합 검색', icon: 'search' },
      { id: 'alerts', label: '세법 변경 알림', icon: 'bell', dot: alerts },
    ]},
    { g: '위키', items: [
      { id: 'wiki', label: '위키 문서', icon: 'book' },
      { id: 'companies', label: '회사별 영구조서', icon: 'building' },
      { id: 'cases', label: '유사 케이스', icon: 'spark' },
    ]},
    { g: '자료', items: [
      { id: 'files', label: '파일 라이브러리', icon: 'folder' },
      { id: 'upload', label: '업로드 / 태깅', icon: 'upload' },
      { id: 'checklist', label: '세무조정 체크리스트', icon: 'list' },
    ]},
    { g: '관리', items: [
      { id: 'admin', label: '위키 관리', icon: 'gauge' },
      { id: 'settings', label: '설정', icon: 'cog' },
    ]},
  ];
  return (
    <aside className="ww-side">
      <div className="ww-brand">
        <div className="ww-brand-mark">위</div>
        <div>
          <div className="ww-brand-name">위키도</div>
        </div>
        <div className="ww-brand-sub">v0.4</div>
      </div>
      <nav className="ww-nav">
        {items.map((g, gi) => (
          <div key={gi}>
            <div className="ww-nav-h">{g.g}</div>
            {g.items.map(it => (
              <div key={it.id} className={'ww-nav-i ' + (active === it.id ? 'on' : '')}>
                <Ico name={it.icon} />
                <span>{it.label}</span>
                {it.dot ? <span className="ww-nav-num" style={{color: T.warn, fontWeight:600}}>{it.dot}</span> : null}
              </div>
            ))}
          </div>
        ))}
      </nav>
      <div className="ww-side-foot">
        <div className="ww-avatar">김</div>
        <div className="ww-user">
          <span className="ww-user-n">김민지 회계사</span>
          <span className="ww-user-r">감사 1팀 · 매니저</span>
        </div>
      </div>
    </aside>
  );
};

const TopBar = ({ crumbs = [], searchValue = '' }) => (
  <div className="ww-top">
    <div className="ww-bcrumb">
      {crumbs.map((c, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span className="ww-bcrumb-sep">/</span>}
          {i === crumbs.length - 1 ? <b>{c}</b> : <span>{c}</span>}
        </React.Fragment>
      ))}
    </div>
    <div className="ww-search">
      <Ico name="search" />
      <input placeholder="회사 · 업무 · 연도 · 키워드 검색" defaultValue={searchValue} />
      <kbd>⌘K</kbd>
    </div>
    <div className="ww-top-act">
      <div className="ww-iconbtn"><Ico name="upload" lg /></div>
      <div className="ww-iconbtn"><Ico name="bell" lg /><span className="badge"></span></div>
      <div className="ww-iconbtn"><Ico name="cog" lg /></div>
    </div>
  </div>
);

const Shell = ({ active, crumbs, search, children }) => (
  <div className="ww-screen">
    <SideNav active={active} />
    <div className="ww-main">
      <TopBar crumbs={crumbs} searchValue={search} />
      <div className="ww-body">{children}</div>
    </div>
  </div>
);

// Cite pill — referenced source
const Cite = ({ n, src }) => <span className="ww-cite" title={src}>[{n}]</span>;

// Sparkline component
const Spark = ({ data, w = 120, h = 32, color = T.accent }) => {
  const max = Math.max(...data), min = Math.min(...data);
  const r = max - min || 1;
  const pts = data.map((v, i) => `${(i/(data.length-1))*w},${h - ((v - min)/r)*(h-4) - 2}`).join(' ');
  const area = `0,${h} ${pts} ${w},${h}`;
  return (
    <svg width={w} height={h} style={{display:'block'}}>
      <polygon points={area} fill={color} opacity="0.08" />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

Object.assign(window, { T, Ico, SideNav, TopBar, Shell, Cite, Spark });
