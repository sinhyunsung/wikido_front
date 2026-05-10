/**
 * Icon set ported from dashboard_design/screens/shell.jsx (Ico component).
 * Stroke-based SVG glyphs — colored via currentColor, sized via .ico / .ico-lg.
 * Adding a new icon here means: add a `case` returning a path. Keep the set small.
 */

export type IcoName =
  | "home"
  | "search"
  | "building"
  | "book"
  | "file"
  | "bell"
  | "check"
  | "list"
  | "gauge"
  | "plus"
  | "filter"
  | "tag"
  | "arrow-r"
  | "link"
  | "upload"
  | "doc"
  | "spark"
  | "cog"
  | "alert"
  | "clock"
  | "folder"
  | "chart"
  | "users"
  | "kebab"
  | "ext"
  | "down"
  | "sort"
  | "eye"
  | "sigma";

interface IcoProps {
  name: IcoName;
  lg?: boolean;
  className?: string;
}

export function Ico({ name, lg, className = "" }: IcoProps) {
  const cn = ["ico", lg ? "ico-lg" : "", className].filter(Boolean).join(" ");

  switch (name) {
    case "home":
      return (
        <svg className={cn} viewBox="0 0 24 24">
          <path d="M3 12l9-8 9 8" />
          <path d="M5 10v10h14V10" />
        </svg>
      );
    case "search":
      return (
        <svg className={cn} viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.5-4.5" />
        </svg>
      );
    case "building":
      return (
        <svg className={cn} viewBox="0 0 24 24">
          <path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" />
          <path d="M16 9h2a2 2 0 0 1 2 2v10" />
          <path d="M8 7h2M8 11h2M8 15h2" />
        </svg>
      );
    case "book":
      return (
        <svg className={cn} viewBox="0 0 24 24">
          <path d="M4 5a2 2 0 0 1 2-2h13v18H6a2 2 0 0 1-2-2V5z" />
          <path d="M19 17H6a2 2 0 0 0 0 4h13" />
        </svg>
      );
    case "file":
      return (
        <svg className={cn} viewBox="0 0 24 24">
          <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
          <path d="M14 3v6h6" />
        </svg>
      );
    case "bell":
      return (
        <svg className={cn} viewBox="0 0 24 24">
          <path d="M6 8a6 6 0 1 1 12 0c0 7 3 7 3 9H3c0-2 3-2 3-9z" />
          <path d="M10 21a2 2 0 0 0 4 0" />
        </svg>
      );
    case "check":
      return (
        <svg className={cn} viewBox="0 0 24 24">
          <path d="M5 12l5 5 9-11" />
        </svg>
      );
    case "list":
      return (
        <svg className={cn} viewBox="0 0 24 24">
          <path d="M9 6h12M9 12h12M9 18h12" />
          <circle cx="4.5" cy="6" r="1" />
          <circle cx="4.5" cy="12" r="1" />
          <circle cx="4.5" cy="18" r="1" />
        </svg>
      );
    case "gauge":
      return (
        <svg className={cn} viewBox="0 0 24 24">
          <path d="M3 14a9 9 0 1 1 18 0" />
          <path d="M12 14l5-3" />
        </svg>
      );
    case "plus":
      return (
        <svg className={cn} viewBox="0 0 24 24">
          <path d="M12 5v14M5 12h14" />
        </svg>
      );
    case "filter":
      return (
        <svg className={cn} viewBox="0 0 24 24">
          <path d="M3 5h18l-7 9v6l-4-2v-4z" />
        </svg>
      );
    case "tag":
      return (
        <svg className={cn} viewBox="0 0 24 24">
          <path d="M3 13l8-8h7v7l-8 8z" />
          <circle cx="14.5" cy="9.5" r="1" />
        </svg>
      );
    case "arrow-r":
      return (
        <svg className={cn} viewBox="0 0 24 24">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      );
    case "link":
      return (
        <svg className={cn} viewBox="0 0 24 24">
          <path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 1 0-5.66-5.66L11 7" />
          <path d="M14 10a4 4 0 0 0-5.66 0l-3 3A4 4 0 0 0 11 18.66L13 17" />
        </svg>
      );
    case "upload":
      return (
        <svg className={cn} viewBox="0 0 24 24">
          <path d="M12 16V4M6 10l6-6 6 6" />
          <path d="M4 18v2h16v-2" />
        </svg>
      );
    case "doc":
      return (
        <svg className={cn} viewBox="0 0 24 24">
          <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
          <path d="M9 13h6M9 17h4" />
        </svg>
      );
    case "spark":
      return (
        <svg className={cn} viewBox="0 0 24 24">
          <path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" />
        </svg>
      );
    case "cog":
      return (
        <svg className={cn} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8L4.2 7a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
        </svg>
      );
    case "alert":
      return (
        <svg className={cn} viewBox="0 0 24 24">
          <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
          <path d="M12 9v4M12 17h.01" />
        </svg>
      );
    case "clock":
      return (
        <svg className={cn} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
    case "folder":
      return (
        <svg className={cn} viewBox="0 0 24 24">
          <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        </svg>
      );
    case "chart":
      return (
        <svg className={cn} viewBox="0 0 24 24">
          <path d="M3 21h18" />
          <path d="M6 17V9M11 17V5M16 17v-7M21 17V12" />
        </svg>
      );
    case "users":
      return (
        <svg className={cn} viewBox="0 0 24 24">
          <circle cx="9" cy="8" r="3.5" />
          <path d="M2 20a7 7 0 0 1 14 0" />
          <circle cx="17" cy="8" r="2.5" />
          <path d="M22 19a5 5 0 0 0-6-4.9" />
        </svg>
      );
    case "kebab":
      return (
        <svg className={cn} viewBox="0 0 24 24">
          <circle cx="12" cy="6" r="1.2" />
          <circle cx="12" cy="12" r="1.2" />
          <circle cx="12" cy="18" r="1.2" />
        </svg>
      );
    case "ext":
      return (
        <svg className={cn} viewBox="0 0 24 24">
          <path d="M14 4h6v6" />
          <path d="M20 4l-9 9" />
          <path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
        </svg>
      );
    case "down":
      return (
        <svg className={cn} viewBox="0 0 24 24">
          <path d="M6 9l6 6 6-6" />
        </svg>
      );
    case "sort":
      return (
        <svg className={cn} viewBox="0 0 24 24">
          <path d="M7 4v16M4 17l3 3 3-3M17 20V4M14 7l3-3 3 3" />
        </svg>
      );
    case "eye":
      return (
        <svg className={cn} viewBox="0 0 24 24">
          <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case "sigma":
      return (
        <svg className={cn} viewBox="0 0 24 24">
          <path d="M19 4H6l7 8-7 8h13" />
        </svg>
      );
    default:
      return null;
  }
}
