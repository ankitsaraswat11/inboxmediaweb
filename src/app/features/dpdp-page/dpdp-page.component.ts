import { Component } from '@angular/core';
import { ReadinessComponent } from '../../shared/readiness/readiness.component';
import { PageHeroComponent } from '../../shared/ui/page-hero.component';
import { CtaBandComponent } from '../../shared/ui/cta-band.component';
import { CurvesComponent } from '../../shared/ui/curves.component';

@Component({
  selector: 'app-dpdp-page',
  standalone: true,
  imports: [ReadinessComponent, PageHeroComponent, CtaBandComponent, CurvesComponent],
  template: `
<main id="main" class="dpdp-page">
  <app-page-hero
    [crumbs]="[{ x: 'Services' }, { x: 'Digital Trust', u: '/digital-trust' }, { x: 'DPDP Compliance' }]"
    title="DPDP compliance you can evidence," sub="not just a policy PDF."
    lead="For DPOs, CISOs, compliance heads and CTOs at fintechs, NBFCs, hospitals, schools and enterprises: a readiness programme that maps your personal data, fixes consent and rights handling, and leaves you with proof an auditor can read."
    img="fintech_payment.jpg" alt="Customer entering card details at a laptop, the point of collection where DPDP consent and notice must be captured"
    [primary]="{ x: 'Request a DPDP gap assessment', u: '/contact' }" [secondary]="{ x: 'Take the free readiness check', u: '#readiness-calculator' }">
    <ul class="chips" style="margin-top:28px">@for (c of chips; track c) { <li><span class="chip">{{ c }}</span></li> }</ul>
  </app-page-hero>

  <section class="sec">
    <div class="wrap split">
      <div class="stack">
        <h2>Most DPDP gaps are operational, not legal.</h2>
        <p class="lead">The privacy policy exists. The problem is that nobody can show, for one named customer, where their data sits, what they consented to, and who has touched it since.</p>
        <ul class="ticks ticks--bad">@for (x of signs; track x) { <li>{{ x }}</li> }</ul>
      </div>
      <article class="tile dpdp__why">
        <p class="kicker">Why this matters now</p>
        <h3>Enforcement follows evidence.</h3>
        <p>When a complaint or breach lands, the first questions are simple: what did you collect, on what basis, who did you share it with, and can you prove it? Organisations that answer from a living data map and consent log close the matter. Organisations that answer from inboxes do not.</p>
        <p>If three or more of these signals apply, the ten-question readiness check below shows which compliance area to fix first.</p>
        <div class="tile__foot"><a class="btn btn--primary" href="#readiness-calculator">Run the readiness check</a></div>
      </article>
    </div>
  </section>

  <section class="sec sec--tint">
    <div class="wrap">
      <div class="sec-head sec-head--split">
        <h2>Eight obligations, in plain business terms.</h2>
        <p class="lead">The Digital Personal Data Protection Act, 2023 applies to any organisation that decides why and how the personal data of individuals in India is processed. Here is what it asks of you, without the legal language.</p>
      </div>
      <div class="grid grid--4">
        @for (o of obligations; track o[0]) { <article class="tile"><h3>{{ o[0] }}</h3><p>{{ o[1] }}</p></article> }
      </div>
      <p class="fine" style="margin-top:24px">Penalties for non-compliance exist and are material. We keep the legal detail general on this page; specifics are worked through with your counsel during the engagement.</p>
    </div>
  </section>

  <section class="band band--after-tint" id="readiness-calculator">
    <div class="band__glow" aria-hidden="true"></div>
    <app-curves class="band__art on-dark" [cx]="500" [cy]="500" [start]="80" [step]="56" [count]="9" />
    <div class="wrap on-dark">
      <div class="sec-head sec-head--center">
        <p class="kicker">Free tool</p>
        <h2>DPDP readiness calculator</h2>
        <p class="lead">Ten questions across five compliance areas. Takes about five minutes. Your readiness score and a category-by-category breakdown appear immediately, and nothing is sent anywhere.</p>
      </div>
      <app-readiness />
    </div>
  </section>

  <section class="sec">
    <div class="wrap split split--center">
      <div class="stack">
        <h2>You must keep it. They can ask you to delete it. Both are true.</h2>
        <p class="muted">RBI, IRDAI, SEBI, income-tax and labour rules require you to retain KYC records, transaction logs, policy documents and employee files for years. The DPDP Act gives the same individuals a right to erasure and to withdraw consent. Organisations that treat this as a contradiction freeze. Organisations that document it move on.</p>
        <p class="muted">The resolution is a written retention-vs-erasure policy that records, for every category of personal data, the purpose, the legal basis, the mandated retention period and its source, and exactly what happens when consent is withdrawn.</p>
        <ul class="ticks">@for (x of tension; track x) { <li>{{ x }}</li> }</ul>
        <div class="btn-row"><a class="btn btn--primary" href="/contact">Discuss a retention policy</a></div>
      </div>
      <img class="dpdp__img" src="/images/finance_skyline.jpg" alt="Financial district towers representing banks, NBFCs and fintechs subject to both RBI retention rules and DPDP obligations" loading="lazy" width="900" height="1100">
    </div>
  </section>

  <section class="sec sec--tint">
    <div class="wrap">
      <div class="sec-head sec-head--split">
        <h2>Six deliverables. Each one is something you can hand to an auditor.</h2>
        <p class="lead">We do not deliver a slide deck of findings. We deliver the artefacts that make compliance operational, and the evidence that it is running.</p>
      </div>
      <div class="split split--center" style="margin-bottom:clamp(36px,5vw,56px)">
        <div class="stack"><h3>How we scope it</h3><ul class="ticks">@for (x of scope; track x) { <li>{{ x }}</li> }</ul></div>
        <img class="dpdp__img dpdp__img--wide" src="/images/office_glass.jpg" alt="Glass-walled office corridor representing organisation-wide governance and compliance operations" loading="lazy" width="900" height="600">
      </div>
      <div class="grid grid--3">
        @for (d of deliverables; track d[0]; let k = $index) {
          <article class="tile"><span class="tile__num">Deliverable 0{{ k + 1 }}</span><h3>{{ d[0] }}</h3><p>{{ d[1] }}</p></article>
        }
      </div>
      <p class="note">Most programmes stall on retention versus erasure: putting a retention clock on every data element when the RBI or IRDAI rule and the erasure right point in opposite directions. The data map in Deliverable 01 is where we resolve it, element by element.</p>
    </div>
  </section>

  <section class="sec">
    <div class="wrap">
      <div class="sec-head"><h2>A checklist gets you past the first audit. Continuous readiness gets you past the second.</h2></div>
      <div class="grid grid--2">
        <article class="tile"><h3>Checklist compliance</h3><ul class="ticks ticks--bad">@for (x of cmpA; track x) { <li>{{ x }}</li> }</ul></article>
        <article class="tile tile--accent"><h3>Continuous readiness with Ankit Global</h3><ul class="ticks">@for (x of cmpB; track x) { <li>{{ x }}</li> }</ul></article>
      </div>
    </div>
  </section>

  <section class="sec sec--tint">
    <div class="wrap split">
      <div class="stack">
        <h2>From gap assessment to steady state in about twelve weeks.</h2>
        <p class="lead">Timelines assume a mid-sized organisation with 10–20 systems holding personal data. Larger estates extend the remediation sprint, not the method.</p>
      </div>
      <ol class="steps">
        @for (t of steps; track t[0]; let k = $index) {
          <li><span class="steps__n">0{{ k + 1 }}</span><div><h3>{{ t[0] }}</h3><p>{{ t[1] }}</p></div></li>
        }
      </ol>
    </div>
  </section>

  <section class="sec" id="sectors">
    <div class="wrap">
      <div class="sec-head sec-head--split">
        <h2>The same Act. Very different obligations on the ground.</h2>
        <p class="lead">A lender’s hardest problem is reconciling KYC retention with erasure. A hospital’s is consent across labs, insurers and apps. A school’s is that almost every data principal is a child. We start from your sector’s pressure point.</p>
      </div>
      <div class="grid grid--3">
        @for (x of sectors; track x[2]) { <a class="tile" href="/contact"><h3>{{ x[0] }}</h3><p>{{ x[1] }}</p><span class="tile__foot tlink">Ask about {{ x[0] }}</span></a> }
        <a class="tile" href="/dpdp-enforcement-tracker"><h3>Enforcement tracker</h3><p>A source-first tracker of DPDP notifications, CERT-In directions and related precedents.</p><span class="tile__foot tlink">Open the tracker</span></a>
        <a class="tile" href="/dpdp-gap-assessment"><h3>Free gap assessment</h3><p>Ten questions, five areas, instant score and category breakdown. Nothing leaves your browser.</p><span class="tile__foot tlink">Start now</span></a>
      </div>
    </div>
  </section>

  <section class="sec sec--tint">
    <div class="wrap">
      <div class="sec-head"><h2>Compliance, security and AI from one team.</h2></div>
      <div class="grid grid--4">
        @for (w of why; track w[0]) { <article class="tile"><h3>{{ w[0] }}</h3><p>{{ w[1] }}</p></article> }
      </div>
      <div class="split split--center" style="margin-top:clamp(32px,4vw,48px)">
        <p class="lead">Two weeks of gap assessment tells you which of the eight obligations you are actually exposed on, ranked by exposure. In our experience the answer is more often processors or retention than notices.</p>
        <div class="btn-row"><a class="btn btn--primary" href="/contact#assessment">Request the two-week gap assessment</a></div>
      </div>
    </div>
  </section>

  <section class="sec">
    <div class="wrap split">
      <div class="stack"><h2>Frequently asked questions</h2><p class="muted">Still unsure where to start? <a class="tlink" href="/contact">Ask the team</a></p></div>
      <div class="faq">@for (f of faq; track f[0]) { <details><summary>{{ f[0] }}</summary><p>{{ f[1] }}</p></details> }</div>
    </div>
  </section>

  <app-cta-band prefix="Make sure your customer data" lead="Know your DPDP gaps before the Board or a customer finds them. Start with a scoped two-week gap assessment, or run the free readiness check first." [secondary]="{ x: 'Take the readiness check', u: '#readiness-calculator' }" />
</main>`,
})
export class DpdpPageComponent {
 chips=['Gap Assessment','Consent & Notice Design','Rights-Request Operations','Breach Playbook','Retention vs Erasure'];
 signs=['Consent is a checkbox in the onboarding form. There is no record of which version of the notice the customer actually saw.','A customer asks what data you hold on them, and the answer takes three departments and two weeks.','Nobody can list every vendor, cloud service and analytics tool that personal data flows to.','Marketing, collections and product teams reuse KYC or patient data for purposes it was never collected for.','Retention policy is “keep everything”, because finance says the regulator might ask.','Breach response lives in a security runbook that never mentions notifying affected individuals or the Board.','Your school, hospital or app collects children’s data with no separate parental-consent path.'];
 obligations=[['Consent & lawful basis','Process personal data only with free, specific, informed consent — or under a narrow set of legitimate uses. Withdrawing consent must be as easy as giving it.'],['Notice','Before or with the consent request, tell people in plain language what you collect, why, how they can exercise their rights, and how to complain.'],['Data principal rights','Individuals can ask what you hold, have it corrected or erased, nominate someone to act for them, and expect a working grievance channel with a response.'],['Data fiduciary duties','Keep data accurate, protect it with reasonable security safeguards, use it only for the stated purpose, and delete it when that purpose is served.'],['Breach notification','Report personal data breaches to the Data Protection Board and to affected individuals in the prescribed form and timeframe — every breach, not only large ones.'],['Children’s data','Verifiable parental consent before processing a child’s data, and no tracking, behavioural monitoring or targeted advertising directed at children.'],['Significant Data Fiduciaries','Organisations notified as significant because of data volume or sensitivity carry extra duties: an independent data auditor, periodic impact assessments and a resident Data Protection Officer.'],['Processors & vendors','You stay accountable for personal data handled by processors on your behalf. Contracts, not assumptions, define what they may do with it and when they must delete it.']];
 tension=['Data-element register mapped to each retention source (RBI KYC rules, tax law, HR statute) and its expiry clock','Withdrawal workflow that halts marketing, profiling and cross-sell within a defined SLA while preserving what law requires','Erasure exceptions documented in a form defensible to both the sectoral regulator and the Data Protection Board','Automated deletion on expiry, with an evidence trail that shows it happened'];
 scope=['Scoped to your data footprint: 10–20 systems for a mid-sized firm, more for group structures','Led by a named engagement lead with your compliance head as counterpart','Security controls verified by the same team that runs VAPT and incident response','AI systems, prompt logs and model vendors mapped as personal-data flows from day one'];
 deliverables=[['Data map & inventory','Every system, vendor and data flow that touches personal data, with category, purpose, legal basis, owner and retention clock. Maintained as a living register, not a spreadsheet nobody opens.'],['Consent & notice design','Layered, plain-language notices and consent capture at each collection point — app, branch, web, call centre — versioned so you can prove what a person saw and agreed to.'],['Rights-request process','One intake channel, identity verification, routing to data owners, SLA tracking and templated responses for access, correction, erasure and nomination requests.'],['Breach playbook','Detection-to-notification runbook with severity triage, a decision tree for Board and individual notification, communication templates, and a tabletop exercise with your incident team.'],['Vendor contracts & processor controls','Standard data-processing clauses, a risk-tiered vendor register, and a review of existing agreements for gaps in sub-processing, cross-border transfer and deletion commitments.'],['Evidence store','Policies, approvals, training logs, consent records and rights-request history captured in Avisha Trust — so the answer to “show me” takes minutes, not a scramble.']];
 cmpA=['Policies written once, unchanged as products, vendors and AI tools change','Consent records buried in application databases nobody can query per person','Rights requests handled by whoever happens to receive the email','Breach plan untested until the day it is needed','Evidence reconstructed from inboxes when the regulator or a customer asks'];
 cmpB=['Living data map updated as systems, vendors and models change','Versioned consent and notice records searchable for any individual','Rights requests tracked against SLAs with a full audit trail','Breach playbook rehearsed; notification templates ready to send','Evidence captured continuously in Avisha Trust, ready on request'];
 steps=[['Week 1–2 · Gap assessment','Interviews with product, IT, HR, marketing and vendor owners. Data-flow discovery across systems. Output: a scored gap report against every DPDP obligation, ranked by exposure.'],['Week 3–6 · Remediation sprint','Close the highest-risk gaps first: retention-vs-erasure policy, processor contracts, breach playbook, grievance-officer or DPO designation. Weekly steering with your compliance lead.'],['Week 7–12 · Consent & rights operations','Roll out redesigned notices and consent capture at collection points, stand up the rights-request desk, train front-line and data-owner teams, run a breach tabletop.'],['Ongoing · Monitoring via Avisha Trust','Consent, rights SLAs, vendor reviews and policy attestations tracked on one dashboard, with quarterly reviews as data flows and AI usage change.']];
 sectors=[['Fintech','DPDP for payments and lending','dpdp-fintech'],['NBFC','DPDP for RBI-regulated NBFCs','dpdp-nbfc'],['Insurance','DPDP for IRDAI-regulated insurers','dpdp-insurance'],['Registered Broker','DPDP for SEBI-registered brokers','dpdp-broker'],['HealthTech','DPDP for digital health','dpdp-healthtech'],['Hospital','DPDP for hospitals and clinical establishments','dpdp-hospital'],['EdTech','DPDP for education platforms','dpdp-edtech'],['E-Commerce','DPDP for online retail','dpdp-ecommerce'],['HR Tech','DPDP for workforce platforms','dpdp-hrtech'],['SaaS','DPDP for software companies','dpdp-saas']];
 why=[['Security and compliance under one roof','The breach playbook is written by people who run VAPT and incident response, not only by policy authors. “Reasonable security safeguards” are tested, not assumed.'],['Product-backed evidence','Avisha Trust captures consent, rights requests and attestations continuously. The Avisha Trust Seal signals your posture publicly — scoped, dated, and backed by the assessment behind it.'],['Built for the Indian regulatory stack','We reconcile DPDP with RBI, IRDAI, SEBI, CERT-In and tax obligations rather than importing a GDPR template and hoping it fits.'],['AI usage in scope from day one','Training data, prompt logs and AI vendors are mapped as personal-data flows, because that is where the next generation of gaps is forming.']];
 faq=[['What is the DPDP Act?','The Digital Personal Data Protection Act, 2023 is India’s data protection law. It governs how organisations collect, process, store, share and delete the personal data of individuals in India. It sets out duties for data fiduciaries (who decide the purpose of processing) and data processors, rights for individuals, rules on consent and notice, breach notification requirements, and penalties for non-compliance.'],['Who needs to comply with the DPDP Act?','Any organisation that processes the personal data of individuals in India — as a data fiduciary or a processor acting for one. That includes banks, NBFCs, fintechs, insurers, hospitals and diagnostics chains, schools and universities, e-commerce and SaaS companies, and employers processing staff data. Larger or more sensitive processors may additionally be notified as Significant Data Fiduciaries with extra duties.'],['What does a DPDP readiness assessment cover?','Our two-week gap assessment interviews system and process owners, discovers where personal data actually flows, and scores you against every obligation: consent and notice, data principal rights, fiduciary duties, breach readiness, children’s data, significant data fiduciary duties, vendor and processor contracts, and retention versus erasure. You receive a ranked gap report and a remediation plan you can run with us or on your own.'],['How long does DPDP compliance implementation take?','A typical programme runs about twelve weeks: two weeks of gap assessment, a four-week remediation sprint, and six weeks standing up consent and rights operations. Group structures with many systems or several regulated entities run longer — usually because remediation takes more sprints, not because the method changes. Monitoring then continues through Avisha Trust.'],['Does DPDP compliance require new software?','Not always. Many gaps close through policy, process and contract changes. Where consent records, rights-request SLAs and audit evidence need to be tracked continuously, a platform such as Avisha Trust removes the manual overhead — but we scope it only where it earns its place, and it is never a precondition for working with us.'],['What do you need from us, and is our data safe during the engagement?','An executive sponsor, a named compliance counterpart, and access to system and process owners for interviews. We work from your data map and samples rather than bulk exports, under NDA and within your access controls; where system access is required it is scoped, logged and revoked at the end. You own every policy, register and playbook we produce.']];
}