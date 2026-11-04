import { Component, computed, signal } from '@angular/core';
const AREAS=['Consent Management','Notice & Transparency','Data Governance & Mapping','Data Principal Rights','Breach Readiness & Vendor Risk'];
// a = area index, o = options in increasing maturity (scored 0..3)
const QS=[
 {a:0,q:'How does your organization collect consent for processing personal data?',h:'The DPDP Act requires consent that is free, specific, informed and given through a clear affirmative action.',o:['No formal consent process exists','Paper-based or verbal consent only','Digital consent collection with basic records','Granular digital consent with a full audit trail and purpose-specific opt-in']},
 {a:0,q:'Can individuals withdraw consent as easily as they gave it?',h:'Withdrawal should be at least as simple as the original consent action.',o:['No withdrawal mechanism exists','Withdrawal only via manual request (email or letter)','Documented withdrawal process with a defined response time','Self-service withdrawal with immediate effect across all systems']},
 {a:1,q:'Do you provide a clear notice before or at the time you collect personal data?',h:'Notice should explain what data is collected, why, and for how long — before or when collection happens.',o:['No privacy notice exists','A generic privacy policy, not linked to specific collection points','Notice shown at the point of collection, covering purpose and data collected','Layered, plain-language notices tailored to each collection point']},
 {a:1,q:'Is your notice available in a language the individual is likely to understand?',h:'The Act expects notices to be genuinely understandable, not just legally present.',o:['English only, in dense legal language','English only, in simplified language','Available in a couple of major regional languages','Available in every language the organization operates in']},
 {a:2,q:'Do you maintain a record of what personal data you hold and where it lives?',h:'A current data inventory is the foundation most other DPDP obligations depend on.',o:['No data inventory exists','Informal knowledge, not documented anywhere','Data mapped for major systems, updated occasionally','A continuously maintained inventory across all systems and vendors']},
 {a:2,q:'How is internal access to personal data controlled?',h:'Access control limits exposure and is usually one of the first things an auditor checks.',o:['Broad access, with no meaningful restrictions','Role-based access for some systems only','Role-based access enforced across most systems','Role-based access with logging and periodic access reviews']},
 {a:3,q:'Can individuals request access to, correction of, or erasure of their data?',h:'Data principal rights requests need a defined, repeatable process — not a one-off email reply.',o:['No defined process exists','Handled manually, on an ad-hoc basis','A documented process with a target response time','A self-service or SLA-backed process with a full audit trail']},
 {a:3,q:'What happens when an erasure request conflicts with another retention obligation (for example, financial or tax records)?',h:'DPDP erasure rights often sit alongside sector rules that require records to be kept for a period.',o:['Not considered, or unclear who decides','Decided case-by-case, without documentation','A general policy exists but isn’t consistently applied','A documented retention-vs-erasure policy, applied and evidenced per request']},
 {a:4,q:'Do you have a documented data breach response plan?',h:'The Act requires timely breach notification — that’s hard to do without a plan agreed in advance.',o:['No plan exists','An informal understanding, nothing written down','A documented plan that hasn’t been tested','A documented plan, tested periodically, with defined notification timelines']},
 {a:4,q:'Do your vendor and processor contracts address data protection obligations?',h:'As a data fiduciary, you remain accountable for how your vendors handle personal data.',o:['Not addressed in vendor contracts','Addressed in some new contracts only','Standard data protection clauses used for most vendors','Standard clauses in place, plus periodic vendor risk review']},
];
@Component({selector:'app-readiness',standalone:true,template:`
<div class="rc-card">
@switch(stage()){
 @case('intro'){<div class="rc-intro">
  <div class="rc-chips"><span>10 questions</span><span>5 compliance areas</span><span>Instant score, no email required</span></div>
  <p>Answer honestly rather than aspirationally — the value of this tool is in seeing where your gaps actually are. Your answers stay in this browser tab and are never transmitted or stored.</p>
  <button class="rc-btn light" (click)="stage.set('quiz')">Start the Readiness Check</button></div>}
 @case('quiz'){@for(qq of qs;track $index;let k=$index){@if(k===i()){<div class="rc-step">
  <div class="rc-head"><span class="rc-count">Question {{k+1}} of 10</span><span class="rc-pill">{{areas[qs[k].a]}}</span></div>
  <div class="rc-prog" role="progressbar" [attr.aria-valuenow]="(k+1)*10" aria-valuemin="0" aria-valuemax="100" aria-label="Quiz progress"><i [style.width.%]="(k+1)*10"></i></div>
  <h3 class="rc-q">{{qs[k].q}}</h3><p class="rc-hint">{{qs[k].h}}</p>
  <div class="rc-opts">@for(o of qs[k].o;track $index;let j=$index){
   <button type="button" class="rc-opt" [class.sel]="ans()[k]===j" [attr.aria-pressed]="ans()[k]===j" (click)="pick(j)"><span class="rc-radio"></span>{{o}}</button>}</div>
  <div class="rc-nav">
   @if(k>0){<button type="button" class="rc-btn ghost" (click)="i.set(k-1)">← Back</button>}
   <button type="button" class="rc-btn light" style="margin-left:auto" [disabled]="ans()[k]==null" (click)="next()">{{k===9?'See my results':'Next'}}</button></div>
 </div>}}}
 @case('result'){<div class="rc-res">
  <div class="rc-top">
   <div class="rc-gauge"><svg viewBox="0 0 120 120"><defs><linearGradient id="rcg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#22d3ee"/><stop offset="1" stop-color="#3b82f6"/></linearGradient></defs>
    <circle class="trk" cx="60" cy="60" r="52"/><circle class="arc" cx="60" cy="60" r="52" stroke="url(#rcg)" stroke-dasharray="326.7" [attr.stroke-dashoffset]="off()" transform="rotate(-90 60 60)"/></svg>
    <div class="rc-num"><b>{{pct()}}%</b><small>Readiness</small></div></div>
   <div><span class="rc-band" [attr.data-b]="band().k">{{band().n}}</span><p class="rc-bd">{{band().d}}</p></div></div>
  <div class="rc-cats">@for(c of cats();track c.n){<div class="rc-cat"><span>{{c.n}}</span><div class="rc-bar"><i [style.width.%]="c.p"></i></div><b>{{c.p}}%</b></div>}</div>
  <div class="rc-note"><span>⚠</span><p>This is a directional self-assessment based on your own answers. It does not constitute legal advice and does not certify compliance with the DPDP Act, 2023.</p></div>
  <div class="rc-acts"><a class="rc-btn light" href="/contact">Discuss My Results With a Specialist →</a>
   <button type="button" class="rc-btn ghost" (click)="print()">Save as PDF</button><button type="button" class="rc-btn ghost" (click)="reset()">Retake the Check</button></div>
 </div>}
}
</div>`})
export class ReadinessComponent{
 areas=AREAS;qs=QS;stage=signal<'intro'|'quiz'|'result'>('intro');i=signal(0);ans=signal<(number|undefined)[]>([]);
 pick(v:number){this.ans.update(a=>{const c=[...a];c[this.i()]=v;return c;});}
 next(){this.i()===9?this.stage.set('result'):this.i.update(n=>n+1);}
 pct=computed(()=>Math.round(QS.reduce((s,_,k)=>s+(this.ans()[k]??0),0)/30*100));
 off=computed(()=>326.7*(1-this.pct()/100));
 cats=computed(()=>AREAS.map((n,a)=>({n,p:Math.round(QS.reduce((s,q,k)=>s+(q.a===a?(this.ans()[k]??0):0),0)/6*100)})));
 // Band names/text are from the live site; the 40 / 70 thresholds are estimates.
 band=computed(()=>{const p=this.pct();
  if(p>=70)return{k:'hi',n:'Advanced',d:'A mature program. Focus shifts to continuous monitoring, vendor oversight and staying current as guidance evolves.'};
  if(p>=40)return{k:'mid',n:'Developing',d:'Some building blocks exist, but gaps in consistency and evidence remain. Most organizations at this stage benefit from a focused remediation sprint.'};
  return{k:'lo',n:'Early Stage',d:'Foundational DPDP controls are largely missing. A structured gap assessment is the fastest way to build a prioritized roadmap.'};});
 reset(){this.ans.set([]);this.i.set(0);this.stage.set('intro');}
 print(){window.print();}
}