import { Component, ElementRef, ViewChild, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FlowComponent } from '../flow.component';
import { CAPABILITIES, AI_SOLUTIONS, INDUSTRIES, SOLVE, THEMES, FOUNDED } from '../data';
const I='/images/';
const START=[{l:'SMS / OTP',x:70,y:70},{l:'WhatsApp',x:370,y:70},{l:'Voice',x:50,y:250},{l:'Email',x:390,y:250},{l:'AI agents',x:220,y:355}];
const TICK=['Since 2009','5 Capability Domains','6 AI Solutions','Voice & Telephony','Omnichannel Engagement','AI Automation','Secure Infrastructure'];
const CAPIMG=['server_room_1','office_glass','dashboard_1','fintech_payment','hero_core'];
const AIIMG=['hero_core','office_glass','dashboard_1','education_2','server_room_1','finance_skyline'];
const SECTORS=[{n:'Banking & finance',i:'finance_skyline',t:'OTPs, alerts and secure customer calls.'},{n:'Healthcare',i:'healthcare_1',t:'Appointment booking and reminders.'},{n:'Telecom',i:'server_room_1',t:'Voice, IVR and messaging APIs.'},{n:'E-commerce',i:'fintech_payment',t:'Order updates and support automation.'}];
@Component({standalone:true,imports:[RouterLink,FlowComponent],template:`
<section id="who" class="hero" (pointermove)="glow($event)" [style.--mx.%]="mx()" [style.--my.%]="my()"><div class="wrap hero-in"><div>
<p class="pill"><span class="dots"><i></i><i></i><i></i></span>Powering Innovation Through AI &amp; Automation</p>
<h1>Intelligent Infrastructure <span class="grad">for Modern Enterprises</span></h1>
<p class="lead">From AI-powered voice agents and WhatsApp automation to enterprise messaging and custom software, Inbox Media delivers the communication backbone that enterprises operate on. Trusted since 2009.</p>
<div class="cta2"><a class="btn" routerLink="/contact" [queryParams]="{type:'demo'}">Book a Demo</a><a class="btn ghost" routerLink="/capabilities">Explore Capabilities</a></div>
<ul class="proof"><li>Since 2009 ({{yrs}} years)</li><li>5 capability domains</li><li>6 AI solutions</li></ul></div>
<div class="stage"><svg #svg viewBox="0 0 440 400" (pointermove)="move($event)" (pointerup)="drag=-1" (pointerleave)="drag=-1" role="img" aria-label="Draggable diagram of Inbox Media connecting channels">
<defs><radialGradient id="g"><stop offset="0" stop-color="#ff7043"/><stop offset="1" stop-color="#673ab7"/></radialGradient></defs>
@for(n of nodes();track n.l){<line x1="220" y1="200" [attr.x2]="n.x" [attr.y2]="n.y" stroke="#ffab91" stroke-opacity=".7" stroke-width="1.6" stroke-dasharray="6 6" class="ln"/>}
<circle class="ring" cx="220" cy="200" r="70" fill="none" stroke="#ff7043" stroke-opacity=".5"/><circle cx="220" cy="200" r="52" fill="url(#g)"/>
<text x="220" y="197" text-anchor="middle" fill="#fff" font-family="Sora" font-weight="700" font-size="15">Inbox</text><text x="220" y="216" text-anchor="middle" fill="#fff" font-family="Sora" font-weight="700" font-size="15">Media</text>
@for(n of nodes();track n.l;let i=$index){<g class="chip" (pointerdown)="down(i,$event)" [attr.transform]="'translate('+(n.x-45)+' '+(n.y-20)+')'"><rect width="90" height="40" rx="20"/><text x="45" y="25" text-anchor="middle">{{n.l}}</text></g>}</svg>
<p class="hint">Drag the channels around the hub</p><button type="button" class="reset" (click)="nodes.set(start)">Reset</button></div></div>
<div class="mq" aria-hidden="true"><div class="mt">@for(t of tick;track $index){<span>{{t}}</span>}</div></div></section>

<section class="s"><div class="wrap"><p class="eyebrow">Start here</p><h2>What are you trying to solve?</h2>
<div class="paths">@for(p of solve;track p.t){<a class="path" [routerLink]="p.u"><h3>{{p.t}}</h3><p>{{p.d}}</p><span>{{p.c}}</span></a>}</div></div></section>

<section class="s tint"><div class="wrap"><p class="eyebrow">What Inbox Media enables</p><h2>Three things, done reliably</h2>
<div class="three">@for(t of themes;track t.t;let i=$index){<div><b>{{i+1}}</b><h3>{{t.t}}</h3><p>{{t.d}}</p></div>}</div></div></section>

<section id="ai" class="s dark"><div class="wrap"><p class="eyebrow" style="color:#ffab91">Featured solutions</p><h2>Compare our AI solutions without opening six pages</h2>
<div class="tabs" role="tablist">@for(a of ai;track a.name;let i=$index){<button role="tab" type="button" [attr.aria-selected]="sel()===i" [class.on]="sel()===i" (click)="sel.set(i)">{{a.name}}</button>}</div>
<div class="panel2"><img [src]="img+ai_i[sel()]+'.jpg'" alt="" loading="lazy"><div><h3>{{ai[sel()].name}}</h3><p>{{ai[sel()].text}}</p><a class="btn" routerLink="/ai-solutions">See workflow and details</a></div></div></div></section>

<section class="s"><div class="wrap"><p class="eyebrow">How everything connects</p><h2>From business data to customer conversations</h2>
<div class="conn" role="img" aria-label="Business systems feed communication channels, which feed AI agents, which feed analytics">
<div><h3>Business systems</h3><p>Customer data, CRM and internal systems, APIs</p></div><i aria-hidden="true"></i>
<div><h3>Channels</h3><p>SMS, WhatsApp, voice, email, RCS, push</p></div><i aria-hidden="true"></i>
<div><h3>AI agents</h3><p>Aura AI, Tellco, Custom SLM</p></div><i aria-hidden="true"></i>
<div><h3>Analytics</h3><p>Real-time reporting on every journey</p></div></div>
<p style="margin-top:1.5rem"><a routerLink="/integrations">Integrations and technology</a></p></div></section>

<section class="s tint"><div class="wrap"><p class="eyebrow">Industries</p><h2>Sector-specific configurations</h2>
<div class="chips">@for(i of inds;track i.name){<a routerLink="/industries">{{i.name}}</a>}</div></div></section>

<section class="s"><div class="wrap"><p class="eyebrow">Evidence and trust</p><h2>Proof, published only when verified</h2>
<div class="trust"><div><h3>Certifications</h3><p>Certificate numbers, certification body, scope and validity are published after verification.</p><a routerLink="/about/certifications">View certification details</a></div>
<div><h3>Case studies</h3><p>Real workflows and measurable results will appear here once approved.</p><a routerLink="/resources">Planned resources</a></div>
<div><h3>Client logos and demos</h3><p>Only approved logos and live product demonstrations will be shown.</p><a routerLink="/contact" [queryParams]="{type:'demo'}">Ask for a live demo</a></div></div></div></section>

<section class="s dark page-hero"><div class="wrap"><h2>Discuss a business requirement</h2><p class="lead">Book a demonstration or request a proposal. One short enquiry, only the questions that matter.</p>
<a class="btn" routerLink="/contact" [queryParams]="{type:'demo'}">Book a Demo</a> <a class="btn ghost" routerLink="/contact" [queryParams]="{type:'proposal'}">Request a Proposal</a></div></section>`,
styles:[`.hero{color:#fff;background:radial-gradient(circle at var(--mx,78%) var(--my,25%),rgba(103,58,183,.55),transparent 38%),linear-gradient(160deg,#120a24,#1b1033 60%,#2a1a52);overflow:hidden}
.hero-in{display:grid;grid-template-columns:1.05fr .95fr;gap:clamp(1.5rem,4vw,3rem);align-items:center;padding-block:clamp(2.5rem,7vw,5.5rem)}.hero h1{color:#fff}.hero .lead{color:#d9cff0}
.pill{display:inline-flex;align-items:center;gap:.6rem;border:1px solid rgba(255,255,255,.2);border-radius:99px;padding:.35rem 1rem;font-size:.85rem;color:#ede7f6!important;background:rgba(255,255,255,.06)}
.dots{display:flex;gap:4px}.dots i{width:7px;height:7px;border-radius:50%;background:#ff7043}.dots i:nth-child(2){opacity:.6}.dots i:nth-child(3){opacity:.3}
.grad{background:linear-gradient(90deg,#ff7043,#b39ddb);-webkit-background-clip:text;background-clip:text;color:transparent}
.cta2{display:flex;gap:.8rem;flex-wrap:wrap;margin:1.5rem 0}.proof{list-style:none;display:flex;gap:1.5rem;flex-wrap:wrap;padding:0;margin:0;color:#c9b8f0;font-weight:500}.proof li::before{content:"\\2713  ";color:#ff7043}
.stage{position:relative;border:1px solid rgba(255,255,255,.14);border-radius:24px;background:rgba(255,255,255,.04);padding:.6rem;min-width:0}
svg{touch-action:none;user-select:none;width:100%;height:auto}.ln{animation:dash 2.5s linear infinite}.ring{transform-origin:220px 200px;animation:pulse 3s ease-in-out infinite}
.chip{cursor:grab}.chip rect{fill:#2a1a52;stroke:#ff7043;transition:fill .2s}.chip:hover rect{fill:#673ab7}.chip text{fill:#fff;font:500 13px Inter;pointer-events:none}
.hint{position:absolute;left:1rem;bottom:.6rem;margin:0;font-size:.8rem;color:#c9b8f0}.reset{position:absolute;right:.8rem;bottom:.6rem;background:rgba(255,255,255,.12);color:#fff;border:0;border-radius:99px;padding:.3rem .8rem;cursor:pointer;font:inherit;font-size:.8rem}
.mq{overflow:hidden;border-top:1px solid rgba(255,255,255,.1);padding:.9rem 0;background:rgba(0,0,0,.2)}.mt{display:flex;gap:2.5rem;width:max-content;animation:mq 30s linear infinite}.mt span{color:#c9b8f0;font-weight:500;white-space:nowrap}.mt span::before{content:"";display:inline-block;width:6px;height:6px;border-radius:50%;background:#ff7043;margin-right:.8rem}
@keyframes dash{to{stroke-dashoffset:-24}}@keyframes pulse{50%{transform:scale(1.15);opacity:.3}}@keyframes mq{to{transform:translateX(-50%)}}
.sh{display:flex;justify-content:space-between;align-items:flex-end;gap:1rem;flex-wrap:wrap;margin-bottom:1.5rem}.arrows{display:flex;gap:.5rem}.arrows button{width:46px;height:46px;border-radius:50%;border:1.5px solid var(--blue);background:#fff;color:var(--blue);font-size:1.5rem;cursor:pointer}
.rail{display:flex;gap:1.1rem;overflow-x:auto;scroll-snap-type:x mandatory;padding:.4rem .2rem 1.2rem;scrollbar-width:thin}.pc{flex:0 0 min(300px,82%);scroll-snap-align:start;padding:0;overflow:hidden}.grid .pc{flex:initial}
.pc img{width:100%;height:170px;object-fit:cover}.pc h3,.pc p{padding:0 1.2rem}.pc h3{margin-top:1rem}.pc p{padding-bottom:1.3rem!important}
.tabs{display:flex;gap:.5rem;flex-wrap:wrap;margin:1.2rem 0}.tabs button{min-height:44px;border:1.5px solid var(--line);background:#fff;border-radius:99px;padding:.5rem 1.1rem;font:500 .95rem Inter;cursor:pointer;transition:.2s}.tabs button.on{background:var(--navy);color:#fff;border-color:var(--navy)}
.panel2{display:grid;grid-template-columns:1fr 1.1fr;gap:clamp(1rem,3vw,2.5rem);align-items:center;background:linear-gradient(135deg,var(--navy),var(--navy2));border-radius:22px;overflow:hidden;color:#fff}.panel2 img{width:100%;height:100%;min-height:260px;object-fit:cover}.panel2 div{padding:clamp(1.2rem,3vw,2.2rem)}.panel2 h3{color:#fff;font-size:1.6rem}.panel2 p{color:#d9cff0;font-size:1.1rem}
a.more{display:inline-block;margin:0 1.2rem 1.2rem;font-weight:600}.chips{display:flex;flex-wrap:wrap;gap:.7rem;margin-top:1.2rem}.chips a{border:1.5px solid var(--blue);border-radius:99px;padding:.55rem 1.2rem;text-decoration:none;font-weight:600;color:var(--blue);background:#fff;transition:.2s}.chips a:hover{background:var(--blue);color:#fff}
.tl{list-style:none;margin:2rem 0 0;padding:0 0 0 1.6rem;border-left:3px solid var(--blue);display:grid;gap:1.6rem}.tl li{position:relative}.tl li::before{content:'';position:absolute;left:calc(-1.6rem - 9px);top:.3rem;width:15px;height:15px;border-radius:50%;background:var(--blue);border:3px solid #fff;box-shadow:0 0 0 2px var(--blue)}.tl h3{margin-bottom:.2rem}.tl p{margin:0}
.g4{grid-template-columns:repeat(auto-fit,minmax(min(220px,100%),1fr))}.g2{grid-template-columns:repeat(auto-fit,minmax(min(340px,100%),1fr))}

.paths{display:grid;gap:0;grid-template-columns:repeat(auto-fit,minmax(min(240px,100%),1fr));border-top:1px solid var(--line)}.path{display:block;padding:1.6rem 1.4rem 1.6rem 0;text-decoration:none;color:inherit;border-bottom:1px solid var(--line)}.path span{color:var(--blue);font-weight:600}.path:hover span{text-decoration:underline}.path p{margin-bottom:.8rem}
.three{display:grid;gap:2rem;grid-template-columns:repeat(auto-fit,minmax(min(260px,100%),1fr));margin-top:1.5rem}.three b{font:700 2.4rem Sora;color:var(--blue)}.three p{margin:0}
.conn{display:grid;grid-template-columns:1fr auto 1fr auto 1fr auto 1fr;gap:.8rem;align-items:stretch;margin-top:1.5rem}.conn div{border:1.5px solid var(--line);border-radius:12px;padding:1.2rem;background:#fff}.conn p{margin:0;font-size:.95rem}.conn i{align-self:center;width:28px;height:2px;background:var(--blue);position:relative}.conn i::after{content:'';position:absolute;right:0;top:-4px;border:5px solid transparent;border-left:8px solid var(--blue);border-right:0}
.trust{display:grid;gap:2rem;grid-template-columns:repeat(auto-fit,minmax(min(260px,100%),1fr));margin-top:1.5rem}.trust div{border-top:2px solid var(--blue);padding-top:1rem}.btn.ghost.dk{color:var(--blue)}
@media(max-width:900px){.conn{grid-template-columns:1fr}.conn i{width:2px;height:22px;justify-self:center}.conn i::after{right:-4px;top:auto;bottom:-1px;border:5px solid transparent;border-top:8px solid var(--blue);border-bottom:0}}
@media(max-width:900px){.hero-in{grid-template-columns:1fr}.panel2{grid-template-columns:1fr}.panel2 img{min-height:200px;max-height:240px}}
@media(max-width:560px){.proof{gap:.8rem}.sh{align-items:flex-start}}`]})
export class HomeComponent{
 img=I;caps=CAPABILITIES;ai=AI_SOLUTIONS;inds=INDUSTRIES;solve=SOLVE;themes=THEMES;yrs=new Date().getFullYear()-FOUNDED;start=START;tick=[...TICK,...TICK];ci=CAPIMG;ai_i=AIIMG;sectors=SECTORS;
 nodes=signal(START);sel=signal(0);mx=signal(78);my=signal(25);drag=-1;
 @ViewChild('svg') svg!:ElementRef<SVGSVGElement>;
 go(id:string){document.getElementById(id)?.scrollIntoView({behavior:'smooth'})}
 glow(e:PointerEvent){const r=(e.currentTarget as HTMLElement).getBoundingClientRect();this.mx.set((e.clientX-r.left)/r.width*100);this.my.set((e.clientY-r.top)/r.height*100)}
 down(i:number,e:PointerEvent){this.drag=i;e.preventDefault()}
 move(e:PointerEvent){if(this.drag<0)return;const s=this.svg.nativeElement,p=s.createSVGPoint();p.x=e.clientX;p.y=e.clientY;const q=p.matrixTransform(s.getScreenCTM()!.inverse());
  const x=Math.min(395,Math.max(45,q.x)),y=Math.min(378,Math.max(22,q.y));this.nodes.update(a=>a.map((n,k)=>k===this.drag?{...n,x,y}:n))}
 slide(el:HTMLElement,d:number){el.scrollBy({left:d*300,behavior:'smooth'})}}
