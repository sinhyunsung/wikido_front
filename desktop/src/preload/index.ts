import { contextBridge, ipcRenderer } from 'electron'

/*
 * Renderer ↔ main bridge. Keep narrow — every method here is a public API
 * surface we have to keep stable.
 *
 *   window.*       — controls for the custom titlebar (frameless mode)
 *   targetFolder.* — get / pick / subscribe to the saved target folder
 *   fs.*           — list-dir for the source tree, read/write text & binary
 *                    for the viewers, stat for size/mtime checks
 *   shell.*        — hand-off to the OS default app for unsupported formats
 */

interface DirEntry {
  name: string
  path: string
  isDir: boolean
}

interface FileStat {
  size: number
  mtimeMs: number
  isDir: boolean
}

const api = {
  window: {
    minimize: () => ipcRenderer.send('window:minimize'),
    toggleMaximize: () => ipcRenderer.send('window:toggle-maximize'),
    close: () => ipcRenderer.send('window:close')
  },
  targetFolder: {
    get: (): Promise<string | null> => ipcRenderer.invoke('target-folder:get'),
    pick: (): Promise<string | null> => ipcRenderer.invoke('target-folder:pick'),
    onChange: (cb: (path: string | null) => void): (() => void) => {
      const handler = (_e: unknown, path: string | null): void => cb(path)
      ipcRenderer.on('target-folder:changed', handler)
      return () => ipcRenderer.off('target-folder:changed', handler)
    }
  },
  fs: {
    listDir: (path: string): Promise<DirEntry[]> => ipcRenderer.invoke('fs:list-dir', path),
    basename: (path: string): Promise<string> => ipcRenderer.invoke('fs:basename', path),
    readText: (path: string): Promise<string> => ipcRenderer.invoke('fs:read-text', path),
    readBinary: (path: string): Promise<ArrayBuffer> =>
      ipcRenderer.invoke('fs:read-binary', path),
    writeText: (path: string, content: string): Promise<void> =>
      ipcRenderer.invoke('fs:write-text', path, content),
    writeBinary: (path: string, data: ArrayBuffer): Promise<void> =>
      ipcRenderer.invoke('fs:write-binary', path, data),
    stat: (path: string): Promise<FileStat | null> => ipcRenderer.invoke('fs:stat', path),
    createFolder: (parent: string, name: string): Promise<string> =>
      ipcRenderer.invoke('fs:create-folder', parent, name),
    createFile: (parent: string, name: string, content?: string): Promise<string> =>
      ipcRenderer.invoke('fs:create-file', parent, name, content),
    search: (
      root: string,
      query: string
    ): Promise<Array<{ name: string; path: string; isDir: boolean; parentPath: string }>> =>
      ipcRenderer.invoke('fs:search', root, query)
  },
  shell: {
    openPath: (path: string): Promise<string> => ipcRenderer.invoke('shell:open-path', path),
    showInFolder: (path: string): void => ipcRenderer.send('shell:show-in-folder', path)
  }
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.api = api
}
