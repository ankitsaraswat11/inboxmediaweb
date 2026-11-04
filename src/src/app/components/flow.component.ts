import { Component, Input } from '@angular/core';
export interface Step { t: string; d: string; }
@Component({selector:'app-flow',standalone:true,template:`
<ol class="flow" [attr.aria-label]="label">@for(s of steps;track s.t;let i=$index){<li><span class="n">{{i+1}}</span><h3>{{s.t}}</h3><p>{{s.d}}</p></li>}</ol>`,
styles:[`.flow{list-style:none;margin:0;padding:0;display:grid;gap:1rem;grid-template-columns:repeat(auto-fit,minmax(190px,1fr))}
li{position:relative;background:var(--surface);color:var(--fg);border:1px solid var(--border);border-radius:var(--r);padding:1rem 1rem 1.1rem}
.n{display:inline-grid;place-items:center;width:1.9rem;height:1.9rem;border-radius:50%;background:var(--btn);color:var(--btn-fg);font:600 .9rem var(--font-display);margin-bottom:.5rem}
li p{margin:0;font-size:.95rem;color:var(--fg-2)}h3{margin-bottom:.3em}
li:not(:last-child)::after{content:'';position:absolute;right:-.95rem;top:50%;width:.9rem;height:2px;background:var(--primary)}
@media(max-width:700px){li:not(:last-child)::after{right:50%;top:auto;bottom:-1rem;width:2px;height:.95rem}}`]})
export class FlowComponent{@Input() steps:Step[]=[];@Input() label='Process flow';}
