import { useEffect, useMemo, useRef, useState } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { markdown } from '@codemirror/lang-markdown'
import { json } from '@codemirror/lang-json'
import { yaml } from '@codemirror/lang-yaml'
import { xml } from '@codemirror/lang-xml'
import { html } from '@codemirror/lang-html'
import { javascript } from '@codemirror/lang-javascript'
import { python } from '@codemirror/lang-python'
import { sql } from '@codemirror/lang-sql'
import { css as cssLang } from '@codemirror/lang-css'
import type { Extension } from '@codemirror/state'
import { extOf } from '../../lib/files'
import type { ViewerProps } from './types'

/* Map extension → CodeMirror language extension. Anything not listed renders
   as plain text with no highlighting (still fully editable). */
function languageFor(ext: string): Extension[] {
  switch (ext) {
    case 'md':
    case 'markdown':
      return [markdown()]
    case 'json':
      return [json()]
    case 'yml':
    case 'yaml':
      return [yaml()]
    case 'xml':
    case 'svg':
      return [xml()]
    case 'html':
    case 'htm':
      return [html()]
    case 'js':
    case 'jsx':
    case 'mjs':
    case 'cjs':
    case 'ts':
    case 'tsx':
      return [javascript({ jsx: ext.startsWith('j') ? false : ext.endsWith('x'), typescript: ext.startsWith('t') })]
    case 'py':
      return [python()]
    case 'sql':
      return [sql()]
    case 'css':
    case 'scss':
      return [cssLang()]
    default:
      return []
  }
}

/**
 * Text / code editor backed by CodeMirror 6. Loads the file as UTF-8, edits
 * in-place, saves on Ctrl+S. Tracks dirty by comparing current value against
 * the last-saved snapshot — so re-loading the same content shows clean.
 */
export function TextViewer({ path, onDirtyChange, onSaved }: ViewerProps): React.JSX.Element {
  const [value, setValue] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  /* Reference snapshot for dirty detection. Updated only on load and save. */
  const savedRef = useRef<string>('')
  const ext = extOf(path)
  const extensions = useMemo(() => languageFor(ext), [ext])

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    window.api.fs
      .readText(path)
      .then((text) => {
        if (cancelled) return
        savedRef.current = text
        setValue(text)
        onDirtyChange?.(false)
      })
      .catch((e) => !cancelled && setError(String(e)))
      .finally(() => !cancelled && setLoading(false))
    return () => {
      cancelled = true
    }
    /* Intentionally ignore onDirtyChange — we only want to reload on path
       changes; redundant callbacks shouldn't trigger a fresh disk read. */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path])

  const save = async (): Promise<void> => {
    if (value === savedRef.current) return
    try {
      await window.api.fs.writeText(path, value)
      savedRef.current = value
      onDirtyChange?.(false)
      onSaved?.()
    } catch (e) {
      setError(String(e))
    }
  }

  /* Ctrl+S handler scoped to the viewer container; we only catch when this
     viewer is mounted/focused so we don't fight other shortcuts. */
  const containerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const onKey = (e: KeyboardEvent): void => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault()
        void save()
      }
    }
    const node = containerRef.current
    node?.addEventListener('keydown', onKey)
    return () => node?.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  if (loading) return <div className="vw-loading">읽는 중…</div>
  if (error) return <div className="vw-error">파일 읽기 실패: {error}</div>

  return (
    <div ref={containerRef} className="vw-text" tabIndex={-1}>
      <CodeMirror
        value={value}
        height="100%"
        theme="light"
        extensions={extensions}
        onChange={(next) => {
          setValue(next)
          onDirtyChange?.(next !== savedRef.current)
        }}
        basicSetup={{
          lineNumbers: true,
          foldGutter: true,
          highlightActiveLine: true,
          autocompletion: true
        }}
      />
    </div>
  )
}
