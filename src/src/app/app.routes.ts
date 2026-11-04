import { ResolveFn, Routes } from '@angular/router';
import { platformBySlug } from './content/platforms';

const title = (page: string) => `${page} | Inbox Media`;
const platformTitle: ResolveFn<string> = r => {
  const p = platformBySlug(r.paramMap.get('slug'));
  return p ? title(`${p.name}: ${p.descriptor}`) : title('Platforms');
};

export const routes: Routes = [
  {
    path: '',
    title: 'Inbox Media | Intelligent Infrastructure for Modern Enterprises',
    loadComponent: () => import('./pages/home.component').then(m => m.HomeComponent),
    data: { description: 'An integrated enterprise technology platform: SUTRA for omnichannel communication, MEDHA for intelligence and automation, KAVACH for digital trust, on a shared digital engineering foundation.' }
  },
  {
    path: 'platforms',
    title: title('Platforms'),
    loadComponent: () => import('./pages/platforms.component').then(m => m.PlatformsComponent),
    data: { description: 'Compare SUTRA, MEDHA and KAVACH: the communication, intelligence and trust layers of Inbox Media.' }
  },
  {
    path: 'platforms/:slug',
    title: platformTitle,
    loadComponent: () => import('./pages/platform.component').then(m => m.PlatformComponent),
    data: { description: 'Inbox Media platforms: SUTRA (communication fabric), MEDHA (intelligence engine) and KAVACH (trust fabric).' }
  },
  {
    path: 'digital-engineering',
    title: title('Digital Engineering'),
    loadComponent: () => import('./pages/engineering.component').then(m => m.EngineeringComponent),
    data: { description: 'Custom software, APIs, cloud, DevOps and IT modernisation: the shared engineering foundation under SUTRA, MEDHA and KAVACH.' }
  },
  {
    path: 'capabilities',
    title: title('Capabilities'),
    loadComponent: () => import('./pages/capabilities.component').then(m => m.CapabilitiesComponent),
    data: { description: 'Five capability domains and where each sits: communication, voice and omnichannel in SUTRA, conversational AI in MEDHA, digital engineering as the shared foundation.' }
  },
  {
    path: 'ai-solutions',
    title: title('AI Products'),
    loadComponent: () => import('./pages/ai.component').then(m => m.AiComponent),
    data: { description: 'MEDHA AI products: Aura AI, Tellco, Custom SLM, TrainExl and Edge AI. Use cases, workflows and deployment details.' }
  },
  {
    path: 'industries',
    title: title('Industries'),
    loadComponent: () => import('./pages/industries.component').then(m => m.IndustriesComponent),
    data: { description: 'Challenges, platforms, products and example workflows for BFSI, healthcare, education, ecommerce, real estate, logistics, government and telecom.' }
  },
  {
    path: 'integrations',
    title: title('Integrations & Technology'),
    loadComponent: () => import('./pages/integrations.component').then(m => m.IntegrationsComponent),
    data: { description: 'How communication channels, enterprise systems, APIs, AI agents, cloud and internal applications connect to the Inbox Media platforms.' }
  },
  {
    path: 'resources',
    title: title('Resources'),
    loadComponent: () => import('./pages/resources.component').then(m => m.ResourcesComponent),
    data: { description: 'Buyer guides, implementation checklists and use cases from Inbox Media.' }
  },
  {
    path: 'about',
    title: title('About'),
    loadComponent: () => import('./pages/about.component').then(m => m.AboutComponent),
    data: { description: 'Inbox Media: an integrated enterprise technology platform for communication, intelligence and digital trust.' }
  },
  {
    path: 'about/certifications',
    title: title('Certifications'),
    loadComponent: () => import('./pages/cert.component').then(m => m.CertComponent),
    data: { description: 'Certification details, scope and validity for Inbox Media, published once verified.' }
  },
  {
    path: 'about/why-inbox-media',
    title: title('Why Inbox Media'),
    loadComponent: () => import('./pages/why.component').then(m => m.WhyComponent),
    data: { description: 'The Inbox Media company journey and evolution of its communication and AI portfolio.' }
  },
  {
    path: 'roadmap',
    title: title('Internal Website Planning Timeline'),
    loadComponent: () => import('./pages/roadmap.component').then(m => m.RoadmapComponent),
    data: { description: 'Internal two-week planning timeline for the Inbox Media website redevelopment.' }
  },
  {
    path: 'contact',
    title: title('Contact / Book a Demo'),
    loadComponent: () => import('./pages/contact.component').then(m => m.ContactComponent),
    data: { description: 'Book a demo, request a proposal or send a message to Inbox Media.' }
  },
  { path: '**', redirectTo: '' }
];
