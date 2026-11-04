import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FlowComponent } from '../components/flow.component';
import { ENGINEERING } from '../content/engineering';
import { PLATFORMS } from '../content/platforms';
import { CAPABILITIES } from '../data';

/** /digital-engineering: the shared foundation under SUTRA, MEDHA and KAVACH. */
@Component({
  standalone: true,
  imports: [RouterLink, FlowComponent],
  template: `
  <section class="s page-hero eng-hero">
    <div class="wrap">
      <p class="eyebrow">{{ e.role }}</p>
      <h1>{{ e.headline }}</h1>
      <p class="lead">{{ e.positioning }}</p>
      <div class="btns"><a class="btn" routerLink="/contact" [queryParams]="{type:'proposal', interest: 'Digital Engineering'}">Discuss an engineering requirement</a><a class="btn ghost" routerLink="/contact" [queryParams]="{type:'demo'}">Book a demo</a></div>
    </div>
  </section>

  <section class="s">
    <div class="wrap">
      <div class="sh"><h2>Engineering services</h2><p class="lead">Ten services grouped by what they do for your systems: build them, connect them, run them and scale them.</p></div>
      <div class="areas">
        @for (a of areas; track a.key) {
          <div class="area">
            <h3>{{ a.label }}</h3>
            <div class="svcs">@for (s of a.items; track s.name) { <div class="svc"><b>{{ s.name }}</b><p>{{ s.text }}</p></div> }</div>
          </div>
        }
      </div>
    </div>
  </section>

  <section class="s alt">
    <div class="wrap">
      <div class="sh"><h2>How engineering powers each platform</h2><p class="lead">The platforms rely on the same foundation, so one integration or deployment decision serves all three.</p></div>
      <div class="pw">
        @for (p of platforms; track p.slug) {
          <a class="pwc" [routerLink]="['/platforms', p.slug]" [style.--c]="'var(--' + p.slug + ')'"><b class="pmark">{{ p.name }}</b><span class="lay">{{ p.layer }}</span><p>{{ e.enables[p.slug] }}</p></a>
        }
      </div>
      <div class="base"><b>Digital Engineering</b><span>APIs · cloud · DevOps · modernisation · engineering teams</span></div>
    </div>
  </section>

  <section class="s">
    <div class="wrap">
      <h2>How we deliver</h2>
      <app-flow [steps]="e.steps" label="Engineering delivery approach"/>
      @if (cap) {
        <div class="was"><h3>{{ cap.name }}</h3><dl>
          <div><dt>What it is</dt><dd>{{ cap.what }}</dd></div><div><dt>Why it matters</dt><dd>{{ cap.why }}</dd></div>
          <div><dt>How it works</dt><dd>{{ cap.how }}</dd></div><div><dt>Business value</dt><dd>{{ cap.benefit }}</dd></div></dl>
          <p class="sec">Relevant sectors: {{ (cap.uses || []).join(', ') }}</p></div>
      }
      <p class="note">Technology choices, hosting and integration methods are confirmed during discovery for each project.</p>
    </div>
  </section>`,
  styles: [`
  .eng-hero .eyebrow{color:var(--eng)}
  .eng-hero h1{max-width:16ch}
  .eng-hero .btns{margin-top:1.6rem}
  .areas{display:grid;gap:1.4rem}
  .area{display:grid;grid-template-columns:120px 1fr;gap:1.2rem;align-items:start;padding-top:1.4rem;border-top:1px solid var(--border)}
  .area:first-child{padding-top:0;border-top:0}
  .area h3{margin:.9rem 0 0;font-size:1rem;color:var(--eng)}
  .svcs{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(250px,100%),1fr));gap:.8rem}
  .svc{padding:1rem;border-radius:var(--r-lg);background:var(--surface);border:1px solid var(--border);box-shadow:var(--shadow)}
  .svc b{display:block;color:var(--fg);font-size:.98rem;margin-bottom:.3rem}.svc p{margin:0;font-size:.88rem}
  .pw{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem}
  .pwc{display:grid;gap:.3rem;align-content:start;padding:1.4rem;border-radius:var(--r-lg) var(--r-lg) 0 0;background:var(--surface);border:1px solid var(--border);border-top:3px solid var(--c);text-decoration:none}
  .pwc .pmark{font-size:1.5rem}.lay{font-size:.82rem;font-weight:600;color:var(--c)}.pwc p{margin:.3rem 0 0;color:var(--fg)}
  .base{display:flex;flex-wrap:wrap;gap:.4rem 1rem;align-items:baseline;justify-content:center;margin-top:.8rem;padding:1.1rem;border-radius:var(--r-lg);background:var(--eng-tint);border:1px solid color-mix(in srgb,var(--eng) 30%,transparent)}
  .base b{font:700 1.1rem var(--font-display);color:var(--eng)}.base span{color:var(--fg-2);font-size:.92rem}
  .was{margin:2rem 0 1rem;padding:1.4rem;border-radius:var(--r-xl);border:1px solid var(--border);background:var(--surface)}
  .was h3{margin:0 0 .8rem}.was dl{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(240px,100%),1fr));gap:1rem;margin:0}
  .was dt{font-weight:700;font-size:.85rem;color:var(--fg)}.was dd{margin:.2rem 0 0;color:var(--fg-2);font-size:.92rem}
  .sec{margin:1rem 0 0;font-size:.88rem}
  @media(max-width:760px){.pw{grid-template-columns:1fr}.pwc{border-radius:var(--r-lg)}}
  @media(max-width:620px){.area{grid-template-columns:1fr;gap:.6rem}.area h3{margin:0}}
  `]
})
export class EngineeringComponent {
  e = ENGINEERING; platforms = PLATFORMS;
  areas = (['build', 'connect', 'run', 'scale'] as const).map(k => ({ key: k, label: ENGINEERING.areas[k], items: ENGINEERING.services.filter(s => s.area === k) }));
  /** Existing capability copy for Digital Engineering & IT Services, preserved here. */
  cap = CAPABILITIES.find(c => c.name === 'Digital Engineering & IT Services');
}
