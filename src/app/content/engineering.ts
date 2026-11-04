/* Digital Engineering: the shared foundation under SUTRA, MEDHA and KAVACH. */
export interface EngService { name: string; text: string; area: 'build' | 'connect' | 'run' | 'scale'; }

export const ENGINEERING = {
  name: 'Digital Engineering',
  role: 'Shared Technology Foundation',
  headline: 'Built to Integrate. Engineered to Scale.',
  positioning: 'Our engineering capabilities connect, build and scale the digital infrastructure that powers communication, intelligence and enterprise trust.',
  /** How engineering enables each platform. */
  enables: {
    sutra: 'APIs and integrations connect every channel to CRMs, order systems and support desks.',
    medha: 'Cloud, DevOps and data pipelines run models and agents reliably, in the cloud or on-premise.',
    kavach: 'Secure architecture, access control and modernisation put governance into the systems themselves.'
  } as Record<'sutra' | 'medha' | 'kavach', string>,
  areas: {
    build: 'Build', connect: 'Connect', run: 'Run', scale: 'Scale'
  },
  services: [
    { name: 'Custom Software Development', text: 'Software shaped around your workflows rather than the other way round.', area: 'build' },
    { name: 'Web Application Development', text: 'Customer portals, internal tools and dashboards for the browser.', area: 'build' },
    { name: 'Mobile Application Development', text: 'Apps for customers and field teams on Android and iOS.', area: 'build' },
    { name: 'Enterprise Application Development', text: 'Line-of-business systems that hold up under enterprise load and rules.', area: 'build' },
    { name: 'Content Management Systems', text: 'Websites and content platforms your teams can update themselves.', area: 'build' },
    { name: 'API Development & Integration', text: 'APIs that connect CRMs, internal systems and the three platforms.', area: 'connect' },
    { name: 'Cloud Infrastructure', text: 'Cloud environments designed for reliability, cost and data rules.', area: 'run' },
    { name: 'DevOps', text: 'Automated builds, testing and releases for frequent, safe changes.', area: 'run' },
    { name: 'IT Modernisation', text: 'Step-by-step modernisation of legacy systems without a risky big bang.', area: 'scale' },
    { name: 'On-Demand Engineering Teams', text: 'Engineers who join your team for as long as the work needs them.', area: 'scale' }
  ] as EngService[],
  steps: [
    { t: 'Discover', d: 'Map the systems, data and rules the solution must work with.' },
    { t: 'Architect', d: 'Choose channels, AI components, hosting and controls.' },
    { t: 'Build & integrate', d: 'Develop, connect APIs and test against real workflows.' },
    { t: 'Deploy & operate', d: 'Release through DevOps pipelines and improve with usage data.' }
  ]
};
