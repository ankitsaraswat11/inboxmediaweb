import { Component, input } from '@angular/core';
import { CurvesComponent } from './curves.component';
import { IconComponent } from './icon.component';

export interface Crumb { x: string; u?: string }
export interface Cta { x: string; u: string }

/** Light inner-page hero: breadcrumb, two-line title, lead, actions and an optional photo. */
@Component({
  selector: 'app-page-hero',
  standalone: true,
  imports: [CurvesComponent, IconComponent],
  template: `
    <section class="phero">
      <app-curves class="phero__art" [cx]="640" [cy]="420" [draw]="true" />
      <div class="wrap phero__in" [class.phero__in--img]="!!img()">
        <div class="phero__copy">
          <nav class="crumbs" aria-label="Breadcrumb">
            <a href="/">Home</a>
            @for (c of crumbs(); track c.x) {
              <span aria-hidden="true">/</span>
              @if (c.u) { <a [href]="c.u">{{ c.x }}</a> } @else { <span aria-current="page">{{ c.x }}</span> }
            }
          </nav>
          @if (label()) {
            <p class="phero__label">@if (icon()) { <span class="phero__label-ic"><app-icon [name]="icon()" [size]="22" /></span> }{{ label() }}</p>
          }
          <h1>{{ title() }} @if (sub()) { <span class="phero__sub">{{ sub() }}</span> }</h1>
          @if (lead()) { <p class="lead">{{ lead() }}</p> }
          @if (primary(); as p) {
            <div class="btn-row">
              <a class="btn btn--primary" [href]="p.u">{{ p.x }}</a>
              @if (secondary(); as s) { <a class="btn btn--ghost" [href]="s.u">{{ s.x }}</a> }
            </div>
          }
          <ng-content />
        </div>
        @if (img()) {
          <figure class="phero__media"><img [src]="'/images/' + img()" [alt]="alt()" width="960" height="768" fetchpriority="high"></figure>
        }
      </div>
    </section>
  `,
})
export class PageHeroComponent {
  readonly crumbs = input<Crumb[]>([]);
  readonly label = input('');
  readonly icon = input('');
  readonly title = input.required<string>();
  readonly sub = input('');
  readonly lead = input('');
  readonly img = input('');
  readonly alt = input('');
  readonly primary = input<Cta | null>(null);
  readonly secondary = input<Cta | null>(null);
}
