export interface Item { name: string; text: string; tags?: string; }
export const CAPABILITIES: Item[] = [
 {name:'Communication Infrastructure',text:'Enterprise SMS, OTP, RCS, DLT-compliant bulk messaging and real-time notification engines. Reliable infrastructure for enterprises that send at scale.'},
 {name:'Voice & Telephony',text:'IVR systems, cloud telephony, toll-free and virtual numbers, OBD calling, contact center solutions and voice broadcasting.'},
 {name:'Conversational AI & Automation',text:'AI voice agents, WhatsApp Business automation, conversational bots, lead qualification, multilingual engagement and sentiment analysis.'},
 {name:'Omnichannel Engagement Platform',text:'Unified orchestration across SMS, WhatsApp, voice, email, RCS and push, with a single dashboard, workflow automation and real-time analytics.'},
 {name:'Digital Engineering & IT Services',text:'Custom software development, web and mobile apps, cloud and DevOps, IT modernization, CMS platforms and on-demand engineering teams.'}];
export const AI_SOLUTIONS: Item[] = [
 {name:'Aura AI',text:'AI voice, avatar and visual interaction for customer support, virtual front desks, advisory and enterprise training.'},
 {name:'Tellco',text:'AI-powered outreach and campaign automation: predictive dialing, appointment booking, lead qualification and follow-ups at scale.'},
 {name:'Custom SLM',text:'Domain-specific small language models built for enterprise workflows: banking, healthcare, legal, telecom and more.'},
 {name:'TrainExl',text:'AI-native enterprise learning orchestration that turns SOPs, manuals and compliance documents into intelligent microlearning systems.'},
 {name:'Edge AI',text:'Offline, on-premise AI deployment for regulated industries, healthcare facilities and remote enterprise environments.'},
 {name:'ISO 42001 AI Readiness',text:'AI governance assessment, risk management framework and ISO 42001 certification preparation for enterprise AI compliance.'}];
const S='Sector-specific configurations and use cases.';
export const INDUSTRIES: Item[] = ['BFSI','Healthcare','Education','Ecommerce & Retail','Real Estate','Logistics & Delivery','Government','Telecom'].map(name=>({name,text:S}));
export const TIMELINE: Item[] = [
 {name:'2009: The Foundation',text:'We began with a mission to build reliable, scalable telecom infrastructure for enterprises across India, focused on connectivity, messaging and mission-critical communication systems.'},
 {name:'2012 to 2016: Building Scale',text:'We expanded our infrastructure footprint, strengthened platform capabilities and built the operational excellence needed for high-volume enterprise communication.'},
 {name:'2017 to 2020: Platform Evolution',text:'We turned our core infrastructure into a unified engagement platform, integrating voice, messaging, automation and analytics into one omnichannel ecosystem.'},
 {name:'2021 to Present: AI-Powered Future',text:'We combine years of infrastructure expertise with modern AI to deliver intelligent, automated and personalised customer experiences at enterprise scale.'}];
export const CERTS: Item[] = [
 {name:'ISO 9001:2015: Quality Management',text:'Documented and audited delivery processes, continuous improvement controls and customer satisfaction as a measurable standard.'},
 {name:'ISO 27001:2013: Information Security',text:'Enterprise data security and access controls, an information risk management framework, and readiness for BFSI, healthcare and government requirements.'}];
import { Step } from './flow.component';
export const FLOW_JOURNEY: Step[]=[{t:'Discover',d:'Visitor lands and sees what Inbox Media does.'},{t:'Understand',d:'Capabilities and AI solutions explained by outcome.'},{t:'Trust',d:'Proof: case studies, results, verified claims.'},{t:'Enquire',d:'One clear form to book a demo.'}];
export const FLOW_CAP: Step[]=[{t:'Customer need',d:'Alert, call, support or booking.'},{t:'Channel',d:'SMS, voice, WhatsApp, email or push.'},{t:'Automation',d:'Bots and agents handle the routine work.'},{t:'Integration',d:'APIs connect CRM and internal systems.'},{t:'Outcome',d:'Faster response, one coordinated journey.'}];
export const FLOW_AI: Step[]=[{t:'Pick a use case',d:'Reception, outbound calls, training or governance.'},{t:'Match a solution',d:'Aura AI, Tellco, SLM, TrainExl, Edge AI or ISO 42001.'},{t:'Verify claims',d:'Confirm scope and data needs internally.'},{t:'Deploy',d:'Cloud or on-site, based on latency and data rules.'}];
export const FLOW_ABOUT: Step[]=[{t:'Company',d:'Communication, AI and engineering partner.'},{t:'Capabilities',d:'Five broad service areas.'},{t:'AI solutions',d:'Six named solutions.'},{t:'Enquiry',d:'Talk to the team.'}];
export const ROADMAP: Step[]=[{t:'Strategy & Content',d:'Positioning, sitemap, approved copy, logos.'},{t:'UI & Development',d:'Components, routing, responsive layouts.'},{t:'Integration',d:'Forms, backend/API, CRM/email, analytics.'},{t:'QA & Launch',d:'Route, form, mobile, accessibility, SEO, performance tests.'},{t:'Optimization',d:'Analytics review, content and conversion improvements.'}];
export const FLOW_CONTACT: Step[]=[{t:'Fill the form',d:'Name, email, interest.'},{t:'Validate',d:'Checked in browser, then on the server.'},{t:'Backend / CRM',d:'Enquiry is stored and routed.'},{t:'Confirmation',d:'Visitor sees success or a clear error.'}];

export const FOUNDED = 2009;
export const SOLVE = [
 {t:'Customer communication',d:'Reach customers reliably with SMS, OTP, WhatsApp, RCS and email.',c:'See communication infrastructure',u:'/capabilities'},
 {t:'Voice automation',d:'Route and automate calls with IVR, cloud telephony and outbound calling.',c:'See voice and telephony',u:'/capabilities'},
 {t:'AI implementation',d:'Add voice agents, domain models or on-site AI to your operations.',c:'Explore AI solutions',u:'/ai-solutions'},
 {t:'Software engineering',d:'Build, connect or modernise apps, APIs and cloud systems.',c:'See digital engineering',u:'/capabilities'}];
export const THEMES = [
 {t:'Reliable communication',d:'Messages, OTPs and calls that reach customers on the channel they actually use.'},
 {t:'Intelligent automation',d:'AI agents and bots that handle routine conversations, bookings and follow-ups.'},
 {t:'Digital engineering',d:'Custom software, apps and cloud systems that connect everything together.'}];
export interface Product { name:string; text:string; flow:Step[]; deploy:string; integ:string; note?:string; }
const TBC='To be confirmed with the product team before publishing.';
const W=(a:string,b:string,c:string,e:string):Step[]=>[{t:a,d:''},{t:b,d:''},{t:c,d:''},{t:e,d:''}];
export const PRODUCTS: Product[] = [
 {name:'Aura AI',text:AI_SOLUTIONS[0].text,flow:W('Customer arrives','Agent understands the need','Answers, advises or routes','Handover and record'),deploy:TBC,integ:TBC},
 {name:'Tellco',text:AI_SOLUTIONS[1].text,flow:W('Campaign list','Predictive dialing','Qualify lead or book appointment','Follow-up'),deploy:TBC,integ:TBC},
 {name:'Custom SLM',text:AI_SOLUTIONS[2].text+' Example: an internal assistant that explains approved company procedures to employees.',flow:W('Domain documents','Model built for your workflow','Employees ask questions','Answers from approved procedures'),deploy:TBC,integ:TBC},
 {name:'TrainExl',text:AI_SOLUTIONS[3].text,flow:W('SOPs and manuals','Converted to microlearning','Learners complete modules','Review and update'),deploy:TBC,integ:TBC},
 {name:'Edge AI',text:AI_SOLUTIONS[4].text,flow:W('Site or device','AI runs locally','Instant result','Data stays on-premise'),deploy:'On-premise or on-device, including offline environments.',integ:TBC},
 {name:'ISO 42001 AI Readiness',text:AI_SOLUTIONS[5].text,flow:W('Assess AI governance','Identify risks','Define controls','Prepare for certification'),deploy:'Advisory and assessment service.',integ:'Not applicable.',note:'Readiness does not mean the company is certified. Certification is established separately.'}];
export const INTEGRATIONS: Item[] = [
 {name:'Communication channels',text:'SMS, WhatsApp, voice, email, RCS and push notifications, orchestrated from one place.'},
 {name:'Business systems and data',text:'Customer data, CRM and internal systems connected through APIs. Specific connectors are confirmed per project.'},
 {name:'AI agents',text:'Aura AI, Tellco, Custom SLM, TrainExl and Edge AI plug into the same journey.'},
 {name:'Engineering and cloud',text:'Custom software, cloud, DevOps and modernisation of legacy systems.'}];
export const RESOURCES: Item[] = [
 {name:'How to choose between SMS, WhatsApp and voice',text:'A buyer guide by use case.'},
 {name:'Planning an AI voice agent rollout',text:'Implementation checklist.'},
 {name:'When Edge AI makes sense',text:'Latency, privacy and on-premise requirements.'},
 {name:'Getting ready for ISO 42001',text:'What AI governance readiness involves.'},
 {name:'Industry use cases',text:'Banking, healthcare, education, telecom and more.'},
 {name:'Case studies',text:'Published only when results are verified and approved.'}];
