import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RESOURCES } from '../data';

@Component({
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="s dark page-hero"><div class="wrap"><p class="eyebrow">Insights &amp; learning</p><h1>Resources</h1><p class="lead">Practical topics to help teams evaluate communication, AI and digital engineering decisions.</p></div></section>
    <section class="s"><div class="wrap"><div class="grid">
      @for (item of items; track item.name; let i = $index) {
        <article class="item resource"><span>GUIDE 0{{ i + 1 }}</span><h2>{{ item.name }}</h2><p>{{ item.text }}</p><a routerLink="/contact" [queryParams]="{type:'message'}">Ask our team about this topic →</a></article>
      }
    </div><p class="note">These are planned resource topics, not downloadable publications. Case studies, customer results and technical claims will be published only after approval.</p></div></section>`,
  styles: [`.resource>span{font-size:.72rem;letter-spacing:.12em;color:var(--accent);font-weight:700}.resource h2{font-size:1.2rem;margin-top:.8rem}.resource a{display:inline-block;margin-top:1.2rem;font-weight:650;text-decoration:none}`]
})
export class ResourcesComponent { items = RESOURCES; }
