import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, QueryList, ViewChild, ViewChildren, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SolutionFinderComponent } from '../components/solution-finder.component';
import { PlatformArtComponent } from '../components/platform-art.component';
import { FabricComponent } from '../components/fabric.component';
import { FOUNDED, INDUSTRIES, PLATFORMS, platformsForIndustry } from '../data';

/** Hero heading words: each platform name in English, then in Hindi (Devanagari). */
const WORDS = PLATFORMS.flatMap((p, i) => [{ t: p.name, hi: false, p: i }, { t: p.hi, hi: true, p: i }]);
const STEP_MS = 1900;

/** Hero background: one ribbon of threads per platform, sweeping up from the bottom-left and crossing on the right. */
const RIBBON_SHAPES = [
  { y0: 790, c1: [420, 830], c2: [760, 150], y1: 170 },
  { y0: 860, c1: [560, 720], c2: [900, 520], y1: 420 },
  { y0: 930, c1: [640, 880], c2: [1020, 240], y1: 650 }
];
const ribbon = (s: typeof RIBBON_SHAPES[number]) => Array.from({ length: 7 }, (_, j) => {
  const o = j * 11, f = j * 16;
  return `M-60,${s.y0 + o} C${s.c1[0]},${s.c1[1] + f} ${s.c2[0] + f},${s.c2[1] + o} 1500,${s.y1 + o * 1.6}`;
});

@Component({
  standalone: true,
  imports: [RouterLink, SolutionFinderComponent, PlatformArtComponent, FabricComponent],
  template: `
<!-- ============ HERO ============ -->
<section class="hero" #hero>
  <svg class="threads" #threads viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    @for (r of ribbons; track r.slug; let k = $index) {
      <g class="ribbon" [class.on]="active() === k" [style.--c]="r.color" [style.--k]="k + 1">
        @for (d of r.paths; track $index) { <path [attr.d]="d"/> }
        <path class="bead" pathLength="1000" [attr.d]="r.paths[3]"/>
        <path class="bead b2" pathLength="1000" [attr.d]="r.paths[5]"/>
      </g>
    }
  </svg>
  <div class="wrap hero-in">
    <p class="kicker">Inbox Media Enterprise Technology Fabric</p>
    <h1>
      <span class="sr-only">SUTRA, MEDHA and KAVACH: the communication, intelligence and trust layers of one connected enterprise.</span>
      <span class="roll" aria-hidden="true">
        @for (w of words; track $index; let i = $index) {
          <span class="w" [class.hi]="w.hi" [class.on]="i === step()" [class.out]="i === prev()" [style.color]="platforms[w.p].color" [attr.lang]="w.hi ? 'hi' : null">{{ w.t }}</span>
        }
      </span>
      <span class="layer" aria-hidden="true">
        @for (p of platforms; track p.slug; let k = $index) { <span [class.on]="active() === k">{{ p.layer }}.</span> }
      </span>
    </h1>
    <p class="lead">Three proprietary platforms that connect every customer interaction, make every process intelligent and protect every exchange. From Inbox Media, serving enterprises since {{ founded }}.</p>
    <div class="cta2">
      <a class="btn" routerLink="/contact" [queryParams]="{type:'demo'}">Book a demo</a>
      <button type="button" class="btn ghost" (click)="go('platforms')">Explore the platforms</button>
    </div>
    <div class="seg" [class.paused]="!playing()">
      @for (p of platforms; track p.slug; let k = $index) {
        <button type="button" [class.on]="active() === k" [style.--c]="p.color" (click)="go(p.slug)" [attr.aria-label]="'Go to ' + p.name + ', ' + p.short">
          <i class="bar"><i [style.animation-duration.ms]="stepMs * 2"></i></i><b>{{ p.name }}</b><span>{{ p.short }}</span>
        </button>
      }
      <button type="button" class="pp" (click)="toggle()" [attr.aria-label]="playing() ? 'Pause heading animation' : 'Play heading animation'">
        @if (playing()) { <svg viewBox="0 0 16 16" aria-hidden="true"><rect x="3" y="2" width="3.5" height="12" rx="1"/><rect x="9.5" y="2" width="3.5" height="12" rx="1"/></svg> }
        @else { <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2.5v11l9-5.5z"/></svg> }
      </button>
    </div>
  </div>
</section>

<!-- ============ PLATFORM SHOWCASE (stacked cards) ============ -->
<section class="plat" id="platforms">
  <div class="wrap">
    <div class="head">
      <h2>Three platforms. One connected enterprise.</h2>
      <p class="lead">Our integrated technology architecture brings communication, intelligence and digital trust together to power the next generation of enterprise operations.</p>
    </div>
    <div class="stack">
      @for (p of platforms; track p.slug; let i = $index) {
        <article #card class="pc" [id]="p.slug" [style.--c]="p.color" [style.--t]="p.tint" [style.--i]="i">
          <div class="pc-copy">
            <p class="pc-top"><span class="pager">{{ i + 1 }}/{{ platforms.length }}</span><span>{{ p.layer }}</span></p>
            <h3 class="pname"><span>{{ p.name }}</span> <span class="hi" lang="hi">{{ p.hi }}</span></h3>
            <p class="desc">{{ p.descriptor }}</p>
            <p class="stmt">{{ p.statement }}</p>
            <ul class="tech" [attr.aria-label]="p.name + ' technology landscape'">@for (t of p.tech; track t) { <li>{{ t }}</li> }</ul>
            <div class="inc"><span>Includes</span>@for (x of p.includes; track x.name) { <a [routerLink]="x.link">{{ x.name }}</a> }</div>
            <a class="more" [routerLink]="['/platforms', p.slug]">Explore {{ p.name }}<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M11 5l5 5-5 5"/></svg></a>
          </div>
          <div class="pc-art"><app-platform-art [slug]="p.slug"/><p class="tag">{{ p.tagline }}</p></div>
        </article>
      }
    </div>
  </div>
</section>

<!-- ============ ONE PLATFORM (dark band) ============ -->
<section class="band">
  <div class="wrap band-in">
    <div class="band-copy">
      <h2>One integrated enterprise platform</h2>
      <p class="big">Connected. Intelligent. Secure.</p>
      <p>KAVACH is not a step that comes after MEDHA. Trust, privacy and governance run across every layer, from the first message SUTRA sends to every decision MEDHA makes.</p>
      <dl class="facts4">
        @for (f of facts; track f.t) { <div><dt>{{ f.t }}</dt><dd>{{ f.d }}</dd></div> }
      </dl>
      <a class="btn" routerLink="/contact" [queryParams]="{type:'demo'}">See the platforms in action</a>
    </div>
    <app-fabric/>
  </div>
</section>

<!-- ============ TECHNOLOGY LANDSCAPE (marquee) ============ -->
<section class="land">
  <div class="wrap"><h2>The technology inside each layer</h2><p>Each platform is built on its own technology landscape.</p></div>
  <div class="rows">
    @for (p of rows; track p.slug; let k = $index) {
      <div class="row" [style.--c]="p.color" [style.--t]="p.tint" [class.rev]="k % 2 === 1">
        <a class="rname" [routerLink]="['/platforms', p.slug]">{{ p.name }}</a>
        <div class="mq"><div class="mt" [style.animation-duration.s]="34 + k * 6">@for (t of p.loop; track $index) { <span>{{ t }}</span> }</div></div>
      </div>
    }
  </div>
</section>

<app-solution-finder></app-solution-finder>

<!-- ============ INDUSTRIES (slider) ============ -->
<section class="ind">
  <div class="wrap">
    <div class="ind-head">
      <h2>One fabric, configured for your industry</h2>
      <div class="arrows">
        <span class="count" aria-live="polite">{{ indPos() }}/{{ inds.length }}</span>
        <button type="button" (click)="slide(rail, -1)" aria-label="Previous industry"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M12 4l-6 6 6 6"/></svg></button>
        <button type="button" (click)="slide(rail, 1)" aria-label="Next industry"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M8 4l6 6-6 6"/></svg></button>
      </div>
    </div>
    <div class="rail" #rail (scroll)="onRail(rail)">
      @for (x of inds; track x.name) {
        <a class="ic" routerLink="/industries">
          <h3>{{ x.name }}</h3><p>{{ x.text }}</p>
          <div class="uses">@for (p of x.platforms; track p.slug) { <span [style.--c]="p.color" [style.--t]="p.tint">{{ p.name }}</span> }</div>
        </a>
      }
    </div>
  </div>
</section>

<!-- ============ TRUST ============ -->
<section class="trust">
  <div class="wrap">
    <h2>Proof, published only when verified</h2>
    <div class="t3">
      <div><h3>Certifications</h3><p>Certificate numbers, certification body, scope and validity are published after verification.</p><a routerLink="/about/certifications">View certification details</a></div>
      <div><h3>Case studies</h3><p>Real workflows and measurable results will appear here once approved.</p><a routerLink="/resources">Planned resources</a></div>
      <div><h3>Client logos and demos</h3><p>Only approved logos and live product demonstrations will be shown.</p><a routerLink="/contact" [queryParams]="{type:'demo'}">Ask for a live demo</a></div>
    </div>
  </div>
</section>

<!-- ============ CLOSING CTA ============ -->
<section class="close">
  <div class="wrap close-in">
    <h2>Start with one layer. Grow into all three.</h2>
    <p class="lead">Tell us which problem comes first: reaching customers, automating work or proving compliance. We will map where SUTRA, MEDHA and KAVACH fit.</p>
    <div class="cta2"><a class="btn" routerLink="/contact" [queryParams]="{type:'demo'}">Book a demo</a><a class="btn ghost" routerLink="/contact" [queryParams]="{type:'proposal'}">Request a proposal</a></div>
  </div>
</section>`,
  styles: [`
/* ---------- hero ---------- */
.hero{position:relative;overflow:hidden;isolation:isolate;background:radial-gradient(120% 90% at 85% 10%,#f3edfc 0%,#fbfaff 45%,#fff 70%);min-height:min(calc(100svh - var(--nh)),900px);display:flex;align-items:center}
.threads{position:absolute;inset:0;width:100%;height:100%;z-index:-1}
.ribbon{color:var(--c);transform:translate(calc(var(--px,0) * var(--k) * 7px),calc(var(--py,0) * var(--k) * 5px));transition:transform .6s cubic-bezier(.2,.7,.2,1)}
.ribbon path{fill:none;stroke:currentColor;stroke-width:1.2;stroke-opacity:.16;transition:stroke-opacity .9s ease,stroke-width .9s ease}
.ribbon.on path{stroke-opacity:.5;stroke-width:1.5}
.ribbon .bead{stroke-width:3;stroke-linecap:round;stroke-dasharray:70 930;stroke-dashoffset:1000;stroke-opacity:0;animation:bead 5.5s linear infinite}
.ribbon .b2{animation-delay:-2.7s}
.ribbon.on .bead{stroke-opacity:.9}
@keyframes bead{to{stroke-dashoffset:0}}
.hero-in{padding-block:clamp(3rem,8vh,6rem) clamp(2.5rem,7vh,5rem);position:relative}
.kicker{margin:0 0 1.2rem;color:var(--navy);font-weight:600;font-size:clamp(.95rem,1.3vw,1.08rem);display:flex;align-items:center;gap:.7rem}
.kicker::before{content:"";width:34px;height:2px;background:linear-gradient(90deg,var(--sutra),var(--medha),var(--kavach))}
h1{margin:0;color:var(--navy);max-width:none}
.roll{display:grid;font:800 clamp(4.2rem,20vw,11.5rem)/1.04 var(--mark);letter-spacing:.01em;margin:-.06em 0 0 -.04em;padding:.12em 0 .2em;overflow:hidden}
.w{grid-area:1/1;align-self:end;opacity:0;transform:translateY(70%);filter:blur(6px);transition:opacity .3s ease,transform .55s cubic-bezier(.5,0,.75,0),filter .3s ease;will-change:transform}
.w.hi{font-weight:700;letter-spacing:0}
.w.on{opacity:1;transform:none;filter:none;transition:opacity .45s ease .22s,transform .7s cubic-bezier(.2,.8,.2,1) .22s,filter .45s ease .22s}
.w.out{opacity:0;transform:translateY(-70%);filter:blur(6px)}
.layer{display:grid;font:700 clamp(1.6rem,3.6vw,3rem)/1.15 Sora,Inter,sans-serif;letter-spacing:-.03em;margin-top:0}
.layer span{grid-area:1/1;opacity:0;transform:translateX(-14px);transition:opacity .5s ease,transform .6s ease}
.layer span.on{opacity:1;transform:none;transition-delay:.12s}
.hero .lead{max-width:56ch;margin:1.4rem 0 0;color:var(--mute)}
.cta2{display:flex;gap:.8rem;flex-wrap:wrap;margin:1.8rem 0 0}
button.btn{font-family:Inter,system-ui,sans-serif}
.hero .btn.ghost{background:rgba(255,255,255,.7);backdrop-filter:blur(6px)}
.seg{display:flex;align-items:stretch;gap:.6rem;margin-top:clamp(2rem,6vh,3.5rem);max-width:760px}
.seg>button:not(.pp){flex:1;min-width:0;text-align:left;background:none;border:0;padding:0 0 .2rem;cursor:pointer;font:inherit;color:var(--mute)}
.bar{display:block;height:3px;border-radius:3px;background:rgba(27,16,51,.1);overflow:hidden;margin-bottom:.65rem}
.bar i{display:block;height:100%;width:0;background:var(--c)}
.seg>button.on .bar i{animation:fill linear forwards}
.seg.paused>button.on .bar i{animation:none;width:100%}
.seg b{display:block;font:700 1.05rem var(--mark);letter-spacing:.05em;color:var(--navy);transition:color .3s}
.seg span{display:block;font-size:.85rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.seg>button.on b,.seg>button:hover b{color:var(--c)}
.pp{flex:0 0 40px;height:40px;align-self:center;border-radius:50%;border:1px solid var(--line);background:#fff;cursor:pointer;display:grid;place-items:center;color:var(--navy)}
.pp svg{width:14px;height:14px;fill:currentColor}
@keyframes fill{from{width:0}to{width:100%}}

/* ---------- platform showcase ---------- */
.plat{padding:clamp(4rem,9vw,7.5rem) 0 clamp(3rem,6vw,5rem);background:#fff}
.head{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:2rem 4rem;align-items:end;margin-bottom:clamp(2rem,5vw,3.5rem)}
.head h2{margin:0;max-width:16ch;font-size:clamp(2rem,4.4vw,3.6rem);letter-spacing:-.035em}
.head .lead{margin:0}
.stack{display:grid;gap:clamp(1.5rem,4vw,2.5rem)}
.pc{--p:0;position:sticky;top:calc(var(--nh) + 20px + var(--i) * 18px);display:grid;grid-template-columns:minmax(0,1.08fr) minmax(0,.92fr);gap:clamp(1rem,4vw,3.5rem);align-items:center;padding:clamp(1.4rem,3.4vw,3rem);border-radius:32px;background:var(--t);border:1px solid color-mix(in srgb,var(--c) 18%,transparent);transform-origin:50% 0;transform:scale(calc(1 - var(--p) * .05));box-shadow:0 -14px 40px rgba(27,16,51,calc(.04 + var(--i) * .03));overflow:hidden}
.pc::after{content:"";position:absolute;inset:0;background:#1b1033;opacity:calc(var(--p) * .22);pointer-events:none;border-radius:inherit}
.pc-top{display:flex;align-items:center;gap:.8rem;margin:0 0 1rem;font-weight:600;color:var(--c);font-size:.95rem}
.pager{display:inline-grid;place-items:center;min-width:3.2rem;height:2rem;padding:0 .7rem;border-radius:99px;background:var(--c);color:#fff;font:700 .85rem Sora,sans-serif;letter-spacing:.04em}
.pname{display:flex;flex-wrap:wrap;align-items:baseline;gap:.15em .45em;margin:0;font:800 clamp(3rem,7vw,5.6rem)/.95 var(--mark);letter-spacing:.01em;color:var(--c)}
.pname .hi{font-weight:600;font-size:.62em;color:var(--navy);opacity:.8}
.desc{margin:.6rem 0 0;font:600 clamp(1.1rem,1.8vw,1.4rem)/1.3 Sora,Inter,sans-serif;color:var(--navy);letter-spacing:-.01em}
.stmt{margin:.9rem 0 0;font-size:1.04rem;color:#4a4060;max-width:52ch}
.tech{list-style:none;margin:1.3rem 0 0;padding:0;display:flex;flex-wrap:wrap;gap:.4rem}
.tech li{font-size:.82rem;font-weight:600;color:var(--navy);background:#fff;border:1px solid color-mix(in srgb,var(--c) 30%,transparent);border-radius:99px;padding:.3rem .75rem}
.inc{display:flex;flex-wrap:wrap;align-items:center;gap:.3rem .9rem;margin-top:1.2rem;font-size:.9rem}
.inc>span{color:var(--mute)}
.inc a{color:var(--navy);font-weight:600;text-decoration:underline;text-decoration-color:color-mix(in srgb,var(--c) 50%,transparent);text-underline-offset:4px}
.inc a:hover{color:var(--c)}
.more{display:inline-flex;align-items:center;gap:.5rem;margin-top:1.5rem;font-weight:700;color:#fff;background:var(--c);text-decoration:none;padding:.75rem 1.2rem;border-radius:12px;transition:gap .2s}
.more svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.more:hover{gap:.8rem}
.pc-art{--c:inherit;position:relative;display:grid;justify-items:center;align-content:center}
.pc-art app-platform-art{width:min(100%,440px);color:var(--c)}
.tag{margin:.6rem 0 0;font:700 clamp(1.2rem,2vw,1.5rem) var(--mark);color:var(--c);text-align:center}

/* ---------- dark band ---------- */
.band{background:radial-gradient(70% 60% at 100% 0%,rgba(103,58,183,.35),transparent 60%),radial-gradient(50% 50% at 0% 100%,rgba(0,137,123,.22),transparent 60%),#1b1033;color:#fff;padding:clamp(4rem,9vw,7rem) 0;border-radius:40px 40px 0 0;margin-top:-1px}
.band-in{display:grid;grid-template-columns:minmax(0,.95fr) minmax(0,1.05fr);gap:clamp(2rem,5vw,4.5rem);align-items:center}
.band h2{color:#fff;margin:0;font-size:clamp(1.9rem,3.8vw,3.1rem);letter-spacing:-.035em}
.big{font:700 clamp(1.3rem,2.4vw,1.9rem) var(--mark);color:#ff8a65;margin:.6rem 0 1rem}
.band p{color:#d9cff0}
.facts4{display:grid;grid-template-columns:1fr 1fr;gap:1.2rem 1.6rem;margin:1.6rem 0 2rem}
.facts4 div{border-top:1px solid rgba(255,255,255,.16);padding-top:.8rem}
.facts4 dt{font-weight:700;color:#fff;margin-bottom:.25rem}
.facts4 dd{margin:0;color:#c9bde3;font-size:.94rem;line-height:1.6}
.band .btn{background:#ff7043;color:#1b1033;box-shadow:0 10px 28px rgba(255,112,67,.35)}

/* ---------- technology marquee ---------- */
.land{padding:clamp(4rem,8vw,6.5rem) 0;background:#fff}
.land h2{margin:0 0 .4rem}.land .wrap p{margin:0 0 2rem}
.rows{display:grid;gap:.9rem}
.row{display:grid;grid-template-columns:auto minmax(0,1fr);align-items:center;gap:1rem;padding-left:var(--gut)}
.rname{font:800 clamp(1.3rem,2.4vw,1.9rem) var(--mark);color:var(--c);text-decoration:none;letter-spacing:.04em;min-width:6.4ch}
.mq{overflow:hidden;-webkit-mask-image:linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent);mask-image:linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent)}
.mt{display:flex;gap:.7rem;width:max-content;animation:mq linear infinite}
.row.rev .mt{animation-direction:reverse}
.row:hover .mt{animation-play-state:paused}
.mt span{white-space:nowrap;padding:.75rem 1.3rem;border-radius:14px;background:var(--t);color:var(--navy);font-weight:600;border:1px solid color-mix(in srgb,var(--c) 20%,transparent)}
@keyframes mq{to{transform:translateX(-50%)}}

/* ---------- industries ---------- */
.ind{padding:clamp(4rem,8vw,6.5rem) 0;background:linear-gradient(180deg,#faf8fe,#f3eefb)}
.ind-head{display:flex;justify-content:space-between;align-items:flex-end;gap:1rem;flex-wrap:wrap;margin-bottom:1.6rem}
.ind-head h2{margin:0}
.arrows{display:flex;align-items:center;gap:.6rem}
.count{font:600 .95rem Sora,sans-serif;color:var(--navy);min-width:3.2rem;text-align:right;margin-right:.4rem}
.arrows button{width:48px;height:48px;border-radius:50%;border:1px solid var(--line);background:#fff;color:var(--navy);cursor:pointer;display:grid;place-items:center;transition:background .2s,color .2s}
.arrows button:hover{background:var(--navy);color:#fff}
.arrows svg{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.rail{display:flex;gap:1rem;overflow-x:auto;scroll-snap-type:x mandatory;padding:.3rem .1rem 1rem;scrollbar-width:none}
.rail::-webkit-scrollbar{display:none}
.ic{flex:0 0 min(340px,84%);scroll-snap-align:start;display:flex;flex-direction:column;background:#fff;border:1px solid var(--line);border-radius:24px;padding:1.5rem;text-decoration:none;color:inherit;min-height:230px;transition:border-color .2s,transform .25s}
.ic:hover{border-color:#c9b8e8;transform:translateY(-3px)}
.ic h3{font-size:1.3rem;margin:0 0 .5rem}.ic p{margin:0 0 1.2rem;font-size:.97rem}
.uses{margin-top:auto;display:flex;flex-wrap:wrap;gap:.4rem}
.uses span{font:700 .78rem var(--mark);letter-spacing:.06em;color:var(--c);background:var(--t);border-radius:8px;padding:.3rem .6rem}

/* ---------- trust ---------- */
.trust{padding:clamp(3.5rem,7vw,5.5rem) 0;background:#fff}
.trust h2{margin:0 0 1.6rem}
.t3{display:grid;gap:2rem;grid-template-columns:repeat(auto-fit,minmax(min(260px,100%),1fr))}
.t3 div{border-top:2px solid var(--navy);padding-top:1rem}.t3 p{margin:0 0 .6rem}.t3 a{font-weight:600}

/* ---------- closing ---------- */
.close{background:#1b1033;color:#fff;padding:clamp(4rem,9vw,7rem) 0;position:relative;overflow:hidden;isolation:isolate}
.close::before{content:"";position:absolute;inset:auto -10% -60% -10%;height:120%;z-index:-1;background:repeating-radial-gradient(ellipse at 50% 100%,transparent 0 22px,rgba(255,138,101,.10) 22px 23px,transparent 23px 46px,rgba(179,157,219,.10) 46px 47px,transparent 47px 70px,rgba(77,182,172,.10) 70px 71px)}
.close h2{color:#fff;margin:0 0 1rem;max-width:20ch;font-size:clamp(2rem,4.4vw,3.5rem);letter-spacing:-.035em}
.close .lead{color:#d9cff0;max-width:60ch}
.close .btn{background:#ff7043;color:#1b1033;box-shadow:none}
.close .btn.ghost{background:transparent;color:#fff;border:1px solid rgba(255,255,255,.5)}

/* ---------- responsive ---------- */
@media(max-width:1000px){
  .head,.band-in{grid-template-columns:1fr}
  .pc{position:relative;top:auto;grid-template-columns:1fr;transform:none}
  .pc::after{display:none}
  .pc-art{max-width:400px;justify-self:center;width:100%}
}
@media(max-width:640px){
  .seg{gap:.5rem}.seg span{display:none}.pp{flex-basis:36px;height:36px}
  .ribbon path{stroke-opacity:.1}.ribbon.on path{stroke-opacity:.28}
  .hero{align-items:flex-start}
  .facts4{grid-template-columns:1fr}
  .band{border-radius:28px 28px 0 0}
  .pc{border-radius:24px}
  .row{grid-template-columns:1fr;gap:.5rem}
}
@media(prefers-reduced-motion:reduce){.w,.layer span{transition:none!important}.mt{animation:none}.mq{overflow-x:auto}}
`]
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  platforms = PLATFORMS; words = WORDS; founded = FOUNDED; stepMs = STEP_MS;
  ribbons = PLATFORMS.map((p, k) => ({ slug: p.slug, color: p.color, paths: ribbon(RIBBON_SHAPES[k]) }));
  rows = PLATFORMS.map(p => ({ ...p, loop: [...p.tech, ...p.tech, ...p.tech, ...p.tech] }));
  inds = INDUSTRIES.map(i => ({ ...i, platforms: platformsForIndustry(i) }));
  facts = [
    { t: 'Every channel, one fabric', d: 'SMS, RCS, WhatsApp, email, voice and IVR run as one coordinated journey.' },
    { t: 'In your customers’ languages', d: 'Multilingual conversations across chat and voice.' },
    { t: 'Cloud, on-premise or offline', d: 'Edge AI runs on site where data must stay under your control.' },
    { t: 'Compliance built in', d: 'DLT-compliant messaging and ISO 42001 AI readiness support.' }
  ];

  step = signal(0);
  prev = signal(-1);
  playing = signal(true);
  active = computed(() => WORDS[this.step()].p);
  indPos = signal(1);

  @ViewChild('hero') hero!: ElementRef<HTMLElement>;
  @ViewChild('threads') threads!: ElementRef<SVGSVGElement>;
  @ViewChildren('card') cards!: QueryList<ElementRef<HTMLElement>>;

  private zone = inject(NgZone);
  private timer: ReturnType<typeof setInterval> | undefined;
  private heroVisible = true;
  private io?: IntersectionObserver;
  private raf = 0;
  private cleanup: (() => void)[] = [];

  ngAfterViewInit() {
    const reduce = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) this.playing.set(false);
    this.restart();

    // Pause the heading rotation while the hero is off screen.
    if (typeof IntersectionObserver !== 'undefined') {
      this.io = new IntersectionObserver(([e]) => { this.heroVisible = e.isIntersecting; });
      this.io.observe(this.hero.nativeElement);
    }

    this.zone.runOutsideAngular(() => {
      // Subtle parallax on the hero threads.
      const hero = this.hero.nativeElement, svg = this.threads.nativeElement;
      const onMove = (e: PointerEvent) => {
        const r = hero.getBoundingClientRect();
        svg.style.setProperty('--px', (((e.clientX - r.left) / r.width) - .5).toFixed(3));
        svg.style.setProperty('--py', (((e.clientY - r.top) / r.height) - .5).toFixed(3));
      };
      if (!reduce) { hero.addEventListener('pointermove', onMove); this.cleanup.push(() => hero.removeEventListener('pointermove', onMove)); }

      // Stacked cards: each card shrinks and dims slightly as the next one slides over it.
      const onScroll = () => { if (!this.raf) this.raf = requestAnimationFrame(() => { this.raf = 0; this.stackFx(); }); };
      addEventListener('scroll', onScroll, { passive: true });
      addEventListener('resize', onScroll, { passive: true });
      this.cleanup.push(() => { removeEventListener('scroll', onScroll); removeEventListener('resize', onScroll); });
      onScroll();
    });
  }

  ngOnDestroy() {
    clearInterval(this.timer); this.io?.disconnect(); cancelAnimationFrame(this.raf); this.cleanup.forEach(f => f());
  }

  private restart() {
    clearInterval(this.timer);
    if (!this.playing()) return;
    this.timer = setInterval(() => {
      if (!this.heroVisible || document.hidden) return;
      this.prev.set(this.step());
      this.step.set((this.step() + 1) % WORDS.length);
    }, STEP_MS);
  }

  toggle() { this.playing.set(!this.playing()); this.restart(); }

  private stackFx() {
    const els = this.cards.map(c => c.nativeElement);
    const sticky = matchMedia('(min-width: 1001px)').matches;
    els.forEach((el, i) => {
      const next = els[i + 1];
      if (!sticky || !next) { el.style.setProperty('--p', '0'); return; }
      const a = el.getBoundingClientRect(), b = next.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, 1 - (b.top - a.top - 18) / a.height));
      el.style.setProperty('--p', p.toFixed(3));
    });
  }

  go(id: string) { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  slide(el: HTMLElement, d: number) {
    const card = el.querySelector<HTMLElement>('.ic');
    el.scrollBy({ left: d * ((card?.offsetWidth ?? 320) + 16), behavior: 'smooth' });
  }
  onRail(el: HTMLElement) {
    const card = el.querySelector<HTMLElement>('.ic');
    const w = (card?.offsetWidth ?? 320) + 16;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
    this.indPos.set(atEnd ? this.inds.length : Math.min(this.inds.length, Math.round(el.scrollLeft / w) + 1));
  }
}
