import { Shell } from "@/components/shell/Shell";
import { Ico } from "@/components/shell/Ico";
import { Cite } from "@/components/ui/Cite";

/**
 * Wiki page detail. Mirrors `Screen_Wiki` in screens-2.jsx.
 * Renders the "과소자본세제 적용 판단" reference page as a representative example.
 * Real implementation would key off a `[...slug]` dynamic route.
 */

const TREE: Array<[string, boolean, number, boolean?]> = [
  ["세무", true, 0],
  ["손금산입·불산입", true, 1],
  ["과소자본세제", true, 2, true],
  ["특수관계자 인정이자", false, 2],
  ["업무용 승용차", false, 2],
  ["세액공제", false, 1],
  ["감사", false, 0],
  ["가치평가", false, 0],
  ["회사별", false, 0],
];

export default function WikiPage() {
  return (
    <Shell crumbs={["위키", "세무 / 손금산입", "과소자본세제 적용 판단"]}>
      <div className="grid gap-5" style={{ gridTemplateColumns: "220px 1fr 240px" }}>
        {/* Left tree */}
        <div className="ww-card self-start">
          <div className="ww-card-h">
            <Ico name="book" />
            <div className="text-[15px] font-semibold tracking-[-0.01em]">위키 트리</div>
          </div>
          <div className="ww-card-b py-2 px-2 text-[12.5px]">
            {TREE.map(([t, open, lv, active], i) => (
              <div
                key={i}
                className={
                  "flex cursor-pointer items-center gap-1 rounded px-2 py-[5px] " +
                  (active ? "bg-accent-soft text-accent font-semibold" : "text-sub")
                }
                style={{ paddingLeft: 8 + lv * 14 }}
              >
                <span className="w-2.5 text-muted">
                  {lv < 2 ? (open ? "▾" : "▸") : "·"}
                </span>
                <span className="flex-1">{t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Article */}
        <article className="max-w-[760px]">
          <div className="mb-2 flex items-center gap-2 text-[12px] text-muted">
            <span>세무</span>
            <Ico name="arrow-r" />
            <span>손금산입·불산입</span>
            <Ico name="arrow-r" />
            <b className="text-ink">과소자본세제 적용 판단</b>
          </div>
          <h1 className="my-2 mt-0 mb-2 text-[28px] font-bold tracking-[-0.02em]">
            과소자본세제 적용 판단
          </h1>
          <div className="mb-[18px] flex items-center gap-1.5">
            <span className="ww-tag ww-tag-year">2026</span>
            <span className="ww-tag ww-tag-task">세무조정</span>
            <span className="ww-tag">손금불산입</span>
            <span className="ww-tag">법인세</span>
            <span className="ml-auto text-[11.5px] text-muted">
              최종 수정 2026-04-30 · 김민지 · 자동 컴파일 7회
            </span>
          </div>

          <div
            className="mb-[18px] rounded-lg p-[12px_14px] text-[13px] leading-[1.6]"
            style={{
              background: "var(--color-accent-soft)",
              borderLeft: "3px solid var(--color-accent)",
            }}
          >
            <b className="text-accent">요약 ·</b> 차입금이 자기자본의 2배를 초과하면 초과분의 지급이자는 손금불산입.
            특수관계 외국법인의 차입은 법인세법 §28, 국내 특수관계자 차입은 §28의2 적용. 2026년 인정이자율 4.6%.
          </div>

          <h2 className="my-[18px] mt-[18px] mb-2.5 text-[17px] font-semibold">1. 적용 요건</h2>
          <p className="m-0 mb-3 text-[13.5px] leading-[1.75] text-ink">
            내국법인이 국외지배주주로부터 차입한 금액 또는 국외지배주주의 지급보증으로 차입한 금액 중,
            그 합계액이 <b>국외지배주주의 출자지분의 2배</b>를 초과하는 부분에 대한 지급이자·할인료는
            손금에 산입하지 아니한다 <Cite n={1} src="법인세법 §28" />.
            국내 특수관계자 차입의 경우에도 자기자본의 2배 한도가 적용된다 <Cite n={2} src="법인세법 §28의2" />.
          </p>

          <h2 className="my-[18px] mb-2.5 text-[17px] font-semibold">2. 계산 방법</h2>
          <div className="ww-card mb-3 p-[14px]" style={{ background: "#fbfaf7" }}>
            <div className="font-mono text-[12.5px] leading-[1.8] text-ink">
              손금불산입액 = 지급이자 × (초과차입금 / 총차입금)
              <br />
              초과차입금 = max(0, 평균차입금 − 자기자본 × 2)
              <br />
              <span className="text-muted">※ 평균은 일평잔. 자기자본은 기초·기말 평균</span>
            </div>
          </div>

          <h2 className="my-[18px] mb-2.5 text-[17px] font-semibold">3. 관리 회사 적용 현황</h2>
          <table className="ww-tbl mb-[14px]">
            <thead>
              <tr>
                <th>회사</th>
                <th>차입금</th>
                <th>자기자본</th>
                <th>배수</th>
                <th>판정</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>(주)대한제강</td>
                <td className="font-mono">142억</td>
                <td className="font-mono">820억</td>
                <td className="font-mono">0.17×</td>
                <td>
                  <span className="ww-tag ww-tag-good">한도 내</span>
                </td>
              </tr>
              <tr>
                <td>(주)서린식품</td>
                <td className="font-mono">180억</td>
                <td className="font-mono">72억</td>
                <td className="font-mono text-bad">2.50×</td>
                <td>
                  <span className="ww-tag ww-tag-bad">초과 36억</span>
                </td>
              </tr>
              <tr>
                <td>바이오넥스(주)</td>
                <td className="font-mono">45억</td>
                <td className="font-mono">310억</td>
                <td className="font-mono">0.15×</td>
                <td>
                  <span className="ww-tag ww-tag-good">한도 내</span>
                </td>
              </tr>
            </tbody>
          </table>
          <p className="text-[13.5px] leading-[1.7] text-ink">
            서린식품은 2025년 추가 차입 60억으로 한도를 초과하였다 <Cite n={3} src="/companies/seorin/loans-2025.md" />.
            2026년 세무조정 시 약 1.7억의 손금불산입 예상.
          </p>

          <div className="ww-divider" />
          <div className="rounded-lg border border-line p-[14px]" style={{ background: "#fbfaf7" }}>
            <div className="mb-2.5 text-[13px] font-semibold">
              출처 (이 페이지의 모든 주장은 아래 출처에 근거함)
            </div>
            <ol className="m-0 pl-5 text-[12.5px] leading-[1.9] text-sub">
              <li>
                <b className="text-ink">법인세법 §28</b> — 국세청 법령정보 · 2025-12-31 시행{" "}
                <span className="ml-1.5 font-mono text-accent">law.go.kr/법인세법/제28조</span>
              </li>
              <li>
                <b className="text-ink">법인세법 §28의2</b> — 기획재정부 / 2026-01-01 개정안 반영
              </li>
              <li>
                <b className="text-ink">/companies/seorin/loans-2025.md</b> — 내부 위키 · 2026-04-22 갱신 (raw:{" "}
                <span className="font-mono">raw/seorin/loan-summary.xlsx</span>)
              </li>
              <li>
                <b className="text-ink">대법원 판례 2018두12345</b> — 특수관계자 범위 판단
              </li>
            </ol>
          </div>
        </article>

        {/* Right TOC + meta */}
        <div className="flex flex-col gap-[14px] self-start">
          <div className="ww-card">
            <div className="ww-card-h">
              <Ico name="list" />
              <div className="text-[15px] font-semibold tracking-[-0.01em]">목차</div>
            </div>
            <div className="ww-card-b flex flex-col gap-1.5 px-3 py-2 text-[12px]">
              {["1. 적용 요건", "2. 계산 방법", "3. 관리 회사 적용 현황", "4. 예규·판례", "출처"].map(
                (t, i) => (
                  <div
                    key={i}
                    className={"cursor-pointer " + (i < 3 ? "text-ink" : "text-sub") + (i === 0 ? " font-semibold" : "")}
                  >
                    {t}
                  </div>
                )
              )}
            </div>
          </div>
          <div className="ww-card">
            <div className="ww-card-h">
              <Ico name="link" />
              <div className="text-[15px] font-semibold tracking-[-0.01em]">백링크</div>
            </div>
            <div className="text-[12px]">
              {["/companies/daehan/loans", "/companies/seorin/loans", "/wiki/tax/related-party", "/wiki/audit/risk-loans"].map(
                (l, i) => (
                  <div
                    key={i}
                    className={
                      "cursor-pointer px-3.5 py-2 font-mono text-accent " +
                      (i > 0 ? "border-t border-line-soft" : "")
                    }
                  >
                    {l}
                  </div>
                )
              )}
            </div>
          </div>
          <div className="ww-card" style={{ background: "var(--color-warn-soft)", borderColor: "var(--color-warn)" }}>
            <div className="ww-card-b">
              <div className="mb-1.5 flex items-center gap-2">
                <Ico name="alert" />
                <div className="text-[13px] font-semibold text-warn">관련 세법 변경 1건</div>
              </div>
              <div className="text-[12.5px] leading-[1.5]">
                2026-04 인정이자율 4.6% → 4.8% 개정안 검토 중
              </div>
              <div className="mt-2 cursor-pointer text-[11.5px] text-accent">알림 보기 →</div>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}
