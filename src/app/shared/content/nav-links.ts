import { NAV } from '../../core/data/data';

/** Every link in the main menu, flattened — used by the on-page topic finder. */
export function allNavLinks() {
  const seen = new Set<string>();
  const out: { label: string; u: string; group: string; menu: string }[] = [];
  for (const m of NAV) {
    for (const g of m.g) for (const l of g.l) {
      if (seen.has(l.u + l.x)) continue;
      seen.add(l.u + l.x);
      out.push({ label: l.x, u: l.u, group: g.n, menu: m.t });
    }
  }
  return out;
}
