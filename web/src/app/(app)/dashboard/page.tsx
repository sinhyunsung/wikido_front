import { Shell } from "@/components/shell/Shell";
import { Ico } from "@/components/shell/Ico";
import { Sparkline } from "@/components/ui/Sparkline";

/**
 * Home dashboard.
 *
 * Mirrors `Screen_Home` from dashboard_design/screens/screens-1.jsx.
 * Per Implementation.md §2.1, every value here is a mockup — when the API
 * lands, replace these literal arrays with TanStack Query calls.
 */

const KPI_CARDS: Array<{
  label: string;
  value: string;
  sub: string;
  spark?: number[];
  warn?: boolean;
}> = [
  { label: "관리 회사", value: "47", sub: "+2 이번 분기", spark: [3, 5, 4, 6, 7, 6, 8, 9] },
  { label: "위키 문서", value: "1,284", sub: "+38 최근 7일", spark: [10, 12, 11, 14, 13, 16, 18, 20] },
  { label: "태그된 파일", value: "8,732", sub: "92% 자동분류", spark: [8, 9, 11, 10, 13, 14, 15, 17] },
  { label: "세법 변경 알림", value: "3", sub: "영향 회사 12개", warn: true },
];

const TAX_ALERTS = [
  {
    date: "2026-05-06",
    law: "법인세법 시행령 §19",
    title: "업무용 승용차 손금산입 한도 인상 (1,500만원 → 1,800만원)",
    coCount: 7,
    src: "국세청 고시 2026-12",
  },
  {
    date: "2026-05-02",
    law: "조특법 §10",
    title: "연구·인력개발비 세액공제 대상 신기술 추가 (AI·반도체 8개 분야)",
    coCount: 4,
    src: "기획재정부 보도자료",
  },
  {
    date: "2026-04-28",
    law: "부가가치세법 §11",
    title: "영세율 적용 대상 용역 범위 일부 개정",
    coCount: 1,
    src: "국세청 예규",
  },
];

const RECENT_COMPANIES = [
  { name: "(주)대한제강", industry: "1차 금속 제조", month: "12월", task: "2025 세무조정", spark: [12, 11, 10, 9, 8, 7], updated: "2일 전" },
  { name: "바이오넥스(주)", industry: "의약품 제조", month: "12월", task: "외부감사", spark: [5, 7, 8, 10, 12, 14], updated: "3일 전" },
  { name: "에이치엠로지스", industry: "운송 서비스", month: "3월", task: "가치평가 용역", spark: [20, 18, 17, 15, 14, 13], updated: "1주 전" },
  { name: "(주)서린식품", industry: "식료품 제조", month: "12월", task: "2024 세무조정", spark: [8, 8, 9, 9, 10, 10], updated: "2주 전" },
];

const TODAY = [
  { time: "10:30", label: "대한제강 — 세무조정 1차 검토", tag: "세무조정" },
  { time: "14:00", label: "바이오넥스 — 감사 인터뷰", tag: "감사" },
  { time: "D-2", label: "서린식품 부가세 신고", tag: "부가세", warn: true },
  { time: "D-9", label: "에이치엠 가치평가 용역 납기", tag: "용역" },
];

const RECENT_WIKI = [
  { who: "시스템", action: "자동 컴파일", what: "대한제강 / 차입금 추세 페이지 갱신", when: "10분 전", system: true },
  { who: "박재현", action: "편집", what: "특수관계자 거래 손금불산입 정리", when: "1시간 전" },
  { who: "시스템", action: "태그 추출", what: "47건 파일에 회사·업무 태그 자동 부여", when: "3시간 전", system: true },
  { who: "김민지", action: "생성", what: "2026 R&D 세액공제 신기술 분야", when: "어제" },
];

const QUICK_SEARCHES = [
  "#2025년 #세무조정",
  "#감사 @대한제강",
  "#R&D세액공제",
  "#가치평가 #2024",
  "#영업권 #손상",
];

export default function DashboardPage() {
  return (
    <Shell crumbs={["홈", "대시보드"]}>
      {/* Greeting + primary actions */}
      <div className="mb-[18px] flex items-end justify-between">
        <div>
          <div className="text-[22px] font-bold tracking-[-0.02em]">
            안녕하세요, 김민지 회계사님
          </div>
          <div className="mt-1.5 text-[11.5px] text-muted">
            2026년 5월 7일 목요일 · 오늘 처리할 업무 4건
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <button className="ww-btn">
            <Ico name="upload" />
            파일 업로드
          </button>
          <button className="ww-btn ww-btn-primary">
            <Ico name="plus" />새 위키 페이지
          </button>
        </div>
      </div>

      {/* KPI strip */}
      <div className="mb-4 grid grid-cols-4 gap-[14px]">
        {KPI_CARDS.map((c, i) => (
          <div key={i} className="ww-card relative px-4 py-[14px]">
            <div className="text-[11.5px] text-muted">{c.label}</div>
            <div className="mt-1.5 flex items-end justify-between">
              <div
                className={
                  "text-[26px] font-bold tracking-[-0.02em] " +
                  (c.warn ? "text-warn" : "text-ink")
                }
              >
                {c.value}
              </div>
              {c.spark && <Sparkline data={c.spark} w={90} h={28} />}
              {c.warn && <Ico name="alert" lg />}
            </div>
            <div
              className={
                "mt-1 text-[11.5px] " + (c.warn ? "text-warn" : "text-muted")
              }
            >
              {c.sub}
            </div>
          </div>
        ))}
      </div>

      {/* Two-column main */}
      <div className="grid gap-[14px]" style={{ gridTemplateColumns: "1.4fr 1fr" }}>
        {/* Left column */}
        <div className="flex flex-col gap-4">
          {/* Tax change alerts */}
          <div className="ww-card">
            <div className="ww-card-h">
              <Ico name="alert" />
              <div className="text-[15px] font-semibold tracking-[-0.01em]">
                세법 변경 알림
              </div>
              <span className="ww-tag ww-tag-warn">3건 미확인</span>
              <span className="ml-auto text-[11.5px] text-muted">
                자동 점검 · 매일 06:00
              </span>
            </div>
            <div>
              {TAX_ALERTS.map((a, i) => (
                <div
                  key={i}
                  className={
                    "flex gap-[14px] px-4 py-[13px] " +
                    (i < TAX_ALERTS.length - 1
                      ? "border-b border-line-soft"
                      : "")
                  }
                >
                  <div className="w-1 self-stretch rounded-sm bg-warn" />
                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <span className="ww-tag ww-tag-warn">{a.law}</span>
                      <span className="text-[11.5px] text-muted">
                        {a.date} · {a.src}
                      </span>
                    </div>
                    <div className="mb-1.5 text-[13.5px] font-medium">
                      {a.title}
                    </div>
                    <div className="text-[11.5px] text-muted">
                      영향받는 회사{" "}
                      <b className="text-ink">{a.coCount}개</b> · 관련 업무 세무조정
                      ·{" "}
                      <span className="cursor-pointer text-accent">
                        영향 분석 보기 →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent companies table */}
          <div className="ww-card">
            <div className="ww-card-h">
              <Ico name="building" />
              <div className="text-[15px] font-semibold tracking-[-0.01em]">
                최근 작업한 회사
              </div>
              <span className="ml-auto cursor-pointer text-[12px] text-accent">
                전체 보기 →
              </span>
            </div>
            <table className="ww-tbl">
              <thead>
                <tr>
                  <th>회사</th>
                  <th>업종</th>
                  <th>결산월</th>
                  <th>최근 업무</th>
                  <th>차입금 추세</th>
                  <th>최종 작업</th>
                </tr>
              </thead>
              <tbody>
                {RECENT_COMPANIES.map((r, i) => (
                  <tr key={i}>
                    <td>
                      <span className="ww-tag ww-tag-co">{r.name}</span>
                    </td>
                    <td className="text-muted">{r.industry}</td>
                    <td className="text-muted">{r.month}</td>
                    <td>
                      <span className="ww-tag ww-tag-task">{r.task}</span>
                    </td>
                    <td>
                      <Sparkline data={r.spark} w={80} h={22} />
                    </td>
                    <td className="text-muted">{r.updated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-4">
          {/* Today */}
          <div className="ww-card">
            <div className="ww-card-h">
              <Ico name="clock" />
              <div className="text-[15px] font-semibold tracking-[-0.01em]">
                오늘 일정 · 마감
              </div>
            </div>
            <div>
              {TODAY.map((e, i) => (
                <div
                  key={i}
                  className={
                    "flex items-center gap-2.5 px-4 py-[11px] " +
                    (i > 0 ? "border-t border-line-soft" : "")
                  }
                >
                  <div
                    className={
                      "w-[42px] font-mono text-[11px] font-semibold " +
                      (e.warn ? "text-warn" : "text-muted")
                    }
                  >
                    {e.time}
                  </div>
                  <div className="flex-1 text-[12.5px]">{e.label}</div>
                  <span className="ww-tag ww-tag-task">{e.tag}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent wiki activity */}
          <div className="ww-card">
            <div className="ww-card-h">
              <Ico name="book" />
              <div className="text-[15px] font-semibold tracking-[-0.01em]">
                최근 위키 활동
              </div>
            </div>
            <div>
              {RECENT_WIKI.map((a, i) => (
                <div
                  key={i}
                  className={
                    "px-4 py-2.5 " + (i > 0 ? "border-t border-line-soft" : "")
                  }
                >
                  <div className="mb-0.5 flex items-center gap-1.5">
                    <span
                      className={
                        "text-[11.5px] font-medium " +
                        (a.system ? "text-accent" : "text-ink")
                      }
                    >
                      {a.who}
                    </span>
                    <span className="text-[11.5px] text-muted">
                      · {a.action} · {a.when}
                    </span>
                  </div>
                  <div className="text-[12.5px] text-sub">{a.what}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Saved searches */}
          <div className="ww-card">
            <div className="ww-card-h">
              <Ico name="search" />
              <div className="text-[15px] font-semibold tracking-[-0.01em]">
                자주 쓰는 검색
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 px-4 py-[14px]">
              {QUICK_SEARCHES.map((q, i) => (
                <span
                  key={i}
                  className="ww-tag cursor-pointer font-mono text-[11px]"
                >
                  {q}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}
