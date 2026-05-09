// screens-3.jsx — Tax change alerts, Impact analysis, Checklist, Admin, Cases, Folder/HWP
/* global React, Shell, Ico, Cite, Spark, T */

// ============ 7. TAX CHANGE ALERTS CENTER ============
const Screen_Alerts = () => (
  <Shell active="alerts" crumbs={['세법 변경 알림']}>
    <div className="ww-row" style={{justifyContent:'space-between', marginBottom:14}}>
      <div>
        <div className="ww-h1">세법 변경 알림</div>
        <div className="ww-meta" style={{marginTop:4}}>외부 API 연동: 국세청 법령 · 국가법령정보센터 · 기획재정부 보도자료 · 매일 06:00 / 18:00 배치</div>
      </div>
      <div className="ww-row" style={{gap:8}}>
        <button className="ww-btn"><Ico name="cog"/>알림 설정</button>
        <button className="ww-btn"><Ico name="filter"/>필터</button>
      </div>
    </div>

    <div className="ww-grid" style={{gridTemplateColumns:'repeat(4, 1fr)', marginBottom:16}}>
      {[
        {k:'활성 알림', v:'12', sub:'영향 회사 22개', c:T.warn},
        {k:'미확인', v:'3', sub:'2일 평균 응답', c:T.bad},
        {k:'이번주 신규', v:'5', sub:'+2 vs 평년', c:T.ink},
        {k:'마지막 점검', v:'2시간 전', sub:'06:00 자동 수집', c:T.muted},
      ].map((c,i)=>(
        <div key={i} className="ww-card" style={{padding:'14px 16px'}}>
          <div className="ww-meta">{c.k}</div>
          <div style={{fontSize:24, fontWeight:700, color:c.c, marginTop:4, letterSpacing:'-0.02em'}}>{c.v}</div>
          <div className="ww-meta" style={{marginTop:2}}>{c.sub}</div>
        </div>
      ))}
    </div>

    <div className="ww-card">
      <div className="ww-card-h">
        <Ico name="bell"/><div className="ww-h2">최근 알림</div>
        <div className="ww-row" style={{gap:6, marginLeft:'auto'}}>
          <span className="ww-tag" style={{background:T.ink, color:'#fff'}}>전체 12</span>
          <span className="ww-tag warn">미확인 3</span>
          <span className="ww-tag">법인세 7</span>
          <span className="ww-tag">부가세 3</span>
          <span className="ww-tag">조특법 2</span>
        </div>
      </div>
      <table className="ww-tbl">
        <thead><tr><th></th><th>법령</th><th>변경 내용</th><th>출처 · 시행일</th><th>영향 회사</th><th>관련 위키</th><th>상태</th></tr></thead>
        <tbody>
          {[
            {p:T.warn, law:'법인세법 시행령 §19', t:'업무용 승용차 손금산입 한도 인상 1,500→1,800만원', src:'국세청 고시 2026-12 · 시행 2026-07-01', co:7, wk:3, st:'미확인', stc:'warn'},
            {p:T.warn, law:'조특법 §10', t:'R&D 세액공제 대상 신기술 추가 (AI·반도체 8개 분야)', src:'기재부 보도자료 · 시행 2026-04-01', co:4, wk:2, st:'미확인', stc:'warn'},
            {p:T.warn, law:'부가세법 §11', t:'영세율 적용 대상 용역 범위 일부 개정', src:'국세청 예규 · 시행 2026-05-01', co:1, wk:1, st:'미확인', stc:'warn'},
            {p:T.muted, law:'법인세법 §28의2', t:'과소자본세제 인정이자율 4.6→4.8% 검토중', src:'기재부 입법예고 · 시행미정', co:2, wk:1, st:'모니터링', stc:''},
            {p:T.muted, law:'국세기본법 §47의5', t:'가산세율 일부 정비 — 단순 계산착오 감면 신설', src:'국세청 · 시행 2026-01-01', co:12, wk:0, st:'확인됨', stc:'good'},
            {p:T.muted, law:'법인세법 §52', t:'특수관계인 범위 — 사실상 영향력 기준 명확화', src:'대법원 2024두9876', co:5, wk:2, st:'확인됨', stc:'good'},
          ].map((a,i)=>(
            <tr key={i}>
              <td><div style={{width:4, height:32, background:a.p, borderRadius:2}}/></td>
              <td><span className="ww-tag warn" style={{fontFamily:T.mono}}>{a.law}</span></td>
              <td style={{fontSize:12.5, fontWeight:500, maxWidth:380}}>{a.t}</td>
              <td className="ww-meta">{a.src}</td>
              <td><b>{a.co}</b><span className="ww-meta"> 개</span></td>
              <td><span className="ww-meta">위키 {a.wk}건</span></td>
              <td><span className={'ww-tag '+a.stc}>{a.st}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </Shell>
);

// ============ 8. IMPACT ANALYSIS DETAIL ============
const Screen_Impact = () => (
  <Shell active="alerts" crumbs={['세법 변경 알림', '업무용 승용차 한도 인상', '영향 분석']}>
    <div className="ww-row" style={{gap:14, marginBottom:6}}>
      <span className="ww-tag warn" style={{fontFamily:T.mono}}>법인세법 시행령 §19</span>
      <span className="ww-tag year">시행 2026-07-01</span>
      <span className="ww-meta">국세청 고시 2026-12 · 2026-04-30 수집</span>
    </div>
    <div className="ww-h1" style={{margin:'4px 0 6px'}}>업무용 승용차 손금산입 한도 인상 (1,500 → 1,800만원)</div>
    <div style={{fontSize:13.5, color:T.sub, lineHeight:1.6, maxWidth:780, marginBottom:18}}>
      차량 1대당 연간 감가상각·임차료 손금산입 한도가 1,500만원에서 1,800만원으로 인상된다. 운행기록부 미작성 시 한도는 동일.
      2026년 7월 1일 이후 개시되는 사업연도부터 적용.
    </div>

    <div className="ww-grid" style={{gridTemplateColumns:'1.4fr 1fr', gap:18}}>
      {/* Detection trace */}
      <div style={{display:'flex', flexDirection:'column', gap:14}}>
        <div className="ww-card">
          <div className="ww-card-h"><Ico name="spark"/><div className="ww-h2">변경 감지 → 위키 탐색 흐름</div></div>
          <div className="ww-card-b" style={{padding:0}}>
            {[
              {step:'1', t:'외부 API 수신', d:'국세청 법령 변경 RSS · 06:00 배치 / 매일', stat:'완료'},
              {step:'2', t:'LLM 변경 요약·분류', d:'법령번호 → 법인세법 시행령 §19, 카테고리: 손금산입', stat:'완료'},
              {step:'3', t:'위키 의존성 그래프 탐색', d:'§19 인용 페이지 3건 · 영향 키워드 "업무용승용차" 일치', stat:'완료'},
              {step:'4', t:'회사별 적용 가능성 매칭', d:'영구조서 차량 보유 회사 12개 → 대상 회사 7개 추출', stat:'완료'},
              {step:'5', t:'영향 분석 리포트 생성', d:'손금 증가 추정액 회사별 산출 · 검토 항목 체크리스트', stat:'완료'},
              {step:'6', t:'담당자 알림 발송', d:'김민지 · 박재현 (이메일 + 인앱) · 06:12', stat:'완료'},
            ].map((s,i)=>(
              <div key={i} className="ww-row" style={{padding:'12px 16px', borderTop: i ? `1px solid ${T.lineSoft}`:'none', gap:14}}>
                <div style={{width:26, height:26, borderRadius:6, background: i<5 ? T.accent : T.lineSoft, color: i<5 ? '#fff':T.sub, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:T.mono, fontSize:11, fontWeight:600, flexShrink:0}}>{s.step}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:13, fontWeight:500}}>{s.t}</div>
                  <div className="ww-meta" style={{marginTop:2}}>{s.d}</div>
                </div>
                <span className="ww-tag good">{s.stat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Affected companies */}
        <div className="ww-card">
          <div className="ww-card-h"><Ico name="building"/><div className="ww-h2">영향받는 회사 7개</div></div>
          <table className="ww-tbl">
            <thead><tr><th>회사</th><th>차량 대수</th><th>현 손금</th><th>변경 후</th><th>증가액</th><th>다음 신고</th><th></th></tr></thead>
            <tbody>
              {[
                {n:'(주)대한제강', cars:8, b:11200, a:13400, inc:'+2,200', d:'2026-Q3'},
                {n:'바이오넥스(주)', cars:4, b:5800, a:6900, inc:'+1,100', d:'2026-Q3'},
                {n:'에이치엠로지스', cars:12, b:17400, a:20600, inc:'+3,200', d:'2027-03'},
                {n:'(주)서린식품', cars:3, b:4200, a:5050, inc:'+850', d:'2026-Q3'},
                {n:'코스모전자', cars:5, b:7100, a:8400, inc:'+1,300', d:'2027-03'},
                {n:'엠텍솔루션', cars:2, b:2800, a:3400, inc:'+600', d:'2026-Q3'},
                {n:'그린에너지(주)', cars:3, b:4400, a:5200, inc:'+800', d:'2026-Q3'},
              ].map((r,i)=>(
                <tr key={i}>
                  <td><span className="ww-tag co">{r.n}</span></td>
                  <td style={{fontFamily:T.mono}}>{r.cars}</td>
                  <td style={{fontFamily:T.mono, color:T.muted}}>{r.b.toLocaleString()}만</td>
                  <td style={{fontFamily:T.mono}}>{r.a.toLocaleString()}만</td>
                  <td style={{fontFamily:T.mono, color:T.good, fontWeight:600}}>{r.inc}만</td>
                  <td className="ww-meta">{r.d}</td>
                  <td><Ico name="arrow-r"/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{display:'flex', flexDirection:'column', gap:14}}>
        {/* Affected wiki */}
        <div className="ww-card">
          <div className="ww-card-h"><Ico name="book"/><div className="ww-h2">갱신 필요 위키 3건</div></div>
          <div className="ww-card-b" style={{padding:0}}>
            {[
              ['/wiki/tax/business-vehicle.md','업무용 승용차 손금산입 가이드','한도 1,500 → 1,800만원 갱신 필요'],
              ['/wiki/tax/checklist-corp-2026.md','2026 법인세 세무조정 체크리스트','체크리스트 항목 #14 갱신 필요'],
              ['/wiki/companies/hm-logis/vehicles.md','에이치엠 차량 분석','한도 시뮬 재계산 필요'],
            ].map((l,i)=>(
              <div key={i} style={{padding:'11px 16px', borderTop: i ? `1px solid ${T.lineSoft}`:'none'}}>
                <div className="ww-row" style={{gap:7, marginBottom:3}}>
                  <Ico name="book"/>
                  <span style={{fontSize:12.5, fontWeight:500}}>{l[1]}</span>
                </div>
                <div className="ww-meta" style={{fontFamily:T.mono, marginBottom:5}}>{l[0]}</div>
                <div className="ww-meta" style={{color:T.warn}}>· {l[2]}</div>
              </div>
            ))}
          </div>
          <div style={{padding:12, borderTop:`1px solid ${T.lineSoft}`}}>
            <button className="ww-btn primary" style={{width:'100%', justifyContent:'center'}}><Ico name="check"/>위키 자동 컴파일 실행</button>
          </div>
        </div>

        {/* Schedule */}
        <div className="ww-card">
          <div className="ww-card-h"><Ico name="clock"/><div className="ww-h2">알림 주기</div></div>
          <div className="ww-card-b" style={{display:'flex', flexDirection:'column', gap:10, fontSize:12.5}}>
            <div className="ww-row"><span className="ww-kv-k" style={{flex:1}}>법령 수집 배치</span><span style={{fontFamily:T.mono}}>매일 06:00 / 18:00</span></div>
            <div className="ww-row"><span className="ww-kv-k" style={{flex:1}}>예규·판례 수집</span><span style={{fontFamily:T.mono}}>매주 월 09:00</span></div>
            <div className="ww-row"><span className="ww-kv-k" style={{flex:1}}>긴급 변경 푸시</span><span style={{fontFamily:T.mono}}>실시간</span></div>
            <div className="ww-row"><span className="ww-kv-k" style={{flex:1}}>위키 영향 분석</span><span style={{fontFamily:T.mono}}>변경 감지 즉시</span></div>
            <div className="ww-row"><span className="ww-kv-k" style={{flex:1}}>주간 요약 리포트</span><span style={{fontFamily:T.mono}}>매주 금 17:00</span></div>
          </div>
        </div>

        {/* Source */}
        <div className="ww-card" style={{background:'#fbfaf7'}}>
          <div className="ww-card-b">
            <div className="ww-h3" style={{marginBottom:8}}>출처 (원문)</div>
            <div style={{fontSize:12, color:T.sub, lineHeight:1.6}}>
              <b style={{color:T.ink}}>국세청 고시 제2026-12호</b><br/>
              법인세법 시행령 일부개정안 알림<br/>
              <span style={{fontFamily:T.mono, color:T.accent}}>nts.go.kr/notice/2026-12</span><br/>
              <span style={{color:T.muted, fontSize:11}}>API 수집 시각 2026-04-30 06:08:21</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Shell>
);

// ============ 9. CHECKLIST ============
const Screen_Checklist = () => (
  <Shell active="checklist" crumbs={['세무조정 체크리스트', '(주)대한제강 · 2025']}>
    <div className="ww-row" style={{gap:14, marginBottom:14}}>
      <div style={{flex:1}}>
        <div className="ww-row" style={{gap:8, marginBottom:6}}>
          <div className="ww-h1">법인세 세무조정 체크리스트</div>
          <span className="ww-tag co">(주)대한제강 · 2025</span>
        </div>
        <div className="ww-meta">2026년 개정 적용 항목 자동 표시 · 진행 18 / 32 항목 · 마감 D-15</div>
      </div>
      <button className="ww-btn"><Ico name="ext"/>PDF 출력</button>
      <button className="ww-btn primary"><Ico name="check"/>저장</button>
    </div>

    {/* Progress */}
    <div className="ww-card" style={{padding:14, marginBottom:14}}>
      <div className="ww-row" style={{marginBottom:8}}>
        <span className="ww-h3">전체 진행률</span>
        <span style={{marginLeft:'auto', fontSize:13, fontWeight:600}}>56% · 18/32</span>
      </div>
      <div style={{height:10, background:T.lineSoft, borderRadius:5, overflow:'hidden'}}>
        <div style={{display:'flex', height:'100%'}}>
          <div style={{width:'40%', background:T.good}}/>
          <div style={{width:'16%', background:T.warn}}/>
        </div>
      </div>
      <div className="ww-row" style={{gap:14, marginTop:8, fontSize:11.5, color:T.muted}}>
        <span><span style={{display:'inline-block',width:8,height:8,background:T.good,borderRadius:2,marginRight:5}}/>완료 13</span>
        <span><span style={{display:'inline-block',width:8,height:8,background:T.warn,borderRadius:2,marginRight:5}}/>검토중 5</span>
        <span><span style={{display:'inline-block',width:8,height:8,background:T.lineSoft,borderRadius:2,marginRight:5}}/>대기 14</span>
        <span style={{marginLeft:'auto', color:T.warn}}><Ico name="alert"/> 2026 개정 적용 5건</span>
      </div>
    </div>

    <div className="ww-grid" style={{gridTemplateColumns:'1fr', gap:14}}>
      {[
        {h:'1. 익금산입·손금불산입', items:[
          {n:'01',t:'법인세비용 손금불산입',s:'완료',c:T.good,note:'전기 미환급 가산세 320만 포함'},
          {n:'02',t:'벌과금·과태료',s:'완료',c:T.good},
          {n:'03',t:'업무무관 자산 관련 비용',s:'완료',c:T.good,note:'대표이사 가지급금 4건'},
          {n:'04',t:'기부금 한도초과',s:'검토중',c:T.warn,note:'특례기부금 한도 재계산 — 2026 적용'},
          {n:'05',t:'접대비 한도초과',s:'대기',c:T.line,update:'2026 한도식 변경 — 자동 반영됨'},
        ]},
        {h:'2. 손금산입·익금불산입', items:[
          {n:'06',t:'업무용 승용차 한도',s:'대기',c:T.line,update:'⚡ 2026-07 한도 1,500→1,800만 인상',important:true},
          {n:'07',t:'감가상각비 신고조정',s:'검토중',c:T.warn},
          {n:'08',t:'대손충당금 한도',s:'완료',c:T.good},
          {n:'09',t:'퇴직급여충당금',s:'대기',c:T.line},
          {n:'10',t:'외화환산손익',s:'완료',c:T.good},
        ]},
        {h:'3. 세액공제·감면 (조특법)', items:[
          {n:'11',t:'R&D 세액공제',s:'검토중',c:T.warn,update:'⚡ 2026-04 신기술 8개 분야 추가',important:true},
          {n:'12',t:'고용증대 세액공제',s:'완료',c:T.good,note:'+8명, 18개월 유지 확인'},
          {n:'13',t:'중소기업 통합투자 세액공제',s:'대기',c:T.line},
          {n:'14',t:'외국납부세액공제',s:'완료',c:T.good},
        ]},
        {h:'4. 특수관계자 거래', items:[
          {n:'15',t:'인정이자 (가지급금)',s:'검토중',c:T.warn,note:'대표이사 가지급 12억 — 4.6% 적용',update:'2026 인정이자율 동결 확인'},
          {n:'16',t:'특수관계자 매출·매입',s:'완료',c:T.good},
          {n:'17',t:'과소자본세제',s:'완료',c:T.good,note:'한도 내 (0.17×)'},
        ]},
      ].map((g,i)=>(
        <div key={i} className="ww-card">
          <div className="ww-card-h"><div className="ww-h2">{g.h}</div>
            <span className="ww-meta" style={{marginLeft:'auto'}}>{g.items.length} 항목</span>
          </div>
          <div>
            {g.items.map((it,j)=>(
              <div key={j} className="ww-row" style={{padding:'12px 16px', borderTop: j ? `1px solid ${T.lineSoft}`:'none', gap:12, background: it.important ? T.warnSoft : 'transparent'}}>
                <input type="checkbox" defaultChecked={it.s==='완료'} style={{accentColor:T.accent, width:16, height:16}}/>
                <span style={{fontFamily:T.mono, fontSize:11, color:T.muted, width:24}}>{it.n}</span>
                <div style={{flex:1}}>
                  <div className="ww-row" style={{gap:8}}>
                    <span style={{fontSize:13, fontWeight:500, textDecoration: it.s==='완료' ? 'line-through' : 'none', color: it.s==='완료' ? T.muted : T.ink}}>{it.t}</span>
                    {it.update && <span className="ww-tag warn" style={{fontSize:10.5, height:18}}>{it.update}</span>}
                  </div>
                  {it.note && <div className="ww-meta" style={{marginTop:2}}>{it.note}</div>}
                </div>
                <span className={'ww-tag '+(it.s==='완료'?'good':it.s==='검토중'?'warn':'')}>{it.s}</span>
                <Ico name="ext"/>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </Shell>
);

// ============ 10. WIKI ADMIN DASHBOARD ============
const Screen_Admin = () => (
  <Shell active="admin" crumbs={['위키 관리']}>
    <div className="ww-h1" style={{marginBottom:6}}>위키 관리 대시보드</div>
    <div className="ww-meta" style={{marginBottom:18}}>위키 건강도 · 컴파일 상태 · 출처 무결성 · 미연결 노드</div>

    <div className="ww-grid" style={{gridTemplateColumns:'repeat(4, 1fr)', marginBottom:16}}>
      {[
        {k:'위키 건강도', v:'94', sub:'/100 양호', c:T.good, big:true},
        {k:'출처 누락', v:'7', sub:'페이지 / 즉시 확인', c:T.bad},
        {k:'고아 페이지', v:'12', sub:'백링크 0개', c:T.warn},
        {k:'외부 링크 깨짐', v:'3', sub:'법령 URL 변경', c:T.warn},
      ].map((c,i)=>(
        <div key={i} className="ww-card" style={{padding:'14px 16px'}}>
          <div className="ww-meta">{c.k}</div>
          <div style={{fontSize: c.big ? 32 : 26, fontWeight:700, color:c.c, marginTop:4, letterSpacing:'-0.02em'}}>{c.v}</div>
          <div className="ww-meta" style={{marginTop:2}}>{c.sub}</div>
        </div>
      ))}
    </div>

    <div className="ww-grid" style={{gridTemplateColumns:'1fr 1fr', gap:14}}>
      {/* Compile log */}
      <div className="ww-card">
        <div className="ww-card-h"><Ico name="spark"/><div className="ww-h2">컴파일 로그</div>
          <span className="ww-tag good" style={{marginLeft:'auto'}}>실행중</span>
        </div>
        <div className="ww-card-b" style={{padding:0, fontFamily:T.mono, fontSize:11.5, color:T.sub}}>
          {[
            ['06:14:02','✓','대한제강_차입약정서 → /co/daehan/loans-2025.md (+ 24 lines)'],
            ['06:13:48','✓','§19 변경 감지 → 영향 페이지 3건 큐 등록'],
            ['06:12:31','✓','바이오넥스_매출조서 → /co/bionex/revenue-2025.md (+ 8 lines)'],
            ['06:10:02','⚠','/wiki/tax/old-rule-§19.md — 출처 URL 404 응답'],
            ['06:08:21','✓','국세청 RSS 5건 수신 (법령 3, 예규 2)'],
            ['06:06:00','▶','일일 배치 시작 · 큐 47건'],
          ].map((l,i)=>(
            <div key={i} style={{padding:'7px 16px', borderTop: i ? `1px solid ${T.lineSoft}`:'none', display:'flex', gap:10}}>
              <span style={{color:T.muted}}>{l[0]}</span>
              <span style={{color: l[1]==='✓' ? T.good : l[1]==='⚠' ? T.warn : T.accent, width:14}}>{l[1]}</span>
              <span style={{flex:1, color:T.ink}}>{l[2]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Wiki size by category */}
      <div className="ww-card">
        <div className="ww-card-h"><Ico name="chart"/><div className="ww-h2">카테고리별 페이지 수 · 30일 증가</div></div>
        <div className="ww-card-b" style={{display:'flex', flexDirection:'column', gap:10}}>
          {[
            {k:'세무 · 법인세', v:284, inc:8, max:300},
            {k:'세무 · 부가세', v:142, inc:3, max:300},
            {k:'세무 · 조특법', v:98, inc:5, max:300},
            {k:'감사', v:218, inc:4, max:300},
            {k:'가치평가', v:64, inc:1, max:300},
            {k:'회사별 영구조서', v:243, inc:12, max:300},
            {k:'예규·판례', v:189, inc:5, max:300},
            {k:'템플릿·가이드', v:46, inc:0, max:300},
          ].map((b,i)=>(
            <div key={i}>
              <div className="ww-row" style={{marginBottom:3, fontSize:12}}>
                <span style={{flex:1}}>{b.k}</span>
                <span style={{fontFamily:T.mono}}>{b.v}</span>
                <span style={{fontFamily:T.mono, color: b.inc ? T.good : T.muted, width:46, textAlign:'right'}}>{b.inc?`+${b.inc}`:'·'}</span>
              </div>
              <div style={{height:5, background:T.lineSoft, borderRadius:3, overflow:'hidden'}}>
                <div style={{width:`${(b.v/b.max)*100}%`, height:'100%', background:T.accent}}/>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Issues */}
      <div className="ww-card" style={{gridColumn:'span 2'}}>
        <div className="ww-card-h"><Ico name="alert"/><div className="ww-h2">조치 필요 항목</div></div>
        <table className="ww-tbl">
          <thead><tr><th>유형</th><th>페이지 / 출처</th><th>문제</th><th>최종 점검</th><th>조치</th></tr></thead>
          <tbody>
            <tr><td><span className="ww-tag bad">출처 누락</span></td><td style={{fontFamily:T.mono, fontSize:12}}>/wiki/tax/depreciation.md</td><td>"감가상각 한도" 단락에 인용 부재</td><td className="ww-meta">3일 전</td><td><button className="ww-btn sm">출처 추가</button></td></tr>
            <tr><td><span className="ww-tag warn">URL 깨짐</span></td><td style={{fontFamily:T.mono, fontSize:12}}>law.go.kr/구법인세법/제19조</td><td>리다이렉트 / 신규 URL 자동 매핑 필요</td><td className="ww-meta">오늘 06:10</td><td><button className="ww-btn sm">자동 갱신</button></td></tr>
            <tr><td><span className="ww-tag warn">고아 페이지</span></td><td style={{fontFamily:T.mono, fontSize:12}}>/wiki/old/2022-meeting.md</td><td>백링크 0 · 1년 미수정</td><td className="ww-meta">1년 전</td><td><button className="ww-btn sm">아카이브</button></td></tr>
            <tr><td><span className="ww-tag warn">중복 의심</span></td><td style={{fontFamily:T.mono, fontSize:12}}>/wiki/tax/related-party-1.md ↔ /wiki/tax/related-party-final.md</td><td>유사도 84% · 통합 권장</td><td className="ww-meta">2일 전</td><td><button className="ww-btn sm">병합</button></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </Shell>
);

// ============ 11. SIMILAR CASES ============
const Screen_Cases = () => (
  <Shell active="cases" crumbs={['유사 케이스 검색', '영업권 손상차손']}>
    <div className="ww-h1" style={{marginBottom:6}}>유사 케이스 검색 · 추천</div>
    <div className="ww-meta" style={{marginBottom:14}}>현재 다루는 이슈에 대해 과거 자료에서 비슷한 처리 사례를 추천합니다.</div>

    {/* Query bar */}
    <div className="ww-card" style={{padding:14, marginBottom:16}}>
      <div className="ww-row" style={{marginBottom:8}}>
        <Ico name="search" lg/>
        <span className="ww-h3">현재 작업 컨텍스트</span>
        <span className="ww-meta" style={{marginLeft:'auto'}}>(주)대한제강 · 2025 외부감사 · 영업권 손상검토</span>
      </div>
      <div style={{padding:'10px 12px', background:'#fbfaf7', borderRadius:7, fontSize:13, lineHeight:1.55}}>
        "자회사 인수로 발생한 영업권 24억에 대해 매년 손상검토 중. 자회사 사업부 매각으로 손상 징후 발생. <b>회수가능액 측정과 손상 인식 시점</b> 판단 사례 필요."
      </div>
    </div>

    <div className="ww-grid" style={{gridTemplateColumns:'1fr 240px', gap:18}}>
      <div style={{display:'flex', flexDirection:'column', gap:12}}>
        {/* Top match */}
        <div className="ww-card" style={{borderColor:T.accent, borderWidth:1.5}}>
          <div className="ww-card-h" style={{background:T.accentSoft, borderRadius:'10px 10px 0 0'}}>
            <Ico name="spark"/><div className="ww-h2" style={{color:T.accent}}>최우선 추천</div>
            <span className="ww-tag" style={{marginLeft:'auto', background:'#fff', color:T.accent, fontFamily:T.mono}}>유사도 91%</span>
          </div>
          <div className="ww-card-b">
            <div className="ww-row" style={{gap:6, marginBottom:6}}>
              <span className="ww-tag co">(주)대한제강</span>
              <span className="ww-tag year">2024</span>
              <span className="ww-tag task">감사</span>
              <span className="ww-tag">영업권</span>
            </div>
            <div style={{fontSize:14, fontWeight:600, marginBottom:5}}>2024 영업권 손상 24억 인식 — 동방금속 사업부 매각 건</div>
            <div style={{fontSize:12.5, color:T.sub, lineHeight:1.55, marginBottom:10}}>
              자회사 인수 시 발생한 영업권에 대해 사업부 매각이라는 손상 징후 발생.
              <b> 사용가치(현금흐름 추정 5년 + 잔존가치) 산정 → 장부가 대비 부족분 24억 인식</b>.
              매각 진행 사업부의 자산은 현금흐름 추정에서 제외. K-IFRS 1036호 근거.
            </div>
            <div className="ww-row" style={{gap:8}}>
              <button className="ww-btn sm primary"><Ico name="book"/>위키 페이지 열기</button>
              <button className="ww-btn sm"><Ico name="folder"/>원본 조서 (3개 파일)</button>
            </div>
          </div>
        </div>

        {/* Other matches */}
        {[
          {co:'바이오넥스(주)',y:'2023',t:'영업권 손상 18억 — 매출 감소 트리거', sim:84, s:'예상매출 30% 미달로 손상검토 진행. 회수가능액 = 처분부대비용 차감 공정가치(실거래가) 적용.'},
          {co:'코스모전자',y:'2022',t:'무형자산(개발비) 손상 12억', sim:72, s:'개발 완료 후 시장성 미확보. 잔존가치 0으로 평가.'},
          {co:'(주)서린식품',y:'2021',t:'영업권 손상 미인식 케이스', sim:68, s:'손상 징후 검토했으나 회수가능액 > 장부가로 미인식. 검토 보고서 보관.'},
          {co:'에이치엠로지스',y:'2020',t:'유형자산 손상 9억',sim:54, s:'사업철수 결정에 따른 손상. 손상 인식 후 잔여자산 매각.'},
        ].map((m,i)=>(
          <div key={i} className="ww-card ww-card-b" style={{display:'flex', gap:14}}>
            <div style={{width:46, textAlign:'center'}}>
              <div style={{fontSize:18, fontWeight:700, color:T.accent, fontFamily:T.mono}}>{m.sim}</div>
              <div className="ww-meta" style={{fontSize:10}}>%</div>
            </div>
            <div style={{flex:1}}>
              <div className="ww-row" style={{gap:6, marginBottom:5}}>
                <span className="ww-tag co">{m.co}</span>
                <span className="ww-tag year">{m.y}</span>
              </div>
              <div style={{fontSize:13, fontWeight:600, marginBottom:4}}>{m.t}</div>
              <div style={{fontSize:12, color:T.sub, lineHeight:1.55}}>{m.s}</div>
            </div>
            <Ico name="arrow-r"/>
          </div>
        ))}
      </div>

      {/* Sidebar */}
      <div style={{display:'flex', flexDirection:'column', gap:14}}>
        <div className="ww-card">
          <div className="ww-card-h"><Ico name="filter"/><div className="ww-h2">유사도 기준</div></div>
          <div className="ww-card-b" style={{display:'flex', flexDirection:'column', gap:8, fontSize:12}}>
            {[
              ['회계처리 주제',92],
              ['업무 종류',88],
              ['금액 규모',54],
              ['업종',61],
              ['연도 근접',45],
            ].map(([k,v],i)=>(
              <div key={i}>
                <div className="ww-row" style={{marginBottom:3}}><span style={{flex:1}}>{k}</span><span style={{fontFamily:T.mono, color:T.muted}}>{v}</span></div>
                <div style={{height:4, background:T.lineSoft, borderRadius:2}}>
                  <div style={{width:`${v}%`, height:'100%', background:T.accent, borderRadius:2}}/>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="ww-card">
          <div className="ww-card-h"><Ico name="link"/><div className="ww-h2">관련 가이드</div></div>
          <div className="ww-card-b" style={{padding:0, fontSize:12}}>
            {['/wiki/audit/impairment-process','/wiki/standards/k-ifrs-1036','/templates/impairment-test.xlsx'].map((l,i)=>(
              <div key={i} style={{padding:'9px 14px', borderTop: i ? `1px solid ${T.lineSoft}`:'none', fontFamily:T.mono, color:T.accent, cursor:'pointer'}}>{l}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </Shell>
);

// ============ 12. FOLDER TREE + HWP HANDLING ============
const Screen_Folder = () => (
  <Shell active="files" crumbs={['파일', '회사 폴더', '(주)대한제강']}>
    <div className="ww-h1" style={{marginBottom:6}}>회사 폴더 · HWP 처리</div>
    <div className="ww-meta" style={{marginBottom:14}}>물리 폴더 구조와 무관하게, 태그로 가상 폴더를 구성합니다. HWP 파일은 자동 변환되어 위키와 연결됩니다.</div>

    <div className="ww-grid" style={{gridTemplateColumns:'260px 1fr', gap:16}}>
      {/* Tree */}
      <div className="ww-card">
        <div className="ww-card-h"><Ico name="folder"/><div className="ww-h2">폴더 트리</div>
          <span className="ww-tag" style={{marginLeft:'auto', background:T.accentSoft, color:T.accent}}>가상</span>
        </div>
        <div className="ww-card-b" style={{padding:'8px 8px', fontSize:12.5, fontFamily:T.mono}}>
          {[
            ['📁 raw/', 0],
            ['📁 daehan-steel/', 1],
            ['📁 2025/', 2],
            ['  📁 audit/', 3, true],
            ['  📁 tax/', 3],
            ['  📁 contracts/', 3],
            ['📁 2024/', 2],
            ['📁 2023/', 2],
            ['📁 services/', 1],
            ['  📁 2024-valuation/', 2],
            ['📁 bionex/', 1],
            ['📁 seorin/', 1],
          ].map(([t,lv,active],i)=>(
            <div key={i} style={{padding:'4px 8px', paddingLeft:8 + lv*12, color: active ? T.accent : T.sub, background: active ? T.accentSoft : 'transparent', borderRadius:4, cursor:'pointer', fontWeight: active ? 600 : 400}}>
              {t}
            </div>
          ))}
          <div className="ww-divider"/>
          <div style={{padding:'4px 8px', color:T.muted, fontFamily:T.font, fontSize:11}}>가상 묶음 (태그 기반)</div>
          {['#감사 #2025','#세무조정 #2025','#가치평가','#R&D세액공제'].map((t,i)=>(
            <div key={i} style={{padding:'4px 8px', color:T.sub, cursor:'pointer'}}>🏷 {t}</div>
          ))}
        </div>
      </div>

      <div style={{display:'flex', flexDirection:'column', gap:14}}>
        {/* Folder content */}
        <div className="ww-card">
          <div className="ww-card-h">
            <Ico name="folder"/>
            <div className="ww-h2" style={{fontFamily:T.mono}}>raw/daehan-steel/2025/audit/</div>
            <span style={{marginLeft:'auto'}} className="ww-meta">14개 파일 · 38 MB</span>
          </div>
          <table className="ww-tbl">
            <thead><tr><th>파일</th><th>형식</th><th>위키 연결</th><th>크기</th><th>변환</th></tr></thead>
            <tbody>
              {[
                {n:'감사조서_매출인식.xlsx', f:'XLSX', wiki:'/co/daehan/audit-2025/revenue', sz:'6.2 MB'},
                {n:'감사조서_재고자산.hwp', f:'HWP', wiki:'/co/daehan/audit-2025/inventory', sz:'820 KB', conv:'PDF + 텍스트 추출 완료'},
                {n:'감사보고서_초안.hwp', f:'HWP', wiki:'/co/daehan/audit-2025/report', sz:'2.1 MB', conv:'표 4개·이미지 2개 추출'},
                {n:'경영진_확인서.pdf', f:'PDF', wiki:'/co/daehan/audit-2025/letters', sz:'440 KB'},
                {n:'외부조회_답변_은행.zip', f:'ZIP', wiki:'/co/daehan/audit-2025/confirms', sz:'12 MB'},
                {n:'분석적절차_표.xlsx', f:'XLSX', wiki:'/co/daehan/audit-2025/analytics', sz:'3.8 MB'},
                {n:'위험평가_메모.docx', f:'DOCX', wiki:'/co/daehan/audit-2025/risk', sz:'180 KB'},
                {n:'표본추출_명세.xlsx', f:'XLSX', wiki:'/co/daehan/audit-2025/sampling', sz:'920 KB'},
              ].map((f,i)=>(
                <tr key={i}>
                  <td><div className="ww-row" style={{gap:8}}><Ico name="doc"/><span style={{fontSize:12.5}}>{f.n}</span></div></td>
                  <td><span className="ww-tag" style={{fontFamily:T.mono, fontSize:10.5, background: f.f==='HWP' ? T.warnSoft : T.lineSoft, color: f.f==='HWP' ? T.warn : T.sub}}>{f.f}</span></td>
                  <td><span className="ww-meta" style={{fontFamily:T.mono, fontSize:11}}>{f.wiki}</span></td>
                  <td className="ww-meta" style={{fontFamily:T.mono}}>{f.sz}</td>
                  <td>{f.conv ? <span className="ww-tag good" style={{fontSize:10.5, height:18}}>{f.conv}</span> : <span className="ww-meta">·</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* HWP detail panel */}
        <div className="ww-grid" style={{gridTemplateColumns:'1fr 1fr', gap:14}}>
          <div className="ww-card">
            <div className="ww-card-h">
              <span className="ww-tag warn" style={{fontFamily:T.mono}}>HWP</span>
              <div className="ww-h2">한글 파일 처리 파이프라인</div>
            </div>
            <div className="ww-card-b" style={{padding:0}}>
              {[
                ['1','HWP → PDF 변환','한컴 SDK / 24초 평균'],
                ['2','텍스트 레이어 추출','OCR 백업 (스캔본 대응)'],
                ['3','표·그래프 구조화','XLSX 호환 포맷으로 분리 저장'],
                ['4','LLM 태깅·요약','회사·연도·업무 자동 추출'],
                ['5','위키 연결','마크다운 임베드 + 원본 링크'],
              ].map((s,i)=>(
                <div key={i} className="ww-row" style={{padding:'10px 16px', borderTop: i ? `1px solid ${T.lineSoft}`:'none', gap:12, fontSize:12.5}}>
                  <div style={{width:22, height:22, borderRadius:5, background:T.lineSoft, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:T.mono, fontSize:11, color:T.sub}}>{s[0]}</div>
                  <span style={{flex:1, fontWeight:500}}>{s[1]}</span>
                  <span className="ww-meta">{s[2]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="ww-card">
            <div className="ww-card-h">
              <Ico name="sigma"/>
              <div className="ww-h2">엑셀 ↔ 한글/워드 표 호환</div>
            </div>
            <div className="ww-card-b">
              <div className="ww-meta" style={{marginBottom:8}}>한글·워드 본문에 삽입된 표를 XLSX로 변환하고, 거꾸로 시트를 한글 표로 임베드할 수 있습니다.</div>
              <div className="ph" style={{height:120, display:'flex', flexDirection:'column', gap:4, padding:14}}>
                <span style={{fontFamily:T.mono, fontSize:11}}>표 미리보기</span>
                <span style={{fontFamily:T.mono, fontSize:10, color:T.muted}}>감사조서_재고자산.hwp · 표 2/4</span>
              </div>
              <div className="ww-row" style={{gap:6, marginTop:10}}>
                <button className="ww-btn sm">XLSX 다운로드</button>
                <button className="ww-btn sm">위키 임베드</button>
                <button className="ww-btn sm" style={{marginLeft:'auto'}}><Ico name="ext"/>원본 열기</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Shell>
);

Object.assign(window, { Screen_Alerts, Screen_Impact, Screen_Checklist, Screen_Admin, Screen_Cases, Screen_Folder });
