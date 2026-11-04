import { Component, computed, input, signal } from '@angular/core';
import { COMPANY } from '../../core/data/data';

/**
 * Shown after a form passes validation. The site has no form backend yet, so the visitor
 * copies the details or opens an email to the first address in COMPANY.emails.
 * Connect a backend later by posting the same text from the parent component.
 */
@Component({
  selector: 'app-enquiry-result',
  standalone: true,
  template: `
    <div class="form__status form__status--ok" role="status" aria-live="polite">
      <strong>{{ heading() }}</strong>
      <p>{{ mail() ? 'Send it by email, or copy the details to share with the Ankit Global team.' : 'Copy the details and share them with the Ankit Global team.' }}</p>
      <div class="btn-row">
        @if (mail()) { <a class="btn btn--primary" [href]="mail()">Send by email</a> }
        <button type="button" class="btn btn--ghost" (click)="copy()">{{ copied() ? 'Details copied' : 'Copy details' }}</button>
      </div>
      @if (failed()) { <p class="error">Copy failed. Allow clipboard access and try again.</p> }
    </div>
  `,
})
export class EnquiryResultComponent {
  readonly heading = input('Your enquiry is ready.');
  readonly subject = input('Website enquiry');
  readonly text = input.required<string>();
  readonly copied = signal(false);
  readonly failed = signal(false);
  readonly mail = computed(() => {
    const to = COMPANY.emails[0];
    return to ? `mailto:${to}?subject=${encodeURIComponent(this.subject())}&body=${encodeURIComponent(this.text())}` : '';
  });
  async copy() {
    this.copied.set(false);
    this.failed.set(false);
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard API is unavailable.');
      await navigator.clipboard.writeText(this.text());
      this.copied.set(true);
    } catch {
      this.failed.set(true);
    }
  }
}
