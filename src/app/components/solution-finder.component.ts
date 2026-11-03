import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { INDUSTRIES } from '../data';

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
              <option value="communication">Customer communication and alerts</option>
              <option value="calls">Voice calls and follow-ups</option>
              <option value="automation">Customer support and conversations</option>
              <option value="systems">Connect or modernise systems</option>
              <option value="governance">AI governance and readiness</option>
            </select>
          </label>
          <p class="hint">This is a guided discovery tool, not an automated technical assessment.</p>
        </div>
        <article class="recommendation" aria-live="polite">
          <span class="result-label">YOUR STARTING POINT</span>
          <h3>{{ recommendation().title }}</h3>
          <p>{{ recommendation().detail }}</p>
          <div class="suggestions"><b>Explore</b><span>{{ recommendation().services }}</span></div>
          <a class="btn" routerLink="/contact" [queryParams]="{type:'proposal'}">Discuss this recommendation</a>
        </article>
      </div>
    </div></section>`,
  styles: [`.finder{background:linear-gradient(135deg,#f8f5ff,#fff 70%)}.intro{max-width:760px;margin-bottom:1.6rem}.finder-grid{display:grid;grid-template-columns:minmax(260px,.85fr) minmax(300px,1.15fr);gap:1rem;align-items:stretch}.controls,.recommendation{border:1px solid var(--line);border-radius:20px;padding:clamp(1rem,2.5vw,1.6rem);background:#fff}.controls{display:grid;align-content:start;gap:1.1rem}.controls label{display:grid;gap:.5rem;font-weight:650}.controls select{font:inherit;min-height:48px;padding:.65rem .8rem;border:1px solid var(--line);border-radius:10px;background:#fff}.hint{font-size:.82rem;margin:0}.recommendation{background:var(--navy);color:#fff}.recommendation h3{color:#fff;font-size:1.55rem;margin:.7rem 0}.recommendation p{color:#e3dcf1}.result-label{color:#ffab91;font-size:.72rem;letter-spacing:.14em;font-weight:800}.suggestions{border-top:1px solid rgba(255,255,255,.2);padding-top:.9rem;margin:1rem 0;display:grid;gap:.25rem}.suggestions b{font-size:.75rem;color:#ffab91;text-transform:uppercase}.suggestions span{color:#fff}@media(max-width:760px){.finder-grid{grid-template-columns:1fr}}`]
})
export class SolutionFinderComponent {
  industries = INDUSTRIES;
  industry = signal(INDUSTRIES[0].name);
  goal = signal('communication');
  recommendation = computed(() => {
    const sector = INDUSTRIES.find(x => x.name === this.industry()) ?? INDUSTRIES[0];
    const choices: Record<string, {title:string; detail:string; services:string}> = {
      communication: {title:'SUTRA: Communication Infrastructure + Omnichannel Engagement', detail:`For ${sector.name}, start by mapping the notifications and customer touchpoints that need to reach people reliably.`, services:'SMS, OTP, RCS, WhatsApp, voice and messaging APIs'},
      calls: {title:'SUTRA + MEDHA: Voice & Telephony with Tellco', detail:`For ${sector.name}, review inbound call routing, outbound reminders and lead follow-up opportunities.`, services:'IVR, cloud telephony, toll-free numbers and AI-assisted calling'},
      automation: {title:'MEDHA: Conversational AI & Automation', detail:`For ${sector.name}, identify repetitive questions, booking steps and support conversations that could be automated with a clear human handover.`, services:'AI voice agents, chatbots and WhatsApp automation'},
      systems: {title:'Digital Engineering & IT Services', detail:`For ${sector.name}, map the systems and data that need to connect before choosing an integration approach.`, services:'Custom applications, APIs, cloud, DevOps and modernisation'},
      governance: {title:'KAVACH: ISO 42001 AI Readiness + Edge AI assessment', detail:`For ${sector.name}, review AI use, data boundaries, governance needs and whether on-premise processing is relevant.`, services:'AI governance, risk controls and deployment assessment'}
    };
    return choices[this.goal()] ?? choices['communication'];
  });
}
