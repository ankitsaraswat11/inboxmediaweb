import { Component, HostListener, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { FOUNDED, PRODUCTS } from './data';
import { PLATFORMS, TAGLINE } from './content/platforms';
import { ThemeToggleComponent } from './components/theme-toggle.component';
import { ThemeService } from './services/theme.service';

const DESC = 'Inbox Media: an integrated enterprise technology platform for communication, intelligence and digital trust.';
/* White logo from inboxmedia.in. It always sits on the night-coloured header and footer, so no recolouring is needed. */
const ANN_KEY = 'im-ann-dpdp';
function readAnn() { try { return sessionStorage.getItem(ANN_KEY) !== '1'; } catch { return true; } }
const LOGO = 'https://inboxmedia.in/wp-content/themes/wpinboxmedia/images/logo-white.svg';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ThemeToggleComponent],
  template: `
<a class="skip" href="#main" (click)="skip($event)">Skip to content</a>
@if (ann()) {
  <div class="ann" role="region" aria-label="Announcement"><div class="wrap">
    <p><span class="knot" aria-hidden="true"></span>DPDP compliance is built into <b>KAVACH</b>, our trust layer.</p>
    <a routerLink="/platforms/kavach">See what KAVACH covers</a>
    <button type="button" class="x" (click)="closeAnn()" aria-label="Dismiss announcement"><svg viewBox="0 0 14 14" aria-hidden="true"><path d="M2 2l10 10M12 2L2 12"/></svg></button>
  </div></div>
}
<div class="hdr"><header class="nav" [class.sc]="sc()" [class.open]="open()"><div class="wrap row">
  <a routerLink="/" class="brand" aria-label="Inbox Media home">@if (logoOk()) { <img [src]="logo" alt="Inbox Media" height="38" (error)="logoOk.set(false)"> } @else { Inbox Media }</a>
  <nav class="menu" aria-label="Main">
    <div class="dd"><a routerLink="/" routerLinkActive="on" [routerLinkActiveOptions]="{exact:true}">Home</a></div>
    <div class="dd"><a routerLink="/platforms" [class.on]="section() === 'platforms'" aria-haspopup="true">Platforms<svg class="chev" viewBox="0 0 10 10" aria-hidden="true"><path d="M2 3.5l3 3 3-3"/></svg></a>
      <div class="panel mega">
        @for (p of plats; track p.slug) {
          <a class="mcol" [routerLink]="['/platforms', p.slug]" routerLinkActive="on" [style.--c]="'var(--' + p.slug + ')'" [style.--t]="'var(--' + p.slug + '-tint)'">
            <span class="mlay">{{ p.layer }}</span><b>{{ p.name }}</b><span class="mdesc">{{ p.descriptor }}</span><span class="msub">{{ p.summary }}</span>
          </a>
        }
        <div class="mfoot"><span>Also</span><a routerLink="/ai-solutions">AI products</a><a routerLink="/capabilities">All capabilities</a><a routerLink="/digital-engineering">Digital Engineering foundation</a></div>
      </div>
    </div>
    <div class="dd"><a routerLink="/digital-engineering" routerLinkActive="on">Digital Engineering</a></div>
    <div class="dd"><a routerLink="/industries" routerLinkActive="on">Industries</a></div>
    <div class="dd"><a routerLink="/resources" routerLinkActive="on">Resources</a></div>
    <div class="dd"><a routerLink="/about" routerLinkActive="on" aria-haspopup="true">About<svg class="chev" viewBox="0 0 10 10" aria-hidden="true"><path d="M2 3.5l3 3 3-3"/></svg></a>
      <div class="panel">
        <a routerLink="/about" routerLinkActive="on" [routerLinkActiveOptions]="{exact:true}">About Inbox Media<small>The platform and how it fits together</small></a>
        <a routerLink="/about/why-inbox-media" routerLinkActive="on">Why Inbox Media<small>Our journey since {{ founded }}</small></a>
        <a routerLink="/about/certifications" routerLinkActive="on">Certifications<small>ISO standards and verification status</small></a>
      </div>
    </div>
    <div class="dd"><a routerLink="/contact" routerLinkActive="on">Contact</a></div>
  </nav>
  <div class="tools">
    <app-theme-toggle/>
    <a class="btn" routerLink="/contact" [queryParams]="{type:'demo'}">Book a demo</a>
    <button type="button" class="burger" [class.open]="open()" (click)="open.set(!open())" [attr.aria-expanded]="open()" aria-controls="mnav" aria-label="Menu"><span></span><span></span><span></span></button>
  </div></div>
  <nav class="mnav" id="mnav" aria-label="Mobile">
    <a routerLink="/" routerLinkActive="on" [routerLinkActiveOptions]="{exact:true}">Home</a>
    <details [open]="section() === 'platforms'"><summary>Platforms</summary>
      <div class="mplat">@for (p of plats; track p.slug) { <a [routerLink]="['/platforms', p.slug]" [style.--c]="'var(--' + p.slug + ')'" [style.--t]="'var(--' + p.slug + '-tint)'"><b>{{ p.name }}</b><span>{{ p.descriptor }}</span></a> }</div>
      <div class="msubl"><a routerLink="/ai-solutions">AI products</a><a routerLink="/capabilities">All capabilities</a></div>
    </details>
    <a routerLink="/digital-engineering" routerLinkActive="on">Digital Engineering</a>
    <a routerLink="/industries" routerLinkActive="on">Industries</a>
    <a routerLink="/resources" routerLinkActive="on">Resources</a>
    <details><summary>About</summary><div class="msubl"><a routerLink="/about">About Inbox Media</a><a routerLink="/about/why-inbox-media">Why Inbox Media</a><a routerLink="/about/certifications">Certifications</a></div></details>
    <a routerLink="/contact" routerLinkActive="on">Contact</a>
    <a class="btn" routerLink="/contact" [queryParams]="{type:'demo'}">Book a demo</a>
  </nav>
</header></div>
<main id="main" tabindex="-1"><router-outlet/></main>
<footer class="site"><div class="wrap">
  <div class="fg">
    <div>
      <a routerLink="/" class="brand" aria-label="Inbox Media home">@if (logoOk()) { <img [src]="logo" alt="Inbox Media" height="38"> } @else { Inbox Media }</a>
      <p class="ftag">{{ tagline }}</p>
      <p>An integrated enterprise technology platform, serving enterprises across 8+ industries since {{ founded }}.</p>
      <a class="fcta" routerLink="/contact" [queryParams]="{type:'demo'}">Book a demo</a>
    </div>
    <div><h4>Platforms</h4>
      @for (p of plats; track p.slug) { <a [routerLink]="['/platforms', p.slug]"><span class="fmark" [style.--c]="'var(--' + p.slug + ')'">{{ p.name }}</span> {{ p.short }}</a> }
      <a routerLink="/digital-engineering">Digital Engineering</a><a routerLink="/capabilities">All capabilities</a>
    </div>
    <div><h4>AI products</h4>@for (a of products; track a.name) { <a routerLink="/ai-solutions" [queryParams]="{p: a.name}">{{ a.name }}</a> }</div>
    <div><h4>Company</h4><a routerLink="/about">About</a><a routerLink="/about/why-inbox-media">Why Inbox Media</a><a routerLink="/about/certifications">Certifications</a><a routerLink="/industries">Industries</a><a routerLink="/integrations">Integrations</a><a routerLink="/resources">Resources</a></div>
    <div><h4>Our office</h4><p>619-620, Tower B, 6th Floor, Noida One, Sector 62, Noida, Uttar Pradesh 201309, India</p><a href="mailto:info@inboxmedia.in">info&#64;inboxmedia.in</a><a routerLink="/contact">Contact our team</a></div>
  </div>
  <div class="legal"><span>© 2026 Inbox Media Pvt. Ltd. All rights reserved.</span><span class="soc" aria-label="Social media"><a href="https://www.linkedin.com/company/inbox-media-private-limited/" target="_blank" rel="noopener">LinkedIn</a><a href="https://x.com/inboxmedia_in" target="_blank" rel="noopener">X</a><a href="https://www.instagram.com/inboxmedia_in" target="_blank" rel="noopener">Instagram</a><a href="https://www.facebook.com/Inboxmedia.in" target="_blank" rel="noopener">Facebook</a></span></div>
</div></footer>`
})
export class AppComponent {
  plats = PLATFORMS; products = PRODUCTS; logo = LOGO; tagline = TAGLINE; founded = FOUNDED;
  /** Announcement bar: hidden for the rest of the visit once dismissed (per-viewer convenience only). */
  ann = signal(readAnn());
  logoOk = signal(true); sc = signal(false); open = signal(false);
  section = signal('');
  private meta = inject(Meta);
  private theme = inject(ThemeService); // instantiated at startup so the theme applies before any page renders
  constructor(r: Router) {
    r.events.subscribe(e => {
      if (!(e instanceof NavigationEnd)) return;
      this.open.set(false);
      const url = e.urlAfterRedirects.split(/[?#]/)[0];
      this.section.set(url.startsWith('/platforms') || url.startsWith('/ai-solutions') || url.startsWith('/capabilities') ? 'platforms' : '');
      let s = r.routerState.snapshot.root; while (s.firstChild) s = s.firstChild;
      this.meta.updateTag({ name: 'description', content: s.data['description'] || DESC });
      let l = document.querySelector('link[rel=canonical]') as HTMLLinkElement | null;
      if (!l) { l = document.createElement('link'); l.rel = 'canonical'; document.head.appendChild(l); }
      l.href = 'https://inboxmedia.in' + url.replace(/\/$/, '');
    });
  }
  @HostListener('window:scroll') onScroll() { this.sc.set(window.scrollY > 10); }
  @HostListener('document:keydown.escape') onEsc() { this.open.set(false); }
  closeAnn() { this.ann.set(false); try { sessionStorage.setItem(ANN_KEY, '1'); } catch { /* storage unavailable: hides for this page view only */ } }
  skip(e: Event) { e.preventDefault(); const m = document.getElementById('main'); m?.focus(); m?.scrollIntoView(); }
}
