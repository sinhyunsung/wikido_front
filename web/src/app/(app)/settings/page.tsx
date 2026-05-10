import { Shell } from "@/components/shell/Shell";

/**
 * Settings — placeholder. The design files don't include a settings screen,
 * so this is a TODO stub that lists the planned sections per Implementation.md
 * (org policy, model selection, security, integrations).
 */
export default function SettingsPage() {
  const sections = [
    { h: "조직", body: "조직 정보, 멤버 관리, 역할(권한)" },
    { h: "본문 업로드 정책", body: "전체 본문 / 임베딩만 / 메타만 (Implementation.md §6.1)" },
    { h: "LLM 모델", body: "보안 등급별 모델 선택, API 키 관리 (§10.3)" },
    { h: "외부 연동", body: "더존, 위하고, 홈택스, 국세청 RSS 등 (§8.3)" },
    { h: "보안", body: "민감 분류, 화면 캡처 차단, 클립보드 제한 (§6.2)" },
    { h: "활동 로그", body: "조회·편집·다운로드·LLM 질의 로그 (§6.4)" },
  ];
  return (
    <Shell crumbs={["설정"]}>
      <div className="text-[22px] font-bold tracking-[-0.02em]">설정</div>
      <div className="mt-1.5 mb-[18px] text-[11.5px] text-muted">
        조직 단위 정책, 보안, 연동 설정. 화면은 추후 구현 예정.
      </div>
      <div className="grid gap-[14px]" style={{ gridTemplateColumns: "1fr 1fr" }}>
        {sections.map((s, i) => (
          <div key={i} className="ww-card p-[14px_16px]">
            <div className="text-[15px] font-semibold tracking-[-0.01em]">
              {s.h}
            </div>
            <div className="mt-1.5 text-[12.5px] text-sub">{s.body}</div>
          </div>
        ))}
      </div>
    </Shell>
  );
}
