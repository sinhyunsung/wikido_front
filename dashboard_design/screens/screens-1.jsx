// screens-1.jsx — Home dashboard, Search results, Company dashboard
/* global React, Shell, Ico, Cite, Spark, T */

// ============ 1. HOME DASHBOARD ============
const Screen_Home = () => (
  <Shell active="home" crumbs={['홈', '대시보드']}>
    <div style={{display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:18}}>
      <div>
        <div className="ww-h1">안녕하세요, 김민지 회계사님</div>
        <div className="ww-meta" style={{marginTop:6}}>2026년 5월 7일 목요일 · 오늘 처리할 업무 4건</div>
      </div>
      <div className="ww-row">
        <button className="ww-btn"><Ico name="upload"/>파일 업로드</button>
        <button className="ww-btn primary"><Ico name="plus"/>새 위키 페이지</button>
      </div>
    </div>

    {/* KPI strip */}
    <div className="ww-grid" style={{gridTemplateColumns:'repeat(4, 1fr)', marginBottom:16}}>
      {[
        {k:'관리 회사', v:'47', s:'+2 이번 분기', spark:[3,5,4,6,7,6,8,9], hint:'담당 회사'},
        {k:'위키 문서', v:'1,284', s:'+38 최근 7일', spark:[10,12,11,14,13,16,18,20], hint:'전체 페이지'},
        {k:'태그된 파일', v:'8,732', s:'92% 자동분류', spark:[8,9,11,10,13,14,15,17], hint:'원본 자료'},
        {k:'세법 변경 알림', v:'3', s:'영향 회사 12개', warn:true, hint:'미확인'},
      ].map((c,i)=>(
        <div key={i} className="ww-card" style={{padding:'14px 16px', position:'relative'}}>
          <div className="ww-meta">{c.k}</div>
          <div style={{display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginTop:6}}>
            <div style={{fontSize:26, fontWeight:700, letterSpacing:'-0.02em', color: c.warn ? T.warn : T.ink}}>{c.v}</div>
            {c.spark && <Spark data={c.spark} w={90} h={28}/>}
            {c.warn && <Ico name="alert" lg/>}
          </div>
          <div className="ww-meta" style={{marginTop:4, color: c.warn ? T.warn : T.muted}}>{c.s}</div>
        </div>
      ))}
    </div>

    <div className="ww-grid" style={{gridTemplateColumns:'1.4fr 1fr'}}>
      {/* Left column */}
      <div style={{display:'flex', flexDirection:'column', gap:16}}>
        {/* Tax change alerts (priority) */}
        <div className="ww-card">
          <div className="ww-card-h">
            <Ico name="alert"/>
            <div className="ww-h2">세법 변경 알림</div>
            <span className="ww-tag warn">3건 미확인</span>
            <span style={{marginLeft:'auto'}} className="ww-meta">자동 점검 · 매일 06:00</span>
          </div>
          <div>
            {[
              {date:'2026-05-06', law:'법인세법 시행령 §19', title:'업무용 승용차 손금산입 한도 인상 (1,500만원 → 1,800만원)', co:7, src:'국세청 고시 2026-12'},
              {date:'2026-05-02', law:'조특법 §10', title:'연구·인력개발비 세액공제 대상 신기술 추가 (AI·반도체 8개 분야)', co:4, src:'기획재정부 보도자료'},
              {date:'2026-04-28', law:'부가가치세법 §11', title:'영세율 적용 대상 용역 범위 일부 개정', co:1, src:'국세청 예규'},
            ].map((a,i)=>(
              <div key={i} style={{padding:'13px 16px', borderBottom: i<2 ? `1px solid ${T.lineSoft}`:'none', display:'flex', gap:14}}>
                <div style={{width:4, alignSelf:'stretch', background:T.warn, borderRadius:2}}/>
                <div style={{flex:1}}>
                  <div className="ww-row" style={{gap:8, marginBottom:4}}>
                    <span className="ww-tag warn">{a.law}</span>
                    <span className="ww-meta">{a.date} · {a.src}</span>
                  </div>
                  <div style={{fontSize:13.5, fontWeight:500, marginBottom:6}}>{a.title}</div>
                  <div className="ww-meta">영향받는 회사 <b style={{color:T.ink}}>{a.co}개</b> · 관련 업무 세무조정 · <span style={{color:T.accent, cursor:'pointer'}}>영향 분석 보기 →</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent companies */}
        <div className="ww-card">
          <div className="ww-card-h">
            <Ico name="building"/>
            <div className="ww-h2">최근 작업한 회사</div>
            <span style={{marginLeft:'auto', fontSize:12, color:T.accent, cursor:'pointer'}}>전체 보기 →</span>
          </div>
          <table className="ww-tbl">
            <thead><tr><th>회사</th><th>업종</th><th>결산월</th><th>최근 업무</th><th>차입금 추세</th><th>최종 작업</th></tr></thead>
            <tbody>
              {[
                {n:'(주)대한제강', ind:'1차 금속 제조', m:'12월', task:'2025 세무조정', spark:[12,11,10,9,8,7], d:'2일 전'},
                {n:'바이오넥스(주)', ind:'의약품 제조', m:'12월', task:'외부감사', spark:[5,7,8,10,12,14], d:'3일 전'},
                {n:'에이치엠로지스', ind:'운송 서비스', m:'3월', task:'가치평가 용역', spark:[20,18,17,15,14,13], d:'1주 전'},
                {n:'(주)서린식품', ind:'식료품 제조', m:'12월', task:'2024 세무조정', spark:[8,8,9,9,10,10], d:'2주 전'},
              ].map((r,i)=>(
                <tr key={i}>
                  <td><span className="ww-tag co">{r.n}</span></td>
                  <td className="ww-meta">{r.ind}</td>
                  <td className="ww-meta">{r.m}</td>
                  <td><span className="ww-tag task">{r.task}</span></td>
                  <td><Spark data={r.spark} w={80} h={22}/></td>
                  <td className="ww-meta">{r.d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right column */}
      <div style={{display:'flex', flexDirection:'column', gap:16}}>
        {/* Today */}
        <div className="ww-card">
          <div className="ww-card-h">
            <Ico name="clock"/><div className="ww-h2">오늘 일정 · 마감</div>
          </div>
          <div className="ww-card-b" style={{padding:0}}>
            {[
              {t:'10:30', l:'대한제강 — 세무조정 1차 검토', tag:'세무조정'},
              {t:'14:00', l:'바이오넥스 — 감사 인터뷰', tag:'감사'},
              {t:'D-2', l:'서린식품 부가세 신고', tag:'부가세', warn:true},
              {t:'D-9', l:'에이치엠 가치평가 용역 납기', tag:'용역'},
            ].map((e,i)=>(
              <div key={i} style={{padding:'11px 16px', borderTop: i ? `1px solid ${T.lineSoft}`:'none', display:'flex', alignItems:'center', gap:10}}>
                <div style={{width:42, fontSize:11, fontFamily:T.mono, color: e.warn ? T.warn : T.muted, fontWeight:600}}>{e.t}</div>
                <div style={{flex:1, fontSize:12.5}}>{e.l}</div>
                <span className="ww-tag task">{e.tag}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent wiki */}
        <div className="ww-card">
          <div className="ww-card-h">
            <Ico name="book"/><div className="ww-h2">최근 위키 활동</div>
          </div>
          <div className="ww-card-b" style={{padding:0}}>
            {[
              {who:'시스템', act:'자동 컴파일', what:'대한제강 / 차입금 추세 페이지 갱신', d:'10분 전'},
              {who:'박재현', act:'편집', what:'특수관계자 거래 손금불산입 정리', d:'1시간 전'},
              {who:'시스템', act:'태그 추출', what:'47건 파일에 회사·업무 태그 자동 부여', d:'3시간 전'},
              {who:'김민지', act:'생성', what:'2026 R&D 세액공제 신기술 분야', d:'어제'},
            ].map((a,i)=>(
              <div key={i} style={{padding:'10px 16px', borderTop: i ? `1px solid ${T.lineSoft}`:'none'}}>
                <div className="ww-row" style={{gap:6, marginBottom:3}}>
                  <span style={{fontSize:11.5, fontWeight:500, color: a.who === '시스템' ? T.accent : T.ink}}>{a.who}</span>
                  <span className="ww-meta">· {a.act} · {a.d}</span>
                </div>
                <div style={{fontSize:12.5, color:T.sub}}>{a.what}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick search shortcuts */}
        <div className="ww-card">
          <div className="ww-card-h"><Ico name="search"/><div className="ww-h2">자주 쓰는 검색</div></div>
          <div className="ww-card-b" style={{display:'flex', flexWrap:'wrap', gap:6}}>
            {['#2025년 #세무조정', '#감사 @대한제강', '#R&D세액공제', '#가치평가 #2024', '#영업권 #손상'].map((q,i)=>(
              <span key={i} className="ww-tag" style={{cursor:'pointer', fontFamily:T.mono, fontSize:11}}>{q}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </Shell>
);

// ============ 2. SEARCH RESULTS ============
const Screen_Search = () => (
  <Shell active="search" crumbs={['통합 검색', '"차입금 손금불산입"']} search="차입금 손금불산입">
    <div className="ww-row" style={{gap:14, marginBottom:16, alignItems:'flex-start'}}>
      <div style={{flex:1}}>
        <div className="ww-h1">"차입금 손금불산입" <span style={{color:T.muted, fontWeight:400, fontSize:18}}>검색 결과 84건</span></div>
        <div className="ww-row" style={{gap:6, marginTop:10}}>
          <span className="ww-tag" style={{background:T.ink, color:'#fff'}}>전체 84</span>
          <span className="ww-tag">위키 12</span>
          <span className="ww-tag">회사 7</span>
          <span className="ww-tag">파일 58</span>
          <span className="ww-tag">예규·판례 7</span>
        </div>
      </div>
    </div>

    <div className="ww-grid" style={{gridTemplateColumns:'200px 1fr'}}>
      {/* Filter panel */}
      <div className="ww-card" style={{alignSelf:'flex-start'}}>
        <div className="ww-card-h"><Ico name="filter"/><div className="ww-h2">필터</div></div>
        <div className="ww-card-b" style={{display:'flex', flexDirection:'column', gap:14}}>
          {[
            {h:'연도', items:['2026 (8)','2025 (24)','2024 (19)','2023 (14)','이전 (19)']},
            {h:'업무', items:['세무조정 (38)','외부감사 (22)','가치평가 (9)','용역 (15)']},
            {h:'회사', items:['대한제강 (12)','바이오넥스 (8)','서린식품 (6)','에이치엠 (5)','그 외 41']},
            {h:'문서 종류', items:['위키 (12)','조서 (28)','예규 (7)','계약서 (9)','기타 (28)']},
          ].map((g,i)=>(
            <div key={i}>
              <div className="ww-h3" style={{marginBottom:6}}>{g.h}</div>
              <div style={{display:'flex', flexDirection:'column', gap:4}}>
                {g.items.map((it,j)=>(
                  <label key={j} style={{display:'flex', alignItems:'center', gap:7, fontSize:12, color:T.sub, cursor:'pointer'}}>
                    <input type="checkbox" defaultChecked={i===0 && j<2} style={{accentColor:T.accent}}/>{it}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Results */}
      <div style={{display:'flex', flexDirection:'column', gap:10}}>
        <div className="ww-row" style={{justifyContent:'space-between', marginBottom:2}}>
          <span className="ww-meta">관련도순 · 최근 결과 우선</span>
          <button className="ww-btn sm"><Ico name="sort"/>정렬</button>
        </div>

        {/* Top wiki answer */}
        <div className="ww-card" style={{borderColor:T.accent, borderWidth:1.5}}>
          <div className="ww-card-h" style={{background:T.accentSoft, borderRadius:'10px 10px 0 0'}}>
            <Ico name="spark"/><div className="ww-h2" style={{color:T.accent}}>위키 통합 답변</div>
            <span className="ww-tag" style={{background:'#fff', color:T.accent}}>3개 출처 종합</span>
          </div>
          <div className="ww-card-b">
            <div style={{fontSize:13.5, lineHeight:1.65, color:T.ink}}>
              차입금이 자기자본의 <b>2배를 초과</b>하는 경우, 초과분에 대한 지급이자는
              과소자본세제(법인세법 §28의2)에 의해 손금불산입됩니다 <Cite n={1} src="법인세법 §28의2"/>.
              특수관계자 차입의 경우 <b>인정이자율(연 4.6%, 2026년 기준)</b>을 적용한 시가 검토가 필요합니다 <Cite n={2} src="법인세법 시행령 §89"/>.
              관리 중인 회사 중 <span style={{color:T.accent, fontWeight:500}}>대한제강 · 서린식품</span>이 본 규정 적용 대상입니다 <Cite n={3} src="회사별 영구조서 / 차입금 분석"/>.
            </div>
            <div className="ww-divider"/>
            <div className="ww-meta" style={{marginBottom:6}}>출처</div>
            <div style={{display:'flex', flexDirection:'column', gap:6}}>
              {[
                ['[1]','법인세법 §28의2 (과소자본세제)','국세청 법령 / 2025-12-31 시행'],
                ['[2]','법인세법 시행령 §89 (인정이자)','기획재정부 / 2026-01-01 개정'],
                ['[3]','/companies/daehan-steel/loans-2025.md','내부 위키 · 2026-04-12 갱신'],
              ].map((s,i)=>(
                <div key={i} className="ww-row" style={{gap:8, fontSize:12}}>
                  <span style={{fontFamily:T.mono, color:T.accent, fontWeight:600, width:24}}>{s[0]}</span>
                  <span style={{color:T.ink, fontWeight:500}}>{s[1]}</span>
                  <span className="ww-meta" style={{marginLeft:'auto'}}>{s[2]}</span>
                  <Ico name="ext"/>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Result list */}
        {[
          {type:'wiki', t:'과소자본세제 적용 판단 가이드', s:'…차입금이 자기자본의 2배를 초과하는 경우 초과분의 지급이자는 손금불산입…', m:['위키','2026-04','김민지'], src:'/wiki/tax/under-capitalization.md'},
          {type:'co', t:'대한제강 / 2025 차입금 분석', s:'…차입금 잔액 142억(전년比 -28%), 자기자본의 1.7배로 한도 내. 단 특수관계자 분 35억은 인정이자 검토 필요…', m:['회사','2025','세무조정'], src:'/companies/daehan-steel/loans-2025.md'},
          {type:'file', t:'서린식품_차입약정서_2024.pdf', s:'…연 4.2%, 만기 2027-12, 보증인 김OO(대표이사 특수관계)…', m:['파일','2024','계약서','서린식품'], src:'raw/seorin/contracts/loan-2024.pdf'},
          {type:'rule', t:'국세청 예규 법규-1284 (2025)', s:'…동일인이 양 법인을 지배하는 경우 특수관계 성립…', m:['예규','2025'], src:'외부 / 국세청'},
          {type:'wiki', t:'특수관계자 거래 — 인정이자율 적용', s:'…2026년 인정이자율 4.6%, 가중평균차입이자율과 비교 후 높은 율 적용…', m:['위키','2026-01','박재현'], src:'/wiki/tax/related-party-interest.md'},
        ].map((r,i)=>{
          const tIcon = {wiki:'book', co:'building', file:'doc', rule:'doc'}[r.type];
          return (
            <div key={i} className="ww-card ww-card-b" style={{display:'flex', gap:12, alignItems:'flex-start'}}>
              <div style={{width:32, height:32, borderRadius:7, background:T.lineSoft, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>
                <Ico name={tIcon} lg/>
              </div>
              <div style={{flex:1, minWidth:0}}>
                <div className="ww-row" style={{gap:8, marginBottom:3}}>
                  <span style={{fontSize:13.5, fontWeight:600, color:T.ink}}>{r.t}</span>
                  <span className="ww-meta" style={{fontFamily:T.mono}}>{r.src}</span>
                </div>
                <div style={{fontSize:12.5, color:T.sub, lineHeight:1.55, marginBottom:7}}>{r.s}</div>
                <div className="ww-row" style={{gap:5}}>
                  {r.m.map((m,j)=><span key={j} className="ww-tag" style={{height:18, fontSize:10.5, padding:'0 6px'}}>{m}</span>)}
                </div>
              </div>
              <Ico name="arrow-r"/>
            </div>
          );
        })}
      </div>
    </div>
  </Shell>
);

// ============ 3. COMPANY DASHBOARD (영구조서) ============
const Screen_Company = () => (
  <Shell active="companies" crumbs={['회사별 영구조서', '(주)대한제강']}>
    {/* header */}
    <div className="ww-row" style={{gap:16, marginBottom:18}}>
      <div style={{width:64, height:64, borderRadius:12, background:T.ink, color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, fontWeight:700, letterSpacing:'-0.02em'}}>대한</div>
      <div style={{flex:1}}>
        <div className="ww-row" style={{gap:8, marginBottom:4}}>
          <div className="ww-h1">(주)대한제강</div>
          <span className="ww-tag co">사업자 124-86-01532</span>
          <span className="ww-tag good">감사 진행중</span>
        </div>
        <div className="ww-meta">1차 금속 제조 (C241) · 결산월 12월 · 직원 142명 · 본점 인천 · 대표이사 김도현 · 영구조서 마지막 갱신 2026-04-30</div>
      </div>
      <button className="ww-btn"><Ico name="folder"/>원본 폴더</button>
      <button className="ww-btn primary"><Ico name="plus"/>업무 추가</button>
    </div>

    {/* tabs */}
    <div className="ww-row" style={{gap:0, borderBottom:`1px solid ${T.line}`, marginBottom:18}}>
      {['개요','재무 추세','주주 변화','업무 이력','관련 위키','파일','특이사항'].map((t,i)=>(
        <div key={i} style={{padding:'9px 16px', fontSize:12.5, fontWeight: i===0 ? 600 : 400, color: i===0 ? T.ink : T.sub, borderBottom: i===0 ? `2px solid ${T.ink}`:'2px solid transparent', cursor:'pointer', marginBottom:-1}}>{t}</div>
      ))}
    </div>

    <div className="ww-grid" style={{gridTemplateColumns:'1fr 1fr 1fr', marginBottom:14}}>
      {[
        {k:'매출액 (2025)', v:'1,847억', sub:'전년비 +6.2%', s:[1500,1620,1580,1700,1740,1847]},
        {k:'영업이익 (2025)', v:'128억', sub:'전년비 +12%', s:[80,95,100,108,115,128]},
        {k:'차입금 잔액', v:'142억', sub:'전년비 -28%', warn:false, good:true, s:[210,200,195,170,160,142]},
        {k:'자본금', v:'50억', sub:'무상증자 2023', s:[30,30,40,40,50,50]},
        {k:'직원 수', v:'142명', sub:'+8 (1년)', s:[120,124,128,134,136,142]},
        {k:'주요주주 변화', v:'2회', sub:'최근 5년', s:[0,1,0,1,0,0]},
      ].map((c,i)=>(
        <div key={i} className="ww-card" style={{padding:'14px 16px'}}>
          <div className="ww-row">
            <div className="ww-meta">{c.k}</div>
            <div style={{marginLeft:'auto'}}><Spark data={c.s} w={80} h={26} color={c.good?T.good:T.accent}/></div>
          </div>
          <div style={{fontSize:24, fontWeight:700, letterSpacing:'-0.02em', marginTop:4}}>{c.v}</div>
          <div className="ww-meta" style={{color: c.good ? T.good : T.muted, marginTop:2}}>{c.sub}</div>
        </div>
      ))}
    </div>

    <div className="ww-grid" style={{gridTemplateColumns:'1.3fr 1fr'}}>
      <div style={{display:'flex', flexDirection:'column', gap:14}}>
        {/* Work timeline */}
        <div className="ww-card">
          <div className="ww-card-h"><Ico name="clock"/><div className="ww-h2">수행 업무 이력</div>
            <span style={{marginLeft:'auto'}} className="ww-meta">전체 18건 · 폴더 분류 무관 통합</span>
          </div>
          <div className="ww-card-b" style={{padding:'4px 0 0'}}>
            {/* timeline */}
            <div style={{position:'relative', paddingLeft:30}}>
              <div style={{position:'absolute', left:14, top:8, bottom:8, width:1.5, background:T.line}}/>
              {[
                {y:'2026',m:'04', t:'2025 외부감사', tag:'감사', who:'김민지·박재현', d:'진행중', good:true},
                {y:'2026',m:'02', t:'2025 법인세 세무조정', tag:'세무조정', who:'김민지', d:'완료'},
                {y:'2025',m:'11', t:'무형자산 손상 검토 용역', tag:'용역', who:'박재현', d:'완료'},
                {y:'2025',m:'04', t:'2024 외부감사', tag:'감사', who:'김민지', d:'완료'},
                {y:'2024',m:'09', t:'영업권 가치평가', tag:'가치평가', who:'외부 평가법인', d:'완료'},
                {y:'2024',m:'02', t:'2023 법인세 세무조정', tag:'세무조정', who:'정수아', d:'완료'},
              ].map((e,i)=>(
                <div key={i} style={{position:'relative', padding:'10px 16px 10px 8px', display:'flex', gap:14}}>
                  <div style={{position:'absolute', left:-22, top:14, width:11, height:11, borderRadius:'50%', background: e.good ? T.accent : '#fff', border:`2px solid ${e.good ? T.accent : T.line}`}}/>
                  <div style={{width:54, fontFamily:T.mono, fontSize:11, color:T.muted}}>{e.y}.{e.m}</div>
                  <div style={{flex:1}}>
                    <div className="ww-row" style={{gap:6, marginBottom:2}}>
                      <span style={{fontSize:13, fontWeight:500}}>{e.t}</span>
                      <span className="ww-tag task" style={{height:18, fontSize:10.5}}>{e.tag}</span>
                      {e.good && <span className="ww-tag good" style={{height:18, fontSize:10.5}}>진행중</span>}
                    </div>
                    <div className="ww-meta">{e.who} · {e.d}</div>
                  </div>
                  <Ico name="arrow-r"/>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Notable changes */}
        <div className="ww-card">
          <div className="ww-card-h"><Ico name="spark"/><div className="ww-h2">특이사항 메모</div>
            <span className="ww-tag" style={{background:T.accentSoft, color:T.accent, marginLeft:'auto'}}>LLM 자동 추출</span>
          </div>
          <div className="ww-card-b" style={{padding:0}}>
            {[
              {y:'2026',t:'차입금 142억으로 30% 감소. 2024년 발행 회사채 200억 중 60억 조기상환', src:'재무제표 2025'},
              {y:'2025',t:'대표이사 자녀(김OO) 지분 5% 신규 취득 — 특수관계자 거래 모니터링 필요', src:'주주명부 2025-06'},
              {y:'2024',t:'영업권 손상 24억 인식. 인수 자회사(주)동방금속 사업부 매각', src:'감사보고서 2024'},
              {y:'2023',t:'무상증자(자본금 40억→50억). 잉여금 자본전입', src:'법인등기부'},
            ].map((m,i)=>(
              <div key={i} style={{padding:'11px 16px', borderTop: i ? `1px solid ${T.lineSoft}`:'none', display:'flex', gap:12}}>
                <span className="ww-tag year" style={{flexShrink:0}}>{m.y}</span>
                <div style={{flex:1, fontSize:12.5, lineHeight:1.5, color:T.ink}}>{m.t}</div>
                <span className="ww-meta" style={{flexShrink:0, fontFamily:T.mono}}>{m.src}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{display:'flex', flexDirection:'column', gap:14}}>
        {/* Basic info */}
        <div className="ww-card">
          <div className="ww-card-h"><Ico name="building"/><div className="ww-h2">기본 정보</div></div>
          <div className="ww-card-b" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
            {[
              ['업종','C241 1차 금속'],['결산월','12월 (한국)'],
              ['상장','코스피 (2018-)'],['감사인','당기 신규 (전기 A회계법인)'],
              ['외감대상','자산 1,200억 / 매출 1,847억'],['연결대상','자회사 3개'],
              ['주거래은행','신한 / 우리'],['세무대리','자체'],
            ].map(([k,v],i)=>(
              <div key={i} className="ww-kv">
                <span className="ww-kv-k">{k}</span><span className="ww-kv-v">{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Shareholders */}
        <div className="ww-card">
          <div className="ww-card-h"><Ico name="users"/><div className="ww-h2">주주 분포</div>
            <span className="ww-tag" style={{marginLeft:'auto'}}>2025-12 기준</span>
          </div>
          <div className="ww-card-b">
            {/* stacked bar */}
            <div style={{display:'flex', height:22, borderRadius:5, overflow:'hidden', marginBottom:10}}>
              {[
                {n:'김도현(대표)', p:42, c:'#3949ab'},
                {n:'(주)대한홀딩스', p:24, c:'#5c6bc0'},
                {n:'우리사주', p:8, c:'#9fa8da'},
                {n:'김OO(자녀)', p:5, c:'#b8741b'},
                {n:'기타', p:21, c:'#cfcfca'},
              ].map((s,i)=><div key={i} style={{width:`${s.p}%`, background:s.c}}/>)}
            </div>
            <div style={{display:'flex', flexDirection:'column', gap:6}}>
              {[
                {n:'김도현 (대표)', p:'42.0%', c:'#3949ab', d:'-'},
                {n:'(주)대한홀딩스', p:'24.0%', c:'#5c6bc0', d:'-'},
                {n:'우리사주조합', p:'8.0%', c:'#9fa8da', d:'-'},
                {n:'김OO (대표 자녀)', p:'5.0%', c:'#b8741b', d:'+5.0% (2025)'},
                {n:'기타 소액주주', p:'21.0%', c:'#cfcfca', d:'-0.5%'},
              ].map((s,i)=>(
                <div key={i} className="ww-row" style={{fontSize:12, gap:8}}>
                  <div style={{width:8, height:8, borderRadius:2, background:s.c}}/>
                  <span style={{flex:1}}>{s.n}</span>
                  <span style={{fontFamily:T.mono}}>{s.p}</span>
                  <span className="ww-meta" style={{width:90, textAlign:'right', color: s.d.startsWith('+5')?T.warn:T.muted}}>{s.d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Linked wiki */}
        <div className="ww-card">
          <div className="ww-card-h"><Ico name="link"/><div className="ww-h2">관련 위키 · 빠른 진입점</div></div>
          <div className="ww-card-b" style={{padding:0}}>
            {[
              ['/wiki/co/daehan/loans-analysis.md','차입금 분석 — 과소자본세제'],
              ['/wiki/co/daehan/related-parties.md','특수관계자 매핑'],
              ['/wiki/co/daehan/impairment-2024.md','영업권 손상 2024'],
              ['/wiki/co/daehan/audit-2025-plan.md','2025 감사 계획서'],
            ].map((l,i)=>(
              <div key={i} className="ww-row" style={{padding:'10px 16px', borderTop: i ? `1px solid ${T.lineSoft}`:'none', cursor:'pointer'}}>
                <Ico name="book"/>
                <span style={{flex:1, fontSize:12.5}}>{l[1]}</span>
                <span className="ww-meta" style={{fontFamily:T.mono}}>{l[0]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Next */}
        <div className="ww-card" style={{borderColor:T.warn, background:T.warnSoft}}>
          <div className="ww-card-b">
            <div className="ww-row" style={{marginBottom:6}}>
              <Ico name="alert"/><div className="ww-h3" style={{color:T.warn}}>다음 예정 업무</div>
            </div>
            <div style={{fontSize:13, fontWeight:500}}>2025년 외부감사 보고서 발행 — 2026-05-22 (D-15)</div>
            <div className="ww-meta" style={{marginTop:3}}>다음: 2026-Q2 부가세 신고 (D-58)</div>
          </div>
        </div>
      </div>
    </div>
  </Shell>
);

Object.assign(window, { Screen_Home, Screen_Search, Screen_Company });
