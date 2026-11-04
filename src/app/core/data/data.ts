// Live site ka address: sirf purane absolute links pehchanne ke liye
export const SITE = 'https://avishaglobal.com/';

// Kisi bhi link (live-site wala ya '/...' wala) ko router ke path me badalta hai.
// Router wala link na ho (image, mailto, bahar ki site) to null deta hai.
export function toRoute(raw: string): string | null {
  let rest: string;
  if (raw.startsWith(SITE)) rest = raw.slice(SITE.length);
  else if (raw.startsWith('/') && !raw.startsWith('//')) rest = raw.slice(1);
  else return null;
  const [p, f] = rest.split('#');
  const slug = p.replace(/\.html$/, '').replace(/\/$/, '');
  if (slug.includes('.') || slug.includes('/')) return null; // image, file, nested path
  return '/' + (slug === 'index' ? '' : slug) + (f ? '#' + f : '');
}

/* ------------------------------------------------------------------
   Company details shown in the footer.
   Fill these in — anything left empty is simply not shown.
   ------------------------------------------------------------------ */
export const COMPANY = {
  name: 'Ankit Global',
  legal: 'Ankit Global Technologies Pvt Ltd',
  tagline: 'AI security & digital trust',
  about:
    'Ankit Global helps enterprises, banks, healthcare organizations and government departments adopt AI, automate operations, secure digital systems and establish digital trust.',
  address: '', // e.g. 'Floor, Building, Area, City, State, India'
  emails: [] as string[], // e.g. ['hello@yourdomain.com', 'security@yourdomain.com']
  linkedin: '', // e.g. 'https://www.linkedin.com/company/your-page'
};

/* ------------------------------------------------------------------
   Page themes. Routes listed here render dark (header included);
   every other route renders light. Change a page's look by editing this list.
   ------------------------------------------------------------------ */
export const DARK_PAGES = new Set([
  'ai', 'ai-security', 'cybersecurity', 'responsible-ai', 'trust-seal', 'solutions', 'book-a-demo',
]);
export const isDarkRoute = (url: string) => DARK_PAGES.has(url.split(/[?#]/)[0].replace(/^\//, '').replace(/\/$/, ''));

/* ------------------------------------------------------------------
   Main navigation (mega menu)
   ------------------------------------------------------------------ */
export interface NavLink { x: string; u: string; d?: string }
export interface NavGroup { n: string; h?: string; l: NavLink[] }
export interface NavFeature { img: string; alt: string; title: string; text: string; u: string; cta: string }
export interface NavItem { t: string; h?: string; g: NavGroup[]; f?: NavFeature }

export const NAV: NavItem[] = [
  {
    t: 'Services',
    g: [
      { n: 'AI', h: '/ai', l: [
        { x: 'AI Consulting', u: '/ai#consulting' },
        { x: 'AI Transformation', u: '/ai#transformation' },
        { x: 'Enterprise AI Agents', u: '/ai#agents' },
        { x: 'Document & Process Automation', u: '/ai#automation' },
        { x: 'Generative AI', u: '/ai#generative' },
        { x: 'Private / Enterprise AI', u: '/ai#private-ai' },
        { x: 'AI Integration', u: '/ai#integration' },
        { x: 'Managed AI Operations', u: '/ai#managed-ai' },
      ] },
      { n: 'AI Security', h: '/ai-security', l: [
        { x: 'LLM Security', u: '/ai-security#llm-security' },
        { x: 'AI Red Teaming', u: '/ai-security#red-teaming' },
        { x: 'Prompt Injection Testing', u: '/ai-security#prompt-injection' },
        { x: 'Model Risk Assessment', u: '/ai-security#model-risk' },
        { x: 'AI Application Security', u: '/ai-security#app-security' },
        { x: 'AI Governance', u: '/digital-trust#ai-governance' },
      ] },
      { n: 'Cybersecurity', h: '/cybersecurity', l: [
        { x: 'VAPT', u: '/cybersecurity#vapt' },
        { x: 'Cloud Security', u: '/cybersecurity#cloud-security' },
        { x: 'Application Security', u: '/cybersecurity#app-security' },
        { x: 'API Security', u: '/cybersecurity#api-security' },
        { x: 'Security Assessment', u: '/cybersecurity#assessment' },
        { x: 'Managed Security', u: '/cybersecurity#managed-security' },
      ] },
      { n: 'Digital Trust', h: '/digital-trust', l: [
        { x: 'DPDP Compliance', u: '/dpdp-compliance' },
        { x: 'Privacy Management', u: '/digital-trust#privacy' },
        { x: 'Consent Management', u: '/digital-trust#consent' },
        { x: 'Data Governance', u: '/digital-trust#data-governance' },
        { x: 'Vendor Risk', u: '/digital-trust#vendor-risk' },
      ] },
    ],
  },
  {
    t: 'Products',
    g: [
      { n: 'Platforms', l: [
        { x: 'CuraOS', u: '/products-curaos', d: 'Agentic healthcare operating system and AI-native EHR' },
        { x: 'Avisha Trust', u: '/digital-trust#avisha-trust', d: 'Consent records, rights requests and audit evidence in one place' },
        { x: 'Avisha Trust Seal', u: '/trust-seal', d: 'Scoped, dated seals backed by a defined assessment' },
        { x: 'Study24by7', u: '/products-study24by7', d: 'AI-native learning for students, teachers and institutions' },
      ] },
      { n: 'Inside the products', l: [
        { x: 'CuraOS hospital modules', u: '/products-curaos#modules' },
        { x: 'Clinical workflows', u: '/products-curaos#clinical-workflows' },
        { x: 'Education AI', u: '/products-study24by7#education-ai' },
        { x: 'AI automation platform', u: '/ai#automation' },
      ] },
    ],
    f: {
      img: 'healthcare_1.jpg', alt: 'A clinician reviewing a patient record on a tablet',
      title: 'CuraOS', text: 'Our AI-native EHR, two years in production across clinics, hospitals and diagnostics centres.',
      u: '/products-curaos', cta: 'Explore CuraOS',
    },
  },
  {
    t: 'Solutions', h: '/solutions',
    g: [
      { n: 'Regulated sectors', l: [
        { x: 'Financial Services', u: '/solutions#financial-services' },
        { x: 'Healthcare', u: '/solutions#healthcare' },
        { x: 'Government', u: '/solutions#government' },
      ] },
      { n: 'Operational sectors', l: [
        { x: 'Education', u: '/solutions#education' },
        { x: 'Logistics & Warehousing', u: '/solutions#logistics' },
        { x: 'Enterprise Operations', u: '/solutions#enterprise-ops' },
      ] },
    ],
    f: {
      img: 'finance_skyline.jpg', alt: 'Financial district towers at dusk',
      title: 'Solutions by sector', text: 'Each engagement is scoped to your sector’s regulators, data and workflows.',
      u: '/solutions', cta: 'See all sectors',
    },
  },
  {
    t: 'Resources', h: '/insights',
    g: [
      { n: 'Read', l: [
        { x: 'Articles & Perspectives', u: '/insights' },
        { x: 'Whitepapers', u: '/whitepapers' },
        { x: 'DPDP Enforcement Tracker', u: '/dpdp-enforcement-tracker' },
      ] },
      { n: 'Free tools', l: [
        { x: 'DPDP Gap Assessment', u: '/dpdp-gap-assessment' },
        { x: 'DPDP Readiness Calculator', u: '/dpdp-compliance#readiness-calculator' },
      ] },
    ],
    f: {
      img: 'office_glass.jpg', alt: 'Glass-walled office corridor',
      title: 'Free DPDP readiness check', text: 'Ten questions, five compliance areas and an instant score. Nothing leaves your browser.',
      u: '/dpdp-gap-assessment', cta: 'Start the check',
    },
  },
  {
    t: 'Company', h: '/about',
    g: [
      { n: 'Company', l: [
        { x: 'About Ankit Global', u: '/about#about' },
        { x: 'Leadership', u: '/about#leadership' },
        { x: 'Responsible AI', u: '/responsible-ai' },
      ] },
      { n: 'Work with us', l: [
        { x: 'Careers', u: '/about#careers' },
        { x: 'Partners', u: '/about#partners' },
        { x: 'Contact us', u: '/contact' },
        { x: 'Book a demo', u: '/book-a-demo' },
      ] },
    ],
    f: {
      img: 'dashboard_1.jpg', alt: 'An operations dashboard on a wall display',
      title: 'Talk to an expert', text: 'AI, security and compliance specialists in one conversation.',
      u: '/book-a-demo', cta: 'Book a demo',
    },
  },
];

/* ------------------------------------------------------------------
   Footer columns
   ------------------------------------------------------------------ */
const col = (t: string, l: [string, string][]) => ({ t, l: l.map(([x, u]) => ({ x, u })) });
export const FOOT = [
  col('Services', [['AI', '/ai'], ['AI Security', '/ai-security'], ['Cybersecurity', '/cybersecurity'], ['Digital Trust', '/digital-trust'], ['DPDP Compliance', '/dpdp-compliance']]),
  col('Solutions', [['Financial Services', '/solutions#financial-services'], ['Healthcare', '/solutions#healthcare'], ['Government', '/solutions#government'], ['Education', '/solutions#education'], ['Logistics', '/solutions#logistics']]),
  col('Products', [['CuraOS', '/products-curaos'], ['Avisha Trust', '/digital-trust#avisha-trust'], ['Trust Seal', '/trust-seal'], ['Study24by7', '/products-study24by7']]),
  col('Resources', [['Insights', '/insights'], ['Whitepapers', '/whitepapers'], ['Enforcement Tracker', '/dpdp-enforcement-tracker'], ['DPDP Gap Assessment', '/dpdp-gap-assessment']]),
  col('Company', [['About', '/about#about'], ['Careers', '/about#careers'], ['Partners', '/about#partners'], ['Responsible AI', '/responsible-ai'], ['Contact us', '/contact'], ['Book a demo', '/book-a-demo']]),
];
