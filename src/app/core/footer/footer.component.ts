import { Component } from '@angular/core';
import { COMPANY, FOOT } from '../data/data';
import { LogoComponent } from '../header/header.component';
import { IconComponent } from '../../shared/ui/icon.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [LogoComponent, IconComponent],
  template: `
<footer class="foot">
  <div class="wrap">
    <div class="foot__top">
      <div class="foot__brand">
        <a class="brand" href="/" [attr.aria-label]="company.name + ' home'">
          <app-logo />
          <span><span class="brand__name">{{ company.name }}</span><span class="brand__sub">{{ company.tagline }}</span></span>
        </a>
        <p>{{ company.about }}</p>
        <div class="foot__contact">
          @if (company.address) { <span>{{ company.address }}</span> }
          @for (e of company.emails; track e) { <a [href]="'mailto:' + e">{{ e }}</a> }
          @if (company.linkedin) {
            <a [href]="company.linkedin" target="_blank" rel="noopener" aria-label="LinkedIn"><app-icon name="linkedin" [size]="22" /></a>
          }
          <a href="/contact">Talk to an expert</a>
        </div>
      </div>
      <div class="foot__cols">
        @for (c of cols; track c.t) {
          <div><h4>{{ c.t }}</h4>@for (l of c.l; track l.u) { <a [href]="l.u">{{ l.x }}</a> }</div>
        }
      </div>
    </div>
    <div class="foot__legal">
      <span>All rights reserved © {{ year }} {{ company.legal }}</span>
      <nav aria-label="Legal">
        <a href="/terms">Terms of use</a>
        <a href="/privacy-policy">Privacy policy</a>
        <a href="/cookie-policy">Cookie policy</a>
        <a href="/security">Security</a>
        <a href="/responsible-ai">Responsible AI</a>
      </nav>
    </div>
  </div>
</footer>`,
})
export class FooterComponent {
  readonly cols = FOOT;
  readonly company = COMPANY;
  readonly year = new Date().getFullYear();
}
