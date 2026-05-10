import { contextBridge, ipcRenderer } from 'electron'

/*
 * `api` exposes the small subset of main-process functionality the renderer
 * actually needs — for the initial scaffold that's just window controls for
 * the custom title bar (frameless mode).
 *
 * Dropped `@electron-toolkit/preload` — the matching utils package crashes on
 * Electron 39 (electron.app.isPackaged at module load), and we don't actually
 * need the IPC sugar it provides.
 */
const api = {
  window: {
    minimize: () => ipcRenderer.send('window:minimize'),
    toggleMaximize: () => ipcRenderer.send('window:toggle-maximize'),
    close: () => ipcRenderer.send('window:close')
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
