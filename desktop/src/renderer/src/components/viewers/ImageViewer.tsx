import { useEffect, useState } from 'react'
import { extOf } from '../../lib/files'
import type { ViewerProps } from './types'

const MIME_BY_EXT: Record<string, string> = {
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  webp: 'image/webp',
  bmp: 'image/bmp',
  svg: 'image/svg+xml'
}

/**
 * Read-only image viewer. We base64-encode the file via IPC into a data URL
 * rather than serving `file://` because the renderer's CSP blocks `file:`
 * by default and adding it back would loosen the policy more than necessary.
 */
export function ImageViewer({ path }: ViewerProps): React.JSX.Element {
  const [src, setSrc] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const ext = extOf(path)

  useEffect(() => {
    let cancelled = false
    setSrc(null)
    setError(null)
    window.api.fs
      .readBinary(path)
      .then((buf) => {
        if (cancelled) return
        const mime = MIME_BY_EXT[ext] ?? 'application/octet-stream'
        /* btoa needs a binary string; build it from the byte array. For very
           large images this allocates a lot of intermediate string memory —
           switch to a Blob URL via URL.createObjectURL if perf becomes an issue. */
        const bytes = new Uint8Array(buf)
        let bin = ''
        for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i])
        setSrc(`data:${mime};base64,${btoa(bin)}`)
      })
      .catch((e) => !cancelled && setError(String(e)))
    return () => {
      cancelled = true
    }
  }, [path, ext])

  if (error) return <div className="vw-error">이미지 읽기 실패: {error}</div>
  if (!src) return <div className="vw-loading">읽는 중…</div>
  return (
    <div className="vw-image">
      <img src={src} alt={path} />
    </div>
  )
}
