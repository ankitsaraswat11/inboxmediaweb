import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, NgZone, OnDestroy, ViewChild, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { INDUSTRIES } from '../data';

/**
 * Industry carousel: one slide per industry (challenge → outcome).
 * Industry name tabs on top (click to switch), drag/swipe and keyboard arrows; autoplays and pauses on hover or focus.
 * Content comes from the existing INDUSTRIES data, so no client quotes are invented.
 */
const HUES = [230, 280, 200, 320, 25, 170, 250, 300];

@Component({
  selector: 'app-industry-carousel',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<div class="car" role="region" aria-roledescription="carousel" aria-label="Industries" tabindex="0" (keydown)="key($event)"
     (mouseenter)="paused = true" (mouseleave)="paused = false" (focusin)="paused = true" (focusout)="paused = false">
  <div class="tabs" role="tablist" aria-label="Choose an industry">
    @for (x of items; track x.name; let k = $index) {
      <button type="button" role="tab" class="tab" [class.on]="k === i()" [attr.aria-selected]="k === i()" (click)="go(k)">
        {{ x.name }}
        @if (k === i()) { <span class="bar" [style.animation-play-state]="paused ? 'paused' : 'running'"></span> }
      </button>
    }
  </div>
  <div class="vp" #vp (pointerdown)="down($event)">
    <div class="tr" #tr [style.transform]="'translate3d(calc(' + (-i() * 100) + '% + ' + dx() + 'px),0,0)'" [class.drag]="dragging()">
      @for (x of items; track x.name; let k = $index) {
        <article class="sl" [class.on]="k === i()" [attr.aria-hidden]="k !== i()" role="group" aria-roledescription="slide" [attr.aria-label]="(k + 1) + ' of ' + items.length">
          <div class="art" [style.--h]="hues[k % hues.length]">
            <i class="b1"></i><i class="b2"></i><i class="b3"></i>
            <span class="ind">{{ x.name }}</span>
            <h3>{{ x.text }}</h3>
          </div>
          <div class="copy">
            <p class="k">The challenge</p>
            <blockquote>{{ x.why }}</blockquote>
            <p class="k">What changes</p>
            <p class="out">{{ x.benefit }}</p>
            <ul class="chips">@for (u of (x.uses || []).slice(0, 4); track u) { <li class="chip">{{ u }}</li> }</ul>
            <a class="text-link" routerLink="/industries" [tabindex]="k === i() ? 0 : -1">See the {{ x.name }} workflow</a>
          </div>
        </article>
      }
    </div>
  </div>
</div>`,
  styles: [`
:host{display:block}
.car{outline:none}
.vp{overflow:hidden;border-radius:24px;background:var(--surface);border:1px solid var(--border);box-shadow:var(--shadow);touch-action:pan-y;cursor:grab;user-select:none}
.vp:active{cursor:grabbing}
.tr{display:flex;transition:transform .8s var(--ease-out)}
.tr.drag{transition:none}
.sl{flex:0 0 100%;display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:clamp(1.5rem,4vw,4.5rem);padding:clamp(1rem,1.8vw,1.6rem);align-items:center}
.art{position:relative;isolation:isolate;overflow:hidden;min-height:clamp(320px,38vw,520px);border-radius:16px;padding:clamp(1.6rem,3.4vw,3rem);display:grid;align-content:space-between;background:hsl(var(--h) 80% 92%)}
.art i{position:absolute;border-radius:50%;filter:blur(40px);z-index:-1;transition:transform 1.6s var(--ease-out)}
.b1{width:70%;height:70%;left:-10%;top:-10%;background:hsl(var(--h) 90% 75%)}
.b2{width:60%;height:60%;right:-15%;top:20%;background:hsl(calc(var(--h) + 70) 90% 80%)}
.b3{width:60%;height:50%;left:10%;bottom:-20%;background:hsl(calc(var(--h) - 60) 85% 72%)}
.sl.on .b1{transform:translate(10%,8%)}.sl.on .b2{transform:translate(-12%,-6%)}.sl.on .b3{transform:translate(8%,-10%)}
.ind{font:600 clamp(1.3rem,1.6vw,1.55rem) var(--font-body);color:#1B2160}
.art h3{margin:0;font:700 clamp(1.9rem,3vw,2.75rem)/1.16 var(--font-body);letter-spacing:-.02em;color:#141A52;max-width:16ch}
.copy{padding:clamp(.5rem,2vw,1.5rem) clamp(.2rem,2vw,2rem) clamp(.5rem,2vw,1.5rem) 0}
.k{font:600 .9rem var(--font-body);letter-spacing:.16em;text-transform:uppercase;color:var(--fg-3);margin:0 0 .6rem}
blockquote{margin:0 0 2.2rem;font:400 clamp(1.3rem,2vw,1.8rem)/1.5 var(--font-body);color:var(--fg-2)}
blockquote::before{content:"“"}blockquote::after{content:"”"}
.out{font:600 clamp(1.15rem,1.4vw,1.3rem)/1.5 var(--font-body);color:var(--fg);margin:0 0 1.2rem}
.chips{margin-bottom:1.6rem}
.chips .chip{font-size:1rem}
.text-link{font-size:1.15rem}
.tabs{display:flex;flex-wrap:wrap;gap:.6rem;margin:0 0 1.8rem}
.tab{position:relative;overflow:hidden;padding:.75rem 1.35rem;border-radius:999px;border:1px solid var(--border-strong);background:var(--surface);color:var(--fg);font:500 1.05rem var(--font-body);cursor:pointer;transition:background .25s,border-color .25s,color .25s}
.tab:hover{border-color:var(--primary);color:var(--primary)}
.tab.on{background:var(--primary);border-color:var(--primary);color:#fff}
.tab:focus-visible{outline:2px solid var(--primary);outline-offset:3px}
.tab .bar{position:absolute;left:0;bottom:0;height:3px;width:100%;background:rgba(255,255,255,.75);transform-origin:left;animation:fillx 6s linear forwards}
.sl > *{opacity:.35;transition:opacity .6s}
.sl.on > *{opacity:1}
@keyframes fillx{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@media(max-width:820px){.tabs{flex-wrap:nowrap;overflow-x:auto;scrollbar-width:none;margin:0 -16px 1.4rem;padding:0 16px}.tabs::-webkit-scrollbar{display:none}.tab{white-space:nowrap;font-size:.95rem;padding:.6rem 1.1rem}.sl{grid-template-columns:1fr}.art{min-height:260px}.copy{padding:0 .4rem .6rem}}
@media(prefers-reduced-motion:reduce){.tab .bar{animation:none;transform:none}}
`]
})
export class IndustryCarouselComponent implements AfterViewInit, OnDestroy {
  items = INDUSTRIES;
  hues = HUES;
  i = signal(0);
  dx = signal(0);
  dragging = signal(false);
  paused = false;
  @ViewChild('vp') vp!: ElementRef<HTMLElement>;
  private zone = inject(NgZone);
  private timer?: ReturnType<typeof setInterval>;

  go(k: number) { const n = this.items.length; this.i.set((k + n) % n); this.restart(); }
  key(e: KeyboardEvent) {
    if (e.key === 'ArrowRight') { this.go(this.i() + 1); e.preventDefault(); }
    if (e.key === 'ArrowLeft') { this.go(this.i() - 1); e.preventDefault(); }
  }
  down(e: PointerEvent) {
    if ((e.target as HTMLElement).closest('a,button')) return;
    const vp = this.vp.nativeElement; const x0 = e.clientX; const w = vp.offsetWidth;
    vp.setPointerCapture?.(e.pointerId);
    this.dragging.set(true); this.paused = true;
    const move = (ev: PointerEvent) => {
      let d = ev.clientX - x0;
      const atEdge = (this.i() === 0 && d > 0) || (this.i() === this.items.length - 1 && d < 0);
      if (atEdge) d *= .35; // rubber-band at the ends
      this.dx.set(d);
    };
    const up = () => {
      const d = this.dx();
      this.dragging.set(false); this.dx.set(0); this.paused = false;
      if (Math.abs(d) > Math.min(90, w * .12)) this.go(this.i() + (d < 0 ? 1 : -1));
      vp.removeEventListener('pointermove', move); vp.removeEventListener('pointerup', up); vp.removeEventListener('pointercancel', up);
    };
    vp.addEventListener('pointermove', move); vp.addEventListener('pointerup', up); vp.addEventListener('pointercancel', up);
  }
  private restart() {
    clearInterval(this.timer);
    if (typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    this.zone.runOutsideAngular(() => {
      this.timer = setInterval(() => { if (!this.paused && !document.hidden) this.zone.run(() => this.i.set((this.i() + 1) % this.items.length)); }, 6000);
    });
  }
  ngAfterViewInit() { this.restart(); }
  ngOnDestroy() { clearInterval(this.timer); }
}
