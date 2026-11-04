import { Component, ElementRef, OnDestroy, afterNextRender, inject, signal, viewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReadinessComponent } from '../../shared/readiness/readiness.component';
import { PAGE_CONTENT } from '../../shared/content/page-content';
import { Crumb, PageHeroComponent } from '../../shared/ui/page-hero.component';
import { CtaBandComponent } from '../../shared/ui/cta-band.component';
import { CurvesComponent } from '../../shared/ui/curves.component';

const IMG: Record<string, [string, string]> = {
  'dpdp-gap-assessment': ['fintech_payment.jpg', 'Customer entering card details at a laptop'],
  'dpdp-enforcement-tracker': ['finance_skyline.jpg', 'Financial district towers at dusk'],
};
const NAME: Record<string, string> = {
  'dpdp-gap-assessment': 'DPDP Gap Assessment', 'dpdp-enforcement-tracker': 'Enforcement Tracker',
  security: 'Security', 'privacy-policy': 'Privacy policy', terms: 'Terms of use', 'cookie-policy': 'Cookie policy',
};
const LEGAL = ['privacy-policy', 'terms', 'cookie-policy', 'security'];

/** DPDP tool pages and legal pages, driven by PAGE_CONTENT[slug]. */
@Component({
  selector: 'app-content-page',
  standalone: true,
  imports: [ReadinessComponent, PageHeroComponent, CtaBandComponent, CurvesComponent],
  template: `
<main id="main" class="content-page">
  <app-page-hero [crumbs]="crumbs" [title]="page.title" [sub]="page.accent" [lead]="page.intro" [img]="img[0]" [alt]="img[1]"
    [primary]="{ x: page.cta, u: '/contact' }" [secondary]="legal ? null : { x: 'Explore this page', u: '#page-sections' }" />

  <section class="sec" id="page-sections">
    <div class="wrap">
      <div class="sec-head sec-head--split"><h2>{{ heading }}</h2><p class="lead">{{ sublead }}</p></div>
      <div class="grid grid--3">
        @for (s of page.sections; track s.id) {
          <article class="tile" [id]="s.id"><h3>{{ s.title }}</h3><p>{{ s.text }}</p>
            @if (s.bullets.length) { <ul class="ticks">@for (b of s.bullets; track b) { <li>{{ b }}</li> }</ul> }</article>
        }
      </div>
      @if (page.note) { <p class="note"><strong>Note:</strong> {{ page.note }}</p> }
    </div>
  </section>

  @if (slug === 'dpdp-gap-assessment') {
    <section class="band" id="readiness-tool">
      <div class="band__glow" aria-hidden="true"></div>
      <app-curves class="band__art on-dark" [cx]="500" [cy]="500" [start]="80" [step]="56" [count]="9" />
      <div class="wrap on-dark">
        <div class="sec-head sec-head--center"><p class="kicker">Free tool</p><h2>Try the DPDP readiness check.</h2>
          <p class="lead">Ten questions across five compliance areas. Your score and a category-by-category breakdown appear immediately, and nothing is sent anywhere.</p></div>
        <app-readiness />
      </div>
    </section>
  }

  @if (!legal) {
    <section class="sec journey" #journey>
      <div class="wrap">
        <div class="sec-head"><h2>{{ slug === 'dpdp-gap-assessment' ? 'Build a repeatable privacy-readiness programme.' : 'Make every entry traceable.' }}</h2></div>
        <div class="rail rail--full" [style.--n]="steps.length">
          @for (s of steps; track s.t; let i = $index) {
            <button type="button" class="rail__tab" [class.on]="i === jstep()" [class.done]="i < jstep()" (click)="jset(i)" (mouseenter)="jset(i)">
              <span class="rail__count">{{ i + 1 }}/{{ steps.length }}</span><span class="rail__name">{{ s.t }}</span><span class="rail__line">{{ s.d }}</span>
            </button>
          }
        </div>
      </div>
    </section>
  }

  <app-cta-band [prefix]="legal ? 'Make sure your data' : 'Make sure your customer data'"
    [lead]="legal ? 'Questions about this page? Contact the team and we will route your question to the right person.' : 'Start with a scoped two-week gap assessment, or talk to the team first.'" />
</main>`,
})
export class ContentPageComponent implements OnDestroy {
  readonly slug = inject(ActivatedRoute).snapshot.routeConfig?.path ?? 'privacy-policy';
  readonly page = PAGE_CONTENT[this.slug] ?? PAGE_CONTENT['privacy-policy'];
  readonly legal = LEGAL.includes(this.slug);
  readonly img = IMG[this.slug] ?? ['', ''];
  readonly crumbs: Crumb[] = [this.legal ? { x: 'Legal' } : { x: 'Resources', u: '/insights' }, { x: NAME[this.slug] ?? this.page.title }];
  readonly heading = this.slug === 'dpdp-gap-assessment' ? 'Turn obligations into practical workstreams.' : this.slug === 'dpdp-enforcement-tracker' ? 'How the tracker works.' : 'The details';
  readonly sublead = this.legal ? 'Plain-language summaries. Contact the team if anything is unclear.' : 'Organise ownership, evidence and follow-up without treating a checklist as legal certification.';
  readonly steps = this.slug === 'dpdp-gap-assessment'
    ? [{ t: 'Map personal data', d: 'Document data categories, purposes, systems and responsible owners.' }, { t: 'Identify gaps', d: 'Review notices, rights handling, retention, security and governance.' }, { t: 'Assign actions', d: 'Set owners, target dates and evidence for priority improvements.' }, { t: 'Review progress', d: 'Track completion and revisit controls as processing changes.' }]
    : [{ t: 'Find the source', d: 'Only dated, attributable primary sources are considered.' }, { t: 'Record it', d: 'Source link, publication date and document reference for every entry.' }, { t: 'Explain it', d: 'Our summary kept separate from the source’s own wording.' }, { t: 'Correct it', d: 'Corrections and feedback handled through the contact page.' }];

  readonly jstep = signal(0);
  private journeyEl = viewChild<ElementRef<HTMLElement>>('journey');
  private io?: IntersectionObserver;
  private timer?: ReturnType<typeof setInterval>;
  jset(i: number) { clearInterval(this.timer); this.jstep.set(i); }

  constructor() {
    afterNextRender(() => {
      const el = this.journeyEl()?.nativeElement;
      if (!el) return;
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) { this.jstep.set(this.steps.length - 1); return; }
      this.io = new IntersectionObserver(([e]) => {
        if (!e.isIntersecting) return;
        this.io?.disconnect();
        let i = 0;
        this.timer = setInterval(() => { i++; this.jstep.set(Math.min(i, this.steps.length - 1)); if (i >= this.steps.length - 1) clearInterval(this.timer); }, 1000);
      }, { threshold: 0.35 });
      this.io.observe(el);
    });
  }
  ngOnDestroy(): void { this.io?.disconnect(); clearInterval(this.timer); }
}
