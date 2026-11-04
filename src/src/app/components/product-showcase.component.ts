import { Component, Input, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PRODUCTS } from '../data';
import { ProductVisualComponent } from './product-visual.component';

/** Interactive showcase of the five MEDHA products: a product rail on one side, a working panel on the other. */
@Component({
  selector: 'app-product-showcase',
  standalone: true,
  imports: [RouterLink, ProductVisualComponent],
  template: `
  <div class="ps">
    <div class="rail" role="tablist" aria-label="AI products" (keydown)="key($event)">
      @for (p of products; track p.name; let i = $index) {
        <button type="button" role="tab" [id]="'pt-' + i" [attr.aria-selected]="sel() === i" [attr.aria-controls]="'pp-' + i" [tabindex]="sel() === i ? 0 : -1" [class.on]="sel() === i" (click)="sel.set(i)">
          <b>{{ p.name }}</b><span>{{ p.tagline }}</span>
        </button>
      }
      <p class="note-medha">Part of <a routerLink="/platforms/medha">MEDHA</a>, the intelligence layer.</p>
    </div>
    <div class="stage" role="tabpanel" [id]="'pp-' + sel()" [attr.aria-labelledby]="'pt-' + sel()">
      @for (p of [cur()]; track p.name) {
        <div class="grid2">
          <app-product-visual [kind]="p.visual!"/>
          <div class="info">
            <h3>{{ p.name }}</h3>
            <p class="t">{{ p.text }}</p>
            <h4>Capabilities</h4>
            <ul class="chips">@for (c of p.caps; track c) { <li class="chip">{{ c }}</li> }</ul>
            <h4>Use cases</h4>
            <p class="uc">{{ p.how }}</p>
            <p class="who"><span>Best for</span>@for (w of p.who; track w) { <span class="pill info">{{ w }}</span> }</p>
            <div class="btns">
              <a class="btn" routerLink="/contact" [queryParams]="{type:'demo', interest: p.name}">Request a demo</a>
              @if (detailLink) { <a class="btn ghost" routerLink="/ai-solutions" [queryParams]="{p: p.name}">See how it works</a> }
            </div>
          </div>
        </div>
      }
    </div>
  </div>`,
  styles: [`
  :host{display:block}
  .ps{display:grid;grid-template-columns:260px minmax(0,1fr);gap:1.5rem;align-items:start}
  .rail{display:grid;gap:.35rem;position:sticky;top:calc(var(--nh) + 20px)}
  .rail button{text-align:left;display:grid;gap:.1rem;padding:.85rem 1rem;border-radius:var(--r);border:1px solid transparent;background:none;cursor:pointer;font:inherit;color:var(--fg-2);position:relative;transition:background .2s,border-color .2s}
  .rail button::before{content:"";position:absolute;left:0;top:14px;bottom:14px;width:3px;border-radius:3px;background:var(--medha);transform:scaleY(0);transition:transform .25s}
  .rail button:hover{background:var(--surface)}
  .rail button.on{background:var(--surface);border-color:var(--border);box-shadow:var(--shadow)}
  .rail button.on::before{transform:scaleY(1)}
  .rail b{font:650 1.02rem var(--font-display);color:var(--fg)}
  .rail span{font-size:.84rem;line-height:1.4}
  .note-medha{font-size:.84rem;margin:.6rem 1rem 0}
  .grid2{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:1.5rem;align-items:start;animation:in .35s ease}
  .info h3{font-size:1.6rem;margin:0 0 .4rem}
  .t{color:var(--fg);font-size:1.02rem}
  h4{font-size:.85rem;color:var(--fg-2);margin:1.1rem 0 .5rem;letter-spacing:0;font-family:var(--font-body);font-weight:700}
  .uc{margin:0;font-size:.94rem}
  .who{display:flex;flex-wrap:wrap;align-items:center;gap:.35rem;margin:.9rem 0 1.2rem;font-size:.82rem}
  .who>span:first-child{color:var(--fg-2);margin-right:.2rem;font-weight:600}
  @keyframes in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
  @media(max-width:1100px){.grid2{grid-template-columns:1fr}}
  @media(max-width:820px){
    .ps{grid-template-columns:1fr}
    .rail{position:static;display:flex;overflow-x:auto;scroll-snap-type:x mandatory;gap:.4rem;padding-bottom:.3rem;scrollbar-width:none}
    .rail::-webkit-scrollbar{display:none}
    .rail button{flex:0 0 auto;scroll-snap-align:start;border-color:var(--border);background:var(--surface);padding:.6rem .9rem}
    .rail button span{display:none}
    .rail button::before{left:12px;right:12px;top:auto;bottom:0;width:auto;height:3px;transform:scaleX(0)}
    .rail button.on::before{transform:scaleX(1)}
    .note-medha{display:none}
  }
  `]
})
export class ProductShowcaseComponent {
  @Input() detailLink = true;
  products = PRODUCTS;
  sel = signal(0);
  cur = computed(() => this.products[this.sel()]);
  key(e: KeyboardEvent) {
    const n = this.products.length;
    const d = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    this.sel.set((this.sel() + d + n) % n);
    (document.getElementById('pt-' + this.sel()) as HTMLElement | null)?.focus();
  }
}
