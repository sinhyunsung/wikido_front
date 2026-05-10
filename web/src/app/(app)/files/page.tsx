import { Shell } from "@/components/shell/Shell";
import { Ico } from "@/components/shell/Ico";

/**
 * File library. Mirrors `Screen_Files` in screens-2.jsx.
 * Per Implementation.md §3, the underlying ingest pipeline supports docx,
 * xlsx, pdf, hwp/hwpx, txt, md, etc. — see the format table in §3.3.
 */

const FACETS: Array<{ h: string; items: [string, number][] }> = [
  { h: "연도별", items: [["2026", 82], ["2025", 2104], ["2024", 1893], ["2023", 1612], ["이전", 3041]] },
  { h: "업무별", items: [["감사", 2891], ["세무조정", 2104], ["가치평가", 814], ["용역", 1502], ["기타", 1421]] },
  { h: "문서 종류", items: [["조서", 2891], ["계약서", 1018], ["재무제표", 724], ["세무 신고", 1840], ["기타", 2259]] },
  { h: "상태", items: [["태그완료", 8694], ["검토필요", 38]] },
];

const FILES: Array<{
  n: string;
  co: string;
  y: string;
  tk: string;
  sz: string;
  d: string;
  sel?: boolean;
  hwp?: boolean;
  warn?: boolean;
}> = [
  { n: "세무조정_법인세_2025_최종.xlsx", co: "대한제강", y: "2025", tk: "세무조정", sz: "4.2 MB", d: "2일 전", sel: true },
  { n: "차입약정서_원본_2025-12.pdf", co: "대한제강", y: "2025", tk: "세무조정", sz: "2.4 MB", d: "2일 전" },
  { n: "세무조정_조정명세서_2025.hwp", co: "대한제강", y: "2025", tk: "세무조정", sz: "820 KB", d: "3일 전", hwp: true },
  { n: "특수관계자_거래내역_2025.xlsx", co: "대한제강", y: "2025", tk: "세무조정", sz: "1.8 MB", d: "4일 전" },
  { n: "기부금_명세_2025.pdf", co: "대한제강", y: "2025", tk: "세무조정", sz: "310 KB", d: "5일 전", warn: true },
  { n: "외화환산손익_분석.xlsx", co: "대한제강", y: "2025", tk: "세무조정", sz: "2.1 MB", d: "1주 전" },
  { n: "대표이사_가지급금_검토.pdf", co: "대한제강", y: "2025", tk: "세무조정", sz: "940 KB", d: "1주 전" },
  { n: "재고자산_평가_보충자료.xlsx", co: "대한제강", y: "2025", tk: "세무조정", sz: "5.6 MB", d: "2주 전" },
  { n: "법인세_확정신고서_초안.pdf", co: "대한제강", y: "2025", tk: "세무조정", sz: "1.2 MB", d: "2주 전" },
];

export default function FilesPage() {
  return (
    <Shell crumbs={["파일 라이브러리"]}>
      <div className="mb-[14px] flex items-center justify-between">
        <div>
          <div className="text-[22px] font-bold tracking-[-0.02em]">파일 라이브러리</div>
          <div className="mt-1 text-[11.5px] text-muted">
            전체 8,732개 · 자동 태그 92% · 미분류 38개
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="ww-btn">
            <Ico name="filter" />
            고급 필터
          </button>
          <button className="ww-btn ww-btn-primary">
            <Ico name="upload" />
            업로드
          </button>
        </div>
      </div>

      {/* Active filter chips */}
      <div className="mb-[14px] flex flex-wrap items-center gap-1.5 rounded-lg border border-line bg-white px-3 py-2.5">
        <span className="mr-1 text-[11.5px] text-muted">필터</span>
        <span className="ww-tag ww-tag-year">2025</span>
        <span className="ww-tag ww-tag-task">세무조정</span>
        <span className="ww-tag ww-tag-co">대한제강</span>
        <span className="ww-tag cursor-pointer" style={{ borderStyle: "dashed" }}>
          <Ico name="plus" /> 태그 추가
        </span>
        <span className="ml-auto text-[11.5px] text-muted">결과 142건</span>
      </div>

      <div className="grid gap-4" style={{ gridTemplateColumns: "200px 1fr" }}>
        {/* Facets */}
        <div className="ww-card self-start">
          <div className="ww-card-b flex flex-col gap-[14px] p-[14px]">
            {FACETS.map((g, i) => (
              <div key={i}>
                <div className="mb-1.5 text-[13px] font-semibold tracking-[-0.005em]">
                  {g.h}
                </div>
                <div className="flex flex-col gap-1.5">
                  {(() => {
                    const max = Math.max(...g.items.map((it) => it[1]));
                    return g.items.map(([k, v], j) => (
                      <div
                        key={j}
                        className="relative cursor-pointer rounded-[5px] px-2 py-1 text-[12px]"
                      >
                        <div
                          className="absolute left-0 top-0 bottom-0 rounded-[5px] bg-line-soft"
                          style={{ width: `${(v / max) * 100}%` }}
                        />
                        <div className="relative flex items-center gap-1.5">
                          <span className="flex-1 text-sub">{k}</span>
                          <span className="font-mono text-[11px] text-muted">
                            {v.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ));
                  })()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* File list */}
        <div className="ww-card">
          <table className="ww-tbl">
            <thead>
              <tr>
                <th style={{ width: 24 }}>
                  <input type="checkbox" style={{ accentColor: "var(--color-accent)" }} />
                </th>
                <th>파일명</th>
                <th>회사</th>
                <th>연도</th>
                <th>업무</th>
                <th>크기</th>
                <th>업로드</th>
                <th style={{ width: 24 }}></th>
              </tr>
            </thead>
            <tbody>
              {FILES.map((f, i) => (
                <tr
                  key={i}
                  style={{ background: f.sel ? "var(--color-accent-soft)" : "transparent" }}
                >
                  <td>
                    <input
                      type="checkbox"
                      defaultChecked={f.sel}
                      style={{ accentColor: "var(--color-accent)" }}
                    />
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <Ico name="doc" />
                      <span
                        className={"text-[12.5px] " + (f.sel ? "font-semibold" : "font-medium")}
                      >
                        {f.n}
                      </span>
                      {f.hwp && (
                        <span
                          className="ww-tag"
                          style={{
                            height: 16,
                            fontSize: 10,
                            padding: "0 4px",
                            background: "var(--color-warn-soft)",
                            color: "var(--color-warn)",
                          }}
                        >
                          HWP
                        </span>
                      )}
                      {f.warn && (
                        <span
                          className="ww-tag ww-tag-warn"
                          style={{ height: 16, fontSize: 10 }}
                        >
                          검토필요
                        </span>
                      )}
                    </div>
                  </td>
                  <td>
                    <span className="ww-tag ww-tag-co">{f.co}</span>
                  </td>
                  <td>
                    <span className="ww-tag ww-tag-year">{f.y}</span>
                  </td>
                  <td>
                    <span className="ww-tag ww-tag-task">{f.tk}</span>
                  </td>
                  <td className="font-mono text-[11.5px] text-muted">{f.sz}</td>
                  <td className="text-[11.5px] text-muted">{f.d}</td>
                  <td>
                    <Ico name="kebab" />
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
