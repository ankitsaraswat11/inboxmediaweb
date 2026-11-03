import { Component, Input } from '@angular/core';
import { PlatformSlug } from '../data';

const HUB = { x: 220, y: 200 };
/** SUTRA: the channels a single thread fabric connects. */
const CHANNELS = [
  { l: 'SMS', x: 92, y: 72 }, { l: 'RCS', x: 220, y: 36 }, { l: 'WhatsApp', x: 348, y: 72 }, { l: 'APIs', x: 392, y: 200 },
  { l: 'Email', x: 348, y: 328 }, { l: 'Voice', x: 220, y: 364 }, { l: 'Telephony', x: 92, y: 328 }, { l: 'IVR', x: 48, y: 200 }
];
/** A slightly curved thread from the hub to a point, so lines read as threads rather than spokes. */
const thread = (x: number, y: number, bend = 0.22) => {
  const mx = (HUB.x + x) / 2, my = (HUB.y + y) / 2, dx = x - HUB.x, dy = y - HUB.y;
  return `M${HUB.x},${HUB.y} Q${(mx - dy * bend).toFixed(1)},${(my + dx * bend).toFixed(1)} ${x},${y}`;
};
/** MEDHA: inputs, the engine mesh, outputs. */
const INPUTS = [{ l: 'Conversations', y: 110 }, { l: 'Business data', y: 200 }, { l: 'Processes', y: 290 }];
const OUTPUTS = [{ l: 'Decisions', y: 150 }, { l: 'Actions', y: 250 }];
const MESH_L = [128, 176, 224, 272].map(y => ({ x: 192, y }));
const MESH_R = [152, 200, 248].map(y => ({ x: 250, y }));

@Component({
  selector: 'app-platform-art',
  standalone: true,
  template: `
  @switch (slug) {
    @case ('sutra') {
      <svg viewBox="0 0 440 400" role="img" aria-label="SUTRA connects SMS, RCS, WhatsApp, email, voice, telephony, IVR and APIs through one hub">
        @for (c of channels; track c.l; let i = $index) {
          <path class="th" [attr.d]="c.d"/>
          <path class="pulse" pathLength="100" [attr.d]="c.d" [style.animation-delay.ms]="i * 340"/>
        }
        <circle class="ring spin" cx="220" cy="200" r="64"/>
        <circle class="core" cx="220" cy="200" r="46"/>
        <text class="mk" x="220" y="206">SUTRA</text>
        @for (c of channels; track c.l) {
          <g [attr.transform]="'translate(' + (c.x - c.w / 2) + ' ' + (c.y - 16) + ')'"><rect class="pill" [attr.width]="c.w" height="32" rx="16"/><text class="pt" [attr.x]="c.w / 2" y="21">{{ c.l }}</text></g>
        }
      </svg>
    }
    @case ('medha') {
      <svg viewBox="0 0 440 400" role="img" aria-label="MEDHA turns conversations, business data and processes into decisions and actions">
        <rect class="engine" x="164" y="96" width="114" height="208" rx="26"/>
        @for (a of meshL; track $index) { @for (b of meshR; track $index) { <line class="mesh" [attr.x1]="a.x" [attr.y1]="a.y" [attr.x2]="b.x" [attr.y2]="b.y"/> } }
        @for (p of inPaths; track $index; let i = $index) { <path class="th" [attr.d]="p"/><path class="pulse" pathLength="100" [attr.d]="p" [style.animation-delay.ms]="i * 520"/> }
        @for (p of outPaths; track $index; let i = $index) { <path class="th" [attr.d]="p"/><path class="pulse" pathLength="100" [attr.d]="p" [style.animation-delay.ms]="900 + i * 600"/> }
        @for (n of meshL; track $index; let i = $index) { <circle class="node blink" [attr.cx]="n.x" [attr.cy]="n.y" r="6" [style.animation-delay.ms]="i * 300"/> }
        @for (n of meshR; track $index; let i = $index) { <circle class="node blink" [attr.cx]="n.x" [attr.cy]="n.y" r="6" [style.animation-delay.ms]="600 + i * 300"/> }
        <text class="mk ink" x="221" y="336">MEDHA</text>
        @for (n of inputs; track n.l) { <g [attr.transform]="'translate(6 ' + (n.y - 16) + ')'"><rect class="pill" width="118" height="32" rx="16"/><text class="pt" x="59" y="21">{{ n.l }}</text></g> }
        @for (n of outputs; track n.l) { <g [attr.transform]="'translate(330 ' + (n.y - 16) + ')'"><rect class="pill solid" width="102" height="32" rx="16"/><text class="pt inv" x="51" y="21">{{ n.l }}</text></g> }
      </svg>
    }
    @case ('kavach') {
      <svg viewBox="0 0 440 400" role="img" aria-label="KAVACH shields data, AI systems, infrastructure and customer privacy">
        <circle class="rg" cx="220" cy="200" r="72"/>
        <circle class="rg" cx="220" cy="200" r="116"/>
        <circle class="rg dash spin" cx="220" cy="200" r="160"/>
        <g class="orbit o1"><circle class="sat" cx="220" cy="84" r="5"/></g>
        <g class="orbit o2"><circle class="sat" cx="220" cy="40" r="5"/></g>
        <circle class="halo" cx="220" cy="200" r="58"/>
        <path class="shield" d="M220 150 L258 165 V199 C258 226 242 244 220 252 C198 244 182 226 182 199 V165 Z"/>
        <rect x="207" y="196" width="26" height="21" rx="4" fill="#fff"/>
        <path d="M212 196 v-7 a8 8 0 0 1 16 0 v7" fill="none" stroke="#fff" stroke-width="3"/>
        @for (n of shieldTags; track n.l) { <g [attr.transform]="'translate(' + (n.x - n.w / 2) + ' ' + (n.y - 16) + ')'"><rect class="pill" [attr.width]="n.w" height="32" rx="16"/><text class="pt" [attr.x]="n.w / 2" y="21">{{ n.l }}</text></g> }
      </svg>
    }
  }`,
  styles: [`
  :host{display:block;color:var(--c,#673ab7)}
  svg{width:100%;height:auto;overflow:visible}
  .th{fill:none;stroke:currentColor;stroke-opacity:.32;stroke-width:1.6}
  .pulse{fill:none;stroke:currentColor;stroke-width:3;stroke-linecap:round;stroke-dasharray:10 90;stroke-dashoffset:100;animation:run 2.8s linear infinite}
  .ring{fill:none;stroke:currentColor;stroke-opacity:.45;stroke-dasharray:4 8}
  .spin{transform-origin:220px 200px;animation:spin 26s linear infinite}
  .core{fill:currentColor}
  .mk{fill:#fff;font:700 17px var(--mark);letter-spacing:.06em;text-anchor:middle}
  .mk.ink{fill:currentColor;font-size:20px}
  .pill{fill:#fff;stroke:currentColor;stroke-opacity:.55;stroke-width:1.2}
  .pill.solid{fill:currentColor;stroke:none}
  .pt{fill:#1b1033;font:500 12.5px Inter,system-ui,sans-serif;text-anchor:middle}
  .pt.inv{fill:#fff;font-weight:600}
  .engine{fill:currentColor;fill-opacity:.07;stroke:currentColor;stroke-opacity:.5;stroke-width:1.4}
  .mesh{stroke:currentColor;stroke-opacity:.22;stroke-width:1}
  .node{fill:currentColor}
  .blink{animation:blink 2.4s ease-in-out infinite}
  .rg{fill:none;stroke:currentColor;stroke-opacity:.3;stroke-width:1.4}
  .rg.dash{stroke-dasharray:3 9;stroke-opacity:.55}
  .halo{fill:currentColor;fill-opacity:.1}
  .shield{fill:currentColor}
  .orbit{transform-origin:220px 200px}.o1{animation:spin 9s linear infinite}.o2{animation:spin 15s linear infinite reverse}
  .sat{fill:currentColor}
  @keyframes run{to{stroke-dashoffset:0}}
  @keyframes spin{to{transform:rotate(360deg)}}
  @keyframes blink{0%,100%{opacity:1}50%{opacity:.35}}
  @media(prefers-reduced-motion:reduce){.pulse{display:none}}
  `]
})
export class PlatformArtComponent {
  @Input({ required: true }) slug!: PlatformSlug;
  channels = CHANNELS.map(c => ({ ...c, w: Math.max(58, c.l.length * 8 + 22), d: thread(c.x, c.y) }));
  inputs = INPUTS; outputs = OUTPUTS; meshL = MESH_L; meshR = MESH_R;
  inPaths = INPUTS.map(n => `M124,${n.y} C146,${n.y} 150,200 164,200`);
  outPaths = OUTPUTS.map(n => `M278,200 C300,200 306,${n.y} 330,${n.y}`);
  shieldTags = [
    { l: 'Data', x: 220, y: 84, w: 70 }, { l: 'AI systems', x: 372, y: 200, w: 98 },
    { l: 'Infrastructure', x: 220, y: 316, w: 118 }, { l: 'Customer privacy', x: 68, y: 200, w: 132 }
  ];
}
