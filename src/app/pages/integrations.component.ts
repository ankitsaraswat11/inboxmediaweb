import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { INTEGRATIONS, FLOW_CAP } from '../data';
import { FlowComponent } from '../components/flow.component';
import { IntegrationMapComponent } from '../components/integration-map.component';

@Component({
  standalone: true,
  imports: [RouterLink, FlowComponent, IntegrationMapComponent],
  template: `
    <section class="s page-hero"><div class="wrap"><p class="eyebrow">Connected technology</p><h1>Integrations &amp; Technology</h1>
      <p class="lead">A practical view of how channels, business systems, AI, cloud and your own applications connect to SUTRA, MEDHA and KAVACH.</p></div></section>
    <section class="s"><div class="wrap"><app-integration-map/></div></section>
    <section class="s alt"><div class="wrap">
      <h2>What connects, and how</h2>
      <div class="ig">
        @for (item of items; track item.name; let i = $index) {
          <article class="it"><span class="number">0{{ i + 1 }}</span><h3>{{ item.name }}</h3><p>{{ item.text }}</p></article>
        }
      </div>
    </div></section>
    <section class="s"><div class="wrap"><h2>A typical connection journey</h2><app-flow [steps]="flow" label="Integration journey"/>
      <p class="note">This is a conceptual architecture. Actual connectors, APIs, hosting, security controls and data flows must be confirmed during technical discovery.</p>
      <div class="btns"><a class="btn" routerLink="/contact" [queryParams]="{type:'proposal', interest: 'Digital Engineering'}">Discuss an integration</a><a class="btn ghost" routerLink="/digital-engineering">Digital Engineering</a></div></div></section>`,
  styles: [`
  .ig{display:grid;gap:1rem;grid-template-columns:repeat(auto-fit,minmax(min(260px,100%),1fr))}
  .it{padding:1.4rem;border-radius:var(--r-lg);background:var(--surface);border:1px solid var(--border)}
  .number{color:var(--primary);font:700 .85rem var(--font-display);font-variant-numeric:tabular-nums}
  .it h3{font-size:1.15rem;margin:.7rem 0 .4rem}.it p{margin:0}
  .note{margin:1.5rem 0}
  `]
})
export class IntegrationsComponent { items = INTEGRATIONS; flow = FLOW_CAP; }
