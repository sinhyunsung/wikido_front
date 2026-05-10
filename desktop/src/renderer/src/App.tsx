import { useState } from 'react'
import { TitleBar } from './components/TitleBar'
import { MenuBar } from './components/MenuBar'
import { LeftExplorer } from './components/LeftExplorer'
import { EditorPanel, INITIAL_TABS, type EditorTab } from './components/EditorPanel'
import { RightContext } from './components/RightContext'
import { StatusBar } from './components/StatusBar'

/**
 * App composition matches `WikiDO Desktop.html` from the design proto:
 * a 4-row grid (titlebar, menubar, workspace, statusbar) where the
 * workspace itself is a 5-column grid (sidebar, gutter, editor, gutter,
 * right context). The .no-left / .no-right modifier classes collapse a
 * panel column when its toggle is off.
 */
function App(): React.JSX.Element {
  const [tabs, setTabs] = useState<EditorTab[]>(INITIAL_TABS)
  const [panels, setPanels] = useState({ left: true, right: true })
  const alertCount = 2
  const activeName = (tabs.find((t) => t.id === 't1') || tabs[0])?.name || ''

  const wsClass =
    'workspace' + (panels.left ? '' : ' no-left') + (panels.right ? '' : ' no-right')

  return (
    <div className="desktopApp">
      <TitleBar title={activeName} setPanels={setPanels} />
      <MenuBar />
      <div className={wsClass}>
        {panels.left ? <LeftExplorer alertCount={alertCount} /> : <div />}
        <div className="gutter" />
        <EditorPanel tabs={tabs} setTabs={setTabs} />
        <div className="gutter" />
        {panels.right ? <RightContext /> : <div />}
      </div>
      <StatusBar />
    </div>
  )
}

export default App
