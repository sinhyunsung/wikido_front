/**
 * Tiny inline sparkline used in the right context's company panel.
 * Direct math port of `MiniSpark` from desktop_design/desktop-editor.jsx.
 */

interface MiniSparkProps {
  data: number[]
  color?: string
  width?: number
  height?: number
}

export function MiniSpark({
  data,
  color = 'currentColor',
  width = 60,
  height = 18
}: MiniSparkProps): React.JSX.Element | null {
  if (data.length < 2) return null

  const min = Math.min(...data)
  const max = Math.max(...data)
  const xs = (i: number) => (i / (data.length - 1)) * width
  const ys = (v: number) => height - 1 - ((v - min) / (max - min || 1)) * (height - 2)
  const pts = data.map((v, i) => `${xs(i)},${ys(v)}`).join(' ')

  return (
    <svg width={width} height={height} style={{ display: 'block' }}>
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="1.25"
        strokeLinecap="round"
        points={pts}
      />
    </svg>
  )
}
