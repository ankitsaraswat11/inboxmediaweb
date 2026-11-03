import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { INTEGRATIONS, FLOW_CAP } from '../data';
import { FlowComponent } from '../components/flow.component';

@Component({
  standalone: true,
  imports: [RouterLink, FlowComponent],
  template: `
    <section class="s dark page-hero"><div class="wrap"><p class="eyebrow">Connected technology</p><h1>Integrations &amp; Technology</h1><p class="lead">A practical view of how channels, business systems, AI and engineering can work together.</p></div></section>
    <section class="s"><div class="wrap"><div class="grid">
      @for (item of items; track item.name; let i = $index) {
        <article class="item"><span class="number">0{{ i + 1 }}</span><h2>{{ item.name }}</h2><p>{{ item.text }}</p></article>
      }
    </div></div></section>
    <section class="s tint"><div class="wrap"><h2>A typical connection journey</h2><app-flow [steps]="flow" label="Integration journey"/><p class="note">This is a conceptual architecture. Actual connectors, APIs, hosting, security controls and data flows must be confirmed during technical discovery.</p><a class="btn" routerLink="/contact" [queryParams]="{type:'proposal'}">Discuss an integration</a></div></section>`,
  styles: [`.number{color:var(--accent);font:700 .85rem Sora}.item h2{font-size:1.3rem;margin-top:.8rem}.note{margin:1.5rem 0}`]
})
export class IntegrationsComponent { items = INTEGRATIONS; flow = FLOW_CAP; }
