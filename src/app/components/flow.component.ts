import { Component, Input } from '@angular/core';
export interface Step { t: string; d: string; }

/** A sequence of steps drawn as one connected line: numbered knots joined by a thread. */
@Component({selector:'app-flow',standalone:true,template:`
<ol class="flow" [attr.aria-label]="label" [style.--n]="steps.length">@for(s of steps;track s.t;let i=$index){<li><span class="n">{{i+1}}</span><h3>{{s.t}}</h3><p>{{s.d}}</p></li>}</ol>`,
styles:[`
:host{display:block}
.flow{list-style:none;margin:0;padding:0;display:grid;gap:1.4rem 0;grid-template-columns:repeat(auto-fit,minmax(min(200px,100%),1fr))}
li{position:relative;padding:0 1.6rem 0 0}
li:not(:last-child)::before{content:'';position:absolute;left:44px;right:0;top:17px;height:2px;border-radius:2px;background:linear-gradient(90deg,var(--primary),color-mix(in srgb,var(--primary) 25%,transparent))}
.n{position:relative;display:grid;place-items:center;width:36px;height:36px;border-radius:50%;background:var(--bg);border:2px solid var(--primary);color:var(--primary);font:600 .92rem var(--font-display);font-variant-numeric:tabular-nums}
h3{margin:1rem 0 .35rem;font-size:1.06rem}
p{margin:0;font-size:.95rem;color:var(--fg-2);max-width:32ch}
@media(max-width:700px){
  .flow{grid-template-columns:1fr;gap:0}
  li{padding:0 0 1.5rem 3.4rem}
  li:not(:last-child)::before{left:17px;right:auto;top:44px;bottom:6px;width:2px;height:auto;background:linear-gradient(180deg,var(--primary),color-mix(in srgb,var(--primary) 25%,transparent))}
  .n{position:absolute;left:0;top:0}
  h3{margin-top:.35rem}
}`]})
export class FlowComponent{@Input() steps:Step[]=[];@Input() label='Process flow';}
