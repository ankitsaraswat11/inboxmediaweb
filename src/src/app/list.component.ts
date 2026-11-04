import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FlowComponent, Step } from '../flow.component';
import { CAPABILITIES, AI_SOLUTIONS, INDUSTRIES, TIMELINE, INTEGRATIONS, RESOURCES, Item, FLOW_CAP, FLOW_AI, FLOW_ABOUT, ROADMAP } from '../data';
interface P{h:string;intro:string;items:Item[];flow:Step[];flowH:string;note?:string;uh?:string}
const ABOUT:Item[]=[{name:'Enterprise communication',text:'Messaging, voice and omnichannel journeys that reach customers reliably.'},{name:'AI automation',text:'Voice agents, chatbots and domain-specific models that take over routine work.'},{name:'Digital engineering',text:'Custom software, APIs, cloud and modernisation of legacy systems.'}];
const PAGES:Record<string,P>={
 cap:{h:'Capabilities',intro:'Five service areas. For each: what it is, why it matters, how it works and which industries it serves.',uh:'Serves',note:'These describe what each capability does. Case studies and measured results are published only once verified and approved.',items:CAPABILITIES,flow:FLOW_CAP,flowH:'How a customer need becomes an outcome'},
 ai:{h:'AI Solutions',intro:'Six named solutions, each built for a distinct job.',items:AI_SOLUTIONS,flow:FLOW_AI,flowH:'How to choose and roll out an AI solution'},
 eco:{h:'About Inbox Media',intro:'Enterprise communication infrastructure and AI automation company. Serving enterprises across 8+ industries since 2009.',items:ABOUT,flow:FLOW_ABOUT,flowH:'How the company fits together',note:'Company history, certification details and timeline claims will be added once verified internally.'},
 ind:{h:'Industries',intro:'How Inbox Media helps eight industries: what we do for each, why it matters, how it works and where it helps.',uh:'Capabilities used',note:'These describe how our capabilities apply to each sector. Case studies and measured results are published only once verified and approved.',items:INDUSTRIES,flow:[],flowH:''},
 int:{h:'Integrations & Technology',intro:'How business systems, channels, AI agents and analytics connect.',items:INTEGRATIONS,flow:FLOW_CAP,flowH:'How everything connects'},
 res:{h:'Resources',intro:'Guides written around real buyer questions. Each is published only when its content is verified.',items:RESOURCES,flow:[],flowH:'',note:'Planned topics. Case studies and results will be added only when verified.'},
 why:{h:'Why Inbox Media',intro:'Since 2009: infrastructure first, now with AI.',items:TIMELINE,flow:[],flowH:''},
 road:{h:'Website Roadmap',intro:'Five phases from strategy to continuous improvement. Timelines are confirmed with owners after scope and dependencies are reviewed.',items:[],flow:ROADMAP,flowH:'Project phases'}};
@Component({standalone:true,imports:[FlowComponent,RouterLink],template:`
<section class="s dark page-hero"><div class="wrap"><h1>{{p.h}}</h1><p>{{p.intro}}</p></div></section>
@if(!isRoad){<section class="s"><div class="wrap"><div class="grid" [class.ind-grid]="p.items.length>0 && !!p.items[0].what">@for(i of p.items;track i.name){<div class="item"><h3>{{i.name}}</h3><p>{{i.text}}</p>
@if(i.what){<div class="blk"><b>What we do</b><p>{{i.what}}</p></div><div class="blk"><b>Why it matters</b><p>{{i.why}}</p></div><div class="blk"><b>How we solve it</b><p>{{i.how}}</p></div>
<div class="uses"><span class="lbl">{{p.uh}}</span>@for(u of i.uses;track u){<span>{{u}}</span>}</div><div class="ben"><b>How it helps</b><p>{{i.benefit}}</p></div>
<a class="ilink" routerLink="/contact" [queryParams]="{type:'demo'}">Book a demo for {{i.name}}</a>}</div>}</div>
@if(p.note){<p class="note" style="margin-top:2rem">{{p.note}}</p>}</div></section>}
@if(p.flow.length){<section class="s tint"><div class="wrap"><h2>{{p.flowH}}</h2><app-flow [steps]="p.flow" [label]="p.flowH"/>
<p style="margin-top:2rem"><a class="btn" routerLink="/contact">Book a Demo</a></p></div></section>}
@if(!p.flow.length){<section class="s tint"><div class="wrap"><a class="btn" routerLink="/contact">Book a Demo</a></div></section>}`,
styles:[`.ind-grid{grid-template-columns:repeat(auto-fit,minmax(min(480px,100%),1fr))!important;gap:1.4rem}
.blk{margin-top:1.1rem}.blk b,.ben b{display:block;font-size:.72rem;letter-spacing:.1em;text-transform:uppercase;color:var(--blue);margin-bottom:.25rem}.blk p,.ben p{margin:0;max-width:none}
.uses{display:flex;flex-wrap:wrap;gap:.45rem;margin-top:1.1rem}.uses .lbl{border:0;background:none;padding:.25rem .2rem .25rem 0;color:var(--mute);text-transform:uppercase;letter-spacing:.08em;font-size:.72rem}.uses span{font-size:.8rem;font-weight:600;color:var(--blue);border:1px solid var(--line);background:#fff;border-radius:99px;padding:.25rem .75rem}
.ben{margin-top:1.1rem;padding:.85rem 1rem;border-radius:12px;background:var(--soft);border-left:3px solid var(--accent)}.ben p{color:var(--ink)}
.ilink{display:inline-block;margin-top:1.1rem;font-weight:600}`]})
export class ListComponent{p=PAGES[inject(ActivatedRoute).snapshot.data['kind']];isRoad=inject(ActivatedRoute).snapshot.data['kind']==='road'}