import { Component, Input, signal } from '@angular/core';
import { PlatformSlug } from '../content/platforms';

interface Node { l: string; x: number; y: number; w: number; d: string; sys?: boolean; path?: string; }
const pill = (l: string) => Math.max(56, l.length * 7.4 + 24);

/* ---------- SUTRA: one hub, many channels and systems ---------- */
const SH = { x: 220, y: 205 };
const SUTRA_NODES: Node[] = [
  ['RCS', -90, 'Rich, branded messages with buttons and media.'],
  ['WhatsApp', -45, 'WhatsApp Business API for two-way conversations and templates.'],
  ['Email', 0, 'Transactional and campaign email from the same journeys.'],
  ['Support Systems', 45, 'Helpdesk and contact-centre tools receive every conversation.', true],
  ['Business Apps', 90, 'CRM, order and core systems trigger messages through APIs.', true],
  ['Voice', 135, 'Cloud telephony, outbound calling and voice broadcasting.'],
  ['IVR', 180, 'Menus that route callers and offer self-service.'],
  ['SMS', 225, 'SMS gateway, OTP and DLT-compliant bulk messaging.']
].map(([l, a, d, sys]) => {
  const r = (a as number) * Math.PI / 180, x = +(SH.x + 172 * Math.cos(r)).toFixed(1), y = +(SH.y + 160 * Math.sin(r)).toFixed(1);
  const mx = (SH.x + x) / 2, my = (SH.y + y) / 2, dx = x - SH.x, dy = y - SH.y;
  return { l: l as string, x, y, w: pill(l as string), d: d as string, sys: !!sys, path: `M${SH.x},${SH.y} Q${(mx - dy * .2).toFixed(1)},${(my + dx * .2).toFixed(1)} ${x},${y}` };
});

/* ---------- MEDHA: inputs → engine → outcomes, with AI agents attached ---------- */
const M_IN: Node[] = [['Conversations', 122], ['Business data', 205], ['Workflows', 288]].map(([l, y]) => ({ l: l as string, x: 62, y: y as number, w: 112, d: 'Input the engine learns from and acts on.' }));
const M_OUT: Node[] = [['Decisions', 168, 'Answers, routing and recommendations.'], ['Actions', 242, 'Bookings, follow-ups, updates and handovers.']].map(([l, y, d]) => ({ l: l as string, x: 384, y: y as number, w: 96, d: d as string }));
const M_AG: Node[] = [
  ['Aura AI', 112, 48, 'Voice, avatar and visual AI for front desks and support.'],
  ['Tellco', 220, 40, 'AI outbound calling, lead qualification and booking.'],
  ['Custom SLM', 328, 48, 'Domain models that answer from your approved material.'],
  ['TrainExl', 160, 372, 'SOPs and manuals turned into microlearning.'],
  ['Edge AI', 280, 372, 'AI that runs on-premise or on-device, even offline.']
].map(([l, x, y, d]) => ({ l: l as string, x: x as number, y: y as number, w: pill(l as string), d: d as string }));
const MESH = [[196, 150], [196, 190], [196, 230], [196, 270], [244, 170], [244, 210], [244, 250]].map(([x, y]) => ({ x, y }));

/* ---------- KAVACH: a shield inside protection rings ---------- */
const K_TAGS: Node[] = [
  ['Data protection', 220, 88, 'Encryption, consent and lifecycle controls for personal data.'],
  ['Access control', 372, 205, 'Identity and access management with least privilege.'],
  ['Security monitoring', 220, 322, 'Monitoring and audit logs that produce evidence.'],
  ['AI governance', 68, 205, 'ISO 42001 readiness, AI risk assessment and model oversight.']
].map(([l, x, y, d]) => ({ l: l as string, x: x as number, y: y as number, w: pill(l as string), d: d as string }));

@Component({
  selector: 'app-platform-art',
  standalone: true,
  template: `
  <div class="art" (mouseleave)="cap.set(null)">
  @switch (slug) {
    @case ('sutra') {
      <svg viewBox="0 0 440 410" role="img" aria-label="SUTRA hub connected to SMS, WhatsApp, RCS, email, voice, IVR, business applications and support systems">
        @for (n of sutra; track n.l; let i = $index) {
          <path class="th" [class.hot]="cap() === n" [attr.d]="n.path"/>
          <path class="sig" pathLength="100" [attr.d]="n.path" [style.animation-delay.ms]="i * 330"/>
        }
        <circle class="ring spin" cx="220" cy="205" r="66"/>
        <circle class="core" cx="220" cy="205" r="48"/>
        <text class="mk" x="220" y="211">SUTRA</text>
        @for (n of sutra; track n.l) {
          <g class="nd" [class.sys]="n.sys" [class.hot]="cap() === n" tabindex="0" (mouseenter)="cap.set(n)" (focus)="cap.set(n)" (blur)="cap.set(null)" [attr.transform]="'translate(' + (n.x - n.w / 2) + ' ' + (n.y - 16) + ')'">
            <rect [attr.width]="n.w" height="32" [attr.rx]="n.sys ? 8 : 16"/><text [attr.x]="n.w / 2" y="21">{{ n.l }}</text>
          </g>
        }
      </svg>
    }
    @case ('medha') {
      <svg viewBox="0 0 440 410" role="img" aria-label="MEDHA engine turning conversations, business data and workflows into decisions and actions, with AI agents attached">
        @for (p of particles; track $index) { <circle class="pt" [attr.cx]="p.x" [attr.cy]="p.y" r="1.6" [style.animation-delay.ms]="p.d"/> }
        @for (n of agents; track n.l) { <line class="th" [class.hot]="cap() === n" [attr.x1]="n.x" [attr.y1]="n.y" x2="220" [attr.y2]="n.y < 200 ? 104 : 316"/> }
        <rect class="engine" x="164" y="104" width="112" height="212" rx="22"/>
        @for (a of mesh.slice(0, 4); track $index) { @for (b of mesh.slice(4); track $index) { <line class="mesh" [attr.x1]="a.x" [attr.y1]="a.y" [attr.x2]="b.x" [attr.y2]="b.y"/> } }
        @for (n of mesh; track $index; let i = $index) { <circle class="neuron" [attr.cx]="n.x" [attr.cy]="n.y" r="5.5" [style.animation-delay.ms]="i * 260"/> }
        <text class="mk ink" x="220" y="300">MEDHA</text>
        @for (n of inputs; track n.l; let i = $index) {
          <path class="th" [attr.d]="'M118,' + n.y + ' C140,' + n.y + ' 146,210 164,210'"/>
          <path class="sig" pathLength="100" [attr.d]="'M118,' + n.y + ' C140,' + n.y + ' 146,210 164,210'" [style.animation-delay.ms]="i * 500"/>
        }
        @for (n of outputs; track n.l; let i = $index) {
          <path class="th" [attr.d]="'M276,210 C298,210 312,' + n.y + ' 336,' + n.y"/>
          <path class="sig" pathLength="100" [attr.d]="'M276,210 C298,210 312,' + n.y + ' 336,' + n.y" [style.animation-delay.ms]="1100 + i * 600"/>
        }
        @for (n of inputs.concat(agents); track n.l) {
          <g class="nd" [class.hot]="cap() === n" tabindex="0" (mouseenter)="cap.set(n)" (focus)="cap.set(n)" (blur)="cap.set(null)" [attr.transform]="'translate(' + (n.x - n.w / 2) + ' ' + (n.y - 16) + ')'">
            <rect [attr.width]="n.w" height="32" rx="16"/><text [attr.x]="n.w / 2" y="21">{{ n.l }}</text>
          </g>
        }
        @for (n of outputs; track n.l) {
          <g class="nd solid" [class.hot]="cap() === n" tabindex="0" (mouseenter)="cap.set(n)" (focus)="cap.set(n)" (blur)="cap.set(null)" [attr.transform]="'translate(' + (n.x - n.w / 2) + ' ' + (n.y - 16) + ')'">
            <rect [attr.width]="n.w" height="32" rx="16"/><text [attr.x]="n.w / 2" y="21">{{ n.l }}</text>
          </g>
        }
      </svg>
    }
    @case ('kavach') {
      <svg viewBox="0 0 440 410" role="img" aria-label="KAVACH shield inside protection rings for data, access, monitoring and AI governance">
        <circle class="rg" cx="220" cy="205" r="70"/>
        <circle class="rg" cx="220" cy="205" r="117"/>
        <circle class="rg dash spin" cx="220" cy="205" r="160"/>
        @for (n of ktags; track n.l; let i = $index) {
          <line class="enc" [class.hot]="cap() === n" [attr.x1]="n.x" [attr.y1]="n.y" x2="220" y2="205"/>
          <line class="sig" pathLength="100" [attr.x1]="n.x" [attr.y1]="n.y" x2="220" y2="205" [style.animation-delay.ms]="i * 600"/>
          <g class="lock" [attr.transform]="'translate(' + ((n.x + 220) / 2 - 7) + ' ' + ((n.y + 205) / 2 - 8) + ')'"><rect y="5" width="14" height="11" rx="2"/><path d="M3.5 5.5v-2a3.5 3.5 0 0 1 7 0v2"/></g>
        }
        <g class="orbit o1"><circle class="sat" cx="220" cy="88" r="4.5"/></g>
        <g class="orbit o2"><circle class="sat" cx="220" cy="45" r="4.5"/></g>
        <circle class="halo" cx="220" cy="205" r="60"/>
        <path class="shield" d="M220 154 L259 169 V203 C259 231 243 249 220 257 C197 249 181 231 181 203 V169 Z"/>
        <path class="check" d="M204 205 l11 11 l22 -24"/>
        @for (n of ktags; track n.l) {
          <g class="nd" [class.hot]="cap() === n" tabindex="0" (mouseenter)="cap.set(n)" (focus)="cap.set(n)" (blur)="cap.set(null)" [attr.transform]="'translate(' + (n.x - n.w / 2) + ' ' + (n.y - 16) + ')'">
            <rect [attr.width]="n.w" height="32" rx="16"/><text [attr.x]="n.w / 2" y="21">{{ n.l }}</text>
          </g>
        }
      </svg>
    }
  }
    <p class="caption" aria-live="polite">@if (cap(); as c) { <b>{{ c.l }}</b> {{ c.d }} } @else { <span>{{ hint }}</span> }</p>
  </div>`,
  styles: [`
  :host{display:block;color:var(--c,var(--primary))}
  svg{width:100%;height:auto;overflow:visible}
  .th{fill:none;stroke:currentColor;stroke-opacity:.28;stroke-width:1.5;transition:stroke-opacity .25s,stroke-width .25s}
  .th.hot,.enc.hot{stroke-opacity:.95;stroke-width:2.4}
  .sig{fill:none;stroke:currentColor;stroke-width:3;stroke-linecap:round;stroke-dasharray:8 92;stroke-dashoffset:100;animation:run 2.8s linear infinite}
  .ring{fill:none;stroke:currentColor;stroke-opacity:.45;stroke-dasharray:4 8}
  .spin{transform-origin:220px 205px;animation:spin 28s linear infinite}
  .core{fill:currentColor;filter:drop-shadow(0 8px 18px var(--glow))}
  .mk{fill:var(--surface);font:800 16px var(--mark);letter-spacing:.06em;text-anchor:middle}
  .mk.ink{fill:currentColor;font-size:15px}
  .nd{cursor:default;outline:none}
  .nd rect{fill:var(--surface);stroke:currentColor;stroke-opacity:.5;stroke-width:1.2;transition:fill .2s,stroke-opacity .2s}
  .nd text{fill:var(--fg);font:500 12.5px var(--font-body);text-anchor:middle;pointer-events:none}
  .nd.sys rect{stroke-dasharray:3 3}
  .nd.hot rect,.nd:focus-visible rect{stroke-opacity:1;stroke-width:2;fill:var(--t,var(--surface))}
  .nd.solid rect{fill:currentColor;stroke:none}.nd.solid text{fill:var(--surface);font-weight:650}
  .engine{fill:currentColor;fill-opacity:.07;stroke:currentColor;stroke-opacity:.55;stroke-width:1.4}
  .mesh{stroke:currentColor;stroke-opacity:.2}
  .neuron{fill:currentColor;animation:blink 2.2s ease-in-out infinite}
  .pt{fill:currentColor;opacity:.35;animation:drift 6s ease-in-out infinite}
  .rg{fill:none;stroke:currentColor;stroke-opacity:.28;stroke-width:1.3}
  .rg.dash{stroke-dasharray:3 9;stroke-opacity:.5}
  .enc{stroke:currentColor;stroke-opacity:.3;stroke-width:1.4;stroke-dasharray:5 4}
  .lock rect{fill:var(--surface);stroke:currentColor;stroke-width:1.4}.lock path{fill:none;stroke:currentColor;stroke-width:1.4}
  .halo{fill:currentColor;fill-opacity:.1}
  .shield{fill:currentColor;filter:drop-shadow(0 8px 18px var(--glow))}
  .check{fill:none;stroke:var(--surface);stroke-width:5;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:60;stroke-dashoffset:60;animation:tick 4s ease-in-out infinite}
  .orbit{transform-origin:220px 205px}.o1{animation:spin 10s linear infinite}.o2{animation:spin 16s linear infinite reverse}
  .sat{fill:currentColor}
  .caption{min-height:3em;margin:.5rem auto 0;max-width:46ch;text-align:center;font-size:.88rem;line-height:1.5;color:var(--fg-2)}
  .caption b{color:currentColor;margin-right:.25rem}
  .caption span{opacity:.8}
  @keyframes run{to{stroke-dashoffset:0}}
  @keyframes spin{to{transform:rotate(360deg)}}
  @keyframes blink{0%,100%{opacity:1}50%{opacity:.35}}
  @keyframes drift{0%,100%{transform:translate(0,0)}50%{transform:translate(6px,-8px)}}
  @keyframes tick{0%,15%{stroke-dashoffset:60}35%,85%{stroke-dashoffset:0}100%{stroke-dashoffset:60}}
  @media(prefers-reduced-motion:reduce){.sig{display:none}.check{stroke-dashoffset:0}}
  `]
})
export class PlatformArtComponent {
  @Input({ required: true }) slug!: PlatformSlug;
  @Input() hint = 'Hover or tab through the diagram to see what each part does.';
  cap = signal<Node | null>(null);
  sutra = SUTRA_NODES; inputs = M_IN; outputs = M_OUT; agents = M_AG; mesh = MESH; ktags = K_TAGS;
  particles = Array.from({ length: 16 }, (_, i) => ({ x: 150 + ((i * 53) % 150), y: 70 + ((i * 97) % 280), d: i * 380 }));
}
