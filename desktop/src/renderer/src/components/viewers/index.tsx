import { extOf } from '../../lib/files'
import { TextViewer } from './TextViewer'
import { ImageViewer } from './ImageViewer'
import { DocxViewer } from './DocxViewer'
import { XlsxViewer } from './XlsxViewer'
import { PdfViewer } from './PdfViewer'
import { HwpViewer } from './HwpViewer'
import { UnsupportedViewer } from './UnsupportedViewer'
import type { ViewerProps } from './types'

/**
 * Extension classes — duplicated values are intentional (rdf/foo families).
 * If you add a new viewer:
 *   1. add the file under viewers/
 *   2. list its extensions here
 *   3. wire the case in `viewerForExt` below
 *
 * The catch-all is `UnsupportedViewer` (handoff to OS).
 */
const TEXT_EXTS = new Set([
  'md', 'markdown', 'txt', 'log', 'ini', 'toml', 'env',
  'json', 'yaml', 'yml', 'xml', 'svg', 'csv', 'tsv',
  'html', 'htm',
  'js', 'jsx', 'mjs', 'cjs', 'ts', 'tsx',
  'py', 'sql', 'sh', 'bat', 'ps1',
  'css', 'scss', 'less'
])

const IMAGE_EXTS = new Set(['png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp', 'svg'])
const DOCX_EXTS = new Set(['docx'])
const XLSX_EXTS = new Set(['xlsx', 'xls'])
const PDF_EXTS = new Set(['pdf'])
const HWP_EXTS = new Set(['hwp', 'hwpx'])

function viewerForExt(ext: string): React.ComponentType<ViewerProps> {
  /* SVG is both an image and an XML text — present as image (people usually
     want to see it). To edit the markup, rename to .xml or open in a code
     viewer explicitly later. */
  if (IMAGE_EXTS.has(ext)) return ImageViewer
  if (TEXT_EXTS.has(ext)) return TextViewer
  if (XLSX_EXTS.has(ext)) return XlsxViewer
  if (DOCX_EXTS.has(ext)) return DocxViewer
  if (PDF_EXTS.has(ext)) return PdfViewer
  if (HWP_EXTS.has(ext)) return HwpViewer
  return UnsupportedViewer
}

/**
 * Dispatcher. Picks the viewer for the file extension and forwards props.
 * The `key={path}` on the inner element forces a fresh mount when the
 * active tab switches — so each viewer can rely on its mount-time IO and
 * doesn't have to handle path mid-life changes.
 */
export function ViewerForFile(props: ViewerProps): React.JSX.Element {
  const Viewer = viewerForExt(extOf(props.path))
  return <Viewer key={props.path} {...props} />
}
