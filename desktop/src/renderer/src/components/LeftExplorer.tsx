import { useEffect, useMemo, useRef, useState } from 'react'
import { WinIcon, type IconName } from './WinIcon'
import { iconForFile, basenameJS } from '../lib/files'
import { onFsChange, emitFsChange } from '../lib/fsEvents'

// ─── Purpose tab (dummy for now — will swap to API once backend lands) ──────

interface PurposeNode {
  id: string
  label: string
  icon: IconName
  open?: boolean
  active?: boolean
  children?: PurposeNode[]
}

const PURPOSE_TREE: PurposeNode[] = [
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

/* Recursive label-substring filter for the purpose tree. Keeps a parent if
   any descendant matches; auto-expands matching subtrees. */
function filterPurpose(node: PurposeNode, q: string): PurposeNode | null {
  if (!q) return node
  const matches = node.label.toLowerCase().includes(q)
  const filteredChildren = (node.children ?? [])
    .map((c) => filterPurpose(c, q))
    .filter((c): c is PurposeNode => c !== null)
  if (matches || filteredChildren.length > 0) {
    return { ...node, children: filteredChildren, open: true }
  }
  return null
}

function PurposeNodeView({
  node,
  depth = 0
}: {
  node: PurposeNode
  depth?: number
}): React.JSX.Element {
  const [open, setOpen] = useState(node.open || false)
  /* Re-sync `open` when the node is rebuilt by the filter (filter sets
     open: true on matches). */
  useEffect(() => setOpen(!!node.open), [node.open])
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
        node.children!.map((c) => <PurposeNodeView key={c.id} node={c} depth={depth + 1} />)}
    </>
  )
}

// ─── Source tab (real filesystem under the chosen target folder) ─────────────

interface DirEntry {
  name: string
  path: string
  isDir: boolean
}

/* Pending creation request, lifted to LeftExplorer so a single inline input
   appears at a time. The folder whose path matches will render the input
   row as the first child. */
type PendingCreate = {
  parentPath: string
  kind: 'folder' | 'file'
  defaultName: string
}

function SourceFolderNode({
  entry,
  depth,
  initialOpen = false,
  onOpenFile,
  onContextMenu,
  pending,
  onCommitCreate,
  onCancelCreate
}: {
  entry: DirEntry
  depth: number
  initialOpen?: boolean
  onOpenFile: (path: string) => void
  onContextMenu: (e: React.MouseEvent, target: DirEntry) => void
  pending: PendingCreate | null
  onCommitCreate: (name: string) => void
  onCancelCreate: () => void
}): React.JSX.Element {
  const [open, setOpen] = useState(initialOpen)
  /* `null` = haven't fetched yet, `[]` = empty folder (or read error). */
  const [children, setChildren] = useState<DirEntry[] | null>(null)
  const [loading, setLoading] = useState(false)

  /* Subscribe to in-app fs changes. When something happens under our path,
     drop the cache so the next render re-fetches. Limited to our exact
     path — children manage their own subscriptions. */
  useEffect(() => {
    return onFsChange((changed) => {
      if (changed === entry.path) setChildren(null)
    })
  }, [entry.path])

  useEffect(() => {
    if (open && children === null && !loading) {
      setLoading(true)
      window.api.fs
        .listDir(entry.path)
        .then((items) => setChildren(items))
        .finally(() => setLoading(false))
    }
  }, [open, children, loading, entry.path])

  /* If a creation request lands while we're collapsed, auto-open so the
     input is actually visible. */
  const isCreatingHere = pending?.parentPath === entry.path
  useEffect(() => {
    if (isCreatingHere && !open) setOpen(true)
  }, [isCreatingHere, open])

  return (
    <>
      <div
        className="tree-row"
        style={{ paddingLeft: 6 + depth * 12 }}
        title={entry.path}
        onClick={() => setOpen(!open)}
        onContextMenu={(e) => {
          e.preventDefault()
          onContextMenu(e, entry)
        }}
      >
        <span className="tree-chev">
          <WinIcon name={open ? 'chevron-down' : 'chevron-right'} size={11} />
        </span>
        <WinIcon name={open ? 'folder-open' : 'folder'} size={13} />
        <span className="tree-label">{entry.name}</span>
      </div>
      {open && isCreatingHere && (
        <CreateInput
          depth={depth + 1}
          kind={pending!.kind}
          defaultName={pending!.defaultName}
          onCommit={onCommitCreate}
          onCancel={onCancelCreate}
        />
      )}
      {open && loading && (
        <div className="tree-row" style={{ paddingLeft: 6 + (depth + 1) * 12, opacity: 0.6 }}>
          <span className="tree-chev">
            <span style={{ width: 11 }} />
          </span>
          <span className="tree-label">읽는 중…</span>
        </div>
      )}
      {open &&
        children &&
        children.map((c) =>
          c.isDir ? (
            <SourceFolderNode
              key={c.path}
              entry={c}
              depth={depth + 1}
              onOpenFile={onOpenFile}
              onContextMenu={onContextMenu}
              pending={pending}
              onCommitCreate={onCommitCreate}
              onCancelCreate={onCancelCreate}
            />
          ) : (
            <SourceFileNode
              key={c.path}
              entry={c}
              depth={depth + 1}
              onOpenFile={onOpenFile}
              onContextMenu={onContextMenu}
            />
          )
        )}
    </>
  )
}

function SourceFileNode({
  entry,
  depth,
  onOpenFile,
  onContextMenu
}: {
  entry: DirEntry
  depth: number
  onOpenFile: (path: string) => void
  onContextMenu: (e: React.MouseEvent, target: DirEntry) => void
}): React.JSX.Element {
  return (
    <div
      className="tree-row"
      style={{ paddingLeft: 6 + depth * 12 }}
      title={entry.path}
      onClick={() => onOpenFile(entry.path)}
      onContextMenu={(e) => {
        e.preventDefault()
        onContextMenu(e, entry)
      }}
    >
      <span className="tree-chev">
        <span style={{ width: 11 }} />
      </span>
      <WinIcon name={iconForFile(entry.name)} size={13} />
      <span className="tree-label">{entry.name}</span>
    </div>
  )
}

/* Inline input for creating a new folder/file. Auto-focuses, selects the
   name stem (before the extension) so the user can retype but keeps the
   `.txt` suffix. Enter commits, Escape cancels, blur with empty cancels. */
function CreateInput({
  depth,
  kind,
  defaultName,
  onCommit,
  onCancel
}: {
  depth: number
  kind: 'folder' | 'file'
  defaultName: string
  onCommit: (name: string) => void
  onCancel: () => void
}): React.JSX.Element {
  const [name, setName] = useState(defaultName)
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.focus()
    /* Select up to but not including the extension, so the user can rename
       the stem without retyping `.txt`. */
    const dot = defaultName.lastIndexOf('.')
    if (kind === 'file' && dot > 0) el.setSelectionRange(0, dot)
    else el.select()
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [])

  const commit = (): void => {
    const trimmed = name.trim()
    if (!trimmed) onCancel()
    else onCommit(trimmed)
  }

  return (
    <div className="tree-row tree-row-input" style={{ paddingLeft: 6 + depth * 12 }}>
      <span className="tree-chev">
        <span style={{ width: 11 }} />
      </span>
      <WinIcon name={kind === 'folder' ? 'folder' : 'file'} size={13} />
      <input
        ref={ref}
        className="tree-input"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
            commit()
          } else if (e.key === 'Escape') {
            e.preventDefault()
            onCancel()
          }
          /* Stop propagation so the row's onClick doesn't fire. */
          e.stopPropagation()
        }}
        onClick={(e) => e.stopPropagation()}
        onBlur={commit}
      />
    </div>
  )
}

// ─── Source-tab search results (flat list from fs:search) ────────────────────

function SearchResults({
  rootPath,
  query,
  onOpenFile
}: {
  rootPath: string
  query: string
  onOpenFile: (path: string) => void
}): React.JSX.Element {
  const [results, setResults] = useState<
    Array<{ name: string; path: string; isDir: boolean; parentPath: string }>
  >([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    /*
     * Defensive layers:
     *   1. Guard against window.api.fs.search being undefined (preload not
     *      reloaded after a dev change can leave the window without it).
     *   2. Always coerce the resolved value to an array — a runtime that
     *      returned null/undefined would otherwise crash on `.length`,
     *      blanking the explorer.
     *   3. .catch so an IPC rejection surfaces as a visible error state
     *      instead of an unhandled promise that leaves us spinning.
     */
    const searchApi = window.api?.fs?.search
    if (typeof searchApi !== 'function') {
      setError('검색 API를 사용할 수 없습니다 (앱을 재시작해 보세요).')
      setLoading(false)
      return () => {
        cancelled = true
      }
    }
    searchApi(rootPath, query)
      .then((r) => {
        if (cancelled) return
        setResults(Array.isArray(r) ? r : [])
      })
      .catch((e) => {
        if (cancelled) return
        console.error('search failed', e)
        setError(String(e))
        setResults([])
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [rootPath, query])

  if (loading)
    return (
      <div className="lex-empty">
        <p>검색 중…</p>
      </div>
    )
  if (error)
    return (
      <div className="lex-empty">
        <p>검색 오류</p>
        <p className="lex-empty-sub">{error}</p>
      </div>
    )
  if (results.length === 0)
    return (
      <div className="lex-empty">
        <p>일치하는 항목 없음</p>
        <p className="lex-empty-sub">
          &quot;{query}&quot; 가 이름에 포함된 파일/폴더가 없습니다.
        </p>
      </div>
    )

  return (
    <div className="lex-results">
      <div className="lex-results-meta">{results.length}건 일치</div>
      {results.map((r) => {
        /* Show the path relative to the target folder, with the leading
           slash trimmed — keeps the row compact in the narrow sidebar. */
        const rel = r.parentPath.startsWith(rootPath)
          ? r.parentPath.slice(rootPath.length).replace(/^[\\/]+/, '')
          : r.parentPath
        return (
          <div
            key={r.path}
            className="tree-row lex-result"
            title={r.path}
            onClick={() => !r.isDir && onOpenFile(r.path)}
          >
            <WinIcon name={r.isDir ? 'folder' : iconForFile(r.name)} size={13} />
            <div className="lex-result-text">
              <span className="tree-label">{r.name}</span>
              {rel && <span className="lex-result-path">{rel}</span>}
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ─── Source tree shell (handles search vs tree mode + create state) ──────────

function SourceTree({
  rootPath,
  onPickTargetFolder,
  onOpenFile,
  query
}: {
  rootPath: string | null
  onPickTargetFolder: () => void
  onOpenFile: (path: string) => void
  query: string
}): React.JSX.Element {
  /* Right-click context menu state. `target` lets us decide which actions
     apply (file vs folder). Pos is in client coords for the floating menu. */
  const [ctx, setCtx] = useState<{ x: number; y: number; target: DirEntry } | null>(null)
  const [pending, setPending] = useState<PendingCreate | null>(null)

  if (!rootPath) {
    return (
      <div className="lex-empty">
        <p>타겟 폴더가 지정되지 않았습니다.</p>
        <p className="lex-empty-sub">
          파일 메뉴 또는 아래 버튼으로 폴더를 지정하면, 그 안의 구조가 여기 표시됩니다.
        </p>
        <button onClick={onPickTargetFolder}>타겟 폴더 지정...</button>
      </div>
    )
  }

  if (query) return <SearchResults rootPath={rootPath} query={query} onOpenFile={onOpenFile} />

  /* Render the chosen folder itself as the root node, expanded by default. */
  const rootEntry: DirEntry = {
    name: basenameJS(rootPath),
    path: rootPath,
    isDir: true
  }

  /* Resolve the parent folder path for "create" actions:
     - right-clicked a folder → create inside it
     - right-clicked a file → create in the file's parent (its own folder) */
  const parentForCreate = (target: DirEntry): string => {
    if (target.isDir) return target.path
    /* basename trick: chop the last segment off the file path to get its
       containing folder. Same logic used in basenameJS but inverted. */
    const trimmed = target.path.replace(/[\\/]+$/, '')
    const idx = Math.max(trimmed.lastIndexOf('/'), trimmed.lastIndexOf('\\'))
    return idx >= 0 ? trimmed.slice(0, idx) : target.path
  }

  const startCreate = (kind: 'folder' | 'file', target: DirEntry): void => {
    setPending({
      parentPath: parentForCreate(target),
      kind,
      defaultName: kind === 'folder' ? '새 폴더' : '새 텍스트.txt'
    })
  }

  const commitCreate = async (name: string): Promise<void> => {
    if (!pending) return
    try {
      if (pending.kind === 'folder') {
        await window.api.fs.createFolder(pending.parentPath, name)
      } else {
        await window.api.fs.createFile(pending.parentPath, name)
      }
      emitFsChange(pending.parentPath)
    } catch (e) {
      /* Keep the input visible so the user can fix and retry. */
      console.error('create failed', e)
      alert(`생성 실패: ${(e as Error).message ?? e}`)
      return
    }
    setPending(null)
  }

  return (
    <>
      <SourceFolderNode
        key={rootPath}
        entry={rootEntry}
        depth={0}
        initialOpen
        onOpenFile={onOpenFile}
        onContextMenu={(e, target) => setCtx({ x: e.clientX, y: e.clientY, target })}
        pending={pending}
        onCommitCreate={commitCreate}
        onCancelCreate={() => setPending(null)}
      />
      {ctx && (
        <TreeContextMenu
          x={ctx.x}
          y={ctx.y}
          target={ctx.target}
          onClose={() => setCtx(null)}
          onNewFolder={() => startCreate('folder', ctx.target)}
          onNewFile={() => startCreate('file', ctx.target)}
          onOpenFile={onOpenFile}
        />
      )}
    </>
  )
}

// ─── Right-click menu for tree rows ──────────────────────────────────────────

function TreeContextMenu({
  x,
  y,
  target,
  onClose,
  onNewFolder,
  onNewFile,
  onOpenFile
}: {
  x: number
  y: number
  target: DirEntry
  onClose: () => void
  onNewFolder: () => void
  onNewFile: () => void
  onOpenFile: (path: string) => void
}): React.JSX.Element {
  const ref = useRef<HTMLDivElement>(null)
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

  useEffect(() => {
    const onDown = (e: MouseEvent): void => {
      if (!ref.current?.contains(e.target as Node)) onClose()
    }
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('mousedown', onDown, true)
    document.addEventListener('keydown', onKey)
    window.addEventListener('blur', onClose)
    return () => {
      document.removeEventListener('mousedown', onDown, true)
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('blur', onClose)
    }
  }, [onClose])

  /* Items differ slightly between file/folder right-clicks; both can spawn
     new items (the tree resolves the right parent). */
  return (
    <div ref={ref} className="ctx-menu" style={{ left: pos.x, top: pos.y }}>
      {!target.isDir && (
        <button
          className="ctx-row"
          onClick={() => {
            onClose()
            onOpenFile(target.path)
          }}
        >
          열기
        </button>
      )}
      <button
        className="ctx-row"
        onClick={() => {
          onClose()
          onNewFolder()
        }}
      >
        새 폴더
      </button>
      <button
        className="ctx-row"
        onClick={() => {
          onClose()
          onNewFile()
        }}
      >
        새 텍스트 파일
      </button>
      <div className="ctx-sep" />
      <button
        className="ctx-row"
        onClick={() => {
          onClose()
          window.api.shell.showInFolder(target.path)
        }}
      >
        폴더에서 보기
      </button>
      <button
        className="ctx-row"
        onClick={() => {
          onClose()
          void navigator.clipboard.writeText(target.path)
        }}
      >
        경로 복사
      </button>
      {!target.isDir && (
        <button
          className="ctx-row"
          onClick={() => {
            onClose()
            void window.api.shell.openPath(target.path)
          }}
        >
          기본 앱으로 열기
        </button>
      )}
    </div>
  )
}

// ─── Explorer ────────────────────────────────────────────────────────────────

interface LeftExplorerProps {
  alertCount: number
  targetPath: string | null
  onPickTargetFolder: () => void
  onOpenFile: (path: string) => void
}

export function LeftExplorer({
  alertCount,
  targetPath,
  onPickTargetFolder,
  onOpenFile
}: LeftExplorerProps): React.JSX.Element {
  const [tab, setTab] = useState<'source' | 'purpose'>('source')
  const [rawQuery, setRawQuery] = useState('')
  const [query, setQuery] = useState('')

  /* Debounce so each keystroke doesn't fire a recursive scan. 200ms feels
     responsive without being aggressive. */
  useEffect(() => {
    const t = setTimeout(() => setQuery(rawQuery.trim()), 200)
    return () => clearTimeout(t)
  }, [rawQuery])

  /* Filter purpose tree in-memory (it's small + always loaded). */
  const purposeFiltered = useMemo(() => {
    if (!query) return PURPOSE_TREE
    const q = query.toLowerCase()
    return PURPOSE_TREE.map((n) => filterPurpose(n, q)).filter(
      (n): n is PurposeNode => n !== null
    )
  }, [query])

  return (
    <div className="leftExplorer">
      <div className="lex-header">
        <div className="lex-title">탐색기</div>
        <div className="lex-actions">
          <button
            className="lex-icon-btn"
            title="타겟 폴더 지정"
            onClick={onPickTargetFolder}
          >
            <WinIcon name="folder" size={12} />
          </button>
          <button className="lex-icon-btn" title="동기화">
            <WinIcon name="sync" size={12} />
          </button>
        </div>
      </div>
      <div className="lex-search">
        <WinIcon name="search" size={12} />
        <input
          placeholder="파일·폴더 이름 검색…"
          value={rawQuery}
          onChange={(e) => setRawQuery(e.target.value)}
        />
        {rawQuery && (
          <button className="lex-search-clear" onClick={() => setRawQuery('')} title="지우기">
            <WinIcon name="x" size={11} />
          </button>
        )}
      </div>
      <div className="lex-tabs">
        <button
          className={'lex-tab' + (tab === 'source' ? ' is-active' : '')}
          onClick={() => setTab('source')}
          title={targetPath ?? '타겟 폴더 미지정'}
        >
          원본
        </button>
        <button
          className={'lex-tab' + (tab === 'purpose' ? ' is-active' : '')}
          onClick={() => setTab('purpose')}
        >
          용도별
        </button>
      </div>
      <div className="lex-tree">
        {tab === 'source' ? (
          <SourceTree
            rootPath={targetPath}
            onPickTargetFolder={onPickTargetFolder}
            onOpenFile={onOpenFile}
            query={query}
          />
        ) : query && purposeFiltered.length === 0 ? (
          <div className="lex-empty">
            <p>일치하는 항목 없음</p>
          </div>
        ) : (
          purposeFiltered.map((n) => <PurposeNodeView key={n.id} node={n} />)
        )}
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
