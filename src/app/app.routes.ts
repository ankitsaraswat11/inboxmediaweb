import { Routes } from '@angular/router';
const L=()=>import('./pages/list.component').then(m=>m.ListComponent);
const T=(t:string)=>t+' | Inbox Media';
export const routes: Routes = [
 {path:'',title:'Inbox Media | Enterprise Communication, AI Automation & Digital Engineering',loadComponent:()=>import('./pages/home.component').then(m=>m.HomeComponent),data:{description:'Enterprise messaging, voice, AI automation and digital engineering from Inbox Media. Find the right solution for your business problem.'}},
 {path:'capabilities',title:T('Capabilities'),loadComponent:L,data:{kind:'cap',description:'Five capability domains: communication infrastructure, voice and telephony, conversational AI, omnichannel engagement and digital engineering.'}},
 {path:'ai-solutions',title:T('AI Solutions'),loadComponent:()=>import('./pages/ai.component').then(m=>m.AiComponent),data:{description:'Aura AI, Tellco, Custom SLM, TrainExl, Edge AI and ISO 42001 readiness: use cases, workflows and deployment details.'}},
 {path:'industries',title:T('Industries'),loadComponent:L,data:{kind:'ind',description:'Communication and AI capabilities for BFSI, healthcare, education, ecommerce, real estate, logistics, government and telecom.'}},
 {path:'integrations',title:T('Integrations & Technology'),loadComponent:L,data:{kind:'int',description:'How Inbox Media connects business systems, communication channels, AI agents and analytics.'}},
 {path:'resources',title:T('Resources'),loadComponent:L,data:{kind:'res',description:'Buyer guides, implementation checklists and use cases from Inbox Media.'}},
 {path:'about',title:T('About'),loadComponent:L,data:{kind:'eco',description:'Inbox Media: enterprise communication infrastructure and AI automation company, serving enterprises since 2009.'}},
 {path:'about/certifications',title:T('Certifications'),loadComponent:()=>import('./pages/cert.component').then(m=>m.CertComponent),data:{description:'Certification details, scope and validity for Inbox Media, published once verified.'}},
 {path:'about/why-inbox-media',title:T('Why Inbox Media'),loadComponent:L,data:{kind:'why',description:'From telecom infrastructure in 2009 to AI-powered engagement today.'}},
 {path:'roadmap',title:T('Website Roadmap'),loadComponent:L,data:{kind:'road',description:'Website project roadmap.'}},
 {path:'contact',title:T('Book a Demo'),loadComponent:()=>import('./pages/contact.component').then(m=>m.ContactComponent),data:{description:'Book a demo, request a proposal or send a message to Inbox Media.'}},
 {path:'**',redirectTo:''}];
