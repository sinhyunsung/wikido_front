import { Shell } from "@/components/shell/Shell";
import { Ico } from "@/components/shell/Ico";
import { Cite } from "@/components/ui/Cite";

/**
 * Search results page. Mirrors `Screen_Search` in dashboard_design/screens/screens-1.jsx.
 * All data is mockup per Implementation.md §2.1; replace with TanStack Query later.
 */

const FILTER_GROUPS = [
  { h: "연도", items: ["2026 (8)", "2025 (24)", "2024 (19)", "2023 (14)", "이전 (19)"] },
  { h: "업무", items: ["세무조정 (38)", "외부감사 (22)", "가치평가 (9)", "용역 (15)"] },
  { h: "회사", items: ["대한제강 (12)", "바이오넥스 (8)", "서린식품 (6)", "에이치엠 (5)", "그 외 41"] },
  { h: "문서 종류", items: ["위키 (12)", "조서 (28)", "예규 (7)", "계약서 (9)", "기타 (28)"] },
];

const TOP_SOURCES: [string, string, string][] = [
  ["[1]", "법인세법 §28의2 (과소자본세제)", "국세청 법령 / 2025-12-31 시행"],
  ["[2]", "법인세법 시행령 §89 (인정이자)", "기획재정부 / 2026-01-01 개정"],
  ["[3]", "/companies/daehan-steel/loans-2025.md", "내부 위키 · 2026-04-12 갱신"],
];

type ResultType = "wiki" | "co" | "file" | "rule";
const RESULTS: Array<{
  type: ResultType;
  title: string;
  snippet: string;
  meta: string[];
  src: string;
}> = [
  { type: "wiki", title: "과소자본세제 적용 판단 가이드", snippet: "…차입금이 자기자본의 2배를 초과하는 경우 초과분의 지급이자는 손금불산입…", meta: ["위키", "2026-04", "김민지"], src: "/wiki/tax/under-capitalization.md" },
  { type: "co", title: "대한제강 / 2025 차입금 분석", snippet: "…차입금 잔액 142억(전년比 -28%), 자기자본의 1.7배로 한도 내. 단 특수관계자 분 35억은 인정이자 검토 필요…", meta: ["회사", "2025", "세무조정"], src: "/companies/daehan-steel/loans-2025.md" },
  { type: "file", title: "서린식품_차입약정서_2024.pdf", snippet: "…연 4.2%, 만기 2027-12, 보증인 김OO(대표이사 특수관계)…", meta: ["파일", "2024", "계약서", "서린식품"], src: "raw/seorin/contracts/loan-2024.pdf" },
  { type: "rule", title: "국세청 예규 법규-1284 (2025)", snippet: "…동일인이 양 법인을 지배하는 경우 특수관계 성립…", meta: ["예규", "2025"], src: "외부 / 국세청" },
  { type: "wiki", title: "특수관계자 거래 — 인정이자율 적용", snippet: "…2026년 인정이자율 4.6%, 가중평균차입이자율과 비교 후 높은 율 적용…", meta: ["위키", "2026-01", "박재현"], src: "/wiki/tax/related-party-interest.md" },
];

const TYPE_ICON: Record<ResultType, "book" | "building" | "doc"> = {
  wiki: "book",
  co: "building",
  file: "doc",
  rule: "doc",
};

export default function SearchPage() {
  return (
    <Shell crumbs={["통합 검색", '"차입금 손금불산입"']} search="차입금 손금불산입">
      {/* Header + type filter chips */}
      <div className="mb-4 flex items-start gap-[14px]">
        <div className="flex-1">
          <div className="text-[22px] font-bold tracking-[-0.02em]">
            &quot;차입금 손금불산입&quot;{" "}
            <span className="text-[18px] font-normal text-muted">검색 결과 84건</span>
          </div>
          <div className="mt-2.5 flex items-center gap-1.5">
            <span className="ww-tag" style={{ background: "#1a1a1a", color: "#fff" }}>
              전체 84
            </span>
            <span className="ww-tag">위키 12</span>
            <span className="ww-tag">회사 7</span>
            <span className="ww-tag">파일 58</span>
            <span className="ww-tag">예규·판례 7</span>
          </div>
        </div>
      </div>

      <div className="grid gap-[14px]" style={{ gridTemplateColumns: "200px 1fr" }}>
        {/* Filter panel */}
        <div className="ww-card self-start">
          <div className="ww-card-h">
            <Ico name="filter" />
            <div className="text-[15px] font-semibold tracking-[-0.01em]">필터</div>
          </div>
          <div className="ww-card-b flex flex-col gap-[14px]">
            {FILTER_GROUPS.map((g, i) => (
              <div key={i}>
                <div className="mb-1.5 text-[13px] font-semibold tracking-[-0.005em]">
                  {g.h}
                </div>
                <div className="flex flex-col gap-1">
                  {g.items.map((it, j) => (
                    <label
                      key={j}
                      className="flex cursor-pointer items-center gap-[7px] text-[12px] text-sub"
                    >
                      <input
                        type="checkbox"
                        defaultChecked={i === 0 && j < 2}
                        style={{ accentColor: "var(--color-accent)" }}
                      />
                      {it}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="flex flex-col gap-2.5">
          <div className="mb-0.5 flex items-center justify-between">
            <span className="text-[11.5px] text-muted">관련도순 · 최근 결과 우선</span>
            <button className="ww-btn ww-btn-sm">
              <Ico name="sort" /> 정렬
            </button>
          </div>

          {/* Top wiki answer */}
          <div className="ww-card" style={{ borderColor: "var(--color-accent)", borderWidth: 1.5 }}>
            <div
              className="ww-card-h"
              style={{ background: "var(--color-accent-soft)", borderRadius: "10px 10px 0 0" }}
            >
              <Ico name="spark" />
              <div className="text-[15px] font-semibold tracking-[-0.01em] text-accent">
                위키 통합 답변
              </div>
              <span
                className="ww-tag"
                style={{ background: "#fff", color: "var(--color-accent)" }}
              >
                3개 출처 종합
              </span>
            </div>
            <div className="ww-card-b">
              <div className="text-[13.5px] leading-[1.65] text-ink">
                차입금이 자기자본의 <b>2배를 초과</b>하는 경우, 초과분에 대한 지급이자는
                과소자본세제(법인세법 §28의2)에 의해 손금불산입됩니다{" "}
                <Cite n={1} src="법인세법 §28의2" />.
                특수관계자 차입의 경우 <b>인정이자율(연 4.6%, 2026년 기준)</b>을 적용한 시가
                검토가 필요합니다 <Cite n={2} src="법인세법 시행령 §89" />.
                관리 중인 회사 중{" "}
                <span className="font-medium text-accent">대한제강 · 서린식품</span>이 본 규정
                적용 대상입니다 <Cite n={3} src="회사별 영구조서 / 차입금 분석" />.
              </div>
              <div className="ww-divider" />
              <div className="mb-1.5 text-[11.5px] text-muted">출처</div>
              <div className="flex flex-col gap-1.5">
                {TOP_SOURCES.map(([n, title, sub], i) => (
                  <div key={i} className="flex items-center gap-2 text-[12px]">
                    <span className="w-6 font-mono font-semibold text-accent">{n}</span>
                    <span className="font-medium text-ink">{title}</span>
                    <span className="ml-auto text-[11.5px] text-muted">{sub}</span>
                    <Ico name="ext" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Result list */}
          {RESULTS.map((r, i) => (
            <div key={i} className="ww-card ww-card-b flex items-start gap-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-[7px] bg-line-soft">
                <Ico name={TYPE_ICON[r.type]} lg />
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-0.5 flex items-center gap-2">
                  <span className="text-[13.5px] font-semibold text-ink">{r.title}</span>
                  <span className="font-mono text-[11.5px] text-muted">{r.src}</span>
                </div>
                <div className="mb-[7px] text-[12.5px] leading-[1.55] text-sub">
                  {r.snippet}
                </div>
                <div className="flex items-center gap-1.5">
                  {r.meta.map((m, j) => (
                    <span
                      key={j}
                      className="ww-tag"
                      style={{ height: 18, fontSize: 10.5, padding: "0 6px" }}
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
              <Ico name="arrow-r" />
            </div>
          ))}
        </div>
      </div>
    </Shell>
  );
}
