import { Shell } from "@/components/shell/Shell";
import { Ico } from "@/components/shell/Ico";
import { Sparkline } from "@/components/ui/Sparkline";

/**
 * Company permanent records (영구조서) detail. Mirrors `Screen_Company` in
 * screens-1.jsx — hardcoded to (주)대한제강 as a representative example.
 * Real implementation would key off /companies/[id].
 */

const TABS = ["개요", "재무 추세", "주주 변화", "업무 이력", "관련 위키", "파일", "특이사항"];

const KPIS: Array<{
  k: string;
  v: string;
  sub: string;
  s: number[];
  good?: boolean;
}> = [
  { k: "매출액 (2025)", v: "1,847억", sub: "전년비 +6.2%", s: [1500, 1620, 1580, 1700, 1740, 1847] },
  { k: "영업이익 (2025)", v: "128억", sub: "전년비 +12%", s: [80, 95, 100, 108, 115, 128] },
  { k: "차입금 잔액", v: "142억", sub: "전년비 -28%", s: [210, 200, 195, 170, 160, 142], good: true },
  { k: "자본금", v: "50억", sub: "무상증자 2023", s: [30, 30, 40, 40, 50, 50] },
  { k: "직원 수", v: "142명", sub: "+8 (1년)", s: [120, 124, 128, 134, 136, 142] },
  { k: "주요주주 변화", v: "2회", sub: "최근 5년", s: [0, 1, 0, 1, 0, 0] },
];

const TIMELINE: Array<{
  y: string;
  m: string;
  t: string;
  tag: string;
  who: string;
  d: string;
  good?: boolean;
}> = [
  { y: "2026", m: "04", t: "2025 외부감사", tag: "감사", who: "김민지·박재현", d: "진행중", good: true },
  { y: "2026", m: "02", t: "2025 법인세 세무조정", tag: "세무조정", who: "김민지", d: "완료" },
  { y: "2025", m: "11", t: "무형자산 손상 검토 용역", tag: "용역", who: "박재현", d: "완료" },
  { y: "2025", m: "04", t: "2024 외부감사", tag: "감사", who: "김민지", d: "완료" },
  { y: "2024", m: "09", t: "영업권 가치평가", tag: "가치평가", who: "외부 평가법인", d: "완료" },
  { y: "2024", m: "02", t: "2023 법인세 세무조정", tag: "세무조정", who: "정수아", d: "완료" },
];

const NOTES: Array<{ y: string; t: string; src: string }> = [
  { y: "2026", t: "차입금 142억으로 30% 감소. 2024년 발행 회사채 200억 중 60억 조기상환", src: "재무제표 2025" },
  { y: "2025", t: "대표이사 자녀(김OO) 지분 5% 신규 취득 — 특수관계자 거래 모니터링 필요", src: "주주명부 2025-06" },
  { y: "2024", t: "영업권 손상 24억 인식. 인수 자회사(주)동방금속 사업부 매각", src: "감사보고서 2024" },
  { y: "2023", t: "무상증자(자본금 40억→50억). 잉여금 자본전입", src: "법인등기부" },
];

const SHAREHOLDERS = [
  { n: "김도현 (대표)", p: 42, color: "#3949ab", d: "-" },
  { n: "(주)대한홀딩스", p: 24, color: "#5c6bc0", d: "-" },
  { n: "우리사주조합", p: 8, color: "#9fa8da", d: "-" },
  { n: "김OO (대표 자녀)", p: 5, color: "#b8741b", d: "+5.0% (2025)" },
  { n: "기타 소액주주", p: 21, color: "#cfcfca", d: "-0.5%" },
];

const LINKED_WIKI: [string, string][] = [
  ["/wiki/co/daehan/loans-analysis.md", "차입금 분석 — 과소자본세제"],
  ["/wiki/co/daehan/related-parties.md", "특수관계자 매핑"],
  ["/wiki/co/daehan/impairment-2024.md", "영업권 손상 2024"],
  ["/wiki/co/daehan/audit-2025-plan.md", "2025 감사 계획서"],
];

const BASIC_INFO: [string, string][] = [
  ["업종", "C241 1차 금속"],
  ["결산월", "12월 (한국)"],
  ["상장", "코스피 (2018-)"],
  ["감사인", "당기 신규 (전기 A회계법인)"],
  ["외감대상", "자산 1,200억 / 매출 1,847억"],
  ["연결대상", "자회사 3개"],
  ["주거래은행", "신한 / 우리"],
  ["세무대리", "자체"],
];

export default function CompaniesPage() {
  return (
    <Shell crumbs={["회사별 영구조서", "(주)대한제강"]}>
      {/* Header */}
      <div className="mb-[18px] flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-ink text-[22px] font-bold tracking-[-0.02em] text-white">
          대한
        </div>
        <div className="flex-1">
          <div className="mb-1 flex items-center gap-2">
            <div className="text-[22px] font-bold tracking-[-0.02em]">(주)대한제강</div>
            <span className="ww-tag ww-tag-co">사업자 124-86-01532</span>
            <span className="ww-tag ww-tag-good">감사 진행중</span>
          </div>
          <div className="text-[11.5px] text-muted">
            1차 금속 제조 (C241) · 결산월 12월 · 직원 142명 · 본점 인천 · 대표이사 김도현 · 영구조서 마지막 갱신 2026-04-30
          </div>
        </div>
        <button className="ww-btn">
          <Ico name="folder" />
          원본 폴더
        </button>
        <button className="ww-btn ww-btn-primary">
          <Ico name="plus" />
          업무 추가
        </button>
      </div>

      {/* Tabs */}
      <div className="mb-[18px] flex items-center border-b border-line">
        {TABS.map((t, i) => (
          <div
            key={t}
            className={
              "-mb-px cursor-pointer px-4 py-[9px] text-[12.5px] " +
              (i === 0
                ? "border-b-2 border-ink font-semibold text-ink"
                : "border-b-2 border-transparent text-sub")
            }
          >
            {t}
          </div>
        ))}
      </div>

      {/* KPI grid */}
      <div className="mb-[14px] grid grid-cols-3 gap-[14px]">
        {KPIS.map((c, i) => (
          <div key={i} className="ww-card p-[14px_16px]">
            <div className="flex items-center">
              <div className="text-[11.5px] text-muted">{c.k}</div>
              <div className="ml-auto">
                <Sparkline data={c.s} w={80} h={26} color={c.good ? "var(--color-good)" : "var(--color-accent)"} />
              </div>
            </div>
            <div className="mt-1 text-[24px] font-bold tracking-[-0.02em]">{c.v}</div>
            <div className={"mt-0.5 text-[11.5px] " + (c.good ? "text-good" : "text-muted")}>
              {c.sub}
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-[14px]" style={{ gridTemplateColumns: "1.3fr 1fr" }}>
        {/* Left column */}
        <div className="flex flex-col gap-[14px]">
          {/* Work timeline */}
          <div className="ww-card">
            <div className="ww-card-h">
              <Ico name="clock" />
              <div className="text-[15px] font-semibold tracking-[-0.01em]">수행 업무 이력</div>
              <span className="ml-auto text-[11.5px] text-muted">전체 18건 · 폴더 분류 무관 통합</span>
            </div>
            <div className="px-0 pt-1">
              <div className="relative pl-[30px]">
                <div className="absolute bottom-2 top-2 left-[14px] w-px bg-line" />
                {TIMELINE.map((e, i) => (
                  <div key={i} className="relative flex gap-[14px] px-2 py-2.5 pl-2 pr-4">
                    <div
                      className={
                        "absolute top-[14px] left-[-22px] h-[11px] w-[11px] rounded-full border-2 " +
                        (e.good ? "border-accent bg-accent" : "border-line bg-white")
                      }
                    />
                    <div className="w-[54px] font-mono text-[11px] text-muted">
                      {e.y}.{e.m}
                    </div>
                    <div className="flex-1">
                      <div className="mb-0.5 flex items-center gap-1.5">
                        <span className="text-[13px] font-medium">{e.t}</span>
                        <span className="ww-tag ww-tag-task" style={{ height: 18, fontSize: 10.5 }}>
                          {e.tag}
                        </span>
                        {e.good && (
                          <span className="ww-tag ww-tag-good" style={{ height: 18, fontSize: 10.5 }}>
                            진행중
                          </span>
                        )}
                      </div>
                      <div className="text-[11.5px] text-muted">
                        {e.who} · {e.d}
                      </div>
                    </div>
                    <Ico name="arrow-r" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Notable changes */}
          <div className="ww-card">
            <div className="ww-card-h">
              <Ico name="spark" />
              <div className="text-[15px] font-semibold tracking-[-0.01em]">특이사항 메모</div>
              <span
                className="ww-tag ml-auto"
                style={{ background: "var(--color-accent-soft)", color: "var(--color-accent)" }}
              >
                LLM 자동 추출
              </span>
            </div>
            <div>
              {NOTES.map((m, i) => (
                <div
                  key={i}
                  className={
                    "flex gap-3 px-4 py-[11px] " + (i > 0 ? "border-t border-line-soft" : "")
                  }
                >
                  <span className="ww-tag ww-tag-year flex-shrink-0">{m.y}</span>
                  <div className="flex-1 text-[12.5px] leading-[1.5] text-ink">{m.t}</div>
                  <span className="flex-shrink-0 font-mono text-[11.5px] text-muted">{m.src}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-[14px]">
          {/* Basic info */}
          <div className="ww-card">
            <div className="ww-card-h">
              <Ico name="building" />
              <div className="text-[15px] font-semibold tracking-[-0.01em]">기본 정보</div>
            </div>
            <div className="ww-card-b grid grid-cols-2 gap-3">
              {BASIC_INFO.map(([k, v]) => (
                <div key={k} className="flex flex-col gap-[3px]">
                  <span className="text-[11px] text-muted">{k}</span>
                  <span className="text-[13px] font-medium text-ink">{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Shareholders */}
          <div className="ww-card">
            <div className="ww-card-h">
              <Ico name="users" />
              <div className="text-[15px] font-semibold tracking-[-0.01em]">주주 분포</div>
              <span className="ww-tag ml-auto">2025-12 기준</span>
            </div>
            <div className="ww-card-b">
              <div className="mb-2.5 flex h-[22px] overflow-hidden rounded-[5px]">
                {SHAREHOLDERS.map((s, i) => (
                  <div key={i} style={{ width: `${s.p}%`, background: s.color }} />
                ))}
              </div>
              <div className="flex flex-col gap-1.5">
                {SHAREHOLDERS.map((s, i) => (
                  <div key={i} className="flex items-center gap-2 text-[12px]">
                    <div className="h-2 w-2 rounded-sm" style={{ background: s.color }} />
                    <span className="flex-1">{s.n}</span>
                    <span className="font-mono">{s.p.toFixed(1)}%</span>
                    <span
                      className={
                        "w-[90px] text-right text-[11.5px] " +
                        (s.d.startsWith("+5") ? "text-warn" : "text-muted")
                      }
                    >
                      {s.d}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Linked wiki */}
          <div className="ww-card">
            <div className="ww-card-h">
              <Ico name="link" />
              <div className="text-[15px] font-semibold tracking-[-0.01em]">관련 위키 · 빠른 진입점</div>
            </div>
            <div>
              {LINKED_WIKI.map(([path, title], i) => (
                <div
                  key={i}
                  className={
                    "flex cursor-pointer items-center gap-2.5 px-4 py-2.5 " +
                    (i > 0 ? "border-t border-line-soft" : "")
                  }
                >
                  <Ico name="book" />
                  <span className="flex-1 text-[12.5px]">{title}</span>
                  <span className="font-mono text-[11.5px] text-muted">{path}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Next */}
          <div
            className="ww-card"
            style={{ borderColor: "var(--color-warn)", background: "var(--color-warn-soft)" }}
          >
            <div className="ww-card-b">
              <div className="mb-1.5 flex items-center gap-2">
                <Ico name="alert" />
                <div className="text-[13px] font-semibold text-warn">다음 예정 업무</div>
              </div>
              <div className="text-[13px] font-medium">
                2025년 외부감사 보고서 발행 — 2026-05-22 (D-15)
              </div>
              <div className="mt-[3px] text-[11.5px] text-muted">
                다음: 2026-Q2 부가세 신고 (D-58)
              </div>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}
