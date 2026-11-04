import { AfterViewInit, Component, OnDestroy, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PLATFORMS } from '../content/platforms';

const C = { x: 280, y: 236 };
const R = 172;
/** Platform node positions on the orbit: SUTRA top-left, MEDHA top-right, KAVACH bottom. */
const POS = [-150, -30, 90].map(a => ({ x: +(C.x + R * Math.cos(a * Math.PI / 180)).toFixed(1), y: +(C.y + R * Math.sin(a * Math.PI / 180)).toFixed(1), a }));
/** Satellite capabilities around each platform, placed outward from the centre. */
const SATS: string[][] = [['SMS', 'WhatsApp', 'Voice'], ['AI agents', 'SLMs', 'Automation'], ['Privacy', 'Security', 'Governance']];

@Component({
  selector: 'app-ecosystem',
  standalone: true,
  imports: [RouterLink],
  template: `
  <div class="eco" (mouseleave)="resume()">
    <svg viewBox="0 0 560 584" role="img" aria-labelledby="eco-t">
      <title id="eco-t">Inbox Media at the centre, connected to SUTRA (communication), MEDHA (intelligence) and KAVACH (trust), on a shared digital engineering foundation</title>
      <defs>
        <radialGradient id="eco-core" cx="50%" cy="40%" r="65%"><stop offset="0" class="g1"/><stop offset="1" class="g2"/></radialGradient>
      </defs>
      <circle class="orbit" [attr.cx]="c.x" [attr.cy]="c.y" [attr.r]="r"/>
      <circle class="orbit o2" [attr.cx]="c.x" [attr.cy]="c.y" [attr.r]="r + 44"/>
      <!-- links between platforms (they work together, not in isolation) -->
      @for (l of links; track $index) { <path class="link" [attr.d]="l"/> }
      <!-- spokes from the core -->
      @for (n of nodes; track n.p.slug; let i = $index) {
        <g [style.--c]="'var(--' + n.p.slug + ')'" [class.on]="active() === i">
          <line class="spoke" [attr.x1]="c.x" [attr.y1]="c.y" [attr.x2]="n.x" [attr.y2]="n.y"/>
          <line class="sig" pathLength="100" [attr.x1]="c.x" [attr.y1]="c.y" [attr.x2]="n.x" [attr.y2]="n.y" [style.animation-delay.ms]="i * 700"/>
          @for (s of n.sats; track s.l) {
            <line class="satl" [attr.x1]="n.x" [attr.y1]="n.y" [attr.x2]="s.x" [attr.y2]="s.y"/>
            <g class="sat" [attr.transform]="'translate(' + s.x + ' ' + s.y + ')'"><rect [attr.x]="-s.w / 2" y="-13" [attr.width]="s.w" height="26" rx="13"/><text y="4.5">{{ s.l }}</text></g>
          }
        </g>
      }
      <!-- core -->
      <circle class="halo" [attr.cx]="c.x" [attr.cy]="c.y" r="74"/>
      <circle class="core" [attr.cx]="c.x" [attr.cy]="c.y" r="60"/>
      <text class="core-t" [attr.x]="c.x" [attr.y]="c.y - 4">Inbox</text>
      <text class="core-t" [attr.x]="c.x" [attr.y]="c.y + 16">Media</text>
      <!-- platform nodes (interactive) -->
      @for (n of nodes; track n.p.slug; let i = $index) {
        <a class="node" [class.on]="active() === i" [attr.href]="'/platforms/' + n.p.slug" (click)="open($event, n.p.slug)"
           (mouseenter)="hover(i)" (focus)="hover(i)" [style.--c]="'var(--' + n.p.slug + ')'" [style.--t]="'var(--' + n.p.slug + '-tint)'"
           [attr.aria-label]="n.p.name + ': ' + n.p.descriptor">
          <circle class="ring" [attr.cx]="n.x" [attr.cy]="n.y" r="62"/>
          <circle class="disc" [attr.cx]="n.x" [attr.cy]="n.y" r="52"/>
          <text class="nm" [attr.x]="n.x" [attr.y]="n.y + 1">{{ n.p.name }}</text>
          <text class="hi" [attr.x]="n.x" [attr.y]="n.y + 22" lang="hi">{{ n.p.hi }}</text>
        </a>
      }
      <!-- shared foundation -->
      <g class="found">
        <rect x="70" y="540" width="420" height="34" rx="10"/>
        <text x="280" y="562">Digital Engineering · shared foundation</text>
        @for (n of nodes; track n.p.slug) { <line class="fl" [attr.x1]="n.x" [attr.y1]="n.y + 62" [attr.x2]="n.x" y2="540"/> }
      </g>
    </svg>
    <div class="cap" aria-live="polite" [style.--c]="'var(--' + cur().slug + ')'">
      <p class="cap-top"><b>{{ cur().name }}</b> {{ cur().layer }}</p>
      <p class="cap-tag">{{ cur().tagline }}</p>
      <p class="cap-d">{{ cur().summary }}</p>
      <a class="text-link" [routerLink]="['/platforms', cur().slug]">Explore {{ cur().name }}</a>
    </div>
  </div>`,
  styles: [`
  :host{display:block}
  .eco{position:relative}
  svg{width:100%;height:auto;overflow:visible}
  .g1{stop-color:#8B5CF6}.g2{stop-color:#4C1D95}
  .orbit{fill:none;stroke:var(--border-strong);stroke-dasharray:3 7;transform-origin:280px 236px;animation:spin 60s linear infinite}
  .o2{stroke-opacity:.5;animation-direction:reverse;animation-duration:90s}
  .link{fill:none;stroke:var(--border-strong);stroke-width:1.2;stroke-dasharray:2 6}
  .spoke{stroke:var(--c);stroke-opacity:.35;stroke-width:1.6}
  .sig{stroke:var(--c);stroke-width:3.2;stroke-linecap:round;stroke-dasharray:8 92;stroke-dashoffset:100;animation:sig 2.4s linear infinite}
  .satl{stroke:var(--c);stroke-opacity:.3;stroke-width:1}
  .sat rect{fill:var(--surface);stroke:var(--c);stroke-opacity:.45}
  .sat text{fill:var(--fg);font:500 11.5px var(--font-body);text-anchor:middle}
  .halo{fill:var(--glow)}
  .core{fill:url(#eco-core)}
  .core-t{fill:#fff;font:700 17px var(--font-display);text-anchor:middle;letter-spacing:-.01em}
  .node{cursor:pointer;outline:none}
  .ring{fill:none;stroke:var(--c);stroke-opacity:.35;stroke-width:1.5;stroke-dasharray:4 5;transition:stroke-opacity .3s}
  .disc{fill:var(--t);stroke:var(--c);stroke-width:2;transition:fill .3s}
  :host-context([data-theme="dark"]) .disc{fill:var(--surface)}
  .nm{fill:var(--c);font:800 17px var(--mark);letter-spacing:.05em;text-anchor:middle}
  .hi{fill:var(--fg-2);font:600 14px var(--mark);text-anchor:middle}
  .node.on .ring,.node:focus-visible .ring{stroke-opacity:1;animation:pulse 2s ease-in-out infinite}
  .node.on .disc{fill:var(--surface)}
  .node:focus-visible .disc{stroke-width:4}
  g.on .spoke{stroke-opacity:.8}
  .found rect{fill:var(--eng-tint);stroke:var(--eng);stroke-opacity:.5}
  .found text{fill:var(--eng);font:600 13px var(--font-body);text-anchor:middle}
  .fl{stroke:var(--eng);stroke-opacity:.25;stroke-dasharray:2 4}
  .cap{position:relative;margin:.4rem auto 0;max-width:440px;padding:.85rem 1rem;border-radius:var(--r);background:var(--surface);border:1px solid var(--border);box-shadow:var(--shadow);border-top:3px solid var(--c)}
  .cap p{margin:0}
  .cap-top{font-size:.78rem;font-weight:600;color:var(--fg-2)!important}
  .cap-top b{font:800 .95rem var(--mark);letter-spacing:.04em;color:var(--c);margin-right:.25rem}
  .cap-tag{font:600 1rem/1.3 var(--font-display);color:var(--fg)!important;margin:.3rem 0!important}
  .cap-d{font-size:.84rem;line-height:1.5;margin-bottom:.5rem!important}
  .cap .text-link{font-size:.86rem}
  @media(max-width:560px){.sat,.satl{display:none}}
  @keyframes spin{to{transform:rotate(360deg)}}
  @keyframes sig{to{stroke-dashoffset:0}}
  @keyframes pulse{50%{stroke-opacity:.35}}
  `]
})
export class EcosystemComponent implements AfterViewInit, OnDestroy {
  c = C; r = R;
  nodes = PLATFORMS.map((p, i) => {
    const pos = POS[i];
    const sats = SATS[i].map((l, k) => {
      const ang = (pos.a + (k - 1) * 38) * Math.PI / 180;
      return { l, x: +(pos.x + 92 * Math.cos(ang)).toFixed(1), y: +(pos.y + 92 * Math.sin(ang)).toFixed(1), w: l.length * 7 + 22 };
    });
    return { p, ...pos, sats };
  });
  links = [[0, 1], [1, 2], [2, 0]].map(([a, b]) => {
    const A = POS[a], B = POS[b], mx = (A.x + B.x) / 2, my = (A.y + B.y) / 2;
    const qx = C.x + (mx - C.x) * 1.55, qy = C.y + (my - C.y) * 1.55;
    return `M${A.x},${A.y} Q${qx.toFixed(1)},${qy.toFixed(1)} ${B.x},${B.y}`;
  });
  active = signal(0);
  cur = () => PLATFORMS[this.active()];
  private timer?: ReturnType<typeof setInterval>;
  private paused = false;
  private router = inject(Router);

  ngAfterViewInit() {
    const reduce = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduce) this.timer = setInterval(() => { if (!this.paused && !document.hidden) this.active.set((this.active() + 1) % 3); }, 3200);
  }
  ngOnDestroy() { clearInterval(this.timer); }
  hover(i: number) { this.paused = true; this.active.set(i); }
  resume() { this.paused = false; }
  open(e: Event, slug: string) { e.preventDefault(); this.router.navigate(['/platforms', slug]); }
}

