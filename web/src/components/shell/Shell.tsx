import { SideNav } from "./SideNav";
import { TopBar } from "./TopBar";

interface ShellProps {
  /** Breadcrumb segments to render in the top bar. */
  crumbs?: string[];
  /** Pre-fill text for the top-bar search input. */
  search?: string;
  children: React.ReactNode;
}

/**
 * App chrome — sidebar (left) + top bar (top) + scrollable body.
 * Mirrors the `Shell` component in dashboard_design/screens/shell.jsx.
 */
export function Shell({ crumbs, search, children }: ShellProps) {
  return (
    <div className="flex h-screen w-full bg-bg text-ink">
      <SideNav />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar crumbs={crumbs} searchValue={search} />
        <div className="flex-1 overflow-auto px-[26px] py-[22px]">{children}</div>
      </div>
    </div>
  );
}
