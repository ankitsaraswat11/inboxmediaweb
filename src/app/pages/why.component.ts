import { Component } from '@angular/core';
import { TIMELINE } from '../data';

@Component({
  standalone: true,
  template: `
    <section class="s dark page-hero"><div class="wrap"><p class="eyebrow">Company journey</p><h1>Why Inbox Media</h1><p class="lead">A company story told through the evolution of communication, platforms and AI. Milestones should be confirmed before public release.</p></div></section>
    <section class="s"><div class="wrap"><ol class="timeline">
      @for (item of milestones; track item.name; let i = $index) {
        <li><span>0{{ i + 1 }}</span><div><h2>{{ item.name }}</h2><p>{{ item.text }}</p></div></li>
      }
    </ol><p class="note">Please verify milestone dates and descriptions with the business owner before publishing them as historical facts.</p></div></section>`,
  styles: [`.timeline{list-style:none;padding:0;margin:0;display:grid;gap:1rem;max-width:900px}.timeline li{display:grid;grid-template-columns:54px 1fr;gap:1rem;padding:1.3rem;border:1px solid var(--line);border-radius:16px;background:#fff}.timeline li>span{display:grid;place-items:center;width:42px;height:42px;border-radius:50%;background:var(--navy);color:#fff;font-weight:700}.timeline h2{font-size:1.25rem}.timeline p{margin:0}`]
})
export class WhyComponent { milestones = TIMELINE; }
