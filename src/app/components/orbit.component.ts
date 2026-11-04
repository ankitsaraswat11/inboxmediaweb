import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, NgZone, OnDestroy, inject, signal } from '@angular/core';

/**
 * Ecosystem orbs: six glassy spheres (the parts of an enterprise stack) whose
 * threads converge into one bundle at the bottom, leading into the lifecycle timeline.
 * Orbs float, follow the pointer with depth parallax, and light up their thread on hover.
 */
interface Orb { label: string; x: number; y: number; hue: string; depth: number; }

@Component({
  selector: 'app-orbit',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<div class="stage" (pointermove)="move($event)" (pointerleave)="reset()">
  <svg class="th" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true">
    @for (o of orbs; track o.label; let i = $index) {
      <path class="t" [class.on]="hot() === i" [attr.d]="path(o, i)"/>
      <path class="f" [class.on]="hot() === i" [attr.d]="path(o, i)" [style.animation-delay]="(-i * .6) + 's'"/>
    }
  </svg>
  @for (o of orbs; track o.label; let i = $index) {
    <button type="button" class="orb" [class.on]="hot() === i" [style.left.%]="o.x / 10" [style.top.%]="o.y / 10" [style.--h]="o.hue" [style.--z]="o.depth" [style.--k]="i"
            (mouseenter)="hot.set(i)" (focus)="hot.set(i)" (mouseleave)="hot.set(-1)" (blur)="hot.set(-1)" [attr.aria-label]="o.label">
      <span class="tag">{{ o.label }}</span>
      <i class="ball"><i class="sh"></i></i>
    </button>
  }
</div>`,
  styles: [`
:host{display:block}
.stage{position:relative;width:100%;aspect-ratio:1/1.02;max-height:720px;--mx:0;--my:0}
.th{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
.th path{fill:none;vector-effect:non-scaling-stroke;stroke-linecap:round}
.t{stroke:color-mix(in srgb,var(--fg) 16%,transparent);stroke-width:2;transition:stroke .4s,stroke-width .4s}
.t.on{stroke:color-mix(in srgb,var(--primary) 70%,transparent);stroke-width:3}
.f{stroke:var(--primary);stroke-width:3;stroke-dasharray:2 22;opacity:.0;animation:dash 2.2s linear infinite;transition:opacity .4s}
.f.on{opacity:1}
:host:hover .f{opacity:.35}
:host:hover .f.on{opacity:1}
@keyframes dash{to{stroke-dashoffset:-48}}
.orb{position:absolute;display:grid;justify-items:center;gap:22px;transform:translate(-50%,-50%) translate3d(calc(var(--mx) * var(--z) * 26px),calc(var(--my) * var(--z) * 18px),0);transition:transform .9s var(--ease-out);background:none;border:0;padding:0;cursor:pointer;font:inherit;color:inherit}
.orb .tag{transition:transform .4s var(--ease),border-color .4s,color .4s}
.orb.on .tag{transform:translateY(-4px);border-color:color-mix(in srgb,var(--primary) 40%,transparent);color:var(--fg)}
.ball{position:relative;display:block;width:clamp(54px,6.4vw,74px);aspect-ratio:1;border-radius:50%;animation:bob 6s ease-in-out infinite;animation-delay:calc(var(--k) * -1.1s);
  background:radial-gradient(circle at 32% 28%,rgba(255,255,255,.95),rgba(255,255,255,0) 32%),radial-gradient(circle at 70% 75%,hsl(calc(var(--h) + 60) 85% 60% / .9),transparent 55%),radial-gradient(circle at 30% 70%,hsl(var(--h) 80% 55% / .95),transparent 60%),radial-gradient(circle,hsl(calc(var(--h) + 140) 70% 70%),hsl(var(--h) 60% 50%));
  box-shadow:inset -6px -8px 18px rgba(20,26,82,.25),0 18px 30px -12px hsl(var(--h) 60% 40% / .5);transition:transform .5s var(--ease)}
.orb.on .ball{transform:scale(1.14)}
.sh{position:absolute;right:62%;top:58%;width:160%;height:26%;border-radius:50%;background:radial-gradient(closest-side,rgba(20,26,82,.22),transparent);filter:blur(6px);z-index:-1}
@keyframes bob{50%{translate:0 -10px}}
@media(prefers-reduced-motion:reduce){.ball,.f{animation:none}}
`]
})
export class OrbitComponent implements AfterViewInit, OnDestroy {
  orbs: Orb[] = [
    { label: 'Channels', x: 110, y: 640, hue: '150', depth: .6 },
    { label: 'Voice', x: 220, y: 420, hue: '200', depth: .9 },
    { label: 'AI agents', x: 390, y: 230, hue: '190', depth: 1.2 },
    { label: 'Data', x: 610, y: 230, hue: '170', depth: 1.1 },
    { label: 'CRM & ERP', x: 780, y: 420, hue: '260', depth: .8 },
    { label: 'Cloud', x: 890, y: 640, hue: '340', depth: .6 }
  ];
  hot = signal(-1);
  private el = inject(ElementRef<HTMLElement>);
  private zone = inject(NgZone);
  private timer?: ReturnType<typeof setInterval>;
  /** Curved thread from below an orb to its slot in the bundle at the bottom centre. */
  path(o: Orb, i: number) {
    const sx = o.x, sy = o.y + 70, ex = 440 + i * 24, ey = 1060;
    return `M${sx} ${sy} C${sx} ${sy + 220} ${ex} ${ey - 300} ${ex} ${ey}`;
  }
  move(e: PointerEvent) {
    const s = (e.currentTarget as HTMLElement); const r = s.getBoundingClientRect();
    s.style.setProperty('--mx', (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
    s.style.setProperty('--my', (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
  }
  reset() { const s = this.el.nativeElement.querySelector('.stage') as HTMLElement; s?.style.setProperty('--mx', '0'); s?.style.setProperty('--my', '0'); }
  /** Gently cycles the highlighted thread while nobody is hovering, so the diagram reads as "live". */
  ngAfterViewInit() {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let k = 0, idle = true;
    const st = this.el.nativeElement as HTMLElement;
    st.addEventListener('pointerenter', () => idle = false); st.addEventListener('pointerleave', () => idle = true);
    this.zone.runOutsideAngular(() => { this.timer = setInterval(() => { if (idle && !document.hidden) this.zone.run(() => this.hot.set(k++ % 6)); }, 1600); });
  }
  ngOnDestroy() { clearInterval(this.timer); }
}
