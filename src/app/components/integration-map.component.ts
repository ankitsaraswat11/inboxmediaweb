import { Component, computed, signal } from '@angular/core';
import { INTEGRATION_GROUPS } from '../data';

/** Hub-and-spoke integration architecture. Categories are generic; specific connectors are confirmed per project. */
@Component({
  selector: 'app-integration-map',
  standalone: true,
  template: `
  <div class="im">
    <div class="side l">
      @for (g of left; track g.key) {
        <button type="button" class="cat" [class.on]="sel() === g.key" (click)="sel.set(g.key)" (mouseenter)="sel.set(g.key)" [attr.aria-pressed]="sel() === g.key">
          <b>{{ g.name }}</b><span>{{ g.items.slice(0, 3).join(', ') }}</span><i class="wire" aria-hidden="true"><i></i></i>
        </button>
      }
    </div>
    <div class="hub">
      <div class="core">
        <span class="lbl">Inbox Media platforms</span>
        <div class="trio"><b style="--c:var(--sutra)">SUTRA</b><b style="--c:var(--medha)">MEDHA</b><b style="--c:var(--kavach)">KAVACH</b></div>
        <span class="base">on Digital Engineering</span>
      </div>
      <div class="det" aria-live="polite">
        <h3>{{ cur().name }}</h3>
        <p>{{ cur().text }}</p>
        <ul class="chips">@for (i of cur().items; track i) { <li class="chip">{{ i }}</li> }</ul>
      </div>
    </div>
    <div class="side r">
      @for (g of right; track g.key) {
        <button type="button" class="cat" [class.on]="sel() === g.key" (click)="sel.set(g.key)" (mouseenter)="sel.set(g.key)" [attr.aria-pressed]="sel() === g.key">
          <b>{{ g.name }}</b><span>{{ g.items.slice(0, 3).join(', ') }}</span><i class="wire" aria-hidden="true"><i></i></i>
        </button>
      }
    </div>
  </div>
  <p class="note-i">Integration categories are shown as architecture, not as ready-made connectors. Specific connectors, APIs and data flows are confirmed during technical discovery.</p>`,
  styles: [`
  :host{display:block}
  .im{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.15fr) minmax(0,1fr);gap:2.4rem;align-items:center}
  .side{display:grid;gap:.8rem}
  .cat{position:relative;text-align:left;display:grid;gap:.15rem;padding:.9rem 1rem;border-radius:var(--r);border:1px solid var(--border);background:var(--surface);cursor:pointer;font:inherit;color:inherit;transition:border-color .2s,box-shadow .2s,transform .2s}
  .cat:hover{transform:translateY(-1px)}
  .cat.on{border-color:var(--primary);box-shadow:0 0 0 3px var(--glow)}
  .cat b{font:650 .98rem var(--font-display);color:var(--fg)}
  .cat span{font-size:.8rem;color:var(--fg-2)}
  .wire{position:absolute;top:50%;width:2.4rem;height:2px;background:var(--border-strong);overflow:hidden}
  .l .wire{left:100%}.r .wire{right:100%}
  .wire i{position:absolute;top:0;width:10px;height:2px;background:var(--primary);animation:w 1.8s linear infinite}
  .r .wire i{animation-direction:reverse}
  .cat.on .wire{background:var(--primary)}
  .hub{display:grid;gap:1rem}
  .core{display:grid;justify-items:center;gap:.5rem;padding:1.4rem 1rem;border-radius:var(--r-xl);background:var(--surface);border:1px solid var(--border-strong);box-shadow:0 0 0 8px var(--glow),var(--shadow);text-align:center}
  .lbl{font-weight:700;color:var(--fg);font-size:.95rem}
  .trio{display:flex;flex-wrap:wrap;justify-content:center;gap:.4rem}
  .trio b{font:800 .95rem var(--mark);letter-spacing:.05em;color:var(--c);padding:.25rem .6rem;border-radius:8px;border:1px solid color-mix(in srgb,var(--c) 35%,transparent)}
  .base{font-size:.8rem;font-weight:600;color:var(--eng)}
  .det{padding:1.1rem 1.2rem;border-radius:var(--r-lg);background:var(--surface-2);border:1px solid var(--border);min-height:150px}
  .det h3{font-size:1.1rem;margin:0 0 .3rem}.det p{font-size:.9rem;margin:0 0 .7rem}
  .note-i{font-size:.82rem;margin:1.4rem 0 0;max-width:80ch}
  @keyframes w{from{left:-10px}to{left:100%}}
  @media(max-width:960px){.im{grid-template-columns:1fr 1fr;gap:1rem}.hub{grid-column:1/-1;order:-1}.wire{display:none}}
  @media(max-width:560px){.im{grid-template-columns:minmax(0,1fr)}.cat span{overflow-wrap:anywhere}}
  `]
})
export class IntegrationMapComponent {
  groups = INTEGRATION_GROUPS;
  left = INTEGRATION_GROUPS.slice(0, 3);
  right = INTEGRATION_GROUPS.slice(3);
  sel = signal(INTEGRATION_GROUPS[0].key);
  cur = computed(() => this.groups.find(g => g.key === this.sel())!);
}
