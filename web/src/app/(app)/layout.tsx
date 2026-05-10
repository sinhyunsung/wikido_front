import { Shell } from "@/components/shell/Shell";

/**
 * App route group layout. Every authenticated page renders inside Shell.
 * Per-page crumbs/search would normally come from the page itself; here we
 * hand-roll them per-route. (When auth/org gates land, wrap Shell with
 * AuthGate + OrgGate as Implementation.md §12.3 prescribes.)
 */
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
