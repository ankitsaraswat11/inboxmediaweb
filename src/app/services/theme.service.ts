import { Injectable, signal } from '@angular/core';

export type Theme = 'light' | 'dark';
/** localStorage key. Also read by the inline script in index.html, so keep both in sync. */
export const THEME_KEY = 'im-theme';

/**
 * Single source of truth for the site theme.
 * - First visit: follows the operating-system preference (and keeps following it while no choice is saved).
 * - After the visitor uses the toggle: the choice is saved in localStorage and wins on every route and reload.
 * The theme is applied as `data-theme` on <html>; every colour in the CSS comes from tokens keyed on that attribute.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly theme = signal<Theme>(this.initial());
  private media = typeof matchMedia !== 'undefined' ? matchMedia('(prefers-color-scheme: dark)') : null;

  constructor() {
    this.apply(this.theme(), false);
    this.media?.addEventListener('change', e => { if (!this.saved()) this.set(e.matches ? 'dark' : 'light', false); });
  }

  toggle() { this.set(this.theme() === 'dark' ? 'light' : 'dark', true); }

  set(t: Theme, persist = true) {
    this.theme.set(t);
    this.apply(t, true);
    if (persist) { try { localStorage.setItem(THEME_KEY, t); } catch { /* storage unavailable: theme still applies for this visit */ } }
  }

  private saved(): Theme | null {
    try { const v = localStorage.getItem(THEME_KEY); return v === 'light' || v === 'dark' ? v : null; } catch { return null; }
  }

  private initial(): Theme {
    const fromDom = typeof document !== 'undefined' ? document.documentElement.getAttribute('data-theme') : null;
    if (fromDom === 'light' || fromDom === 'dark') return fromDom;
    return this.saved() ?? (typeof matchMedia !== 'undefined' && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }

  private apply(t: Theme, animate: boolean) {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    if (animate) {
      root.classList.add('theme-anim');
      setTimeout(() => root.classList.remove('theme-anim'), 450);
    }
    root.setAttribute('data-theme', t);
    root.style.colorScheme = t;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', t === 'dark' ? '#170E2C' : '#F2E8FC');
  }
}
