interface WindowControls {
  minimize: () => void
  toggleMaximize: () => void
  close: () => void
}

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

interface TargetFolderApi {
  get: () => Promise<string | null>
  pick: () => Promise<string | null>
  onChange: (cb: (path: string | null) => void) => () => void
}

interface SearchHit {
  name: string
  path: string
  isDir: boolean
  parentPath: string
}

interface FsApi {
  listDir: (path: string) => Promise<DirEntry[]>
  basename: (path: string) => Promise<string>
  readText: (path: string) => Promise<string>
  readBinary: (path: string) => Promise<ArrayBuffer>
  writeText: (path: string, content: string) => Promise<void>
  writeBinary: (path: string, data: ArrayBuffer) => Promise<void>
  stat: (path: string) => Promise<FileStat | null>
  createFolder: (parent: string, name: string) => Promise<string>
  createFile: (parent: string, name: string, content?: string) => Promise<string>
  search: (root: string, query: string) => Promise<SearchHit[]>
}

interface ShellApi {
  openPath: (path: string) => Promise<string>
  showInFolder: (path: string) => void
}

interface Api {
  window: WindowControls
  targetFolder: TargetFolderApi
  fs: FsApi
  shell: ShellApi
}

declare global {
  interface Window {
    api: Api
  }
}

export {}
