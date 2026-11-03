import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CAPABILITIES, FLOW_CAP } from '../data';
import { FlowComponent } from '../components/flow.component';

@Component({
  standalone: true,
  imports: [RouterLink, FlowComponent],
  template: `
    <section class="s dark page-hero"><div class="wrap"><p class="eyebrow">What we do</p><h1>Capabilities</h1><p class="lead">Five connected capability areas to help enterprises communicate, automate and modernise.</p></div></section>
    <section class="s"><div class="wrap">
      <div class="grid capability-grid">
        @for (item of items; track item.name; let i = $index) {
          <article class="item capability">
            <span class="index">0{{ i + 1 }}</span><h2>{{ item.name }}</h2><p>{{ item.text }}</p>
            @if (item.what) { <div class="detail"><b>What it is</b><p>{{ item.what }}</p></div> }
            @if (item.why) { <div class="detail"><b>Why it matters</b><p>{{ item.why }}</p></div> }
            @if (item.how) { <div class="detail"><b>How it works</b><p>{{ item.how }}</p></div> }
            @if (item.uses?.length) { <div class="tags"><b>Relevant sectors</b>@for (u of item.uses; track u) { <span>{{ u }}</span> }</div> }
            @if (item.benefit) { <p class="benefit"><b>Business value</b>{{ item.benefit }}</p> }
            <a class="text-link" routerLink="/contact" [queryParams]="{type:'proposal'}">Discuss this capability →</a>
          </article>
        }
      </div>
    </div></section>
    <section class="s tint"><div class="wrap"><h2>How capabilities work together</h2><app-flow [steps]="flow" label="Capability delivery flow"/><a class="btn" routerLink="/contact">Discuss your requirement</a></div></section>`,
  styles: [`.capability-grid{grid-template-columns:repeat(auto-fit,minmax(min(430px,100%),1fr))}.capability{padding:clamp(1.2rem,2.5vw,2rem)}.index{display:inline-block;color:var(--accent);font:700 .85rem Sora;letter-spacing:.12em;margin-bottom:1rem}.capability h2{font-size:1.35rem;max-width:24ch}.detail{border-top:1px solid var(--line);padding-top:.8rem;margin-top:1rem}.detail b,.tags b{font-size:.72rem;text-transform:uppercase;letter-spacing:.09em;color:var(--blue)}.detail p{margin:.35rem 0 0}.tags{display:flex;gap:.45rem;align-items:center;flex-wrap:wrap;margin-top:1rem}.tags span{border:1px solid var(--line);border-radius:99px;padding:.25rem .65rem;font-size:.78rem}.benefit{margin-top:1rem;padding:1rem;background:var(--soft);border-radius:12px}.benefit b{display:block;color:var(--blue);font-size:.75rem;text-transform:uppercase;letter-spacing:.08em}.text-link{display:inline-block;margin-top:1rem;font-weight:650;text-decoration:none}`]
})
export class CapabilitiesComponent {
  items = CAPABILITIES;
  flow = FLOW_CAP;
}
