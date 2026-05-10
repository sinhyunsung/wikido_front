import { useCallback, useEffect, useState } from 'react'
import { TitleBar } from './components/TitleBar'
import { MenuBar } from './components/MenuBar'
import { LeftExplorer } from './components/LeftExplorer'
import { EditorPanel, type EditorTab } from './components/EditorPanel'
import { RightContext } from './components/RightContext'
import { StatusBar } from './components/StatusBar'
import { ErrorBoundary } from './components/ErrorBoundary'
import { basenameJS } from './lib/files'

/**
 * App composition: a 4-row grid (titlebar, menubar, workspace, statusbar).
 * Workspace is a 5-column grid (sidebar, gutter, editor, gutter, right
 * context). The .no-left / .no-right modifier classes collapse a panel
 * column when its toggle is off.
 *
 * Top-level state owns:
 *   - panel visibility flags (left/right)
 *   - the configured target folder (synced from main on mount + via broadcast)
 *   - open editor tabs and which one is active (driven by tree clicks)
 *
 * Tab dirty state lives here too — viewers call back through onDirtyChange
 * so the tab strip can paint the dirty dot. Save itself happens inside the
 * editable viewer (Ctrl+S).
 */
function App(): React.JSX.Element {
  const [panels, setPanels] = useState({ left: true, right: true })
  const [targetPath, setTargetPath] = useState<string | null>(null)
  const [tabs, setTabs] = useState<EditorTab[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const alertCount = 2

  /* Hydrate target folder from main on mount; subscribe to changes. */
  useEffect(() => {
    window.api.targetFolder.get().then(setTargetPath)
    return window.api.targetFolder.onChange(setTargetPath)
  }, [])

  const pickTargetFolder = useCallback(async () => {
    const picked = await window.api.targetFolder.pick()
    if (picked) setTargetPath(picked)
  }, [])

  /* Open a file from the tree. If already open, just activate that tab;
     otherwise add it to the end. New tabs aren't dirty until the viewer
     reports a change. */
  const openFile = useCallback((path: string) => {
    setTabs((prev) => {
      if (prev.some((t) => t.path === path)) return prev
      return [...prev, { path, name: basenameJS(path) }]
    })
    setActiveId(path)
  }, [])

  /* Close a tab. If the closed tab was active, fall back to the neighbor
     to its right (or left at the end of the list). */
  const closeTab = useCallback(
    (path: string) => {
      setTabs((prev) => {
        const idx = prev.findIndex((t) => t.path === path)
        if (idx === -1) return prev
        const next = prev.filter((t) => t.path !== path)
        if (path === activeId) {
          const fallback = next[idx] || next[idx - 1] || null
          setActiveId(fallback ? fallback.path : null)
        }
        return next
      })
    },
    [activeId]
  )

  /* VS Code-style multi-close commands.
     - others:  keep only the named tab
     - right:   close everything strictly after the named tab
     - saved:   close every clean tab; dirty ones stay open
     - all:     close everything */
  const closeOtherTabs = useCallback((path: string) => {
    setTabs((prev) => prev.filter((t) => t.path === path))
    setActiveId(path)
  }, [])

  const closeTabsToRight = useCallback(
    (path: string) => {
      setTabs((prev) => {
        const idx = prev.findIndex((t) => t.path === path)
        if (idx < 0) return prev
        const next = prev.slice(0, idx + 1)
        if (activeId && !next.some((t) => t.path === activeId)) setActiveId(path)
        return next
      })
    },
    [activeId]
  )

  const closeSavedTabs = useCallback(() => {
    setTabs((prev) => {
      const next = prev.filter((t) => t.dirty)
      if (activeId && !next.some((t) => t.path === activeId)) {
        setActiveId(next[0]?.path ?? null)
      }
      return next
    })
  }, [activeId])

  const closeAllTabs = useCallback(() => {
    setTabs([])
    setActiveId(null)
  }, [])

  /* Patch the dirty flag on the named tab. Viewers call this when their
     content diverges from / re-converges with the saved snapshot. */
  const handleDirtyChange = useCallback((path: string, dirty: boolean) => {
    setTabs((prev) => prev.map((t) => (t.path === path ? { ...t, dirty } : t)))
  }, [])

  const wsClass =
    'workspace' + (panels.left ? '' : ' no-left') + (panels.right ? '' : ' no-right')

  return (
    <div className="desktopApp">
      <TitleBar title={tabs.find((t) => t.path === activeId)?.name ?? ''} setPanels={setPanels} />
      <MenuBar onPickTargetFolder={pickTargetFolder} />
      <div className={wsClass}>
        {panels.left ? (
          <ErrorBoundary label="탐색기">
            <LeftExplorer
              alertCount={alertCount}
              targetPath={targetPath}
              onPickTargetFolder={pickTargetFolder}
              onOpenFile={openFile}
            />
          </ErrorBoundary>
        ) : (
          <div />
        )}
        <div className="gutter" />
        <ErrorBoundary label="에디터">
          <EditorPanel
            tabs={tabs}
            activeId={activeId}
            onActivate={setActiveId}
            onClose={closeTab}
            onCloseOthers={closeOtherTabs}
            onCloseToRight={closeTabsToRight}
            onCloseSaved={closeSavedTabs}
            onCloseAll={closeAllTabs}
            onDirtyChange={handleDirtyChange}
          />
        </ErrorBoundary>
        <div className="gutter" />
        {panels.right ? (
          <ErrorBoundary label="컨텍스트">
            <RightContext />
          </ErrorBoundary>
        ) : (
          <div />
        )}
      </div>
      <StatusBar />
    </div>
  )
}

export default App
