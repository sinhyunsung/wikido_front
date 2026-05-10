import Link from "next/link";
import { Shell } from "@/components/shell/Shell";
import { Ico } from "@/components/shell/Ico";

/**
 * Tax change alerts center. Mirrors `Screen_Alerts` in screens-3.jsx.
 * Each alert links to /alerts/impact for the impact analysis detail page.
 */

const KPI_CARDS: Array<{
  label: string;
  value: string;
  sub: string;
  cls: string;
}> = [
  { label: "활성 알림", value: "12", sub: "영향 회사 22개", cls: "text-warn" },
  { label: "미확인", value: "3", sub: "2일 평균 응답", cls: "text-bad" },
  { label: "이번주 신규", value: "5", sub: "+2 vs 평년", cls: "text-ink" },
  { label: "마지막 점검", value: "2시간 전", sub: "06:00 자동 수집", cls: "text-muted" },
];

type Status = "warn" | "good" | "";
const ALERTS: Array<{
  priorityClass: string;
  law: string;
  title: string;
  src: string;
  coCount: number;
  wikiCount: number;
  status: string;
  statusClass: Status;
  link?: string;
}> = [
  { priorityClass: "bg-warn", law: "법인세법 시행령 §19", title: "업무용 승용차 손금산입 한도 인상 1,500→1,800만원", src: "국세청 고시 2026-12 · 시행 2026-07-01", coCount: 7, wikiCount: 3, status: "미확인", statusClass: "warn", link: "/alerts/impact" },
  { priorityClass: "bg-warn", law: "조특법 §10", title: "R&D 세액공제 대상 신기술 추가 (AI·반도체 8개 분야)", src: "기재부 보도자료 · 시행 2026-04-01", coCount: 4, wikiCount: 2, status: "미확인", statusClass: "warn" },
  { priorityClass: "bg-warn", law: "부가세법 §11", title: "영세율 적용 대상 용역 범위 일부 개정", src: "국세청 예규 · 시행 2026-05-01", coCount: 1, wikiCount: 1, status: "미확인", statusClass: "warn" },
  { priorityClass: "bg-muted", law: "법인세법 §28의2", title: "과소자본세제 인정이자율 4.6→4.8% 검토중", src: "기재부 입법예고 · 시행미정", coCount: 2, wikiCount: 1, status: "모니터링", statusClass: "" },
  { priorityClass: "bg-muted", law: "국세기본법 §47의5", title: "가산세율 일부 정비 — 단순 계산착오 감면 신설", src: "국세청 · 시행 2026-01-01", coCount: 12, wikiCount: 0, status: "확인됨", statusClass: "good" },
  { priorityClass: "bg-muted", law: "법인세법 §52", title: "특수관계인 범위 — 사실상 영향력 기준 명확화", src: "대법원 2024두9876", coCount: 5, wikiCount: 2, status: "확인됨", statusClass: "good" },
];

const statusTagCls = (s: Status) =>
  s === "warn" ? "ww-tag-warn" : s === "good" ? "ww-tag-good" : "";

export default function AlertsPage() {
  return (
    <Shell crumbs={["세법 변경 알림"]}>
      <div className="mb-[14px] flex items-center justify-between">
        <div>
          <div className="text-[22px] font-bold tracking-[-0.02em]">세법 변경 알림</div>
          <div className="mt-1 text-[11.5px] text-muted">
            외부 API 연동: 국세청 법령 · 국가법령정보센터 · 기획재정부 보도자료 · 매일 06:00 / 18:00 배치
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="ww-btn">
            <Ico name="cog" />
            알림 설정
          </button>
          <button className="ww-btn">
            <Ico name="filter" />
            필터
          </button>
        </div>
      </div>

      {/* KPI cards */}
      <div className="mb-4 grid grid-cols-4 gap-[14px]">
        {KPI_CARDS.map((c, i) => (
          <div key={i} className="ww-card p-[14px_16px]">
            <div className="text-[11.5px] text-muted">{c.label}</div>
            <div
              className={"mt-1 text-[24px] font-bold tracking-[-0.02em] " + c.cls}
            >
              {c.value}
            </div>
            <div className="mt-0.5 text-[11.5px] text-muted">{c.sub}</div>
          </div>
        ))}
      </div>

      {/* Alerts table */}
      <div className="ww-card">
        <div className="ww-card-h">
          <Ico name="bell" />
          <div className="text-[15px] font-semibold tracking-[-0.01em]">최근 알림</div>
          <div className="ml-auto flex items-center gap-1.5">
            <span className="ww-tag" style={{ background: "#1a1a1a", color: "#fff" }}>
              전체 12
            </span>
            <span className="ww-tag ww-tag-warn">미확인 3</span>
            <span className="ww-tag">법인세 7</span>
            <span className="ww-tag">부가세 3</span>
            <span className="ww-tag">조특법 2</span>
          </div>
        </div>
        <table className="ww-tbl">
          <thead>
            <tr>
              <th></th>
              <th>법령</th>
              <th>변경 내용</th>
              <th>출처 · 시행일</th>
              <th>영향 회사</th>
              <th>관련 위키</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            {ALERTS.map((a, i) => {
              const row = (
                <>
                  <td>
                    <div
                      className={"h-8 w-1 rounded-sm " + a.priorityClass}
                    />
                  </td>
                  <td>
                    <span className="ww-tag ww-tag-warn font-mono">{a.law}</span>
                  </td>
                  <td className="text-[12.5px] font-medium" style={{ maxWidth: 380 }}>
                    {a.title}
                  </td>
                  <td className="text-[11.5px] text-muted">{a.src}</td>
                  <td>
                    <b>{a.coCount}</b>
                    <span className="text-[11.5px] text-muted"> 개</span>
                  </td>
                  <td>
                    <span className="text-[11.5px] text-muted">위키 {a.wikiCount}건</span>
                  </td>
                  <td>
                    <span className={"ww-tag " + statusTagCls(a.statusClass)}>
                      {a.status}
                    </span>
                  </td>
                </>
              );
              return a.link ? (
                <tr key={i} className="cursor-pointer">
                  {row}
                </tr>
              ) : (
                <tr key={i}>{row}</tr>
              );
            })}
          </tbody>
        </table>
        <div className="border-t border-line-soft p-3 text-center text-[12px] text-muted">
          <Link href="/alerts/impact" className="text-accent">
            첫 항목 영향 분석 보기 →
          </Link>
        </div>
      </div>
    </Shell>
  );
}
