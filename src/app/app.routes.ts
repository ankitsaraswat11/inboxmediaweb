import { ResolveFn, Routes } from '@angular/router';
import { platformBySlug } from './data';

const title = (page: string) => `${page} | Inbox Media`;
const platformTitle: ResolveFn<string> = r => { const p = platformBySlug(r.paramMap.get('slug')); return p ? title(`${p.name}: ${p.descriptor}`) : title('Platforms'); };

export const routes: Routes = [
  {
    path: '',
    title: 'Inbox Media | SUTRA, MEDHA & KAVACH: The Connected Enterprise Technology Platform',
    loadComponent: () => import('./pages/home.component').then(m => m.HomeComponent),
    data: { description: 'Three platforms, one connected enterprise: SUTRA for omnichannel communication, MEDHA for intelligence and automation, and KAVACH for digital trust, security and compliance.' }
  },
  {
    path: 'platforms/:slug',
    title: platformTitle,
    loadComponent: () => import('./pages/platform.component').then(m => m.PlatformComponent),
    data: { description: 'Inbox Media platforms: SUTRA (communication fabric), MEDHA (intelligence engine) and KAVACH (trust fabric).' }
  },
  { path: 'platforms', redirectTo: 'platforms/sutra', pathMatch: 'full' },
  {
    path: 'capabilities',
    title: title('Capabilities'),
    loadComponent: () => import('./pages/capabilities.component').then(m => m.CapabilitiesComponent),
    data: { description: 'Five capability domains: communication infrastructure, voice and telephony, conversational AI, omnichannel engagement and digital engineering.' }
  },
  {
    path: 'ai-solutions',
    title: title('AI Solutions'),
    loadComponent: () => import('./pages/ai.component').then(m => m.AiComponent),
    data: { description: 'Aura AI, Tellco, Custom SLM, TrainExl, Edge AI and ISO 42001 readiness: use cases, workflows and deployment details.' }
  },
  {
    path: 'industries',
    title: title('Industries'),
    loadComponent: () => import('./pages/industries.component').then(m => m.IndustriesComponent),
    data: { description: 'Explore illustrative communication and AI workflows for BFSI, healthcare, education, ecommerce, real estate, logistics, government and telecom.' }
  },
  {
    path: 'integrations',
    title: title('Integrations & Technology'),
    loadComponent: () => import('./pages/integrations.component').then(m => m.IntegrationsComponent),
    data: { description: 'How business systems, communication channels, AI agents and analytics can connect.' }
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
    data: { description: 'Inbox Media: enterprise communication infrastructure, AI automation and digital engineering.' }
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
