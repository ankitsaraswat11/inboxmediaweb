import { AfterViewInit, Component, ElementRef, Input, NgZone, OnDestroy, inject, signal } from '@angular/core';

interface Thread { d: string; c: string; i: number; side: 'l' | 'r'; }
interface Knot { x: number; y: number; c: string; i: number; }

const COLORS = ['var(--sutra)', 'var(--medha)', 'var(--kavach)'];

/**
 * The homepage "weave": one thread per platform (SUTRA saffron, MEDHA violet, KAVACH teal)
 * enters from each edge of the hero and lands on that platform's card.
 * Cards are found by [data-thread="0|1|2"] inside the host's parent; positions are
 * measured, so the threads stay attached at every screen size. When the cards stack
 * (phones), only the background threads are drawn.
 */
@Component({
  selector: 'app-weave',
  standalone: true,
  host: { 'aria-hidden': 'true' },
  template: `
  <svg [attr.viewBox]="'0 0 ' + w() + ' ' + h()" [attr.width]="w()" [attr.height]="h()" fill="none">
    @for (p of loose(); track $index) { <path class="loose" [attr.d]="p" pathLength="1" [style.animation-delay.ms]="200 + $index * 120"/> }
    @for (t of threads(); track t.i + t.side) {
      <path class="th" [class.on]="active === t.i" [class.r]="t.side === 'r'" [attr.d]="t.d" [style.stroke]="t.c" pathLength="1" [style.animation-delay.ms]="500 + t.i * 220 + (t.side === 'r' ? 120 : 0)"/>
      @if (active === t.i) { <path class="pulse" [attr.d]="t.d" [style.stroke]="t.c" pathLength="1" [style.animation-delay.ms]="t.side === 'r' ? 900 : 0"/> }
    }
    @for (k of knots(); track k.i) { <circle class="knot" [class.on]="active === k.i" [attr.cx]="k.x" [attr.cy]="k.y" r="4.5" [style.fill]="k.c"/> }
  </svg>`,
  styles: [`
  :host{position:absolute;inset:0;pointer-events:none;overflow:hidden;z-index:0}
  svg{position:absolute;left:0;top:0;max-width:none}
  path{stroke-linecap:round;vector-effect:non-scaling-stroke}
  .loose{stroke:var(--weave-loose);stroke-opacity:var(--weave-loose-o);stroke-width:1.2;stroke-dasharray:1;stroke-dashoffset:1;animation:draw 2.4s var(--ease) forwards}
  .th{stroke-width:1.6;stroke-opacity:.55;stroke-dasharray:1;stroke-dashoffset:1;animation:draw 2s var(--ease) forwards;transition:stroke-opacity .6s,stroke-width .6s}
  .th.r{stroke-opacity:.28}
  .th.on{stroke-opacity:.95;stroke-width:2.2}
  .th.r.on{stroke-opacity:.55}
  .pulse{stroke-width:3.4;stroke-dasharray:.035 .965;stroke-dashoffset:1;animation:run 3.2s linear infinite}
  .knot{opacity:0;animation:pop .5s 1.9s var(--ease) forwards;transition:r .4s}
  .knot.on{r:6}
  @keyframes draw{to{stroke-dashoffset:0}}
  @keyframes run{from{stroke-dashoffset:1}to{stroke-dashoffset:0}}
  @keyframes pop{from{opacity:0;transform-box:fill-box;transform-origin:center;transform:scale(.2)}to{opacity:1;transform-box:fill-box;transform-origin:center;transform:none}}
  @media(prefers-reduced-motion:reduce){.loose,.th{stroke-dashoffset:0;animation:none}.pulse{display:none}.knot{opacity:1;animation:none}}
  `]
})
export class WeaveComponent implements AfterViewInit, OnDestroy {
  /** Index of the highlighted platform thread (0 SUTRA, 1 MEDHA, 2 KAVACH). */
  @Input() active = 0;
  w = signal(1440); h = signal(800);
  threads = signal<Thread[]>([]);
  knots = signal<Knot[]>([]);
  loose = signal<string[]>([]);
  private el = inject(ElementRef<HTMLElement>);
  private zone = inject(NgZone);
  private ro?: ResizeObserver;

  ngAfterViewInit() {
    const host = this.el.nativeElement as HTMLElement;
    const parent = host.parentElement;
    if (!parent || typeof ResizeObserver === 'undefined') return;
    this.zone.runOutsideAngular(() => {
      this.ro = new ResizeObserver(() => this.zone.run(() => this.layout()));
      this.ro.observe(parent);
    });
    this.layout();
  }
  ngOnDestroy() { this.ro?.disconnect(); }

  private layout() {
    const host = this.el.nativeElement as HTMLElement;
    const box = host.getBoundingClientRect();
    const W = Math.round(box.width), H = Math.round(box.height);
    if (!W || !H) return;
    this.w.set(W); this.h.set(H);
    const cards = [0, 1, 2].map(i => host.parentElement!.querySelector<HTMLElement>(`[data-thread="${i}"]`)).filter((x): x is HTMLElement => !!x);
    const rects = cards.map(c => c.getBoundingClientRect());
    // Background threads that cross the whole hero.
    this.loose.set([.16, .3, .46, .62].map((f, k) => {
      const y = H * f, a = (k % 2 ? -1 : 1) * H * .08;
      return `M-40 ${y.toFixed(1)} C${(W * .3).toFixed(1)} ${(y + a).toFixed(1)} ${(W * .62).toFixed(1)} ${(y - a * 1.4).toFixed(1)} ${W + 40} ${(y + a * .5).toFixed(1)}`;
    }));
    const inRow = rects.length === 3 && Math.abs(rects[0].top - rects[2].top) < 8;
    if (!inRow) { this.threads.set([]); this.knots.set([]); return; }
    const threads: Thread[] = [], knots: Knot[] = [];
    rects.forEach((r, i) => {
      const cx = r.left - box.left + r.width / 2, ty = r.top - box.top;
      const c = COLORS[i];
      // Left warp: enters high on the left edge, runs behind the headline, then drops onto the card.
      const yl = ty * (.2 + i * .1);
      threads.push({ i, c, side: 'l', d: `M-40 ${yl.toFixed(1)} C${(W * .46).toFixed(1)} ${(yl + 10).toFixed(1)} ${cx.toFixed(1)} ${(ty - (ty - yl) * .7).toFixed(1)} ${cx.toFixed(1)} ${ty.toFixed(1)}` });
      // Right warp: the mirror thread from the right edge, lighter.
      const yr = ty * (.48 - i * .1);
      threads.push({ i, c, side: 'r', d: `M${W + 40} ${yr.toFixed(1)} C${(W * .56).toFixed(1)} ${(yr - 6).toFixed(1)} ${cx.toFixed(1)} ${(ty - (ty - yr) * .75).toFixed(1)} ${cx.toFixed(1)} ${ty.toFixed(1)}` });
      knots.push({ x: cx, y: ty, c, i });
    });
    this.threads.set(threads); this.knots.set(knots);
  }
}
