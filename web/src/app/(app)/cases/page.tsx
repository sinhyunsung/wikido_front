import { Shell } from "@/components/shell/Shell";
import { Ico } from "@/components/shell/Ico";

/**
 * Similar cases. Mirrors `Screen_Cases` in screens-3.jsx.
 * The recommendation logic uses similarity criteria + prior case retrieval.
 */

const OTHER_MATCHES: Array<{
  co: string;
  y: string;
  t: string;
  sim: number;
  s: string;
}> = [
  { co: "바이오넥스(주)", y: "2023", t: "영업권 손상 18억 — 매출 감소 트리거", sim: 84, s: "예상매출 30% 미달로 손상검토 진행. 회수가능액 = 처분부대비용 차감 공정가치(실거래가) 적용." },
  { co: "코스모전자", y: "2022", t: "무형자산(개발비) 손상 12억", sim: 72, s: "개발 완료 후 시장성 미확보. 잔존가치 0으로 평가." },
  { co: "(주)서린식품", y: "2021", t: "영업권 손상 미인식 케이스", sim: 68, s: "손상 징후 검토했으나 회수가능액 > 장부가로 미인식. 검토 보고서 보관." },
  { co: "에이치엠로지스", y: "2020", t: "유형자산 손상 9억", sim: 54, s: "사업철수 결정에 따른 손상. 손상 인식 후 잔여자산 매각." },
];

const SIMILARITY: [string, number][] = [
  ["회계처리 주제", 92],
  ["업무 종류", 88],
  ["금액 규모", 54],
  ["업종", 61],
  ["연도 근접", 45],
];

export default function CasesPage() {
  return (
    <Shell crumbs={["유사 케이스 검색", "영업권 손상차손"]}>
      <div className="mb-1.5 text-[22px] font-bold tracking-[-0.02em]">
        유사 케이스 검색 · 추천
      </div>
      <div className="mb-[14px] text-[11.5px] text-muted">
        현재 다루는 이슈에 대해 과거 자료에서 비슷한 처리 사례를 추천합니다.
      </div>

      {/* Query bar */}
      <div className="ww-card mb-4 p-[14px]">
        <div className="mb-2 flex items-center gap-2.5">
          <Ico name="search" lg />
          <span className="text-[13px] font-semibold tracking-[-0.005em]">
            현재 작업 컨텍스트
          </span>
          <span className="ml-auto text-[11.5px] text-muted">
            (주)대한제강 · 2025 외부감사 · 영업권 손상검토
          </span>
        </div>
        <div
          className="rounded-[7px] p-[10px_12px] text-[13px] leading-[1.55]"
          style={{ background: "#fbfaf7" }}
        >
          &quot;자회사 인수로 발생한 영업권 24억에 대해 매년 손상검토 중. 자회사 사업부 매각으로 손상 징후 발생.{" "}
          <b>회수가능액 측정과 손상 인식 시점</b> 판단 사례 필요.&quot;
        </div>
      </div>

      <div className="grid gap-[18px]" style={{ gridTemplateColumns: "1fr 240px" }}>
        <div className="flex flex-col gap-3">
          {/* Top match */}
          <div className="ww-card" style={{ borderColor: "var(--color-accent)", borderWidth: 1.5 }}>
            <div
              className="ww-card-h"
              style={{ background: "var(--color-accent-soft)", borderRadius: "10px 10px 0 0" }}
            >
              <Ico name="spark" />
              <div className="text-[15px] font-semibold tracking-[-0.01em] text-accent">
                최우선 추천
              </div>
              <span
                className="ww-tag ml-auto font-mono"
                style={{ background: "#fff", color: "var(--color-accent)" }}
              >
                유사도 91%
              </span>
            </div>
            <div className="ww-card-b">
              <div className="mb-1.5 flex items-center gap-1.5">
                <span className="ww-tag ww-tag-co">(주)대한제강</span>
                <span className="ww-tag ww-tag-year">2024</span>
                <span className="ww-tag ww-tag-task">감사</span>
                <span className="ww-tag">영업권</span>
              </div>
              <div className="mb-[5px] text-[14px] font-semibold">
                2024 영업권 손상 24억 인식 — 동방금속 사업부 매각 건
              </div>
              <div className="mb-2.5 text-[12.5px] leading-[1.55] text-sub">
                자회사 인수 시 발생한 영업권에 대해 사업부 매각이라는 손상 징후 발생.
                <b> 사용가치(현금흐름 추정 5년 + 잔존가치) 산정 → 장부가 대비 부족분 24억 인식</b>.
                매각 진행 사업부의 자산은 현금흐름 추정에서 제외. K-IFRS 1036호 근거.
              </div>
              <div className="flex items-center gap-2">
                <button className="ww-btn ww-btn-sm ww-btn-primary">
                  <Ico name="book" /> 위키 페이지 열기
                </button>
                <button className="ww-btn ww-btn-sm">
                  <Ico name="folder" /> 원본 조서 (3개 파일)
                </button>
              </div>
            </div>
          </div>

          {/* Other matches */}
          {OTHER_MATCHES.map((m, i) => (
            <div key={i} className="ww-card ww-card-b flex gap-[14px]">
              <div className="w-[46px] text-center">
                <div className="font-mono text-[18px] font-bold text-accent">{m.sim}</div>
                <div className="text-[10px] text-muted">%</div>
              </div>
              <div className="flex-1">
                <div className="mb-1.5 flex items-center gap-1.5">
                  <span className="ww-tag ww-tag-co">{m.co}</span>
                  <span className="ww-tag ww-tag-year">{m.y}</span>
                </div>
                <div className="mb-1 text-[13px] font-semibold">{m.t}</div>
                <div className="text-[12px] leading-[1.55] text-sub">{m.s}</div>
              </div>
              <Ico name="arrow-r" />
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-[14px]">
          <div className="ww-card">
            <div className="ww-card-h">
              <Ico name="filter" />
              <div className="text-[15px] font-semibold tracking-[-0.01em]">유사도 기준</div>
            </div>
            <div className="ww-card-b flex flex-col gap-2 text-[12px]">
              {SIMILARITY.map(([k, v], i) => (
                <div key={i}>
                  <div className="mb-[3px] flex items-center">
                    <span className="flex-1">{k}</span>
                    <span className="font-mono text-muted">{v}</span>
                  </div>
                  <div className="h-1 rounded-sm bg-line-soft">
                    <div
                      className="h-full rounded-sm bg-accent"
                      style={{ width: `${v}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="ww-card">
            <div className="ww-card-h">
              <Ico name="link" />
              <div className="text-[15px] font-semibold tracking-[-0.01em]">관련 가이드</div>
            </div>
            <div className="text-[12px]">
              {[
                "/wiki/audit/impairment-process",
                "/wiki/standards/k-ifrs-1036",
                "/templates/impairment-test.xlsx",
              ].map((l, i) => (
                <div
                  key={i}
                  className={
                    "cursor-pointer px-3.5 py-[9px] font-mono text-accent " +
                    (i > 0 ? "border-t border-line-soft" : "")
                  }
                >
                  {l}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}
