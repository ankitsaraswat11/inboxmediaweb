import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FlowComponent } from '../components/flow.component';
import { ProductVisualComponent } from '../components/product-visual.component';
import { PRODUCTS } from '../data';

/** /ai-solutions: full detail for each MEDHA product (preserved route). */
@Component({
  standalone: true,
  imports: [RouterLink, FlowComponent, ProductVisualComponent],
  template: `
<section class="s page-hero"><div class="wrap">
  <p class="eyebrow"><a routerLink="/platforms/medha">MEDHA</a> · AI products</p>
  <h1>AI Products</h1>
  <p class="lead">Five products, each for a distinct job. Pick one to see how it works, where it runs and what the implementation includes.</p>
</div></section>
<section class="s"><div class="wrap">
  <div class="tabs" role="tablist" aria-label="AI products">@for (x of prods; track x.name; let i = $index) { <button role="tab" type="button" [attr.aria-selected]="sel() === i" [class.on]="sel() === i" (click)="sel.set(i)">{{ x.name }}</button> }</div>
  @for (p of [prods[sel()]]; track p.name) {
  <div class="top">
    <div>
      <h2>{{ p.name }}</h2>
      <p class="tl">{{ p.tagline }}</p>
      <p class="lead">{{ p.text }}</p>
      @if (p.note) { <p class="note">{{ p.note }}</p> }
      <ul class="chips caps">@for (c of p.caps; track c) { <li class="chip">{{ c }}</li> }</ul>
    </div>
    <app-product-visual [kind]="p.visual!"/>
  </div>
  @if (p.what) {
    <div class="wwh"><div><b>What it is</b><p>{{ p.what }}</p></div><div><b>Why it matters</b><p>{{ p.why }}</p></div><div><b>How it works</b><p>{{ p.how }}</p></div></div>
    <div class="uses"><span class="lbl">Best for</span>@for (w of p.who; track w) { <span>{{ w }}</span> }</div>
    <div class="ben"><b>How it helps</b><p>{{ p.benefit }}</p></div>
  }
  <h3 class="sp">Workflow</h3><app-flow [steps]="p.flow" [label]="p.name + ' workflow'"/>
  <dl class="facts">
    <div><dt>Integrations</dt><dd [class.tbc]="p.integ.startsWith('To be')">{{ p.integ }}</dd></div>
    <div><dt>Deployment</dt><dd [class.tbc]="p.deploy.startsWith('To be')">{{ p.deploy }}</dd></div>
    <div><dt>Included in the implementation service</dt><dd>Integration with your environment, configuration and ongoing support.</dd></div>
    <div><dt>Evidence</dt><dd class="tbc">No case study published yet. Results are added only once verified.</dd></div>
  </dl>
  <div class="btns"><a class="btn" routerLink="/contact" [queryParams]="{type:'demo', interest: p.name}">Request a demo of {{ p.name }}</a><a class="btn ghost" routerLink="/contact" [queryParams]="{type:'proposal', interest: p.name}">Request a proposal</a></div>
  }
  <p class="moved">Looking for <b>ISO 42001 AI Readiness</b>? It is an AI governance service, so it now sits in <a routerLink="/platforms/kavach">KAVACH</a>, the trust layer.</p>
</div></section>`,
  styles: [`
  .eyebrow a{color:inherit;font-family:var(--mark);font-weight:800;letter-spacing:.05em;text-decoration:none}
  .top{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);gap:2rem;align-items:start;margin-bottom:1rem}
  .top h2{margin:0 0 .2rem}
  .tl{font:600 1.05rem var(--font-display);color:var(--medha);margin:0 0 .8rem}
  .caps{margin-top:1rem}
  .wwh{display:grid;gap:1.2rem;grid-template-columns:repeat(auto-fit,minmax(min(280px,100%),1fr));margin:1.8rem 0 1.2rem}
  .wwh div{border-top:3px solid var(--medha);padding-top:.8rem}
  .wwh b,.ben b{display:block;font-size:.85rem;color:var(--medha);margin-bottom:.3rem}
  .wwh p,.ben p{margin:0;max-width:none}
  .uses{display:flex;flex-wrap:wrap;align-items:center;gap:.45rem;margin:1rem 0}
  .uses span{font-size:.8rem;font-weight:600;color:var(--primary);border:1px solid var(--border);background:var(--surface);border-radius:99px;padding:.25rem .75rem}
  .uses .lbl{border:0;background:none;padding:.25rem .2rem .25rem 0;color:var(--fg-2)}
  .ben{margin:1rem 0 0;padding:.9rem 1.1rem;border-radius:var(--r);background:var(--bg-alt);border-left:3px solid var(--medha)}.ben p{color:var(--fg)}
  .sp{margin-top:2rem}
  .facts{display:grid;gap:1rem;grid-template-columns:repeat(auto-fit,minmax(min(260px,100%),1fr));margin:2rem 0}
  .facts div{border:1px solid var(--border);border-radius:var(--r-lg);padding:1.1rem;background:var(--surface)}
  dt{font-weight:700;margin-bottom:.3rem;color:var(--fg)}dd{margin:0;color:var(--fg-2)}dd.tbc{font-style:italic}
  .moved{margin:2.5rem 0 0;padding:1rem 1.2rem;border-radius:var(--r);background:var(--kavach-tint);color:var(--fg);max-width:none}
  .moved a{color:var(--kavach);font-weight:700}
  @media(max-width:900px){.top{grid-template-columns:1fr}}
  `]
})
export class AiComponent {
  prods = PRODUCTS;
  sel = signal(0);
  constructor() {
    // Deep link: /ai-solutions?p=Tellco opens that product.
    inject(ActivatedRoute).queryParamMap.subscribe(q => { const i = this.prods.findIndex(x => x.name === q.get('p')); if (i >= 0) this.sel.set(i); });
  }
}
