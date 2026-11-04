import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EcosystemComponent } from '../components/ecosystem.component';
import { ArchitectureComponent } from '../components/architecture.component';
import { PLATFORMS, TAGLINE } from '../content/platforms';
import { ENGINEERING } from '../content/engineering';

/** /platforms: one place to compare SUTRA, MEDHA and KAVACH before choosing one. */
@Component({
  standalone: true,
  imports: [RouterLink, EcosystemComponent, ArchitectureComponent],
  template: `
  <section class="s page-hero">
    <div class="wrap ph">
      <div>
        <p class="eyebrow">Platforms</p>
        <h1>Three platforms. One connected enterprise.</h1>
        <p class="lead">{{ tagline }} SUTRA connects, MEDHA makes things intelligent and KAVACH protects, all on a shared digital engineering foundation.</p>
      </div>
      <app-ecosystem class="eco"/>
    </div>
  </section>
  <section class="s">
    <div class="wrap">
      <div class="cmp" role="table" aria-label="Platform comparison">
        <div class="cr head" role="row"><span role="columnheader"></span>@for (p of platforms; track p.slug) { <span role="columnheader" [style.--c]="'var(--' + p.slug + ')'"><b class="pmark">{{ p.name }}</b>{{ p.layer }}</span> }</div>
        <div class="cr" role="row"><span role="rowheader">What it is</span>@for (p of platforms; track p.slug) { <span role="cell">{{ p.descriptor }}</span> }</div>
        <div class="cr" role="row"><span role="rowheader">Solves</span>@for (p of platforms; track p.slug) { <span role="cell">{{ p.challenge.title }}</span> }</div>
        <div class="cr" role="row"><span role="rowheader">Key technologies</span>@for (p of platforms; track p.slug) { <span role="cell"><span class="chips">@for (t of p.highlights.slice(0, 5); track t) { <span class="chip">{{ t }}</span> }</span></span> }</div>
        <div class="cr" role="row"><span role="rowheader">Built on</span>@for (p of platforms; track p.slug) { <span role="cell">{{ eng.enables[p.slug] }}</span> }</div>
        <div class="cr" role="row"><span role="rowheader"></span>@for (p of platforms; track p.slug) { <span role="cell"><a class="btn" [routerLink]="['/platforms', p.slug]">Explore {{ p.name }}</a></span> }</div>
      </div>
      <div class="mob">
        @for (p of platforms; track p.slug) {
          <a class="mp" [routerLink]="['/platforms', p.slug]" [style.--c]="'var(--' + p.slug + ')'" [style.--t]="'var(--' + p.slug + '-tint)'">
            <span class="pmark">{{ p.name }}</span><b>{{ p.descriptor }}</b><span>{{ p.summary }}</span><span class="text-link">Explore {{ p.name }}</span>
          </a>
        }
      </div>
    </div>
  </section>
  <section class="s band">
    <div class="wrap">
      <div class="sh"><h2>How the platforms connect</h2><p class="lead">KAVACH protects every layer and Digital Engineering connects them. Select a layer to see its role.</p></div>
      <app-architecture/>
    </div>
  </section>`,
  styles: [`
  .ph{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:2rem;align-items:center}
  .eco{max-width:500px;justify-self:center;width:100%}
  .cmp{border:1px solid var(--border);border-radius:var(--r-xl);overflow:hidden;background:var(--surface);box-shadow:var(--shadow)}
  .cr{display:grid;grid-template-columns:180px repeat(3,minmax(0,1fr));border-top:1px solid var(--border)}
  .cr:first-child{border-top:0}
  .cr>span{padding:1rem 1.1rem;color:var(--fg);font-size:.94rem;border-left:1px solid var(--border)}
  .cr>span:first-child{border-left:0;font-weight:700;font-size:.85rem;color:var(--fg-2);background:var(--surface-2)}
  .head>span{display:grid;gap:.15rem;font-size:.84rem;color:var(--fg-2);background:var(--surface-2)}
  .head .pmark{font-size:1.5rem;color:var(--c)}
  .mob{display:none;gap:.8rem}
  .mp{display:grid;gap:.3rem;padding:1.2rem;border-radius:var(--r-lg);background:var(--t);border:1px solid color-mix(in srgb,var(--c) 25%,transparent);text-decoration:none}
  .mp .pmark{font-size:1.7rem}.mp b{color:var(--fg)}.mp span{color:var(--fg-2);font-size:.92rem}
  @media(max-width:900px){.ph{grid-template-columns:1fr}.cmp{display:none}.mob{display:grid}}
  `]
})
export class PlatformsComponent { platforms = PLATFORMS; eng = ENGINEERING; tagline = TAGLINE; }
