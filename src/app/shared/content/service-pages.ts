import { Crumb, Cta } from '../ui/page-hero.component';

/**
 * Service & product pages, laid out like the product pages on aishield.security:
 * hero → "Why …?" (3 problems) → "See how … works" (timeline) → core features (dark band)
 * → who it's for → engagement options → closing call to action.
 * Feature ids double as menu anchors (e.g. /ai-security#red-teaming) — keep them stable.
 */
export interface Item { i: string; t: string; d: string }
export interface Feature extends Item { id?: string; b?: string[] }
export interface ServicePage {
  crumbs: Crumb[];
  label: string;
  icon: string;
  title: string;
  lead: string;
  img?: string;
  alt?: string;
  primary: Cta;
  secondary?: Cta;
  why: { title: string; intro: string; items: Item[] };
  how: { title: string; intro: string; steps: Item[] };
  features: { id: string; title: string; intro?: string; items: Feature[] };
  values?: { title: string; intro?: string; items: Item[] };
  roles?: { title: string; items: Item[] };
  options?: { title: string; intro?: string; items: Item[] };
  closing: { prefix?: string; lead: string };
}

const DEMO: Cta = { x: 'Book a demo', u: '/book-a-demo' };

const OPTIONS: ServicePage['options'] = {
  title: 'Engagement & deployment options',
  intro: 'Start small with a scoped assessment, or run it as an ongoing programme.',
  items: [
    { i: 'target', t: 'Fixed-scope assessment', d: 'A defined scope and timeline, such as a two-week gap assessment or a single application review.' },
    { i: 'wave', t: 'Managed service', d: 'Ongoing monitoring, testing and reporting after go-live, with a named team.' },
    { i: 'cloud', t: 'Your cloud or on-premises', d: 'We work within your environment and access controls. Any system access is scoped, logged and revoked at the end.' },
    { i: 'layers', t: 'Enterprise programme', d: 'Group-wide work across AI, security and compliance, led by a named engagement lead.' },
  ],
};

const SECURITY_ROLES: ServicePage['roles'] = {
  title: 'Whether you’re a CISO, a developer or the compliance lead, everyone is covered.',
  items: [
    { i: 'shield', t: 'CISO & security heads', d: 'A risk-ranked view of every AI system and application, with evidence for the board.' },
    { i: 'cpu', t: 'CTO & engineering leads', d: 'Clear findings your teams can fix without stalling the release plan.' },
    { i: 'layers', t: 'Developers & ML engineers', d: 'Specific, reproducible issues with remediation guidance and a retest.' },
    { i: 'gavel', t: 'DPO & compliance', d: 'Controls and records mapped to DPDP and sector regulators.' },
    { i: 'chart', t: 'Risk & internal audit', d: 'Scoped, dated evidence that stands up to an auditor.' },
    { i: 'users', t: 'Business & product owners', d: 'Systems that reach production with clear ownership and human checkpoints.' },
  ],
};

const AI_ROLES: ServicePage['roles'] = {
  title: 'From the boardroom to the build team, everyone gets what they need.',
  items: [
    { i: 'chart', t: 'Business leaders', d: 'Use cases ranked by value, risk and effort before anything is built.' },
    { i: 'layers', t: 'Operations heads', d: 'Automation that fits existing workflows, with human review where it matters.' },
    { i: 'cpu', t: 'CTO & IT', d: 'Integration with your systems, identity and data boundaries.' },
    { i: 'database', t: 'Data & ML teams', d: 'Evaluation, monitoring and change control for models in production.' },
    { i: 'shield', t: 'Security & risk', d: 'Agents tested and permissioned before they touch production data.' },
    { i: 'gavel', t: 'Compliance & DPO', d: 'Prompt logs, training data and AI vendors mapped as personal-data flows.' },
  ],
};

export const SERVICE_PAGES: Record<string, ServicePage> = {
  /* ------------------------------------------------------------------ AI */
  ai: {
    crumbs: [{ x: 'Services' }, { x: 'AI' }],
    label: 'AI Services', icon: 'spark',
    title: 'Turn AI potential into practical outcomes.',
    lead: 'AI strategy, generative AI, agents and intelligent automation, designed around real business goals and shipped into the systems your teams already use.',
    primary: DEMO, secondary: { x: 'Explore capabilities', u: '#capabilities' },
    why: {
      title: 'Why AI programmes stall',
      intro: 'AI is easy to experiment with. Enterprise AI is hard to operationalize. We bridge the gap between experiment and production.',
      items: [
        { i: 'ghost', t: 'Pilots that never ship', d: 'Disconnected AI pilots that never reach production or a measurable outcome.' },
        { i: 'database', t: 'Data leaving your boundary', d: 'Sensitive enterprise data entering third-party models without controls.' },
        { i: 'users', t: 'No clear ownership', d: 'No AI governance, no named owner and an unclear return on investment.' },
      ],
    },
    how: {
      title: 'See how an AI engagement works',
      intro: 'From strategy to production, then continuous operation. Not a one-time launch.',
      steps: [
        { i: 'scan', t: 'Discover', d: 'Map workflows, data and the highest-value automation opportunities.' },
        { i: 'layers', t: 'Design', d: 'Architect the agent, model and integration approach for the use case.' },
        { i: 'cpu', t: 'Build', d: 'Engineer agents, RAG systems, copilots and automations.' },
        { i: 'shield', t: 'Secure', d: 'Test and harden before anything touches production data.' },
        { i: 'link', t: 'Deploy', d: 'Ship into existing systems with proper access and change control.' },
        { i: 'wave', t: 'Operate', d: 'Monitor, evaluate and continuously improve under Managed AI.' },
      ],
    },
    features: {
      id: 'capabilities', title: 'Core capabilities',
      intro: 'Eight ways we put AI to work, each scoped to your data, risk and workflows.',
      items: [
        { id: 'consulting', i: 'target', t: 'AI consulting', d: 'Start with the business problem, not the model: a clear use case, practical constraints and a measurable outcome.', b: ['Discover opportunities', 'Shape a roadmap', 'Plan implementation'] },
        { id: 'transformation', i: 'flow', t: 'AI transformation', d: 'Move from isolated experiments to useful workflows across people, process and data.', b: ['Map workflows and friction points', 'Plan human review and escalation', 'Measure quality and adoption'] },
        { id: 'agents', i: 'users', t: 'Enterprise AI agents', d: 'Assistants and agent-style workflows that find information, summarize and coordinate defined tasks.', b: ['Knowledge assistants', 'Workflow support', 'Human oversight'] },
        { id: 'automation', i: 'doc', t: 'Document & process automation', d: 'Reduce manual handling across information-heavy work, with exceptions validated before production.', b: ['Capture and understand', 'Route to the right team', 'Review exceptions'] },
        { id: 'generative', i: 'spark', t: 'Generative AI & NLP', d: 'Drafting, summarization, question answering and classification, tested for accuracy, privacy and bias.', b: ['Answers over approved sources', 'Information extraction', 'Human review where needed'] },
        { id: 'private-ai', i: 'lock', t: 'Private / enterprise AI', d: 'Designed around what data can be used, where it is processed and who can see outputs.', b: ['Data boundaries', 'Governance', 'Evaluation'] },
        { id: 'integration', i: 'link', t: 'AI integration', d: 'Fit AI into an operating process instead of creating another disconnected tool.', b: ['Systems and data dependencies', 'APIs and workflow boundaries', 'Access, errors and audit'] },
        { id: 'managed-ai', i: 'wave', t: 'Managed AI operations', d: 'Keep AI useful after launch: ownership for monitoring, feedback, updates and incidents.', b: ['Quality monitoring', 'Change management', 'Operational ownership'] },
      ],
    },
    roles: AI_ROLES,
    options: OPTIONS,
    closing: { lead: 'Share your goals and constraints with the Ankit Global team to discuss a practical next step.' },
  },

  /* --------------------------------------------------------- AI SECURITY */
  'ai-security': {
    crumbs: [{ x: 'Services' }, { x: 'AI Security' }],
    label: 'AI Security', icon: 'shield',
    title: 'Secure AI before it reaches production.',
    lead: 'Identify risks in AI applications, test how systems behave under adversarial input, and build safer paths from experimentation to deployment.',
    primary: DEMO, secondary: { x: 'Explore assessment areas', u: '#assessments' },
    why: {
      title: 'Why AI security reviews?',
      intro: 'AI introduces risks across prompts, data, model behaviour, connected tools and the applications around them.',
      items: [
        { i: 'bolt', t: 'Prompt injection & jailbreaks', d: 'Untrusted instructions in user input or retrieved content push behaviour past intended limits.' },
        { i: 'eye', t: 'Sensitive data exposure', d: 'Confidential or personal information leaking through prompts, outputs or logs.' },
        { i: 'hand', t: 'Excessive agency', d: 'Agents and connected tools able to act beyond what the use case needs.' },
      ],
    },
    how: {
      title: 'See how an AI security review works',
      intro: 'An engagement flow adapted to your AI use case, data sensitivity and delivery stage.',
      steps: [
        { i: 'doc', t: 'Scope the system', d: 'Identify users, business purpose, data flows, model dependencies and connected tools.' },
        { i: 'layers', t: 'Map threats and controls', d: 'Prioritise plausible abuse scenarios, existing safeguards and gaps that need validation.' },
        { i: 'target', t: 'Test in an authorised environment', d: 'Run agreed checks with defined boundaries, test data and clear rules of engagement.' },
        { i: 'chart', t: 'Report and improve', d: 'Record evidence, risk levels and practical remediation steps.' },
        { i: 'check', t: 'Validate the fixes', d: 'Retest agreed findings and plan follow-up validation as the system changes.' },
      ],
    },
    features: {
      id: 'assessments', title: 'Core assessment areas',
      intro: 'Six areas where AI systems fail, reviewed against the use case rather than a generic checklist.',
      items: [
        { id: 'llm-security', i: 'shield', t: 'LLM security review', d: 'Trust boundaries, model inputs and outputs, sensitive data handling and connections to external tools.', b: ['Application and data-flow review', 'Threat scenarios and control gaps', 'Prioritised remediation'] },
        { id: 'red-teaming', i: 'target', t: 'AI red teaming', d: 'How an AI-enabled workflow responds to carefully designed adversarial scenarios.', b: ['Abuse-case planning', 'Controlled adversarial testing', 'Evidence-led findings'] },
        { id: 'prompt-injection', i: 'bolt', t: 'Prompt injection testing', d: 'Whether untrusted instructions can influence behaviour beyond intended boundaries.', b: ['Direct and indirect injection', 'Tool-use boundary checks', 'Mitigation recommendations'] },
        { id: 'model-risk', i: 'chart', t: 'Model risk assessment', d: 'Risks around model selection, intended use, reliability, sensitive outputs and oversight.', b: ['Use-case and impact mapping', 'Risk register and ownership', 'Review and monitoring plan'] },
        { id: 'app-security', i: 'lock', t: 'AI application security', d: 'The surrounding application: identity, APIs, retrieval sources, permissions and logs.', b: ['Authentication and authorisation', 'Secrets and data exposure', 'Secure integration patterns'] },
        { id: 'ai-governance', i: 'layers', t: 'AI governance readiness', d: 'Ownership and review processes so AI use stays understandable and accountable.', b: ['Roles and approval checkpoints', 'Documentation and traceability', 'Human review and escalation'] },
      ],
    },
    values: {
      title: 'Security by design',
      intro: 'Reviews work best when they connect to product design, release decisions and ongoing monitoring.',
      items: [
        { i: 'key', t: 'Least privilege', d: 'Limit model-connected tools and data to what the use case needs.' },
        { i: 'database', t: 'Data boundaries', d: 'Reduce unnecessary exposure of confidential or personal information.' },
        { i: 'hand', t: 'Human oversight', d: 'Define review and escalation for sensitive or high-impact actions.' },
        { i: 'doc', t: 'Traceability', d: 'Keep the records needed to investigate issues and improve controls.' },
      ],
    },
    roles: SECURITY_ROLES,
    options: OPTIONS,
    closing: { lead: 'Planning an AI launch or reviewing an existing system? Share your use case and the questions you need answered.' },
  },

  /* ------------------------------------------------------- CYBERSECURITY */
  cybersecurity: {
    crumbs: [{ x: 'Services' }, { x: 'Cybersecurity' }],
    label: 'Cybersecurity', icon: 'lock',
    title: 'Build security into every layer.',
    lead: 'Understand your exposure, prioritise risk and improve controls across applications, cloud environments and operations.',
    primary: DEMO, secondary: { x: 'Explore services', u: '#services' },
    why: {
      title: 'Why a programme, not a one-off test?',
      intro: 'Exposure changes every time an application, cloud account or vendor changes.',
      items: [
        { i: 'eye', t: 'Unknown exposure', d: 'Applications and APIs nobody has tested since they went live.' },
        { i: 'cloud', t: 'Cloud and identity drift', d: 'Configuration and access that quietly widen over time.' },
        { i: 'alert', t: 'Untested response', d: 'An incident plan that has never been rehearsed with the people who run it.' },
      ],
    },
    how: {
      title: 'See how a security engagement works',
      intro: 'Evidence-led from scope to retest, with a clear path into ongoing operations.',
      steps: [
        { i: 'doc', t: 'Scope and rules of engagement', d: 'Agree the systems, boundaries and test windows before anything starts.' },
        { i: 'target', t: 'Assess and test', d: 'Test approved systems and review configuration, identity and data exposure.' },
        { i: 'chart', t: 'Prioritise', d: 'Evidence-led findings with severity ratings and a risk register.' },
        { i: 'check', t: 'Remediate and retest', d: 'Practical remediation guidance and a retest of confirmed issues.' },
        { i: 'wave', t: 'Monitor and respond', d: 'Monitoring requirements, escalation workflows and a review cadence.' },
      ],
    },
    features: {
      id: 'services', title: 'Core services',
      items: [
        { id: 'vapt', i: 'target', t: 'VAPT', d: 'Identify weaknesses across approved systems and turn findings into a prioritised remediation plan.', b: ['Defined scope and rules of engagement', 'Evidence-led severity ratings', 'Remediation and retest planning'] },
        { id: 'cloud-security', i: 'cloud', t: 'Cloud security', d: 'Configuration, identity boundaries and data exposure in the context of your architecture.', b: ['Configuration and access review', 'Logging and monitoring', 'Hardening recommendations'] },
        { id: 'app-security', i: 'lock', t: 'Application security', d: 'Security risks in web applications, APIs and the workflows that connect them.', b: ['Authentication and authorisation', 'Sensitive data flows', 'Secure development guidance'] },
        { id: 'api-security', i: 'link', t: 'API security', d: 'Access patterns, object-level permissions, abuse limits and exposure of sensitive data.', b: ['Access checks', 'Rate limiting and misuse', 'API inventory and priorities'] },
        { id: 'assessment', i: 'chart', t: 'Security assessment', d: 'A risk-based view of your security posture and the improvements that matter most.', b: ['Scope and asset context', 'Risk register and control gaps', 'Prioritised roadmap'] },
        { id: 'managed-security', i: 'server', t: 'Managed security operations', d: 'Monitoring, escalation and response processes for ongoing security operations.', b: ['Monitoring requirements', 'Incident escalation', 'Operational metrics'] },
      ],
    },
    roles: SECURITY_ROLES,
    options: OPTIONS,
    closing: { prefix: 'Make sure your business', lead: 'Tell us what you run and what keeps you up at night. We’ll scope a practical first assessment.' },
  },

  /* ------------------------------------------------------- DIGITAL TRUST */
  'digital-trust': {
    crumbs: [{ x: 'Services' }, { x: 'Digital Trust' }],
    label: 'Digital Trust', icon: 'check',
    title: 'Make trust part of your digital foundation.',
    lead: 'Privacy, governance, accountability and responsible technology use, connected in one practical framework and backed by evidence.',
    primary: DEMO, secondary: { x: 'DPDP compliance', u: '/dpdp-compliance' },
    why: {
      title: 'Why digital trust?',
      intro: 'Most gaps are operational, not legal: nobody can show where a person’s data sits or what they agreed to.',
      items: [
        { i: 'doc', t: 'Consent you can’t prove', d: 'Consent is a checkbox, with no record of which notice the person actually saw.' },
        { i: 'database', t: 'Data you can’t map', d: 'A simple access request takes three departments and two weeks.' },
        { i: 'link', t: 'Vendors you can’t see', d: 'Nobody can list every vendor and tool that personal data flows to.' },
      ],
    },
    how: {
      title: 'See how a digital trust programme works',
      intro: 'Each step leaves an artefact you can hand to an auditor.',
      steps: [
        { i: 'database', t: 'Map personal data', d: 'Every system, vendor and flow, with purpose, owner and retention clock.' },
        { i: 'doc', t: 'Design consent and notices', d: 'Layered, plain-language notices, versioned at each collection point.' },
        { i: 'users', t: 'Run rights requests', d: 'One intake channel with identity checks, routing and SLA tracking.' },
        { i: 'layers', t: 'Govern vendors and AI', d: 'Processor contracts, vendor reviews and an AI use-case inventory.' },
        { i: 'chart', t: 'Monitor in Avisha Trust', d: 'Consent, rights SLAs and attestations tracked on one dashboard.' },
      ],
    },
    features: {
      id: 'framework', title: 'Core features & capabilities',
      items: [
        { id: 'privacy', i: 'eye', t: 'Privacy management', d: 'Map personal-data processing, define ownership and establish repeatable privacy workflows.', b: ['Data inventory and context', 'Responsibilities and workflows', 'Evidence and review'] },
        { id: 'consent', i: 'check', t: 'Consent management', d: 'Clear consent experiences and processes for capturing, reviewing and respecting choices.', b: ['Purpose-aware consent records', 'Preference and withdrawal journeys', 'Audit-friendly records'] },
        { id: 'data-governance', i: 'database', t: 'Data governance', d: 'How data is classified, accessed, retained and used across teams and systems.', b: ['Ownership and stewardship', 'Classification and access', 'Retention and quality'] },
        { id: 'ai-governance', i: 'layers', t: 'AI governance', d: 'Accountability for AI use: risk review, human oversight and ongoing monitoring.', b: ['AI use-case inventory', 'Risk and impact assessment', 'Oversight and monitoring'] },
        { id: 'vendor-risk', i: 'link', t: 'Third-party and vendor risk', d: 'Consistent review of suppliers that process data or support critical workflows.', b: ['Vendor due diligence', 'Contract and control review', 'Periodic reassessment'] },
        { id: 'avisha-trust', i: 'shield', t: 'Avisha Trust', d: 'Consent records, rights requests, policy attestations and evidence in one place, so “show me” takes minutes.', b: ['Consent and rights records', 'Vendor reviews and attestations', 'One monitoring dashboard'] },
      ],
    },
    roles: {
      title: 'Built for everyone who has to answer for personal data.',
      items: [
        { i: 'gavel', t: 'DPO & compliance', d: 'A living data map, consent log and rights register you can show on request.' },
        { i: 'shield', t: 'CISO', d: 'Reasonable security safeguards that are tested, not assumed.' },
        { i: 'cpu', t: 'CTO & IT', d: 'Consent capture and deletion built into the systems you run.' },
        { i: 'doc', t: 'Legal counsel', d: 'Policies and contracts drafted alongside the operational evidence.' },
        { i: 'users', t: 'Product & marketing', d: 'Clear rules for using customer data, purpose by purpose.' },
        { i: 'chart', t: 'Board & leadership', d: 'Exposure ranked, with progress tracked over time.' },
      ],
    },
    options: OPTIONS,
    closing: { prefix: 'Make sure your customer data', lead: 'Start with a scoped two-week gap assessment, or run the free readiness check first.' },
  },

  /* ------------------------------------------------------ RESPONSIBLE AI */
  'responsible-ai': {
    crumbs: [{ x: 'Company', u: '/about' }, { x: 'Responsible AI' }],
    label: 'Responsible AI', icon: 'hand',
    title: 'Build AI with accountability.',
    lead: 'Responsible AI connects intended use, risk assessment, data quality, transparency and human oversight, tailored to each system and the requirements that apply to it.',
    primary: DEMO, secondary: { x: 'See the framework', u: '#framework' },
    why: {
      title: 'Why responsible AI?',
      intro: 'AI systems can fail people in ways a test suite won’t catch unless someone is accountable for looking.',
      items: [
        { i: 'users', t: 'Unclear ownership', d: 'Nobody is named for a system’s purpose, limits and outcomes.' },
        { i: 'alert', t: 'Unassessed impact', d: 'Foreseeable harms and affected groups aren’t reviewed before launch.' },
        { i: 'hand', t: 'No human override', d: 'There is no defined point where a person reviews or stops an output.' },
      ],
    },
    how: {
      title: 'See how responsible AI works in practice',
      intro: 'Five steps that sit inside your delivery process, not beside it.',
      steps: [
        { i: 'user', t: 'Name an owner', d: 'Set accountability for purpose, stakeholders and acceptable use.' },
        { i: 'chart', t: 'Assess risk and impact', d: 'Identify foreseeable harms, affected groups and mitigations.' },
        { i: 'database', t: 'Review data quality and privacy', d: 'Check the data behind the system before deployment.' },
        { i: 'hand', t: 'Set human oversight', d: 'Define when people review outputs and how incidents escalate.' },
        { i: 'wave', t: 'Monitor and reassess', d: 'Respond to incidents and reassess the system periodically.' },
      ],
    },
    features: {
      id: 'framework', title: 'The framework',
      items: [
        { id: 'principles', i: 'user', t: 'Principles and ownership', d: 'Clear accountability for the system’s purpose, stakeholders and acceptable use.', b: ['Named business owner', 'Intended use and limitations', 'User communication'] },
        { id: 'risk-impact', i: 'chart', t: 'Risk and impact assessment', d: 'Foreseeable harms, affected groups and mitigations, identified before deployment.', b: ['Use-case and impact mapping', 'Data quality and privacy review', 'Risk controls and sign-off'] },
        { id: 'oversight', i: 'hand', t: 'Human oversight and monitoring', d: 'When people review outputs, how incidents escalate and how systems are reassessed.', b: ['Human review and override', 'Monitoring and incident response', 'Periodic reassessment'] },
      ],
    },
    roles: AI_ROLES,
    closing: { lead: 'Talk to the team about putting accountability into the AI systems you build and buy.' },
  },

  /* ------------------------------------------------------------- CURAOS */
  'products-curaos': {
    crumbs: [{ x: 'Products' }, { x: 'CuraOS' }],
    label: 'CuraOS', icon: 'plus',
    title: 'The agentic healthcare operating system.',
    lead: 'CuraOS is Ankit Global’s AI-native, multi-tenant EHR for clinics, hospitals and diagnostics centres, with ABDM and ABHA consent-based exchange and HL7 FHIR R4 built into its data model.',
    img: 'healthcare_1.jpg', alt: 'A hospital reception desk in a clinical corridor',
    primary: { x: 'Book a CuraOS demo', u: '/book-a-demo' }, secondary: { x: 'See how it works', u: '#how' },
    why: {
      title: 'Why CuraOS?',
      intro: 'Care teams lose time to scattered records and paperwork, and sharing health data needs the patient’s consent.',
      items: [
        { i: 'database', t: 'Scattered records', d: 'OPD, IPD, lab, radiology and pharmacy each hold part of the patient’s story.' },
        { i: 'doc', t: 'Documentation load', d: 'Consultation time goes into writing notes instead of the patient.' },
        { i: 'lock', t: 'Consent and exchange', d: 'Sharing records needs ABDM and ABHA consent and interoperable formats.' },
      ],
    },
    how: {
      title: 'See how CuraOS works',
      intro: 'One longitudinal record from the first visit to discharge, with AI that drafts and clinicians who decide.',
      steps: [
        { i: 'user', t: 'One patient record', d: 'A single longitudinal record, with consent-based exchange through ABDM and ABHA.' },
        { i: 'doc', t: 'Consult with the AI scribe', d: 'A consented consultation becomes a structured note.' },
        { i: 'layers', t: 'Work across departments', d: 'Lab, radiology and pharmacy work from the same history.' },
        { i: 'check', t: 'Review and approve', d: 'Clinical summaries, prescription safety checks and discharge drafts, always clinician-approved.' },
        { i: 'link', t: 'Share with consent', d: 'HL7 FHIR R4 in the data model, with access control and an audit trail.' },
      ],
    },
    features: {
      id: 'features', title: 'Core features & capabilities',
      items: [
        { id: 'modules', i: 'layers', t: 'Hospital modules', d: 'One longitudinal patient record connects OPD, IPD, lab, radiology and pharmacy.', b: ['OPD and IPD workflows', 'Lab, radiology and pharmacy', 'Multi-tenant for clinics and groups'] },
        { id: 'clinical-workflows', i: 'spark', t: 'Clinical AI assistance', d: 'An AI medical scribe, clinical summaries and safety checks, always approved by a clinician.', b: ['AI medical scribe', 'Prescription safety checks', 'Discharge drafts with approval'] },
        { id: 'integration', i: 'link', t: 'Interoperability and consent', d: 'ABDM and ABHA consent-based exchange and HL7 FHIR R4 are part of the data model.', b: ['ABDM and ABHA exchange', 'HL7 FHIR R4 data model', 'Access control and audit trail'] },
        { id: 'beyond', i: 'wave', t: 'Beyond the hospital', d: 'CuraOS also runs in remote patient monitoring, longevity and preventive health.', b: ['Remote patient monitoring', 'Longevity programmes', 'Preventive health'] },
      ],
    },
    roles: {
      title: 'Built for every team in care.',
      items: [
        { i: 'hand', t: 'Clinicians', d: 'Structured notes from consented consultations, ready to review.' },
        { i: 'users', t: 'Nursing & IPD', d: 'Admissions, ward work and discharge on one record.' },
        { i: 'scan', t: 'Lab & radiology', d: 'Orders and results attached to the same patient history.' },
        { i: 'shield', t: 'Pharmacy', d: 'Prescription safety checks before anything is dispensed.' },
        { i: 'chart', t: 'Hospital administration', d: 'A multi-tenant setup for clinics and hospital groups.' },
        { i: 'lock', t: 'IT & compliance', d: 'Access control and an audit trail built in.' },
      ],
    },
    options: {
      title: 'Where CuraOS runs',
      items: [
        { i: 'user', t: 'Clinics', d: 'Outpatient workflows with the AI scribe and one patient record.' },
        { i: 'layers', t: 'Hospitals', d: 'OPD, IPD, lab, radiology and pharmacy connected.' },
        { i: 'scan', t: 'Diagnostics centres', d: 'Orders and results linked to the longitudinal record.' },
        { i: 'globe', t: 'Hospital groups', d: 'Multi-tenant setup across sites.' },
      ],
    },
    closing: { prefix: 'Make sure patient data', lead: 'See CuraOS with your own workflows. Book a demo with the product team.' },
  },

  /* --------------------------------------------------------- STUDY24BY7 */
  'products-study24by7': {
    crumbs: [{ x: 'Products' }, { x: 'Study24by7' }],
    label: 'Study24by7', icon: 'spark',
    title: 'AI-native learning infrastructure.',
    lead: 'Study24by7 is Ankit Global’s AI-native learning platform, built for students, teachers and institutions rather than as digitised textbooks.',
    img: 'education_2.jpg', alt: 'A student working through practice questions on a laptop',
    primary: { x: 'Book a Study24by7 demo', u: '/book-a-demo' }, secondary: { x: 'See how it works', u: '#how' },
    why: {
      title: 'Why Study24by7?',
      intro: 'Digitised textbooks don’t teach. Students need practice, feedback and help at the moment they’re stuck.',
      items: [
        { i: 'doc', t: 'Content without guidance', d: 'Textbooks moved online, but students still learn alone.' },
        { i: 'target', t: 'Practice without feedback', d: 'Homework and revision rarely show what to work on next.' },
        { i: 'chart', t: 'Teachers without visibility', d: 'It’s hard to see where each learner needs help.' },
      ],
    },
    how: {
      title: 'See how Study24by7 works',
      intro: 'From the first lesson to the exam, with an AI Teacher and Tutor alongside.',
      steps: [
        { i: 'spark', t: 'Learn with the AI Teacher', d: 'Lessons built on NCERT digital content.' },
        { i: 'users', t: 'Ask the AI Tutor', d: 'Help when it’s needed, including voice learning.' },
        { i: 'doc', t: 'Practise', d: 'Homework, practice and flashcards.' },
        { i: 'target', t: 'Prepare for exams', d: 'Exam preparation and viva practice.' },
        { i: 'chart', t: 'Track progress', d: 'Student analytics and teacher intelligence.' },
      ],
    },
    features: {
      id: 'features', title: 'Core features & capabilities',
      items: [
        { id: 'education-ai', i: 'spark', t: 'AI Teacher and AI Tutor', d: 'Students learn with an AI Teacher and AI Tutor, including voice-based learning.', b: ['AI Teacher and AI Tutor', 'Voice learning', 'NCERT digital content'] },
        { id: 'learning-experience', i: 'target', t: 'Practice and exam preparation', d: 'Homework, practice, flashcards and viva practice help students prepare.', b: ['Homework and practice', 'Flashcards and viva practice', 'Exam preparation'] },
        { id: 'privacy-security', i: 'lock', t: 'Analytics and privacy', d: 'Analytics show where learners need help, with student privacy in mind.', b: ['Student analytics', 'Teacher intelligence', 'Role-based access'] },
      ],
    },
    roles: {
      title: 'Built for students, teachers and institutions.',
      items: [
        { i: 'user', t: 'Students', d: 'An AI Teacher and Tutor, voice learning, practice and exam preparation.' },
        { i: 'users', t: 'Teachers', d: 'Insight into where each learner needs help.' },
        { i: 'layers', t: 'Institutions', d: 'Learning infrastructure with role-based access and student privacy in mind.' },
      ],
    },
    closing: { prefix: 'Make sure student data', lead: 'See Study24by7 in a live walkthrough for your school or institution.' },
  },

  /* ---------------------------------------------------------- TRUST SEAL */
  'trust-seal': {
    crumbs: [{ x: 'Products' }, { x: 'Trust Seal' }],
    label: 'Avisha Trust Seal', icon: 'check',
    title: 'Make trust claims clear and verifiable.',
    lead: 'The Avisha Trust Seal shows that an organisation completed a defined Ankit Global assessment programme. Every seal names its track, its assessment date and its expiry.',
    primary: { x: 'Ask about the seal', u: '/contact' }, secondary: { x: 'See the seal tracks', u: '#seal-tracks' },
    why: {
      title: 'Why a trust seal?',
      intro: 'A trust claim is only useful if anyone can see what it covers and when it expires.',
      items: [
        { i: 'eye', t: 'Claims are hard to check', d: 'Badges rarely say what was assessed, or when.' },
        { i: 'gavel', t: 'Not a certification', d: 'The seal reflects an assessment methodology, not a government certificate, and says so.' },
        { i: 'wave', t: 'Evidence goes stale', d: 'Controls change, so every seal carries an expiry and a renewal path.' },
      ],
    },
    how: {
      title: 'See how the Trust Seal works',
      intro: 'Every seal is traceable to a scope, evidence and a named assessment period.',
      steps: [
        { i: 'doc', t: 'Define the scope', d: 'State what is being assessed and which criteria apply.' },
        { i: 'scan', t: 'Review evidence', d: 'Connect each claim to evidence and a named assessment period.' },
        { i: 'check', t: 'Publish status', d: 'Show the track, issue date and expiry on the seal.' },
        { i: 'eye', t: 'Verify on request', d: 'Anyone can ask the team to confirm a seal against our records.' },
        { i: 'wave', t: 'Revalidate', d: 'Reassess when evidence expires or the scope changes.' },
      ],
    },
    features: {
      id: 'features', title: 'What the seal stands for',
      items: [
        { id: 'what-it-means', i: 'shield', t: 'What a trust seal means', d: 'Completion of Ankit Global’s assessment methodology for one track at a stated point in time.', b: ['Issued by Ankit Global', 'Scope and track named', 'Validity period stated'] },
        { id: 'verification', i: 'eye', t: 'Verify status', d: 'If you’ve seen a seal and want to confirm it, ask the team and we’ll check our records.', b: ['Track, date and expiry on every seal', 'Confirm a seal with the team', 'Report an incorrect claim'] },
        { id: 'eligibility', i: 'check', t: 'Eligibility and renewal', d: 'Complete the assessment for a track; renew when evidence expires or scope changes.', b: ['Four assessment tracks', 'Evidence reviewed against the method', 'Renewal on expiry'] },
      ],
    },
    roles: {
      title: 'Useful on both sides of the trust question.',
      items: [
        { i: 'layers', t: 'Organisations', d: 'A visible signal of the assessment work behind the scenes.' },
        { i: 'users', t: 'Customers & partners', d: 'A seal you can check: track, date and expiry.' },
        { i: 'gavel', t: 'Compliance teams', d: 'A renewal cadence tied to evidence, not to a calendar.' },
      ],
    },
    closing: { prefix: 'Make sure your reputation', lead: 'Ask which track fits your organisation, or confirm a seal you’ve seen.' },
  },
};
