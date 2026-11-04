import { Component, EventEmitter, Output, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FINDER_GOALS, INDUSTRIES } from '../data';

/** What the visitor picked in the finder. */
export interface FinderChoice { industry: string; goal: string; }

@Component({
  selector: 'app-solution-finder',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="s finder"><div class="wrap">
      <div class="intro"><p class="eyebrow">Interactive discovery</p><h2>Find a solution for your business challenge</h2><p>Choose your industry and the outcome you want. The finder will suggest a starting point for discussion.</p></div>
      <div class="finder-grid">
        <div class="controls">
          <label>1. Choose your industry
            <select [value]="industry()" (change)="industry.set($any($event.target).value)">
              @for (item of industries; track item.name) { <option [value]="item.name">{{ item.name }}</option> }
            </select>
          </label>
          <label>2. What do you want to improve?
            <select [value]="goal()" (change)="goal.set($any($event.target).value)">
              @for (g of goals; track g.key) { <option [value]="g.key">{{ g.label }}</option> }
            </select>
          </label>
          <p class="hint">This is a guided discovery tool, not an automated technical assessment.</p>
        </div>
        <article class="recommendation band" aria-live="polite">
          <span class="result-label">Your starting point</span>
          <h3>{{ recommendation().title }}</h3>
          <p>{{ recommendation().detail }}</p>
          <div class="suggestions"><b>Explore</b><span>{{ recommendation().services }}</span></div>
          <div class="btns"><button type="button" class="btn" (click)="discussThis()">Discuss this recommendation</button><a class="btn ghost" [routerLink]="recommendation().link">{{ recommendation().linkText }}</a></div>
        </article>
      </div>
    </div></section>`,
  styles: [`.finder{background:var(--bg-alt)}.intro{max-width:760px;margin-bottom:1.6rem}.finder-grid{display:grid;grid-template-columns:minmax(260px,.85fr) minmax(300px,1.15fr);gap:1rem;align-items:stretch}.controls,.recommendation{border:1px solid var(--border);border-radius:var(--r-xl);padding:clamp(1rem,2.5vw,1.6rem);background:var(--surface);box-shadow:var(--shadow)}.controls{display:grid;align-content:start;gap:1.1rem}.controls label{display:grid;gap:.5rem;font-weight:650}.controls select{min-height:48px}.hint{font-size:.82rem;margin:0}.recommendation{background:var(--band-bg);color:var(--band-fg);border-color:transparent}.recommendation h3{color:var(--band-fg);font-size:1.55rem;margin:.7rem 0}.recommendation p{color:var(--band-fg-2)}.result-label{color:var(--sutra-l);font-size:.8rem;font-weight:700}.suggestions{border-top:1px solid var(--band-border);padding-top:.9rem;margin:1rem 0;display:grid;gap:.25rem}.suggestions b{font-size:.8rem;color:var(--sutra-l)}.suggestions span{color:var(--band-fg)}.recommendation .btns{margin-top:.4rem}@media(max-width:760px){.finder-grid{grid-template-columns:1fr}}`]
})
export class SolutionFinderComponent {
  industries = INDUSTRIES; goals = FINDER_GOALS;
  /** Emits the selections. The contact page listens and fills its form; anywhere else the button opens the contact page with them. */
  @Output() discuss = new EventEmitter<FinderChoice>();
  private router = inject(Router);
  industry = signal(INDUSTRIES[0].name);
  goal = signal('communication');
  recommendation = computed(() => {
    const sector = INDUSTRIES.find(x => x.name === this.industry()) ?? INDUSTRIES[0];
    const choices: Record<string, {title:string; detail:string; services:string; link:string; linkText:string}> = {
      communication: {title:'SUTRA: Communication Infrastructure + Omnichannel Engagement', detail:`For ${sector.name}, start by mapping the notifications and customer touchpoints that need to reach people reliably.`, services:'SMS, OTP, RCS, WhatsApp, voice and messaging APIs', link:'/platforms/sutra', linkText:'Explore SUTRA'},
      calls: {title:'SUTRA + MEDHA: Voice & Telephony with Tellco', detail:`For ${sector.name}, review inbound call routing, outbound reminders and lead follow-up opportunities.`, services:'IVR, cloud telephony, toll-free numbers and AI-assisted calling', link:'/platforms/sutra', linkText:'Explore SUTRA'},
      automation: {title:'MEDHA: Conversational AI & Automation', detail:`For ${sector.name}, identify repetitive questions, booking steps and support conversations that could be automated with a clear human handover.`, services:'AI voice agents, chatbots and WhatsApp automation', link:'/platforms/medha', linkText:'Explore MEDHA'},
      systems: {title:'Digital Engineering: applications, APIs and modernisation', detail:`For ${sector.name}, map the systems and data that need to connect before choosing an integration approach.`, services:'Custom applications, APIs, cloud, DevOps and modernisation', link:'/digital-engineering', linkText:'Explore Digital Engineering'},
      governance: {title:'KAVACH: ISO 42001 AI Readiness, with MEDHA Edge AI where data must stay on site', detail:`For ${sector.name}, review AI use, data boundaries, governance needs and whether on-premise processing is relevant.`, services:'AI governance, risk controls and deployment assessment', link:'/platforms/kavach', linkText:'Explore KAVACH'}
    };
    return choices[this.goal()] ?? choices['communication'];
  });
  discussThis() {
    const c: FinderChoice = { industry: this.industry(), goal: this.goal() };
    if (this.discuss.observed) this.discuss.emit(c);
    else this.router.navigate(['/contact'], { queryParams: { type: 'proposal', ...c } });
  }
}
