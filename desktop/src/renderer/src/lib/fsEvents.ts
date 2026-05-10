/**
 * Tiny in-renderer event bus for filesystem changes triggered through the
 * app (create/rename/delete via context menus). Keeps SourceFolderNode in
 * sync without lifting all of its children-cache state up to App.
 *
 * NOT a watcher for external changes — the OS file watcher would be a
 * separate concern (chokidar in main, broadcast over IPC). Add when needed.
 */

type Listener = (changedPath: string) => void

const listeners = new Set<Listener>()

export function onFsChange(cb: Listener): () => void {
  listeners.add(cb)
  return () => {
    listeners.delete(cb)
  }
}

/**
 * Broadcast that the directory at `path` has changed (a child was created,
 * renamed, deleted, etc.). Subscribers whose path matches will refetch.
 */
export function emitFsChange(path: string): void {
  for (const l of listeners) l(path)
}
