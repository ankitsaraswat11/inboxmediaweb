import { Component, computed, effect, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { PlatformArtComponent } from '../components/platform-art.component';
import { FabricComponent } from '../components/fabric.component';
import { INDUSTRIES, PLATFORMS, platformBySlug, platformsForIndustry } from '../data';

@Component({
  standalone: true,
  imports: [RouterLink, PlatformArtComponent, FabricComponent],
  template: `
  @if (p(); as p) {
  <section class="phero" [style.--c]="p.color" [style.--t]="p.tint">
    <div class="wrap phero-in">
      <div>
        <nav class="pnav" aria-label="Platforms">
          <span class="pager">{{ idx() + 1 }}/{{ all.length }}</span>
          @for (o of all; track o.slug) {
            <a [routerLink]="['/platforms', o.slug]" [class.on]="o.slug === p.slug" [style.--oc]="o.color" [attr.aria-current]="o.slug === p.slug ? 'page' : null">{{ o.name }}</a>
          }
        </nav>
        <p class="layer">{{ p.layer }}</p>
        <h1>{{ p.name }}</h1>
        <p class="desc">{{ p.descriptor }}</p>
        <p class="stmt">{{ p.statement }}</p>
        <div class="cta2">
          <a class="btn" routerLink="/contact" [queryParams]="{type:'demo'}">Book a {{ p.name }} demo</a>
          <a class="btn ghost" routerLink="/contact" [queryParams]="{type:'proposal'}">Request a proposal</a>
        </div>
      </div>
      <div class="art"><app-platform-art [slug]="p.slug"/></div>
    </div>
  </section>

  <section class="meaning" [style.--l]="p.light">
    <div class="wrap mean-in">
      <p class="quote">{{ p.meaning }}</p>
      <p class="tagline">{{ p.tagline }}</p>
    </div>
  </section>

  <section class="inside" [style.--c]="p.color" [style.--t]="p.tint">
    <div class="wrap">
      <h2>What {{ p.name }} brings together</h2>
      <div class="parts">
        @for (x of p.includes; track x.name) {
          <a class="part" [routerLink]="x.link">
            @if (x.from) { <span class="via">Across {{ viaPlatform(x.from) }}</span> }
            <h3>{{ x.name }}</h3><p>{{ x.text }}</p><span class="go">See details</span>
          </a>
        }
      </div>
      <h3 class="tl">Technology landscape</h3>
      <ul class="tech">@for (t of p.tech; track t) { <li>{{ t }}</li> }</ul>
    </div>
  </section>

  <section class="where">
    <div class="wrap where-in">
      <div>
        <h2>Where {{ p.name }} sits in the fabric</h2>
        <p>{{ p.name }} is {{ p.layer.toLowerCase() }} of the Inbox Media enterprise technology fabric. SUTRA connects, MEDHA makes things intelligent, and KAVACH protects across both.</p>
        @if (industries().length) {
          <p class="il">Used in</p>
          <div class="chips">@for (i of industries(); track i.name) { <a routerLink="/industries">{{ i.name }}</a> }</div>
        }
      </div>
      <app-fabric [active]="p.slug"/>
    </div>
  </section>

  <section class="next" [style.--c]="nextP().color" [style.--t]="nextP().tint">
    <div class="wrap next-in">
      <a [routerLink]="['/platforms', nextP().slug]">
        <span class="nl">Next platform</span>
        <span class="nn">{{ nextP().name }}</span>
        <span class="nd">{{ nextP().descriptor }}</span>
      </a>
    </div>
  </section>
  }`,
  styles: [`
  .phero{background:radial-gradient(90% 80% at 90% 0%,var(--t),#fff 65%);padding:clamp(2.5rem,6vw,5rem) 0 clamp(2.5rem,5vw,4rem);border-bottom:1px solid var(--line)}
  .phero-in{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);gap:clamp(1.5rem,4vw,3.5rem);align-items:center}
  .pnav{display:flex;align-items:center;gap:.4rem;flex-wrap:wrap;margin-bottom:1.6rem}
  .pager{display:inline-grid;place-items:center;height:2rem;padding:0 .8rem;border-radius:99px;background:var(--c);color:#fff;font:700 .85rem Sora,sans-serif;margin-right:.4rem}
  .pnav a{font:700 .95rem var(--mark);letter-spacing:.06em;color:var(--mute);text-decoration:none;padding:.35rem .8rem;border-radius:99px;border:1px solid transparent}
  .pnav a:hover{color:var(--oc)}
  .pnav a.on{color:var(--oc);border-color:currentColor;background:#fff}
  .layer{margin:0 0 .4rem;font-weight:600;color:var(--c)}
  h1{font:800 clamp(3.6rem,10vw,8rem)/.95 var(--mark);letter-spacing:.01em;color:var(--c);margin:0;max-width:none}
  .desc{font:600 clamp(1.2rem,2.2vw,1.7rem)/1.25 Sora,Inter,sans-serif;color:var(--navy);margin:.8rem 0 0;max-width:28ch}
  .stmt{font-size:1.1rem;margin:1rem 0 0;max-width:52ch}
  .cta2{display:flex;gap:.8rem;flex-wrap:wrap;margin-top:1.8rem}
  .cta2 .btn:not(.ghost){background:var(--c);box-shadow:0 10px 24px color-mix(in srgb,var(--c) 30%,transparent)}
  .cta2 .btn.ghost{color:var(--c);border-color:color-mix(in srgb,var(--c) 45%,transparent)}
  .art{max-width:460px;width:100%;justify-self:center;color:var(--c)}
  .meaning{background:var(--navy);padding:clamp(3rem,6vw,4.5rem) 0}
  .mean-in{display:grid;grid-template-columns:minmax(0,1.6fr) minmax(0,1fr);gap:2rem;align-items:end}
  .quote{margin:0;color:#fff;font:500 clamp(1.25rem,2.3vw,1.8rem)/1.45 Sora,Inter,sans-serif;letter-spacing:-.01em;max-width:44ch}
  .tagline{margin:0;font:700 clamp(1.6rem,3vw,2.4rem) var(--mark);color:var(--l);text-align:right}
  .inside{padding:clamp(3.5rem,7vw,5.5rem) 0;background:#fff}
  .inside h2{margin:0 0 1.6rem}
  .parts{display:grid;gap:1rem;grid-template-columns:repeat(auto-fit,minmax(min(300px,100%),1fr))}
  .part{display:flex;flex-direction:column;border-radius:22px;background:var(--t);padding:1.5rem;text-decoration:none;color:inherit;border:1px solid transparent;transition:border-color .2s,transform .25s}
  .part:hover{border-color:var(--c);transform:translateY(-3px)}
  .part h3{margin:0 0 .5rem;font-size:1.2rem}.part p{margin:0 0 1rem;font-size:.97rem}
  .via{align-self:flex-start;font-size:.78rem;font-weight:700;color:var(--c);background:#fff;border-radius:99px;padding:.2rem .6rem;margin-bottom:.7rem}
  .go{margin-top:auto;font-weight:700;color:var(--c)}
  .tl{margin:2.6rem 0 .9rem;font-size:1.05rem}
  .tech{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:.5rem}
  .tech li{padding:.55rem 1rem;border-radius:12px;border:1px solid color-mix(in srgb,var(--c) 30%,transparent);font-weight:600;color:var(--navy)}
  .where{background:radial-gradient(60% 60% at 100% 0%,rgba(103,58,183,.35),transparent 60%),#1b1033;color:#fff;padding:clamp(3.5rem,7vw,5.5rem) 0}
  .where-in{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:clamp(2rem,5vw,4rem);align-items:center}
  .where h2{color:#fff;margin:0 0 1rem}.where p{color:#d9cff0}
  .il{margin:1.6rem 0 .6rem;font-weight:600;color:#fff!important}
  .chips{display:flex;flex-wrap:wrap;gap:.45rem}.chips a{color:#fff;text-decoration:none;border:1px solid rgba(255,255,255,.3);border-radius:99px;padding:.35rem .85rem;font-size:.9rem}.chips a:hover{background:rgba(255,255,255,.1)}
  .next{background:var(--t)}
  .next a{display:grid;gap:.2rem;padding:clamp(2.5rem,5vw,3.5rem) 0;text-decoration:none;color:inherit}
  .nl{color:var(--mute);font-weight:600}
  .nn{font:800 clamp(2.6rem,7vw,5rem)/1 var(--mark);color:var(--c);letter-spacing:.02em;transition:letter-spacing .3s}
  .next a:hover .nn{letter-spacing:.06em}
  .nd{font:600 1.1rem Sora,sans-serif;color:var(--navy)}
  @media(max-width:900px){.phero-in,.where-in,.mean-in{grid-template-columns:1fr}.art{order:-1;max-width:380px}.tagline{text-align:left}}
  @media(max-width:560px){.cta2 .btn{width:100%}}
  `]
})
export class PlatformComponent {
  all = PLATFORMS;
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  slug = toSignal(this.route.paramMap.pipe(map(m => m.get('slug'))), { initialValue: null });
  p = computed(() => platformBySlug(this.slug()));
  idx = computed(() => PLATFORMS.findIndex(x => x.slug === this.p()?.slug));
  nextP = computed(() => PLATFORMS[(this.idx() + 1) % PLATFORMS.length]);
  industries = computed(() => { const p = this.p(); return p ? INDUSTRIES.filter(i => platformsForIndustry(i).includes(p)) : []; });
  constructor() {
    // Unknown slug: fall back to the homepage platform showcase.
    effect(() => { if (this.slug() && !this.p()) this.router.navigateByUrl('/'); });
  }
  viaPlatform(capOrSolution: string) { return PLATFORMS.find(x => x.includes.some(i => i.name === capOrSolution && !i.from))?.name ?? ''; }
}
