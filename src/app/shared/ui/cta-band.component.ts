import { Component, input } from '@angular/core';
import { CurvesComponent } from './curves.component';
import { CycleWordComponent, STAYS_SAFE } from './cycle-word.component';
import { Cta } from './page-hero.component';

/** Closing call to action used at the foot of every page: "Make sure your AI stays safe." */
@Component({
  selector: 'app-cta-band',
  standalone: true,
  imports: [CurvesComponent, CycleWordComponent],
  template: `
    <section class="closing">
      <app-curves class="closing__art" [cx]="500" [cy]="500" [start]="120" [step]="58" [count]="7" />
      <div class="wrap closing__in">
        <h2>{{ prefix() }} <app-cycle-word [words]="safe" />.</h2>
        <p class="lead">{{ lead() }}</p>
        <div class="btn-row">
          <a class="btn btn--primary" [href]="primary().u">{{ primary().x }}</a>
          @if (secondary(); as s) { <a class="btn btn--ghost" [href]="s.u">{{ s.x }}</a> }
        </div>
      </div>
    </section>
  `,
})
export class CtaBandComponent {
  readonly prefix = input('Make sure your AI');
  readonly lead = input('Talk to the specialists who design, test and govern AI systems for India’s regulated sectors.');
  readonly primary = input<Cta>({ x: 'Talk to us', u: '/contact' });
  readonly secondary = input<Cta | null>(null);
  readonly safe = STAYS_SAFE;
}
