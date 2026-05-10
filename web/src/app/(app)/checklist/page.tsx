import { Shell } from "@/components/shell/Shell";
import { Ico } from "@/components/shell/Ico";

/**
 * Tax adjustment checklist. Mirrors `Screen_Checklist` in screens-3.jsx.
 */

type ItemStatus = "완료" | "검토중" | "대기";
const STATUS_TAG: Record<ItemStatus, string> = {
  "완료": "ww-tag-good",
  "검토중": "ww-tag-warn",
  "대기": "",
};

const GROUPS: Array<{
  h: string;
  items: Array<{
    n: string;
    t: string;
    s: ItemStatus;
    note?: string;
    update?: string;
    important?: boolean;
  }>;
}> = [
  {
    h: "1. 익금산입·손금불산입",
    items: [
      { n: "01", t: "법인세비용 손금불산입", s: "완료", note: "전기 미환급 가산세 320만 포함" },
      { n: "02", t: "벌과금·과태료", s: "완료" },
      { n: "03", t: "업무무관 자산 관련 비용", s: "완료", note: "대표이사 가지급금 4건" },
      { n: "04", t: "기부금 한도초과", s: "검토중", note: "특례기부금 한도 재계산 — 2026 적용" },
      { n: "05", t: "접대비 한도초과", s: "대기", update: "2026 한도식 변경 — 자동 반영됨" },
    ],
  },
  {
    h: "2. 손금산입·익금불산입",
    items: [
      { n: "06", t: "업무용 승용차 한도", s: "대기", update: "⚡ 2026-07 한도 1,500→1,800만 인상", important: true },
      { n: "07", t: "감가상각비 신고조정", s: "검토중" },
      { n: "08", t: "대손충당금 한도", s: "완료" },
      { n: "09", t: "퇴직급여충당금", s: "대기" },
      { n: "10", t: "외화환산손익", s: "완료" },
    ],
  },
  {
    h: "3. 세액공제·감면 (조특법)",
    items: [
      { n: "11", t: "R&D 세액공제", s: "검토중", update: "⚡ 2026-04 신기술 8개 분야 추가", important: true },
      { n: "12", t: "고용증대 세액공제", s: "완료", note: "+8명, 18개월 유지 확인" },
      { n: "13", t: "중소기업 통합투자 세액공제", s: "대기" },
      { n: "14", t: "외국납부세액공제", s: "완료" },
    ],
  },
  {
    h: "4. 특수관계자 거래",
    items: [
      { n: "15", t: "인정이자 (가지급금)", s: "검토중", note: "대표이사 가지급 12억 — 4.6% 적용", update: "2026 인정이자율 동결 확인" },
      { n: "16", t: "특수관계자 매출·매입", s: "완료" },
      { n: "17", t: "과소자본세제", s: "완료", note: "한도 내 (0.17×)" },
    ],
  },
];

export default function ChecklistPage() {
  return (
    <Shell crumbs={["세무조정 체크리스트", "(주)대한제강 · 2025"]}>
      <div className="mb-[14px] flex items-center gap-[14px]">
        <div className="flex-1">
          <div className="mb-1.5 flex items-center gap-2">
            <div className="text-[22px] font-bold tracking-[-0.02em]">
              법인세 세무조정 체크리스트
            </div>
            <span className="ww-tag ww-tag-co">(주)대한제강 · 2025</span>
          </div>
          <div className="text-[11.5px] text-muted">
            2026년 개정 적용 항목 자동 표시 · 진행 18 / 32 항목 · 마감 D-15
          </div>
        </div>
        <button className="ww-btn">
          <Ico name="ext" />
          PDF 출력
        </button>
        <button className="ww-btn ww-btn-primary">
          <Ico name="check" />
          저장
        </button>
      </div>

      {/* Progress */}
      <div className="ww-card mb-[14px] p-[14px]">
        <div className="mb-2 flex items-center">
          <span className="text-[13px] font-semibold tracking-[-0.005em]">전체 진행률</span>
          <span className="ml-auto text-[13px] font-semibold">56% · 18/32</span>
        </div>
        <div className="h-2.5 overflow-hidden rounded-[5px] bg-line-soft">
          <div className="flex h-full">
            <div className="bg-good" style={{ width: "40%" }} />
            <div className="bg-warn" style={{ width: "16%" }} />
          </div>
        </div>
        <div className="mt-2 flex items-center gap-[14px] text-[11.5px] text-muted">
          <span>
            <span className="mr-1.5 inline-block h-2 w-2 rounded-sm bg-good" />
            완료 13
          </span>
          <span>
            <span className="mr-1.5 inline-block h-2 w-2 rounded-sm bg-warn" />
            검토중 5
          </span>
          <span>
            <span className="mr-1.5 inline-block h-2 w-2 rounded-sm bg-line-soft" />
            대기 14
          </span>
          <span className="ml-auto flex items-center gap-1 text-warn">
            <Ico name="alert" /> 2026 개정 적용 5건
          </span>
        </div>
      </div>

      <div className="grid gap-[14px]" style={{ gridTemplateColumns: "1fr" }}>
        {GROUPS.map((g, i) => (
          <div key={i} className="ww-card">
            <div className="ww-card-h">
              <div className="text-[15px] font-semibold tracking-[-0.01em]">{g.h}</div>
              <span className="ml-auto text-[11.5px] text-muted">{g.items.length} 항목</span>
            </div>
            <div>
              {g.items.map((it, j) => (
                <div
                  key={j}
                  className={
                    "flex items-center gap-3 px-4 py-3 " +
                    (j > 0 ? "border-t border-line-soft" : "")
                  }
                  style={{ background: it.important ? "var(--color-warn-soft)" : "transparent" }}
                >
                  <input
                    type="checkbox"
                    defaultChecked={it.s === "완료"}
                    style={{ accentColor: "var(--color-accent)", width: 16, height: 16 }}
                  />
                  <span className="w-6 font-mono text-[11px] text-muted">{it.n}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={
                          "text-[13px] font-medium " +
                          (it.s === "완료" ? "text-muted line-through" : "text-ink")
                        }
                      >
                        {it.t}
                      </span>
                      {it.update && (
                        <span
                          className="ww-tag ww-tag-warn"
                          style={{ fontSize: 10.5, height: 18 }}
                        >
                          {it.update}
                        </span>
                      )}
                    </div>
                    {it.note && (
                      <div className="mt-0.5 text-[11.5px] text-muted">{it.note}</div>
                    )}
                  </div>
                  <span className={"ww-tag " + STATUS_TAG[it.s]}>{it.s}</span>
                  <Ico name="ext" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Shell>
  );
}
