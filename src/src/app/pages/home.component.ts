import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, QueryList, ViewChildren, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EcosystemComponent } from '../components/ecosystem.component';
import { PlatformArtComponent } from '../components/platform-art.component';
import { IndustryExplorerComponent } from '../components/industry-explorer.component';
import { IntegrationMapComponent } from '../components/integration-map.component';
import { PLATFORMS } from '../content/platforms';
import { ENGINEERING } from '../content/engineering';
import { FOUNDED, INDUSTRIES, WHY } from '../data';

const TAG = [
  { t: 'Connect Everything.', p: 'sutra', n: 'SUTRA' },
  { t: 'Think Intelligently.', p: 'medha', n: 'MEDHA' },
  { t: 'Operate with Trust.', p: 'kavach', n: 'KAVACH' }
];
const WHY_ICONS = ['M4 20V10l8-6 8 6v10h-5v-6H9v6z', 'M4 12h4l3-7 4 14 3-7h2', 'M12 3a6 6 0 0 1 6 6c0 2.4-1.4 3.8-2.5 5S14 16 14 18h-4c0-2-.6-2.8-1.5-4S6 11.4 6 9a6 6 0 0 1 6-6zM10 21h4', 'M12 2.8l7.5 2.8v5.8c0 4.4-3.1 7.8-7.5 9.4-4.4-1.6-7.5-5-7.5-9.4V5.6z', 'M4 7h16M4 12h16M4 17h10M18 15l3 3-3 3', 'M3 21h18M6 21V9l6-5 6 5v12M10 21v-5h4v5'];

@Component({
  standalone: true,
  imports: [RouterLink, EcosystemComponent, PlatformArtComponent, IndustryExplorerComponent, IntegrationMapComponent],
  template: `
<!-- 1 · HERO -->
<section class="hero">
  <div class="wrap hero-in">
    <div class="copy">
      <p class="eyebrow">An Integrated Enterprise Technology Platform</p>
      <h1>Intelligent Infrastructure for Modern Enterprises</h1>
      <p class="lead">Connecting enterprise communication, artificial intelligence and digital trust through one integrated technology ecosystem.</p>
      <ul class="tagline" aria-label="Inbox Media tagline">
        @for (x of tag; track x.p) { <li [style.--c]="'var(--' + x.p + ')'"><b>{{ x.t }}</b><span>{{ x.n }}</span></li> }
      </ul>
      <div class="btns">
        <button type="button" class="btn" (click)="go('platforms')">Explore Our Platforms<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 4v12M5 11l5 5 5-5"/></svg></button>
        <a class="btn ghost" routerLink="/contact" [queryParams]="{type:'proposal'}">Discuss Your Requirements</a>
      </div>
      <p class="since">Serving enterprises across {{ industries }} industries since {{ founded }}.</p>
    </div>
    <app-ecosystem class="viz"/>
  </div>
</section>

<!-- 2 · THE BUSINESS CHALLENGE -->
<section class="s alt" id="challenge">
  <div class="wrap">
    <div class="sh"><h2>Modern Enterprises Need More Than Disconnected Technology.</h2>
      <p class="lead">Most organisations run communication, automation and compliance as separate projects with separate vendors. Each platform answers one of those gaps, and together they close all three.</p></div>
    <div class="ch-rows">
      @for (p of platforms; track p.slug; let i = $index) {
        <div class="ch-row" [style.--c]="'var(--' + p.slug + ')'" [style.--t]="'var(--' + p.slug + '-tint)'">
          <div class="prob">
            <span class="ico" aria-hidden="true"><svg viewBox="0 0 24 24"><path [attr.d]="probIcons[i]"/></svg></span>
            <div><h3>{{ p.challenge.title }}</h3><p>{{ p.challenge.text }}</p>
              <ul>@for (s of p.challenge.symptoms; track s) { <li>{{ s }}</li> }</ul></div>
          </div>
          <span class="arrow" aria-hidden="true"><svg viewBox="0 0 40 16"><path d="M0 8h36M30 2l6 6-6 6"/></svg></span>
          <a class="ans" [routerLink]="['/platforms', p.slug]">
            <span class="ans-k">How we address it</span>
            <b class="pmark">{{ p.name }}</b>
            <span class="ans-t">{{ p.challenge.answer }}</span>
          </a>
        </div>
      }
    </div>
  </div>
</section>

<!-- 3 · THREE CONNECTED PLATFORMS -->
<section class="s plat" id="platforms">
  <div class="wrap">
    <div class="sh"><h2>Three Platforms. One Connected Enterprise.</h2>
      <p class="lead">Our integrated technology architecture brings communication, intelligence and digital trust together to power the next generation of enterprise operations.</p></div>
    <div class="stack">
      @for (p of platforms; track p.slug; let i = $index) {
        <article #card class="pc" [class.flip]="i === 1" [id]="p.slug" [style.--c]="'var(--' + p.slug + ')'" [style.--t]="'var(--' + p.slug + '-tint)'" [style.--i]="i">
          <div class="pc-copy">
            <p class="pc-top"><span class="pager">{{ i + 1 }}/{{ platforms.length }}</span><span>{{ p.layer }}</span></p>
            <h3 class="pname"><span>{{ p.name }}</span> <span class="hi" lang="hi">{{ p.hi }}</span></h3>
            <p class="desc">{{ p.descriptor }} <span>· {{ p.tagline }}</span></p>
            <p class="pos">{{ p.positioning }}</p>
            <ul class="chips" [attr.aria-label]="p.name + ' technologies'">@for (t of p.highlights; track t) { <li class="chip">{{ t }}</li> }</ul>
            <div class="uc"><span class="uc-k">Business use cases</span>
              <ul>@for (u of p.useCases.slice(0, 3); track u.title) { <li><b>{{ u.title }}</b><small>{{ u.who }}</small></li> }</ul></div>
            <a class="go" [routerLink]="['/platforms', p.slug]">Explore {{ p.name }}<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M11 5l5 5-5 5"/></svg></a>
          </div>
          <div class="pc-art"><app-platform-art [slug]="p.slug"/></div>
        </article>
      }
    </div>
  </div>
</section>

<!-- 4 · DIGITAL ENGINEERING FOUNDATION -->
<section class="s alt" id="engineering">
  <div class="wrap">
    <div class="sh"><h2>{{ eng.headline }}</h2><p class="lead">{{ eng.positioning }}</p></div>
    <div class="found">
      <div class="pillars">
        @for (p of platforms; track p.slug) {
          <a class="pillar" [routerLink]="['/platforms', p.slug]" [style.--c]="'var(--' + p.slug + ')'"><b class="pmark">{{ p.name }}</b><span>{{ eng.enables[p.slug] }}</span><i aria-hidden="true"></i></a>
        }
      </div>
      <div class="slab">
        <div class="slab-h"><b>Digital Engineering</b><span>{{ eng.role }}</span></div>
        <div class="areas">
          @for (a of areas; track a.key) {
            <div class="area"><h3>{{ a.label }}</h3><ul>@for (s of a.items; track s.name) { <li>{{ s.name }}</li> }</ul></div>
          }
        </div>
      </div>
    </div>
    <div class="btns center"><a class="btn" routerLink="/digital-engineering">Explore Digital Engineering</a></div>
  </div>
</section>

<!-- 5 · INDUSTRY SOLUTIONS -->
<section class="s" id="industries">
  <div class="wrap">
    <div class="sh"><h2>Configured for the Way Your Industry Works.</h2>
      <p class="lead">Eight industries, each with its own challenges. See which platforms and products apply, and how a typical workflow runs.</p></div>
    <app-industry-explorer [moreLink]="true"/>
  </div>
</section>

<!-- 6 · INTEGRATIONS -->
<section class="s alt" id="integrations">
  <div class="wrap">
    <div class="sh"><h2>Connects to the Systems You Already Run.</h2>
      <p class="lead">Channels, enterprise systems, APIs, AI agents, cloud and your own applications meet in one architecture.</p></div>
    <app-integration-map/>
    <div class="btns center"><a class="btn ghost" routerLink="/integrations">Integrations &amp; technology</a></div>
  </div>
</section>

<!-- 7 · WHY INBOX MEDIA -->
<section class="s" id="why">
  <div class="wrap">
    <div class="sh"><h2>Why Inbox Media</h2>
      <p class="lead">One partner for communication infrastructure, intelligent automation, digital trust and the engineering that connects them.</p></div>
    <div class="why">
      @for (w of why; track w.t; let i = $index) {
        <div class="w"><span class="wi" aria-hidden="true"><svg viewBox="0 0 24 24"><path [attr.d]="whyIcons[i]"/></svg></span><h3>{{ w.t }}</h3><p>{{ w.d }}</p></div>
      }
    </div>
    <div class="proof">
      <div class="pf"><b>{{ founded }}</b><span>Founded</span></div>
      <div class="pf"><b>3 + 1</b><span>Platforms and a shared engineering foundation</span></div>
      <div class="pf"><b>{{ industries }}</b><span>Industries with configured workflows</span></div>
      <div class="pf cert"><span class="pill pending">Pending verification</span><span>ISO 9001 and ISO 27001 certificate details are published once verified.</span><a class="text-link" routerLink="/about/certifications">Certification details</a></div>
    </div>
    <p class="evid">Case studies, client logos and live demonstrations are published only after approval. <a routerLink="/about/why-inbox-media">Our journey</a></p>
  </div>
</section>

<!-- 8 · FINAL CTA -->
<section class="s band close">
  <div class="wrap close-in">
    <h2>Let's Build a More Connected, Intelligent and Secure Enterprise.</h2>
    <p class="lead">Tell us what you need to connect, automate or protect first. We will map where SUTRA, MEDHA, KAVACH and our engineering teams fit.</p>
    <div class="btns">
      <a class="btn" routerLink="/contact" [queryParams]="{type:'demo'}">Book a Demo</a>
      <a class="btn ghost" routerLink="/contact" [queryParams]="{type:'proposal'}">Request a Proposal</a>
      <a class="btn ghost" routerLink="/contact" [queryParams]="{type:'message'}">Contact Our Team</a>
    </div>
  </div>
</section>`,
  styles: [`
/* 1 hero */
.hero{background:var(--hero-glow),var(--bg);padding:clamp(2.5rem,6vw,5rem) 0 clamp(2.5rem,5vw,4rem);border-bottom:1px solid var(--border);overflow:hidden}
.hero-in{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(1.5rem,4vw,4rem);align-items:center}
.hero h1{font-size:clamp(2.5rem,5.4vw,4.6rem);line-height:1.04;margin:0 0 1.1rem;max-width:13ch}
.hero .lead{max-width:50ch;margin:0 0 1.4rem}
.tagline{list-style:none;margin:0 0 1.8rem;padding:0;display:grid;grid-template-columns:repeat(3,auto);justify-content:start;gap:.4rem 1.4rem}
.tagline li{display:grid;gap:.1rem;padding-left:.8rem;border-left:3px solid var(--c)}
.tagline b{font:600 .98rem var(--font-display);color:var(--fg)}
.tagline span{font:800 .78rem var(--mark);letter-spacing:.06em;color:var(--c)}
.since{margin:1.2rem 0 0;font-size:.9rem}
.viz{width:100%;max-width:580px;justify-self:center}
/* 2 challenge */
.ch-rows{display:grid;gap:1rem}
.ch-row{display:grid;grid-template-columns:minmax(0,1.35fr) 56px minmax(0,1fr);align-items:stretch;background:var(--surface);border:1px solid var(--border);border-radius:var(--r-xl);box-shadow:var(--shadow);overflow:hidden}
.prob{display:grid;grid-template-columns:44px 1fr;gap:1rem;padding:1.4rem 1.5rem}
.ico{width:44px;height:44px;border-radius:12px;display:grid;place-items:center;background:var(--bg-alt);color:var(--fg-2)}
.ico svg{width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
.prob h3{margin:0 0 .3rem;font-size:1.15rem}.prob p{margin:0 0 .6rem;font-size:.95rem}
.prob ul{margin:0;padding:0;list-style:none;display:flex;flex-wrap:wrap;gap:.35rem}
.prob li{font-size:.78rem;color:var(--fg-2);border:1px dashed var(--border-strong);border-radius:6px;padding:.15rem .5rem}
.arrow{display:grid;place-items:center;color:var(--c)}
.arrow svg{width:36px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.ans{display:grid;align-content:center;gap:.3rem;padding:1.4rem 1.5rem;background:var(--t);text-decoration:none;border-left:1px solid color-mix(in srgb,var(--c) 18%,transparent);transition:background .2s}
.ans:hover{background:color-mix(in srgb,var(--c) 14%,var(--surface))}
.ans-k{font-size:.78rem;font-weight:700;color:var(--fg-2)}
.ans .pmark{font-size:1.5rem;line-height:1}
.ans-t{font-size:.94rem;color:var(--fg);line-height:1.5}
/* 3 platforms (stacked cards) */
.stack{display:grid;gap:1.6rem}
.pc{--p:0;position:relative;display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);gap:clamp(1rem,3.5vw,3rem);align-items:center;padding:clamp(1.3rem,3vw,2.6rem);border-radius:var(--r-xl);background:linear-gradient(140deg,var(--t),var(--surface) 70%);border:1px solid color-mix(in srgb,var(--c) 22%,var(--border));box-shadow:var(--shadow);transform-origin:50% 0;transform:scale(calc(1 - var(--p) * .04))}
.pc::after{content:"";position:absolute;inset:0;border-radius:inherit;background:var(--bg);opacity:calc(var(--p) * .45);pointer-events:none}
.pc.flip .pc-art{order:-1}
.pc-top{display:flex;align-items:center;gap:.7rem;margin:0 0 .8rem;font-weight:600;color:var(--c);font-size:.92rem}
.pager{display:inline-grid;place-items:center;min-width:3rem;height:1.9rem;padding:0 .7rem;border-radius:999px;background:var(--c);color:var(--surface);font:700 .82rem var(--font-display)}
.pname{display:flex;flex-wrap:wrap;align-items:baseline;gap:.1em .4em;margin:0;font:800 clamp(2.6rem,5.6vw,4.6rem)/.95 var(--mark);letter-spacing:.02em;color:var(--c)}
.pname .hi{font-weight:600;font-size:.6em;color:var(--fg);opacity:.75;letter-spacing:0}
.desc{margin:.6rem 0 0;font:600 clamp(1.05rem,1.6vw,1.25rem)/1.3 var(--font-display);color:var(--fg)}
.desc span{color:var(--c)}
.pos{margin:.8rem 0 1rem;font-size:.98rem}
.uc{margin-top:1.1rem}
.uc-k{display:block;font-size:.8rem;font-weight:700;color:var(--fg-2);margin-bottom:.4rem}
.uc ul{list-style:none;margin:0;padding:0;display:grid;gap:.35rem}
.uc li{display:flex;justify-content:space-between;gap:1rem;padding:.45rem 0;border-bottom:1px dashed var(--border)}
.uc b{font-weight:600;font-size:.92rem;color:var(--fg)}.uc small{color:var(--fg-2);font-size:.8rem;white-space:nowrap}
.go{display:inline-flex;align-items:center;gap:.45rem;margin-top:1.3rem;font-weight:700;color:var(--surface);background:var(--c);text-decoration:none;padding:.72rem 1.15rem;border-radius:var(--r);transition:gap .2s}
.go svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.go:hover{gap:.75rem}
.pc-art{width:100%;max-width:470px;justify-self:center}
@media(min-width:1001px) and (min-height:820px){.pc{position:sticky;top:calc(var(--nh) + 16px + var(--i) * 16px)}}
/* 4 engineering */
.found{display:grid;gap:0}
.pillars{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem}
.pillar{position:relative;display:grid;gap:.4rem;padding:1.2rem 1.3rem 1.6rem;background:var(--surface);border:1px solid var(--border);border-top:3px solid var(--c);border-radius:var(--r-lg) var(--r-lg) 0 0;text-decoration:none;transition:transform .2s}
.pillar:hover{transform:translateY(-3px)}
.pillar .pmark{font-size:1.35rem}
.pillar span{color:var(--fg);font-size:.94rem;line-height:1.5}
.pillar i{position:absolute;left:50%;bottom:-1.2rem;width:2px;height:1.2rem;background:repeating-linear-gradient(var(--eng) 0 4px,transparent 4px 8px)}
.slab{margin-top:1.2rem;border-radius:var(--r-xl);background:var(--eng-tint);border:1px solid color-mix(in srgb,var(--eng) 30%,transparent);padding:1.3rem clamp(1rem,2.5vw,1.8rem) 1.5rem}
.slab-h{display:flex;flex-wrap:wrap;align-items:baseline;gap:.4rem .8rem;margin-bottom:1rem}
.slab-h b{font:700 1.2rem var(--font-display);color:var(--eng)}.slab-h span{color:var(--fg-2);font-size:.9rem}
.areas{display:grid;gap:.6rem}
.area{display:grid;grid-template-columns:90px 1fr;gap:1rem;align-items:center;padding-top:.6rem;border-top:1px dashed color-mix(in srgb,var(--eng) 25%,transparent)}
.area:first-child{border-top:0;padding-top:0}
.area h3{font-size:.88rem;color:var(--eng);margin:0;font-family:var(--font-body);font-weight:700;letter-spacing:0}
.area ul{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:.4rem}
.area li{font-size:.9rem;color:var(--fg);padding:.4rem .6rem;border-radius:8px;background:var(--surface);border:1px solid var(--border)}
.btns.center{justify-content:center;margin-top:2rem}
/* 7 why */
.why{display:grid;grid-template-columns:repeat(3,1fr);gap:0;border:1px solid var(--border);border-radius:var(--r-xl);overflow:hidden;background:var(--surface)}
.w{padding:1.5rem;border-right:1px solid var(--border);border-bottom:1px solid var(--border)}
.w:nth-child(3n){border-right:0}.w:nth-last-child(-n+3){border-bottom:0}
.wi{display:grid;place-items:center;width:42px;height:42px;border-radius:12px;background:var(--lavender);color:var(--primary);margin-bottom:.9rem}
.wi svg{width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
.w h3{font-size:1.05rem;margin:0 0 .3rem}.w p{margin:0;font-size:.93rem}
.proof{display:grid;grid-template-columns:auto auto auto minmax(0,1.4fr);gap:1rem;margin-top:1.2rem;align-items:stretch}
.pf{display:grid;align-content:center;gap:.2rem;padding:1rem 1.3rem;border-radius:var(--r-lg);background:var(--bg-alt);border:1px solid var(--border)}
.pf b{font:700 1.7rem var(--font-display);color:var(--fg);font-variant-numeric:tabular-nums}
.pf span{font-size:.84rem;color:var(--fg-2)}
.pf.cert{gap:.4rem;justify-items:start}.pf.cert .text-link{font-size:.86rem}
.evid{margin:1.2rem 0 0;font-size:.88rem}
/* 8 close */
.close-in{text-align:center;display:grid;justify-items:center}
.close h2{max-width:22ch;margin-bottom:1rem;font-size:clamp(1.9rem,4vw,3.2rem)}
.close .lead{max-width:60ch;margin:0 auto 1.8rem}
.close .btns{justify-content:center}
/* responsive */
@media(max-width:1000px){
  .hero-in{grid-template-columns:1fr}.viz{max-width:520px}
  .pc{grid-template-columns:1fr;transform:none}.pc::after{display:none}.pc.flip .pc-art{order:0}.pc-art{max-width:420px}
  .ch-row{grid-template-columns:1fr}.arrow{transform:rotate(90deg);height:36px}.ans{border-left:0;border-top:1px solid color-mix(in srgb,var(--c) 18%,transparent)}
  .why{grid-template-columns:1fr 1fr}.w:nth-child(3n){border-right:1px solid var(--border)}.w:nth-child(2n){border-right:0}.w:nth-last-child(-n+3){border-bottom:1px solid var(--border)}.w:nth-last-child(-n+2){border-bottom:0}
  .proof{grid-template-columns:1fr 1fr 1fr}.pf.cert{grid-column:1/-1}
}
@media(max-width:700px){
  .tagline{grid-template-columns:1fr;gap:.6rem}
  .pillars{grid-template-columns:1fr;gap:.8rem}.pillar{border-radius:var(--r-lg)}.pillar i{display:none}
  .prob{grid-template-columns:1fr}.ico{display:none}
  .why{grid-template-columns:1fr}.w{border-right:0!important;border-bottom:1px solid var(--border)!important}.w:last-child{border-bottom:0!important}
  .proof{grid-template-columns:1fr 1fr}.pf.cert{grid-column:1/-1}
  .uc li{flex-direction:column;gap:0}
}
@media(max-width:520px){.area{grid-template-columns:1fr;gap:.4rem}}
`]
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  platforms = PLATFORMS; eng = ENGINEERING; why = WHY; tag = TAG; founded = FOUNDED; industries = INDUSTRIES.length;
  whyIcons = WHY_ICONS;
  probIcons = ['M4 6h7M4 12h4M4 18h7M15 6h5M18 12h2M15 18h5', 'M8 4h8l-1 5h3l-8 11 2-8H8z', 'M12 3l8 3v6c0 4.5-3.3 8-8 9.5-4.7-1.5-8-5-8-9.5V6zM9 12l2 2 4-4'];
  areas = (['build', 'connect', 'run', 'scale'] as const).map(k => ({ key: k, label: ENGINEERING.areas[k], items: ENGINEERING.services.filter(s => s.area === k) }));

  @ViewChildren('card') cards!: QueryList<ElementRef<HTMLElement>>;
  private zone = inject(NgZone);
  private raf = 0;
  private off: (() => void)[] = [];

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      // Stacked platform cards: each card recedes slightly as the next one slides over it.
      const onScroll = () => { if (!this.raf) this.raf = requestAnimationFrame(() => { this.raf = 0; this.stackFx(); }); };
      addEventListener('scroll', onScroll, { passive: true });
      addEventListener('resize', onScroll, { passive: true });
      this.off.push(() => { removeEventListener('scroll', onScroll); removeEventListener('resize', onScroll); });
      onScroll();
    });
  }
  ngOnDestroy() { cancelAnimationFrame(this.raf); this.off.forEach(f => f()); }

  private stackFx() {
    const els = this.cards.map(c => c.nativeElement);
    const sticky = matchMedia('(min-width: 1001px) and (min-height: 820px)').matches;
    els.forEach((el, i) => {
      const next = els[i + 1];
      if (!sticky || !next) { el.style.setProperty('--p', '0'); return; }
      const a = el.getBoundingClientRect(), b = next.getBoundingClientRect();
      el.style.setProperty('--p', Math.min(1, Math.max(0, 1 - (b.top - a.top - 16) / a.height)).toFixed(3));
    });
  }
  go(id: string) { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
}
