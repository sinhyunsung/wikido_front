import { useState } from 'react'
import { WinIcon, type IconName } from './WinIcon'

interface TreeNodeData {
  id: string
  label: string
  icon: IconName
  open?: boolean
  active?: boolean
  children?: TreeNodeData[]
}

const TREE_DATA: TreeNodeData[] = [
  {
    id: 'companies',
    label: '회사별',
    icon: 'folder',
    open: true,
    children: [
      {
        id: 'hanmi',
        label: '㈜한미산업',
        icon: 'folder',
        open: true,
        children: [
          {
            id: 'hanmi-2025',
            label: '2025',
            icon: 'folder',
            open: true,
            children: [
              { id: 'doc-1', label: '한미산업_2025_감사조서.md', icon: 'file-md', active: true },
              { id: 'doc-2', label: '한미산업_2025_세무조정.md', icon: 'file-md' },
              { id: 'doc-3', label: '한미산업_2025_차입금분석.md', icon: 'file-md' },
              { id: 'doc-4', label: '재무제표_초안.xlsx', icon: 'file' },
              { id: 'doc-5', label: '주주명부_2025.pdf', icon: 'file' }
            ]
          },
          {
            id: 'hanmi-2024',
            label: '2024',
            icon: 'folder',
            children: [
              { id: 'doc-6', label: '한미산업_2024_감사조서.md', icon: 'file-md' },
              { id: 'doc-7', label: '한미산업_2024_세무조정.md', icon: 'file-md' }
            ]
          },
          { id: 'hanmi-2023', label: '2023', icon: 'folder' },
          { id: 'hanmi-perm', label: '영구조서', icon: 'folder' }
        ]
      },
      { id: 'samjeong', label: '삼정정밀(주)', icon: 'folder' },
      { id: 'donghae', label: '동해해운(주)', icon: 'folder' },
      { id: 'crown', label: '크라운식품(주)', icon: 'folder' },
      { id: 'nexus', label: '넥서스소프트(주)', icon: 'folder' },
      { id: 'daea', label: '대아건설(주)', icon: 'folder' },
      { id: 'kor', label: '고려패션(주)', icon: 'folder' },
      { id: 'hanil', label: '한일홀딩스(주)', icon: 'folder' }
    ]
  },
  {
    id: 'tasks',
    label: '업무별',
    icon: 'folder',
    open: true,
    children: [
      {
        id: 'audit',
        label: '감사',
        icon: 'folder',
        children: [{ id: 'a1', label: '2025 감사 12건', icon: 'file-md' }]
      },
      { id: 'tax', label: '세무조정', icon: 'folder' },
      { id: 'val', label: '가치평가', icon: 'folder' },
      { id: 'adv', label: '용역', icon: 'folder' }
    ]
  },
  {
    id: 'tags',
    label: '태그별',
    icon: 'tag',
    children: [
      { id: 't1', label: '#차입금', icon: 'tag' },
      { id: 't2', label: '#특수관계자거래', icon: 'tag' },
      { id: 't3', label: '#이전가격', icon: 'tag' },
      { id: 't4', label: '#수익인식', icon: 'tag' },
      { id: 't5', label: '#리스(IFRS16)', icon: 'tag' },
      { id: 't6', label: '#가업승계', icon: 'tag' }
    ]
  },
  {
    id: 'fav',
    label: '즐겨찾기',
    icon: 'star',
    open: true,
    children: [
      { id: 'f1', label: '세무조정 체크리스트 (2025)', icon: 'file-md' },
      { id: 'f2', label: '연결재무제표 작성 가이드', icon: 'file-md' },
      { id: 'f3', label: '비상장주식 평가 보충 메모', icon: 'file-md' }
    ]
  }
]

function TreeNode({ node, depth = 0 }: { node: TreeNodeData; depth?: number }): React.JSX.Element {
  const [open, setOpen] = useState(node.open || false)
  const hasChildren = !!node.children?.length

  return (
    <>
      <div
        className={'tree-row' + (node.active ? ' is-active' : '')}
        style={{ paddingLeft: 6 + depth * 12 }}
        onClick={() => hasChildren && setOpen(!open)}
      >
        <span className="tree-chev">
          {hasChildren ? (
            <WinIcon name={open ? 'chevron-down' : 'chevron-right'} size={11} />
          ) : (
            <span style={{ width: 11 }} />
          )}
        </span>
        <WinIcon name={hasChildren ? (open ? 'folder-open' : 'folder') : node.icon} size={13} />
        <span className="tree-label">{node.label}</span>
      </div>
      {open &&
        hasChildren &&
        node.children!.map((c) => <TreeNode key={c.id} node={c} depth={depth + 1} />)}
    </>
  )
}

interface LeftExplorerProps {
  alertCount: number
}

export function LeftExplorer({ alertCount }: LeftExplorerProps): React.JSX.Element {
  return (
    <div className="leftExplorer">
      <div className="lex-header">
        <div className="lex-title">탐색기</div>
        <div className="lex-actions">
          <button className="lex-icon-btn" title="새 위키">
            <WinIcon name="plus" size={12} />
          </button>
          <button className="lex-icon-btn" title="동기화">
            <WinIcon name="sync" size={12} />
          </button>
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
        {TREE_DATA.map((n) => (
          <TreeNode key={n.id} node={n} />
        ))}
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
  )
}
