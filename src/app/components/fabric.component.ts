import { AfterViewInit, Component, ElementRef, Input, OnDestroy, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PLATFORMS, PlatformSlug } from '../data';

/**
 * The layered architecture: SUTRA (communication) at the base, MEDHA (intelligence) above it,
 * and KAVACH (trust) wrapping both, because security and governance run across every layer.
 * Designed for dark backgrounds.
 */
@Component({
  selector: 'app-fabric',
  standalone: true,
  imports: [RouterLink],
  template: `
  <figure class="fab" [class.in]="seen()" [attr.data-active]="active" aria-label="Inbox Media enterprise technology fabric">
    <a class="kv" [routerLink]="['/platforms', kavach.slug]" [style.--c]="kavach.light" [class.on]="active === 'kavach'">
      <span class="frame" aria-hidden="true"></span>
      <span class="lbl"><b>{{ kavach.name }}</b><span>{{ kavach.layer }}</span></span>
      <em>{{ kavach.tagline }}</em>
    </a>
    <div class="inner">
      <a class="ly md" [routerLink]="['/platforms', medha.slug]" [style.--c]="medha.light" [class.on]="active === 'medha'">
        <span class="lbl"><b>{{ medha.name }}</b><span>{{ medha.layer }}</span></span><em>{{ medha.tagline }}</em>
      </a>
      <div class="link" aria-hidden="true"><i></i><i></i><i></i></div>
      <a class="ly st" [routerLink]="['/platforms', sutra.slug]" [style.--c]="sutra.light" [class.on]="active === 'sutra'">
        <span class="lbl"><b>{{ sutra.name }}</b><span>{{ sutra.layer }}</span></span><em>{{ sutra.tagline }}</em>
      </a>
    </div>
    <figcaption>Delivered with Inbox Media digital engineering &amp; IT services</figcaption>
  </figure>`,
  styles: [`
  :host{display:block}
  .fab{margin:0;position:relative;padding:0 0 3.2rem}
  a{color:inherit;text-decoration:none}
  .kv{position:absolute;inset:0 0 2.4rem 0;border-radius:28px;display:block}
  .frame{position:absolute;inset:0;border:1.5px solid var(--c);border-radius:28px;background:linear-gradient(180deg,rgba(77,182,172,.10),rgba(77,182,172,.02));clip-path:inset(0 100% 100% 0 round 28px);transition:clip-path 1.2s cubic-bezier(.7,0,.2,1) .5s}
  .in .frame{clip-path:inset(0 0 0 0 round 28px)}
  .kv .lbl{position:absolute;left:1.6rem;top:1.25rem}
  .kv em{position:absolute;right:1.6rem;top:1.4rem}
  .inner{position:relative;padding:4.6rem 1.6rem 1.6rem;display:grid;gap:0;pointer-events:none}
  .ly{pointer-events:auto;display:flex;justify-content:space-between;align-items:center;gap:1rem;flex-wrap:wrap;padding:1.25rem 1.4rem;border-radius:18px;border:1px solid color-mix(in srgb,var(--c) 55%,transparent);background:color-mix(in srgb,var(--c) 14%,#1b1033);opacity:0;transform:translateY(24px);transition:opacity .7s ease,transform .7s cubic-bezier(.2,.7,.2,1),background .25s,border-color .25s}
  .st{transition-delay:.1s}.md{transition-delay:.3s}
  .in .ly{opacity:1;transform:none}
  .ly:hover,.ly:focus-visible,.ly.on{background:color-mix(in srgb,var(--c) 26%,#1b1033);border-color:var(--c)}
  .kv:hover .frame,.kv.on .frame{border-width:2.5px}
  .lbl{display:flex;align-items:baseline;gap:.75rem;flex-wrap:wrap}
  b{font:700 1.5rem/1 var(--mark);letter-spacing:.04em;color:var(--c)}
  .lbl span{color:#e7def7;font-size:.95rem}
  em{font-style:normal;color:#c9bde3;font-size:.92rem}
  .link{height:46px;display:flex;justify-content:space-around;padding:0 18%}
  .link i{width:2px;height:100%;background:linear-gradient(180deg,#b39ddb,#ff8a65);opacity:.45;position:relative;overflow:hidden}
  .link i::after{content:"";position:absolute;left:-2px;width:6px;height:10px;border-radius:3px;background:#fff;animation:up 1.8s linear infinite}
  .link i:nth-child(2)::after{animation-delay:.6s;animation-direction:reverse}.link i:nth-child(3)::after{animation-delay:1.2s}
  figcaption{position:absolute;left:0;right:0;bottom:0;text-align:center;color:#a99cc6;font-size:.85rem;border-top:1px dashed rgba(255,255,255,.18);padding-top:.7rem}
  @keyframes up{from{top:100%}to{top:-10px}}
  @media(max-width:560px){.fab{padding-bottom:4.6rem}.kv{inset:0 0 3.8rem 0}.kv em{display:none}.inner{padding:4.2rem .9rem .9rem}.kv .lbl{left:1rem}.ly{padding:1rem}b{font-size:1.3rem}}
  `]
})
export class FabricComponent implements AfterViewInit, OnDestroy {
  @Input() active: PlatformSlug | null = null;
  sutra = PLATFORMS[0]; medha = PLATFORMS[1]; kavach = PLATFORMS[2];
  seen = signal(false);
  private el = inject(ElementRef<HTMLElement>);
  private io?: IntersectionObserver;
  ngAfterViewInit() {
    if (typeof IntersectionObserver === 'undefined') { this.seen.set(true); return; }
    this.io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { this.seen.set(true); this.io?.disconnect(); } }, { threshold: .25 });
    this.io.observe(this.el.nativeElement);
  }
  ngOnDestroy() { this.io?.disconnect(); }
}
