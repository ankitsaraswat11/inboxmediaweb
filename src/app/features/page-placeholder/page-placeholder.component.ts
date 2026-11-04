import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageHeroComponent } from '../../shared/ui/page-hero.component';

@Component({
  selector: 'app-page-placeholder',
  standalone: true,
  imports: [PageHeroComponent],
  template: `
<main id="main">
  <app-page-hero
    [crumbs]="[{ x: title }]" [title]="title" sub="This page is on its way."
    lead="We’re preparing this section. In the meantime, explore our DPDP compliance services or head back to the homepage."
    [primary]="{ x: 'Explore DPDP compliance', u: '/dpdp-compliance' }" [secondary]="{ x: 'Back to home', u: '/' }" />
</main>`,
})
export class PagePlaceholderComponent {
  // /ai-security  ->  "Ai Security"
  readonly title: string = (() => {
    const r = inject(ActivatedRoute).snapshot;
    const slug = r.paramMap.get('slug') ?? '';
    return r.data['title'] ?? (slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') || 'Coming soon');
  })();
}
