import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { INDUSTRIES } from '../data';

@Component({
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="s dark page-hero"><div class="wrap"><p class="eyebrow">Industry applications</p><h1>Solutions shaped around your industry</h1><p class="lead">Explore how communication, automation and engineering can support different operating environments.</p></div></section>
    <section class="s"><div class="wrap">
      <div class="industry-nav" aria-label="Choose an industry">
        @for (item of items; track item.name; let i = $index) {
          <button type="button" [class.active]="selected() === i" [attr.aria-pressed]="selected() === i" (click)="selected.set(i)">{{ item.name }}</button>
        }
      </div>
      <article class="industry-detail">
        <div><span class="eyebrow">Selected industry</span><h2>{{ current.name }}</h2><p class="lead">{{ current.text }}</p></div>
        <div class="detail-grid">
          <section><h3>What organisations need</h3><p>{{ current.what }}</p></section>
          <section><h3>Why it matters</h3><p>{{ current.why }}</p></section>
          <section><h3>How the workflow can work</h3><p>{{ current.how }}</p></section>
          <section><h3>Potential business value</h3><p>{{ current.benefit }}</p></section>
        </div>
        <div class="tags"><b>Relevant capabilities / solutions</b>@for (u of current.uses || []; track u) { <span>{{ u }}</span> }</div>
        <p class="note">These are illustrative use cases. Specific integrations, regulatory requirements and outcomes must be validated for each project.</p>
        <a class="btn" routerLink="/contact" [queryParams]="{type:'proposal'}">Discuss {{ current.name }} use cases</a>
      </article>
    </div></section>`,
  styles: [`.industry-nav{display:flex;gap:.55rem;flex-wrap:wrap;margin-bottom:1.5rem}.industry-nav button{border:1px solid var(--line);background:#fff;border-radius:99px;padding:.65rem 1rem;font:600 .9rem Inter;cursor:pointer}.industry-nav button.active{background:var(--navy);color:#fff;border-color:var(--navy)}.industry-detail{border:1px solid var(--line);border-radius:22px;padding:clamp(1.2rem,3vw,2.2rem);box-shadow:var(--shadow-card)}.detail-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(280px,100%),1fr));gap:1.2rem;margin:2rem 0}.detail-grid section{border-top:2px solid var(--accent);padding-top:.8rem}.detail-grid h3{font-size:1rem}.detail-grid p{margin:0}.tags{display:flex;gap:.45rem;flex-wrap:wrap;align-items:center;margin:1rem 0}.tags b{width:100%;font-size:.75rem;color:var(--blue);text-transform:uppercase}.tags span{background:var(--soft);border-radius:99px;padding:.35rem .75rem;font-size:.82rem}`]
})
export class IndustriesComponent {
  items = INDUSTRIES;
  selected = signal(0);
  get current() { return this.items[this.selected()]; }
}
