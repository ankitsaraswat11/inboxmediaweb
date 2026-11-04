import { AfterViewInit, Directive, ElementRef, Input, OnDestroy } from '@angular/core';

/** Counts a number up from 0 the first time it scrolls into view: `<b [countTo]="2009" [from]="1990"></b>`. */
@Directive({ selector: '[countTo]', standalone: true })
export class CountDirective implements AfterViewInit, OnDestroy {
  @Input() countTo = 0;
  @Input() from = 0;
  @Input() ms = 1600;
  private io?: IntersectionObserver;
  private raf = 0;
  constructor(private el: ElementRef<HTMLElement>) {}
  ngAfterViewInit() {
    const n = this.el.nativeElement;
    n.textContent = String(this.countTo);
    if (typeof IntersectionObserver === 'undefined' || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    n.textContent = String(this.from);
    this.io = new IntersectionObserver(es => {
      if (!es.some(e => e.isIntersecting)) return;
      this.io?.disconnect();
      const t0 = performance.now();
      const step = (t: number) => {
        const k = Math.min(1, (t - t0) / this.ms);
        const e = 1 - Math.pow(1 - k, 4);
        n.textContent = String(Math.round(this.from + (this.countTo - this.from) * e));
        if (k < 1) this.raf = requestAnimationFrame(step);
      };
      this.raf = requestAnimationFrame(step);
    }, { threshold: .4 });
    this.io.observe(n);
  }
  ngOnDestroy() { this.io?.disconnect(); cancelAnimationFrame(this.raf); }
}
