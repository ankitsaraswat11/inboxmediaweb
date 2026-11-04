import { Component, computed, input } from '@angular/core';

/**
 * Concentric "fabric" line art used behind heroes and CTAs.
 * Plain rings in hairline grey, one partial arc in signal blue, one in cyan,
 * with a few nodes sitting on the rings. With [draw]="true" the rings draw in once on load.
 */
@Component({
  selector: 'app-curves',
  standalone: true,
  template: `
    <svg class="curves" [class.curves--draw]="draw()" viewBox="0 0 1000 1000" aria-hidden="true" focusable="false">
      @for (r of rings(); track r.r; let i = $index) {
        <circle
          class="ring" [class.ring--hot]="r.hot" [class.ring--cyan]="r.cyan"
          [attr.cx]="cx()" [attr.cy]="cy()" [attr.r]="r.r"
          [attr.stroke-dasharray]="r.dash" [attr.transform]="r.rot"
          [style.--len]="r.len" [style.--gap]="r.gap" [style.--d]="i * 0.06 + 's'" />
      }
      @for (n of nodes(); track $index) {
        <circle class="node" [class.node--cyan]="n.cyan" [attr.cx]="n.x" [attr.cy]="n.y" [attr.r]="n.s" [style.--d]="n.d + 's'" />
      }
    </svg>
  `,
})
export class CurvesComponent {
  readonly cx = input(700);
  readonly cy = input(320);
  readonly start = input(90);
  readonly step = input(64);
  readonly count = input(11);
  readonly draw = input(false);

  readonly rings = computed(() =>
    Array.from({ length: this.count() }, (_, i) => {
      const r = this.start() + i * this.step();
      const circ = +(2 * Math.PI * r).toFixed(1);
      const hot = i === 4;
      const cyan = i === 7;
      const part = hot ? 0.3 : cyan ? 0.18 : 1;
      const arc = +(circ * part).toFixed(1);
      const angle = hot ? 150 : cyan ? 205 : 0;
      return {
        r, hot, cyan,
        len: arc,
        gap: part < 1 ? circ : arc,
        dash: part < 1 ? `${arc} ${circ}` : null,
        rot: part < 1 ? `rotate(${angle} ${this.cx()} ${this.cy()})` : null,
      };
    })
  );

  readonly nodes = computed(() => {
    const at = (ring: number, deg: number, s: number, cyan = false, d = 0) => {
      const r = this.start() + ring * this.step();
      const a = (deg * Math.PI) / 180;
      return { x: +(this.cx() + r * Math.cos(a)).toFixed(1), y: +(this.cy() + r * Math.sin(a)).toFixed(1), s, cyan, d };
    };
    return [at(4, 150, 6, false, 0.2), at(4, 258, 4.5, false, 0.3), at(7, 205, 5, true, 0.45), at(2, 120, 4, true, 0.1), at(9, 168, 4.5, false, 0.55)];
  });
}
