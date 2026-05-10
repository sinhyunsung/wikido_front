/**
 * Stroke-based icon set for the desktop app — direct port of `WinIcon` in
 * desktop_design/desktop-shell.jsx. Sized via `size` prop (defaults to 14px).
 * Strokes use currentColor so text-color rules apply.
 */

export type IconName =
  | 'chevron-right'
  | 'chevron-down'
  | 'folder'
  | 'folder-open'
  | 'file'
  | 'file-md'
  | 'tag'
  | 'star'
  | 'search'
  | 'bell'
  | 'settings'
  | 'x'
  | 'plus'
  | 'sparkle'
  | 'minus'
  | 'square'
  | 'restore'
  | 'save'
  | 'table'
  | 'link'
  | 'send'
  | 'sync'
  | 'wifi'
  | 'panel-r'
  | 'panel-l'

interface WinIconProps {
  name: IconName
  size?: number
}

export function WinIcon({ name, size = 14 }: WinIconProps): React.JSX.Element | null {
  const s = {
    width: size,
    height: size,
    strokeWidth: 1.5,
    fill: 'none' as const,
    stroke: 'currentColor',
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const
  }

  switch (name) {
    case 'chevron-right':
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <path d="m9 6 6 6-6 6" />
        </svg>
      )
    case 'chevron-down':
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <path d="m6 9 6 6 6-6" />
        </svg>
      )
    case 'folder':
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <path d="M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        </svg>
      )
    case 'folder-open':
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <path d="M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v2" />
          <path d="m21 10-2 9a2 2 0 0 1-2 1.5H4a2 2 0 0 1-2-2L4 10z" />
        </svg>
      )
    case 'file':
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
          <path d="M14 3v6h6" />
        </svg>
      )
    case 'file-md':
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
          <path d="M14 3v6h6" />
          <path d="M8 14v3M8 14l1.5 2L11 14v3M14 17v-3M14 17l2-2" />
        </svg>
      )
    case 'tag':
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <path d="M2 12V4a2 2 0 0 1 2-2h8l10 10-10 10z" />
          <circle cx="7" cy="7" r="1.5" />
        </svg>
      )
    case 'star':
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <path d="m12 2 3 7 7 .5-5.5 4.5L18 21l-6-3.5L6 21l1.5-7L2 9.5 9 9z" />
        </svg>
      )
    case 'search':
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <circle cx="11" cy="11" r="6" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      )
    case 'bell':
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <path d="M6 8a6 6 0 1 1 12 0c0 5 2 7 2 7H4s2-2 2-7" />
          <path d="M10 19a2 2 0 0 0 4 0" />
        </svg>
      )
    case 'settings':
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5" />
        </svg>
      )
    case 'x':
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <path d="m6 6 12 12M18 6 6 18" />
        </svg>
      )
    case 'plus':
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <path d="M12 5v14M5 12h14" />
        </svg>
      )
    case 'sparkle':
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <path d="m12 3 1.8 5 5 1.8-5 1.8L12 17l-1.8-5.4L5 9.8l5-1.8z" />
        </svg>
      )
    case 'minus':
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <path d="M5 12h14" />
        </svg>
      )
    case 'square':
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <rect x="4" y="4" width="16" height="16" rx="1" />
        </svg>
      )
    case 'restore':
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <rect x="6" y="6" width="14" height="14" rx="1" />
          <path d="M4 16V4h12" />
        </svg>
      )
    case 'save':
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <path d="M5 4h11l4 4v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" />
          <path d="M7 4v6h9V4M7 21v-7h10v7" />
        </svg>
      )
    case 'table':
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <rect x="3" y="4" width="18" height="16" rx="1" />
          <path d="M3 10h18M9 4v16" />
        </svg>
      )
    case 'link':
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <path d="M10 14a4 4 0 0 0 5.7 0l3.6-3.6a4 4 0 0 0-5.7-5.7L12 6.3" />
          <path d="M14 10a4 4 0 0 0-5.7 0l-3.6 3.6a4 4 0 0 0 5.7 5.7L12 17.7" />
        </svg>
      )
    case 'send':
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <path d="M22 2 11 13M22 2l-7 20-4-9-9-4z" />
        </svg>
      )
    case 'sync':
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5" />
        </svg>
      )
    case 'wifi':
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <path d="M5 12a10 10 0 0 1 14 0M8.5 15.5a5 5 0 0 1 7 0" />
          <circle cx="12" cy="19" r="1" fill="currentColor" />
        </svg>
      )
    case 'panel-r':
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <rect x="3" y="4" width="18" height="16" rx="1" />
          <path d="M15 4v16" />
        </svg>
      )
    case 'panel-l':
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <rect x="3" y="4" width="18" height="16" rx="1" />
          <path d="M9 4v16" />
        </svg>
      )
    default:
      return null
  }
}
