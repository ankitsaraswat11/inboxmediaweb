import { Component } from '@angular/core';
import { IndustryExplorerComponent } from '../components/industry-explorer.component';
import { ScenarioSimulatorComponent } from '../components/scenario-simulator.component';

/** /industries: industry explorer (challenges, platforms, products, workflow, benefits) plus the scenario simulator. */
@Component({
  standalone: true,
  imports: [IndustryExplorerComponent, ScenarioSimulatorComponent],
  template: `
    <section class="s page-hero"><div class="wrap"><p class="eyebrow">Industry solutions</p><h1>Solutions shaped around your industry</h1>
      <p class="lead">Explore how SUTRA, MEDHA and KAVACH, with our engineering teams, support different operating environments.</p></div></section>
    <section class="s"><div class="wrap">
      <app-industry-explorer [detail]="true"/>
      <p class="note">These are illustrative use cases. Specific integrations, regulatory requirements and outcomes must be validated for each project.</p>
    </div></section>
    <app-scenario-simulator></app-scenario-simulator>`,
  styles: [`.note{margin-top:1.5rem}`]
})
export class IndustriesComponent {}
