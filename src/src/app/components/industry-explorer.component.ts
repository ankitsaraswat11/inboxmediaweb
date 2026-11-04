import { Component, Input, OnInit, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { INDUSTRY_VIEW } from '../data';
import { PLATFORMS } from '../content/platforms';

/** Industry selector + detail: challenges, relevant platforms and products, an example workflow and expected benefits. */
@Component({
  selector: 'app-industry-explorer',
  standalone: true,
  imports: [RouterLink],
  template: `
  <div class="ie">
    <div class="tabs-x" role="tablist" aria-label="Industries" (keydown)="key($event)">
      @for (x of items; track x.name; let i = $index) {
        <button type="button" role="tab" [id]="'it-' + i" [attr.aria-selected]="sel() === i" [tabindex]="sel() === i ? 0 : -1" [class.on]="sel() === i" (click)="sel.set(i)">{{ x.name }}</button>
      }
    </div>
    @for (x of [cur()]; track x.name) {
      <div class="pane" role="tabpanel" [attr.aria-labelledby]="'it-' + sel()">
        <div class="col a">
          <h3>{{ x.name }}</h3>
          <p class="lead-s">{{ x.text }}</p>
          <h4>Industry challenges</h4>
          <ul class="ch">@for (c of x.challenges; track c) { <li>{{ c }}</li> }</ul>
          <h4>Relevant platforms</h4>
          <div class="pl">
            @for (p of plats(x.platforms); track p.slug) { <a class="pchip" [routerLink]="['/platforms', p.slug]" [style.--c]="'var(--' + p.slug + ')'" [style.--t]="'var(--' + p.slug + '-tint)'">{{ p.name }}<small>{{ p.short }}</small></a> }
            @if (x.engineering) { <a class="pchip" routerLink="/digital-engineering" style="--c:var(--eng);--t:var(--eng-tint)">Engineering<small>Shared foundation</small></a> }
          </div>
          @if (x.products.length) {
            <h4>Relevant products</h4>
            <ul class="chips">@for (p of x.products; track p) { <li><a class="chip" routerLink="/ai-solutions" [queryParams]="{p: p}">{{ p }}</a></li> }</ul>
          }
        </div>
        <div class="col b">
          <h4>Example workflow</h4>
          <ol class="wf">@for (s of x.workflow; track s; let k = $index) { <li><span>{{ k + 1 }}</span><p>{{ s }}</p></li> }</ol>
          <div class="ben"><h4>Expected operational benefits</h4><p>{{ x.benefit }}</p></div>
          <p class="disc">Illustrative workflow. Integrations, regulatory requirements and outcomes are confirmed during discovery.</p>
          <div class="btns">
            <a class="btn" routerLink="/contact" [queryParams]="{type:'proposal'}">Discuss {{ x.name }} use cases</a>
            @if (moreLink) { <a class="btn ghost" routerLink="/industries">All industries</a> }
          </div>
        </div>
      </div>
      @if (detail) {
        <div class="more">
          <section><h4>What organisations need</h4><p>{{ x.what }}</p></section>
          <section><h4>Why it matters</h4><p>{{ x.why }}</p></section>
          <section><h4>How the workflow can work</h4><p>{{ x.how }}</p></section>
        </div>
      }
    }
  </div>`,
  styles: [`
  :host{display:block}
  .tabs-x{display:flex;gap:.4rem;overflow-x:auto;padding:.2rem .1rem .8rem;scrollbar-width:none;scroll-snap-type:x proximity}
  .tabs-x::-webkit-scrollbar{display:none}
  .tabs-x button{flex:0 0 auto;scroll-snap-align:start;min-height:42px;border:1px solid var(--border);background:var(--surface);color:var(--fg);border-radius:999px;padding:.45rem 1rem;font:600 .9rem var(--font-body);cursor:pointer;transition:background .2s,border-color .2s,color .2s}
  .tabs-x button:hover{border-color:var(--primary)}
  .tabs-x button.on{background:var(--btn);border-color:var(--btn);color:var(--btn-fg)}
  .pane{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:0;background:var(--surface);border:1px solid var(--border);border-radius:var(--r-xl);box-shadow:var(--shadow);overflow:hidden;animation:in .35s ease}
  .col{padding:clamp(1.2rem,2.6vw,2rem)}
  .col.b{background:var(--surface-2);border-left:1px solid var(--border)}
  h3{font-size:1.6rem;margin:0 0 .4rem}
  .lead-s{color:var(--fg);margin-bottom:.4rem}
  h4{font:700 .82rem var(--font-body);color:var(--fg-2);margin:1.2rem 0 .55rem;letter-spacing:0}
  .ch{margin:0;padding:0;list-style:none;display:grid;gap:.4rem}
  .ch li{position:relative;padding-left:1.3rem;color:var(--fg);font-size:.95rem}
  .ch li::before{content:"";position:absolute;left:0;top:.55em;width:8px;height:8px;border-radius:2px;border:2px solid var(--sutra);transform:rotate(45deg)}
  .pl{display:flex;flex-wrap:wrap;gap:.5rem}
  .pchip{display:grid;gap:0;padding:.5rem .8rem;border-radius:10px;background:var(--t);border:1px solid color-mix(in srgb,var(--c) 25%,transparent);text-decoration:none;font:800 .95rem var(--mark);letter-spacing:.05em;color:var(--c)}
  .pchip small{font:500 .74rem var(--font-body);letter-spacing:0;color:var(--fg-2)}
  .pchip:hover{border-color:var(--c)}
  .wf{list-style:none;margin:0;padding:0;display:grid;gap:0;position:relative}
  .wf li{display:grid;grid-template-columns:32px 1fr;gap:.8rem;padding:.55rem 0;position:relative}
  .wf li:not(:last-child)::after{content:"";position:absolute;left:15px;top:2.4rem;bottom:-.55rem;width:2px;background:var(--border)}
  .wf span{display:grid;place-items:center;width:32px;height:32px;border-radius:50%;background:var(--surface);border:1.5px solid var(--primary);color:var(--primary);font:700 .85rem var(--font-display);position:relative;z-index:1}
  .wf p{margin:.3rem 0 0;color:var(--fg);font-size:.94rem}
  .ben{margin-top:1rem;padding:1rem;border-radius:var(--r);background:var(--surface);border:1px solid var(--border)}
  .ben h4{margin-top:0}.ben p{margin:0;color:var(--fg)}
  .disc{font-size:.8rem;margin:.9rem 0}
  .more{display:grid;grid-template-columns:repeat(3,1fr);gap:1.2rem;margin-top:1.4rem}
  .more section{border-top:2px solid var(--primary);padding-top:.8rem}.more h4{margin-top:0;color:var(--fg)}.more p{margin:0;font-size:.94rem}
  @keyframes in{from{opacity:0}to{opacity:1}}
  @media(max-width:860px){.more{grid-template-columns:1fr}.pane{grid-template-columns:1fr}.col.b{border-left:0;border-top:1px solid var(--border)}}
  `]
})
export class IndustryExplorerComponent implements OnInit {
  @Input() moreLink = false;
  /** Also show the longer what / why / how copy for the selected industry. */
  @Input() detail = false;
  @Input() start?: string;
  items = INDUSTRY_VIEW;
  sel = signal(0);
  cur = computed(() => this.items[this.sel()]);
  ngOnInit() { const i = this.items.findIndex(x => x.name === this.start); if (i >= 0) this.sel.set(i); }
  plats(keys: string[]) { return PLATFORMS.filter(p => keys.includes(p.slug)); }
  key(e: KeyboardEvent) {
    const n = this.items.length, d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    e.preventDefault(); this.sel.set((this.sel() + d + n) % n);
    const b = document.getElementById('it-' + this.sel()); b?.focus(); b?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }
}
