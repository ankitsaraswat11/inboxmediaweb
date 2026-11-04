import { AfterViewInit, Component, NgZone, OnDestroy, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RibbonComponent } from '../components/ribbon.component';
import { HeroVisualComponent } from '../components/hero-visual.component';
import { LifecycleComponent } from '../components/lifecycle.component';
import { IndustryCarouselComponent } from '../components/industry-carousel.component';
import { RevealDirective } from '../components/reveal.directive';
import { CountDirective } from '../components/count.directive';
import { PLATFORMS, TAGLINE } from '../content/platforms';
import { FOUNDED, INDUSTRIES, PRODUCTS } from '../data';

/* =====================================================================
   HOMEPAGE (v2, editorial fabric)
   1 Hero: morphing headline over an iridescent ribbon + platform card
   2 Ecosystem: six orbs whose threads converge into one bundle
   3 Lifecycle: pinned, scroll-driven, draggable timeline (Connect → Engineer)
   4 Integrations: logo-chip marquee + live "core" chip
   5 Cinematic black band: four capability cards with cursor spotlight
   6 Trust statement with counters
   7 Industries carousel (drag / swipe)
   8 AI products grid
   9 Closing call to action
   ===================================================================== */

const WORDS = [
  { w: 'Connected', c: 'var(--sutra)' },
  { w: 'Intelligent', c: 'var(--medha)' },
  { w: 'Trusted', c: 'var(--kavach)' }
];
const PRODUCT_LINE: Record<string, string> = {
  'Aura AI': 'Voice, avatar and visual AI for front desks, support and training.',
  'Tellco': 'Outreach automation: predictive dialing, qualification and bookings.',
  'Custom SLM': 'Domain-specific small language models for enterprise workflows.',
  'TrainExl': 'SOPs, manuals and policies turned into microlearning.',
  'Edge AI': 'Offline, on-premise AI for regulated and remote sites.'
};
const PRODUCT_ICON: Record<string, string> = {
  'Aura AI': 'M12 3a4 4 0 0 1 4 4v4a4 4 0 0 1-8 0V7a4 4 0 0 1 4-4zM5 11a7 7 0 0 0 14 0M12 18v3',
  'Tellco': 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z',
  'Custom SLM': 'M4 6h16M4 12h10M4 18h7M17 14l3 3-3 3M14 20l-1-6',
  'TrainExl': 'M3 8l9-4 9 4-9 4zM7 10v5c0 1.5 2.2 3 5 3s5-1.5 5-3v-5',
  'Edge AI': 'M7 7h10v10H7zM10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4'
};
const MARQUEE = ['SMS & OTP', 'WhatsApp', 'RCS', 'Email', 'IVR', 'Cloud telephony', 'REST APIs', 'Webhooks', 'CRM', 'ERP', 'Helpdesk', 'Public cloud', 'Private cloud', 'On-premise'];

@Component({
  standalone: true,
  imports: [RouterLink, RibbonComponent, HeroVisualComponent, LifecycleComponent, IndustryCarouselComponent, RevealDirective, CountDirective],
  template: `
<!-- 1 · HERO -->
<section class="hero" (mouseenter)="hold(true)" (mouseleave)="hold(false)">
  <app-ribbon variant="hero" [parallax]="90"/>
  <div class="wrap hin">
    <h1 class="ht">
      <span class="l1">The <span class="mw" aria-hidden="true">
        @for (x of words; track x.w; let i = $index) {
          <span class="w" [class.on]="t() === i" [class.pre]="i < t()" [style.--c]="x.c">@for (ch of x.w.split(''); track $index; let k = $index) {<i [style.--k]="k">{{ ch }}</i>}</span>
        }
      </span><span class="sr-only">Connected, Intelligent and Trusted</span></span>
      <span class="l2">Enterprise</span>
      <span class="l3">Fabric.</span>
    </h1>
    <p class="lead hl" reveal=".3">Communication, artificial intelligence and digital trust, woven into one integrated technology platform for modern enterprises.</p>
    <div class="btns hb" reveal=".4">
      <button type="button" class="btn lg" (click)="go('lifecycle')">See how it works <svg class="arr" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>
      <a class="btn lg ghost" routerLink="/contact" [queryParams]="{type:'demo'}">Book a demo</a>
    </div>

    <a class="fcard" routerLink="/platforms" reveal=".55" (pointermove)="tilt($event)" (pointerleave)="untilt($event)">
      <span class="fc-copy">
        <span class="fc-k">One platform · three layers</span>
        <b class="fc-t">@for (p of platforms; track p.slug; let l = $last) {<span class="pmark" [style.--c]="'var(--' + p.slug + ')'">{{ p.name }}</span>@if (!l) {<span class="amp"> · </span>}}</b>
        <span class="fc-s">On a shared Digital Engineering foundation, serving enterprises since {{ founded }}.</span>
        <span class="fc-b">Explore platforms <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>
      </span>
      <span class="fc-art" aria-hidden="true">
        <svg class="arc" viewBox="0 0 300 300"><circle cx="300" cy="150" r="190"/><circle cx="300" cy="150" r="130"/></svg>
        @for (n of nodes; track n.t; let i = $index) {
          <span class="node" [style.top.%]="n.y" [style.left.%]="n.x" [style.--k]="i"><svg viewBox="0 0 24 24"><path [attr.d]="n.d"/></svg>{{ n.t }}<i></i></span>
        }
        <span class="emb"><svg viewBox="0 0 24 24"><path d="M3 8c3-3.5 6 3.5 9 0s6-3.5 9 0M3 12c3-3.5 6 3.5 9 0s6-3.5 9 0M3 16c3-3.5 6 3.5 9 0s6-3.5 9 0"/></svg></span>
      </span>
    </a>
  </div>
</section>

<!-- 2 · ECOSYSTEM -->
<section class="eco ruled">
  <div class="wrap eco-in">
    <div class="eco-copy">
      <h2 reveal>Connecting your enterprise across every interaction.</h2>
      <p class="lead" reveal=".15">End-to-end infrastructure for every channel, system and AI agent you run.</p>
    </div>
    <app-hero-visual/>
  </div>
</section>

<!-- 3 · LIFECYCLE (pinned + movable) -->
<section class="lcs" id="lifecycle" aria-label="How Inbox Media works"><app-lifecycle/></section>

<!-- 4 · INTEGRATIONS -->
<section class="integ ruled">
  <div class="wrap integ-in">
    <div class="icard" reveal>
      <h2>Integrations</h2>
      <p class="lead">Works with the channels and systems you already run, without heavy add-ons.</p>
      <div class="mq" aria-label="Supported channels and systems">
        <div class="mq-t">@for (m of marquee2; track $index) { <span class="mi"><i></i>{{ m }}</span> }</div>
      </div>
      <a class="text-link" routerLink="/integrations">Integrations &amp; technology</a>
    </div>
    <div class="chipviz" aria-hidden="true">
      <div class="bus v"></div><div class="bus h"></div>
      <div class="chip-core"><span class="pins"></span>
        <svg viewBox="0 0 24 24"><path d="M3 8c3-3.5 6 3.5 9 0s6-3.5 9 0M3 12c3-3.5 6 3.5 9 0s6-3.5 9 0M3 16c3-3.5 6 3.5 9 0s6-3.5 9 0"/></svg>
      </div>
    </div>
  </div>
</section>

<!-- 5 · CINEMATIC BAND -->
<section class="cine inverse">
  <app-ribbon variant="band" [parallax]="50"/>
  <div class="wrap">
    <h2 class="cine-h" reveal>Messaging, AI and security, <b>all on one platform.</b></h2>
    <div class="feat" (pointermove)="spot($event)">
      @for (f of feats; track f.t; let i = $index) {
        <article class="ft" [reveal]="i * .08">
          <p>{{ f.t }}</p>
          <span class="fi">@for (d of f.icons; track d) { <svg viewBox="0 0 24 24"><path [attr.d]="d"/></svg> }</span>
        </article>
      }
    </div>
  </div>
</section>

<!-- 6 · TRUST STATEMENT -->
<section class="trust">
  <div class="wrap">
    <h2 class="big" reveal>The connected foundation for enterprises across <b><span [countTo]="industries.length" [from]="1"></span> industries.</b></h2>
    <div class="stats">
      <div reveal=".05"><b [countTo]="founded" [from]="1990"></b><span>Serving enterprises since</span></div>
      <div reveal=".12"><b>3<em>+1</em></b><span>Platforms on a shared engineering foundation</span></div>
      <div reveal=".19"><b [countTo]="products.length" [from]="0"></b><span>In-house AI products</span></div>
      <div reveal=".26"><b [countTo]="industries.length" [from]="0"></b><span>Industries with configured workflows</span></div>
    </div>
  </div>
</section>

<!-- 7 · INDUSTRIES -->
<section class="ind">
  <div class="wrap">
    <div class="sh"><h2 reveal>Configured for the way your industry works.</h2><p class="lead" reveal=".1">Pick your industry below to see how it works for you.</p></div>
    <app-industry-carousel reveal=".1"/>
  </div>
</section>

<!-- 8 · AI PRODUCTS -->
<section class="prods">
  <div class="wrap">
    <h2 class="big c" reveal>Intelligence you can <b>put to work.</b></h2>
    <div class="pg">
      @for (p of products; track p.name; let i = $index) {
        <a class="pc" [routerLink]="'/ai-solutions'" [queryParams]="{p: p.name}" [reveal]="(i % 2) * .08" [style.--h]="210 + i * 28">
          <span class="th"><i></i><svg viewBox="0 0 24 24"><path [attr.d]="icon[p.name]"/></svg><em>MEDHA</em></span>
          <span class="pt"><b>{{ p.name }}</b><span>{{ line[p.name] }}</span></span>
        </a>
      }
      <a class="pc more" routerLink="/ai-solutions" reveal=".08">
        <span class="pt"><b>Explore all AI products</b><span>Use cases, workflows and deployment options.</span></span>
        <svg class="ma" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      </a>
    </div>
  </div>
</section>

<!-- 9 · CLOSE -->
<section class="close">
  <app-ribbon variant="cta" [parallax]="70"/>
  <div class="wrap close-in">
    <h2 reveal>Let's keep your enterprise connected, intelligent &amp; <b lang="hi">सुरक्षित.</b></h2>
    <p class="lead" reveal=".1">Tell us what you need to connect, automate or protect first. We will map where SUTRA, MEDHA, KAVACH and our engineers fit.</p>
    <div class="btns" reveal=".2">
      <a class="btn lg" routerLink="/contact" [queryParams]="{type:'demo'}">Talk to us</a>
      <a class="btn lg ghost" routerLink="/contact" [queryParams]="{type:'proposal'}">Request a proposal</a>
    </div>
  </div>
</section>`,
  styles: [`
:host{display:block}
/* 1 hero */
.hero{position:relative;isolation:isolate;overflow:hidden;min-height:max(100vh,860px);padding:clamp(4.5rem,9vw,7rem) 0 clamp(3rem,6vw,5rem);background:linear-gradient(180deg,var(--bg),color-mix(in srgb,var(--bg) 70%,var(--lavender)))}
.hin{display:grid;justify-items:center;text-align:center}
.ht{display:grid;justify-items:center;margin:0;font-size:clamp(3.2rem,8.4vw,7.6rem);line-height:.98;letter-spacing:-.02em}
.ht > span{display:block;animation:rise 1.2s var(--ease-out) both}
.l1{animation-delay:.05s}.l2{animation-delay:.18s!important}.l3{animation-delay:.3s!important}
@keyframes rise{from{opacity:0;transform:translateY(40px);filter:blur(10px)}to{opacity:1;transform:none;filter:none}}
.mw{display:inline-grid;vertical-align:bottom;justify-items:start}
.w{grid-area:1/1;white-space:nowrap;font-style:italic;color:var(--c);padding-right:.06em}
.w i{display:inline-block;font-style:inherit;opacity:0;transform:translateY(.35em) rotateX(60deg);filter:blur(12px);transition:opacity .55s var(--ease-out),transform .7s var(--ease-out),filter .6s var(--ease-out);transition-delay:calc(var(--k) * 35ms)}
.w.on i{opacity:1;transform:none;filter:none;transition-delay:calc(.25s + var(--k) * 40ms)}
.w.pre i{transform:translateY(-.35em) rotateX(-60deg)}
.hl{max-width:56ch;margin:1.8rem auto 2rem}
.hb{justify-content:center}
/* hero platform card */
.fcard{position:relative;display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,.85fr);width:min(760px,100%);margin-top:clamp(3rem,7vw,5.5rem);border-radius:18px;overflow:hidden;text-align:left;text-decoration:none;color:inherit;background:linear-gradient(120deg,color-mix(in srgb,var(--surface) 92%,transparent),color-mix(in srgb,var(--lavender) 70%,transparent));border:1px solid color-mix(in srgb,var(--border) 80%,#fff);box-shadow:0 40px 80px -40px rgba(43,68,209,.35),inset 0 1px 0 rgba(255,255,255,.7);backdrop-filter:blur(14px);transform:perspective(1000px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg));transition:transform .5s var(--ease-out),box-shadow .4s}
.fcard:hover{box-shadow:0 50px 90px -40px rgba(43,68,209,.5),inset 0 1px 0 rgba(255,255,255,.7)}
.fc-copy{display:grid;align-content:center;gap:.5rem;padding:clamp(1.4rem,3vw,2.4rem)}
.fc-k{font:600 .74rem var(--font-body);letter-spacing:.14em;text-transform:uppercase;color:var(--fg-3)}
.fc-t{font:700 clamp(1.3rem,2.3vw,1.75rem)/1.2 var(--font-body);color:var(--fg)}
.fc-t .pmark{font-weight:800}
.amp{color:var(--fg-3);font-weight:400}
.fc-s{font-size:.9rem;color:var(--fg-2);max-width:36ch}
.fc-b{justify-self:start;display:inline-flex;align-items:center;gap:.45rem;margin-top:.7rem;padding:.6rem 1.05rem;border-radius:999px;background:var(--fg);color:var(--bg);font:600 .86rem var(--font-body);transition:gap .3s var(--ease)}
.fcard:hover .fc-b{gap:.75rem}
.fc-b svg{width:14px;height:14px;fill:none;stroke:currentColor;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}
.fc-art{position:relative;min-height:240px}
.arc{position:absolute;inset:0;width:100%;height:100%}
.arc circle{fill:none;stroke:color-mix(in srgb,var(--primary) 22%,transparent);stroke-width:1;stroke-dasharray:3 6}
.node{position:absolute;display:inline-flex;align-items:center;gap:.4rem;padding:.38rem .6rem;border-radius:8px;background:var(--surface);border:1px solid var(--border);box-shadow:0 8px 20px -10px rgba(20,26,82,.3);font:600 .7rem var(--font-body);color:var(--fg);white-space:nowrap;transform:translate(-50%,-50%);animation:nodef 5s ease-in-out infinite;animation-delay:calc(var(--k) * -.9s)}
.node svg{width:14px;height:14px;fill:none;stroke:var(--primary);stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.node i{position:absolute;left:50%;bottom:-11px;width:6px;height:6px;margin-left:-3px;border-radius:50%;background:var(--accent)}
.node:nth-child(odd) i{background:var(--fg)}
@keyframes nodef{50%{transform:translate(-50%,calc(-50% - 5px))}}
.emb{position:absolute;right:-26px;top:50%;width:110px;height:120px;transform:translateY(-50%);display:grid;place-items:center;border-radius:28px 0 0 28px;background:conic-gradient(from 200deg,#FF7AB6,#A27BFF,#5FB8FF,#FFE07A,#FF7AB6);box-shadow:0 0 50px rgba(162,123,255,.5)}
.emb::before{content:"";position:absolute;inset:6px;border-radius:24px 0 0 24px;background:linear-gradient(135deg,#2B44D1,#7C4DDB)}
.emb svg{position:relative;width:48px;height:48px;fill:none;stroke:#fff;stroke-width:1.8;stroke-linecap:round;margin-right:20px}

/* 2 ecosystem */
.eco{position:relative;padding:clamp(4rem,8vw,7rem) 0 clamp(3rem,6vw,5rem);background-color:var(--bg)}
.eco::before{content:"";position:absolute;left:-10%;top:10%;width:55%;height:80%;background:radial-gradient(closest-side,color-mix(in srgb,#9DB0FF 40%,transparent),transparent);filter:blur(20px);pointer-events:none}
.eco-in{position:relative;display:grid;grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr);gap:2rem;align-items:center}
.eco h2{font-size:clamp(2.4rem,4.6vw,4rem);max-width:13ch}
.eco .lead{margin-top:3rem;color:var(--fg)}

/* 3 lifecycle wrapper */
.lcs{background-color:var(--bg)}

/* 4 integrations */
.integ{position:relative;overflow-x:clip;padding:clamp(3rem,6vw,5rem) 0;background-color:var(--bg)}
.integ-in > *{min-width:0}
.integ-in{display:grid;grid-template-columns:minmax(0,520px) minmax(0,1fr);gap:clamp(1.5rem,4vw,4rem);align-items:center}
.icard{padding:clamp(1.6rem,3vw,2.6rem);border-radius:24px;background:linear-gradient(170deg,color-mix(in srgb,var(--surface) 92%,transparent),color-mix(in srgb,var(--lavender) 80%,transparent));border:1px solid var(--border);box-shadow:var(--shadow-lg)}
.icard h2{font-size:clamp(2.4rem,4vw,3.6rem);margin-bottom:.4em}
.mq{position:relative;overflow:hidden;margin:2.6rem 0 1.8rem;mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent);-webkit-mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)}
.mq-t{display:flex;gap:.6rem;width:max-content;animation:mq 34s linear infinite}
.mq:hover .mq-t{animation-play-state:paused}
@keyframes mq{to{transform:translateX(-50%)}}
.mi{display:inline-flex;align-items:center;gap:.5rem;padding:.6rem .95rem;border-radius:10px;background:var(--surface);border:1px solid var(--border);font:600 .92rem var(--font-body);color:var(--fg);white-space:nowrap}
.mi i{width:8px;height:8px;border-radius:50%;background:var(--iri);box-shadow:0 0 0 3px color-mix(in srgb,var(--primary) 10%,transparent)}
.chipviz{position:relative;overflow:hidden;height:clamp(380px,46vw,560px)}
.bus{position:absolute;--g:repeating-linear-gradient(var(--dir),transparent 0 6px,#5C86FF 6px 10px,transparent 10px 18px)}
.bus.v{left:50%;top:-20%;bottom:-20%;width:120px;margin-left:-60px;--dir:90deg;background:var(--g);mask-image:linear-gradient(180deg,transparent,#000 15%,#000 85%,transparent);-webkit-mask-image:linear-gradient(180deg,transparent,#000 15%,#000 85%,transparent)}
.bus.h{top:50%;left:8%;right:8%;height:120px;margin-top:-60px;--dir:0deg;background:var(--g);mask-image:linear-gradient(90deg,transparent,#000 25%,#000 75%,transparent);-webkit-mask-image:linear-gradient(90deg,transparent,#000 25%,#000 75%,transparent);opacity:.85}
.bus::after{content:"";position:absolute;inset:0;background:linear-gradient(var(--dir2,180deg),transparent 40%,rgba(255,255,255,.95) 50%,transparent 60%);background-size:100% 300%;animation:busflow 2.6s linear infinite}
.bus.h::after{--dir2:90deg;background-size:300% 100%;animation-name:busflowh}
@keyframes busflow{from{background-position:0 100%}to{background-position:0 -200%}}
@keyframes busflowh{from{background-position:100% 0}to{background-position:-200% 0}}
.chip-core{position:absolute;left:50%;top:50%;width:clamp(170px,17vw,230px);aspect-ratio:1;transform:translate(-50%,-50%);border-radius:14px;padding:12px;background:color-mix(in srgb,#BFD0FF 55%,transparent);box-shadow:0 30px 80px -20px rgba(43,68,209,.45);display:grid;place-items:center}
.chip-core::before{content:"";position:absolute;inset:12px;border-radius:8px;background:linear-gradient(160deg,#fff,#EEF2FF)}
:host-context([data-theme="dark"]) .chip-core::before{background:linear-gradient(160deg,#151B45,#0E1333)}
.chip-core svg{position:relative;width:64px;height:64px;fill:none;stroke:var(--primary);stroke-width:1.8;stroke-linecap:round;animation:breathe 3s ease-in-out infinite}
@keyframes breathe{50%{transform:scale(1.08)}}
.pins{position:absolute;inset:-14px;border-radius:18px;background:repeating-linear-gradient(90deg,transparent 0 14px,color-mix(in srgb,#8EA6FF 60%,transparent) 14px 22px) top/100% 14px no-repeat,repeating-linear-gradient(90deg,transparent 0 14px,color-mix(in srgb,#8EA6FF 60%,transparent) 14px 22px) bottom/100% 14px no-repeat,repeating-linear-gradient(0deg,transparent 0 14px,color-mix(in srgb,#8EA6FF 60%,transparent) 14px 22px) left/14px 100% no-repeat,repeating-linear-gradient(0deg,transparent 0 14px,color-mix(in srgb,#8EA6FF 60%,transparent) 14px 22px) right/14px 100% no-repeat;z-index:-1}

/* 5 cinematic band */
.cine{position:relative;isolation:isolate;overflow:hidden;padding:clamp(8rem,16vw,14rem) 0 clamp(4rem,8vw,7rem)}
.cine-h{margin:0 auto clamp(4rem,9vw,8rem);text-align:center;max-width:17ch;font-size:clamp(2.6rem,5.6vw,5rem);line-height:1.1;color:#fff}
.feat{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1.5rem}
.ft{position:relative;overflow:hidden;min-height:clamp(240px,26vw,340px);display:grid;align-content:space-between;gap:2rem;padding:clamp(1.6rem,3.6vw,3.6rem);border-radius:16px;background:linear-gradient(160deg,#0D1130,#05060F 70%);border:1px solid rgba(255,255,255,.12)}
.ft::before{content:"";position:absolute;inset:0;background:radial-gradient(420px circle at var(--x,-100%) var(--y,-100%),rgba(110,140,255,.22),transparent 60%);pointer-events:none}
.ft::after{content:"";position:absolute;inset:0;border-radius:inherit;padding:1px;background:radial-gradient(300px circle at var(--x,-100%) var(--y,-100%),rgba(160,180,255,.8),transparent 60%);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none}
.ft p{position:relative;margin:0;font:400 clamp(1.3rem,2.2vw,2rem)/1.32 var(--font-body);color:#fff;max-width:28ch;letter-spacing:-.01em}
.fi{position:relative;display:flex;gap:1.6rem}
.fi svg{width:40px;height:40px;fill:none;stroke:#5C7CFF;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}

/* 6 trust */
.trust{padding:clamp(6rem,12vw,11rem) 0 clamp(4rem,8vw,7rem);background:var(--bg-alt);text-align:center}
.big{margin:0 auto;max-width:18ch;font-size:clamp(2.8rem,6.6vw,6.2rem);line-height:1.06}
.big b{font-weight:700}
.stats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));margin-top:clamp(3rem,7vw,6rem);border-top:1px solid var(--border)}
.stats > div{display:grid;gap:.4rem;padding:2rem 1rem 0;justify-items:center}
.stats > div + div{border-left:1px solid var(--border)}
.stats b{font:400 clamp(2.4rem,4vw,3.6rem)/1 var(--font-serif);color:var(--fg);font-variant-numeric:tabular-nums}
.stats em{font-style:normal;color:var(--primary)}
.stats span{font-size:.94rem;color:var(--fg-2);max-width:22ch}

/* 7 industries */
.ind{padding:clamp(4rem,8vw,7rem) 0;background:var(--bg-alt)}

/* 8 products */
.prods{padding:clamp(5rem,10vw,9rem) 0;background:var(--bg)}
.big.c{text-align:center;max-width:16ch;margin-bottom:clamp(3rem,6vw,5rem);font-size:clamp(2.6rem,5.6vw,5rem)}
.pg{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1.2rem}
.pc{position:relative;display:grid;grid-template-columns:auto 1fr;gap:clamp(1.2rem,3vw,3rem);align-items:center;padding:10px;border-radius:14px;background:var(--surface);border:1px solid var(--border);text-decoration:none;color:inherit;transition:transform .4s var(--ease),box-shadow .4s,border-color .3s}
.pc:hover{transform:translateY(-4px);box-shadow:var(--shadow-lg);border-color:var(--border-strong)}
.th{position:relative;overflow:hidden;display:grid;place-items:center;width:clamp(130px,13vw,190px);aspect-ratio:1.2;border-radius:8px;background:linear-gradient(140deg,#0B0E2A,hsl(var(--h) 70% 30%) 60%,hsl(calc(var(--h) + 60) 80% 55%));isolation:isolate}
.th i{position:absolute;inset:-40%;background:conic-gradient(from 0deg,transparent,hsl(calc(var(--h) + 40) 90% 70% / .5),transparent 40%);animation:spin 8s linear infinite;z-index:-1}
@keyframes spin{to{transform:rotate(1turn)}}
.th svg{width:44px;height:44px;fill:none;stroke:#fff;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round;transition:transform .5s var(--ease)}
.pc:hover .th svg{transform:scale(1.12)}
.th em{position:absolute;left:10px;bottom:8px;font:700 .62rem var(--mark);font-style:normal;letter-spacing:.1em;color:rgba(255,255,255,.7)}
.pt{display:grid;gap:.4rem;padding-right:1rem}
.pt b{font:700 clamp(1.25rem,1.8vw,1.6rem)/1.2 var(--font-body);color:var(--fg);letter-spacing:-.015em}
.pt span{color:var(--fg-2);font-size:.98rem;line-height:1.5}
.pc.more{grid-template-columns:1fr auto;padding:clamp(1.4rem,2.6vw,2.2rem);background:var(--card-grad);border:0}
.pc.more b,.pc.more span{color:#fff}.pc.more span{opacity:.75}
.ma{width:28px;height:28px;fill:none;stroke:#fff;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;transition:transform .4s var(--ease)}
.pc.more:hover .ma{transform:translateX(6px)}

/* 9 close */
.close{position:relative;isolation:isolate;overflow:hidden;padding:clamp(7rem,14vw,12rem) 0;background:linear-gradient(160deg,#DCE3FF,#EEE6FF 45%,#F6EAFB 70%,#E4EEFF)}
:host-context([data-theme="dark"]) .close{background:linear-gradient(160deg,#0E1440,#1A1240 50%,#0A1636)}
.close-in{display:grid;justify-items:center;text-align:center}
.close h2{max-width:16ch;font-size:clamp(2.8rem,6.8vw,6.4rem);line-height:1.04;margin-bottom:.4em}
.close h2 b{font-family:var(--mark);font-weight:800;letter-spacing:0}
.close .lead{max-width:56ch;margin-bottom:2.4rem}
.close .btns{justify-content:center}

/* responsive */
@media(max-width:1000px){
  .eco-in,.integ-in{grid-template-columns:minmax(0,1fr)}
  .eco .lead{margin-top:1rem}
  .feat,.pg{grid-template-columns:1fr}
  .stats{grid-template-columns:1fr 1fr}.stats > div:nth-child(3){border-left:0}
  .stats > div:nth-child(n+3){padding-top:2rem;border-top:1px solid var(--border);margin-top:2rem}
}
@media(max-width:700px){
  .hero{min-height:0}
  .fcard{grid-template-columns:1fr}.fc-art{min-height:200px}
  .chipviz{height:300px}
  .icard{padding:1.4rem 1.2rem;border-radius:20px;min-width:0}
  .icard h2{font-size:2.1rem}
  .mq{margin:1.6rem 0 1.4rem}
  .mi{font-size:.85rem;padding:.5rem .8rem}
  .pc{grid-template-columns:1fr}.th{width:100%;aspect-ratio:2.4}
}
@media(prefers-reduced-motion:reduce){.mq-t,.th i,.bus::after,.node,.chip-core svg{animation:none}.ht > span{animation:none}}
`]
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  platforms = PLATFORMS; founded = FOUNDED; industries = INDUSTRIES; products = PRODUCTS; tagline = TAGLINE;
  words = WORDS; line = PRODUCT_LINE; icon = PRODUCT_ICON;
  marquee2 = [...MARQUEE, ...MARQUEE];
  nodes = [
    { t: 'Omnichannel', x: 30, y: 16, d: 'M4 5h16v11H8l-4 4z' },
    { t: 'AI agents', x: 18, y: 42, d: 'M12 3l2.5 5.5L20 11l-5.5 2.5L12 19l-2.5-5.5L4 11l5.5-2.5z' },
    { t: 'DPDP & trust', x: 34, y: 66, d: 'M12 3l7 3v5c0 4-3 7.5-7 9-4-1.5-7-5-7-9V6z' },
    { t: 'APIs', x: 60, y: 88, d: 'M8 8l-5 4 5 4M16 8l5 4-5 4' }
  ];
  feats = [
    { t: 'Run SMS, WhatsApp, RCS, voice and email from one orchestrated communication fabric.', icons: ['M4 6h16M4 12h16M4 18h10', 'M12 3a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V6a3 3 0 0 1 3-3zM5 11a7 7 0 0 0 14 0M12 18v3', 'M4 5h16v11H8l-4 4z'] },
    { t: 'AI that runs where your data rules say: public cloud, private cloud, on-premise or offline at the edge.', icons: ['M7 7h10v10H7zM10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4'] },
    { t: 'Plugs into the CRM, ERP and helpdesk you already run, through REST APIs and webhooks.', icons: ['M9 7V3M15 7V3M7 7h10v4a5 5 0 0 1-10 0zM12 16v5'] },
    { t: 'Privacy, security and AI governance built in from day one, not bolted on later.', icons: ['M12 2.8l7.5 2.8v5.8c0 4.4-3.1 7.8-7.5 9.4-4.4-1.6-7.5-5-7.5-9.4V5.6zM8.6 12l2.4 2.4 4.4-4.6'] }
  ];

  /** Morphing hero word. */
  t = signal(0);
  private held = false;
  private timer?: ReturnType<typeof setInterval>;
  private zone = inject(NgZone);

  ngAfterViewInit() {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    this.zone.runOutsideAngular(() => {
      this.timer = setInterval(() => { if (!this.held && !document.hidden) this.zone.run(() => this.t.set((this.t() + 1) % WORDS.length)); }, 3200);
    });
  }
  ngOnDestroy() { clearInterval(this.timer); }
  hold(v: boolean) { this.held = v; }
  go(id: string) { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }

  /** 3D tilt for the hero platform card. */
  tilt(e: PointerEvent) {
    const el = e.currentTarget as HTMLElement; const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    el.style.setProperty('--ry', (x * 8).toFixed(2) + 'deg'); el.style.setProperty('--rx', (-y * 8).toFixed(2) + 'deg');
  }
  untilt(e: PointerEvent) { const el = e.currentTarget as HTMLElement; el.style.setProperty('--ry', '0deg'); el.style.setProperty('--rx', '0deg'); }

  /** Cursor spotlight on the cinematic cards. */
  spot(e: PointerEvent) {
    for (const c of Array.from((e.currentTarget as HTMLElement).children) as HTMLElement[]) {
      const r = c.getBoundingClientRect();
      c.style.setProperty('--x', (e.clientX - r.left) + 'px'); c.style.setProperty('--y', (e.clientY - r.top) + 'px');
    }
  }
}
