// WikiDO Desktop — editor view components

const { useState, useRef, useEffect } = React;

function WinIcon({ name, size = 14 }) {
  const s = { width: size, height: size, strokeWidth: 1.5, fill: 'none', stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (name) {
    case 'chevron-right': return <svg viewBox="0 0 24 24" {...s}><path d="m9 6 6 6-6 6"/></svg>;
    case 'chevron-down':  return <svg viewBox="0 0 24 24" {...s}><path d="m6 9 6 6 6-6"/></svg>;
    case 'folder':        return <svg viewBox="0 0 24 24" {...s}><path d="M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>;
    case 'folder-open':   return <svg viewBox="0 0 24 24" {...s}><path d="M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v2"/><path d="m21 10-2 9a2 2 0 0 1-2 1.5H4a2 2 0 0 1-2-2L4 10z"/></svg>;
    case 'file':          return <svg viewBox="0 0 24 24" {...s}><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/></svg>;
    case 'file-md':       return <svg viewBox="0 0 24 24" {...s}><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/><path d="M8 14v3M8 14l1.5 2L11 14v3M14 17v-3M14 17l2-2"/></svg>;
    case 'tag':           return <svg viewBox="0 0 24 24" {...s}><path d="M2 12V4a2 2 0 0 1 2-2h8l10 10-10 10z"/><circle cx="7" cy="7" r="1.5"/></svg>;
    case 'star':          return <svg viewBox="0 0 24 24" {...s}><path d="m12 2 3 7 7 .5-5.5 4.5L18 21l-6-3.5L6 21l1.5-7L2 9.5 9 9z"/></svg>;
    case 'search':        return <svg viewBox="0 0 24 24" {...s}><circle cx="11" cy="11" r="6"/><path d="m20 20-3.5-3.5"/></svg>;
    case 'bell':          return <svg viewBox="0 0 24 24" {...s}><path d="M6 8a6 6 0 1 1 12 0c0 5 2 7 2 7H4s2-2 2-7"/><path d="M10 19a2 2 0 0 0 4 0"/></svg>;
    case 'settings':      return <svg viewBox="0 0 24 24" {...s}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5"/></svg>;
    case 'x':             return <svg viewBox="0 0 24 24" {...s}><path d="m6 6 12 12M18 6 6 18"/></svg>;
    case 'plus':          return <svg viewBox="0 0 24 24" {...s}><path d="M12 5v14M5 12h14"/></svg>;
    case 'sparkle':       return <svg viewBox="0 0 24 24" {...s}><path d="m12 3 1.8 5 5 1.8-5 1.8L12 17l-1.8-5.4L5 9.8l5-1.8z"/></svg>;
    case 'minus':         return <svg viewBox="0 0 24 24" {...s}><path d="M5 12h14"/></svg>;
    case 'square':        return <svg viewBox="0 0 24 24" {...s}><rect x="4" y="4" width="16" height="16" rx="1"/></svg>;
    case 'restore':       return <svg viewBox="0 0 24 24" {...s}><rect x="6" y="6" width="14" height="14" rx="1"/><path d="M4 16V4h12"/></svg>;
    case 'save':          return <svg viewBox="0 0 24 24" {...s}><path d="M5 4h11l4 4v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z"/><path d="M7 4v6h9V4M7 21v-7h10v7"/></svg>;
    case 'table':         return <svg viewBox="0 0 24 24" {...s}><rect x="3" y="4" width="18" height="16" rx="1"/><path d="M3 10h18M9 4v16"/></svg>;
    case 'link':          return <svg viewBox="0 0 24 24" {...s}><path d="M10 14a4 4 0 0 0 5.7 0l3.6-3.6a4 4 0 0 0-5.7-5.7L12 6.3"/><path d="M14 10a4 4 0 0 0-5.7 0l-3.6 3.6a4 4 0 0 0 5.7 5.7L12 17.7"/></svg>;
    case 'send':          return <svg viewBox="0 0 24 24" {...s}><path d="M22 2 11 13M22 2l-7 20-4-9-9-4z"/></svg>;
    case 'sync':          return <svg viewBox="0 0 24 24" {...s}><path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5"/></svg>;
    case 'wifi':          return <svg viewBox="0 0 24 24" {...s}><path d="M5 12a10 10 0 0 1 14 0M8.5 15.5a5 5 0 0 1 7 0"/><circle cx="12" cy="19" r="1" fill="currentColor"/></svg>;
    case 'panel-r':       return <svg viewBox="0 0 24 24" {...s}><rect x="3" y="4" width="18" height="16" rx="1"/><path d="M15 4v16"/></svg>;
    case 'panel-l':       return <svg viewBox="0 0 24 24" {...s}><rect x="3" y="4" width="18" height="16" rx="1"/><path d="M9 4v16"/></svg>;
    default: return null;
  }
}

window.WinIcon = WinIcon;

// ────────── Window chrome ──────────
function TitleBar({ title, onTweaks, panels, setPanels }) {
  return (
    <div className="winTitleBar">
      <div className="wtb-app">
        <div className="wtb-mark">W</div>
        <div className="wtb-name">WikiDO</div>
        <div className="wtb-doc">— {title}</div>
      </div>
      <div className="wtb-spacer" />
      <div className="wtb-actions">
        <button className="wtb-icon" title="좌측 패널 토글" onClick={() => setPanels(p => ({...p, left: !p.left}))}>
          <WinIcon name="panel-l" size={13} />
        </button>
        <button className="wtb-icon" title="우측 패널 토글" onClick={() => setPanels(p => ({...p, right: !p.right}))}>
          <WinIcon name="panel-r" size={13} />
        </button>
        <span className="wtb-divider" />
        <button className="wtb-icon" title="최소화"><WinIcon name="minus" size={13} /></button>
        <button className="wtb-icon" title="최대화"><WinIcon name="restore" size={11} /></button>
        <button className="wtb-icon close" title="닫기"><WinIcon name="x" size={13} /></button>
      </div>
    </div>
  );
}

function MenuBar() {
  const items = [
    { label: '파일', items: ['새 문서  Ctrl+N','새 위키  Ctrl+Shift+N','열기  Ctrl+O','저장  Ctrl+S','다른 이름으로 저장  Ctrl+Shift+S','—','내보내기 (PDF)','인쇄  Ctrl+P','—','종료  Alt+F4'] },
    { label: '편집', items: ['실행 취소  Ctrl+Z','재실행  Ctrl+Y','—','잘라내기  Ctrl+X','복사  Ctrl+C','붙여넣기  Ctrl+V','—','찾기  Ctrl+F','바꾸기  Ctrl+H'] },
    { label: '보기', items: ['좌측 탐색기  Ctrl+B','우측 컨텍스트  Ctrl+Alt+B','명령 팔레트  Ctrl+Shift+P','—','마크다운 미리보기','전체화면  F11'] },
    { label: '도구', items: ['파일 ingest  Ctrl+I','자동 분류 실행','—','체크리스트 동기화','세법 변경 다시 스캔','—','Claude 어시스턴트  Ctrl+J'] },
    { label: '도움말', items: ['단축키 안내','업데이트 확인','정보'] },
  ];
  const [open, setOpen] = useState(null);
  return (
    <div className="winMenuBar">
      {items.map((m, i) => (
        <div key={i} className={"mb-item" + (open === i ? " is-open" : "")}
             onClick={() => setOpen(open === i ? null : i)}
             onMouseEnter={() => open !== null && setOpen(i)}>
          <span><u>{m.label[0]}</u>{m.label.slice(1)}</span>
          {open === i && (
            <div className="mb-menu" onClick={e => e.stopPropagation()}>
              {m.items.map((it, j) => it === '—' ? (
                <div key={j} className="mb-sep" />
              ) : (
                <div key={j} className="mb-row" onClick={() => setOpen(null)}>{it}</div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ────────── Left explorer ──────────
const TREE_DATA = [
  { id: 'companies', label: '회사별', icon: 'folder', open: true, children: [
    { id: 'hanmi', label: '㈜한미산업', icon: 'folder', open: true, children: [
      { id: 'hanmi-2025', label: '2025', icon: 'folder', open: true, children: [
        { id: 'doc-1', label: '한미산업_2025_감사조서.md', icon: 'file-md', active: true },
        { id: 'doc-2', label: '한미산업_2025_세무조정.md', icon: 'file-md' },
        { id: 'doc-3', label: '한미산업_2025_차입금분석.md', icon: 'file-md' },
        { id: 'doc-4', label: '재무제표_초안.xlsx', icon: 'file' },
        { id: 'doc-5', label: '주주명부_2025.pdf', icon: 'file' },
      ]},
      { id: 'hanmi-2024', label: '2024', icon: 'folder', children: [
        { id: 'doc-6', label: '한미산업_2024_감사조서.md', icon: 'file-md' },
        { id: 'doc-7', label: '한미산업_2024_세무조정.md', icon: 'file-md' },
      ]},
      { id: 'hanmi-2023', label: '2023', icon: 'folder' },
      { id: 'hanmi-perm', label: '영구조서', icon: 'folder' },
    ]},
    { id: 'samjeong', label: '삼정정밀(주)', icon: 'folder' },
    { id: 'donghae',  label: '동해해운(주)', icon: 'folder' },
    { id: 'crown',    label: '크라운식품(주)', icon: 'folder' },
    { id: 'nexus',    label: '넥서스소프트(주)', icon: 'folder' },
    { id: 'daea',     label: '대아건설(주)', icon: 'folder' },
    { id: 'kor',      label: '고려패션(주)', icon: 'folder' },
    { id: 'hanil',    label: '한일홀딩스(주)', icon: 'folder' },
  ]},
  { id: 'tasks', label: '업무별', icon: 'folder', open: true, children: [
    { id: 'audit', label: '감사', icon: 'folder', children: [{id:'a1',label:'2025 감사 12건',icon:'file-md'}] },
    { id: 'tax',   label: '세무조정', icon: 'folder' },
    { id: 'val',   label: '가치평가', icon: 'folder' },
    { id: 'adv',   label: '용역', icon: 'folder' },
  ]},
  { id: 'tags', label: '태그별', icon: 'tag', children: [
    { id: 't1', label: '#차입금', icon: 'tag' },
    { id: 't2', label: '#특수관계자거래', icon: 'tag' },
    { id: 't3', label: '#이전가격', icon: 'tag' },
    { id: 't4', label: '#수익인식', icon: 'tag' },
    { id: 't5', label: '#리스(IFRS16)', icon: 'tag' },
    { id: 't6', label: '#가업승계', icon: 'tag' },
  ]},
  { id: 'fav', label: '즐겨찾기', icon: 'star', open: true, children: [
    { id: 'f1', label: '세무조정 체크리스트 (2025)', icon: 'file-md' },
    { id: 'f2', label: '연결재무제표 작성 가이드', icon: 'file-md' },
    { id: 'f3', label: '비상장주식 평가 보충 메모', icon: 'file-md' },
  ]},
];

function TreeNode({ node, depth = 0 }) {
  const [open, setOpen] = useState(node.open || false);
  const hasChildren = node.children && node.children.length > 0;
  return (
    <>
      <div
        className={"tree-row" + (node.active ? " is-active" : "")}
        style={{ paddingLeft: 6 + depth * 12 }}
        onClick={() => hasChildren && setOpen(!open)}
      >
        <span className="tree-chev">
          {hasChildren ? <WinIcon name={open ? 'chevron-down' : 'chevron-right'} size={11} /> : <span style={{width:11}} />}
        </span>
        <WinIcon name={hasChildren ? (open ? 'folder-open' : 'folder') : node.icon} size={13} />
        <span className="tree-label">{node.label}</span>
      </div>
      {open && hasChildren && node.children.map(c => <TreeNode key={c.id} node={c} depth={depth + 1} />)}
    </>
  );
}

function LeftExplorer({ alertCount }) {
  return (
    <div className="leftExplorer">
      <div className="lex-header">
        <div className="lex-title">탐색기</div>
        <div className="lex-actions">
          <button className="lex-icon-btn" title="새 위키"><WinIcon name="plus" size={12} /></button>
          <button className="lex-icon-btn" title="동기화"><WinIcon name="sync" size={12} /></button>
        </div>
      </div>
      <div className="lex-search">
        <WinIcon name="search" size={12} />
        <input placeholder="회사·년도·태그·제목 검색…" />
      </div>
      <div className="lex-filters">
        <span className="lex-pill is-on">전체</span>
        <span className="lex-pill">감사</span>
        <span className="lex-pill">세무</span>
        <span className="lex-pill">2025</span>
      </div>
      <div className="lex-tree">
        {TREE_DATA.map(n => <TreeNode key={n.id} node={n} />)}
      </div>
      <div className="lex-bottom">
        <button className="lex-bot-btn">
          <WinIcon name="bell" size={13} />
          <span>알림</span>
          {alertCount > 0 && <span className="lex-badge">{alertCount}</span>}
        </button>
        <button className="lex-bot-btn">
          <WinIcon name="settings" size={13} />
          <span>설정</span>
        </button>
      </div>
    </div>
  );
}

window.LeftExplorer = LeftExplorer;
window.TitleBar = TitleBar;
window.MenuBar = MenuBar;
