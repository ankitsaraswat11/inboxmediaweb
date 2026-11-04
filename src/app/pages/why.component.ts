import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, ViewChild, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TIMELINE } from '../data';
import { RevealDirective } from '../components/reveal.directive';

/**
 * Company journey as a movable horizontal timeline:
 * drag the cards (mouse or touch), drag the scrubber, use the arrows or the keyboard.
 */
@Component({
  standalone: true,
  imports: [RouterLink, RevealDirective],
  template: `
<section class="s page-hero"><div class="wrap"><p class="eyebrow">Company journey</p><h1>Why Inbox Media</h1><p class="lead">A company story told through the evolution of communication, platforms and AI. Milestones should be confirmed before public release.</p></div></section>

<section class="jr ruled">
  <div class="wrap jr-h">
    <h2 reveal>From telecom infrastructure to <b>enterprise AI.</b></h2>
    <div class="tl-nav">
      <button type="button" (click)="step(-1)" [disabled]="at() <= 0" aria-label="Previous milestone"><svg viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg></button>
      <button type="button" (click)="step(1)" [disabled]="at() >= 1" aria-label="Next milestone"><svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg></button>
    </div>
  </div>

  <div class="sc" #sc tabindex="0" role="region" aria-label="Company timeline, scroll horizontally" (pointerdown)="grab($event)" (keydown)="key($event)">
    <ol class="tl-row">
      @for (m of items; track m.name; let i = $index) {
        <li class="m" [class.on]="i === cur()" [style.--k]="i">
          <span class="yr">{{ year(m.name) }}</span>
          <span class="pin"><i></i></span>
          <div class="cd">
            <span class="no">0{{ i + 1 }}</span>
            <h3>{{ phase(m.name) }}</h3>
            <p>{{ m.text }}</p>
          </div>
        </li>
      }
      <li class="m end">
        <span class="yr">Next</span><span class="pin"><i></i></span>
        <div class="cd cta"><h3>Your chapter</h3><p>See what SUTRA, MEDHA and KAVACH could do for your organisation.</p><a class="btn" routerLink="/contact" [queryParams]="{type:'demo'}">Book a demo</a></div>
      </li>
    </ol>
  </div>

  <div class="wrap">
    <div class="scrub" #scrub (pointerdown)="scrubDown($event)" role="slider" tabindex="0" aria-label="Timeline position" [attr.aria-valuenow]="round(at() * 100)" aria-valuemin="0" aria-valuemax="100" (keydown)="key($event)">
      <span class="fill" [style.width.%]="at() * 100"></span>
      <span class="thumb" [style.left.%]="at() * 100"></span>
    </div>
    <p class="note">Please verify milestone dates and descriptions with the business owner before publishing them as historical facts.</p>
  </div>
</section>`,
  styles: [`
.jr{padding:clamp(64px,9vw,120px) 0;overflow:hidden}
.jr-h{display:flex;justify-content:space-between;align-items:end;gap:2rem;margin-bottom:clamp(2rem,4vw,3.5rem)}
.jr-h h2{margin:0;max-width:16ch}
.tl-nav{display:flex;gap:.6rem}
.tl-nav button{width:52px;height:52px;border-radius:50%;border:1px solid var(--border-strong);background:var(--surface);color:var(--fg);display:grid;place-items:center;cursor:pointer;transition:all .25s}
.tl-nav button:hover:not([disabled]){border-color:var(--primary);color:var(--primary);transform:scale(1.06)}
.tl-nav button[disabled]{opacity:.35;cursor:default}
.tl-nav svg{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.sc{overflow-x:auto;scrollbar-width:none;cursor:grab;outline:none;scroll-behavior:smooth;padding:0 max(var(--gut),calc((100vw - 1240px) / 2))}
.sc::-webkit-scrollbar{display:none}
.sc.drag{cursor:grabbing;scroll-behavior:auto;user-select:none}
.tl-row{display:flex;list-style:none;margin:0;padding:0 0 1rem;width:max-content;position:relative}
.tl-row::before{content:"";position:absolute;left:0;right:0;top:calc(clamp(2.6rem,4.4vw,4rem) + 1.6rem);height:2px;background:linear-gradient(90deg,var(--primary),var(--violet),var(--kavach),var(--border-strong))}
.m{position:relative;width:clamp(290px,30vw,400px);padding-right:clamp(1.2rem,2.4vw,2rem);display:grid;align-content:start}
.yr{font:400 clamp(2.6rem,4.4vw,4rem)/1 var(--font-serif);white-space:nowrap;color:color-mix(in srgb,var(--fg) 14%,transparent);transition:color .6s var(--ease)}
.m.on .yr,.m:hover .yr{color:var(--fg)}
.pin{position:relative;height:3.2rem}
.pin i{position:absolute;left:2px;top:calc(1.6rem - 8px);width:16px;height:16px;border-radius:50%;background:var(--surface);border:3px solid var(--primary);transition:transform .4s var(--ease),box-shadow .4s}
.m.on .pin i{transform:scale(1.3);box-shadow:0 0 0 8px color-mix(in srgb,var(--primary) 16%,transparent);background:var(--accent);border-color:var(--accent)}
.cd{padding:1.6rem;border-radius:18px;background:var(--surface);border:1px solid var(--border);box-shadow:var(--shadow);transition:transform .5s var(--ease),box-shadow .5s,border-color .4s;min-height:260px}
.m.on .cd{transform:translateY(-6px);box-shadow:var(--shadow-lg);border-color:color-mix(in srgb,var(--primary) 30%,var(--border))}
.no{font:600 .76rem var(--font-body);letter-spacing:.16em;color:var(--primary)}
.cd h3{font:400 1.7rem/1.15 var(--font-serif);margin:.5rem 0 .8rem}
.cd p{margin:0;font-size:.98rem}
.cta{background:var(--card-grad);border:0}
.cta h3,.cta p{color:#fff}.cta p{opacity:.8;margin-bottom:1.4rem}
.cta .btn{background:#fff;color:#141A52}
.scrub{position:relative;height:28px;margin-top:2rem;cursor:pointer;touch-action:none}
.scrub::before,.fill{content:"";position:absolute;left:0;top:50%;height:3px;margin-top:-1.5px;border-radius:3px}
.scrub::before{right:0;background:var(--border)}
.fill{background:linear-gradient(90deg,var(--primary),var(--violet))}
.thumb{position:absolute;top:50%;width:22px;height:22px;margin:-11px 0 0 -11px;border-radius:50%;background:var(--accent);box-shadow:0 0 0 6px color-mix(in srgb,var(--accent) 20%,transparent);cursor:grab}
.note{margin-top:1.5rem}
@media(max-width:700px){.jr-h{flex-direction:column;align-items:start}}
`]
})
export class WhyComponent implements AfterViewInit, OnDestroy {
  items = TIMELINE;
  at = signal(0);
  cur = signal(0);
  round = Math.round;
  @ViewChild('sc') sc!: ElementRef<HTMLElement>;
  @ViewChild('scrub') scrub!: ElementRef<HTMLElement>;
  private zone = inject(NgZone);
  private off?: () => void;

  year(n: string) { return n.split(':')[0].replace(' to Present', '+').replace(' to ', '–'); }
  phase(n: string) { return n.split(':')[1]?.trim() || n; }

  ngAfterViewInit() {
    const el = this.sc.nativeElement;
    const on = () => {
      const max = el.scrollWidth - el.clientWidth;
      const a = max > 0 ? el.scrollLeft / max : 0;
      const cards = Array.from(el.querySelectorAll<HTMLElement>('.m:not(.end)'));
      const mid = el.getBoundingClientRect().left + parseFloat(getComputedStyle(el).paddingLeft) + (a > .98 ? el.clientWidth * .5 : 0);
      let best = 0, bd = Infinity;
      cards.forEach((c, i) => { const d = Math.abs(c.getBoundingClientRect().left - mid); if (d < bd) { bd = d; best = i; } });
      this.zone.run(() => { this.at.set(a); this.cur.set(best); });
    };
    this.zone.runOutsideAngular(() => { el.addEventListener('scroll', on, { passive: true }); addEventListener('resize', on); });
    this.off = () => { el.removeEventListener('scroll', on); removeEventListener('resize', on); };
    on();
  }
  ngOnDestroy() { this.off?.(); }

  step(d: number) {
    const el = this.sc.nativeElement; const card = el.querySelector<HTMLElement>('.m');
    el.scrollBy({ left: d * (card?.offsetWidth || 360), behavior: 'smooth' });
  }
  key(e: KeyboardEvent) {
    if (e.key === 'ArrowRight') { this.step(1); e.preventDefault(); }
    if (e.key === 'ArrowLeft') { this.step(-1); e.preventDefault(); }
  }
  /** Drag the cards with momentum. */
  grab(e: PointerEvent) {
    if (e.pointerType !== 'mouse' || (e.target as HTMLElement).closest('a,button')) return; // touch scrolls natively
    const el = this.sc.nativeElement; const x0 = e.clientX, s0 = el.scrollLeft;
    let lastX = e.clientX, lastT = performance.now(), v = 0;
    el.classList.add('drag'); el.setPointerCapture(e.pointerId);
    const move = (ev: PointerEvent) => {
      const now = performance.now(); v = (ev.clientX - lastX) / Math.max(1, now - lastT); lastX = ev.clientX; lastT = now;
      el.scrollLeft = s0 - (ev.clientX - x0);
    };
    const up = () => {
      el.removeEventListener('pointermove', move); el.removeEventListener('pointerup', up);
      let vel = -v * 16;
      const glide = () => { if (Math.abs(vel) < .5) { el.classList.remove('drag'); return; } el.scrollLeft += vel; vel *= .93; requestAnimationFrame(glide); };
      requestAnimationFrame(glide);
    };
    el.addEventListener('pointermove', move); el.addEventListener('pointerup', up);
  }
  /** Drag the scrubber to move the timeline. */
  scrubDown(e: PointerEvent) {
    const bar = this.scrub.nativeElement, el = this.sc.nativeElement;
    bar.setPointerCapture(e.pointerId);
    const move = (ev: PointerEvent) => {
      const r = bar.getBoundingClientRect(); const x = Math.min(1, Math.max(0, (ev.clientX - r.left) / r.width));
      el.classList.add('drag'); el.scrollLeft = x * (el.scrollWidth - el.clientWidth);
    };
    const up = () => { el.classList.remove('drag'); bar.removeEventListener('pointermove', move); bar.removeEventListener('pointerup', up); };
    bar.addEventListener('pointermove', move); bar.addEventListener('pointerup', up); move(e);
  }
}
