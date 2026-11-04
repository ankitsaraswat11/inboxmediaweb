import { Component, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { COMPANY } from '../../core/data/data';
import { PageHeroComponent } from '../../shared/ui/page-hero.component';
import { IconComponent } from '../../shared/ui/icon.component';
import { EnquiryResultComponent } from '../../shared/ui/enquiry-result.component';

/** Contact — laid out like aishield.security/contact-us: “Let’s talk”, details + form, then resources. */
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, PageHeroComponent, IconComponent, EnquiryResultComponent],
  template: `
<main id="main" class="contact-page">
  <app-page-hero [crumbs]="[{ x: 'Company', u: '/about' }, { x: 'Contact' }]"
    title="Let’s talk"
    lead="Ankit Global brings AI, security and digital trust together under one team. Tell us what you’re working on and we’ll suggest a practical next step." />

  <section class="sec">
    <div class="wrap split">
      <div class="stack contact__copy">
        <h2>Start a conversation</h2>
        <p class="lead">Share the challenge you’re working on, the service you’re exploring, or the outcome you want to achieve.</p>
        @if (company.address || company.emails.length || company.linkedin) {
          <dl class="details">
            @if (company.address) { <div><dt>Address</dt><dd>{{ company.address }}</dd></div> }
            @if (company.emails.length) { <div><dt>Email</dt><dd>@for (e of company.emails; track e) { <a [href]="'mailto:' + e">{{ e }}</a> }</dd></div> }
            @if (company.linkedin) { <div><dt>Social</dt><dd><a [href]="company.linkedin" target="_blank" rel="noopener">LinkedIn</a></dd></div> }
          </dl>
        }
        <ul class="contact__links">
          @for (l of links; track l.u) {
            <li><a [href]="l.u"><span class="tile__icon"><app-icon [name]="l.i" [size]="22" /></span><span><b>{{ l.t }}</b><small>{{ l.d }}</small></span></a></li>
          }
        </ul>
      </div>

      <form id="assessment" class="form" #f="ngForm" (ngSubmit)="submit(f)" novalidate>
        <h2>Tell us about your project</h2>
        <div class="form__grid">
          <label><span>Work email <span class="req" aria-hidden="true">*</span></span>
            <input name="email" type="email" [(ngModel)]="form.email" required email #email="ngModel" autocomplete="email" placeholder="you@company.com" />
            @if (email.invalid && (email.touched || submitted())) { <small class="error">Enter a valid work email.</small> }</label>
          <label><span>Company <span class="req" aria-hidden="true">*</span></span>
            <input name="company" [(ngModel)]="form.company" required #comp="ngModel" autocomplete="organization" placeholder="Company name" />
            @if (comp.invalid && (comp.touched || submitted())) { <small class="error">Enter your company.</small> }</label>
          <label><span>First name <span class="req" aria-hidden="true">*</span></span>
            <input name="first" [(ngModel)]="form.first" required #first="ngModel" autocomplete="given-name" />
            @if (first.invalid && (first.touched || submitted())) { <small class="error">Enter your first name.</small> }</label>
          <label><span>Last name <span class="req" aria-hidden="true">*</span></span>
            <input name="last" [(ngModel)]="form.last" required #last="ngModel" autocomplete="family-name" />
            @if (last.invalid && (last.touched || submitted())) { <small class="error">Enter your last name.</small> }</label>
          <label><span>Designation</span><input name="role" [(ngModel)]="form.role" autocomplete="organization-title" /></label>
          <label><span>What kind of help are you looking for?</span>
            <select name="service" [(ngModel)]="form.service">
              <option value="">Select an area</option>
              @for (o of services; track o) { <option [value]="o">{{ o }}</option> }
            </select></label>
        </div>
        <label><span>What can we help you with? <span class="req" aria-hidden="true">*</span></span>
          <textarea name="message" [(ngModel)]="form.message" required minlength="10" rows="5" #message="ngModel" placeholder="Tell us about your goals or challenge"></textarea>
          @if (message.invalid && (message.touched || submitted())) { <small class="error">Add at least 10 characters.</small> }</label>
        <div><button class="btn btn--primary" type="submit">Send</button></div>
        @if (status() === 'invalid') { <p class="form__status form__status--bad" role="alert">Complete the required fields above to continue.</p> }
        @if (status() === 'ready') { <app-enquiry-result [text]="summary()" subject="Website enquiry" /> }
        <p class="fine">Your details are checked in your browser before you continue.</p>
      </form>
    </div>
  </section>

  <section class="sec sec--tint">
    <div class="wrap">
      <div class="sec-head sec-head--split"><h2>Happenings in AI security and digital trust</h2><p class="lead">Guides, tools and trackers from the Ankit Global team.</p></div>
      <div class="grid grid--3">
        @for (r of resources; track r.u) {
          <a class="rcard" [href]="r.u">
            <img [src]="'/images/' + r.img" alt="" loading="lazy" width="640" height="360">
            <div class="rcard__body"><p class="rcard__meta"><span>{{ r.k }}</span></p><h3>{{ r.t }}</h3><span class="tlink">{{ r.cta }}</span></div>
          </a>
        }
      </div>
    </div>
  </section>
</main>`,
})
export class ContactComponent {
  readonly company = COMPANY;
  readonly form = { email: '', company: '', first: '', last: '', role: '', service: '', message: '' };
  readonly services = ['DPDP Compliance', 'AI Consulting & Automation', 'AI Security', 'Cybersecurity', 'Digital Trust & Governance', 'Products (CuraOS, Study24by7, Avisha Trust)', 'Partnerships', 'Careers', 'Other'];
  readonly links = [
    { i: 'spark', t: 'Book a product demo', d: 'CuraOS, Study24by7, Avisha Trust and the Trust Seal', u: '/book-a-demo' },
    { i: 'check', t: 'Free DPDP readiness check', d: 'Ten questions, instant score, nothing sent', u: '/dpdp-gap-assessment' },
    { i: 'shield', t: 'AI security reviews', d: 'Red teaming, prompt injection and model risk', u: '/ai-security' },
  ];
  readonly resources = [
    { k: 'Free tool', t: 'DPDP readiness check: ten questions, five compliance areas', u: '/dpdp-gap-assessment', cta: 'Start the check', img: 'fintech_payment.jpg' },
    { k: 'Guides', t: 'Whitepapers on DPDP readiness, AI security and digital trust', u: '/whitepapers', cta: 'See the guides', img: 'dashboard_1.jpg' },
    { k: 'Tracker', t: 'DPDP enforcement tracker: sources, not speculation', u: '/dpdp-enforcement-tracker', cta: 'Open the tracker', img: 'finance_skyline.jpg' },
  ];

  readonly submitted = signal(false);
  readonly status = signal<'idle' | 'invalid' | 'ready'>('idle');
  readonly summary = signal('');

  submit(f: NgForm) {
    this.submitted.set(true);
    if (f.valid !== true) { this.status.set('invalid'); f.control.markAllAsTouched(); return; }
    const x = this.form;
    this.summary.set([
      'Ankit Global enquiry',
      `Name: ${x.first} ${x.last}`, `Email: ${x.email}`, `Company: ${x.company}`,
      `Designation: ${x.role || 'Not provided'}`, `Area: ${x.service || 'Not specified'}`, '', 'Message:', x.message,
    ].join('\n'));
    this.status.set('ready');
  }
}
