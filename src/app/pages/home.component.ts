import { AfterViewInit, Component, NgZone, OnDestroy, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PlatformArtComponent } from '../components/platform-art.component';
import { IndustryExplorerComponent } from '../components/industry-explorer.component';
import { IntegrationMapComponent } from '../components/integration-map.component';
import { ArchitectureComponent } from '../components/architecture.component';
import { WeaveComponent } from '../components/weave.component';
import { PLATFORMS } from '../content/platforms';
import { ENGINEERING } from '../content/engineering';
import { FOUNDED, INDUSTRIES, WHY } from '../data';

const TAG = [
  { t: 'Connect Everything.', p: 'sutra' },
  { t: 'Think Intelligently.', p: 'medha' },
  { t: 'Operate with Trust.', p: 'kavach' }
];
const WHY_ICONS = ['M4 20V10l8-6 8 6v10h-5v-6H9v6z', 'M4 12h4l3-7 4 14 3-7h2', 'M12 3a6 6 0 0 1 6 6c0 2.4-1.4 3.8-2.5 5S14 16 14 18h-4c0-2-.6-2.8-1.5-4S6 11.4 6 9a6 6 0 0 1 6-6zM10 21h4', 'M12 2.8l7.5 2.8v5.8c0 4.4-3.1 7.8-7.5 9.4-4.4-1.6-7.5-5-7.5-9.4V5.6z', 'M4 7h16M4 12h16M4 17h10M18 15l3 3-3 3', 'M3 21h18M6 21V9l6-5 6 5v12M10 21v-5h4v5'];
const ROTATE_MS = 3600;

@Component({
  standalone: true,
  imports: [RouterLink, PlatformArtComponent, IndustryExplorerComponent, IntegrationMapComponent, ArchitectureComponent, WeaveComponent],
  template: `
<!-- 1 · HERO: the three platform threads woven into one fabric -->
<section class="hero on-dark" (mouseenter)="hold(true)" (mouseleave)="hold(false)" (focusin)="hold(true)" (focusout)="hold(false)">
  <app-weave [active]="t()"/>
  <div class="wrap hero-in">
    <div class="copy">
      <p class="eyebrow">An integrated enterprise technology platform</p>
      <h1>Intelligent Infrastructure for Modern Enterprises</h1>
      <p class="rot" aria-hidden="true">
        @for (x of tag; track x.p; let i = $index) {
          <span class="ri" [class.on]="t() === i" [style.--c]="'var(--' + x.p + ')'"><b>{{ x.t }}</b><em>{{ platforms[i].name }} <span lang="hi">{{ platforms[i].hi }}</span></em></span>
        }
      </p>
      <p class="sr-only">{{ tagline }}</p>
      <p class="lead">Connecting enterprise communication, artificial intelligence and digital trust through one integrated technology ecosystem.</p>
      <div class="btns">
        <button type="button" class="btn" (click)="go('platforms')">Explore our platforms</button>
        <a class="btn ghost" routerLink="/contact" [queryParams]="{type:'proposal'}">Discuss your requirements</a>
      </div>
    </div>
    <div class="spools">
      @for (p of platforms; track p.slug; let i = $index) {
        <a class="spool" [attr.data-thread]="i" [class.on]="t() === i" [routerLink]="['/platforms', p.slug]" [style.--c]="'var(--' + p.slug + ')'" (mouseenter)="t.set(i)" (focus)="t.set(i)">
          <span class="sl">{{ p.layer }}</span>
          <b class="pmark">{{ p.name }} <span class="hi" lang="hi">{{ p.hi }}</span></b>
          <span class="sd">{{ p.descriptor }}</span>
          <span class="ss">{{ p.summary }}</span>
          <span class="sx">Explore {{ p.name }}</span>
        </a>
      }
    </div>
  </div>
</section>

<!-- Industries served (in place of client logos, which are published only after approval) -->
<section class="strip" aria-label="Industries we serve">
  <div class="wrap strip-in">
    <p>Serving enterprises across {{ industries.length }} industries since {{ founded }}</p>
    <ul>@for (x of industries; track x.name) { <li><a routerLink="/industries">{{ x.name }}</a></li> }</ul>
  </div>
</section>

<!-- 2 · THE BUSINESS CHALLENGE -->
<section class="s" id="challenge">
  <div class="wrap">
    <div class="sh"><h2>Modern Enterprises Need More Than Disconnected Technology.</h2>
      <p class="lead">Most organisations run communication, automation and compliance as separate projects with separate vendors. Each platform answers one of those gaps, and together they close all three.</p></div>
    <div class="cc-grid">
      @for (p of platforms; track p.slug; let i = $index) {
        <article class="cc" [style.--c]="'var(--' + p.slug + ')'" [style.--t]="'var(--' + p.slug + '-tint)'">
          <div class="cc-p">
            <span class="ico" aria-hidden="true"><svg viewBox="0 0 24 24"><path [attr.d]="probIcons[i]"/></svg></span>
            <h3>{{ p.challenge.title }}</h3>
            <p>{{ p.challenge.text }}</p>
            <ul>@for (s of p.challenge.symptoms; track s) { <li>{{ s }}</li> }</ul>
          </div>
          <a class="cc-a" [routerLink]="['/platforms', p.slug]">
            <span class="cc-k">How we address it</span>
            <b class="pmark">{{ p.name }}</b>
            <span class="cc-t">{{ p.challenge.answer }}</span>
          </a>
        </article>
      }
    </div>
  </div>
</section>

<!-- 3 · THREE CONNECTED PLATFORMS -->
<section class="s alt" id="platforms">
  <div class="wrap">
    <div class="sh"><h2>Three Platforms. One Connected Enterprise.</h2>
      <p class="lead">Our integrated technology architecture brings communication, intelligence and digital trust together to power the next generation of enterprise operations.</p></div>
    <div class="ptabs" role="tablist" aria-label="Platforms" (keydown)="tabKey($event)">
      @for (p of platforms; track p.slug; let i = $index) {
        <button type="button" role="tab" [id]="'ptab-' + i" [attr.aria-selected]="ps() === i" aria-controls="ppanel" [tabindex]="ps() === i ? 0 : -1" [class.on]="ps() === i" [style.--c]="'var(--' + p.slug + ')'" (click)="ps.set(i)">
          <b class="pmark">{{ p.name }}</b><span>{{ p.layer }}</span>
        </button>
      }
    </div>
    @for (p of [platforms[ps()]]; track p.slug) {
      <article class="pstage" id="ppanel" role="tabpanel" [attr.aria-labelledby]="'ptab-' + ps()" [style.--c]="'var(--' + p.slug + ')'" [style.--t]="'var(--' + p.slug + '-tint)'">
        <div class="pc-copy">
          <h3 class="pname"><span>{{ p.name }}</span> <span class="hi" lang="hi">{{ p.hi }}</span></h3>
          <p class="desc">{{ p.descriptor }}. <span>{{ p.tagline }}</span></p>
          <p class="pos">{{ p.positioning }}</p>
          <ul class="chips" [attr.aria-label]="p.name + ' technologies'">@for (x of p.highlights; track x) { <li class="chip">{{ x }}</li> }</ul>
          <div class="uc"><h4>Business use cases</h4>
            <ul>@for (u of p.useCases.slice(0, 3); track u.title) { <li><b>{{ u.title }}</b><small>{{ u.who }}</small></li> }</ul></div>
          <a class="btn go" [routerLink]="['/platforms', p.slug]">Explore {{ p.name }}</a>
        </div>
        <div class="pc-art"><app-platform-art [slug]="p.slug"/></div>
      </article>
    }
  </div>
</section>

<!-- 4 · HOW EVERYTHING CONNECTS -->
<section class="s band framed" id="architecture">
  <div class="wrap">
    <div class="sh"><h2>One Connected Architecture. Multiple Business Outcomes.</h2>
      <p class="lead">Events flow from your business systems through SUTRA and MEDHA to outcomes. KAVACH protects every layer, and Digital Engineering connects them. Select a layer to see its role.</p></div>
    <app-architecture/>
  </div>
</section>

<!-- 5 · DIGITAL ENGINEERING FOUNDATION -->
<section class="s" id="engineering">
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
    <div class="btns center"><a class="btn ghost" routerLink="/digital-engineering">Explore Digital Engineering</a></div>
  </div>
</section>

<!-- 6 · INDUSTRY SOLUTIONS -->
<section class="s alt" id="industries">
  <div class="wrap">
    <div class="sh"><h2>Configured for the Way Your Industry Works.</h2>
      <p class="lead">Eight industries, each with its own challenges. See which platforms and products apply, and how a typical workflow runs.</p></div>
    <app-industry-explorer [moreLink]="true"/>
  </div>
</section>

<!-- 7 · INTEGRATIONS -->
<section class="s" id="integrations">
  <div class="wrap">
    <div class="sh"><h2>Connects to the Systems You Already Run.</h2>
      <p class="lead">Channels, enterprise systems, APIs, AI agents, cloud and your own applications meet in one architecture.</p></div>
    <app-integration-map/>
    <div class="btns center"><a class="btn ghost" routerLink="/integrations">Integrations &amp; technology</a></div>
  </div>
</section>

<!-- 8 · WHY INBOX MEDIA -->
<section class="s band framed" id="why">
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
      <div class="pf"><b>{{ industries.length }}</b><span>Industries with configured workflows</span></div>
      <div class="pf cert"><span class="pill pending">Pending verification</span><span>ISO 9001 and ISO 27001 certificate details are published once verified.</span><a class="text-link" routerLink="/about/certifications">Certification details</a></div>
    </div>
    <div class="why-cta">
      <a class="btn" routerLink="/contact" [queryParams]="{type:'demo'}">See Inbox Media in action</a>
      <p>Case studies, client logos and live demonstrations are published only after approval. <a routerLink="/about/why-inbox-media">Our journey</a></p>
    </div>
  </div>
</section>

<!-- 9 · FINAL CTA -->
<section class="s close">
  <div class="wrap close-in">
    <h2>Let's Build a More Connected, Intelligent and Secure Enterprise.</h2>
    <p class="lead">Tell us what you need to connect, automate or protect first. We will map where SUTRA, MEDHA, KAVACH and our engineering teams fit.</p>
    <div class="btns">
      <a class="btn" routerLink="/contact" [queryParams]="{type:'demo'}">Book a demo</a>
      <a class="btn ghost" routerLink="/contact" [queryParams]="{type:'proposal'}">Request a proposal</a>
      <a class="btn ghost" routerLink="/contact" [queryParams]="{type:'message'}">Contact our team</a>
    </div>
  </div>
</section>`,
  styles: [`
/* 1 hero */
.hero{position:relative;isolation:isolate;overflow:hidden;background:radial-gradient(70% 60% at 50% 0%,var(--glow-1),transparent 70%),radial-gradient(45% 55% at 0% 100%,var(--glow-2),transparent 70%),radial-gradient(40% 50% at 100% 100%,var(--glow-3),transparent 70%),var(--night);padding:clamp(4rem,9vw,7.5rem) 0 clamp(3rem,6vw,5rem)}
.hero-in{position:relative;z-index:1}
.copy{position:relative;text-align:center;display:grid;justify-items:center;max-width:980px;margin:0 auto}
.copy::before{content:"";position:absolute;inset:-10% -12% -6%;z-index:-1;background:radial-gradient(closest-side,color-mix(in srgb,var(--night) 92%,transparent),color-mix(in srgb,var(--night) 70%,transparent) 55%,transparent);pointer-events:none}
.hero h1{font-size:clamp(2.8rem,7.4vw,6.2rem);max-width:15ch;margin:0 0 1.4rem}
.rot{display:grid;justify-items:center;margin:0 0 1.4rem;min-height:2.2em;font-size:clamp(1.15rem,2vw,1.55rem);max-width:none}
.ri{grid-area:1/1;display:inline-flex;align-items:baseline;flex-wrap:wrap;justify-content:center;gap:.2rem .7rem;opacity:0;transform:translateY(.5em);transition:opacity .5s var(--ease),transform .5s var(--ease)}
.ri.on{opacity:1;transform:none}
.ri b{color:var(--fg);font-weight:600;letter-spacing:-.015em}
.ri em{font:800 .92em var(--mark);font-style:normal;letter-spacing:.04em;color:var(--c)}
.ri em span{font-weight:600;letter-spacing:0;opacity:.85}
.hero .lead{max-width:52ch;margin:0 0 2rem}
.hero .btns{justify-content:center}
.spools{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(.8rem,2vw,1.5rem);margin-top:clamp(7rem,13vw,11rem)}
.spool{position:relative;display:grid;align-content:start;gap:.35rem;padding:1.5rem 1.5rem 1.4rem;border-radius:var(--r-xl);background:color-mix(in srgb,var(--night-2) 82%,transparent);border:1px solid var(--border);backdrop-filter:blur(6px);text-decoration:none;transition:border-color .4s,background .4s,box-shadow .4s}
.spool::before{content:"";position:absolute;left:1.5rem;right:1.5rem;top:-1px;height:2px;border-radius:2px;background:var(--c);opacity:.5;transition:opacity .4s}
.spool.on{border-color:color-mix(in srgb,var(--c) 55%,transparent);box-shadow:0 20px 50px -20px color-mix(in srgb,var(--c) 45%,transparent)}
.spool.on::before{opacity:1}
.sl{font-size:.86rem;font-weight:600;color:var(--c)}
.spool .pmark{font-size:clamp(1.8rem,2.8vw,2.3rem);line-height:1.05;margin:.1rem 0 .2rem}
.spool .pmark .hi{font-size:.62em;color:var(--fg)}
.sd{color:var(--fg);font-weight:600;line-height:1.35}
.ss{color:var(--fg-2);font-size:.94rem;line-height:1.5}
.sx{margin-top:.7rem;font-weight:600;font-size:.94rem;color:var(--fg);text-decoration:underline;text-decoration-color:color-mix(in srgb,var(--c) 70%,transparent);text-underline-offset:4px}
.spool:hover .sx{text-decoration-color:var(--c)}
/* industries strip */
.strip{border-bottom:1px solid var(--border);background:var(--bg)}
.strip-in{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1rem 2.5rem;padding:1.6rem 0}
.strip p{margin:0;font-weight:600;color:var(--fg);font-size:.98rem}
.strip ul{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:.5rem 1.8rem}
.strip a{color:var(--fg-2);text-decoration:none;font-weight:500;font-size:.96rem;transition:color .2s}
.strip a:hover{color:var(--primary)}
/* 2 challenge */
.cc-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1rem}
.cc{display:grid;grid-template-rows:1fr auto;border:1px solid var(--border);border-radius:var(--r-xl);overflow:hidden;background:var(--surface)}
.cc-p{padding:1.6rem 1.6rem 1.4rem}
.ico{display:grid;place-items:center;width:42px;height:42px;border-radius:12px;background:var(--bg-alt);color:var(--fg-2);margin-bottom:1.1rem}
.ico svg{width:21px;height:21px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
.cc-p h3{font-size:1.22rem;margin:0 0 .5rem}
.cc-p p{font-size:.97rem;margin:0 0 1rem}
.cc-p ul{margin:0;padding:0;list-style:none;display:grid;gap:.4rem}
.cc-p li{position:relative;padding-left:1.1rem;font-size:.9rem;color:var(--fg-2)}
.cc-p li::before{content:"";position:absolute;left:0;top:.62em;width:6px;height:6px;border-radius:50%;border:1.5px solid var(--fg-2);opacity:.6}
.cc-a{display:grid;gap:.3rem;padding:1.3rem 1.6rem 1.5rem;background:var(--t);border-top:2px solid var(--c);text-decoration:none;transition:background .2s}
.cc-a:hover{background:color-mix(in srgb,var(--c) 14%,var(--surface))}
.cc-k{font-size:.84rem;font-weight:600;color:var(--fg-2)}
.cc-a .pmark{font-size:1.45rem;line-height:1.1}
.cc-t{font-size:.96rem;color:var(--fg);line-height:1.5}
/* 3 platforms (tabs) */
.ptabs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:.6rem;margin-bottom:1rem}
.ptabs button{position:relative;display:grid;gap:.1rem;text-align:left;padding:1rem 1.2rem 1.1rem;border-radius:var(--r-lg);border:1px solid var(--border);background:var(--surface);cursor:pointer;font:inherit;color:inherit;overflow:hidden;transition:border-color .2s,background .2s}
.ptabs button::after{content:"";position:absolute;left:0;bottom:0;height:3px;width:100%;background:var(--c);transform:scaleX(0);transform-origin:left;transition:transform .45s var(--ease)}
.ptabs button:hover{border-color:var(--border-strong)}
.ptabs button.on{border-color:color-mix(in srgb,var(--c) 45%,var(--border))}
.ptabs button.on::after{transform:none}
.ptabs .pmark{font-size:1.35rem;line-height:1.1}
.ptabs span{font-size:.88rem;color:var(--fg-2)}
.pstage{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);gap:clamp(1.5rem,4vw,3.5rem);align-items:center;padding:clamp(1.4rem,3.4vw,3rem);border-radius:var(--r-2xl);background:var(--surface);border:1px solid var(--border);animation:fadein .4s var(--ease)}
.pname{display:flex;flex-wrap:wrap;align-items:baseline;gap:.1em .4em;margin:0;font:800 clamp(2.6rem,5.4vw,4.4rem)/.95 var(--mark);letter-spacing:.02em;color:var(--c)}
.pname .hi{font-weight:600;font-size:.58em;color:var(--fg);opacity:.75;letter-spacing:0}
.desc{margin:.8rem 0 0;font:600 clamp(1.08rem,1.5vw,1.22rem)/1.35 var(--font-display);color:var(--fg);max-width:40ch}
.desc span{color:var(--c)}
.pos{margin:.8rem 0 1.2rem;font-size:1rem}
.uc{margin-top:1.4rem}
.uc h4{font-size:.88rem;font-weight:600;color:var(--fg-2);margin:0 0 .3rem}
.uc ul{list-style:none;margin:0;padding:0}
.uc li{display:flex;justify-content:space-between;gap:1rem;padding:.6rem 0;border-bottom:1px solid var(--border)}
.uc b{font-weight:600;font-size:.95rem;color:var(--fg)}.uc small{color:var(--fg-2);font-size:.84rem;white-space:nowrap}
.go{margin-top:1.6rem}
.pstage .go{background:var(--c);color:#fff}
.pstage .go:hover{background:color-mix(in srgb,var(--c) 86%,#000)}
:host-context([data-theme="dark"]) .pstage .go{color:var(--night)}
.pc-art{width:100%;max-width:470px;justify-self:center}
@keyframes fadein{from{opacity:0}to{opacity:1}}
/* framed night bands */
.framed{margin-inline:clamp(8px,1.4vw,20px);border-radius:var(--r-2xl)}
/* 5 engineering */
.found{display:grid;gap:0}
.pillars{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem}
.pillar{position:relative;display:grid;gap:.5rem;padding:1.3rem 1.4rem 1.7rem;background:var(--surface);border:1px solid var(--border);border-top:2px solid var(--c);border-radius:var(--r-lg) var(--r-lg) 0 0;text-decoration:none;transition:border-color .2s}
.pillar:hover{border-color:var(--border-strong);border-top-color:var(--c)}
.pillar .pmark{font-size:1.4rem}
.pillar span{color:var(--fg);font-size:.96rem;line-height:1.5}
.pillar i{position:absolute;left:50%;bottom:-1.2rem;width:2px;height:1.2rem;background:repeating-linear-gradient(var(--eng) 0 4px,transparent 4px 8px)}
.slab{margin-top:1.2rem;border-radius:var(--r-xl);background:var(--eng-tint);border:1px solid color-mix(in srgb,var(--eng) 28%,transparent);padding:1.4rem clamp(1rem,2.5vw,2rem) 1.6rem}
.slab-h{display:flex;flex-wrap:wrap;align-items:baseline;gap:.4rem .9rem;margin-bottom:1.1rem}
.slab-h b{font:600 1.25rem var(--font-display);color:var(--eng);letter-spacing:-.015em}.slab-h span{color:var(--fg-2);font-size:.92rem}
.areas{display:grid;gap:.7rem}
.area{display:grid;grid-template-columns:90px 1fr;gap:1rem;align-items:center;padding-top:.7rem;border-top:1px solid color-mix(in srgb,var(--eng) 20%,transparent)}
.area:first-child{border-top:0;padding-top:0}
.area h3{font-size:.92rem;color:var(--eng);margin:0;font-weight:600;letter-spacing:0}
.area ul{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:.4rem}
.area li{font-size:.9rem;color:var(--fg);padding:.4rem .75rem;border-radius:999px;background:var(--surface);border:1px solid var(--border)}
.btns.center{justify-content:center;margin-top:2.4rem}
/* 8 why (night band) */
.why{display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid var(--border)}
.w{padding:1.8rem 1.8rem 1.8rem 0;border-bottom:1px solid var(--border)}
.w:not(:nth-child(3n+1)){padding-left:1.8rem;border-left:1px solid var(--border)}
.wi{display:grid;place-items:center;width:40px;height:40px;border-radius:12px;background:var(--lavender);color:var(--primary);margin-bottom:1rem}
.wi svg{width:21px;height:21px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
.w h3{font-size:1.1rem;margin:0 0 .35rem}.w p{margin:0;font-size:.95rem}
.proof{display:grid;grid-template-columns:auto auto auto minmax(0,1.4fr);gap:1rem;margin-top:2rem;align-items:stretch}
.pf{display:grid;align-content:center;gap:.25rem;padding:1.1rem 1.4rem;border-radius:var(--r-lg);background:var(--surface);border:1px solid var(--border)}
.pf b{font:600 2rem/1.1 var(--font-display);letter-spacing:-.03em;color:var(--fg);font-variant-numeric:tabular-nums}
.pf span{font-size:.86rem;color:var(--fg-2)}
.pf.cert{gap:.45rem;justify-items:start}.pf.cert .text-link{font-size:.9rem}
.why-cta{display:flex;flex-wrap:wrap;align-items:center;gap:1rem 1.6rem;margin-top:2.2rem}
.why-cta p{margin:0;font-size:.92rem;max-width:56ch}
/* 9 close */
.close{background:var(--bg)}
.close-in{text-align:center;display:grid;justify-items:center}
.close h2{max-width:20ch;margin-bottom:1.1rem;font-size:clamp(2.2rem,5vw,4rem)}
.close .lead{max-width:58ch;margin:0 auto 2rem}
.close .btns{justify-content:center}
/* responsive */
@media(max-width:1000px){
  .cc-grid{grid-template-columns:1fr}
  .pstage{grid-template-columns:1fr}.pc-art{max-width:420px}
  .why{grid-template-columns:1fr 1fr}.w{padding:1.6rem 1.4rem 1.6rem 0!important;border-left:0!important}.w:nth-child(2n){padding-left:1.4rem!important;border-left:1px solid var(--border)!important}
  .proof{grid-template-columns:1fr 1fr 1fr}.pf.cert{grid-column:1/-1}
}
@media(max-width:760px){
  .spools{grid-template-columns:1fr;margin-top:3rem}
  .ptabs{grid-template-columns:1fr 1fr 1fr;gap:.4rem}.ptabs button{padding:.8rem .8rem .9rem}.ptabs span{display:none}
  .pillars{grid-template-columns:1fr;gap:.8rem}.pillar{border-radius:var(--r-lg)}.pillar i{display:none}
  .why{grid-template-columns:1fr}.w{padding:1.4rem 0!important;border-left:0!important}
  .proof{grid-template-columns:1fr 1fr}
  .uc li{flex-direction:column;gap:0}
  .strip-in{justify-content:flex-start}
}
@media(max-width:520px){.area{grid-template-columns:1fr;gap:.4rem}.ptabs .pmark{font-size:1.1rem}}
@media(prefers-reduced-motion:reduce){.rot{display:flex;flex-wrap:wrap;justify-content:center;gap:.4rem 1.6rem;min-height:0}.ri{grid-area:auto;opacity:1;transform:none}}
`]
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  platforms = PLATFORMS; eng = ENGINEERING; why = WHY; tag = TAG; founded = FOUNDED; industries = INDUSTRIES;
  tagline = TAG.map(x => x.t).join(' ');
  whyIcons = WHY_ICONS;
  probIcons = ['M4 6h7M4 12h4M4 18h7M15 6h5M18 12h2M15 18h5', 'M8 4h8l-1 5h3l-8 11 2-8H8z', 'M12 3l8 3v6c0 4.5-3.3 8-8 9.5-4.7-1.5-8-5-8-9.5V6zM9 12l2 2 4-4'];
  areas = (['build', 'connect', 'run', 'scale'] as const).map(k => ({ key: k, label: ENGINEERING.areas[k], items: ENGINEERING.services.filter(s => s.area === k) }));

  /** Highlighted platform in the hero (rotates); selected platform tab further down. */
  t = signal(0);
  ps = signal(0);
  private held = false;
  private timer?: ReturnType<typeof setInterval>;
  private zone = inject(NgZone);

  ngAfterViewInit() {
    const reduce = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    this.zone.runOutsideAngular(() => {
      this.timer = setInterval(() => { if (!this.held && !document.hidden) this.zone.run(() => this.t.set((this.t() + 1) % 3)); }, ROTATE_MS);
    });
  }
  ngOnDestroy() { clearInterval(this.timer); }
  hold(v: boolean) { this.held = v; }
  tabKey(e: KeyboardEvent) {
    const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    this.ps.set((this.ps() + d + 3) % 3);
    document.getElementById('ptab-' + this.ps())?.focus();
  }
  go(id: string) { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
}
