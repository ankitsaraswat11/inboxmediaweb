import { Component, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CurvesComponent } from '../../shared/ui/curves.component';
import { IconComponent } from '../../shared/ui/icon.component';
import { EnquiryResultComponent } from '../../shared/ui/enquiry-result.component';

/** Book a demo — laid out like aishield.security/request-a-demo: benefits on the left, form on the right. */
@Component({
  selector: 'app-book-demo',
  standalone: true,
  imports: [FormsModule, CurvesComponent, IconComponent, EnquiryResultComponent],
  template: `
<main id="main" class="book-demo">
  <section class="phero" style="padding-bottom:clamp(64px,8vw,112px)">
    <app-curves class="phero__art" [cx]="640" [cy]="420" [draw]="true" />
    <div class="wrap demo" style="position:relative">
      <div class="demo__copy">
        <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">Book a demo</span></nav>
        <h1>Ankit Global demo</h1>
        <p class="lead">See our products and services with your own use case: AI security, digital trust and the platforms we run in production.</p>
        <ul class="demo__list">
          @for (b of benefits; track b.t) { <li><span class="tile__icon"><app-icon [name]="b.i" [size]="22" /></span><div><b>{{ b.t }}</b><span>{{ b.d }}</span></div></li> }
        </ul>
      </div>

      <form class="form" #f="ngForm" (ngSubmit)="submit(f)" novalidate>
        <h2>We’re excited to give you a demo.</h2>
        <div class="form__grid">
          <label><span>First name <span class="req" aria-hidden="true">*</span></span>
            <input name="first" [(ngModel)]="form.first" required #first="ngModel" autocomplete="given-name" />
            @if (first.invalid && (first.touched || submitted())) { <small class="error">Enter your first name.</small> }</label>
          <label><span>Last name <span class="req" aria-hidden="true">*</span></span>
            <input name="last" [(ngModel)]="form.last" required #last="ngModel" autocomplete="family-name" />
            @if (last.invalid && (last.touched || submitted())) { <small class="error">Enter your last name.</small> }</label>
          <label><span>Official email <span class="req" aria-hidden="true">*</span></span>
            <input name="email" type="email" [(ngModel)]="form.email" required email #email="ngModel" autocomplete="email" placeholder="you@company.com" />
            @if (email.invalid && (email.touched || submitted())) { <small class="error">Enter a valid work email.</small> }</label>
          <label><span>Company name <span class="req" aria-hidden="true">*</span></span>
            <input name="company" [(ngModel)]="form.company" required #comp="ngModel" autocomplete="organization" />
            @if (comp.invalid && (comp.touched || submitted())) { <small class="error">Enter your company.</small> }</label>
          <label><span>Job title</span><input name="role" [(ngModel)]="form.role" autocomplete="organization-title" /></label>
          <label><span>Phone number</span><input name="phone" type="tel" [(ngModel)]="form.phone" autocomplete="tel" /></label>
        </div>
        <label><span>Which product or service are you interested in? <span class="req" aria-hidden="true">*</span></span>
          <select name="product" [(ngModel)]="form.product" required #product="ngModel">
            <option value="" disabled>Select one</option>
            @for (o of products; track o) { <option [value]="o">{{ o }}</option> }
          </select>
          @if (product.invalid && (product.touched || submitted())) { <small class="error">Choose a product or service.</small> }</label>
        <label><span>Anything we should know before the demo?</span>
          <textarea name="notes" [(ngModel)]="form.notes" rows="4" placeholder="Your use case, systems or timeline"></textarea></label>
        <div><button class="btn btn--primary" type="submit">Request a demo</button></div>
        @if (status() === 'invalid') { <p class="form__status form__status--bad" role="alert">Complete the required fields above to continue.</p> }
        @if (status() === 'ready') { <app-enquiry-result heading="Your demo request is ready." subject="Demo request" [text]="summary()" /> }
        <p class="fine">Your details are checked in your browser before you continue.</p>
      </form>
    </div>
  </section>
</main>`,
})
export class BookDemoComponent {
  readonly benefits = [
    { i: 'target', t: 'Your use case, not a slide deck', d: 'We walk through the product or assessment against the systems you actually run.' },
    { i: 'shield', t: 'Security and compliance in the same room', d: 'AI, security and DPDP specialists answer questions together.' },
    { i: 'link', t: 'Fits what you already have', d: 'How it works with your clouds, identity and existing workflows.' },
  ];
  readonly products = ['CuraOS (healthcare)', 'Study24by7 (education)', 'Avisha Trust (consent & evidence)', 'Avisha Trust Seal', 'AI security review / red teaming', 'DPDP gap assessment', 'Managed AI or managed security', 'Something else'];
  readonly form = { first: '', last: '', email: '', company: '', role: '', phone: '', product: '', notes: '' };
  readonly submitted = signal(false);
  readonly status = signal<'idle' | 'invalid' | 'ready'>('idle');
  readonly summary = signal('');

  submit(f: NgForm) {
    this.submitted.set(true);
    if (f.valid !== true) { this.status.set('invalid'); f.control.markAllAsTouched(); return; }
    const x = this.form;
    this.summary.set([
      'Ankit Global demo request',
      `Name: ${x.first} ${x.last}`, `Email: ${x.email}`, `Company: ${x.company}`,
      `Job title: ${x.role || 'Not provided'}`, `Phone: ${x.phone || 'Not provided'}`, `Interested in: ${x.product}`,
      '', 'Notes:', x.notes || 'None',
    ].join('\n'));
    this.status.set('ready');
  }
}
