import { Component, computed, effect, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { PlatformArtComponent } from '../components/platform-art.component';
import { ProductShowcaseComponent } from '../components/product-showcase.component';
import { ISO42001, PLATFORMS, TRUST_KINDS, TrustKind, platformBySlug } from '../content/platforms';
import { ENGINEERING } from '../content/engineering';
import { INDUSTRY_VIEW } from '../data';

@Component({
  standalone: true,
  imports: [RouterLink, PlatformArtComponent, ProductShowcaseComponent],
  template: `
  @if (p(); as p) {
  <section class="phero" [style.--c]="'var(--' + p.slug + ')'" [style.--t]="'var(--' + p.slug + '-tint)'">
    <div class="wrap phero-in">
      <div>
        <nav class="pnav" aria-label="Platforms">
          <span class="pager">{{ idx() + 1 }}/{{ all.length }}</span>
          @for (o of all; track o.slug) {
            <a [routerLink]="['/platforms', o.slug]" [class.on]="o.slug === p.slug" [style.--oc]="'var(--' + o.slug + ')'" [attr.aria-current]="o.slug === p.slug ? 'page' : null">{{ o.name }}</a>
          }
        </nav>
        <p class="layer">{{ p.layer }} · {{ p.area }}</p>
        <h1>{{ p.name }}</h1>
        <p class="desc">{{ p.descriptor }}</p>
        <p class="meaning">{{ p.meaning }}</p>
        <p class="pos">{{ p.positioning }}</p>
        <div class="btns">
          <a class="btn" routerLink="/contact" [queryParams]="{type:'demo', interest: p.name}">Book a {{ p.name }} demo</a>
          <a class="btn ghost" routerLink="/contact" [queryParams]="{type:'proposal', interest: p.name}">Discuss your requirements</a>
        </div>
      </div>
      <div class="art"><app-platform-art [slug]="p.slug"/></div>
    </div>
  </section>

  <!-- What the platform includes -->
  <section class="s" [style.--c]="'var(--' + p.slug + ')'" [style.--t]="'var(--' + p.slug + '-tint)'">
    <div class="wrap">
      <div class="sh"><h2>What {{ p.name }} brings together</h2><p class="lead">{{ p.summary }}</p></div>

      @if (p.slug === 'medha') {
        <app-product-showcase/>
        @for (g of p.groups.slice(1); track g.title) {
          <div class="grp solo"><div class="gh"><h3>{{ g.title }}</h3><p>{{ g.text }}</p></div>
            <ul class="items">@for (i of g.items; track i.name) { <li>{{ i.name }}</li> }</ul></div>
        }
      } @else {
        @if (p.slug === 'kavach') {
          <div class="legend" aria-label="How to read the labels">
            @for (k of kinds; track k.key) { <div><span class="kind" [attr.data-k]="k.key">{{ k.label }}</span><p>{{ k.text }}</p></div> }
          </div>
        }
        <div class="groups" [style.--gc]="p.groups.length === 4 ? 2 : 3">
          @for (g of p.groups; track g.title; let gi = $index) {
            <div class="grp">
              <div class="gh"><span class="gn">{{ gi + 1 }}</span><div><h3>{{ g.title }}</h3><p>{{ g.text }}</p></div></div>
              <ul class="items">
                @for (i of g.items; track i.name) {
                  <li>@if (i.link) { <a [routerLink]="i.link">{{ i.name }}</a> } @else { {{ i.name }} }
                    @if (i.kind) { <span class="kind" [attr.data-k]="i.kind">{{ kindLabel(i.kind) }}</span> }</li>
                }
              </ul>
            </div>
          }
        </div>
        @if (p.slug === 'kavach') {
          <div class="iso">
            <div><span class="kind" data-k="readiness">Readiness</span><h3>{{ iso.name }}</h3><p class="t">{{ iso.text }}</p>
              <dl><div><dt>What it is</dt><dd>{{ iso.what }}</dd></div><div><dt>Why it matters</dt><dd>{{ iso.why }}</dd></div><div><dt>How it works</dt><dd>{{ iso.how }}</dd></div></dl>
              <p class="note">{{ iso.note }}</p></div>
            <ol class="steps">@for (s of iso.steps; track s; let k = $index) { <li><span>{{ k + 1 }}</span>{{ s }}</li> }</ol>
          </div>
          <p class="confirm">For internal confirmation: service scope for each KAVACH item, and which are delivered as advisory, readiness or technical implementation.</p>
        }
        @if (p.slug === 'sutra') { <p class="more"><a class="text-link" routerLink="/capabilities">Capability details: what, why and how</a></p> }
      }
    </div>
  </section>

  <!-- Use cases -->
  <section class="s alt" [style.--c]="'var(--' + p.slug + ')'">
    <div class="wrap">
      <div class="sh"><h2>Business use cases</h2><p class="lead">Where {{ p.name }} makes a measurable difference to daily operations.</p></div>
      <div class="ucs">
        @for (u of p.useCases; track u.title) { <div class="uc"><h3>{{ u.title }}</h3><p>{{ u.text }}</p><span class="who">{{ u.who }}</span></div> }
      </div>
      @if (industries().length) {
        <div class="inds"><span>Industries using {{ p.name }}</span>@for (i of industries(); track i.name) { <a class="chip" routerLink="/industries">{{ i.name }}</a> }</div>
      }
    </div>
  </section>

  <!-- Foundation + next -->
  <section class="s">
    <div class="wrap foot">
      <a class="eng" routerLink="/digital-engineering"><span class="ek">Built on Digital Engineering</span><b>{{ engLine() }}</b><span class="text-link">Explore the foundation</span></a>
      <a class="next" [routerLink]="['/platforms', nextP().slug]" [style.--c]="'var(--' + nextP().slug + ')'"><span class="ek">Next platform</span><b class="pmark">{{ nextP().name }}</b><span>{{ nextP().descriptor }}</span></a>
    </div>
  </section>
  }`,
  styles: [`
  .phero{background:radial-gradient(70% 90% at 95% 0%,var(--t),transparent 70%),var(--bg);padding:clamp(2.2rem,5vw,4.5rem) 0 clamp(2.4rem,5vw,4rem);border-bottom:1px solid var(--border)}
  .phero-in{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);gap:clamp(1.5rem,4vw,3.5rem);align-items:center}
  .pnav{display:flex;align-items:center;gap:.35rem;flex-wrap:wrap;margin-bottom:1.5rem}
  .pager{display:inline-grid;place-items:center;height:1.9rem;padding:0 .75rem;border-radius:999px;background:var(--c);color:var(--surface);font:700 .82rem var(--font-display);margin-right:.35rem}
  .pnav a{font:800 .92rem var(--mark);letter-spacing:.06em;color:var(--fg-2);text-decoration:none;padding:.32rem .75rem;border-radius:999px;border:1px solid transparent}
  .pnav a:hover{color:var(--oc)}
  .pnav a.on{color:var(--oc);border-color:currentColor;background:var(--surface)}
  .layer{margin:0 0 .3rem;font-weight:600;color:var(--c)}
  h1{font:800 clamp(3.4rem,9vw,7rem)/.95 var(--mark);letter-spacing:.02em;color:var(--c);margin:0}
  .desc{font:600 clamp(1.2rem,2.2vw,1.6rem)/1.25 var(--font-display);color:var(--fg);margin:.7rem 0 0;max-width:28ch}
  .meaning{margin:1rem 0 0;padding-left:.9rem;border-left:3px solid var(--c);font-style:italic}
  .pos{font-size:1.06rem;color:var(--fg);margin:1rem 0 1.6rem;max-width:56ch}
  .art{width:100%;max-width:480px;justify-self:center;color:var(--c)}
  .groups{display:grid;grid-template-columns:repeat(var(--gc,3),minmax(0,1fr));gap:1rem}
  .grp{background:var(--surface);border:1px solid var(--border);border-radius:var(--r-xl);padding:clamp(1.1rem,2.4vw,1.6rem);box-shadow:var(--shadow)}
  .grp.solo{margin-top:1.6rem}
  .gh{display:grid;grid-template-columns:auto 1fr;gap:.9rem;margin-bottom:1rem}
  .grp.solo .gh{grid-template-columns:1fr}
  .gn{display:grid;place-items:center;width:34px;height:34px;border-radius:10px;background:var(--t);color:var(--c);font:700 .9rem var(--font-display)}
  .gh h3{margin:0 0 .2rem;font-size:1.15rem}.gh p{margin:0;font-size:.92rem}
  .items{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(min(210px,100%),1fr));gap:.45rem}
  .items li{display:flex;justify-content:space-between;align-items:center;gap:.5rem;font-size:.9rem;font-weight:500;color:var(--fg);padding:.55rem .75rem;border-radius:10px;background:var(--surface-2);border:1px solid var(--border)}
  .items a{color:var(--fg);font-weight:600;text-decoration:underline;text-decoration-color:var(--border-strong);text-underline-offset:3px}
  .kind{flex-shrink:0;font-size:.68rem;font-weight:700;border-radius:5px;padding:.12rem .42rem;white-space:nowrap}
  .kind[data-k="standard"]{color:var(--pending);background:var(--pending-tint)}
  .kind[data-k="readiness"]{color:var(--primary);background:var(--lavender)}
  .kind[data-k="consulting"]{color:var(--eng);background:var(--eng-tint)}
  .kind[data-k="control"]{color:var(--kavach);background:var(--kavach-tint)}
  .legend{display:grid;grid-template-columns:repeat(4,1fr);gap:.8rem;margin-bottom:1.2rem;padding:1rem;border-radius:var(--r-lg);border:1px dashed var(--border-strong)}
  .legend p{margin:.35rem 0 0;font-size:.82rem;line-height:1.5}
  .iso{display:grid;grid-template-columns:minmax(0,1.4fr) minmax(0,.6fr);gap:1.5rem;margin-top:1.4rem;padding:clamp(1.2rem,2.6vw,1.8rem);border-radius:var(--r-xl);background:var(--t);border:1px solid color-mix(in srgb,var(--c) 25%,transparent)}
  .iso h3{margin:.6rem 0 .3rem;font-size:1.3rem}.iso .t{color:var(--fg)}
  .iso dl{display:grid;gap:.7rem;margin:1rem 0}.iso dt{font-weight:700;font-size:.85rem;color:var(--fg)}.iso dd{margin:.15rem 0 0;color:var(--fg-2);font-size:.93rem}
  .steps{list-style:none;margin:0;padding:0;display:grid;gap:.5rem;align-content:center}
  .steps li{display:flex;align-items:center;gap:.7rem;padding:.7rem .9rem;border-radius:12px;background:var(--surface);border:1px solid var(--border);font-weight:600;color:var(--fg);font-size:.92rem}
  .steps span{display:grid;place-items:center;width:26px;height:26px;border-radius:50%;background:var(--c);color:var(--surface);font-size:.78rem;flex-shrink:0}
  .confirm{margin-top:1.2rem}
  .more{margin:1.4rem 0 0}
  .ucs{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem}
  .uc{display:flex;flex-direction:column;padding:1.3rem;border-radius:var(--r-lg);background:var(--surface);border:1px solid var(--border);border-top:3px solid var(--c)}
  .uc h3{font-size:1.05rem;margin:0 0 .4rem}.uc p{font-size:.92rem;margin:0 0 1rem}
  .who{margin-top:auto;font-size:.78rem;font-weight:700;color:var(--c)}
  .inds{display:flex;flex-wrap:wrap;align-items:center;gap:.4rem;margin-top:1.6rem}
  .inds>span{font-weight:600;color:var(--fg);margin-right:.4rem;font-size:.9rem}
  .foot{display:grid;grid-template-columns:1.3fr 1fr;gap:1rem}
  .eng,.next{display:grid;gap:.35rem;padding:1.5rem 1.6rem;border-radius:var(--r-xl);text-decoration:none;border:1px solid var(--border);transition:transform .2s,border-color .2s}
  .eng{background:var(--eng-tint)}.eng b{font:600 1.15rem/1.4 var(--font-display);color:var(--fg)}
  .next{background:var(--surface)}.next .pmark{font-size:2.4rem;line-height:1}.next span:last-child{color:var(--fg);font-weight:600}
  .eng:hover,.next:hover{transform:translateY(-3px);border-color:var(--border-strong)}
  .ek{font-size:.8rem;font-weight:700;color:var(--fg-2)}
.grp .items{grid-template-columns:repeat(auto-fill,minmax(min(200px,100%),1fr))}
  @media(max-width:1100px){.groups{grid-template-columns:1fr}}
  @media(max-width:1000px){.ucs{grid-template-columns:1fr 1fr}.legend{grid-template-columns:1fr 1fr}.iso{grid-template-columns:1fr}}
  @media(max-width:900px){.phero-in{grid-template-columns:1fr}.art{max-width:400px}.foot{grid-template-columns:1fr}}
  @media(max-width:560px){.ucs,.legend{grid-template-columns:1fr}}
  `]
})
export class PlatformComponent {
  all = PLATFORMS; iso = ISO42001;
  kinds = (Object.keys(TRUST_KINDS) as TrustKind[]).map(k => ({ key: k, ...TRUST_KINDS[k] }));
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  slug = toSignal(this.route.paramMap.pipe(map(m => m.get('slug'))), { initialValue: null });
  p = computed(() => platformBySlug(this.slug()));
  idx = computed(() => PLATFORMS.findIndex(x => x.slug === this.p()?.slug));
  nextP = computed(() => PLATFORMS[(this.idx() + 1) % PLATFORMS.length]);
  industries = computed(() => { const p = this.p(); return p ? INDUSTRY_VIEW.filter(i => (i.platforms as string[]).includes(p.slug)) : []; });
  engLine = computed(() => { const p = this.p(); return p ? ENGINEERING.enables[p.slug] : ''; });
  constructor() { effect(() => { if (this.slug() && !this.p()) this.router.navigateByUrl('/platforms'); }); }
  kindLabel(k: TrustKind) { return TRUST_KINDS[k].label; }
}
