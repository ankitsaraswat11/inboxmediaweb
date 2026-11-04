import { Component, DestroyRef, ElementRef, afterNextRender, inject, signal, viewChild } from '@angular/core';
import { CurvesComponent } from '../../shared/ui/curves.component';
import { COMPLETE, CycleWordComponent } from '../../shared/ui/cycle-word.component';
import { IconComponent } from '../../shared/ui/icon.component';
import { CtaBandComponent } from '../../shared/ui/cta-band.component';

const reduced = () => typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CurvesComponent, CycleWordComponent, IconComponent, CtaBandComponent],
  template: `
<main id="main" class="home">

  <!-- 1. HERO -->
  <section class="hero">
    <app-curves class="hero__art" [cx]="640" [cy]="380" [draw]="true" />
    <div class="wrap hero__in">
      <h1 class="hero__title"><span class="hero__l1">The <app-cycle-word [words]="complete" /></span> AI-Security &amp; Digital Trust Fabric.</h1>
      <div class="hero__foot">
        <p class="lead">Ankit Global helps Indian enterprises deploy AI securely, automate complex operations and prove compliance across data, applications and infrastructure.</p>
        <div class="btn-row">
          <a class="btn btn--primary" href="/book-a-demo">Book a demo</a>
          <a class="btn btn--ghost" href="#lifecycle">See how it works</a>
        </div>
      </div>
      <a class="hero__banner" href="/dpdp-gap-assessment">
        <div class="hero__banner-copy">
          <span class="hero__tag">Free tool</span>
          <b>Know your DPDP gaps before a regulator or a customer does.</b>
          <span class="hero__banner-text">Ten questions across five compliance areas. An instant score, and nothing leaves your browser.</span>
          <span class="tlink tlink--light">Start the readiness check</span>
        </div>
        <img src="/images/hero_core.jpg" alt="" width="900" height="560" fetchpriority="high">
      </a>
    </div>
  </section>

  <!-- 2. LIFECYCLE -->
  <section class="sec life" id="lifecycle" #life>
    <div class="wrap">
      <div class="sec-head sec-head--split">
        <h2>Securing your AI and data estate across the entire lifecycle.</h2>
        <p class="lead">End-to-end assurance for every model, dataset and application, from the first assessment to audit-ready evidence.</p>
      </div>
      <div class="rail" role="tablist" aria-label="Lifecycle stages" [style.--n]="stages.length">
        @for (s of stages; track s.name; let i = $index) {
          <button type="button" role="tab" class="rail__tab" id="stage-tab-{{ i }}"
                  [class.on]="stage() === i" [class.running]="stage() === i && lifeRunning()" [class.done]="i < stage()"
                  [attr.aria-selected]="stage() === i" aria-controls="stage-panel" [style.--dur]="lifeMs + 'ms'"
                  (click)="pickStage(i)" (animationend)="nextStage()">
            <span class="rail__count">{{ i + 1 }}/{{ stages.length }}</span>
            <span class="rail__name">{{ s.name }}</span>
            <span class="rail__line">{{ s.line }}</span>
          </button>
        }
      </div>
      @for (s of stages; track s.name; let k = $index) {
        @if (k === stage()) {
          <div class="life__panel" id="stage-panel" role="tabpanel" [attr.aria-labelledby]="'stage-tab-' + k">
            <div class="life__copy">
              <h3>{{ s.title }}</h3>
              <p class="lead">{{ s.text }}</p>
              <ul class="life__links">@for (l of s.links; track l.u) { <li><a class="tlink" [href]="l.u">{{ l.x }}</a></li> }</ul>
            </div>
            <div class="life__out">
              <p class="life__out-h">What you get</p>
              <ul>@for (d of s.outputs; track d) { <li><app-icon name="doc" [size]="20" />{{ d }}</li> }</ul>
            </div>
          </div>
        }
      }
    </div>
  </section>

  <!-- 3. STANDARDS (validate) -->
  <section class="std" aria-labelledby="std-h">
    <div class="wrap std__in">
      <p class="std__lead"><b id="std-h">Validated against the frameworks your auditors already use.</b>Every finding and control maps to Indian regulation and global security standards.</p>
      <ul class="std__list">@for (f of frameworks; track f) { <li>{{ f }}</li> }</ul>
    </div>
  </section>

  <!-- 4. INTEGRATIONS + THREATS -->
  <section class="sec integ">
    <div class="wrap">
      <div class="sec-head sec-head--split">
        <h2>Works within the stack you already run.</h2>
        <p class="lead">No rip-and-replace. We assess, test and monitor AI systems across your clouds, model providers and code platforms.</p>
      </div>
      <ul class="integ__stack" aria-label="Platforms we work across">
        @for (p of platforms; track p.n) { <li><b>{{ p.n }}</b><small>{{ p.k }}</small></li> }
      </ul>
      <div class="threats">
        <h3 class="threats__h">Risks we find and fix at every stage</h3>
        <div class="threats__grid">
          @for (g of threats; track g.stage) {
            <div class="threats__col">
              <h4>{{ g.stage }}</h4>
              <ul>@for (t of g.items; track t.n) { <li><span class="threats__ic"><app-icon [name]="t.i" [size]="19" /></span>{{ t.n }}</li> }</ul>
            </div>
          }
        </div>
      </div>
    </div>
  </section>

  <!-- 5. DARK BAND -->
  <section class="band">
    <div class="band__glow" aria-hidden="true"></div>
    <app-curves class="band__art on-dark" [cx]="500" [cy]="500" [start]="80" [step]="56" [count]="9" />
    <div class="wrap on-dark">
      <div class="sec-head">
        <h2>One team for every layer of digital trust.</h2>
        <p class="lead">Most AI programmes stall between data science, security and legal. We bring all three to the same table from day one, and stay on after go-live.</p>
      </div>
      <div class="claims">
        @for (c of claims; track c.t) {
          <div class="claim"><span class="claim__icon"><app-icon [name]="c.i" [size]="26" /></span><div><h3>{{ c.t }}</h3><p>{{ c.d }}</p></div></div>
        }
      </div>
      <div class="btn-row band__cta"><a class="btn btn--light" href="/book-a-demo">See Ankit Global in action</a></div>
    </div>
  </section>

  <!-- 6. SECTOR SLIDER -->
  <section class="sec sectors" #sectors>
    <div class="wrap">
      <div class="sec-head sec-head--split">
        <h2>Built for sectors where trust is non-negotiable.</h2>
        <p class="lead">Each sector has its own regulator, its own data and its own pressure point. We start there, not from a generic template.</p>
      </div>
      <div class="slider" aria-roledescription="carousel" aria-label="Sectors"
           (mouseenter)="hold.set(true)" (mouseleave)="hold.set(false)" (focusin)="hold.set(true)" (focusout)="hold.set(false)">
        @for (s of slides; track s.sector; let k = $index) {
          @if (k === slide()) {
            <article class="slide" aria-roledescription="slide" [attr.aria-label]="(k + 1) + ' of ' + slides.length">
              <img class="slide__img" [src]="'/images/' + s.img" [alt]="s.alt" width="900" height="675" loading="lazy">
              <div class="slide__copy">
                <p class="kicker">{{ s.sector }}</p>
                <h3>{{ s.title }}</h3>
                <p>{{ s.text }}</p>
                <a class="tlink" [href]="s.u">{{ s.cta }}</a>
              </div>
            </article>
          }
        }
        <div class="slider__ctrl">
          <span class="slider__count" aria-live="polite">{{ pad(slide() + 1) }} / {{ pad(slides.length) }}</span>
          <button type="button" class="slider__btn" (click)="go(-1)" aria-label="Previous sector"><app-icon name="arrowL" [size]="20" /></button>
          <button type="button" class="slider__btn" (click)="go(1)" aria-label="Next sector"><app-icon name="arrowR" [size]="20" /></button>
        </div>
      </div>
    </div>
  </section>

  <!-- 7. MARQUEE -->
  <section class="marq" aria-labelledby="marq-h">
    <p class="wrap marq__label" id="marq-h">Built for the teams that run India’s banks, hospitals, schools and public services</p>
    <div class="marq__track">
      <ul>@for (s of sectorsList; track s) { <li>{{ s }}</li> }</ul>
      <ul aria-hidden="true">@for (s of sectorsList; track s) { <li>{{ s }}</li> }</ul>
    </div>
  </section>

  <!-- 8. PRODUCTS (recognition grid) -->
  <section class="sec sec--tint prods">
    <div class="wrap">
      <div class="sec-head sec-head--center">
        <h2>Leading by example, with products we run ourselves.</h2>
        <p class="lead">Our advice comes from operating AI systems in production, not just recommending them.</p>
      </div>
      <ul class="prods__grid">
        @for (p of products; track p.n) {
          <li><a class="prod" [href]="p.u">
            <span class="prod__seal" aria-hidden="true">
              <svg viewBox="0 0 120 120"><circle class="seal-out" cx="60" cy="60" r="57" /><circle class="seal-in" cx="60" cy="60" r="46" /></svg>
              <i>{{ p.m }}</i>
            </span>
            <b>{{ p.n }}</b>
            <span>{{ p.d }}</span>
          </a></li>
        }
      </ul>
    </div>
  </section>

  <!-- 9. CLOSING CTA -->
  <app-cta-band [secondary]="{ x: 'Run the free DPDP check', u: '/dpdp-gap-assessment' }" />
</main>`,
})
export class HomeComponent {
  readonly complete = COMPLETE;

  // ---- lifecycle ----
  readonly stages = [
    {
      name: 'Assess', line: 'Find exposure early',
      title: 'Find the gaps before they find you.',
      text: 'Map where personal data and AI models actually live, then score your exposure against DPDP obligations and AI risk.',
      links: [{ x: 'DPDP gap assessment', u: '/dpdp-gap-assessment' }, { x: 'Model risk assessment', u: '/ai-security#model-risk' }, { x: 'Security assessment', u: '/cybersecurity#assessment' }],
      outputs: ['A data map of every system, vendor and flow that touches personal data', 'A scored gap report, ranked by exposure', 'An inventory of AI use cases, models and owners'],
    },
    {
      name: 'Test', line: 'Break it before go-live',
      title: 'Break it in a lab, not in production.',
      text: 'Authorised adversarial testing of LLM apps, agents, APIs and infrastructure before anything touches production data.',
      links: [{ x: 'AI red teaming', u: '/ai-security#red-teaming' }, { x: 'Prompt injection testing', u: '/ai-security#prompt-injection' }, { x: 'VAPT', u: '/cybersecurity#vapt' }],
      outputs: ['Evidence-led findings with severity ratings', 'Remediation guidance your engineers can act on', 'A retest plan to confirm the fixes hold'],
    },
    {
      name: 'Monitor', line: 'Keep watch at runtime',
      title: 'Keep watch after go-live.',
      text: 'Managed security and managed AI operations track quality, access, cost and compliance continuously, not once a year.',
      links: [{ x: 'Managed security', u: '/cybersecurity#managed-security' }, { x: 'Managed AI operations', u: '/ai#managed-ai' }, { x: 'Consent management', u: '/digital-trust#consent' }],
      outputs: ['Monitoring and escalation runbooks', 'Quality, latency and cost tracking for AI systems', 'Quarterly control reviews as data flows change'],
    },
    {
      name: 'Validate', line: 'Prove it on request',
      title: 'Prove it to an auditor in minutes.',
      text: 'Reporting and evidence mapped to DPDP, sector regulators and global standards, captured continuously in Avisha Trust.',
      links: [{ x: 'Avisha Trust', u: '/digital-trust#avisha-trust' }, { x: 'Trust Seal', u: '/trust-seal' }, { x: 'AI governance', u: '/digital-trust#ai-governance' }],
      outputs: ['An evidence store of policies, consent records and rights requests', 'A scoped, dated Avisha Trust Seal', 'Board-ready reporting on posture and progress'],
    },
  ];
  readonly lifeMs = 7000;
  readonly stage = signal(0);
  readonly lifeRunning = signal(false);
  pickStage(i: number) { this.lifeRunning.set(false); this.stage.set(i); }
  nextStage() { if (this.lifeRunning()) this.stage.update((n) => (n + 1) % this.stages.length); }

  // ---- standards & stack ----
  readonly frameworks = ['DPDP Act, 2023', 'CERT-In Directions', 'RBI IT Governance', 'ISO/IEC 27001', 'ISO/IEC 42001', 'NIST AI RMF', 'OWASP Top 10 for LLMs', 'MITRE ATLAS'];
  readonly platforms = [
    { n: 'AWS', k: 'Cloud' }, { n: 'Microsoft Azure', k: 'Cloud' }, { n: 'Google Cloud', k: 'Cloud' }, { n: 'Hugging Face', k: 'Models' },
    { n: 'OpenAI', k: 'Models' }, { n: 'GitHub', k: 'Code and pipelines' }, { n: 'On-premises', k: 'Your data centre' }, { n: 'Air-gapped', k: 'Private AI' },
  ];
  readonly threats = [
    { stage: 'Assess', items: [{ n: 'Shadow AI', i: 'ghost' }, { n: 'Unmapped personal data', i: 'database' }, { n: 'Supply-chain compromise', i: 'box' }, { n: 'Unvetted models', i: 'cpu' }, { n: 'Over-retained records', i: 'doc' }] },
    { stage: 'Test', items: [{ n: 'Prompt injection', i: 'bolt' }, { n: 'Jailbreaks', i: 'key' }, { n: 'Sensitive data leakage', i: 'eye' }, { n: 'Excessive agency', i: 'hand' }, { n: 'Broken access control', i: 'lock' }] },
    { stage: 'Monitor', items: [{ n: 'Model drift', i: 'wave' }, { n: 'Consent violations', i: 'alert' }, { n: 'Insider misuse', i: 'user' }, { n: 'Anomalous access', i: 'scan' }, { n: 'Runaway AI spend', i: 'coin' }] },
  ];

  // ---- dark band ----
  readonly claims = [
    { i: 'layers', t: 'AI, security and compliance under one roof', d: 'The people who design your agents also test them and map them to DPDP obligations. Nothing falls between vendors.' },
    { i: 'gavel', t: 'Built for India’s regulatory stack', d: 'DPDP, RBI, IRDAI, SEBI and CERT-In expectations shape data flows, retention and evidence from the first workshop.' },
    { i: 'hand', t: 'Human-in-the-loop by default', d: 'High-risk or irreversible actions get a human checkpoint. Autonomy is earned per workflow, not assumed.' },
    { i: 'server', t: 'Deploy where your data lives', d: 'Cloud, on-premises or private AI inside your own boundary, chosen for your data and risk requirements.' },
  ];

  // ---- sectors slider ----
  readonly slides = [
    {
      sector: 'Financial services', img: 'finance_skyline.jpg', alt: 'Financial district towers at dusk',
      title: 'Making AI trustworthy for regulated lending.',
      text: 'Banks, NBFCs, fintechs and insurers must keep KYC records for years and honour erasure requests at the same time. We reconcile RBI, IRDAI and SEBI retention with DPDP rights, element by element, and test the AI that sits on top.',
      u: '/solutions#financial-services', cta: 'Explore financial services',
    },
    {
      sector: 'Healthcare', img: 'healthcare_1.jpg', alt: 'A clinician reviewing a patient record on a tablet in a hospital corridor',
      title: 'Bringing AI to care, with consent at the core.',
      text: 'Hospitals and diagnostics chains share data across labs, insurers and apps. CuraOS, our AI-native EHR, builds ABDM consent-based exchange and HL7 FHIR R4 into its data model.',
      u: '/solutions#healthcare', cta: 'Explore healthcare',
    },
    {
      sector: 'Education', img: 'education_2.jpg', alt: 'A student working through practice questions on a laptop',
      title: 'AI-native learning that respects children’s data.',
      text: 'When almost every data principal is a child, verifiable parental consent and no behavioural tracking are the baseline. We design for schools and EdTech platforms around it, and run our own learning platform, Study24by7.',
      u: '/solutions#education', cta: 'Explore education',
    },
  ];
  readonly slide = signal(0);
  readonly hold = signal(false);
  go(d: number) { this.slide.update((n) => (n + d + this.slides.length) % this.slides.length); }
  pad(n: number) { return n < 10 ? '0' + n : '' + n; }

  // ---- marquee ----
  readonly sectorsList = ['Banks', 'NBFCs', 'Fintech', 'Insurance', 'Stock brokers', 'Hospitals', 'Diagnostics', 'HealthTech', 'Schools', 'EdTech', 'Government', 'Logistics', 'E-commerce', 'SaaS'];

  // ---- products ----
  readonly products = [
    { m: 'C+', n: 'CuraOS', d: 'AI-native EHR, two years in production', u: '/products-curaos' },
    { m: 'AT', n: 'Avisha Trust', d: 'Consent, rights requests and evidence in one place', u: '/digital-trust#avisha-trust' },
    { m: 'TS', n: 'Avisha Trust Seal', d: 'Scoped, dated and backed by a defined assessment', u: '/trust-seal' },
    { m: 'S24', n: 'Study24by7', d: 'AI-native learning for students and teachers', u: '/products-study24by7' },
  ];

  private lifeEl = viewChild<ElementRef<HTMLElement>>('life');
  private sectorsEl = viewChild<ElementRef<HTMLElement>>('sectors');

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      if (reduced()) return;
      const seen = { sectors: false };
      const io = new IntersectionObserver((entries) => {
        for (const e of entries) {
          if (e.target === this.lifeEl()?.nativeElement && e.isIntersecting && this.stage() === 0 && !this.lifeRunning()) {
            this.lifeRunning.set(true);
            io.unobserve(e.target);
          }
          if (e.target === this.sectorsEl()?.nativeElement) seen.sectors = e.isIntersecting;
        }
      }, { threshold: 0.3 });
      const l = this.lifeEl()?.nativeElement, s = this.sectorsEl()?.nativeElement;
      if (l) io.observe(l);
      if (s) io.observe(s);
      const t = setInterval(() => { if (seen.sectors && !this.hold()) this.go(1); }, 7000);
      destroyRef.onDestroy(() => { io.disconnect(); clearInterval(t); });
    });
  }
}
