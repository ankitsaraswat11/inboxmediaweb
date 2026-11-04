import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FLOW_ABOUT, FOUNDED } from '../data';
import { PLATFORMS, TAGLINE } from '../content/platforms';
import { ENGINEERING } from '../content/engineering';
import { FlowComponent } from '../components/flow.component';

@Component({
  standalone: true,
  imports: [RouterLink, FlowComponent],
  template: `
    <section class="s page-hero"><div class="wrap"><p class="eyebrow">About the company</p><h1>An integrated enterprise technology platform</h1>
      <p class="lead">Inbox Media brings communication infrastructure, intelligent automation, digital trust and digital engineering together to support enterprise operations. {{ tagline }}</p></div></section>
    <section class="s"><div class="wrap">
      <div class="intro"><h2>One partner across connected business needs</h2>
        <p>From customer notifications and cloud telephony to AI-led conversations, governance and custom software, the portfolio is organised around the practical systems businesses use to communicate and operate. Serving enterprises since {{ founded }}.</p></div>
      <h3 class="hh">Brand architecture</h3>
      <div class="tree">
        <div class="parent"><b>Inbox Media</b><span>Parent technology brand</span></div>
        <div class="kids">
          @for (p of platforms; track p.slug) {
            <a class="kid" [routerLink]="['/platforms', p.slug]" [style.--c]="'var(--' + p.slug + ')'"><b class="pmark">{{ p.name }}</b><span>{{ p.descriptor }}</span></a>
          }
        </div>
        <a class="base" routerLink="/digital-engineering"><b>Digital Engineering</b><span>{{ eng.role }}</span></a>
      </div>
    </div></section>
    <section class="s alt"><div class="wrap"><h2>Explore the portfolio</h2><app-flow [steps]="flow" label="Inbox Media portfolio journey"/>
      <div class="btns"><a class="btn" routerLink="/platforms">Explore the platforms</a><a class="btn ghost" routerLink="/about/why-inbox-media">Our journey</a><a class="btn ghost" routerLink="/contact">Talk to us</a></div></div></section>`,
  styles: [`
  .intro{max-width:760px;margin-bottom:2.4rem}.intro p{font-size:1.08rem}
  .hh{margin-bottom:1rem}
  .tree{display:grid;gap:.8rem;justify-items:center}
  .parent{display:grid;justify-items:center;gap:.1rem;padding:1rem 2rem;border-radius:var(--r-lg);background:var(--btn);color:var(--btn-fg)}
  .parent b{font:700 1.3rem var(--font-display)}.parent span{font-size:.85rem;opacity:.85}
  .kids{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;width:100%;position:relative;padding-top:1rem}
  .kids::before{content:"";position:absolute;top:0;left:16.6%;right:16.6%;height:1rem;border:2px solid var(--border-strong);border-bottom:0;border-radius:10px 10px 0 0}
  .kid{display:grid;gap:.25rem;padding:1.2rem;border-radius:var(--r-lg);background:var(--surface);border:1px solid var(--border);border-top:3px solid var(--c);text-decoration:none}
  .kid .pmark{font-size:1.5rem}.kid span{color:var(--fg);font-size:.92rem}
  .base{display:flex;flex-wrap:wrap;justify-content:center;gap:.3rem .8rem;width:100%;padding:1rem;border-radius:var(--r-lg);background:var(--eng-tint);border:1px solid color-mix(in srgb,var(--eng) 30%,transparent);text-decoration:none}
  .base b{color:var(--eng);font:700 1.05rem var(--font-display)}.base span{color:var(--fg-2)}
  .btns{margin-top:1.6rem}
  @media(max-width:760px){.kids{grid-template-columns:1fr}.kids::before{display:none}}
  `]
})
export class AboutComponent { flow = FLOW_ABOUT; platforms = PLATFORMS; eng = ENGINEERING; tagline = TAGLINE; founded = FOUNDED; }
