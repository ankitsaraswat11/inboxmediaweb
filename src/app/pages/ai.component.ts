import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FlowComponent } from '../flow.component';
import { PRODUCTS } from '../data';
@Component({standalone:true,imports:[RouterLink,FlowComponent],template:`
<section class="s dark page-hero"><div class="wrap"><h1>AI Solutions</h1><p class="lead">Six solutions, each for a distinct job. Pick one to see how it works, where it runs and what the implementation includes.</p></div></section>
<section class="s"><div class="wrap">
<div class="tabs" role="tablist">@for(x of prods;track x.name;let i=$index){<button role="tab" type="button" [attr.aria-selected]="sel()===i" [class.on]="sel()===i" (click)="sel.set(i)">{{x.name}}</button>}</div>
<h2>{{p.name}}</h2><p class="lead">{{p.text}}</p>
@if(p.note){<p class="note">{{p.note}}</p>}
<h3 class="sp">Workflow</h3><app-flow [steps]="p.flow" [label]="p.name+' workflow'"/>
<dl class="facts"><div><dt>Integrations</dt><dd [class.tbc]="p.integ.startsWith('To be')">{{p.integ}}</dd></div>
<div><dt>Deployment</dt><dd [class.tbc]="p.deploy.startsWith('To be')">{{p.deploy}}</dd></div>
<div><dt>Included in the implementation service</dt><dd>Integration with your environment, configuration and ongoing support.</dd></div>
<div><dt>Evidence</dt><dd class="tbc">No case study published yet. Results are added only once verified.</dd></div></dl>
<a class="btn" routerLink="/contact" [queryParams]="{type:'demo'}">Request a demo of {{p.name}}</a> <a class="btn ghost dk" routerLink="/contact" [queryParams]="{type:'proposal'}">Request a proposal</a></div></section>`,
styles:[`.tabs{display:flex;gap:.5rem;flex-wrap:wrap;margin-bottom:2rem}.tabs button{min-height:44px;border:1.5px solid var(--line);background:#fff;border-radius:99px;padding:.5rem 1.1rem;font:500 .95rem Inter;cursor:pointer}.tabs button.on{background:var(--navy);color:#fff;border-color:var(--navy)}
.sp{margin-top:2rem}.facts{display:grid;gap:1.2rem;grid-template-columns:repeat(auto-fit,minmax(min(260px,100%),1fr));margin:2rem 0}.facts div{border-top:2px solid var(--line);padding-top:.8rem}dt{font-weight:700;margin-bottom:.3rem}dd{margin:0;color:var(--mute)}dd.tbc{font-style:italic}.dk{color:var(--blue)}`]})
export class AiComponent{prods=PRODUCTS;sel=signal(0);get p(){return this.prods[this.sel()]}}
