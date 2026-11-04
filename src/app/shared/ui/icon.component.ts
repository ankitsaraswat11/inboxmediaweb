import { Component, computed, input } from '@angular/core';

const c = (x: number, y: number, r: number) => `M${x - r} ${y}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;
const rr = (x: number, y: number, w: number, h: number, r: number) =>
  `M${x + r} ${y}h${w - 2 * r}a${r} ${r} 0 0 1 ${r} ${r}v${h - 2 * r}a${r} ${r} 0 0 1 ${-r} ${r}h${-(w - 2 * r)}a${r} ${r} 0 0 1 ${-r} ${-r}v${-(h - 2 * r)}a${r} ${r} 0 0 1 ${r} ${-r}z`;

/** Small line-icon set (24×24, stroke = currentColor). */
const ICONS: Record<string, string[]> = {
  shield: ['M12 3l7 3v5c0 4.6-3 8.3-7 10-4-1.7-7-5.4-7-10V6z', 'M9 12l2.2 2.2L15.5 10'],
  scan: ['M4 8V5.5A1.5 1.5 0 0 1 5.5 4H8', 'M16 4h2.5A1.5 1.5 0 0 1 20 5.5V8', 'M20 16v2.5a1.5 1.5 0 0 1-1.5 1.5H16', 'M8 20H5.5A1.5 1.5 0 0 1 4 18.5V16', 'M4 12h16'],
  target: [c(12, 12, 9), c(12, 12, 5), c(12, 12, 1.2)],
  eye: ['M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z', c(12, 12, 3)],
  lock: [rr(5, 11, 14, 10, 2), 'M8 11V8a4 4 0 0 1 8 0v3', 'M12 15v2'],
  key: [c(8, 15, 4), 'M11 12l9-9', 'M17 6l3 3'],
  layers: ['M12 3l9 5-9 5-9-5z', 'M3 13l9 5 9-5'],
  cloud: ['M7 18.5h10a4 4 0 0 0 .6-7.95A6 6 0 0 0 6.1 11 3.75 3.75 0 0 0 7 18.5z'],
  user: [c(12, 8, 4), 'M4.5 21c1.4-3.8 4.2-5.8 7.5-5.8s6.1 2 7.5 5.8'],
  users: [c(9, 8, 3.5), 'M2.5 20c1.2-3.4 3.6-5.2 6.5-5.2s5.3 1.8 6.5 5.2', 'M16 4.8a3.5 3.5 0 0 1 0 6.4', 'M18 14.9c1.6.8 2.8 2.5 3.5 5.1'],
  alert: ['M12 3.5l9.5 17h-19z', 'M12 10v4.5', 'M12 17.5v.01'],
  check: [c(12, 12, 9), 'M8 12.5l2.7 2.7L16 9.8'],
  spark: ['M12 3v4', 'M12 17v4', 'M3 12h4', 'M17 12h4', 'M6 6l2.5 2.5', 'M15.5 15.5L18 18', 'M18 6l-2.5 2.5', 'M8.5 15.5L6 18'],
  link: ['M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1', 'M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1'],
  doc: ['M7 3h7l5 5v13H7z', 'M14 3v5h5', 'M10 13h6', 'M10 17h6'],
  chart: ['M4 20V4', 'M4 20h16', 'M8.5 16v-4', 'M13 16V8', 'M17.5 16v-6'],
  globe: [c(12, 12, 9), 'M3 12h18', 'M12 3c2.4 2.5 3.7 5.5 3.7 9s-1.3 6.5-3.7 9c-2.4-2.5-3.7-5.5-3.7-9S9.6 5.5 12 3z'],
  cpu: [rr(7, 7, 10, 10, 1.5), 'M10 3v4', 'M14 3v4', 'M10 17v4', 'M14 17v4', 'M3 10h4', 'M3 14h4', 'M17 10h4', 'M17 14h4'],
  box: ['M12 3l8 4.5v9L12 21l-8-4.5v-9z', 'M4 7.5l8 4.5 8-4.5', 'M12 12v9'],
  bolt: ['M13 3L5 13.5h6L10 21l8-10.5h-6z'],
  wave: ['M3 16c2.5-5 4.5-5 7-1.5S15 18 21 8'],
  server: [rr(4, 4, 16, 6.5, 1.5), rr(4, 13.5, 16, 6.5, 1.5), 'M8 7.25h.01', 'M8 16.75h.01'],
  database: ['M5 6c0-1.7 3.1-3 7-3s7 1.3 7 3-3.1 3-7 3-7-1.3-7-3z', 'M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6', 'M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3'],
  hand: ['M8 12.5V6a1.5 1.5 0 0 1 3 0v5', 'M11 10.5V4.8a1.5 1.5 0 0 1 3 0V11', 'M14 10.5V6.5a1.5 1.5 0 0 1 3 0V14c0 4-2.6 7-6.5 7S5 18 5 14.5V12a1.5 1.5 0 0 1 3 0'],
  ghost: ['M6 20V10a6 6 0 0 1 12 0v10l-2-1.5-2 1.5-2-1.5-2 1.5-2-1.5z', 'M10 10.5h.01', 'M14 10.5h.01'],
  coin: [c(12, 12, 9), 'M9 8.5h6', 'M9 11.5h6', 'M11 8.5c2.2 0 3.4 1 3.4 3s-1.2 3-3.4 3H9.5l4.5 4'],
  gavel: ['M14.5 4.5l5 5', 'M12 7l5 5', 'M13.2 5.8l-5 5 5 5 5-5', 'M8.2 10.8L3 16l2 2 5.2-5.2', 'M14 21h7'],
  arrowR: ['M5 12h14', 'M13 6l6 6-6 6'],
  arrowL: ['M19 12H5', 'M11 6l-6 6 6 6'],
  plus: ['M12 5v14', 'M5 12h14'],
  chev: ['M6 9.5l6 6 6-6'],
  flow: [c(6, 6, 2.5), c(18, 18, 2.5), 'M8.5 6H14a4 4 0 0 1 4 4v5.5'],
  search: [c(11, 11, 7), 'M20 20l-3.6-3.6'],
  linkedin: [rr(3, 3, 18, 18, 3), 'M7.5 10.5V17', 'M7.5 7.3v.01', 'M11.5 17v-6.5', 'M11.5 13.2c0-1.6 1.1-2.7 2.5-2.7s2.5 1 2.5 2.8V17'],
  mail: [rr(3, 5, 18, 14, 2), 'M3.5 6.5l8.5 6.5 8.5-6.5'],
  pin: ['M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z', c(12, 9.5, 2.5)],
};

@Component({
  selector: 'app-icon',
  standalone: true,
  host: { style: 'display:inline-flex;flex:none' },
  template: `<svg viewBox="0 0 24 24" [attr.width]="size()" [attr.height]="size()" fill="none" stroke="currentColor"
    [attr.stroke-width]="weight()" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
    @for (d of paths(); track $index) { <path [attr.d]="d" /> }</svg>`,
})
export class IconComponent {
  readonly name = input.required<string>();
  readonly size = input(24);
  readonly weight = input(1.6);
  readonly paths = computed(() => ICONS[this.name()] ?? ICONS['spark']);
}
