import type { IconName } from '../components/WinIcon'

/**
 * Path basename without depending on Node's `path` module — works for
 * Windows (`\`) and POSIX (`/`). Falls back to the whole string for
 * roots like `C:\`.
 */
export function basenameJS(p: string): string {
  const trimmed = p.replace(/[\\/]+$/, '')
  const segments = trimmed.split(/[\\/]/)
  return segments[segments.length - 1] || p
}

/**
 * Lower-cased file extension without the leading dot. `'foo.MD'` → `'md'`,
 * `'noext'` → `''`. Used for viewer routing.
 */
export function extOf(p: string): string {
  const m = p.match(/\.([^.\\/]+)$/)
  return m ? m[1].toLowerCase() : ''
}

/**
 * Tree/tab icon by extension. Today we only ship two glyphs (`file`,
 * `file-md`); add more here as the WinIcon set grows.
 */
export function iconForFile(name: string): IconName {
  return extOf(name) === 'md' ? 'file-md' : 'file'
}
