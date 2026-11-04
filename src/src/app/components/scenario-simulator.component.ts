import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { INDUSTRIES } from '../data';

@Component({
  selector: 'app-scenario-simulator',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="s simulator"><div class="wrap">
      <div class="intro"><p class="eyebrow">Industry scenario simulator</p><h2>See how a customer journey could work</h2><p>Select an industry to explore an illustrative communication and automation workflow.</p></div>
      <div class="sim-head"><label for="sector-select">Select an industry</label><select id="sector-select" [value]="industry()" (change)="industry.set($any($event.target).value)">@for (item of industries; track item.name) { <option [value]="item.name">{{ item.name }}</option> }</select></div>
      <div class="scenario">
        <div class="scenario-copy"><span class="result-label">Illustrative scenario</span><h3>{{ current.name }}</h3><p>{{ current.text }}</p><p>{{ current.how }}</p><div class="tags">@for (u of current.uses || []; track u) { <span>{{ u }}</span> }</div></div>
        <ol class="steps">
          @for (step of steps(); track step.title; let i = $index) {
            <li><span>{{ i + 1 }}</span><div><b>{{ step.title }}</b><p>{{ step.description }}</p></div></li>
          }
        </ol>
      </div>
      <p class="disclaimer">Conceptual example only. Actual channel availability, integrations, compliance requirements and outcomes depend on project discovery.</p>
      <a class="btn" routerLink="/contact" [queryParams]="{type:'proposal'}">Design a workflow for my organisation</a>
    </div></section>`,
  styles: [`.simulator{background:var(--bg)}.intro{max-width:760px;margin-bottom:1.4rem}.sim-head{display:flex;gap:.8rem;align-items:center;flex-wrap:wrap;margin-bottom:1rem}.sim-head label{font-weight:700}.sim-head select{width:auto;min-width:220px}.scenario{display:grid;background:var(--surface);grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:1rem;border:1px solid var(--line);border-radius:20px;padding:clamp(1rem,2.5vw,1.6rem);box-shadow:var(--shadow-card)}.scenario-copy{background:var(--soft);border-radius:15px;padding:1.2rem}.result-label{color:var(--primary);font-size:.8rem;font-weight:700}.scenario-copy h3{font-size:1.5rem;margin:.7rem 0}.scenario-copy p{line-height:1.7}.tags{display:flex;gap:.4rem;flex-wrap:wrap}.tags span{font-size:.78rem;border:1px solid var(--border);border-radius:99px;padding:.25rem .65rem;background:var(--surface);color:var(--fg)}.steps{list-style:none;margin:0;padding:0;display:grid;gap:.65rem}.steps li{display:grid;grid-template-columns:38px 1fr;gap:.8rem;align-items:start;padding:.8rem;border:1px solid var(--line);border-radius:12px}.steps li>span{display:grid;place-items:center;width:32px;height:32px;border-radius:50%;background:var(--btn);color:var(--btn-fg);font-weight:700}.steps b{display:block;color:var(--navy)}.steps p{margin:.2rem 0 0;font-size:.9rem}.disclaimer{font-size:.82rem;margin:1rem 0}@media(max-width:760px){.scenario{grid-template-columns:1fr}}`]
})
export class ScenarioSimulatorComponent {
  industries = INDUSTRIES;
  industry = signal(INDUSTRIES[0].name);
  get current() { return this.industries.find(x => x.name === this.industry()) ?? this.industries[0]; }
  steps = computed(() => {
    const sector = this.current;
    return [
      {title:'Business event', description:sector.what || 'A customer or operational event starts the journey.'},
      {title:'Choose the touchpoint', description:`Use the relevant channels and capabilities: ${(sector.uses || []).slice(0,3).join(', ')}.`},
      {title:'Automate the routine step', description:sector.how || 'A defined workflow handles the repeatable task.'},
      {title:'Human handover and follow-up', description:'Route exceptions to the right team and record the interaction for follow-up.'},
      {title:'Review the outcome', description:'Measure response, completion and service quality using agreed business metrics.'}
    ];
  });
}
