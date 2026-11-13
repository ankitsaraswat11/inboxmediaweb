import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, NgZone, OnDestroy, inject } from '@angular/core';

/**
 * Iridescent ribbon: the decorative light-ribbon that sweeps through hero, feature and CTA sections.
 * Pure SVG (gradient strokes + blur), drifting slowly, with light scroll parallax.
 * Decorative only: aria-hidden, pointer-events none.
 */
@Component({
  selector: 'app-ribbon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true', '[class]': '"rb rb-" + variant + (lite ? " lite" : "")' },
  template: `
<div class="par"><div class="drift"><svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient [attr.id]="id + 'g'" x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox">
      <stop offset="0" stop-color="#FFE07A"/><stop offset=".22" stop-color="#FF9BC9"/><stop offset=".48" stop-color="#A27BFF"/>
      <stop offset=".72" stop-color="#5FB8FF"/><stop offset=".9" stop-color="#C6F6FF"/><stop offset="1" stop-color="#FFFFFF"/>
    </linearGradient>
    <linearGradient [attr.id]="id + 'h'" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".95"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
    <filter [attr.id]="id + 'b'" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="26"/></filter>
    <filter [attr.id]="id + 's'" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="5"/></filter>
    <filter [attr.id]="id + 'w'" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="70"/></filter>
  </defs>
  <g>
    @switch (variant) {
      @case ('hero') {
        <g>
          @if (!lite) {
            <ellipse cx="240" cy="930" rx="520" ry="200" fill="#FFE07A" opacity=".35" [attr.filter]="u('w')"/>
            <ellipse cx="620" cy="1000" rx="420" ry="160" fill="#FF9BC9" opacity=".28" [attr.filter]="u('w')"/>
          }
          <path d="M-120 720C380 770 980 700 1720 60" [attr.stroke]="u('g')" stroke-width="150" fill="none" opacity=".55" [attr.filter]="u('b')"/>
          <path d="M-120 700C380 750 980 680 1720 40" [attr.stroke]="u('g')" stroke-width="34" fill="none" opacity=".9" [attr.filter]="u('s')"/>
          <path d="M-120 694C380 744 980 674 1720 34" [attr.stroke]="u('h')" stroke-width="5" fill="none"/>
          <path d="M-120 742C380 792 990 724 1720 84" stroke="#9FB2FF" stroke-width="1.4" fill="none" opacity=".7"/>
          <path d="M-120 760C380 810 1000 744 1720 104" stroke="#D7C9FF" stroke-width="1" fill="none" opacity=".6"/>
          <path d="M1210 -80C1640 180 1700 640 1300 1080" [attr.stroke]="u('g')" stroke-width="90" fill="none" opacity=".35" [attr.filter]="u('b')"/>
          <path d="M1230 -80C1660 180 1720 640 1320 1080" stroke="#B9C6FF" stroke-width="1.6" fill="none" opacity=".8"/>
          <path d="M1250 -80C1680 180 1740 640 1340 1080" stroke="#E2D8FF" stroke-width="1" fill="none" opacity=".7"/>
          <path d="M1190 -80C1620 180 1680 640 1280 1080" [attr.stroke]="u('h')" stroke-width="3" fill="none" opacity=".8"/>
        </g>
      }
      @case ('band') {
        <g>
          <path d="M520 -60C760 120 1100 150 1700 -40" [attr.stroke]="u('g')" stroke-width="160" fill="none" opacity=".55" [attr.filter]="u('b')"/>
          <path d="M520 -80C780 110 1120 130 1700 -60" [attr.stroke]="u('g')" stroke-width="26" fill="none" opacity=".9" [attr.filter]="u('s')"/>
          <path d="M900 -100C1100 160 1300 260 1700 120" [attr.stroke]="u('g')" stroke-width="60" fill="none" opacity=".45" [attr.filter]="u('b')"/>
          <path d="M880 -100C1080 170 1290 280 1700 140" [attr.stroke]="u('h')" stroke-width="3" fill="none"/>
        </g>
      }
      @default {
        <g>
          <path d="M-100 1080C300 700 700 640 1700 760" [attr.stroke]="u('g')" stroke-width="180" fill="none" opacity=".5" [attr.filter]="u('b')"/>
          <path d="M-100 1060C320 690 720 620 1700 740" [attr.stroke]="u('g')" stroke-width="22" fill="none" opacity=".8" [attr.filter]="u('s')"/>
          <path d="M400 -80C700 200 1100 260 1700 -60" [attr.stroke]="u('g')" stroke-width="120" fill="none" opacity=".45" [attr.filter]="u('b')"/>
          <path d="M-100 1040C340 676 740 604 1700 724" [attr.stroke]="u('h')" stroke-width="3" fill="none"/>
        </g>
      }
    }
  </g>
</svg></div></div>`,
  styles: [`
:host{position:absolute;inset:0;z-index:-1;pointer-events:none;overflow:hidden;contain:strict}
/* Performance: the blurred SVG is painted once and then only moved as a GPU layer.
   Drift and parallax are transforms on HTML wrappers (composited), not on SVG groups
   (which forced the heavy gaussian blurs to be repainted every animation frame). */
.par{position:absolute;inset:0;transform:translate3d(0,var(--py,0px),0);transition:transform .1s linear;will-change:transform}
.drift{position:absolute;inset:-28px;transform-origin:50% 50%;animation:drift 22s ease-in-out infinite alternate;will-change:transform}
:host(.idle) .drift{animation-play-state:paused}
svg{width:100%;height:100%;display:block}
@keyframes drift{0%{transform:translate(0,0) rotate(0)}50%{transform:translate(-18px,10px) rotate(-.8deg)}100%{transform:translate(14px,-12px) rotate(.6deg)}}
:host-context([data-theme="dark"]) svg{opacity:.85}
/* Lite mode (phones, tablets, touch screens): the ribbon is painted once and left still.
   No drift animation, no scroll parallax and no promoted layers, which saves GPU memory and
   keeps the main thread free while scrolling. The two huge stdDeviation=70 glows of the hero
   are swapped for equivalent CSS radial gradients, which cost almost nothing to paint. */
:host(.lite) .par,:host(.lite) .drift{transform:none;transition:none;animation:none;will-change:auto}
:host(.lite.rb-hero)::before{content:"";position:absolute;inset:0;background:radial-gradient(70% 22% at 8% 100%,rgba(255,155,201,.30),transparent 70%),radial-gradient(60% 26% at 0% 94%,rgba(255,224,122,.34),transparent 70%)}
`]
})
export class RibbonComponent implements AfterViewInit, OnDestroy {
  @Input() variant: 'hero' | 'band' | 'cta' = 'hero';
  /** Parallax strength: px of travel per viewport of scroll. */
  @Input() parallax = 60;
  private static n = 0;
  id = 'rb' + (RibbonComponent.n++);
  /** Small or touch screens get a static, cheaper ribbon (see styles). */
  lite = typeof matchMedia !== 'undefined' && matchMedia('(max-width: 900px), (pointer: coarse)').matches;
  private el = inject(ElementRef<HTMLElement>);
  private zone = inject(NgZone);
  private off?: () => void;
  u(k: string) { return `url(#${this.id}${k})`; }
  ngAfterViewInit() {
    if (typeof window === 'undefined' || this.lite || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const host = this.el.nativeElement as HTMLElement;
    this.zone.runOutsideAngular(() => {
      let raf = 0, visible = false;
      const tick = () => {
        raf = 0;
        const r = host.getBoundingClientRect();
        const p = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
        host.style.setProperty('--py', (p * this.parallax).toFixed(1) + 'px');
      };
      // only listen to scroll (and run the drift animation) while the ribbon is on screen
      const on = () => { if (visible && !raf) raf = requestAnimationFrame(tick); };
      const io = new IntersectionObserver(([e]) => {
        visible = e.isIntersecting;
        host.classList.toggle('idle', !visible);
        if (visible) on();
      });
      io.observe(host);
      addEventListener('scroll', on, { passive: true });
      this.off = () => { io.disconnect(); removeEventListener('scroll', on); cancelAnimationFrame(raf); };
    });
  }
  ngOnDestroy() { this.off?.(); }
}
