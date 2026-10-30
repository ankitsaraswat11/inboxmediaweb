import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FlowComponent, Step } from '../flow.component';
import { CAPABILITIES, AI_SOLUTIONS, INDUSTRIES, TIMELINE, INTEGRATIONS, RESOURCES, Item, FLOW_CAP, FLOW_AI, FLOW_ABOUT, ROADMAP } from '../data';
interface P{h:string;intro:string;items:Item[];flow:Step[];flowH:string;note?:string}
const ABOUT:Item[]=[{name:'Enterprise communication',text:'Messaging, voice and omnichannel journeys that reach customers reliably.'},{name:'AI automation',text:'Voice agents, chatbots and domain-specific models that take over routine work.'},{name:'Digital engineering',text:'Custom software, APIs, cloud and modernisation of legacy systems.'}];
const PAGES:Record<string,P>={
 cap:{h:'Capabilities',intro:'Five broad service areas that cover how businesses talk to customers and build digital products.',items:CAPABILITIES,flow:FLOW_CAP,flowH:'How a customer need becomes an outcome'},
 ai:{h:'AI Solutions',intro:'Six named solutions, each built for a distinct job.',items:AI_SOLUTIONS,flow:FLOW_AI,flowH:'How to choose and roll out an AI solution'},
 eco:{h:'About Inbox Media',intro:'Enterprise communication infrastructure and AI automation company. Serving enterprises across 8+ industries since 2009.',items:ABOUT,flow:FLOW_ABOUT,flowH:'How the company fits together',note:'Company history, certification details and timeline claims will be added once verified internally.'},
 ind:{h:'Industries',intro:'Our communication and AI capabilities are deployed across eight major industries, each with sector-specific configurations and use cases.',items:INDUSTRIES,flow:[],flowH:''},
 int:{h:'Integrations & Technology',intro:'How business systems, channels, AI agents and analytics connect.',items:INTEGRATIONS,flow:FLOW_CAP,flowH:'How everything connects'},
 res:{h:'Resources',intro:'Guides written around real buyer questions. Each is published only when its content is verified.',items:RESOURCES,flow:[],flowH:'',note:'Planned topics. Case studies and results will be added only when verified.'},
 why:{h:'Why Inbox Media',intro:'Since 2009: infrastructure first, now with AI.',items:TIMELINE,flow:[],flowH:''},
 road:{h:'Website Roadmap',intro:'Five phases from strategy to continuous improvement. Timelines are confirmed with owners after scope and dependencies are reviewed.',items:[],flow:ROADMAP,flowH:'Project phases'}};
@Component({standalone:true,imports:[FlowComponent,RouterLink],template:`
<section class="s dark page-hero"><div class="wrap"><h1>{{p.h}}</h1><p>{{p.intro}}</p></div></section>
@if(!isRoad){<section class="s"><div class="wrap"><div class="grid">@for(i of p.items;track i.name){<div class="item"><h3>{{i.name}}</h3><p>{{i.text}}</p></div>}</div>
@if(p.note){<p class="note" style="margin-top:2rem">{{p.note}}</p>}</div></section>}
@if(p.flow.length){<section class="s tint"><div class="wrap"><h2>{{p.flowH}}</h2><app-flow [steps]="p.flow" [label]="p.flowH"/>
<p style="margin-top:2rem"><a class="btn" routerLink="/contact">Book a Demo</a></p></div></section>}
@if(!p.flow.length){<section class="s tint"><div class="wrap"><a class="btn" routerLink="/contact">Book a Demo</a></div></section>}`})
export class ListComponent{p=PAGES[inject(ActivatedRoute).snapshot.data['kind']];isRoad=inject(ActivatedRoute).snapshot.data['kind']==='road'}
