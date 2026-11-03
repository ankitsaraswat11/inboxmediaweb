import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FLOW_ABOUT } from '../data';
import { FlowComponent } from '../components/flow.component';

@Component({
  standalone: true,
  imports: [RouterLink, FlowComponent],
  template: `
    <section class="s dark page-hero"><div class="wrap"><p class="eyebrow">About the company</p><h1>Enterprise communication, AI and engineering</h1><p class="lead">Inbox Media brings communication infrastructure, intelligent automation and digital engineering together to support enterprise operations.</p></div></section>
    <section class="s"><div class="wrap"><div class="about-intro"><h2>One partner across connected business needs</h2><p>From customer notifications and cloud telephony to AI-led conversations and custom software, the portfolio is organised around the practical systems businesses use to communicate and operate.</p></div>
      <div class="grid"><article class="item"><h3>Communication infrastructure</h3><p>Messaging, voice and omnichannel journeys that help organisations reach customers.</p></article><article class="item"><h3>AI automation</h3><p>Voice agents, chatbots and domain-focused AI for repeatable workflows.</p></article><article class="item"><h3>Digital engineering</h3><p>Custom applications, APIs, cloud and modernisation for connected systems.</p></article></div>
    </div></section>
    <section class="s tint"><div class="wrap"><h2>Explore the portfolio</h2><app-flow [steps]="flow" label="Inbox Media portfolio journey"/><div class="actions"><a class="btn" routerLink="/capabilities">Explore capabilities</a><a class="btn ghost" routerLink="/ai-solutions">Explore AI solutions</a><a class="btn ghost" routerLink="/contact">Talk to us</a></div></div></section>`,
  styles: [`.about-intro{max-width:760px;margin-bottom:2rem}.about-intro p{font-size:1.1rem}.actions{display:flex;gap:.7rem;flex-wrap:wrap;margin-top:1.5rem}`]
})
export class AboutComponent { flow = FLOW_ABOUT; }
