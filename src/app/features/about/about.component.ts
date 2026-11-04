import { Component } from '@angular/core';
import { PAGE_CONTENT } from '../../shared/content/page-content';
import { PageHeroComponent } from '../../shared/ui/page-hero.component';
import { CtaBandComponent } from '../../shared/ui/cta-band.component';
import { IconComponent } from '../../shared/ui/icon.component';

/** About — laid out like aishield.security/about-us: who we are, why we exist, values, journey, recognition. */
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [PageHeroComponent, CtaBandComponent, IconComponent],
  template: `
<main id="main" class="about">
  <app-page-hero
    [crumbs]="[{ x: 'Company' }, { x: 'About' }]" label="Who we are" icon="users"
    title="Technology works better when trust is designed in."
    lead="Ankit Global Technologies Pvt Ltd helps enterprises, banks, healthcare organisations and government departments adopt AI, automate operations, secure digital systems and establish digital trust."
    img="office_glass.jpg" alt="Glass-walled office corridor"
    [primary]="{ x: 'Talk to our team', u: '/contact' }" [secondary]="{ x: 'Book a demo', u: '/book-a-demo' }" />

  <section class="sec" id="about">
    <div class="wrap split">
      <div class="stack"><p class="kicker">Why we exist</p><p class="statement">Most AI programmes stall between the data science team, the security team and legal. We bring all three to the same table from day one.</p></div>
      <div class="stack">
        <p class="lead">{{ about.text }}</p>
        <ul class="ticks">@for (b of about.bullets; track b) { <li>{{ b }}</li> }</ul>
      </div>
    </div>
  </section>

  <section class="sec sec--tint">
    <div class="wrap">
      <div class="sec-head"><h2>To make AI and data trustworthy for India’s enterprises, we’re driven by…</h2></div>
      <ul class="values" style="--n:5">
        @for (v of values; track v.t) { <li><app-icon [name]="v.i" [size]="26" /><b>{{ v.t }}</b><span>{{ v.d }}</span></li> }
      </ul>
    </div>
  </section>

  <section class="sec">
    <div class="wrap">
      <div class="sec-head sec-head--split"><h2>How we work</h2><p class="lead">Every engagement follows the same arc, from the first conversation to the evidence that it worked.</p></div>
      <ol class="tl">
        @for (s of journey; track s.t; let k = $index) {
          <li class="tl__item"><span class="tl__dot"><app-icon [name]="s.i" [size]="22" /></span>
            <div class="tl__card"><span class="tl__n">Step {{ k + 1 }}</span><h3>{{ s.t }}</h3><p>{{ s.d }}</p></div></li>
        }
      </ol>
    </div>
  </section>

  <section class="sec sec--tint">
    <div class="wrap">
      <div class="sec-head"><h2>People, careers and partners</h2></div>
      <div class="grid grid--3">
        @for (s of team; track s.id) {
          <article class="tile" [id]="s.id">
            <h3>{{ s.title }}</h3><p>{{ s.text }}</p>
            <ul class="ticks">@for (b of s.bullets; track b) { <li>{{ b }}</li> }</ul>
            @if (s.id !== 'leadership') { <div class="tile__foot"><a class="tlink" href="/contact">Get in touch</a></div> }
          </article>
        }
      </div>
    </div>
  </section>

  <section class="sec">
    <div class="wrap">
      <div class="sec-head sec-head--center"><h2>Products we build and run ourselves</h2><p class="lead">Our advice comes from operating AI systems in production, not just recommending them.</p></div>
      <ul class="prods__grid">
        @for (p of products; track p.n) {
          <li><a class="prod" [href]="p.u">
            <span class="prod__seal" aria-hidden="true"><svg viewBox="0 0 120 120"><circle class="seal-out" cx="60" cy="60" r="57" /><circle class="seal-in" cx="60" cy="60" r="46" /></svg><i>{{ p.m }}</i></span>
            <b>{{ p.n }}</b><span>{{ p.d }}</span>
          </a></li>
        }
      </ul>
    </div>
  </section>

  <app-cta-band lead="Talk to the people who will design, test and govern your AI systems." />
</main>`,
})
export class AboutComponent {
  private readonly s = PAGE_CONTENT['about'].sections;
  readonly about = this.s.find((x) => x.id === 'about')!;
  readonly team = this.s.filter((x) => x.id !== 'about');
  readonly values = [
    { i: 'layers', t: 'One team', d: 'AI, security and compliance under one roof. Nothing falls between vendors.' },
    { i: 'cpu', t: 'Product-backed', d: 'We run CuraOS, Study24by7 and Avisha Trust ourselves.' },
    { i: 'gavel', t: 'Built for India', d: 'DPDP, RBI, IRDAI and SEBI expectations shape every design.' },
    { i: 'hand', t: 'Human-in-the-loop', d: 'High-risk actions get a human checkpoint by default.' },
    { i: 'doc', t: 'Evidence over claims', d: 'Documentation, logs and controls that stand up to an auditor.' },
  ];
  readonly journey = [
    { i: 'users', t: 'Listen', d: 'Understand the organisation, context and goals before prescribing a solution.' },
    { i: 'target', t: 'Align', d: 'Agree on priorities, ownership, constraints and success measures.' },
    { i: 'layers', t: 'Deliver', d: 'Work through scoped activities with clear communication and evidence.' },
    { i: 'chart', t: 'Learn', d: 'Review outcomes and use feedback to guide what comes next.' },
  ];
  readonly products = [
    { m: 'C+', n: 'CuraOS', d: 'AI-native EHR, two years in production', u: '/products-curaos' },
    { m: 'AT', n: 'Avisha Trust', d: 'Consent, rights requests and evidence in one place', u: '/digital-trust#avisha-trust' },
    { m: 'TS', n: 'Avisha Trust Seal', d: 'Scoped, dated and backed by a defined assessment', u: '/trust-seal' },
    { m: 'S24', n: 'Study24by7', d: 'AI-native learning for students and teachers', u: '/products-study24by7' },
  ];
}
