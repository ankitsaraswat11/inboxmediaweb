export interface Item { name: string; text: string; tags?: string; what?: string; why?: string; how?: string; uses?: string[]; benefit?: string; }
export const CAPABILITIES_RAW: Item[] = [
 {name:'Communication Infrastructure',text:'Enterprise SMS, OTP, RCS, DLT-compliant bulk messaging and real-time notification engines. Reliable infrastructure for enterprises that send at scale.'},
 {name:'Voice & Telephony',text:'IVR systems, cloud telephony, toll-free and virtual numbers, OBD calling, contact center solutions and voice broadcasting.'},
 {name:'Conversational AI & Automation',text:'AI voice agents, WhatsApp Business automation, conversational bots, lead qualification, multilingual engagement and sentiment analysis.'},
 {name:'Omnichannel Engagement Platform',text:'Unified orchestration across SMS, WhatsApp, voice, email, RCS and push, with a single dashboard, workflow automation and real-time analytics.'},
 {name:'Digital Engineering & IT Services',text:'Custom software development, web and mobile apps, cloud and DevOps, IT modernization, CMS platforms and on-demand engineering teams.'}];
const CAP_INFO:Record<string,Partial<Item>>={
 'Communication Infrastructure':{
  what:'Software and APIs that send your SMS, OTP, RCS and notification traffic reliably and in line with telecom rules.',
  why:'OTPs, alerts and reminders are business-critical. They must arrive instantly, follow telecom regulations and keep working at any volume.',
  how:'APIs connect the messaging platform to your apps and CRM. Events in your systems trigger messages automatically, and sending follows DLT rules for compliant bulk messaging.',
  uses:['BFSI','Healthcare','Ecommerce & Retail','Logistics & Delivery','Education'],
  benefit:'Important messages reach customers on time and in a compliant way, whether you send hundreds or millions.'},
 'Voice & Telephony':{
  what:'Phone services delivered through the cloud: IVR menus, toll-free and virtual numbers, outbound calling and contact-centre tools.',
  why:'Many customers still prefer to call. Calls need routing, self-service and outbound reach without a heavy in-house telecom setup.',
  how:'IVR menus handle routine requests, cloud telephony replaces on-premise exchanges, toll-free and virtual numbers support campaigns, and OBD and voice broadcasting send reminders and announcements to many people at once.',
  uses:['BFSI','Real Estate','Government','Telecom','Logistics & Delivery'],
  benefit:'Calls are answered and routed properly, and outbound reminders go out at scale without manual dialing.'},
 'Conversational AI & Automation':{
  what:'Bots and AI voice agents that hold conversations with customers on WhatsApp and phone, in several languages, and pick up how the customer feels.',
  why:'Customers expect quick replies in their own language. Teams cannot staff every conversation, and slow replies lose leads.',
  how:'Bots and voice agents answer routine questions, qualify leads and book appointments. Sentiment analysis flags unhappy customers so a person can step in, and conversations run in multiple languages.',
  uses:['Healthcare','Real Estate','Ecommerce & Retail','Education','BFSI'],
  benefit:'Routine conversations are handled automatically, so your team can focus on the cases that need a person.'},
 'Omnichannel Engagement Platform':{
  what:'A single control centre from which you send and track messages across SMS, WhatsApp, voice, email, RCS and push.',
  why:'Customers use many channels. Separate tools lead to inconsistent messages, duplicated effort and no single view of the customer journey.',
  how:'You define a journey once. The platform decides which channel to use, triggers each message through workflow automation, and shows what is working in one dashboard with real-time analytics.',
  uses:['Ecommerce & Retail','BFSI','Telecom','Education'],
  benefit:'One coordinated customer journey, and one place to see what is working.'},
 'Digital Engineering & IT Services':{
  what:'Engineering teams and services that build, run and modernise the apps and systems around your communication.',
  why:'Communication tools only deliver value when they connect to your own systems, and legacy software slows every change.',
  how:'We build apps and APIs that connect your CRM and internal systems, set up cloud and DevOps for reliable releases, modernise legacy systems step by step, and add engineers to your team on demand.',
  uses:['Logistics & Delivery','Telecom','Government','BFSI'],
  benefit:'Connected systems, modernised software and extra engineering capacity without a hiring drive.'}};
export const CAPABILITIES: Item[] = CAPABILITIES_RAW.map(c=>({...c,...CAP_INFO[c.name]}));
export const AI_SOLUTIONS: Item[] = [
 {name:'Aura AI',text:'AI voice, avatar and visual interaction for customer support, virtual front desks, advisory and enterprise training.'},
 {name:'Tellco',text:'AI-powered outreach and campaign automation: predictive dialing, appointment booking, lead qualification and follow-ups at scale.'},
 {name:'Custom SLM',text:'Domain-specific small language models built for enterprise workflows: banking, healthcare, legal, telecom and more.'},
 {name:'TrainExl',text:'AI-native enterprise learning orchestration that turns SOPs, manuals and compliance documents into intelligent microlearning systems.'},
 {name:'Edge AI',text:'Offline, on-premise AI deployment for regulated industries, healthcare facilities and remote enterprise environments.'}];
/* ISO 42001 AI Readiness moved to KAVACH (content/platforms.ts): it is a governance service, not an AI product. */
export const INDUSTRIES: Item[] = [
 {name:'BFSI',
  text:'Secure, high-volume customer communication for banks, insurers, NBFCs and fintechs.',
  what:'Reliable OTPs, transaction alerts, payment reminders and customer calls for banking, financial services and insurance.',
  why:'Customers expect an OTP or alert in seconds. A delayed message or a missed reminder costs trust, and the sector needs strict security and DLT-compliant messaging.',
  how:'DLT-compliant SMS, OTP and RCS carry alerts. WhatsApp automation answers routine service queries. IVR and outbound calling handle verification and reminders. Tellco automates follow-ups, and a Custom SLM can explain approved internal procedures to staff.',
  uses:['Communication Infrastructure','Voice & Telephony','Tellco','Custom SLM'],
  benefit:'Messages and calls reach customers on time, and routine calling and queries are handled without adding manual work.'},
 {name:'Healthcare',
  text:'Appointment, reminder and front-desk automation for hospitals, clinics and diagnostic centres.',
  what:'Appointment booking, reminders, follow-ups and patient queries handled automatically across voice and WhatsApp.',
  why:'Front desks are busy and no-shows waste clinical time. Patient data is sensitive, so some facilities need AI that runs inside their own premises.',
  how:'Aura AI works as a virtual front desk. Tellco books appointments and sends follow-ups. WhatsApp and SMS reminders reduce missed visits. Edge AI runs on-premise or offline where patient data must stay on site.',
  uses:['Aura AI','Tellco','Conversational AI & Automation','Edge AI'],
  benefit:'Staff spend less time on routine calls, patients get timely reminders, and sensitive data can stay on-premise.'},
 {name:'Education',
  text:'Admissions, parent communication and learning automation for schools, colleges and ed-tech.',
  what:'Admission enquiries, fee reminders, notices to parents and students, and faster staff training.',
  why:'Enquiries arrive in bursts, notices must reach every parent, and policies and SOPs are rarely read in full.',
  how:'Tellco qualifies admission leads and follows up. Bulk SMS and WhatsApp send notices and fee reminders. Aura AI can act as a virtual counsellor. TrainExl turns manuals and SOPs into short microlearning modules.',
  uses:['Tellco','Communication Infrastructure','Aura AI','TrainExl'],
  benefit:'Fewer missed enquiries, notices that actually reach parents, and training material people finish.'},
 {name:'Ecommerce & Retail',
  text:'Order updates, support automation and customer engagement across every channel.',
  what:'Order confirmations, delivery updates, login OTPs and customer support across SMS, WhatsApp, voice and email.',
  why:'Shoppers want to know where an order is without raising a ticket. Support volume rises with every sale, and repeat customers are cheaper than new ones.',
  how:'The omnichannel platform sends the right message on the right channel from one dashboard. WhatsApp and voice bots answer common questions. Sentiment analysis flags unhappy customers, and APIs connect to your order and CRM systems.',
  uses:['Omnichannel Engagement Platform','Conversational AI & Automation','Communication Infrastructure'],
  benefit:'Fewer "where is my order" tickets, a consistent customer journey, and support staff free for the cases that need a person.'},
 {name:'Real Estate',
  text:'Lead qualification, site-visit booking and follow-up for developers, brokers and property portals.',
  what:'Fast response to property enquiries, qualification of serious buyers and automatic site-visit scheduling.',
  why:'Leads go cold within hours, and sales teams lose time calling people who are not ready to buy.',
  how:'Tellco calls new leads, qualifies them and books site visits. Toll-free and virtual numbers track campaign response. WhatsApp automation shares project details and sends reminders and follow-ups.',
  uses:['Tellco','Voice & Telephony','Conversational AI & Automation'],
  benefit:'Every lead gets a quick first response, and sales teams spend their time on qualified buyers.'},
 {name:'Logistics & Delivery',
  text:'Real-time delivery alerts and automated calls for couriers, fleets and last-mile operators.',
  what:'Shipment status alerts, delivery confirmation calls, address verification and customer notifications.',
  why:'Failed deliveries and "where is my parcel" calls are expensive. Customers want real-time updates without chasing anyone.',
  how:'The notification engine triggers SMS and WhatsApp alerts at each shipment stage. Outbound calling and IVR confirm addresses and delivery slots. Custom software and APIs connect to your tracking and dispatch systems, with connectors confirmed per project.',
  uses:['Communication Infrastructure','Voice & Telephony','Digital Engineering & IT Services'],
  benefit:'Fewer failed deliveries and inbound status calls, with customers kept informed automatically.'},
 {name:'Government',
  text:'Citizen notifications, helplines and AI governance for public sector bodies.',
  what:'Citizen alerts, helpline and IVR services, multilingual engagement, and staff training on approved procedures.',
  why:'Public services must reach large and varied populations in their own language, and data handling rules are strict.',
  how:'Bulk messaging and IVR deliver notices and helpline services. Multilingual voice and WhatsApp bots answer routine queries. Edge AI keeps processing on-premise. ISO 42001 readiness supports AI governance, and TrainExl turns SOPs into staff training.',
  uses:['Communication Infrastructure','Voice & Telephony','Edge AI','ISO 42001 AI Readiness'],
  benefit:'Wider reach in local languages, helplines that scale, and AI that fits data and governance rules.'},
 {name:'Telecom',
  text:'Voice, IVR and messaging infrastructure and AI for telecom operators and service providers.',
  what:'Voice, IVR, cloud telephony, toll-free and virtual numbers, and messaging APIs for operators and their enterprise customers.',
  why:'Telecom brands handle huge volumes of calls and messages, and customers expect quick resolution on the channel they choose.',
  how:'Cloud telephony and IVR route and automate calls. Messaging APIs deliver notifications at scale. Custom SLM can power a telecom-specific assistant, and digital engineering supports platform modernisation.',
  uses:['Voice & Telephony','Communication Infrastructure','Custom SLM','Digital Engineering & IT Services'],
  benefit:'Calls and messages are handled at scale, with routine support automated and platforms modernised.'}];
export const TIMELINE: Item[] = [
 {name:'2009: The Foundation',text:'We began with a mission to build reliable, scalable telecom infrastructure for enterprises across India, focused on connectivity, messaging and mission-critical communication systems.'},
 {name:'2012 to 2016: Building Scale',text:'We expanded our infrastructure footprint, strengthened platform capabilities and built the operational excellence needed for high-volume enterprise communication.'},
 {name:'2017 to 2020: Platform Evolution',text:'We turned our core infrastructure into a unified engagement platform, integrating voice, messaging, automation and analytics into one omnichannel ecosystem.'},
 {name:'2021 to Present: AI-Powered Future',text:'We combine years of infrastructure expertise with modern AI to deliver intelligent, automated and personalised customer experiences at enterprise scale.'}];
export const CERTS: Item[] = [
 {name:'ISO 9001:2015: Quality Management',text:'Documented and audited delivery processes, continuous improvement controls and customer satisfaction as a measurable standard.'},
 {name:'ISO 27001:2013: Information Security',text:'Enterprise data security and access controls, an information risk management framework, and readiness for BFSI, healthcare and government requirements.'}];
import { Step } from './components/flow.component';
export const FLOW_JOURNEY: Step[]=[{t:'Discover',d:'Visitor lands and sees what Inbox Media does.'},{t:'Understand',d:'Capabilities and AI solutions explained by outcome.'},{t:'Trust',d:'Proof: case studies, results, verified claims.'},{t:'Enquire',d:'One clear form to book a demo.'}];
export const FLOW_CAP: Step[]=[{t:'Customer need',d:'Alert, call, support or booking.'},{t:'Channel',d:'SMS, voice, WhatsApp, email or push.'},{t:'Automation',d:'Bots and agents handle the routine work.'},{t:'Integration',d:'APIs connect CRM and internal systems.'},{t:'Outcome',d:'Faster response, one coordinated journey.'}];
export const FLOW_AI: Step[]=[{t:'Pick a use case',d:'Reception, outbound calls, knowledge, training or on-site AI.'},{t:'Match a solution',d:'Aura AI, Tellco, Custom SLM, TrainExl or Edge AI.'},{t:'Verify claims',d:'Confirm scope and data needs internally.'},{t:'Deploy',d:'Cloud or on-site, based on latency and data rules.'}];
export const FLOW_ABOUT: Step[]=[{t:'Company',d:'Integrated enterprise technology platform.'},{t:'Capabilities',d:'Five capability domains inside the platforms.'},{t:'Platforms',d:'SUTRA, MEDHA and KAVACH on a shared engineering foundation.'},{t:'Enquiry',d:'Talk to the team.'}];
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
export type ProductVisual='aura'|'tellco'|'slm'|'trainexl'|'edge';
export interface Product { name:string; text:string; flow:Step[]; deploy:string; integ:string; note?:string; what?:string; why?:string; how?:string; who?:string[]; benefit?:string; tagline?:string; caps?:string[]; visual?:ProductVisual; }
const TBC='To be confirmed with the product team before publishing.';
const W=(a:string,b:string,c:string,e:string):Step[]=>[{t:a,d:''},{t:b,d:''},{t:c,d:''},{t:e,d:''}];
export const PRODUCTS: Product[] = [
 {name:'Aura AI',text:AI_SOLUTIONS[0].text,flow:W('Customer arrives','Agent understands the need','Answers, advises or routes','Handover and record'),deploy:TBC,integ:TBC},
 {name:'Tellco',text:AI_SOLUTIONS[1].text,flow:W('Campaign list','Predictive dialing','Qualify lead or book appointment','Follow-up'),deploy:TBC,integ:TBC},
 {name:'Custom SLM',text:AI_SOLUTIONS[2].text+' Example: an internal assistant that explains approved company procedures to employees.',flow:W('Domain documents','Model built for your workflow','Employees ask questions','Answers from approved procedures'),deploy:TBC,integ:TBC},
 {name:'TrainExl',text:AI_SOLUTIONS[3].text,flow:W('SOPs and manuals','Converted to microlearning','Learners complete modules','Review and update'),deploy:TBC,integ:TBC},
 {name:'Edge AI',text:AI_SOLUTIONS[4].text,flow:W('Site or device','AI runs locally','Instant result','Data stays on-premise'),deploy:'On-premise or on-device, including offline environments.',integ:TBC}];
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

const PRODUCT_INFO:Record<string,Partial<Product>>={
 'Aura AI':{
  what:'A virtual agent that talks to people and shows them information on screen, as a voice assistant, an avatar or a visual guide.',
  why:'Customers and employees want help straight away, and front desks and support lines are costly to staff for every question.',
  how:'Aura AI understands what the person needs, answers or advises, routes the conversation to a person when needed, and keeps a record of the interaction.',
  who:['Healthcare','BFSI','Education','Real Estate'],
  benefit:'Shorter waits and consistent answers, with your staff free to handle the exceptions.'},
 'Tellco':{
  what:'An automated calling and follow-up engine for campaigns. It dials contact lists, talks to people, books appointments and chases leads.',
  why:'Manual calling is slow, and leads go cold when follow-up comes late.',
  how:'You load a campaign list, Tellco dials contacts with predictive dialing, qualifies the lead or books an appointment, and schedules the follow-up.',
  who:['Real Estate','Education','Healthcare','BFSI'],
  benefit:'More conversations in less time, and no lead left without a follow-up.'},
 'Custom SLM':{
  what:'A compact language model trained on your own domain material, so it understands your industry\'s terms and procedures.',
  why:'General AI tools do not know your procedures, and enterprises need answers drawn from approved material.',
  how:'The model is built from your domain documents and shaped around your workflow. Employees ask questions and get answers based on approved procedures.',
  who:['BFSI','Healthcare','Telecom','Legal'],
  benefit:'Staff get quick, procedure-based answers instead of searching manuals or asking colleagues.'},
 'TrainExl':{
  what:'A system that converts your existing SOPs, manuals and compliance documents into short, intelligent learning modules.',
  why:'Staff rarely read long manuals, compliance training is repetitive, and material goes out of date.',
  how:'You provide SOPs and manuals, TrainExl converts them into short microlearning modules, learners complete them, and the content is reviewed and updated.',
  who:['BFSI','Healthcare','Education','Government'],
  benefit:'Training that people actually finish, built from the documents you already have.'},
 'Edge AI':{
  what:'AI that runs on your own premises or device instead of the cloud, including where there is no internet connection.',
  why:'Some data cannot leave the premises, and some sites have weak or no connectivity.',
  how:'The AI runs on your site or on the device itself and gives results instantly, and the data stays on-premise.',
  who:['Healthcare','Government','BFSI','Remote sites'],
  benefit:'AI that works where cloud AI cannot, with data kept under your control.'}};
PRODUCTS.forEach(p=>Object.assign(p,PRODUCT_INFO[p.name]));

/* ===== Product showcase details (MEDHA) ===== */
const PRODUCT_SHOWCASE: Record<string, Pick<Product, 'tagline' | 'caps' | 'visual'>> = {
  'Aura AI': { visual: 'aura', tagline: 'A face and a voice for your front desk',
    caps: ['AI Voice Assistants', 'Conversational Avatars', 'Visual AI Interaction', 'Virtual Front Desks', 'Voice-Based Customer Support', 'Interactive AI Experiences'] },
  'Tellco': { visual: 'tellco', tagline: 'Outreach that never forgets a follow-up',
    caps: ['AI-Powered Outbound Calling', 'Predictive Dialing', 'Lead Qualification', 'Appointment Booking', 'Automated Follow-Ups', 'Customer Outreach Automation'] },
  'Custom SLM': { visual: 'slm', tagline: 'A language model that knows your business',
    caps: ['Small Language Models', 'Domain-Specific AI Models', 'Enterprise Knowledge Models', 'Specialised AI Responses', 'Private Domain Knowledge Processing'] },
  'TrainExl': { visual: 'trainexl', tagline: 'Turn manuals into learning people finish',
    caps: ['AI-Based Employee Training', 'SOP-Based Learning', 'Document-to-Learning Conversion', 'Interactive Microlearning', 'Knowledge Assessment', 'Training Automation'] },
  'Edge AI': { visual: 'edge', tagline: 'AI that runs where your data lives',
    caps: ['On-Device AI', 'On-Premise AI', 'Local AI Processing', 'Offline AI Capabilities', 'Low-Latency AI Applications', 'Data Locality'] }
};
PRODUCTS.forEach(p => Object.assign(p, PRODUCT_SHOWCASE[p.name]));

/* ===== Industry detail: challenges, platforms and an example workflow ===== */
export type PlatformKey = 'sutra' | 'medha' | 'kavach';
export interface IndustryDetail { challenges: string[]; platforms: PlatformKey[]; engineering?: boolean; workflow: string[]; }
const INDUSTRY_DETAIL: Record<string, IndustryDetail> = {
  'BFSI': { platforms: ['sutra', 'medha', 'kavach'],
    challenges: ['OTPs and alerts must arrive in seconds', 'Missed reminders cost trust and revenue', 'Strict security and DLT messaging rules'],
    workflow: ['A transaction triggers a DLT-compliant SMS, OTP or RCS alert', 'WhatsApp automation answers routine service queries', 'IVR and outbound calls handle verification and reminders', 'Tellco automates follow-ups; staff ask a Custom SLM about approved procedures'] },
  'Healthcare': { platforms: ['sutra', 'medha', 'kavach'],
    challenges: ['Busy front desks and long call queues', 'No-shows waste clinical time', 'Patient data that must stay on site'],
    workflow: ['A patient books through Aura AI’s virtual front desk', 'Tellco confirms the appointment and schedules follow-ups', 'WhatsApp and SMS reminders reduce missed visits', 'Edge AI keeps sensitive processing on-premise'] },
  'Education': { platforms: ['sutra', 'medha'],
    challenges: ['Admission enquiries arrive in bursts', 'Notices must reach every parent', 'Policies and SOPs are rarely read in full'],
    workflow: ['Tellco captures and qualifies the admission enquiry', 'Notices and fee reminders go out by SMS and WhatsApp', 'Aura AI answers counselling questions', 'TrainExl turns staff SOPs into microlearning'] },
  'Ecommerce & Retail': { platforms: ['sutra', 'medha'], engineering: true,
    challenges: ['“Where is my order” tickets grow with every sale', 'Customers expect updates on their preferred channel', 'Repeat customers matter more than new ones'],
    workflow: ['An order event triggers the right message on the right channel', 'WhatsApp and voice bots answer common questions', 'Sentiment analysis flags unhappy customers for a person', 'APIs keep order and CRM systems in sync'] },
  'Real Estate': { platforms: ['sutra', 'medha'],
    challenges: ['Leads go cold within hours', 'Sales time lost on buyers who are not ready', 'Campaign response is hard to track'],
    workflow: ['A new lead calls a campaign-specific number', 'Tellco calls back, qualifies and books a site visit', 'WhatsApp shares project details and reminders', 'The sales team follows up with qualified buyers'] },
  'Logistics & Delivery': { platforms: ['sutra'], engineering: true,
    challenges: ['Failed deliveries are expensive', '“Where is my parcel” calls flood support', 'Tracking systems rarely talk to messaging'],
    workflow: ['Each shipment stage triggers SMS and WhatsApp alerts', 'Outbound calls and IVR confirm address and delivery slot', 'APIs connect tracking and dispatch systems', 'Exceptions route to the operations team'] },
  'Government': { platforms: ['sutra', 'medha', 'kavach'],
    challenges: ['Large, multilingual populations to reach', 'Helplines that must scale on demand', 'Strict data handling and AI governance rules'],
    workflow: ['Citizen notices go out through bulk messaging and IVR', 'Multilingual voice and WhatsApp bots answer routine queries', 'Edge AI keeps processing on-premise', 'ISO 42001 readiness and TrainExl support governance and staff training'] },
  'Telecom': { platforms: ['sutra', 'medha'], engineering: true,
    challenges: ['Huge call and message volumes', 'Customers expect quick resolution on any channel', 'Legacy platforms slow down change'],
    workflow: ['Cloud telephony and IVR route and automate calls', 'Messaging APIs deliver notifications at scale', 'A Custom SLM powers a telecom-specific assistant', 'Digital engineering modernises the platforms underneath'] }
};
export const INDUSTRY_VIEW = INDUSTRIES.map(i => ({
  ...i, ...INDUSTRY_DETAIL[i.name],
  products: (i.uses || []).filter(u => PRODUCTS.some(p => p.name === u))
}));
export type IndustryView = typeof INDUSTRY_VIEW[number];

/* ===== Integration architecture (generic categories only: specific connectors are confirmed per project) ===== */
export const INTEGRATION_GROUPS = [
  { key: 'channels', name: 'Communication channels', text: 'Every customer touchpoint, sent and received through SUTRA.', items: ['SMS', 'WhatsApp', 'RCS', 'Email', 'Voice', 'Push'] },
  { key: 'crm', name: 'CRM & enterprise systems', text: 'Customer records and business events that trigger journeys.', items: ['CRM', 'ERP', 'Helpdesk', 'Order management'] },
  { key: 'apis', name: 'APIs', text: 'Standard interfaces to send, receive and automate.', items: ['REST APIs', 'Webhooks', 'Messaging APIs'] },
  { key: 'agents', name: 'AI agents', text: 'MEDHA products that act on conversations and data.', items: ['Aura AI', 'Tellco', 'Custom SLM', 'TrainExl', 'Edge AI'] },
  { key: 'cloud', name: 'Cloud infrastructure', text: 'Where the platforms run, chosen around data rules.', items: ['Public cloud', 'Private cloud', 'On-premise'] },
  { key: 'apps', name: 'Internal business apps', text: 'Your own portals, tools and dashboards.', items: ['Custom apps', 'Portals', 'Dashboards'] }
];

/* ===== Why Inbox Media ===== */
export const WHY = [
  { t: 'Enterprise technology expertise', d: 'Serving enterprises since 2009, from telecom infrastructure to AI.' },
  { t: 'Integrated communication infrastructure', d: 'SMS, voice, WhatsApp, RCS and email on one fabric: SUTRA.' },
  { t: 'Intelligent automation', d: 'Five AI products and custom automation in MEDHA.' },
  { t: 'Digital trust & security', d: 'Privacy, security and AI governance through KAVACH.' },
  { t: 'Scalable engineering', d: 'Software, APIs, cloud and DevOps under every platform.' },
  { t: 'Industry-focused solutions', d: 'Configured for BFSI, healthcare, government and five more sectors.' }
];

/* ===== Solution finder goals (contact page) =====
   Shared by the finder and the enquiry form. `interest` must match an option in the form's "Area of interest" list. */
export interface FinderGoal { key: string; label: string; interest: string; }
export const FINDER_GOALS: FinderGoal[] = [
  { key: 'communication', label: 'Customer communication and alerts', interest: 'SUTRA' },
  { key: 'calls', label: 'Voice calls and follow-ups', interest: 'Voice & Telephony' },
  { key: 'automation', label: 'Customer support and conversations', interest: 'MEDHA' },
  { key: 'systems', label: 'Connect or modernise systems', interest: 'Digital Engineering' },
  { key: 'governance', label: 'Privacy, security and AI governance', interest: 'KAVACH' }
];
