import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron'
import { promises as fsp } from 'fs'
import { join, basename } from 'path'
import icon from '../../resources/icon.png?asset'

/* Inlined small utility (replaces @electron-toolkit/utils — see git history). */
const isDev = !app.isPackaged

/* Pin the userData folder to "WikiDo" so dev and packaged builds share the
   same settings.json instead of writing under the npm package name "desktop"
   in dev. Must be set before app.getPath() is first called. */
app.setName('WikiDo')

// ─── Settings store ──────────────────────────────────────────────────────────
//
// One JSON file under userData. Tiny — anything bigger should move to a
// proper store (e.g. lowdb, electron-store) when we have more than 2-3 keys.

interface Settings {
  targetFolder?: string | null
}

const settingsFile = (): string => join(app.getPath('userData'), 'settings.json')

async function loadSettings(): Promise<Settings> {
  try {
    return JSON.parse(await fsp.readFile(settingsFile(), 'utf-8')) as Settings
  } catch {
    return {}
  }
}

async function patchSettings(patch: Partial<Settings>): Promise<void> {
  const next = { ...(await loadSettings()), ...patch }
  await fsp.mkdir(app.getPath('userData'), { recursive: true })
  await fsp.writeFile(settingsFile(), JSON.stringify(next, null, 2), 'utf-8')
}

// ─── Window ──────────────────────────────────────────────────────────────────

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 900,
    minHeight: 600,
    show: false,
    frame: false,
    titleBarStyle: 'hidden',
    title: 'WikiDo',
    backgroundColor: '#e7e3d8',
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => mainWindow.show())

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (isDev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// ─── IPC ─────────────────────────────────────────────────────────────────────

app.whenReady().then(() => {
  if (process.platform === 'win32') {
    app.setAppUserModelId(isDev ? process.execPath : 'com.wikido.desktop')
  }

  // Window controls (from custom titlebar)
  ipcMain.on('window:minimize', (e) => BrowserWindow.fromWebContents(e.sender)?.minimize())
  ipcMain.on('window:toggle-maximize', (e) => {
    const w = BrowserWindow.fromWebContents(e.sender)
    if (!w) return
    if (w.isMaximized()) w.unmaximize()
    else w.maximize()
  })
  ipcMain.on('window:close', (e) => BrowserWindow.fromWebContents(e.sender)?.close())

  /* Target folder: get returns the saved selection (or null). pick opens the
     OS folder picker, persists the choice, and returns the new path (or null
     if the user canceled). The renderer notifies all windows via main so
     multiple panels stay in sync without each holding its own state. */
  ipcMain.handle('target-folder:get', async () => (await loadSettings()).targetFolder ?? null)

  ipcMain.handle('target-folder:pick', async (e) => {
    const w = BrowserWindow.fromWebContents(e.sender)
    if (!w) return null
    const r = await dialog.showOpenDialog(w, {
      title: '타겟 폴더 지정',
      properties: ['openDirectory']
    })
    if (r.canceled || !r.filePaths[0]) return null
    const picked = r.filePaths[0]
    await patchSettings({ targetFolder: picked })
    /* Broadcast so the LeftExplorer (and anyone else) can pick up the change
       even when it wasn't the component that triggered the picker. */
    for (const win of BrowserWindow.getAllWindows()) {
      win.webContents.send('target-folder:changed', picked)
    }
    return picked
  })

  /* fs:list-dir — single-level directory listing. Used by the source tree
     for lazy load on expand. Hidden files (dotfiles) are filtered. Errors
     return [] so the renderer can render an empty branch instead of throwing. */
  ipcMain.handle('fs:list-dir', async (_e, dirPath: string) => {
    try {
      const entries = await fsp.readdir(dirPath, { withFileTypes: true })
      return entries
        .filter((entry) => !entry.name.startsWith('.'))
        .map((entry) => ({
          name: entry.name,
          path: join(dirPath, entry.name),
          isDir: entry.isDirectory()
        }))
        .sort((a, b) => {
          // Folders first, then files, both alphabetic (locale-aware for Korean).
          if (a.isDir !== b.isDir) return a.isDir ? -1 : 1
          return a.name.localeCompare(b.name, 'ko')
        })
    } catch {
      return []
    }
  })

  /* Convenience: basename without forcing the renderer to ship its own path
     parser. Returns the trailing component, or the whole path if there is none. */
  ipcMain.handle('fs:basename', (_e, p: string) => basename(p) || p)

  /* Create a new folder under `parent`. `recursive: false` plus the default
     errno on EEXIST surfaces "이미 존재" cleanly to the renderer. Returns the
     full path of the new folder for the caller to focus / select. */
  ipcMain.handle('fs:create-folder', async (_e, parent: string, name: string) => {
    const newPath = join(parent, name)
    await fsp.mkdir(newPath)
    return newPath
  })

  /* Create a new file. `flag: 'wx'` is exclusive create — fails (EEXIST) rather
     than truncating an existing file. Default content is empty so callers can
     just request "새 파일.txt" without supplying a body. */
  ipcMain.handle(
    'fs:create-file',
    async (_e, parent: string, name: string, content = '') => {
      const newPath = join(parent, name)
      await fsp.writeFile(newPath, content, { encoding: 'utf-8', flag: 'wx' })
      return newPath
    }
  )

  /*
   * Recursive name search across the target folder. Returns matches as a
   * flat list with the parent path so the renderer can show a path crumb.
   *
   * Bounded by MAX_RESULTS (top of the list — first hits win) and MAX_DEPTH
   * to keep huge trees from hanging the UI. We also skip dotfiles and a few
   * notorious "huge but uninteresting" folders. Tune as feedback comes in.
   */
  ipcMain.handle('fs:search', async (_e, root: string, query: string) => {
    if (!root || !query) return []
    const q = query.toLowerCase()
    const results: { name: string; path: string; isDir: boolean; parentPath: string }[] = []
    const MAX_RESULTS = 200
    const MAX_DEPTH = 10
    const SKIP_DIRS = new Set(['node_modules', '.git', '.next', 'dist', 'out', '__pycache__'])

    async function walk(dir: string, depth: number): Promise<void> {
      if (results.length >= MAX_RESULTS || depth > MAX_DEPTH) return
      let entries
      try {
        entries = await fsp.readdir(dir, { withFileTypes: true })
      } catch {
        return
      }
      for (const entry of entries) {
        if (entry.name.startsWith('.')) continue
        if (entry.isDirectory() && SKIP_DIRS.has(entry.name)) continue
        const fullPath = join(dir, entry.name)
        if (entry.name.toLowerCase().includes(q)) {
          results.push({
            name: entry.name,
            path: fullPath,
            isDir: entry.isDirectory(),
            parentPath: dir
          })
          if (results.length >= MAX_RESULTS) return
        }
        if (entry.isDirectory()) {
          await walk(fullPath, depth + 1)
          if (results.length >= MAX_RESULTS) return
        }
      }
    }

    await walk(root, 0)
    return results
  })

  /* File IO. Text and binary are split because the renderer always knows up
     front which format it needs (extension routing in the viewer dispatch).
     Keeps us from accidentally utf-8-decoding a docx into a corrupted string. */
  ipcMain.handle('fs:read-text', async (_e, p: string) => {
    return await fsp.readFile(p, 'utf-8')
  })
  ipcMain.handle('fs:read-binary', async (_e, p: string) => {
    /* Return the underlying ArrayBuffer slice — Electron serializes Buffer/
       Uint8Array over IPC by copying, so we return the smallest representation
       and the renderer can wrap it in Uint8Array as needed. */
    const buf = await fsp.readFile(p)
    return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength)
  })
  ipcMain.handle('fs:write-text', async (_e, p: string, content: string) => {
    await fsp.writeFile(p, content, 'utf-8')
  })
  ipcMain.handle('fs:write-binary', async (_e, p: string, data: ArrayBuffer) => {
    await fsp.writeFile(p, Buffer.from(data))
  })
  ipcMain.handle('fs:stat', async (_e, p: string) => {
    try {
      const s = await fsp.stat(p)
      return { size: s.size, mtimeMs: s.mtimeMs, isDir: s.isDirectory() }
    } catch {
      return null
    }
  })

  /* Hand-off: open a file with the OS default app. Used for unsupported
     formats (hwp, pptx, etc.) and as an "open in original app" escape hatch
     from any viewer. */
  ipcMain.handle('shell:open-path', async (_e, p: string) => {
    /* shell.openPath returns "" on success and an error string on failure;
       we surface whichever for the renderer to optionally toast. */
    return await shell.openPath(p)
  })

  /* "Reveal in Explorer / Finder" — selects the file in the OS file manager
     instead of opening the file itself. Used by the tab context menu. */
  ipcMain.on('shell:show-in-folder', (_e, p: string) => shell.showItemInFolder(p))

  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
