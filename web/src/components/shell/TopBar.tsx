import { Ico } from "./Ico";

interface TopBarProps {
  /** Breadcrumb segments rendered left-to-right; the last is bold. */
  crumbs?: string[];
  /** Pre-filled search input value. */
  searchValue?: string;
}

export function TopBar({ crumbs = [], searchValue = "" }: TopBarProps) {
  return (
    <div className="flex h-[52px] flex-none items-center gap-[14px] border-b border-line bg-white px-[22px]">
      <div className="flex items-center gap-2 text-[12.5px] text-sub">
        {crumbs.map((c, i) => (
          <span key={i} className="flex items-center gap-2">
            {i > 0 && <span className="text-muted">/</span>}
            {i === crumbs.length - 1 ? (
              <b className="font-medium text-ink">{c}</b>
            ) : (
              <span>{c}</span>
            )}
          </span>
        ))}
      </div>
      <div className="flex h-8 max-w-[520px] flex-1 items-center gap-[9px] rounded-[7px] border border-line bg-[#fbfaf7] px-3">
        <Ico name="search" />
        <input
          className="flex-1 border-0 bg-transparent font-sans text-[13px] text-ink outline-none"
          placeholder="회사 · 업무 · 연도 · 키워드 검색"
          defaultValue={searchValue}
        />
        <kbd className="rounded border border-line bg-white px-[5px] py-[1.5px] font-mono text-[10px] text-muted">
          ⌘K
        </kbd>
      </div>
      <div className="ml-auto flex items-center gap-1.5">
        <div className="relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-[7px] text-sub hover:bg-line-soft hover:text-ink">
          <Ico name="upload" lg />
        </div>
        <div className="relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-[7px] text-sub hover:bg-line-soft hover:text-ink">
          <Ico name="bell" lg />
          <span className="absolute right-[5px] top-[5px] h-[7px] w-[7px] rounded-full border-[1.5px] border-white bg-warn" />
        </div>
        <div className="relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-[7px] text-sub hover:bg-line-soft hover:text-ink">
          <Ico name="cog" lg />
        </div>
      </div>
    </div>
  );
}
