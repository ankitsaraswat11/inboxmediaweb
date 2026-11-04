import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SERVICE_PAGES } from '../../shared/content/service-pages';
import { PageHeroComponent } from '../../shared/ui/page-hero.component';
import { CtaBandComponent } from '../../shared/ui/cta-band.component';
import { CurvesComponent } from '../../shared/ui/curves.component';
import { IconComponent } from '../../shared/ui/icon.component';

/** AIShield-style product page, driven by SERVICE_PAGES[slug]. */
@Component({
  selector: 'app-service-page',
  standalone: true,
  imports: [PageHeroComponent, CtaBandComponent, CurvesComponent, IconComponent],
  template: `
<main id="main" class="svc">
  <app-page-hero
    [crumbs]="p.crumbs" [label]="p.label" [icon]="p.icon" [title]="p.title" [lead]="p.lead"
    [img]="p.img ?? ''" [alt]="p.alt ?? ''" [primary]="p.primary" [secondary]="p.secondary ?? null" />

  <!-- Why …? -->
  <section class="sec why">
    <div class="wrap">
      <div class="sec-head sec-head--split"><h2>{{ p.why.title }}</h2><p class="lead">{{ p.why.intro }}</p></div>
      <div class="grid grid--3">
        @for (w of p.why.items; track w.t) {
          <article class="tile"><span class="tile__icon claim__icon"><app-icon [name]="w.i" [size]="24" /></span><h3>{{ w.t }}</h3><p>{{ w.d }}</p></article>
        }
      </div>
    </div>
  </section>

  <!-- See how … works -->
  <section class="sec sec--tint" id="how">
    <div class="wrap">
      <div class="sec-head sec-head--split">
        <h2>{{ p.how.title }}</h2>
        <div class="stack"><p class="lead">{{ p.how.intro }}</p><div class="btn-row"><a class="btn btn--primary" href="/book-a-demo">Book a demo</a></div></div>
      </div>
      <ol class="tl">
        @for (s of p.how.steps; track s.t; let k = $index) {
          <li class="tl__item">
            <span class="tl__dot"><app-icon [name]="s.i" [size]="22" /></span>
            <div class="tl__card"><span class="tl__n">Step {{ k + 1 }}</span><h3>{{ s.t }}</h3><p>{{ s.d }}</p></div>
          </li>
        }
      </ol>
    </div>
  </section>

  <!-- Core features (dark band) -->
  <section class="band band--after-tint" [class.band--before-tint]="tintAfterBand" [id]="p.features.id">
    <div class="band__glow" aria-hidden="true"></div>
    <app-curves class="band__art on-dark" [cx]="500" [cy]="500" [start]="80" [step]="56" [count]="9" />
    <div class="wrap on-dark">
      <div class="sec-head">
        <h2>{{ p.features.title }}</h2>
        @if (p.features.intro) { <p class="lead">{{ p.features.intro }}</p> }
      </div>
      <div class="grid" [class.grid--4]="cols === 4" [class.grid--3]="cols === 3" [class.grid--2]="cols === 2">
        @for (f of p.features.items; track f.t) {
          <article class="tile" [attr.id]="f.id ?? null">
            <span class="claim__icon"><app-icon [name]="f.i" [size]="24" /></span>
            <h3>{{ f.t }}</h3><p>{{ f.d }}</p>
            @if (f.b) { <ul class="ticks">@for (b of f.b; track b) { <li>{{ b }}</li> }</ul> }
          </article>
        }
      </div>
    </div>
  </section>

  @if (p.values; as v) {
    <section class="sec sec--tint">
      <div class="wrap">
        <div class="sec-head sec-head--split"><h2>{{ v.title }}</h2>@if (v.intro) { <p class="lead">{{ v.intro }}</p> }</div>
        <ul class="values" [style.--n]="v.items.length">
          @for (x of v.items; track x.t) { <li><app-icon [name]="x.i" [size]="26" /><b>{{ x.t }}</b><span>{{ x.d }}</span></li> }
        </ul>
      </div>
    </section>
  }

  @if (slug === 'trust-seal') {
    <section class="sec sec--tint" id="seal-tracks">
      <div class="wrap">
        <div class="sec-head"><h2>See what each part of the seal stands for.</h2><p class="lead">Hover or tap a segment of the seal, or pick a track.</p></div>
        <div class="cp-seal">
          <svg viewBox="0 0 200 200" role="img" aria-label="Avisha Trust Seal tracks">
            <circle cx="100" cy="100" r="62" fill="#0a1633" />
            @for (t of tracks; track t.n; let i = $index) {
              <circle class="cp-arc" [class.on]="i === seal()" cx="100" cy="100" r="80" stroke-dasharray="110 392.7"
                      [attr.transform]="'rotate(' + (-84 + i * 90) + ' 100 100)'" (click)="seal.set(i)" (mouseenter)="seal.set(i)" />
            }
            <text x="100" y="92" class="cp-seal-name" style="font-size:7px;fill:#7fe3f4;letter-spacing:.08em">Avisha Trust Seal</text>
            <text x="100" y="110" class="cp-seal-name">{{ tracks[seal()].n }}</text>
          </svg>
          <div>
            <div class="cp-tabs" role="tablist">
              @for (t of tracks; track t.n; let i = $index) {
                <button type="button" role="tab" class="cp-tab" [class.on]="i === seal()" [attr.aria-selected]="i === seal()" (click)="seal.set(i)">{{ t.n }}</button>
              }
            </div>
            <div class="cp-seal-text"><h3>{{ tracks[seal()].n }}</h3><p>{{ tracks[seal()].d }}</p></div>
            <p class="fine" style="margin-top:18px">The Trust Seal reflects completion of Ankit Global’s assessment methodology at a stated point in time. Every seal names its track, its assessment date and its expiry. It is not a government certification.</p>
          </div>
        </div>
      </div>
    </section>
  }

  @if (p.roles; as r) {
    <section class="sec">
      <div class="wrap">
        <div class="sec-head"><h2>{{ r.title }}</h2></div>
        <div class="roles">
          @for (x of r.items; track x.t) {
            <div class="role"><span class="tile__icon"><app-icon [name]="x.i" [size]="22" /></span><div><h3>{{ x.t }}</h3><p>{{ x.d }}</p></div></div>
          }
        </div>
      </div>
    </section>
  }

  @if (p.options; as o) {
    <section class="sec sec--tint">
      <div class="wrap">
        <div class="sec-head sec-head--split"><h2>{{ o.title }}</h2>@if (o.intro) { <p class="lead">{{ o.intro }}</p> }</div>
        <div class="grid grid--4">
          @for (x of o.items; track x.t) {
            <article class="tile"><span class="tile__icon claim__icon"><app-icon [name]="x.i" [size]="24" /></span><h3>{{ x.t }}</h3><p>{{ x.d }}</p></article>
          }
        </div>
      </div>
    </section>
  }

  <app-cta-band [prefix]="p.closing.prefix ?? 'Make sure your AI'" [lead]="p.closing.lead"
                [primary]="{ x: 'Book a demo', u: '/book-a-demo' }" [secondary]="{ x: 'Talk to us', u: '/contact' }" />
</main>`,
})
export class ServicePageComponent {
  readonly slug = inject(ActivatedRoute).snapshot.routeConfig?.path ?? 'ai';
  readonly p = SERVICE_PAGES[this.slug] ?? SERVICE_PAGES['ai'];
  readonly cols = (() => {
    const n = this.p.features.items.length;
    return n === 4 || n === 2 ? 2 : n % 4 === 0 ? 4 : 3;
  })();
  /** The section right after the band is tinted when there is a values row or the seal widget. */
  readonly tintAfterBand = !!this.p.values || this.slug === 'trust-seal';

  readonly tracks = [
    { n: 'Privacy Ready', d: 'Privacy practices assessed against a defined standard.' },
    { n: 'Security Assessed', d: 'Security controls reviewed against a defined checklist.' },
    { n: 'AI Governance Ready', d: 'AI oversight and policy practices in place.' },
    { n: 'DPDP Readiness', d: 'Readiness posture for DPDP obligations.' },
  ];
  readonly seal = signal(0);
}
