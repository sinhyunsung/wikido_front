/**
 * Sparkline — same SVG path math as the design's `Spark` component in shell.jsx.
 * Renders a tiny line chart with a faint area fill underneath.
 */
interface SparklineProps {
  data: number[];
  w?: number;
  h?: number;
  color?: string;
}

export function Sparkline({
  data,
  w = 120,
  h = 32,
  color = "var(--color-accent)",
}: SparklineProps) {
  if (data.length < 2) return null;

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const pts = data
    .map(
      (v, i) =>
        `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * (h - 4) - 2}`
    )
    .join(" ");
  const area = `0,${h} ${pts} ${w},${h}`;

  return (
    <svg width={w} height={h} className="block">
      <polygon points={area} fill={color} opacity="0.08" />
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
