import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CAPABILITIES, FLOW_CAP } from '../data';
import { PLATFORMS } from '../content/platforms';
import { FlowComponent } from '../components/flow.component';

/** /capabilities: the five original capability domains (copy preserved), now shown with the platform each belongs to. */
@Component({
  standalone: true,
  imports: [RouterLink, FlowComponent],
  template: `
    <section class="s page-hero"><div class="wrap"><p class="eyebrow">What we do</p><h1>Capabilities</h1>
      <p class="lead">Five capability domains, organised into the platforms: communication, voice and omnichannel engagement in SUTRA, conversational AI in MEDHA, and digital engineering as the shared foundation.</p></div></section>
    <section class="s"><div class="wrap">
      <div class="cap-grid">
        @for (item of items; track item.name; let i = $index) {
          <article class="capability" [style.--c]="'var(--' + item.home.key + ')'" [style.--t]="'var(--' + item.home.key + '-tint)'">
            <a class="home" [routerLink]="item.home.link">{{ item.home.label }}</a>
            <h2>{{ item.name }}</h2><p>{{ item.text }}</p>
            @if (item.what) { <div class="detail"><b>What it is</b><p>{{ item.what }}</p></div> }
            @if (item.why) { <div class="detail"><b>Why it matters</b><p>{{ item.why }}</p></div> }
            @if (item.how) { <div class="detail"><b>How it works</b><p>{{ item.how }}</p></div> }
            @if (item.uses?.length) { <div class="tags"><b>Relevant sectors</b>@for (u of item.uses; track u) { <span>{{ u }}</span> }</div> }
            @if (item.benefit) { <p class="benefit"><b>Business value</b>{{ item.benefit }}</p> }
            <a class="text-link" routerLink="/contact" [queryParams]="{type:'proposal', interest: item.name}">Discuss this capability</a>
          </article>
        }
      </div>
    </div></section>
    <section class="s alt"><div class="wrap"><h2>How capabilities work together</h2><app-flow [steps]="flow" label="Capability delivery flow"/><div class="btns"><a class="btn" routerLink="/contact">Discuss your requirement</a><a class="btn ghost" routerLink="/platforms">Compare the platforms</a></div></div></section>`,
  styles: [`
  .cap-grid{display:grid;gap:1.1rem;grid-template-columns:repeat(auto-fit,minmax(min(440px,100%),1fr))}
  .capability{display:flex;flex-direction:column;padding:clamp(1.2rem,2.5vw,2rem);border-radius:var(--r-xl);background:var(--surface);border:1px solid var(--border);border-top:3px solid var(--c);box-shadow:var(--shadow)}
  .home{align-self:flex-start;font:800 .85rem var(--mark);letter-spacing:.05em;color:var(--c);background:var(--t);border-radius:6px;padding:.2rem .55rem;text-decoration:none;margin-bottom:.9rem}
  .capability h2{font-size:1.35rem;max-width:24ch}
  .detail{border-top:1px solid var(--border);padding-top:.8rem;margin-top:1rem}
  .detail b,.tags b,.benefit b{font-size:.82rem;color:var(--c)}
  .detail p{margin:.35rem 0 0}
  .tags{display:flex;gap:.45rem;align-items:center;flex-wrap:wrap;margin-top:1rem}
  .tags span{border:1px solid var(--border);border-radius:99px;padding:.25rem .65rem;font-size:.78rem;color:var(--fg)}
  .benefit{margin-top:1rem;padding:1rem;background:var(--bg-alt);border-radius:var(--r);color:var(--fg)}
  .benefit b{display:block}
  .text-link{margin-top:auto;padding-top:1rem}
  .btns{margin-top:1.6rem}
  `]
})
export class CapabilitiesComponent {
  flow = FLOW_CAP;
  items = CAPABILITIES.map(c => {
    const p = PLATFORMS.find(x => x.capabilities.includes(c.name));
    return { ...c, home: p ? { key: p.slug, label: p.name, link: '/platforms/' + p.slug } : { key: 'eng', label: 'Digital Engineering', link: '/digital-engineering' } };
  });
}
