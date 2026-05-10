"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Ico, type IcoName } from "./Ico";

type NavItem = {
  href: string;
  label: string;
  icon: IcoName;
  /** When set, renders the small numeric badge (e.g. unread alerts). */
  dot?: number;
};

type NavGroup = {
  group: string;
  items: NavItem[];
};

/**
 * Sidebar nav. Routes are placeholders for now — only `/dashboard` and
 * `/search` actually have pages in this initial scaffold; the rest will get
 * built screen-by-screen and the hrefs will already be in place.
 */
const NAV: NavGroup[] = [
  {
    group: "메인",
    items: [
      { href: "/dashboard", label: "대시보드", icon: "home" },
      { href: "/search", label: "통합 검색", icon: "search" },
      { href: "/alerts", label: "세법 변경 알림", icon: "bell", dot: 3 },
    ],
  },
  {
    group: "위키",
    items: [
      { href: "/wiki", label: "위키 문서", icon: "book" },
      { href: "/companies", label: "회사별 영구조서", icon: "building" },
      { href: "/cases", label: "유사 케이스", icon: "spark" },
    ],
  },
  {
    group: "자료",
    items: [
      { href: "/files", label: "파일 라이브러리", icon: "folder" },
      { href: "/upload", label: "업로드 / 태깅", icon: "upload" },
      { href: "/checklist", label: "세무조정 체크리스트", icon: "list" },
    ],
  },
  {
    group: "관리",
    items: [
      { href: "/admin", label: "위키 관리", icon: "gauge" },
      { href: "/settings", label: "설정", icon: "cog" },
    ],
  },
];

export function SideNav() {
  const pathname = usePathname();

  return (
    <aside className="flex w-[220px] flex-none flex-col border-r border-line bg-[#fbfaf7]">
      <div className="flex items-center gap-[9px] border-b border-line-soft px-[18px] py-[14px] pt-[18px]">
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-ink text-[12px] font-bold tracking-tight text-white">
          W
        </div>
        <div>
          <div className="text-[14.5px] font-bold tracking-tight">WikiDo</div>
        </div>
        <div className="ml-auto text-[10.5px] text-muted">v0.4</div>
      </div>

      <nav className="flex-1 overflow-auto px-2 py-[10px]">
        {NAV.map((g) => (
          <div key={g.group}>
            <div className="px-3 pt-[10px] pb-1.5 text-[10.5px] uppercase tracking-[0.04em] text-muted">
              {g.group}
            </div>
            {g.items.map((it) => {
              // Active when current path equals the item's href OR is nested below it
              const active =
                pathname === it.href ||
                (it.href !== "/" && pathname.startsWith(it.href + "/"));
              return (
                <Link
                  key={it.href}
                  href={it.href}
                  className={
                    "flex cursor-pointer items-center gap-[9px] rounded-md px-2.5 py-[7px] text-[13px] " +
                    (active
                      ? "bg-white font-medium text-ink shadow-[0_0_0_1px_var(--color-line),0_1px_2px_rgba(0,0,0,0.02)]"
                      : "text-sub hover:bg-line-soft hover:text-ink")
                  }
                >
                  <Ico name={it.icon} />
                  <span>{it.label}</span>
                  {it.dot ? (
                    <span className="ml-auto text-[11px] font-semibold text-warn">
                      {it.dot}
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="flex items-center gap-[9px] border-t border-line-soft p-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-soft text-[11px] font-semibold text-accent">
          김
        </div>
        <div className="flex flex-col">
          <span className="text-[12.5px] font-medium">김민지 회계사</span>
          <span className="text-[10.5px] text-muted">감사 1팀 · 매니저</span>
        </div>
      </div>
    </aside>
  );
}
