import { Component, DestroyRef, afterNextRender, inject, input, signal } from '@angular/core';

export interface LangWord { text: string; lang: string }

/** "Complete" ⇄ "संपूर्ण" — one word that alternates between English and Hindi only. */
export const COMPLETE: LangWord[] = [
  { text: 'Complete', lang: 'en' },
  { text: 'संपूर्ण', lang: 'hi' },
];

/** "stays safe" in the same languages, for the closing call to action. */
export const STAYS_SAFE: LangWord[] = [
  { text: 'stays safe', lang: 'en' },
  { text: 'सुरक्षित रहे', lang: 'hi' },
];

@Component({
  selector: 'app-cycle-word',
  standalone: true,
  template: `<span class="cycle" aria-hidden="true">@for (w of words(); track w.lang; let k = $index) {@if (k === i()) {<span class="cycle__w" [attr.lang]="w.lang">{{ w.text }}</span>}}</span><span class="sr-only">{{ words()[0].text }}</span>`,
})
export class CycleWordComponent {
  readonly words = input.required<LangWord[]>();
  readonly every = input(2400);
  readonly i = signal(0);

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const t = setInterval(() => this.i.update((n) => (n + 1) % this.words().length), this.every());
      destroyRef.onDestroy(() => clearInterval(t));
    });
  }
}
