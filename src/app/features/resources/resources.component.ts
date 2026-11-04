import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PAGE_CONTENT } from '../../shared/content/page-content';
import { allNavLinks } from '../../shared/content/nav-links';
import { PageHeroComponent } from '../../shared/ui/page-hero.component';
import { CtaBandComponent } from '../../shared/ui/cta-band.component';
import { IconComponent } from '../../shared/ui/icon.component';

/* Topic cards for the Insights page. When real articles are published, add them here with
   status: 'Published', a date and a link (u) to the article. */
interface Insight { cat: string; title: string; text: string; status: string; u: string; img: string }
const CATS: Record<string, { name: string; imgs: string[]; u: string }> = {
  'ai-insights': { name: 'AI & automation', imgs: ['dashboard_1.jpg', 'office_glass.jpg', 'education_2.jpg'], u: '/ai' },
  'security-insights': { name: 'Cybersecurity', imgs: ['server_room_1.jpg', 'fintech_payment.jpg', 'finance_skyline.jpg'], u: '/cybersecurity' },
  'privacy-insights': { name: 'Privacy & trust', imgs: ['hero_core.jpg', 'healthcare_1.jpg', 'office_glass.jpg'], u: '/digital-trust' },
};

/**
 * Insights and Whitepapers — laid out like aishield.security/blogs and /whitepapers:
 * hero → topic tabs or search → card grid → newsletter-style block.
 */
@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [PageHeroComponent, CtaBandComponent, IconComponent],
  template: `
<main id="main" class="resources">
  @if (mode === 'insights') {
    <app-page-hero [crumbs]="[{ x: 'Resources' }, { x: 'Insights' }]" label="Insights" icon="doc"
      title="The Ankit Global insights hub."
      lead="Perspectives on AI adoption, cybersecurity, privacy and digital governance. Articles appear here with their date and author as they are published."
      [primary]="{ x: 'Run the free DPDP check', u: '/dpdp-gap-assessment' }" [secondary]="{ x: 'Whitepapers', u: '/whitepapers' }" />

    <section class="sec">
      <div class="wrap">
        <div class="tabs" role="tablist" aria-label="Topics">
          <button type="button" role="tab" class="tab" [class.on]="cat() === ''" [attr.aria-selected]="cat() === ''" (click)="cat.set('')">All topics</button>
          @for (c of catKeys; track c) {
            <button type="button" role="tab" class="tab" [class.on]="cat() === c" [attr.aria-selected]="cat() === c" (click)="cat.set(c)">{{ cats[c].name }}</button>
          }
        </div>
        <div class="grid grid--3">
          @for (p of shown(); track p.title) {
            <article class="rcard" [id]="p.cat">
              <img [src]="'/images/' + p.img" alt="" loading="lazy" width="640" height="360">
              <div class="rcard__body">
                <p class="rcard__meta"><span>{{ cats[p.cat].name }}</span><span class="status">{{ p.status }}</span></p>
                <h3>{{ p.title }}</h3>
                <p>{{ p.text }}</p>
                <a class="tlink" [href]="p.u">Explore {{ cats[p.cat].name.toLowerCase() }}</a>
              </div>
            </article>
          }
        </div>
      </div>
    </section>

    <section class="sec sec--tint">
      <div class="wrap">
        <div class="sec-head sec-head--split"><h2>Free tools and trackers</h2><p class="lead">Use these today. Nothing you enter in the readiness check leaves your browser.</p></div>
        <div class="grid grid--3">
          @for (t of tools; track t.u) {
            <a class="tile" [href]="t.u"><span class="tile__icon claim__icon"><app-icon [name]="t.i" [size]="24" /></span><h3>{{ t.t }}</h3><p>{{ t.d }}</p><span class="tile__foot tlink">{{ t.cta }}</span></a>
          }
        </div>
      </div>
    </section>

    <section class="sec" id="topic-finder">
      <div class="wrap">
        <div class="sec-head"><h2>Find a topic across the whole site.</h2><p class="lead">Search the same topics that appear in the main menu.</p></div>
        <label class="search"><app-icon name="search" [size]="20" />
          <input type="search" placeholder="Try “DPDP”, “VAPT” or “agents”" aria-label="Search topics" [value]="q()" (input)="q.set($any($event.target).value)" (keydown.enter)="openFirst()"></label>
        <p class="fine">{{ q().trim() ? results().length + ' match' + (results().length === 1 ? '' : 'es') : 'Popular topics' }}</p>
        <ul class="cp-results">@for (r of results(); track r.u + r.label) { <li><a [href]="r.u"><b>{{ r.label }}</b><small>{{ r.menu }} / {{ r.group }}</small></a></li> }</ul>
        @if (!results().length) { <p class="cp-empty">No topics match “{{ q() }}”. Try a shorter word.</p> }
      </div>
    </section>
  } @else {
    <app-page-hero [crumbs]="[{ x: 'Resources', u: '/insights' }, { x: 'Whitepapers' }]" label="Whitepapers" icon="doc"
      title="Practical guides for complex decisions."
      lead="Guides and checklists on DPDP readiness, AI security reviews and digital trust, written for the teams that have to put them into practice."
      [primary]="{ x: 'Request a guide', u: '/contact' }" [secondary]="{ x: 'Insights', u: '/insights' }" />

    <section class="sec">
      <div class="wrap">
        <h2 style="font-size:clamp(1.6rem,2.6vw,2.2rem)">Find a whitepaper you care about</h2>
        <label class="search"><app-icon name="search" [size]="20" />
          <input type="search" placeholder="Search guides" aria-label="Search whitepapers" [value]="wq()" (input)="wq.set($any($event.target).value)"></label>
        <div class="grid grid--3">
          @for (g of guides(); track g.id) {
            <article class="rcard" [id]="g.id">
              <div class="rcard__body">
                <p class="rcard__meta"><span>Guide</span><span class="status">In preparation</span></p>
                <h3>{{ g.title }}</h3>
                <p>{{ g.text.replace('In preparation: ', '') }}</p>
                <ul class="ticks">@for (b of g.bullets; track b) { <li>{{ b }}</li> }</ul>
                <a class="tlink" href="/contact">Ask for early access</a>
              </div>
            </article>
          }
        </div>
        @if (!guides().length) { <p class="empty">No guides match “{{ wq() }}”.</p> }
        <p class="note">These guides are not yet available for download. Ask for one and we’ll send it when it’s published.</p>
      </div>
    </section>
  }

  <section class="sec sec--tight">
    <div class="wrap">
      <div class="notify">
        <div><h2>Get the next guide in your inbox</h2><p>Tell us which topics matter to you and we’ll send new guides and DPDP updates as they’re published.</p></div>
        <a class="btn btn--light" href="/contact">Ask to be notified</a>
      </div>
    </div>
  </section>

  <app-cta-band lead="Have a question the guides don’t answer yet? Ask the specialists directly." />
</main>`,
})
export class ResourcesComponent {
  readonly mode = inject(ActivatedRoute).snapshot.routeConfig?.path === 'whitepapers' ? 'whitepapers' : 'insights';

  // ---- insights ----
  readonly cats = CATS;
  readonly catKeys = Object.keys(CATS);
  readonly posts: Insight[] = PAGE_CONTENT['insights'].sections.flatMap((s) =>
    s.bullets.map((b, k) => ({ cat: s.id, title: b, text: s.text, status: 'Article in preparation', u: CATS[s.id]?.u ?? '/contact', img: CATS[s.id]?.imgs[k % 3] ?? 'office_glass.jpg' }))
  );
  readonly cat = signal('');
  readonly shown = computed(() => (this.cat() ? this.posts.filter((p) => p.cat === this.cat()) : this.posts));
  readonly tools = [
    { i: 'check', t: 'DPDP gap assessment', d: 'Ten questions across five compliance areas, with an instant score and breakdown.', u: '/dpdp-gap-assessment', cta: 'Start the check' },
    { i: 'chart', t: 'DPDP readiness calculator', d: 'The same check inside our DPDP compliance guide, with the eight obligations explained.', u: '/dpdp-compliance#readiness-calculator', cta: 'Open the calculator' },
    { i: 'gavel', t: 'DPDP enforcement tracker', d: 'How we track dated, attributable primary sources on DPDP enforcement.', u: '/dpdp-enforcement-tracker', cta: 'Open the tracker' },
  ];
  private readonly links = allNavLinks();
  private readonly popular = ['DPDP Compliance', 'Avisha Trust Seal', 'DPDP Gap Assessment', 'AI Red Teaming', 'VAPT', 'CuraOS', 'Whitepapers', 'Study24by7'];
  readonly q = signal('');
  readonly results = computed(() => {
    const t = this.q().trim().toLowerCase();
    if (!t) return this.popular.map((p) => this.links.find((l) => l.label === p)).filter((l): l is NonNullable<typeof l> => !!l);
    return this.links.filter((l) => (l.label + ' ' + l.group + ' ' + l.menu).toLowerCase().includes(t)).slice(0, 12);
  });
  openFirst() { (document.querySelector('.cp-results a') as HTMLElement | null)?.click(); }

  // ---- whitepapers ----
  private readonly allGuides = PAGE_CONTENT['whitepapers'].sections;
  readonly wq = signal('');
  readonly guides = computed(() => {
    const t = this.wq().trim().toLowerCase();
    return t ? this.allGuides.filter((g) => (g.title + ' ' + g.text + ' ' + g.bullets.join(' ')).toLowerCase().includes(t)) : this.allGuides;
  });
}
