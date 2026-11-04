import { AfterViewInit, Directive, ElementRef, Input, OnDestroy } from '@angular/core';

/**
 * Scroll reveal: `<div reveal>` fades/rises into view the first time it enters the viewport.
 * `[reveal]="0.15"` adds a stagger delay in seconds. Falls back to visible when
 * IntersectionObserver is unavailable; reduced-motion users get no transition (see base.css).
 */
@Directive({ selector: '[reveal]', standalone: true })
export class RevealDirective implements AfterViewInit, OnDestroy {
  @Input() reveal: number | string = 0;
  private io?: IntersectionObserver;
  constructor(private el: ElementRef<HTMLElement>) {}
  ngAfterViewInit() {
    const n = this.el.nativeElement;
    const d = Number(this.reveal) || 0;
    if (d) n.style.setProperty('--d', d + 's');
    if (typeof IntersectionObserver === 'undefined') return;
    n.classList.add('rv');
    this.io = new IntersectionObserver(es => {
      for (const e of es) if (e.isIntersecting) { n.classList.add('in'); this.io?.disconnect(); }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    this.io.observe(n);
  }
  ngOnDestroy() { this.io?.disconnect(); }
}
