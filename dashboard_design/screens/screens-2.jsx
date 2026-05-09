// screens-2.jsx — Wiki page detail, Upload/tagging, File library
/* global React, Shell, Ico, Cite, Spark, T */

// ============ 4. WIKI PAGE DETAIL ============
const Screen_Wiki = () => (
  <Shell active="wiki" crumbs={['위키', '세무 / 손금산입', '과소자본세제 적용 판단']}>
    <div className="ww-grid" style={{gridTemplateColumns:'220px 1fr 240px', gap:20}}>
      {/* Left tree */}
      <div className="ww-card" style={{alignSelf:'flex-start'}}>
        <div className="ww-card-h"><Ico name="book"/><div className="ww-h2">위키 트리</div></div>
        <div className="ww-card-b" style={{padding:'8px 8px', fontSize:12.5}}>
          {[
            ['세무', true, 0],
            ['손금산입·불산입', true, 1],
            ['과소자본세제', true, 2, true],
            ['특수관계자 인정이자', false, 2],
            ['업무용 승용차', false, 2],
            ['세액공제', false, 1],
            ['감사', false, 0],
            ['가치평가', false, 0],
            ['회사별', false, 0],
          ].map(([t,open,lv,active],i)=>(
            <div key={i} className="ww-row" style={{padding:'5px 8px', paddingLeft:8 + lv*14, borderRadius:5, background: active ? T.accentSoft : 'transparent', color: active ? T.accent : T.sub, fontWeight: active ? 600 : 400, cursor:'pointer'}}>
              <span style={{width:10, color:T.muted}}>{lv<2 ? (open?'▾':'▸') : '·'}</span>
              <span style={{flex:1}}>{t}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Article */}
      <article style={{maxWidth:760}}>
        <div className="ww-row" style={{gap:8, marginBottom:8, color:T.muted, fontSize:12}}>
          <span>세무</span><Ico name="arrow-r"/><span>손금산입·불산입</span><Ico name="arrow-r"/><b style={{color:T.ink}}>과소자본세제 적용 판단</b>
        </div>
        <h1 style={{fontSize:28, fontWeight:700, letterSpacing:'-0.02em', margin:'0 0 8px'}}>과소자본세제 적용 판단</h1>
        <div className="ww-row" style={{gap:6, marginBottom:18}}>
          <span className="ww-tag year">2026</span>
          <span className="ww-tag task">세무조정</span>
          <span className="ww-tag">손금불산입</span>
          <span className="ww-tag">법인세</span>
          <span style={{marginLeft:'auto'}} className="ww-meta">최종 수정 2026-04-30 · 김민지 · 자동 컴파일 7회</span>
        </div>

        <div style={{padding:'12px 14px', background:T.accentSoft, borderRadius:8, fontSize:13, lineHeight:1.6, marginBottom:18, borderLeft:`3px solid ${T.accent}`}}>
          <b style={{color:T.accent}}>요약 ·</b> 차입금이 자기자본의 2배를 초과하면 초과분의 지급이자는 손금불산입.
          특수관계 외국법인의 차입은 법인세법 §28, 국내 특수관계자 차입은 §28의2 적용. 2026년 인정이자율 4.6%.
        </div>

        <h2 style={{fontSize:17, fontWeight:600, margin:'18px 0 10px'}}>1. 적용 요건</h2>
        <p style={{fontSize:13.5, lineHeight:1.75, color:T.ink, margin:'0 0 12px'}}>
          내국법인이 국외지배주주로부터 차입한 금액 또는 국외지배주주의 지급보증으로 차입한 금액 중,
          그 합계액이 <b>국외지배주주의 출자지분의 2배</b>를 초과하는 부분에 대한 지급이자·할인료는
          손금에 산입하지 아니한다 <Cite n={1} src="법인세법 §28"/>.
          국내 특수관계자 차입의 경우에도 자기자본의 2배 한도가 적용된다 <Cite n={2} src="법인세법 §28의2"/>.
        </p>

        <h2 style={{fontSize:17, fontWeight:600, margin:'18px 0 10px'}}>2. 계산 방법</h2>
        <div className="ww-card" style={{padding:14, marginBottom:12, background:'#fbfaf7'}}>
          <div style={{fontFamily:T.mono, fontSize:12.5, lineHeight:1.8, color:T.ink}}>
            손금불산입액 = 지급이자 × (초과차입금 / 총차입금)<br/>
            초과차입금 = max(0, 평균차입금 − 자기자본 × 2)<br/>
            <span style={{color:T.muted}}>※ 평균은 일평잔. 자기자본은 기초·기말 평균</span>
          </div>
        </div>

        <h2 style={{fontSize:17, fontWeight:600, margin:'18px 0 10px'}}>3. 관리 회사 적용 현황</h2>
        <table className="ww-tbl" style={{marginBottom:14}}>
          <thead><tr><th>회사</th><th>차입금</th><th>자기자본</th><th>배수</th><th>판정</th></tr></thead>
          <tbody>
            <tr><td>(주)대한제강</td><td style={{fontFamily:T.mono}}>142억</td><td style={{fontFamily:T.mono}}>820억</td><td style={{fontFamily:T.mono}}>0.17×</td><td><span className="ww-tag good">한도 내</span></td></tr>
            <tr><td>(주)서린식품</td><td style={{fontFamily:T.mono}}>180억</td><td style={{fontFamily:T.mono}}>72억</td><td style={{fontFamily:T.mono, color:T.bad}}>2.50×</td><td><span className="ww-tag bad">초과 36억</span></td></tr>
            <tr><td>바이오넥스(주)</td><td style={{fontFamily:T.mono}}>45억</td><td style={{fontFamily:T.mono}}>310억</td><td style={{fontFamily:T.mono}}>0.15×</td><td><span className="ww-tag good">한도 내</span></td></tr>
          </tbody>
        </table>
        <p style={{fontSize:13.5, lineHeight:1.7, color:T.ink}}>
          서린식품은 2025년 추가 차입 60억으로 한도를 초과하였다 <Cite n={3} src="/companies/seorin/loans-2025.md"/>.
          2026년 세무조정 시 약 1.7억의 손금불산입 예상.
        </p>

        <div className="ww-divider"/>
        <div style={{padding:14, border:`1px solid ${T.line}`, borderRadius:8, background:'#fbfaf7'}}>
          <div className="ww-h3" style={{marginBottom:10}}>출처 (이 페이지의 모든 주장은 아래 출처에 근거함)</div>
          <ol style={{margin:0, paddingLeft:20, fontSize:12.5, lineHeight:1.9, color:T.sub}}>
            <li><b style={{color:T.ink}}>법인세법 §28</b> — 국세청 법령정보 · 2025-12-31 시행 <span style={{color:T.accent, fontFamily:T.mono, marginLeft:6}}>law.go.kr/법인세법/제28조</span></li>
            <li><b style={{color:T.ink}}>법인세법 §28의2</b> — 기획재정부 / 2026-01-01 개정안 반영</li>
            <li><b style={{color:T.ink}}>/companies/seorin/loans-2025.md</b> — 내부 위키 · 2026-04-22 갱신 (raw: <span style={{fontFamily:T.mono}}>raw/seorin/loan-summary.xlsx</span>)</li>
            <li><b style={{color:T.ink}}>대법원 판례 2018두12345</b> — 특수관계자 범위 판단</li>
          </ol>
        </div>
      </article>

      {/* TOC + meta */}
      <div style={{display:'flex', flexDirection:'column', gap:14, alignSelf:'flex-start'}}>
        <div className="ww-card">
          <div className="ww-card-h"><Ico name="list"/><div className="ww-h2">목차</div></div>
          <div className="ww-card-b" style={{padding:'8px 12px', fontSize:12, display:'flex', flexDirection:'column', gap:6}}>
            {['1. 적용 요건','2. 계산 방법','3. 관리 회사 적용 현황','4. 예규·판례','출처'].map((t,i)=>(
              <div key={i} style={{color: i<3 ? T.ink : T.sub, fontWeight: i===0 ? 600 : 400, paddingLeft: i===4 ? 0 : 0, cursor:'pointer'}}>{t}</div>
            ))}
          </div>
        </div>
        <div className="ww-card">
          <div className="ww-card-h"><Ico name="link"/><div className="ww-h2">백링크</div></div>
          <div className="ww-card-b" style={{padding:0, fontSize:12}}>
            {['/companies/daehan/loans','/companies/seorin/loans','/wiki/tax/related-party','/wiki/audit/risk-loans'].map((l,i)=>(
              <div key={i} style={{padding:'8px 14px', borderTop: i ? `1px solid ${T.lineSoft}`:'none', fontFamily:T.mono, color:T.accent, cursor:'pointer'}}>{l}</div>
            ))}
          </div>
        </div>
        <div className="ww-card" style={{background:T.warnSoft, borderColor:T.warn}}>
          <div className="ww-card-b">
            <div className="ww-row" style={{marginBottom:6}}><Ico name="alert"/><div className="ww-h3" style={{color:T.warn}}>관련 세법 변경 1건</div></div>
            <div style={{fontSize:12.5, lineHeight:1.5}}>2026-04 인정이자율 4.6% → 4.8% 개정안 검토 중</div>
            <div style={{marginTop:8, fontSize:11.5, color:T.accent, cursor:'pointer'}}>알림 보기 →</div>
          </div>
        </div>
      </div>
    </div>
  </Shell>
);

// ============ 5. UPLOAD / TAGGING ============
const Screen_Upload = () => (
  <Shell active="upload" crumbs={['업로드', '신규 파일 태깅']}>
    <div className="ww-h1" style={{marginBottom:6}}>파일 업로드 · 자동 태깅</div>
    <div className="ww-meta" style={{marginBottom:18}}>업로드한 파일은 LLM이 회사 · 연도 · 업무 태그를 추출하고, 위키에 변경점을 반영합니다.</div>

    <div className="ww-grid" style={{gridTemplateColumns:'1.1fr 1fr', gap:18}}>
      {/* Drop zone */}
      <div>
        <div style={{border:`2px dashed ${T.line}`, borderRadius:12, padding:'40px 24px', textAlign:'center', background:'#fbfaf7'}}>
          <div style={{width:48, height:48, margin:'0 auto 12px', borderRadius:10, background:T.accentSoft, color:T.accent, display:'flex', alignItems:'center', justifyContent:'center'}}>
            <Ico name="upload" lg/>
          </div>
          <div className="ww-h2" style={{marginBottom:6}}>파일을 끌어다 놓으세요</div>
          <div className="ww-meta">PDF · XLSX · DOCX · HWP · 한글 · 이미지 지원 (최대 200MB)</div>
          <button className="ww-btn primary" style={{marginTop:14}}><Ico name="folder"/>폴더에서 선택</button>
        </div>

        <div className="ww-card" style={{marginTop:14}}>
          <div className="ww-card-h"><Ico name="doc"/><div className="ww-h2">대기중 4개 파일</div></div>
          <div>
            {[
              {n:'대한제강_차입약정서_2025-12.pdf', sz:'2.4 MB', s:'분석중', co:'(주)대한제강', y:'2025', tk:'세무조정', conf:96},
              {n:'바이오넥스_감사조서_매출.xlsx', sz:'8.1 MB', s:'분석중', co:'바이오넥스', y:'2025', tk:'감사', conf:91},
              {n:'서린식품_용역계약_가치평가.hwp', sz:'310 KB', s:'완료', co:'(주)서린식품', y:'2024', tk:'가치평가', conf:88, hwp:true},
              {n:'에이치엠_법인등기부등본.pdf', sz:'420 KB', s:'대기', co:'에이치엠로지스', y:'2026', tk:'기본정보', conf:99},
            ].map((f,i)=>(
              <div key={i} style={{padding:'12px 16px', borderTop: i ? `1px solid ${T.lineSoft}`:'none'}}>
                <div className="ww-row" style={{gap:10, marginBottom:7}}>
                  <Ico name="doc" lg/>
                  <div style={{flex:1, minWidth:0}}>
                    <div style={{fontSize:12.5, fontWeight:500, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{f.n}</div>
                    <div className="ww-meta" style={{marginTop:1}}>{f.sz} · {f.hwp ? 'HWP 변환 완료' : ''}</div>
                  </div>
                  <span className={'ww-tag '+(f.s==='완료'?'good':f.s==='분석중'?'warn':'')}>{f.s}</span>
                </div>
                <div className="ww-row" style={{gap:5, paddingLeft:24}}>
                  <span className="ww-tag co">{f.co}</span>
                  <span className="ww-tag year">{f.y}</span>
                  <span className="ww-tag task">{f.tk}</span>
                  <span className="ww-meta" style={{marginLeft:'auto', fontFamily:T.mono}}>신뢰도 {f.conf}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tag editor for selected */}
      <div className="ww-card" style={{alignSelf:'flex-start'}}>
        <div className="ww-card-h">
          <Ico name="tag"/><div className="ww-h2">태그 검토 · 1번 파일</div>
          <span className="ww-tag" style={{marginLeft:'auto', background:T.accentSoft, color:T.accent}}>LLM 자동 추출</span>
        </div>
        <div className="ww-card-b" style={{display:'flex', flexDirection:'column', gap:14}}>
          <div className="ww-row" style={{gap:10}}>
            <div className="ph" style={{width:80, height:100}}>PDF</div>
            <div style={{flex:1}}>
              <div style={{fontSize:13, fontWeight:600, marginBottom:4}}>대한제강_차입약정서_2025-12.pdf</div>
              <div className="ww-meta" style={{lineHeight:1.55}}>2.4 MB · 8 페이지 · 본문에서 회사명·금액·날짜 추출 완료</div>
            </div>
          </div>

          {[
            {l:'회사', v:'(주)대한제강', conf:'96%', alt:['대한제강(주)','대한홀딩스']},
            {l:'연도', v:'2025', conf:'99%', alt:['2024','2026']},
            {l:'업무', v:'세무조정', conf:'87%', alt:['외부감사','용역']},
            {l:'문서종류', v:'계약서 · 차입약정', conf:'94%'},
          ].map((f,i)=>(
            <div key={i}>
              <div className="ww-row" style={{marginBottom:5}}>
                <span className="ww-kv-k">{f.l}</span>
                <span className="ww-meta" style={{marginLeft:'auto', fontFamily:T.mono}}>{f.conf}</span>
              </div>
              <div className="ww-row" style={{gap:6}}>
                <span className="ww-tag" style={{background:T.ink, color:'#fff', border:'none'}}>{f.v}</span>
                {f.alt && f.alt.map((a,j)=><span key={j} className="ww-tag" style={{cursor:'pointer'}}>{a}</span>)}
                <span className="ww-tag" style={{cursor:'pointer', borderStyle:'dashed', borderColor:T.line, background:'transparent'}}><Ico name="plus"/>추가</span>
              </div>
            </div>
          ))}

          <div>
            <div className="ww-kv-k" style={{marginBottom:5}}>추출된 키워드 · 본문</div>
            <div className="ww-row" style={{gap:5, flexWrap:'wrap'}}>
              {['연 4.2%','만기 2027-12','보증 김도현','특수관계','60억원','분기 상환'].map((k,i)=>(
                <span key={i} className="ww-tag" style={{fontFamily:T.mono, fontSize:11}}>{k}</span>
              ))}
            </div>
          </div>

          <div className="ww-divider" style={{margin:'4px 0'}}/>

          <div className="ww-row">
            <Ico name="spark"/>
            <span style={{fontSize:12.5, color:T.sub}}>위키 자동 갱신 예고</span>
          </div>
          <div style={{padding:10, background:T.accentSoft, borderRadius:7, fontSize:12, color:T.ink, lineHeight:1.55}}>
            본 파일을 ingest 시: <b>/companies/daehan/loans-2025.md</b> 에 차입 60억 추가 기재,
            특수관계자 거래 모니터링 항목에 신규 보증 1건 추가 예정.
          </div>

          <div className="ww-row" style={{marginTop:6}}>
            <button className="ww-btn">취소</button>
            <button className="ww-btn primary" style={{flex:1, justifyContent:'center'}}><Ico name="check"/>승인 · 위키 컴파일</button>
          </div>
        </div>
      </div>
    </div>
  </Shell>
);

// ============ 6. FILE LIBRARY ============
const Screen_Files = () => (
  <Shell active="files" crumbs={['파일 라이브러리']}>
    <div className="ww-row" style={{justifyContent:'space-between', marginBottom:14}}>
      <div>
        <div className="ww-h1">파일 라이브러리</div>
        <div className="ww-meta" style={{marginTop:4}}>전체 8,732개 · 자동 태그 92% · 미분류 38개</div>
      </div>
      <div className="ww-row" style={{gap:8}}>
        <button className="ww-btn"><Ico name="filter"/>고급 필터</button>
        <button className="ww-btn primary"><Ico name="upload"/>업로드</button>
      </div>
    </div>

    {/* Active filter chips */}
    <div className="ww-row" style={{gap:6, marginBottom:14, flexWrap:'wrap', padding:'10px 12px', background:'#fff', border:`1px solid ${T.line}`, borderRadius:8}}>
      <span className="ww-meta" style={{marginRight:4}}>필터</span>
      <span className="ww-tag year">2025</span>
      <span className="ww-tag task">세무조정</span>
      <span className="ww-tag co">대한제강</span>
      <span className="ww-tag" style={{borderStyle:'dashed', cursor:'pointer'}}><Ico name="plus"/>태그 추가</span>
      <span style={{marginLeft:'auto'}} className="ww-meta">결과 142건</span>
    </div>

    <div className="ww-grid" style={{gridTemplateColumns:'200px 1fr', gap:16}}>
      {/* Facets */}
      <div className="ww-card" style={{alignSelf:'flex-start'}}>
        <div className="ww-card-b" style={{display:'flex', flexDirection:'column', gap:14, padding:'14px 14px'}}>
          {[
            {h:'연도별', items:[['2026',82],['2025',2104],['2024',1893],['2023',1612],['이전',3041]]},
            {h:'업무별', items:[['감사',2891],['세무조정',2104],['가치평가',814],['용역',1502],['기타',1421]]},
            {h:'문서 종류', items:[['조서',2891],['계약서',1018],['재무제표',724],['세무 신고',1840],['기타',2259]]},
            {h:'상태', items:[['태그완료',8694],['검토필요',38]]},
          ].map((g,i)=>(
            <div key={i}>
              <div className="ww-h3" style={{marginBottom:6}}>{g.h}</div>
              <div style={{display:'flex', flexDirection:'column', gap:5}}>
                {g.items.map(([k,v],j)=>{
                  const max = Math.max(...g.items.map(it=>it[1]));
                  return (
                    <div key={j} style={{position:'relative', padding:'4px 8px', borderRadius:5, fontSize:12, cursor:'pointer'}}>
                      <div style={{position:'absolute', left:0, top:0, bottom:0, width:`${(v/max)*100}%`, background:T.lineSoft, borderRadius:5}}/>
                      <div className="ww-row" style={{position:'relative', gap:6}}>
                        <span style={{flex:1, color:T.sub}}>{k}</span>
                        <span style={{fontFamily:T.mono, fontSize:11, color:T.muted}}>{v.toLocaleString()}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* File list */}
      <div className="ww-card">
        <table className="ww-tbl">
          <thead><tr>
            <th style={{width:24}}><input type="checkbox" style={{accentColor:T.accent}}/></th>
            <th>파일명</th><th>회사</th><th>연도</th><th>업무</th><th>크기</th><th>업로드</th><th style={{width:24}}></th>
          </tr></thead>
          <tbody>
            {[
              {n:'세무조정_법인세_2025_최종.xlsx', co:'대한제강', y:'2025', tk:'세무조정', sz:'4.2 MB', d:'2일 전', sel:true},
              {n:'차입약정서_원본_2025-12.pdf', co:'대한제강', y:'2025', tk:'세무조정', sz:'2.4 MB', d:'2일 전'},
              {n:'세무조정_조정명세서_2025.hwp', co:'대한제강', y:'2025', tk:'세무조정', sz:'820 KB', d:'3일 전', hwp:true},
              {n:'특수관계자_거래내역_2025.xlsx', co:'대한제강', y:'2025', tk:'세무조정', sz:'1.8 MB', d:'4일 전'},
              {n:'기부금_명세_2025.pdf', co:'대한제강', y:'2025', tk:'세무조정', sz:'310 KB', d:'5일 전', warn:true},
              {n:'외화환산손익_분석.xlsx', co:'대한제강', y:'2025', tk:'세무조정', sz:'2.1 MB', d:'1주 전'},
              {n:'대표이사_가지급금_검토.pdf', co:'대한제강', y:'2025', tk:'세무조정', sz:'940 KB', d:'1주 전'},
              {n:'재고자산_평가_보충자료.xlsx', co:'대한제강', y:'2025', tk:'세무조정', sz:'5.6 MB', d:'2주 전'},
              {n:'법인세_확정신고서_초안.pdf', co:'대한제강', y:'2025', tk:'세무조정', sz:'1.2 MB', d:'2주 전'},
            ].map((f,i)=>(
              <tr key={i} style={{background: f.sel ? T.accentSoft : 'transparent'}}>
                <td><input type="checkbox" defaultChecked={f.sel} style={{accentColor:T.accent}}/></td>
                <td>
                  <div className="ww-row" style={{gap:8}}>
                    <Ico name="doc"/>
                    <span style={{fontSize:12.5, fontWeight: f.sel ? 600 : 500}}>{f.n}</span>
                    {f.hwp && <span className="ww-tag" style={{height:16, fontSize:10, padding:'0 4px', background:T.warnSoft, color:T.warn}}>HWP</span>}
                    {f.warn && <span className="ww-tag warn" style={{height:16, fontSize:10}}>검토필요</span>}
                  </div>
                </td>
                <td><span className="ww-tag co">{f.co}</span></td>
                <td><span className="ww-tag year">{f.y}</span></td>
                <td><span className="ww-tag task">{f.tk}</span></td>
                <td className="ww-meta" style={{fontFamily:T.mono}}>{f.sz}</td>
                <td className="ww-meta">{f.d}</td>
                <td><Ico name="kebab"/></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </Shell>
);

Object.assign(window, { Screen_Wiki, Screen_Upload, Screen_Files });
