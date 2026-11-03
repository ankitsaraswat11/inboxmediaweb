import { Component } from '@angular/core';

@Component({
  standalone: true,
  template: `
    <section class="s dark page-hero"><div class="wrap"><p class="eyebrow">Internal project reference</p><h1>Website planning timeline</h1><p class="lead">The approved planning window covers two weeks. Development and launch are scheduled as a separate delivery phase.</p></div></section>
    <section class="s"><div class="wrap"><div class="weeks">
      <article><span>WEEK 01</span><h2>Discovery &amp; audit</h2><ul><li>Confirm objectives, audiences, positioning and primary CTA.</li><li>Review current Angular repository, routes, pages and assets.</li><li>Audit existing backend, enquiry form, integrations and analytics.</li><li>Prepare content inventory, issue register and sitemap draft.</li></ul><b>Exit: approved brief, sitemap draft and technical audit.</b></article>
      <article><span>WEEK 02</span><h2>UX, visual design &amp; prototype</h2><ul><li>Finalise information architecture and navigation.</li><li>Prepare desktop and mobile wireframes.</li><li>Confirm visual direction and reusable UI patterns.</li><li>Prototype Smart Solution Finder and Industry Scenario Simulator.</li><li>Collect stakeholder feedback and prioritise development backlog.</li></ul><b>Exit: approved design direction, wireframes and prototype.</b></article>
    </div></div></section>`,
  styles: [`.weeks{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(360px,100%),1fr));gap:1.2rem}.weeks article{border:1px solid var(--line);border-radius:20px;padding:clamp(1.2rem,3vw,2rem);box-shadow:var(--shadow-card)}.weeks article>span{color:var(--accent);font-size:.78rem;letter-spacing:.14em;font-weight:800}.weeks h2{margin-top:.7rem;font-size:1.5rem}.weeks ul{padding-left:1.2rem;color:var(--mute);line-height:1.8}.weeks b{display:block;border-top:1px solid var(--line);padding-top:1rem;color:var(--blue)}`]
})
export class RoadmapComponent {}
