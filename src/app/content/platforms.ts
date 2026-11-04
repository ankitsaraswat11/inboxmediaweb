/* =====================================================================
   SUTRA · MEDHA · KAVACH — platform content
   One file per concern keeps copy editable without touching components.
   ===================================================================== */
export type PlatformSlug = 'sutra' | 'medha' | 'kavach';

/**
 * KAVACH items are labelled so visitors can tell what kind of offer each one is.
 * Never present a `standard` as an Inbox Media certification until the certificate and scope are verified.
 */
export type TrustKind = 'standard' | 'readiness' | 'consulting' | 'control';
export const TRUST_KINDS: Record<TrustKind, { label: string; text: string }> = {
  standard: { label: 'Standard', text: 'A management-system standard. Inbox Media’s own certificate number, scope and validity are published only after verification.' },
  readiness: { label: 'Readiness', text: 'Assessment and preparation for certification. Readiness does not mean anyone is certified.' },
  consulting: { label: 'Advisory', text: 'Consulting and compliance support delivered as a service.' },
  control: { label: 'Technical control', text: 'A safeguard built into the platforms and the systems we implement.' }
};

export interface ServiceItem { name: string; kind?: TrustKind; link?: string; }
export interface ServiceGroup { title: string; text: string; items: ServiceItem[]; }
export interface UseCase { title: string; text: string; who: string; }
export interface Challenge { title: string; text: string; symptoms: string[]; answer: string; }

export interface Platform {
  slug: PlatformSlug;
  name: string;
  hi: string;            // Devanagari name, used only in homepage headings
  layer: string;
  descriptor: string;
  short: string;
  area: string;
  tagline: string;
  meaning: string;
  positioning: string;
  summary: string;       // one-line description for overviews
  highlights: string[];  // key technologies shown in overviews
  groups: ServiceGroup[];
  useCases: UseCase[];
  challenge: Challenge;
  capabilities: string[]; // existing capability domains that belong to this platform
}

export const PLATFORMS: Platform[] = [
  {
    slug: 'sutra', name: 'SUTRA', hi: 'सूत्र', layer: 'The Communication Layer', area: 'Communication',
    descriptor: 'Omnichannel Communication Fabric', short: 'Communication Fabric', tagline: 'Connect everything.',
    meaning: 'Sutra represents the connecting threads that bring businesses, customers, communication channels and enterprise systems together.',
    positioning: 'SUTRA unifies messaging, voice and digital engagement into one connected communication infrastructure, enabling enterprises to reach customers reliably across every interaction.',
    summary: 'Messaging, voice and digital engagement on one communication infrastructure.',
    highlights: ['SMS & OTP', 'WhatsApp Business API', 'RCS', 'Email', 'IVR', 'Cloud Telephony', 'Messaging APIs', 'Communication Analytics'],
    groups: [
      { title: 'Communication Infrastructure', text: 'Software and APIs that send SMS, OTP, RCS and notification traffic reliably and in line with telecom rules.',
        items: ['SMS Gateway', 'Transactional SMS', 'Promotional SMS', 'OTP Services', 'Bulk Messaging', 'RCS Messaging', 'DLT-Compliant Messaging', 'WhatsApp Business API', 'Email Communication', 'Push Notifications'].map(name => ({ name })) },
      { title: 'Voice & Telephony', text: 'Phone services delivered through the cloud: IVR menus, numbers, outbound calling and contact-centre tools.',
        items: ['IVR', 'Cloud Telephony', 'Toll-Free Numbers', 'Virtual Numbers', 'Outbound Calling', 'Voice Broadcasting', 'Contact Centre Solutions', 'Automated Calling'].map(name => ({ name })) },
      { title: 'Omnichannel Engagement', text: 'One control centre to send, coordinate and measure messages across every channel.',
        items: ['SMS', 'WhatsApp', 'RCS', 'Email', 'Voice', 'Push Notifications', 'Unified Communication Dashboard', 'Messaging APIs', 'Communication Analytics'].map(name => ({ name })) }
    ],
    useCases: [
      { title: 'OTPs and transaction alerts', text: 'Deliver time-critical messages in seconds, with DLT-compliant sending at any volume.', who: 'BFSI' },
      { title: 'Appointment reminders', text: 'Confirm, remind and reschedule across SMS, WhatsApp and voice to cut no-shows.', who: 'Healthcare' },
      { title: 'Order and delivery updates', text: 'Trigger the right message at each order and shipment stage from your own systems.', who: 'Ecommerce & logistics' },
      { title: 'Helplines and IVR', text: 'Route callers, offer self-service and broadcast notices to large audiences.', who: 'Government & telecom' }
    ],
    challenge: {
      title: 'Fragmented communication', text: 'Customers move between SMS, WhatsApp, email and calls, but each channel runs on its own tool with its own data.',
      symptoms: ['A separate vendor for every channel', 'No single view of what a customer received', 'Inconsistent delivery and compliance'],
      answer: 'SUTRA runs every channel on one infrastructure, with one dashboard and one set of APIs.'
    },
    capabilities: ['Communication Infrastructure', 'Voice & Telephony', 'Omnichannel Engagement Platform']
  },
  {
    slug: 'medha', name: 'MEDHA', hi: 'मेधा', layer: 'The Intelligence Layer', area: 'Artificial Intelligence',
    descriptor: 'Enterprise Intelligence & Automation Engine', short: 'Intelligence Engine', tagline: 'Make everything intelligent.',
    meaning: 'Medha represents intelligence, knowledge and the ability to understand information and make decisions.',
    positioning: 'MEDHA transforms business data, conversations and workflows into intelligent actions through conversational AI, specialised language models and autonomous automation.',
    summary: 'Conversational AI, specialised language models and automation that act on your data.',
    highlights: ['Conversational AI', 'AI Agents', 'LLMs & SLMs', 'Voice AI', 'NLP', 'Sentiment Analysis', 'Multilingual AI', 'Workflow Automation'],
    groups: [
      { title: 'AI products', text: 'Five products, each built for a distinct job.',
        items: ['Aura AI', 'Tellco', 'Custom SLM', 'TrainExl', 'Edge AI'].map(name => ({ name, link: '/ai-solutions' })) },
      { title: 'AI capabilities', text: 'The building blocks used across the products and in custom automation.',
        items: ['Conversational AI', 'LLMs', 'SLMs', 'NLP', 'AI Agents', 'Voice AI', 'Chatbots', 'Sentiment Analysis', 'Multilingual AI', 'WhatsApp Automation', 'AI Workflow Automation'].map(name => ({ name })) }
    ],
    useCases: [
      { title: 'Virtual front desk', text: 'Aura AI answers, advises and routes visitors by voice, avatar or screen.', who: 'Healthcare, BFSI' },
      { title: 'Lead qualification and follow-up', text: 'Tellco calls leads, qualifies them and books appointments automatically.', who: 'Real estate, education' },
      { title: 'Answers from approved procedures', text: 'A Custom SLM gives staff answers drawn from your own documents.', who: 'BFSI, telecom' },
      { title: 'AI where data must stay on site', text: 'Edge AI runs on-premise or on-device, including offline.', who: 'Healthcare, government' }
    ],
    challenge: {
      title: 'Manual processes, disconnected intelligence', text: 'Teams answer the same questions, chase leads by hand and search manuals, while business data never informs the next action.',
      symptoms: ['Repetitive calls and queries handled manually', 'Leads go cold without timely follow-up', 'Knowledge locked inside documents'],
      answer: 'MEDHA turns conversations, data and workflows into automated actions, with a person in the loop where it matters.'
    },
    capabilities: ['Conversational AI & Automation']
  },
  {
    slug: 'kavach', name: 'KAVACH', hi: 'कवच', layer: 'The Trust Layer', area: 'Compliance & Security',
    descriptor: 'Digital Trust, Security & Compliance Fabric', short: 'Trust Fabric', tagline: 'Protect everything.',
    meaning: 'Kavach represents protection, security and safeguarding.',
    positioning: 'KAVACH embeds digital trust, privacy protection, information security and responsible AI governance into enterprise technology environments.',
    summary: 'Privacy, security and responsible AI governance built into every layer.',
    highlights: ['DPDP Act', 'Consent Management', 'Encryption', 'Identity & Access', 'Security Monitoring', 'Audit Logs', 'ISO 42001 Readiness', 'AI Governance'],
    groups: [
      { title: 'Data Privacy', text: 'Handle personal data lawfully and transparently, from consent to deletion.',
        items: [
          { name: 'DPDP Act Compliance', kind: 'consulting' }, { name: 'Personal Data Protection', kind: 'control' }, { name: 'Consent Management', kind: 'control' },
          { name: 'Data Governance', kind: 'consulting' }, { name: 'Data Lifecycle Management', kind: 'control' }, { name: 'Privacy Controls', kind: 'control' }] },
      { title: 'Information Security', text: 'Protect systems and data with layered technical controls and managed risk.',
        items: [
          { name: 'ISO 27001', kind: 'standard', link: '/about/certifications' }, { name: 'Cybersecurity', kind: 'control' }, { name: 'Data Encryption', kind: 'control' },
          { name: 'Identity & Access Management', kind: 'control' }, { name: 'Access Control', kind: 'control' }, { name: 'Security Monitoring', kind: 'control' },
          { name: 'Audit Logs', kind: 'control' }, { name: 'Risk Management', kind: 'consulting' }] },
      { title: 'AI Governance', text: 'Adopt AI responsibly, with policies, risk assessment and model oversight.',
        items: [
          { name: 'ISO 42001 Readiness', kind: 'readiness' }, { name: 'AI Governance', kind: 'consulting' }, { name: 'Responsible AI', kind: 'consulting' },
          { name: 'AI Risk Assessment', kind: 'consulting' }, { name: 'AI Policy Management', kind: 'consulting' }, { name: 'AI Security', kind: 'control' },
          { name: 'Model Governance', kind: 'control' }] },
      { title: 'Quality Management', text: 'Documented, repeatable processes that keep operations consistent and auditable.',
        items: [
          { name: 'ISO 9001', kind: 'standard', link: '/about/certifications' }, { name: 'Quality Management Systems', kind: 'consulting' },
          { name: 'Process Documentation', kind: 'consulting' }, { name: 'Operational Governance', kind: 'consulting' }] }
    ],
    useCases: [
      { title: 'DPDP-ready customer journeys', text: 'Consent, opt-outs and data retention handled inside SUTRA communication flows.', who: 'BFSI, ecommerce' },
      { title: 'Governed AI rollout', text: 'ISO 42001 readiness and AI risk assessment before MEDHA goes live.', who: 'Any AI programme' },
      { title: 'Data that stays on site', text: 'Edge AI and access controls keep sensitive processing inside your premises.', who: 'Healthcare, government' },
      { title: 'Audit-ready operations', text: 'Access control and audit logs give evidence without manual collection.', who: 'Regulated sectors' }
    ],
    challenge: {
      title: 'Rising privacy, security and governance demands', text: 'The DPDP Act, sector regulators and customers expect proof that personal data and AI are governed, not just promised.',
      symptoms: ['Consent and data handling spread across tools', 'AI adopted without a governance framework', 'Audit evidence assembled by hand'],
      answer: 'KAVACH builds privacy, security and AI governance into SUTRA and MEDHA from the start.'
    },
    capabilities: []
  }
];

/** ISO 42001 AI Readiness moved from AI products to KAVACH: it is a governance service, not an AI product. Original copy preserved. */
export const ISO42001 = {
  name: 'ISO 42001 AI Readiness',
  text: 'AI governance assessment, risk management framework and ISO 42001 certification preparation for enterprise AI compliance.',
  what: 'An advisory service that reviews how your organisation governs AI and prepares you for ISO 42001 certification.',
  why: 'As AI use grows, regulators and customers ask how it is governed, and unmanaged AI creates risk.',
  how: 'We assess your AI governance, identify risks, define controls and prepare you for certification.',
  who: ['BFSI', 'Healthcare', 'Government', 'Telecom'],
  benefit: 'A clear view of your AI risks and a practical path towards certification.',
  steps: ['Assess AI governance', 'Identify risks', 'Define controls', 'Prepare for certification'],
  note: 'Readiness does not mean the company is certified. Certification is established separately.'
};

export const platformBySlug = (s: string | null | undefined) => PLATFORMS.find(p => p.slug === s);
export const TAGLINE = 'Connect Everything. Think Intelligently. Operate with Trust.';
