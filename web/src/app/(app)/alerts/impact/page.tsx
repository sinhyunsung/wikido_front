import { Shell } from "@/components/shell/Shell";
import { Ico } from "@/components/shell/Ico";

/**
 * Impact analysis detail. Mirrors `Screen_Impact` in screens-3.jsx.
 * Hardcoded to the "업무용 승용차 한도" example shown in the design.
 */

const STEPS = [
  { step: "1", t: "외부 API 수신", d: "국세청 법령 변경 RSS · 06:00 배치 / 매일", stat: "완료" },
  { step: "2", t: "LLM 변경 요약·분류", d: "법령번호 → 법인세법 시행령 §19, 카테고리: 손금산입", stat: "완료" },
  { step: "3", t: "위키 의존성 그래프 탐색", d: "§19 인용 페이지 3건 · 영향 키워드 \"업무용승용차\" 일치", stat: "완료" },
  { step: "4", t: "회사별 적용 가능성 매칭", d: "영구조서 차량 보유 회사 12개 → 대상 회사 7개 추출", stat: "완료" },
  { step: "5", t: "영향 분석 리포트 생성", d: "손금 증가 추정액 회사별 산출 · 검토 항목 체크리스트", stat: "완료" },
  { step: "6", t: "담당자 알림 발송", d: "김민지 · 박재현 (이메일 + 인앱) · 06:12", stat: "완료" },
];

const COMPANIES = [
  { n: "(주)대한제강", cars: 8, b: 11200, a: 13400, inc: "+2,200", d: "2026-Q3" },
  { n: "바이오넥스(주)", cars: 4, b: 5800, a: 6900, inc: "+1,100", d: "2026-Q3" },
  { n: "에이치엠로지스", cars: 12, b: 17400, a: 20600, inc: "+3,200", d: "2027-03" },
  { n: "(주)서린식품", cars: 3, b: 4200, a: 5050, inc: "+850", d: "2026-Q3" },
  { n: "코스모전자", cars: 5, b: 7100, a: 8400, inc: "+1,300", d: "2027-03" },
  { n: "엠텍솔루션", cars: 2, b: 2800, a: 3400, inc: "+600", d: "2026-Q3" },
  { n: "그린에너지(주)", cars: 3, b: 4400, a: 5200, inc: "+800", d: "2026-Q3" },
];

const WIKI_NEEDS_UPDATE: [string, string, string][] = [
  ["/wiki/tax/business-vehicle.md", "업무용 승용차 손금산입 가이드", "한도 1,500 → 1,800만원 갱신 필요"],
  ["/wiki/tax/checklist-corp-2026.md", "2026 법인세 세무조정 체크리스트", "체크리스트 항목 #14 갱신 필요"],
  ["/wiki/companies/hm-logis/vehicles.md", "에이치엠 차량 분석", "한도 시뮬 재계산 필요"],
];

export default function ImpactPage() {
  return (
    <Shell crumbs={["세법 변경 알림", "업무용 승용차 한도 인상", "영향 분석"]}>
      <div className="mb-1.5 flex items-center gap-[14px]">
        <span className="ww-tag ww-tag-warn font-mono">법인세법 시행령 §19</span>
        <span className="ww-tag ww-tag-year">시행 2026-07-01</span>
        <span className="text-[11.5px] text-muted">국세청 고시 2026-12 · 2026-04-30 수집</span>
      </div>
      <div className="my-1 text-[22px] font-bold tracking-[-0.02em]">
        업무용 승용차 손금산입 한도 인상 (1,500 → 1,800만원)
      </div>
      <div className="mb-[18px] max-w-[780px] text-[13.5px] leading-[1.6] text-sub">
        차량 1대당 연간 감가상각·임차료 손금산입 한도가 1,500만원에서 1,800만원으로 인상된다. 운행기록부 미작성 시 한도는 동일.
        2026년 7월 1일 이후 개시되는 사업연도부터 적용.
      </div>

      <div className="grid gap-[18px]" style={{ gridTemplateColumns: "1.4fr 1fr" }}>
        {/* Detection trace + companies */}
        <div className="flex flex-col gap-[14px]">
          <div className="ww-card">
            <div className="ww-card-h">
              <Ico name="spark" />
              <div className="text-[15px] font-semibold tracking-[-0.01em]">변경 감지 → 위키 탐색 흐름</div>
            </div>
            <div>
              {STEPS.map((s, i) => (
                <div
                  key={i}
                  className={
                    "flex items-center gap-[14px] px-4 py-3 " +
                    (i > 0 ? "border-t border-line-soft" : "")
                  }
                >
                  <div
                    className={
                      "flex h-[26px] w-[26px] flex-shrink-0 items-center justify-center rounded-md font-mono text-[11px] font-semibold " +
                      (i < 5 ? "bg-accent text-white" : "bg-line-soft text-sub")
                    }
                  >
                    {s.step}
                  </div>
                  <div className="flex-1">
                    <div className="text-[13px] font-medium">{s.t}</div>
                    <div className="mt-0.5 text-[11.5px] text-muted">{s.d}</div>
                  </div>
                  <span className="ww-tag ww-tag-good">{s.stat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="ww-card">
            <div className="ww-card-h">
              <Ico name="building" />
              <div className="text-[15px] font-semibold tracking-[-0.01em]">영향받는 회사 7개</div>
            </div>
            <table className="ww-tbl">
              <thead>
                <tr>
                  <th>회사</th>
                  <th>차량 대수</th>
                  <th>현 손금</th>
                  <th>변경 후</th>
                  <th>증가액</th>
                  <th>다음 신고</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {COMPANIES.map((r, i) => (
                  <tr key={i}>
                    <td>
                      <span className="ww-tag ww-tag-co">{r.n}</span>
                    </td>
                    <td className="font-mono">{r.cars}</td>
                    <td className="font-mono text-muted">{r.b.toLocaleString()}만</td>
                    <td className="font-mono">{r.a.toLocaleString()}만</td>
                    <td className="font-mono font-semibold text-good">{r.inc}만</td>
                    <td className="text-[11.5px] text-muted">{r.d}</td>
                    <td>
                      <Ico name="arrow-r" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-[14px]">
          <div className="ww-card">
            <div className="ww-card-h">
              <Ico name="book" />
              <div className="text-[15px] font-semibold tracking-[-0.01em]">갱신 필요 위키 3건</div>
            </div>
            <div>
              {WIKI_NEEDS_UPDATE.map(([path, title, note], i) => (
                <div
                  key={i}
                  className={"px-4 py-[11px] " + (i > 0 ? "border-t border-line-soft" : "")}
                >
                  <div className="mb-0.5 flex items-center gap-[7px]">
                    <Ico name="book" />
                    <span className="text-[12.5px] font-medium">{title}</span>
                  </div>
                  <div className="mb-[5px] font-mono text-[11.5px] text-muted">{path}</div>
                  <div className="text-[11.5px] text-warn">· {note}</div>
                </div>
              ))}
            </div>
            <div className="border-t border-line-soft p-3">
              <button className="ww-btn ww-btn-primary w-full justify-center">
                <Ico name="check" /> 위키 자동 컴파일 실행
              </button>
            </div>
          </div>

          <div className="ww-card">
            <div className="ww-card-h">
              <Ico name="clock" />
              <div className="text-[15px] font-semibold tracking-[-0.01em]">알림 주기</div>
            </div>
            <div className="ww-card-b flex flex-col gap-2.5 text-[12.5px]">
              {[
                ["법령 수집 배치", "매일 06:00 / 18:00"],
                ["예규·판례 수집", "매주 월 09:00"],
                ["긴급 변경 푸시", "실시간"],
                ["위키 영향 분석", "변경 감지 즉시"],
                ["주간 요약 리포트", "매주 금 17:00"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center">
                  <span className="flex-1 text-[11px] text-muted">{k}</span>
                  <span className="font-mono">{v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="ww-card" style={{ background: "#fbfaf7" }}>
            <div className="ww-card-b">
              <div className="mb-2 text-[13px] font-semibold tracking-[-0.005em]">
                출처 (원문)
              </div>
              <div className="text-[12px] leading-[1.6] text-sub">
                <b className="text-ink">국세청 고시 제2026-12호</b>
                <br />
                법인세법 시행령 일부개정안 알림
                <br />
                <span className="font-mono text-accent">nts.go.kr/notice/2026-12</span>
                <br />
                <span className="text-[11px] text-muted">API 수집 시각 2026-04-30 06:08:21</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}
