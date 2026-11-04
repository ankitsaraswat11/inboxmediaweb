import { Component, ElementRef, HostListener, computed, inject, input, signal } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { COMPANY, NAV } from '../data/data';
import { IconComponent } from '../../shared/ui/icon.component';

/** Ankit Global mark: a ring with a cut diamond. Colours come from --logo-a / --logo-cut, so it follows the page theme. */
@Component({
  selector: 'app-logo',
  standalone: true,
  host: { style: 'display:inline-flex' },
  template: `
    <svg class="logo" viewBox="0 0 36 36" [attr.width]="size()" [attr.height]="size()" aria-hidden="true">
      <circle class="l-ring" cx="18" cy="18" r="15" fill="none" stroke-width="2.5" />
      <path class="l-gem" d="M18 9.5l8.5 8.5-8.5 8.5-8.5-8.5z" />
      <path class="l-cut" d="M18 14.5l3.5 3.5-3.5 3.5-3.5-3.5z" />
    </svg>
  `,
})
export class LogoComponent {
  readonly size = input(36);
}

// Which top-level menu is underlined for the current page
const SECTION: Record<string, string> = {
  'ai': 'Services', 'ai-security': 'Services', 'cybersecurity': 'Services', 'security': 'Services',
  'digital-trust': 'Services', 'dpdp-compliance': 'Services',
  'products-curaos': 'Products', 'products-study24by7': 'Products', 'trust-seal': 'Products',
  'solutions': 'Solutions',
  'insights': 'Resources', 'whitepapers': 'Resources', 'dpdp-gap-assessment': 'Resources', 'dpdp-enforcement-tracker': 'Resources',
  'about': 'Company', 'contact': 'Company', 'responsible-ai': 'Company', 'book-a-demo': 'Company',
};

const HOVER_OPEN_MS = 70;
const HOVER_CLOSE_MS = 160;

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LogoComponent, IconComponent],
  template: `
<header class="nav" [class.scrolled]="scrolled()" [class.menu-open]="open()" [class.has-open]="openIdx() >= 0">
  <div class="wrap nav__row">
    <a class="brand" href="/" [attr.aria-label]="company.name + ' home'">
      <app-logo />
      <span><span class="brand__name">{{ company.name }}</span><span class="brand__sub">{{ company.tagline }}</span></span>
    </a>

    <nav class="menu" aria-label="Main">
      @for (m of nav; track m.t; let i = $index) {
        <div class="menu__item" [class.active]="m.t === current()" [class.open]="openIdx() === i"
             (pointerenter)="hoverIn(i, $event)" (pointerleave)="hoverOut(i, $event)" (focusout)="focusOut(i, $event)">
          <button type="button" class="menu__top" [id]="'menu-btn-' + i" [attr.aria-expanded]="openIdx() === i" [attr.aria-controls]="'mega-' + i"
                  (click)="toggle(i)">{{ m.t }} <app-icon class="chev" name="chev" [size]="12" [weight]="2" /></button>
          <div class="mega" [id]="'mega-' + i" (click)="panelClick($event)">
            <div class="wrap mega__in" [class.mega__in--wide]="!m.f">
              @if (m.f; as f) {
                <a class="mega__feat" [href]="f.u">
                  <img [src]="'/images/' + f.img" [alt]="f.alt" loading="lazy" width="600" height="375">
                  <b>{{ f.title }}</b>
                  <span>{{ f.text }}</span>
                  <span class="tlink">{{ f.cta }}</span>
                </a>
              }
              <div class="mega__groups">
                @for (g of m.g; track g.n) {
                  <div class="mega__group">
                    @if (g.h) { <a class="mega__h" [href]="g.h">{{ g.n }}</a> } @else { <p class="mega__h">{{ g.n }}</p> }
                    @for (l of g.l; track l.u + l.x) {
                      <a class="mega__link" [class.mega__link--rich]="!!l.d" [href]="l.u"><b>{{ l.x }}</b>@if (l.d) { <small>{{ l.d }}</small> }</a>
                    }
                  </div>
                }
                @if (m.h) {
                  <div class="mega__group"><p class="mega__h">Overview</p><a class="mega__link" [href]="m.h"><b>{{ m.t }} overview</b></a></div>
                }
              </div>
            </div>
          </div>
        </div>
      }
    </nav>

    <a class="btn btn--primary nav__cta" href="/book-a-demo">Book a demo</a>
    <button class="burger" type="button" [class.open]="open()" (click)="toggleMobile()" [attr.aria-expanded]="open()"
            aria-controls="mobile-navigation" [attr.aria-label]="open() ? 'Close menu' : 'Open menu'"><span></span><span></span><span></span></button>
  </div>

  <div id="mobile-navigation" class="mnav" [class.show]="open()" [attr.aria-hidden]="!open()" [attr.inert]="open() ? null : ''" (click)="mobileClick($event)">
    <div class="wrap">
      @for (m of nav; track m.t; let k = $index) {
        <button type="button" class="mh" [class.open]="exp() === k" (click)="toggleSection(k)" [attr.aria-expanded]="exp() === k">{{ m.t }} <app-icon class="chev" name="chev" [size]="12" [weight]="2" /></button>
        <div class="mb" [class.open]="exp() === k"><div class="mbi"><div class="mbi__inner">
          @if (m.h) { <a class="mbi__h" [href]="m.h">{{ m.t }} overview</a> }
          @for (g of m.g; track g.n) {
            @if (g.h) { <a class="mbi__h" [href]="g.h">{{ g.n }}</a> } @else { <p class="mbi__h">{{ g.n }}</p> }
            @for (l of g.l; track l.u + l.x) { <a [href]="l.u">{{ l.x }}</a> }
          }
        </div></div></div>
      }
      <a class="btn btn--primary mcta" href="/book-a-demo">Book a demo</a>
    </div>
  </div>
</header>`,
})
export class HeaderComponent {
  private router = inject(Router);
  private host = inject(ElementRef<HTMLElement>);
  readonly nav = NAV;
  readonly company = COMPANY;

  // Zoneless app: everything the template reads lives in signals.
  readonly scrolled = signal(false);
  readonly open = signal(false);   // mobile menu
  readonly exp = signal(-1);       // expanded mobile accordion section
  readonly openIdx = signal(-1);   // open desktop dropdown
  private readonly url = signal(this.router.url);
  readonly current = computed(() => SECTION[this.url().split(/[?#]/)[0].slice(1)] ?? '');

  private timer?: ReturnType<typeof setTimeout>;
  private openedAt = 0;
  /** After a click closes a dropdown, hovering the same item does not reopen it until the pointer leaves. */
  private suppressed = -1;

  constructor() {
    this.router.events.pipe(takeUntilDestroyed()).subscribe((e) => {
      if (e instanceof NavigationStart) this.closeAll();
      if (e instanceof NavigationEnd) { this.url.set(e.urlAfterRedirects); this.closeAll(); }
    });
  }

  // ---------- desktop dropdowns ----------
  hoverIn(i: number, e: PointerEvent) {
    if (e.pointerType !== 'mouse' || this.suppressed === i) return;
    clearTimeout(this.timer);
    // moving across from another open dropdown switches instantly
    const delay = this.openIdx() >= 0 ? 0 : HOVER_OPEN_MS;
    this.timer = setTimeout(() => this.show(i), delay);
  }
  hoverOut(i: number, e: PointerEvent) {
    if (e.pointerType !== 'mouse') return;
    clearTimeout(this.timer);
    if (this.suppressed === i) this.suppressed = -1;
    this.timer = setTimeout(() => { if (this.openIdx() === i) this.openIdx.set(-1); }, HOVER_CLOSE_MS);
  }
  /** Click / tap / Enter on a top-level item toggles its dropdown. */
  toggle(i: number) {
    clearTimeout(this.timer);
    if (this.openIdx() === i) {
      // a click right after hover-open is the same intent ("open it"), not a request to close
      if (Date.now() - this.openedAt < 350) return;
      this.openIdx.set(-1);
      this.suppressed = i;
    } else {
      this.show(i);
    }
  }
  /** Any link used inside a dropdown closes it straight away. */
  panelClick(e: Event) {
    if (!(e.target as Element | null)?.closest('a')) return;
    this.suppressed = this.openIdx();
    this.closeDropdown(true);
  }
  /** Keyboard: tabbing out of an item closes its dropdown. */
  focusOut(i: number, e: FocusEvent) {
    const next = e.relatedTarget as Node | null;
    const item = e.currentTarget as HTMLElement;
    if (next && item.contains(next)) return;
    if (this.openIdx() === i && next) this.openIdx.set(-1);
  }
  private show(i: number) {
    if (this.openIdx() !== i) this.openedAt = Date.now();
    this.openIdx.set(i);
  }
  private closeDropdown(blur = false) {
    clearTimeout(this.timer);
    this.openIdx.set(-1);
    if (blur) {
      const el = document.activeElement as HTMLElement | null;
      if (el && this.host.nativeElement.contains(el)) el.blur();
    }
  }

  // ---------- mobile menu ----------
  toggleMobile() { this.setMobile(!this.open()); this.exp.set(-1); }
  toggleSection(k: number) { this.exp.update((v) => (v === k ? -1 : k)); }
  mobileClick(e: Event) { if ((e.target as Element | null)?.closest('a')) this.closeAll(); }
  private setMobile(v: boolean) {
    this.open.set(v);
    document.body.classList.toggle('nav-locked', v);
  }

  closeAll() {
    this.closeDropdown(true);
    this.setMobile(false);
    this.exp.set(-1);
  }

  // ---------- global listeners ----------
  /** Click or tap anywhere outside the menu closes an open dropdown. */
  @HostListener('document:pointerdown', ['$event']) onDocPointer(e: PointerEvent) {
    const t = e.target as Element | null;
    if (this.openIdx() >= 0 && !t?.closest('.menu')) this.closeDropdown();
  }
  @HostListener('document:keydown.escape') onEsc() {
    const i = this.openIdx();
    if (i >= 0) {
      this.closeDropdown();
      document.getElementById('menu-btn-' + i)?.focus();
    }
    if (this.open()) this.setMobile(false);
  }
  @HostListener('window:scroll') onScroll() { this.scrolled.set(window.scrollY > 8); }
  @HostListener('window:resize') onResize() {
    if (window.innerWidth >= 1024 && this.open()) this.setMobile(false);
    if (window.innerWidth < 1024 && this.openIdx() >= 0) this.openIdx.set(-1);
  }
}
