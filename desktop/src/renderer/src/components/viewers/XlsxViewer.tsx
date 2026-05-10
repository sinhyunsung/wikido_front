import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import * as XLSX from 'xlsx'
import { extOf } from '../../lib/files'
import type { ViewerProps } from './types'

/**
 * Spreadsheet viewer/editor. Backed by SheetJS for file IO. The grid is a
 * lightweight HTML table with `contentEditable` cells — good enough for
 * value edits, no formula recalculation, no formatting beyond what SheetJS
 * preserves on round-trip.
 *
 * For richer behavior (formula re-eval, multi-cell paste, frozen panes)
 * swap the table for Handsontable / x-spreadsheet later. The viewer
 * contract stays the same.
 */
export function XlsxViewer({
  path,
  onDirtyChange,
  onSaved
}: ViewerProps): React.JSX.Element {
  const [workbook, setWorkbook] = useState<XLSX.WorkBook | null>(null)
  const [activeSheet, setActiveSheet] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  /* `cells[row][col]` mirrors the active sheet as a 2D string grid we
     can mutate in place; rebuild on sheet switch and on file load. */
  const [cells, setCells] = useState<string[][]>([])
  const dirtyRef = useRef(false)

  const ext = extOf(path)

  /* Load file once on path change. Same workbook stays in state across
     sheet switches so we keep edits to other sheets. */
  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    dirtyRef.current = false
    onDirtyChange?.(false)
    window.api.fs
      .readBinary(path)
      .then((buf) => {
        if (cancelled) return
        const wb = XLSX.read(buf, { type: 'array' })
        setWorkbook(wb)
        const first = wb.SheetNames[0] ?? ''
        setActiveSheet(first)
        if (first) setCells(sheetToCells(wb.Sheets[first]))
      })
      .catch((e) => !cancelled && setError(String(e)))
      .finally(() => !cancelled && setLoading(false))
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path])

  /* When the user switches sheets, push the current `cells` back into the
     workbook so we don't lose unsaved edits, then load the new sheet. */
  const switchSheet = useCallback(
    (name: string) => {
      if (!workbook || name === activeSheet) return
      if (activeSheet) {
        workbook.Sheets[activeSheet] = cellsToSheet(cells)
      }
      setActiveSheet(name)
      setCells(sheetToCells(workbook.Sheets[name]))
    },
    [workbook, activeSheet, cells]
  )

  const editCell = (row: number, col: number, value: string): void => {
    setCells((prev) => {
      const next = prev.map((r) => r.slice())
      /* Grow the row/col if the user types past the right edge — SheetJS
         already trimmed the original to the data range, so editing into
         a "new" cell needs the array to expand. */
      while (next.length <= row) next.push([])
      while (next[row].length <= col) next[row].push('')
      next[row][col] = value
      return next
    })
    if (!dirtyRef.current) {
      dirtyRef.current = true
      onDirtyChange?.(true)
    }
  }

  const save = useCallback(async () => {
    if (!workbook) return
    /* Push the active sheet's edits back before serializing. */
    workbook.Sheets[activeSheet] = cellsToSheet(cells)
    const out = XLSX.write(workbook, {
      type: 'array',
      bookType: ext === 'xls' ? 'xls' : 'xlsx'
    }) as ArrayBuffer
    await window.api.fs.writeBinary(path, out)
    dirtyRef.current = false
    onDirtyChange?.(false)
    onSaved?.()
  }, [workbook, activeSheet, cells, ext, path, onDirtyChange, onSaved])

  /* Container Ctrl+S — same pattern as TextViewer. */
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
  }, [save])

  /* Pre-compute the table's max column count so empty trailing rows
     still render with the right number of cells. */
  const colCount = useMemo(
    () => cells.reduce((m, r) => Math.max(m, r.length), 0),
    [cells]
  )

  if (loading) return <div className="vw-loading">읽는 중…</div>
  if (error) return <div className="vw-error">스프레드시트 읽기 실패: {error}</div>
  if (!workbook) return <div className="vw-error">워크북을 불러오지 못했습니다.</div>

  return (
    <div ref={containerRef} className="vw-xlsx" tabIndex={-1}>
      {workbook.SheetNames.length > 1 && (
        <div className="vw-xlsx-sheets">
          {workbook.SheetNames.map((name) => (
            <button
              key={name}
              className={'vw-xlsx-sheet' + (name === activeSheet ? ' is-active' : '')}
              onClick={() => switchSheet(name)}
            >
              {name}
            </button>
          ))}
        </div>
      )}
      <div className="vw-xlsx-grid">
        <table>
          <thead>
            <tr>
              <th />
              {Array.from({ length: colCount }, (_, c) => (
                <th key={c}>{XLSX.utils.encode_col(c)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cells.map((row, r) => (
              <tr key={r}>
                <th>{r + 1}</th>
                {Array.from({ length: colCount }, (_, c) => (
                  <td
                    key={c}
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      const next = e.currentTarget.textContent ?? ''
                      if (next !== (row[c] ?? '')) editCell(r, c, next)
                    }}
                  >
                    {row[c] ?? ''}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ── helpers ──────────────────────────────────────────────────────────── */

function sheetToCells(sheet: XLSX.WorkSheet | undefined): string[][] {
  if (!sheet) return []
  const arr = XLSX.utils.sheet_to_json<string[]>(sheet, {
    header: 1,
    raw: false,
    defval: ''
  })
  /* `header: 1` returns rows as arrays; coerce all entries to strings so
     `contentEditable` rendering doesn't trip on numbers/dates. */
  return arr.map((row) => row.map((cell) => (cell == null ? '' : String(cell))))
}

function cellsToSheet(cells: string[][]): XLSX.WorkSheet {
  return XLSX.utils.aoa_to_sheet(cells)
}
