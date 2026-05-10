/**
 * Common viewer contract. Every viewer takes a file path, loads it on
 * mount, and signals dirty state back to the host (so the tab can paint
 * its dirty dot). Editable viewers also handle Ctrl+S internally and call
 * `onSaved` so the host can clear dirty.
 *
 * Read-only viewers ignore `onDirtyChange` / `onSaved` and never set dirty.
 */
export interface ViewerProps {
  path: string
  onDirtyChange?: (dirty: boolean) => void
  onSaved?: () => void
}
