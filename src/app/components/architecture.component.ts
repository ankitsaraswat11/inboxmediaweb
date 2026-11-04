import { Component, Input, OnInit, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

type Key = 'systems' | 'sutra' | 'medha' | 'outcomes' | 'kavach' | 'eng';
interface Layer { key: Key; name: string; role: string; desc: string; flows: string[]; trust: string; eng: string; link?: string; color: string; }

const LAYERS: Layer[] = [
  { key: 'systems', name: 'Business Systems', role: 'Where events start', color: 'var(--band-fg-2)',
    desc: 'CRM, ERP, order, helpdesk and core systems hold the customers and events that start every journey.',
    flows: ['New lead', 'Order placed', 'Payment due', 'Ticket raised'],
    trust: 'Access control and audit logs on every integration point.', eng: 'API development and integration connect these systems to SUTRA.' },
  { key: 'sutra', name: 'SUTRA', role: 'The Communication Layer', color: 'var(--sutra-l)', link: '/platforms/sutra',
    desc: 'Turns business events into messages and calls on the right channel, and brings replies back.',
    flows: ['SMS & OTP', 'WhatsApp', 'RCS', 'Email', 'Voice & IVR'],
    trust: 'DLT-compliant sending, consent and opt-out handling.', eng: 'Messaging APIs, webhooks and channel integrations.' },
  { key: 'medha', name: 'MEDHA', role: 'The Intelligence Layer', color: 'var(--medha-l)', link: '/platforms/medha',
    desc: 'Understands conversations and data, decides the next step and automates it, with a person in the loop.',
    flows: ['Aura AI', 'Tellco', 'Custom SLM', 'TrainExl', 'Edge AI'],
    trust: 'ISO 42001 readiness, AI risk assessment and model governance.', eng: 'Cloud, DevOps and on-premise deployment for models and agents.' },
  { key: 'outcomes', name: 'Enterprise Outcomes', role: 'What the business gets', color: 'var(--band-fg)',
    desc: 'Customers reached reliably, routine work automated, and operations that can show their compliance.',
    flows: ['Faster response', 'Fewer manual steps', 'Audit-ready evidence'],
    trust: 'Evidence collected across the whole journey, not assembled afterwards.', eng: 'Dashboards and analytics on every journey.' }
];
const KAVACH: Layer = { key: 'kavach', name: 'KAVACH', role: 'The Trust Layer, across every layer', color: 'var(--kavach-l)', link: '/platforms/kavach',
  desc: 'KAVACH is not a final step. DPDP compliance, privacy, security and AI governance apply at every layer, from the first integration to the final outcome.',
  flows: ['DPDP compliance', 'Data privacy', 'Information security', 'AI governance', 'Quality management'],
  trust: 'Standards, readiness, advisory and technical controls, each clearly labelled.', eng: 'Secure architecture and modernisation put controls into the systems.' };
const ENG: Layer = { key: 'eng', name: 'Digital Engineering', role: 'Shared technology foundation', color: 'var(--eng-l)', link: '/digital-engineering',
  desc: 'The engineering foundation that connects the layers: software, APIs, cloud, DevOps and modernisation.',
  flows: ['APIs & integration', 'Cloud', 'DevOps', 'IT modernisation', 'Engineering teams'],
  trust: 'Security built into architecture and delivery pipelines.', eng: 'Builds, connects and scales everything above it.' };

/** Interactive architecture: Business Systems → SUTRA → MEDHA → Outcomes, wrapped by KAVACH, connected by Digital Engineering. For dark (band) backgrounds. */
@Component({
  selector: 'app-architecture',
  standalone: true,
  imports: [RouterLink],
  template: `
  <div class="ar">
    <div class="dia">
      <button type="button" class="eng" [class.on]="sel() === 'eng'" (click)="sel.set('eng')" [attr.aria-pressed]="sel() === 'eng'">
        <span>Digital Engineering</span>
      </button>
      <div class="frame" [class.on]="sel() === 'kavach'">
        <button type="button" class="kv" (click)="sel.set('kavach')" [attr.aria-pressed]="sel() === 'kavach'">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l8 3v6.2c0 4.6-3.3 8.2-8 9.8-4.7-1.6-8-5.2-8-9.8V5.5z"/></svg>
          <b>KAVACH</b><span>protects every layer</span>
        </button>
        @for (l of layers; track l.key; let i = $index) {
          <button type="button" class="ly" [class.on]="sel() === l.key" [class.plat]="!!l.link" [style.--lc]="l.color" (click)="sel.set(l.key)" [attr.aria-pressed]="sel() === l.key">
            <span class="nm">{{ l.name }}</span><span class="rl">{{ l.role }}</span>
            <i class="shield" aria-hidden="true"></i><i class="tap" aria-hidden="true"></i>
          </button>
          @if (i < layers.length - 1) { <div class="flow" aria-hidden="true"><i [style.animation-delay.ms]="i * 450"></i></div> }
        }
      </div>
    </div>
    <div class="detail" aria-live="polite" [style.--lc]="cur().color">
      <p class="dr">{{ cur().role }}</p>
      <h3>{{ cur().name }}</h3>
      <p>{{ cur().desc }}</p>
      <ul class="flows">@for (f of cur().flows; track f) { <li>{{ f }}</li> }</ul>
      <dl>
        <div><dt><i class="dk"></i>KAVACH at this layer</dt><dd>{{ cur().trust }}</dd></div>
        <div><dt><i class="de"></i>Digital Engineering</dt><dd>{{ cur().eng }}</dd></div>
      </dl>
      @if (cur().link) { <a class="btn ghost" [routerLink]="cur().link">Explore {{ cur().name }}</a> }
    </div>
  </div>`,
  styles: [`
  :host{display:block;color:var(--band-fg)}
  .ar{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,.85fr);gap:clamp(1.2rem,3vw,2.5rem);align-items:stretch}
  button{font:inherit;color:inherit;cursor:pointer}
  .dia{display:grid;grid-template-columns:52px minmax(0,1fr);gap:.8rem}
  .eng{border:1px solid color-mix(in srgb,var(--eng-l) 45%,transparent);background:color-mix(in srgb,var(--eng-l) 10%,transparent);border-radius:14px;display:grid;place-items:center;padding:.5rem 0;position:relative;transition:background .2s}
  .eng span{writing-mode:vertical-rl;transform:rotate(180deg);font-weight:700;font-size:.88rem;color:var(--eng-l);letter-spacing:.02em}
  .eng.on,.eng:hover{background:color-mix(in srgb,var(--eng-l) 22%,transparent)}
  .frame{position:relative;border:1.5px dashed color-mix(in srgb,var(--kavach-l) 60%,transparent);border-radius:20px;padding:3.4rem 1rem 1rem;background:color-mix(in srgb,var(--kavach-l) 5%,transparent);transition:background .25s,border-color .25s}
  .frame.on{border-style:solid;border-color:var(--kavach-l);background:color-mix(in srgb,var(--kavach-l) 10%,transparent)}
  .kv{position:absolute;left:1rem;top:.9rem;display:flex;align-items:center;gap:.5rem;background:none;border:0;padding:.2rem .3rem;border-radius:8px}
  .kv svg{width:20px;height:20px;fill:var(--kavach-l)}
  .kv b{font:800 1.05rem var(--mark);letter-spacing:.05em;color:var(--kavach-l)}
  .kv span{font-size:.84rem;color:var(--band-fg-2)}
  .ly{position:relative;width:100%;display:flex;align-items:baseline;flex-wrap:wrap;gap:.2rem .8rem;text-align:left;padding:1rem 3rem 1rem 1.1rem;border-radius:14px;border:1px solid var(--band-border);background:var(--band-surface);transition:background .2s,border-color .2s,transform .2s}
  .ly.plat{border-color:color-mix(in srgb,var(--lc) 45%,transparent)}
  .ly:hover{transform:translateX(3px)}
  .ly.on{background:color-mix(in srgb,var(--lc) 16%,transparent);border-color:var(--lc)}
  .nm{font:700 1.08rem var(--font-display);color:var(--lc)}
  .ly.plat .nm{font:800 1.2rem var(--mark);letter-spacing:.05em}
  .rl{font-size:.86rem;color:var(--band-fg-2)}
  .shield{position:absolute;right:1rem;top:50%;width:16px;height:18px;margin-top:-9px;background:var(--kavach-l);clip-path:path('M8 0 L16 3 V9 C16 13.5 12.6 16.5 8 18 C3.4 16.5 0 13.5 0 9 V3 Z');opacity:.75}
  .tap{position:absolute;left:calc(-1.85rem - 1px);top:50%;width:1.85rem;height:2px;background:color-mix(in srgb,var(--eng-l) 55%,transparent)}
  .flow{height:26px;width:2px;margin:0 auto 0 2.2rem;background:var(--band-border);position:relative;overflow:hidden}
  .flow i{position:absolute;left:-2px;width:6px;height:10px;border-radius:3px;background:var(--band-fg);animation:down 1.6s linear infinite}
  .detail{border:1px solid var(--band-border);background:var(--band-surface);border-radius:20px;padding:clamp(1.2rem,2.5vw,1.8rem);display:flex;flex-direction:column;border-top:3px solid var(--lc)}
  .dr{margin:0 0 .3rem;font-size:.84rem;font-weight:600;color:var(--lc)!important}
  .detail h3{font-size:1.5rem;margin:0 0 .6rem;color:var(--band-fg)}
  .detail p{color:var(--band-fg-2)}
  .flows{list-style:none;padding:0;margin:.2rem 0 1rem;display:flex;flex-wrap:wrap;gap:.35rem}
  .flows li{font-size:.8rem;font-weight:600;border:1px solid var(--band-border);border-radius:999px;padding:.25rem .7rem;color:var(--band-fg)}
  dl{margin:0 0 1.2rem;display:grid;gap:.8rem}
  dt{display:flex;align-items:center;gap:.45rem;font-size:.82rem;font-weight:700;color:var(--band-fg)}
  dd{margin:.2rem 0 0;font-size:.9rem;color:var(--band-fg-2)}
  .dk,.de{width:8px;height:8px;border-radius:2px;background:var(--kavach-l)}.de{background:var(--eng-l)}
  .detail .btn{margin-top:auto;align-self:flex-start}
  @keyframes down{from{top:-10px}to{top:100%}}
  @media(max-width:960px){.ar{grid-template-columns:1fr}}
  @media(max-width:520px){.tap{left:calc(-1.2rem - 1px);width:1.2rem}.dia{grid-template-columns:36px minmax(0,1fr);gap:.5rem}.ly{padding:.85rem 2.4rem .85rem .9rem}.kv span{display:none}.frame{padding:3rem .7rem .7rem}}
  `]
})
export class ArchitectureComponent implements OnInit {
  /** Optionally start with one layer selected (e.g. the platform page you are on). */
  @Input() start: Key = 'sutra';
  layers = LAYERS;
  sel = signal<Key>('sutra');
  cur = computed(() => [...LAYERS, KAVACH, ENG].find(l => l.key === this.sel())!);
  ngOnInit() { this.sel.set(this.start); }
}
