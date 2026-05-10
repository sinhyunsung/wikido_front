import { Shell } from "@/components/shell/Shell";
import { Ico } from "@/components/shell/Ico";

/**
 * Upload + auto-tagging. Mirrors `Screen_Upload` in screens-2.jsx.
 * In production this is the entry point for ingest jobs (Implementation.md §3.4).
 */

const QUEUE: Array<{
  n: string;
  sz: string;
  s: string;
  co: string;
  y: string;
  tk: string;
  conf: number;
  hwp?: boolean;
}> = [
  { n: "대한제강_차입약정서_2025-12.pdf", sz: "2.4 MB", s: "분석중", co: "(주)대한제강", y: "2025", tk: "세무조정", conf: 96 },
  { n: "바이오넥스_감사조서_매출.xlsx", sz: "8.1 MB", s: "분석중", co: "바이오넥스", y: "2025", tk: "감사", conf: 91 },
  { n: "서린식품_용역계약_가치평가.hwp", sz: "310 KB", s: "완료", co: "(주)서린식품", y: "2024", tk: "가치평가", conf: 88, hwp: true },
  { n: "에이치엠_법인등기부등본.pdf", sz: "420 KB", s: "대기", co: "에이치엠로지스", y: "2026", tk: "기본정보", conf: 99 },
];

const TAG_FIELDS: Array<{ l: string; v: string; conf: string; alt?: string[] }> = [
  { l: "회사", v: "(주)대한제강", conf: "96%", alt: ["대한제강(주)", "대한홀딩스"] },
  { l: "연도", v: "2025", conf: "99%", alt: ["2024", "2026"] },
  { l: "업무", v: "세무조정", conf: "87%", alt: ["외부감사", "용역"] },
  { l: "문서종류", v: "계약서 · 차입약정", conf: "94%" },
];

const KEYWORDS = ["연 4.2%", "만기 2027-12", "보증 김도현", "특수관계", "60억원", "분기 상환"];

const statusTagCls = (s: string) =>
  s === "완료" ? "ww-tag-good" : s === "분석중" ? "ww-tag-warn" : "";

export default function UploadPage() {
  return (
    <Shell crumbs={["업로드", "신규 파일 태깅"]}>
      <div className="mb-1.5 text-[22px] font-bold tracking-[-0.02em]">
        파일 업로드 · 자동 태깅
      </div>
      <div className="mb-[18px] text-[11.5px] text-muted">
        업로드한 파일은 LLM이 회사 · 연도 · 업무 태그를 추출하고, 위키에 변경점을 반영합니다.
      </div>

      <div className="grid gap-[18px]" style={{ gridTemplateColumns: "1.1fr 1fr" }}>
        {/* Drop zone + queue */}
        <div>
          <div
            className="rounded-xl p-10 text-center"
            style={{ border: "2px dashed var(--color-line)", background: "#fbfaf7" }}
          >
            <div
              className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-[10px]"
              style={{ background: "var(--color-accent-soft)", color: "var(--color-accent)" }}
            >
              <Ico name="upload" lg />
            </div>
            <div className="mb-1.5 text-[15px] font-semibold tracking-[-0.01em]">
              파일을 끌어다 놓으세요
            </div>
            <div className="text-[11.5px] text-muted">
              PDF · XLSX · DOCX · HWP · 한글 · 이미지 지원 (최대 200MB)
            </div>
            <button className="ww-btn ww-btn-primary mt-3.5">
              <Ico name="folder" />
              폴더에서 선택
            </button>
          </div>

          <div className="ww-card mt-[14px]">
            <div className="ww-card-h">
              <Ico name="doc" />
              <div className="text-[15px] font-semibold tracking-[-0.01em]">
                대기중 4개 파일
              </div>
            </div>
            <div>
              {QUEUE.map((f, i) => (
                <div
                  key={i}
                  className={"px-4 py-3 " + (i > 0 ? "border-t border-line-soft" : "")}
                >
                  <div className="mb-[7px] flex items-center gap-2.5">
                    <Ico name="doc" lg />
                    <div className="min-w-0 flex-1">
                      <div className="overflow-hidden text-ellipsis whitespace-nowrap text-[12.5px] font-medium">
                        {f.n}
                      </div>
                      <div className="mt-px text-[11.5px] text-muted">
                        {f.sz} {f.hwp ? "· HWP 변환 완료" : ""}
                      </div>
                    </div>
                    <span className={"ww-tag " + statusTagCls(f.s)}>{f.s}</span>
                  </div>
                  <div className="flex items-center gap-1.5 pl-6">
                    <span className="ww-tag ww-tag-co">{f.co}</span>
                    <span className="ww-tag ww-tag-year">{f.y}</span>
                    <span className="ww-tag ww-tag-task">{f.tk}</span>
                    <span className="ml-auto font-mono text-[11.5px] text-muted">
                      신뢰도 {f.conf}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tag editor */}
        <div className="ww-card self-start">
          <div className="ww-card-h">
            <Ico name="tag" />
            <div className="text-[15px] font-semibold tracking-[-0.01em]">
              태그 검토 · 1번 파일
            </div>
            <span
              className="ww-tag ml-auto"
              style={{ background: "var(--color-accent-soft)", color: "var(--color-accent)" }}
            >
              LLM 자동 추출
            </span>
          </div>
          <div className="ww-card-b flex flex-col gap-[14px]">
            <div className="flex items-center gap-2.5">
              <div className="ph" style={{ width: 80, height: 100 }}>
                PDF
              </div>
              <div className="flex-1">
                <div className="mb-1 text-[13px] font-semibold">
                  대한제강_차입약정서_2025-12.pdf
                </div>
                <div className="text-[11.5px] leading-[1.55] text-muted">
                  2.4 MB · 8 페이지 · 본문에서 회사명·금액·날짜 추출 완료
                </div>
              </div>
            </div>

            {TAG_FIELDS.map((f, i) => (
              <div key={i}>
                <div className="mb-[5px] flex items-center">
                  <span className="text-[11px] text-muted">{f.l}</span>
                  <span className="ml-auto font-mono text-[11.5px] text-muted">{f.conf}</span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  <span
                    className="ww-tag"
                    style={{ background: "#1a1a1a", color: "#fff", border: "none" }}
                  >
                    {f.v}
                  </span>
                  {f.alt?.map((a, j) => (
                    <span key={j} className="ww-tag cursor-pointer">
                      {a}
                    </span>
                  ))}
                  <span
                    className="ww-tag cursor-pointer"
                    style={{
                      borderStyle: "dashed",
                      borderColor: "var(--color-line)",
                      background: "transparent",
                    }}
                  >
                    <Ico name="plus" /> 추가
                  </span>
                </div>
              </div>
            ))}

            <div>
              <div className="mb-[5px] text-[11px] text-muted">추출된 키워드 · 본문</div>
              <div className="flex flex-wrap items-center gap-1.5">
                {KEYWORDS.map((k, i) => (
                  <span key={i} className="ww-tag font-mono text-[11px]">
                    {k}
                  </span>
                ))}
              </div>
            </div>

            <div className="ww-divider" style={{ margin: "4px 0" }} />

            <div className="flex items-center gap-2">
              <Ico name="spark" />
              <span className="text-[12.5px] text-sub">위키 자동 갱신 예고</span>
            </div>
            <div
              className="rounded-[7px] p-2.5 text-[12px] leading-[1.55] text-ink"
              style={{ background: "var(--color-accent-soft)" }}
            >
              본 파일을 ingest 시: <b>/companies/daehan/loans-2025.md</b> 에 차입 60억 추가 기재,
              특수관계자 거래 모니터링 항목에 신규 보증 1건 추가 예정.
            </div>

            <div className="mt-1.5 flex items-center gap-2">
              <button className="ww-btn">취소</button>
              <button className="ww-btn ww-btn-primary flex-1 justify-center">
                <Ico name="check" /> 승인 · 위키 컴파일
              </button>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}
