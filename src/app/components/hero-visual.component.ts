import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface HubNode {
  key: 'agents' | 'data' | 'crm' | 'cloud' | 'channels' | 'voice';
  label: string;
  sub: string;
  angle: number;
  grad: [string, string];
  x: number;
  y: number;
  path: string;
  delay: number;
}

const C = 300;   // svg centre (viewBox 600x600)
const R = 225;   // node radius from centre

@Component({
  selector: 'app-hero-visual',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="hub" (mouseleave)="active = -1">

    <!-- ====== SVG layer: orbits, beams, packets ====== -->
    <svg class="hub__svg" viewBox="0 0 600 600" aria-hidden="true">
      <defs>
        <radialGradient id="hvGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#5b6cff" stop-opacity=".28"/>
          <stop offset="60%" stop-color="#a855f7" stop-opacity=".08"/>
          <stop offset="100%" stop-color="#a855f7" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="hvBeam" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#3b5bff"/>
          <stop offset="100%" stop-color="#c026d3"/>
        </linearGradient>
        <filter id="hvSoft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3"/>
        </filter>
      </defs>

      <circle cx="300" cy="300" r="290" fill="url(#hvGlow)"/>

      <!-- rotating orbit rings -->
      <g class="orbit orbit--outer">
        <circle cx="300" cy="300" r="225" fill="none" stroke="currentColor"
                stroke-opacity=".14" stroke-dasharray="2 10" stroke-linecap="round" stroke-width="2"/>
        <circle cx="525" cy="300" r="4" fill="#3b5bff"/>
        <circle cx="75" cy="300" r="3" fill="#c026d3"/>
      </g>
      <g class="orbit orbit--inner">
        <circle cx="300" cy="300" r="150" fill="none" stroke="url(#hvBeam)"
                stroke-opacity=".35" stroke-dasharray="60 240" stroke-linecap="round" stroke-width="1.5"/>
        <circle cx="300" cy="150" r="3.5" fill="#7c3aed"/>
      </g>
      <circle cx="300" cy="300" r="95" fill="none" stroke="currentColor" stroke-opacity=".08"/>

      <!-- beams + data packets -->
      <g *ngFor="let n of nodes; let i = index" class="beam" [class.beam--active]="active === i">
        <path [attr.d]="n.path" class="beam__base"/>
        <path [attr.d]="n.path" class="beam__flow" [style.animationDelay.s]="n.delay"/>

        <circle r="4" class="packet packet--out">
          <animateMotion [attr.path]="n.path" dur="3.2s" repeatCount="indefinite"
                         [attr.begin]="n.delay + 's'"/>
        </circle>
        <circle r="7" class="packet packet--halo" filter="url(#hvSoft)">
          <animateMotion [attr.path]="n.path" dur="3.2s" repeatCount="indefinite"
                         [attr.begin]="n.delay + 's'"/>
        </circle>
        <circle r="3" class="packet packet--in">
          <animateMotion [attr.path]="n.path" dur="4s" repeatCount="indefinite"
                         keyPoints="1;0" keyTimes="0;1" calcMode="linear"
                         [attr.begin]="(n.delay + 1.4) + 's'"/>
        </circle>
      </g>
    </svg>

    <!-- ====== Centre core ====== -->
    <div class="core">
      <span class="core__ring"></span>
      <span class="core__ring core__ring--2"></span>
      <span class="core__ring core__ring--3"></span>
      <div class="core__tile">
        <svg viewBox="0 0 48 48" fill="none" stroke="#fff" stroke-width="2.6"
             stroke-linecap="round" stroke-linejoin="round">
          <rect x="7" y="12" width="34" height="26" rx="5"/>
          <path d="M8 15l16 12 16-12"/>
          <circle cx="38" cy="11" r="5" fill="#22d3ee" stroke="none"/>
        </svg>
      </div>
      <div class="core__label">Inbox Core</div>
    </div>

    <!-- ====== Nodes ====== -->
    <button *ngFor="let n of nodes; let i = index"
            type="button"
            class="node"
            [class.node--active]="active === i"
            [style.left.%]="n.x / 6"
            [style.top.%]="n.y / 6"
            [style.animationDelay.s]="i * 0.45"
            (mouseenter)="active = i"
            (focus)="active = i">
      <span class="node__icon"
            [style.background]="'linear-gradient(135deg,' + n.grad[0] + ',' + n.grad[1] + ')'"
            [style.boxShadow]="'0 10px 24px -8px ' + n.grad[1]">
        <ng-container [ngSwitch]="n.key">
          <svg *ngSwitchCase="'agents'" viewBox="0 0 24 24"><rect x="5" y="8" width="14" height="11" rx="3"/><path d="M12 4v4M9 13h.01M15 13h.01M2 13h3M19 13h3"/></svg>
          <svg *ngSwitchCase="'data'" viewBox="0 0 24 24"><ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/></svg>
          <svg *ngSwitchCase="'crm'" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="3"/><path d="M3 10h18M9 10v10"/></svg>
          <svg *ngSwitchCase="'cloud'" viewBox="0 0 24 24"><path d="M7 18a4.5 4.5 0 01-.5-9A6 6 0 0118 9.5a4.2 4.2 0 01-.5 8.5z"/></svg>
          <svg *ngSwitchCase="'channels'" viewBox="0 0 24 24"><path d="M4 5h11a2 2 0 012 2v6a2 2 0 01-2 2H9l-4 3v-3H4a2 2 0 01-2-2V7a2 2 0 012-2z"/><path d="M19 9h1a2 2 0 012 2v5a2 2 0 01-2 2h-1v2l-3-2"/></svg>
          <svg *ngSwitchCase="'voice'" viewBox="0 0 24 24"><path d="M4 10v4M8 7v10M12 4v16M16 7v10M20 10v4"/></svg>
        </ng-container>
      </span>
      <span class="node__text">
        <span class="node__label">{{ n.label }}</span>
        <span class="node__sub"><i class="dot"></i>{{ n.sub }}</span>
      </span>
    </button>

    <!-- ====== Floating stat chips ====== -->
    <div class="chip chip--a"><i class="dot"></i>1.2M events / min</div>
    <div class="chip chip--b"><b>99.99%</b> uptime</div>
  </div>
  `,
  styles: [`
    :host {
      --ink: var(--fg, #141A52);
      --muted: var(--fg-2, #6b7091);
      --card: color-mix(in srgb, var(--surface, #fff) 78%, transparent);
      --card-border: color-mix(in srgb, var(--fg, #141A52) 10%, transparent);
      --live: #10b981;
      display: block;
      width: 100%;
      max-width: 620px;
      margin-inline: auto;
      color: var(--ink);
    }

    .hub { position: relative; width: 100%; aspect-ratio: 1; }
    .hub__svg { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; color: var(--ink); }

    /* orbits */
    .orbit { transform-origin: 300px 300px; transform-box: view-box; }
    .orbit--outer { animation: spin 60s linear infinite; }
    .orbit--inner { animation: spin 22s linear infinite reverse; }
    @keyframes spin { to { transform: rotate(360deg); } }

    /* beams */
    .beam__base { fill: none; stroke: var(--ink); stroke-opacity: .1; stroke-width: 1.5; }
    .beam__flow {
      fill: none; stroke: url(#hvBeam); stroke-width: 2; stroke-linecap: round;
      stroke-dasharray: 18 260; stroke-opacity: .55;
      animation: flow 3.2s linear infinite;
    }
    .beam--active .beam__base { stroke-opacity: .25; }
    .beam--active .beam__flow { stroke-width: 3; stroke-opacity: 1; stroke-dasharray: 40 200; }
    @keyframes flow { from { stroke-dashoffset: 278; } to { stroke-dashoffset: 0; } }

    .packet--out { fill: #3b5bff; }
    .packet--halo { fill: #7c3aed; opacity: .5; }
    .packet--in { fill: #c026d3; }

    /* core */
    .core {
      position: absolute; left: 50%; top: 50%;
      width: 23%; aspect-ratio: 1;
      transform: translate(-50%, -50%);
      display: grid; place-items: center;
    }
    .core__tile {
      position: relative; z-index: 2;
      width: 100%; height: 100%;
      border-radius: 30%;
      display: grid; place-items: center;
      background: linear-gradient(140deg, #2f4bff 0%, #6d3bff 55%, #c026d3 100%);
      box-shadow:
        0 25px 50px -15px rgba(79, 70, 229, .6),
        inset 0 1px 0 rgba(255,255,255,.45),
        inset 0 -10px 20px rgba(0,0,0,.15);
      animation: breathe 4s ease-in-out infinite;
    }
    .core__tile::after {
      content: ""; position: absolute; inset: 0; border-radius: inherit;
      background: linear-gradient(160deg, rgba(255,255,255,.35), transparent 45%);
    }
    .core__tile svg { width: 48%; height: 48%; position: relative; z-index: 1; }
    .core__ring {
      position: absolute; inset: 0; border-radius: 32%;
      border: 1.5px solid #6d3bff;
      animation: ripple 3.6s ease-out infinite;
    }
    .core__ring--2 { animation-delay: 1.2s; }
    .core__ring--3 { animation-delay: 2.4s; }
    .core__label {
      position: absolute; top: calc(100% + 12px); white-space: nowrap;
      font: 600 11px/1 system-ui, sans-serif; letter-spacing: .18em; text-transform: uppercase;
      color: var(--muted);
    }
    @keyframes ripple { from { transform: scale(1); opacity: .6; } to { transform: scale(1.9); opacity: 0; } }
    @keyframes breathe { 50% { transform: translateY(-4px) scale(1.03); } }

    /* nodes */
    .node {
      all: unset; cursor: pointer;
      position: absolute;
      transform: translate(-50%, -50%);
      display: flex; align-items: center; gap: 10px;
      padding: 8px 14px 8px 8px;
      border-radius: 16px;
      background: var(--card);
      border: 1px solid var(--card-border);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      box-shadow: 0 12px 30px -12px rgba(18, 22, 74, .25);
      animation: float 6s ease-in-out infinite;
      transition: box-shadow .3s, border-color .3s, scale .3s;
      z-index: 3;
    }
    .node:hover, .node--active, .node:focus-visible {
      scale: 1.07;
      border-color: rgba(91, 108, 255, .45);
      box-shadow: 0 18px 40px -12px rgba(79, 70, 229, .45);
    }
    @keyframes float { 50% { translate: 0 -8px; } }

    .node__icon {
      width: 38px; height: 38px; flex: none;
      border-radius: 12px;
      display: grid; place-items: center;
    }
    .node__icon svg {
      width: 20px; height: 20px;
      fill: none; stroke: #fff; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round;
    }
    .node__text { display: flex; flex-direction: column; gap: 3px; }
    .node__label {
      font: 700 12px/1 system-ui, sans-serif; letter-spacing: .12em; text-transform: uppercase;
      color: var(--ink); white-space: nowrap;
    }
    .node__sub {
      display: flex; align-items: center; gap: 5px;
      font: 500 11px/1 system-ui, sans-serif; color: var(--muted); white-space: nowrap;
    }

    .dot {
      width: 6px; height: 6px; border-radius: 50%;
      background: var(--live);
      box-shadow: 0 0 0 0 rgba(16,185,129,.6);
      animation: live 1.8s infinite;
      display: inline-block;
    }
    @keyframes live { 70% { box-shadow: 0 0 0 6px rgba(16,185,129,0); } 100% { box-shadow: 0 0 0 0 rgba(16,185,129,0); } }

    /* stat chips */
    .chip {
      position: absolute; z-index: 2;
      display: flex; align-items: center; gap: 7px;
      padding: 7px 12px; border-radius: 999px;
      font: 500 12px/1 system-ui, sans-serif; color: var(--ink);
      background: var(--card); border: 1px solid var(--card-border);
      backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
      box-shadow: 0 8px 20px -10px rgba(18,22,74,.25);
      animation: float 7s ease-in-out infinite;
    }
    .chip b { font-weight: 700; color: var(--primary, #4f46e5); }
    .chip--a { left: 70%; top: 9%; animation-delay: .8s; }
    .chip--b { left: 4%; top: 85%; animation-delay: 2s; }

    /* small screens */
    @media (max-width: 640px) {
      .node { padding: 6px; border-radius: 14px; }
      .node__text { display: none; }
      .node__icon { width: 34px; height: 34px; }
      .chip { display: none; }
    }

    @media (prefers-reduced-motion: reduce) {
      .orbit, .beam__flow, .core__tile, .core__ring, .node, .chip, .dot { animation: none !important; }
      .packet { display: none; }
    }
  `]
})
export class HeroVisualComponent {
  active = -1;

  nodes: HubNode[] = ([
    { key: 'agents',   label: 'AI Agents', sub: '24 active',      angle: -90, grad: ['#6366f1', '#a855f7'] },
    { key: 'data',     label: 'Data',      sub: 'Synced',         angle: -30, grad: ['#06b6d4', '#3b82f6'] },
    { key: 'crm',      label: 'CRM & ERP', sub: 'Connected',      angle:  30, grad: ['#d946ef', '#7c3aed'] },
    { key: 'cloud',    label: 'Cloud',     sub: 'Multi-region',   angle:  90, grad: ['#f97316', '#ec4899'] },
    { key: 'channels', label: 'Channels',  sub: 'SMS · RCS · WA', angle: 150, grad: ['#10b981', '#06b6d4'] },
    { key: 'voice',    label: 'Voice',     sub: 'Live calls',     angle: 210, grad: ['#3b5bff', '#6366f1'] },
  ] as const).map((n, i) => {
    const a = (n.angle * Math.PI) / 180;
    const x = C + R * Math.cos(a);
    const y = C + R * Math.sin(a);
    // gentle curve: control point pushed sideways from the midpoint
    const mx = (C + x) / 2, my = (C + y) / 2;
    const cx = mx - Math.sin(a) * 38;
    const cy = my + Math.cos(a) * 38;
    return {
      ...n,
      grad: [...n.grad] as [string, string],
      x, y,
      path: `M${C} ${C} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}`,
      delay: i * 0.55,
    };
  });
}
