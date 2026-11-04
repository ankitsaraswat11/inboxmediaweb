import { Component } from '@angular/core';
import { PAGE_CONTENT } from '../../shared/content/page-content';
import { PageHeroComponent } from '../../shared/ui/page-hero.component';
import { CtaBandComponent } from '../../shared/ui/cta-band.component';
import { IconComponent } from '../../shared/ui/icon.component';

const IMG: Record<string, [string, string]> = {
  'financial-services': ['finance_skyline.jpg', 'Financial district towers at dusk'],
  healthcare: ['healthcare_1.jpg', 'A hospital reception desk in a clinical corridor'],
  government: ['hero_core.jpg', 'Earth at night from orbit, with city lights across the country'],
  education: ['education_2.jpg', 'A student working through practice questions on a laptop'],
  logistics: ['dashboard_1.jpg', 'An operations dashboard on a wall display'],
  'enterprise-ops': ['office_glass.jpg', 'Glass-walled office corridor'],
};
const NAME: Record<string, string> = {
  'financial-services': 'Financial Services', healthcare: 'Healthcare', government: 'Government',
  education: 'Education', logistics: 'Logistics', 'enterprise-ops': 'Enterprise Operations',
};

/** Solutions — laid out like aishield.security/solutions: one row per industry, alternating sides. */
@Component({
  selector: 'app-solutions',
  standalone: true,
  imports: [PageHeroComponent, CtaBandComponent, IconComponent],
  template: `
<main id="main" class="solutions">
  <app-page-hero
    [crumbs]="[{ x: 'Solutions' }]" label="Industry solutions" icon="globe"
    title="Risk looks different in every sector."
    lead="Protecting AI, data and digital systems protects the business, whether you lend money, treat patients, teach students or serve citizens. Each engagement is scoped to your sector’s regulators, data and workflows."
    [primary]="{ x: 'Book a demo', u: '/book-a-demo' }" [secondary]="{ x: 'Find your sector', u: '#sectors' }">
    <ul class="chips" style="margin-top:28px">@for (s of sections; track s.id) { <li><a class="chip" [href]="'#' + s.id">{{ name[s.id] }}</a></li> }</ul>
  </app-page-hero>

  <section class="sec">
    <div class="wrap">
      <div class="sec-head sec-head--split">
        <h2>One team for every stage, in every sector.</h2>
        <p class="lead">Threats appear at every stage, from the data you collect to the systems you deploy. A weakness in one stage can compromise the whole, so AI, security and compliance are planned together from the first workshop.</p>
      </div>
    </div>
  </section>

  <section class="sec sec--tight" id="sectors" style="padding-top:0">
    <div class="wrap rows">
      @for (s of sections; track s.id) {
        <article class="row" [id]="s.id">
          <figure class="row__media"><img [src]="'/images/' + img[s.id][0]" [alt]="img[s.id][1]" loading="lazy" width="900" height="675"><figcaption>{{ name[s.id] }}</figcaption></figure>
          <div class="row__copy">
            <h2>Ankit Global <span class="row__x">×</span> {{ s.title }}</h2>
            <p>{{ s.text }}</p>
            <ul class="ticks">@for (b of s.bullets; track b) { <li>{{ b }}</li> }</ul>
            <a class="tlink" href="/contact">Discuss {{ name[s.id].toLowerCase() }}</a>
          </div>
        </article>
      }
    </div>
  </section>

  <section class="sec sec--tint">
    <div class="wrap">
      <div class="sec-head"><h2>A focused path from challenge to measurable outcome.</h2></div>
      <ol class="tl">
        @for (s of steps; track s.t; let k = $index) {
          <li class="tl__item"><span class="tl__dot"><app-icon [name]="s.i" [size]="22" /></span>
            <div class="tl__card"><span class="tl__n">Step {{ k + 1 }}</span><h3>{{ s.t }}</h3><p>{{ s.d }}</p></div></li>
        }
      </ol>
    </div>
  </section>

  <app-cta-band prefix="Make sure your sector’s data" lead="Tell us your sector and the regulator you answer to. We’ll start from your pressure point."
                [primary]="{ x: 'Book a demo', u: '/book-a-demo' }" [secondary]="{ x: 'Talk to us', u: '/contact' }" />
</main>`,
})
export class SolutionsComponent {
  readonly sections = PAGE_CONTENT['solutions'].sections;
  readonly img = IMG;
  readonly name = NAME;
  readonly steps = [
    { i: 'scan', t: 'Understand the sector', d: 'Identify the operating context, stakeholders and critical workflows.' },
    { i: 'chart', t: 'Prioritise the challenge', d: 'Rank privacy, security, automation and governance needs by impact.' },
    { i: 'layers', t: 'Shape a solution', d: 'Define scope, integrations, owners and measures of success.' },
    { i: 'check', t: 'Validate outcomes', d: 'Review evidence, adoption and opportunities for improvement.' },
  ];
}
