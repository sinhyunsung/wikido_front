import { Shell } from "@/components/shell/Shell";
import { Ico } from "@/components/shell/Ico";

/**
 * Wiki admin dashboard. Mirrors `Screen_Admin` in screens-3.jsx.
 * Surfaces health metrics that map to Implementation.md §4 (wiki integrity).
 */

const KPIS: Array<{ k: string; v: string; sub: string; cls: string; big?: boolean }> = [
  { k: "위키 건강도", v: "94", sub: "/100 양호", cls: "text-good", big: true },
  { k: "출처 누락", v: "7", sub: "페이지 / 즉시 확인", cls: "text-bad" },
  { k: "고아 페이지", v: "12", sub: "백링크 0개", cls: "text-warn" },
  { k: "외부 링크 깨짐", v: "3", sub: "법령 URL 변경", cls: "text-warn" },
];

const COMPILE_LOG: Array<[string, string, string]> = [
  ["06:14:02", "✓", "대한제강_차입약정서 → /co/daehan/loans-2025.md (+ 24 lines)"],
  ["06:13:48", "✓", "§19 변경 감지 → 영향 페이지 3건 큐 등록"],
  ["06:12:31", "✓", "바이오넥스_매출조서 → /co/bionex/revenue-2025.md (+ 8 lines)"],
  ["06:10:02", "⚠", "/wiki/tax/old-rule-§19.md — 출처 URL 404 응답"],
  ["06:08:21", "✓", "국세청 RSS 5건 수신 (법령 3, 예규 2)"],
  ["06:06:00", "▶", "일일 배치 시작 · 큐 47건"],
];

const CATEGORIES = [
  { k: "세무 · 법인세", v: 284, inc: 8, max: 300 },
  { k: "세무 · 부가세", v: 142, inc: 3, max: 300 },
  { k: "세무 · 조특법", v: 98, inc: 5, max: 300 },
  { k: "감사", v: 218, inc: 4, max: 300 },
  { k: "가치평가", v: 64, inc: 1, max: 300 },
  { k: "회사별 영구조서", v: 243, inc: 12, max: 300 },
  { k: "예규·판례", v: 189, inc: 5, max: 300 },
  { k: "템플릿·가이드", v: 46, inc: 0, max: 300 },
];

const ISSUES: Array<{
  type: string;
  typeCls: string;
  page: string;
  problem: string;
  when: string;
  action: string;
}> = [
  { type: "출처 누락", typeCls: "ww-tag-bad", page: "/wiki/tax/depreciation.md", problem: '"감가상각 한도" 단락에 인용 부재', when: "3일 전", action: "출처 추가" },
  { type: "URL 깨짐", typeCls: "ww-tag-warn", page: "law.go.kr/구법인세법/제19조", problem: "리다이렉트 / 신규 URL 자동 매핑 필요", when: "오늘 06:10", action: "자동 갱신" },
  { type: "고아 페이지", typeCls: "ww-tag-warn", page: "/wiki/old/2022-meeting.md", problem: "백링크 0 · 1년 미수정", when: "1년 전", action: "아카이브" },
  { type: "중복 의심", typeCls: "ww-tag-warn", page: "/wiki/tax/related-party-1.md ↔ /wiki/tax/related-party-final.md", problem: "유사도 84% · 통합 권장", when: "2일 전", action: "병합" },
];

const logColor = (m: string) =>
  m === "✓" ? "text-good" : m === "⚠" ? "text-warn" : "text-accent";

export default function AdminPage() {
  return (
    <Shell crumbs={["위키 관리"]}>
      <div className="mb-1.5 text-[22px] font-bold tracking-[-0.02em]">위키 관리 대시보드</div>
      <div className="mb-[18px] text-[11.5px] text-muted">
        위키 건강도 · 컴파일 상태 · 출처 무결성 · 미연결 노드
      </div>

      <div className="mb-4 grid grid-cols-4 gap-[14px]">
        {KPIS.map((c, i) => (
          <div key={i} className="ww-card p-[14px_16px]">
            <div className="text-[11.5px] text-muted">{c.k}</div>
            <div
              className={"mt-1 font-bold tracking-[-0.02em] " + c.cls}
              style={{ fontSize: c.big ? 32 : 26 }}
            >
              {c.v}
            </div>
            <div className="mt-0.5 text-[11.5px] text-muted">{c.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-[14px]" style={{ gridTemplateColumns: "1fr 1fr" }}>
        {/* Compile log */}
        <div className="ww-card">
          <div className="ww-card-h">
            <Ico name="spark" />
            <div className="text-[15px] font-semibold tracking-[-0.01em]">컴파일 로그</div>
            <span className="ww-tag ww-tag-good ml-auto">실행중</span>
          </div>
          <div className="font-mono text-[11.5px] text-sub">
            {COMPILE_LOG.map(([time, mark, msg], i) => (
              <div
                key={i}
                className={
                  "flex gap-2.5 px-4 py-[7px] " + (i > 0 ? "border-t border-line-soft" : "")
                }
              >
                <span className="text-muted">{time}</span>
                <span className={"w-3.5 " + logColor(mark)}>{mark}</span>
                <span className="flex-1 text-ink">{msg}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Wiki size by category */}
        <div className="ww-card">
          <div className="ww-card-h">
            <Ico name="chart" />
            <div className="text-[15px] font-semibold tracking-[-0.01em]">
              카테고리별 페이지 수 · 30일 증가
            </div>
          </div>
          <div className="ww-card-b flex flex-col gap-2.5">
            {CATEGORIES.map((b, i) => (
              <div key={i}>
                <div className="mb-[3px] flex items-center gap-1 text-[12px]">
                  <span className="flex-1">{b.k}</span>
                  <span className="font-mono">{b.v}</span>
                  <span
                    className={
                      "w-[46px] text-right font-mono " +
                      (b.inc ? "text-good" : "text-muted")
                    }
                  >
                    {b.inc ? `+${b.inc}` : "·"}
                  </span>
                </div>
                <div className="h-[5px] overflow-hidden rounded-[3px] bg-line-soft">
                  <div
                    className="h-full bg-accent"
                    style={{ width: `${(b.v / b.max) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Issues */}
        <div className="ww-card" style={{ gridColumn: "span 2" }}>
          <div className="ww-card-h">
            <Ico name="alert" />
            <div className="text-[15px] font-semibold tracking-[-0.01em]">조치 필요 항목</div>
          </div>
          <table className="ww-tbl">
            <thead>
              <tr>
                <th>유형</th>
                <th>페이지 / 출처</th>
                <th>문제</th>
                <th>최종 점검</th>
                <th>조치</th>
              </tr>
            </thead>
            <tbody>
              {ISSUES.map((r, i) => (
                <tr key={i}>
                  <td>
                    <span className={"ww-tag " + r.typeCls}>{r.type}</span>
                  </td>
                  <td className="font-mono text-[12px]">{r.page}</td>
                  <td>{r.problem}</td>
                  <td className="text-[11.5px] text-muted">{r.when}</td>
                  <td>
                    <button className="ww-btn ww-btn-sm">{r.action}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Shell>
  );
}
