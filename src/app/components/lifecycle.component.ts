import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, NgZone, OnDestroy, ViewChild, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PLATFORMS, PlatformSlug } from '../content/platforms';

/* =====================================================================
   PLATFORM JOURNEY (homepage)
   A pinned, scroll-driven walk through the three platforms:
     01 Communication → SUTRA   (channel hub: messages fan out to every channel)
     02 AI            → MEDHA   (AI tech stack → MEDHA core → the five AI products)
     03 Compliance & Security → KAVACH (shield drawing in, controls switching on)

   Movable: a vertical rail on the left. Drag its marker up/down, click a
   platform, or use the arrow keys, and the page scrolls to that platform.
   Below 900px it becomes a stacked list (no pinning).
   ===================================================================== */

interface Stage { slug: PlatformSlug; area: string; name: string; hi: string; descriptor: string; text: string; chips: string[]; link: string; }

const P = (s: PlatformSlug) => PLATFORMS.find(p => p.slug === s)!;
const mk = (slug: PlatformSlug, area: string, text: string, chips: string[]): Stage => {
  const p = P(slug);
  return { slug, area, name: p.name, hi: p.hi, descriptor: p.descriptor, text, chips, link: '/platforms/' + slug };
};

export const STAGES: Stage[] = [
  mk('sutra', 'Communication', 'SMS, OTP, WhatsApp, RCS, voice and email run on one compliant communication fabric, so every customer is reached on the channel they actually use.', ['SMS & OTP', 'WhatsApp API', 'RCS', 'IVR & Voice']),
  mk('medha', 'Artificial Intelligence', 'AI voice agents and chatbots understand intent, reply in your customer’s language and complete the task, handing over to a person only when needed.', ['AI agents', 'Voice AI', 'Multilingual', 'Custom SLM']),
  mk('kavach', 'Compliance & Security', 'Consent, encryption, access control and audit trails are built into every flow, with DPDP compliance and AI governance from day one.', ['DPDP', 'Consent', 'Encryption', 'Audit logs'])
];

const CHANNELS = ['SMS', 'WhatsApp', 'RCS', 'Voice', 'Email', 'Push'];
const TOASTS = [
  { ch: 'SMS', t: 'OTP sent on a DLT-approved template' },
  { ch: 'WhatsApp', t: 'Order shipped: tracking link shared' },
  { ch: 'Voice', t: 'Payment reminder call completed' }
];
/* MEDHA map (viewBox 600 x 460): the AI tech MEDHA uses → MEDHA core → the five AI products it powers. */
const MD_TECH = ['LLMs', 'SLMs', 'NLP', 'Voice AI', 'Sentiment Analysis', 'Multilingual AI'];
const MD_PRODUCTS = [
  { n: 'Aura AI', r: 'Voice & avatar assistant' },
  { n: 'Tellco', r: 'Calls, leads & bookings' },
  { n: 'Custom SLM', r: 'Domain language models' },
  { n: 'TrainExl', r: 'SOPs into microlearning' },
  { n: 'Edge AI', r: 'On-premise & offline AI' }
];
const MD_C = { x: 300, y: 240 };
const mdCol = (n: number, top: number, bottom: number) => Array.from({ length: n }, (_, i) => top + (bottom - top) * i / (n - 1));
const mdCurve = (x1: number, y1: number, x2: number, y2: number) => { const m = (x1 + x2) / 2; return `M${x1} ${y1} C${m} ${y1} ${m} ${y2} ${x2} ${y2}`; };
const MD_TECH_POS = mdCol(MD_TECH.length, 80, 400).map(y => ({ x: 92, y, d: mdCurve(150, y, MD_C.x - 58, MD_C.y) }));
const MD_PROD_POS = mdCol(MD_PRODUCTS.length, 92, 388).map(y => ({ x: 500, y, d: mdCurve(MD_C.x + 58, MD_C.y, 428, y) }));
const CONTROLS = ['Consent captured & logged', 'Data encrypted in transit & at rest', 'Role-based access control', 'Audit trail for every action', 'DPDP obligations mapped', 'AI governance (ISO 42001 readiness)'];

@Component({
  selector: 'app-lifecycle',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<!-- ===== Desktop: pinned, scroll-driven ===== -->
<div class="pj" #track [style.height.vh]="stages.length * 110 + 20" [style.--c]="'var(--' + cur().slug + ')'" [style.--t]="'var(--' + cur().slug + '-tint)'">
  <div class="stick">
    <div class="wrap grid">

      <!-- left: vertical, movable rail of platforms -->
      <div class="side">
        <p class="eyebrow">Three platforms · one connected enterprise</p>
        <div class="rail-wrap" #rw>
          <div class="rail" #rail (pointerdown)="down($event)" aria-hidden="true"><span class="fill" #fill></span></div>
          <span class="knob" #knob role="slider" tabindex="0" aria-label="Platform" aria-valuemin="1" [attr.aria-valuemax]="stages.length" [attr.aria-valuenow]="stage() + 1" [attr.aria-valuetext]="cur().name + ', ' + cur().area" (keydown)="key($event)" (pointerdown)="down($event)"></span>
          <ol class="steps" (transitionend)="relayout()">
            @for (s of stages; track s.slug; let i = $index) {
              <li class="st" [class.on]="i === stage()" [class.done]="i < stage()" [style.--c]="'var(--' + s.slug + ')'">
                <span class="sdot"></span>
                <button type="button" class="stbtn" (click)="goTo(i)" [attr.aria-current]="i === stage()">
                  <span class="area"><em>0{{ i + 1 }}</em>{{ s.area }}</span>
                  <span class="wm">{{ s.name }} <span lang="hi">{{ s.hi }}</span></span>
                </button>
                <div class="more"><div>
                  <p class="desc"><b>{{ s.descriptor }}.</b> {{ s.text }}</p>
                  <ul class="chips">@for (c of s.chips; track c) { <li class="chip">{{ c }}</li> }</ul>
                  <a class="go" [routerLink]="s.link" [tabindex]="i === stage() ? 0 : -1">Explore {{ s.name }} <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>
                </div></div>
              </li>
            }
          </ol>
        </div>
        <p class="hint"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M7 10l5-5 5 5M7 14l5 5 5-5"/></svg>Scroll, or drag the marker to switch platforms</p>
      </div>

      <!-- right: live stage window -->
      <div class="win" aria-hidden="true">
        <div class="bar">
          <span class="dots"><i></i><i></i><i></i></span>
          <span class="ttl"><b>{{ cur().name }}</b> · {{ cur().descriptor }}</span>
          <span class="live">Live</span>
        </div>
        <div class="body">

          <!-- 01 SUTRA: channel hub -->
          <div class="v hub" [class.on]="stage() === 0">
            <svg viewBox="0 0 600 460" class="hsvg">
              <circle cx="300" cy="230" r="175" class="ring"/>
              <circle cx="300" cy="230" r="118" class="ring r2"/>
              @for (n of hubNodes; track n.label; let j = $index) {
                <path class="spoke" [class.lit]="stage() === 0 && step() > j * 2" [attr.d]="n.path"/>
                @if (stage() === 0) {
                  <circle r="5" class="pk"><animateMotion [attr.path]="n.path" dur="1.8s" [attr.begin]="(j * .3) + 's'" repeatCount="indefinite"/></circle>
                }
              }
            </svg>
            <span class="core"><b>SUTRA</b><small>सूत्र</small></span>
            @for (n of hubNodes; track n.label; let j = $index) {
              <span class="node" [class.lit]="stage() === 0 && step() > j * 2" [style.left.%]="n.x" [style.top.%]="n.y"><i></i>{{ n.label }}</span>
            }
            <div class="toasts">
              @for (t of toasts; track t.t; let k = $index) {
                <div class="toast" [class.in]="stage() === 0 && step() > 6 + k * 4"><b>{{ t.ch }}</b><span>{{ t.t }}</span><em>Delivered</em></div>
              }
            </div>
          </div>

          <!-- 02 MEDHA: tech stack → core → products -->
          <div class="v brain" [class.on]="stage() === 1">
            <div class="nn">
              <div class="nnbox">
                <svg viewBox="0 0 600 460" class="nnsvg">
                  <text x="92" y="40" class="lyr">AI we use</text>
                  <text x="500" y="40" class="lyr">AI products</text>
                  @for (t of mdTechPos; track $index; let k = $index) {
                    <path class="syn" [class.lit]="stage() === 1 && step() > k" [attr.d]="t.d"/>
                    @if (stage() === 1 && step() > k) {
                      <circle r="3.5" class="sig"><animateMotion [attr.path]="t.d" dur="1.8s" [attr.begin]="(k * .25) + 's'" repeatCount="indefinite"/></circle>
                    }
                  }
                  @for (q of mdProdPos; track $index; let k = $index) {
                    <path class="syn" [class.lit]="stage() === 1 && step() > 7 + k * 2" [attr.d]="q.d"/>
                    @if (stage() === 1 && step() > 7 + k * 2) {
                      <circle r="3.5" class="sig"><animateMotion [attr.path]="q.d" dur="1.8s" [attr.begin]="(k * .25) + 's'" repeatCount="indefinite"/></circle>
                    }
                  }
                </svg>
                @for (t of mdTech; track t; let k = $index) {
                  <span class="nin" [class.lit]="stage() === 1 && step() > k" [style.left.%]="mdTechPos[k].x / 6" [style.top.%]="mdTechPos[k].y / 4.6"><i></i>{{ t }}</span>
                }
                <span class="mcore" [class.lit]="stage() === 1 && step() > 5" [style.left.%]="mdC.x / 6" [style.top.%]="mdC.y / 4.6">
                  <span class="mring"></span><span class="mring m2"></span>
                  <b>MEDHA</b><small lang="hi">मेधा</small>
                </span>
                @for (o of mdProducts; track o.n; let k = $index) {
                  <span class="nout" [class.lit]="stage() === 1 && step() > 7 + k * 2" [style.left.%]="mdProdPos[k].x / 6" [style.top.%]="mdProdPos[k].y / 4.6"><b>{{ o.n }}</b><small>{{ o.r }}</small></span>
                }
              </div>
            </div>
            <div class="verdict">
              <span><b class="vk">{{ mdLive() }}</b>/{{ mdProducts.length }} AI products live</span>
              <span class="res" [class.in]="stage() === 1 && step() > 16">Runs on cloud, on-premise or Edge</span>
            </div>
          </div>

          <!-- 03 KAVACH: shield + controls -->
          <div class="v trust" [class.on]="stage() === 2">
            <div class="shield">
              <span class="pr"></span><span class="pr p2"></span>
              <svg viewBox="0 0 120 140">
                <path class="sb" d="M60 6l48 18v38c0 32-21 56-48 70C33 118 12 94 12 62V24z"/>
                <path class="sd" pathLength="1000" d="M60 6l48 18v38c0 32-21 56-48 70C33 118 12 94 12 62V24z"/>
                <path class="ck" [class.in]="stage() === 2 && step() > 15" pathLength="100" d="M40 70l14 14 28-30"/>
              </svg>
              <b>KAVACH <small>कवच</small></b>
            </div>
            <ul class="ctrls">
              @for (c of controls; track c; let k = $index) {
                <li [class.in]="stage() === 2 && step() > k * 3"><span class="tg"><i></i></span>{{ c }}</li>
              }
              <li class="sum"><b>{{ activeControls() }}</b>/{{ controls.length }} controls active</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  </div>
</div>

<!-- ===== Mobile: stacked list ===== -->
<ol class="pjm">
  @for (s of stages; track s.slug; let i = $index) {
    <li [style.--c]="'var(--' + s.slug + ')'" [style.--t]="'var(--' + s.slug + '-tint)'">
      <span class="area"><em>0{{ i + 1 }}</em>{{ s.area }}</span>
      <span class="wm">{{ s.name }} <span lang="hi">{{ s.hi }}</span></span>
      <p class="desc"><b>{{ s.descriptor }}.</b> {{ s.text }}</p>
      <ul class="chips">@for (c of s.chips; track c) { <li class="chip">{{ c }}</li> }</ul>
      <a class="go" [routerLink]="s.link">Explore {{ s.name }} <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>
    </li>
  }
</ol>`,
  styles: [`
:host{display:block;position:relative}
.pj{position:relative}
.stick{position:sticky;top:0;height:100vh;height:100svh;display:flex;align-items:center;padding-top:calc(var(--hdr-space) - 6px);overflow:hidden}
.grid{display:grid;grid-template-columns:minmax(0,440px) minmax(0,1fr);gap:clamp(1.5rem,4.5vw,4.5rem);align-items:center}

/* ---- left rail ---- */
.side .eyebrow{margin-bottom:1.6rem}
.rail-wrap{position:relative;padding-left:44px}
.rail{position:absolute;left:12px;top:0;bottom:0;width:24px;cursor:pointer;touch-action:none}
.rail::before{content:"";position:absolute;left:11px;top:var(--r0,14px);bottom:var(--r1,14px);width:2px;background:var(--border-strong);border-radius:2px}
.fill{position:absolute;left:11px;top:var(--r0,14px);width:2px;height:var(--fh,0px);border-radius:2px;background:linear-gradient(180deg,var(--sutra),var(--medha),var(--kavach));transition:height .25s var(--ease)}
.knob{position:absolute;left:12px;top:0;width:24px;height:24px;border-radius:50%;background:var(--surface);border:2px solid var(--c);box-shadow:0 0 0 6px color-mix(in srgb,var(--c) 16%,transparent),0 8px 18px -6px color-mix(in srgb,var(--c) 60%,transparent);transform:translateY(calc(var(--ky,14px) - 12px));transition:transform .25s var(--ease),border-color .5s,box-shadow .5s;cursor:grab;z-index:2;touch-action:none}
.knob::after{content:"";position:absolute;inset:5px;border-radius:50%;background:var(--c);transition:background .5s}
.knob:hover{box-shadow:0 0 0 9px color-mix(in srgb,var(--c) 18%,transparent)}
.rail-wrap.drag .knob{cursor:grabbing;transition:border-color .5s}
.rail-wrap.drag .fill{transition:none}
.steps{list-style:none;margin:0;padding:0;display:grid;gap:.4rem}
.st{position:relative}
.sdot{position:absolute;left:-36px;top:14px;width:8px;height:8px;margin-top:-4px;border-radius:50%;background:var(--border-strong);transition:background .4s}
.st.done .sdot,.st.on .sdot{background:var(--c)}
.stbtn{display:grid;gap:.15rem;width:100%;text-align:left;padding:.2rem 0 .6rem;border:0;background:none;cursor:pointer;font:inherit;color:inherit}
.area{display:flex;align-items:center;gap:.6rem;font:600 .78rem var(--font-body);letter-spacing:.14em;text-transform:uppercase;color:var(--fg-3);transition:color .4s}
.area em{font-style:normal;color:var(--c);opacity:.8}
.st.on .area{color:var(--fg-2)}
.wm{white-space:nowrap;font:800 clamp(2rem,3.4vw,3.1rem)/1.05 var(--mark);letter-spacing:.03em;color:color-mix(in srgb,var(--fg) 22%,transparent);transition:color .5s,font-size .5s var(--ease)}
.wm span{font-weight:600;font-size:.55em;letter-spacing:0;margin-left:.3em;opacity:.8}
.stbtn:hover .wm{color:color-mix(in srgb,var(--c) 55%,transparent)}
.st.on .wm{color:var(--c)}
.more{display:grid;grid-template-rows:0fr;transition:grid-template-rows .6s var(--ease-out)}
.more > div{overflow:hidden;min-height:0;opacity:0;transition:opacity .4s}
.st.on .more{grid-template-rows:1fr}
.st.on .more > div{opacity:1;transition-delay:.15s}
.desc{margin:.2rem 0 1rem;font-size:1.02rem;line-height:1.6;color:var(--fg-2)}
.desc b{color:var(--fg);font-weight:600}
.chips{margin-bottom:1.1rem}
.chips .chip{border-color:color-mix(in srgb,var(--c) 25%,var(--border));background:var(--t)}
.go{display:inline-flex;align-items:center;gap:.45rem;margin-bottom:.9rem;padding:.6rem 1.1rem;border-radius:8px;background:var(--c);color:#fff;text-decoration:none;font:600 .92rem var(--font-body);transition:gap .3s var(--ease),filter .3s}
:host-context([data-theme="dark"]) .go{color:#0A0D24}
.go:hover{gap:.75rem;filter:brightness(1.08)}
.go svg{width:15px;height:15px;fill:none;stroke:currentColor;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}
.hint{display:flex;align-items:center;gap:.5rem;margin:1.4rem 0 0;font-size:.82rem;color:var(--fg-3)}
.hint svg{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}

/* ---- right window ---- */
.win{position:relative;height:min(72vh,640px);border-radius:26px;overflow:hidden;background:var(--surface);border:1px solid color-mix(in srgb,var(--c) 22%,var(--border));box-shadow:0 50px 100px -50px color-mix(in srgb,var(--c) 55%,transparent),var(--shadow);transition:border-color .6s,box-shadow .6s}
.bar{display:flex;align-items:center;gap:1rem;height:52px;padding:0 1.2rem;border-bottom:1px solid var(--border);font-size:.86rem;color:var(--fg-2)}
.bar .dots{display:flex;gap:6px}.bar .dots i{width:10px;height:10px;border-radius:50%;background:var(--border-strong)}
.bar .dots i:first-child{background:#FF6B6B}.bar .dots i:nth-child(2){background:#FFC145}.bar .dots i:nth-child(3){background:#3DDC84}
.ttl b{font-family:var(--mark);font-weight:800;letter-spacing:.04em;color:var(--c);transition:color .5s}
.live{margin-left:auto;display:inline-flex;align-items:center;gap:.4rem;font-weight:600;color:var(--ok)}
.live::before{content:"";width:7px;height:7px;border-radius:50%;background:currentColor;animation:blink 1.6s ease-in-out infinite}
@keyframes blink{50%{opacity:.25}}
.body{position:absolute;inset:52px 0 0;background:radial-gradient(70% 60% at 50% 45%,var(--t),transparent 75%),radial-gradient(circle,color-mix(in srgb,var(--fg) 9%,transparent) 1px,transparent 1.2px) 0 0/22px 22px;transition:background .6s}
.v{position:absolute;inset:0;opacity:0;visibility:hidden;transform:scale(.97);transition:opacity .6s var(--ease-out),transform .8s var(--ease-out),visibility .6s}
.v.on{opacity:1;visibility:visible;transform:none}

/* SUTRA hub */
.hsvg{position:absolute;left:1%;top:6%;width:66%;height:88%}
.ring{fill:none;stroke:color-mix(in srgb,var(--sutra) 22%,transparent);stroke-width:1.2;stroke-dasharray:3 7;transform-origin:300px 230px;animation:spin 40s linear infinite}
.ring.r2{animation-direction:reverse;animation-duration:28s}
@keyframes spin{to{transform:rotate(1turn)}}
.spoke{fill:none;stroke:color-mix(in srgb,var(--fg) 12%,transparent);stroke-width:2;transition:stroke .5s}
.spoke.lit{stroke:color-mix(in srgb,var(--sutra) 55%,transparent)}
.pk{fill:var(--sutra);filter:drop-shadow(0 0 6px var(--sutra))}
.core{position:absolute;left:34%;top:50%;transform:translate(-50%,-50%);width:132px;height:132px;border-radius:50%;display:grid;place-content:center;text-align:center;background:radial-gradient(circle at 35% 30%,#FFB089,var(--sutra) 70%);color:#fff;box-shadow:0 0 0 12px color-mix(in srgb,var(--sutra) 12%,transparent),0 0 0 26px color-mix(in srgb,var(--sutra) 6%,transparent),0 24px 50px -16px var(--sutra);animation:beat 2.4s ease-in-out infinite}
.core b{font:800 1.35rem/1 var(--mark);letter-spacing:.06em}.core small{font:600 .9rem var(--mark);opacity:.85}
@keyframes beat{50%{box-shadow:0 0 0 18px color-mix(in srgb,var(--sutra) 10%,transparent),0 0 0 34px color-mix(in srgb,var(--sutra) 4%,transparent),0 24px 50px -16px var(--sutra)}}
.node{position:absolute;transform:translate(-50%,-50%);display:inline-flex;align-items:center;gap:.45rem;padding:.5rem .85rem;border-radius:999px;background:var(--surface);border:1px solid var(--border);font:600 .86rem var(--font-body);color:var(--fg-3);box-shadow:var(--shadow);transition:color .4s,border-color .4s,transform .5s var(--ease)}
.node i{width:8px;height:8px;border-radius:50%;background:var(--border-strong);transition:background .4s,box-shadow .4s}
.node.lit{color:var(--fg);border-color:color-mix(in srgb,var(--sutra) 45%,transparent);transform:translate(-50%,-50%) scale(1.05)}
.node.lit i{background:var(--sutra);box-shadow:0 0 0 4px color-mix(in srgb,var(--sutra) 20%,transparent)}
.toasts{position:absolute;right:1.2rem;top:50%;transform:translateY(-50%);display:grid;gap:.6rem;width:min(300px,31%)}
.toast{display:grid;grid-template-columns:auto 1fr;align-items:center;gap:.6rem;padding:.65rem .8rem;border-radius:12px;background:color-mix(in srgb,var(--surface) 92%,transparent);border:1px solid var(--border);box-shadow:var(--shadow-lg);backdrop-filter:blur(8px);font-size:.82rem;opacity:0;transform:translateY(14px) scale(.96);transition:opacity .5s var(--ease-out),transform .6s var(--ease-out)}
.toast.in{opacity:1;transform:none}
.toast{transform:translateX(20px)}
.toast b{padding:.2rem .5rem;border-radius:6px;background:var(--sutra-tint);color:var(--sutra);font-size:.74rem}
.toast span{color:var(--fg)}
.toast em{grid-column:2;font-style:normal;font-weight:600;font-size:.74rem;color:var(--ok)}

/* MEDHA map */
.brain{display:grid;grid-template-rows:1fr auto;padding:1rem clamp(1rem,3vw,2rem) 1.1rem;gap:.8rem}
.nn{position:relative;min-height:0;container-type:size}
.nnbox{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:min(100cqw,calc(100cqh * 600 / 460));aspect-ratio:600/460}
.nnsvg{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
.lyr{font:700 11px var(--font-body);letter-spacing:.18em;text-transform:uppercase;text-anchor:middle;fill:var(--fg-3)}
.syn{fill:none;stroke:color-mix(in srgb,var(--fg) 10%,transparent);stroke-width:1.6;transition:stroke .6s var(--ease-out)}
.syn.lit{stroke:color-mix(in srgb,var(--medha) 45%,transparent)}
.sig{fill:var(--medha);filter:drop-shadow(0 0 5px var(--medha))}
.nin,.nout{position:absolute;transform:translate(-50%,-50%);z-index:1;border-radius:12px;background:var(--surface);border:1px solid var(--border);box-shadow:var(--shadow);color:var(--fg-3);transition:opacity .5s,color .5s,border-color .5s,transform .5s var(--ease),box-shadow .5s}
.nin{display:inline-flex;align-items:center;gap:.45rem;padding:.42rem .75rem;font:600 .82rem var(--font-body);white-space:nowrap}
.nin i{width:8px;height:8px;border-radius:50%;background:var(--border-strong);transition:background .4s,box-shadow .4s}
.nin.lit{color:var(--fg);border-color:color-mix(in srgb,var(--medha) 40%,transparent)}
.nin.lit i{background:var(--medha);box-shadow:0 0 0 4px color-mix(in srgb,var(--medha) 20%,transparent)}
.nout{display:grid;gap:.12rem;padding:.48rem .85rem;width:164px;opacity:.45}
.nout b{font:700 .9rem var(--font-body);color:var(--fg-2);transition:color .5s}
.nout small{font:500 .72rem var(--font-body);color:var(--fg-3);white-space:nowrap}
.nout.lit{opacity:1;border-color:color-mix(in srgb,var(--medha) 45%,transparent);box-shadow:0 12px 28px -14px var(--medha);transform:translate(-50%,-50%) scale(1.04)}
.nout.lit b{color:var(--medha)}
.mcore{position:absolute;transform:translate(-50%,-50%);z-index:1;width:116px;height:116px;border-radius:50%;display:grid;place-content:center;text-align:center;color:#fff;background:radial-gradient(circle at 35% 30%,#B48CFF,#6A3FD0 72%);box-shadow:0 0 0 10px color-mix(in srgb,var(--medha) 12%,transparent),0 22px 46px -16px var(--medha);opacity:.55;transition:opacity .6s,transform .6s var(--ease)}
.mcore.lit{opacity:1;transform:translate(-50%,-50%) scale(1.05)}
.mcore b{font:800 1.2rem/1 var(--mark);letter-spacing:.06em}
.mcore small{font:600 .85rem var(--mark);opacity:.85}
.mring{position:absolute;inset:0;border-radius:50%;border:2px solid color-mix(in srgb,var(--medha) 45%,transparent);opacity:0}
.mcore.lit .mring{animation:mping 2.6s var(--ease-out) infinite}
.mcore.lit .mring.m2{animation-delay:1.3s}
@keyframes mping{from{transform:scale(1);opacity:.8}to{transform:scale(1.7);opacity:0}}
.verdict{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:.6rem 1rem;padding:.7rem 1rem;border-radius:12px;background:var(--medha-tint);font:600 .84rem var(--font-body);color:var(--fg-2)}
.vk{color:var(--medha);font-size:1.05rem}
.res{color:var(--medha);opacity:0;transform:translateX(10px);transition:opacity .5s,transform .5s var(--ease-out)}
.res.in{opacity:1;transform:none}

/* KAVACH trust */
.trust{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);align-items:center;gap:clamp(1rem,3vw,2.5rem);padding:0 clamp(1rem,3.4vw,2.6rem)}
.shield{position:relative;display:grid;justify-items:center;gap:.8rem}
.shield svg{position:relative;width:min(220px,90%);overflow:visible}
.sb{fill:color-mix(in srgb,var(--kavach) 10%,var(--surface));stroke:color-mix(in srgb,var(--kavach) 18%,transparent);stroke-width:6}
.sd{fill:none;stroke:var(--kavach);stroke-width:6;stroke-linejoin:round;stroke-dasharray:1000;stroke-dashoffset:calc((1 - var(--lp,0)) * 1000);transition:stroke-dashoffset .2s linear;filter:drop-shadow(0 6px 14px color-mix(in srgb,var(--kavach) 50%,transparent))}
.ck{fill:none;stroke:var(--kavach);stroke-width:9;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:100;stroke-dashoffset:100;transition:stroke-dashoffset .7s var(--ease-out)}
.ck.in{stroke-dashoffset:0}
.shield b{font:800 1.3rem var(--mark);letter-spacing:.06em;color:var(--kavach)}
.shield b small{font-weight:600;font-size:.8em;opacity:.8;margin-left:.3em;letter-spacing:0}
.pr{position:absolute;left:50%;top:42%;width:200px;height:200px;margin:-100px 0 0 -100px;border-radius:50%;border:2px solid color-mix(in srgb,var(--kavach) 35%,transparent);animation:ping 3s var(--ease-out) infinite}
.pr.p2{animation-delay:1.5s}
@keyframes ping{from{transform:scale(.7);opacity:.9}to{transform:scale(1.5);opacity:0}}
.ctrls{list-style:none;margin:0;padding:0;display:grid;gap:.55rem}
.ctrls li{display:flex;align-items:center;gap:.8rem;padding:.7rem .9rem;border-radius:12px;background:var(--surface);border:1px solid var(--border);font:500 .94rem var(--font-body);color:var(--fg-3);transition:color .4s,border-color .4s,background .4s}
.ctrls li.in{color:var(--fg);border-color:color-mix(in srgb,var(--kavach) 35%,var(--border));background:color-mix(in srgb,var(--kavach-tint) 70%,var(--surface))}
.tg{flex:none;position:relative;width:34px;height:20px;border-radius:999px;background:var(--border-strong);transition:background .4s}
.tg i{position:absolute;left:3px;top:3px;width:14px;height:14px;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.25);transition:transform .4s var(--ease)}
.ctrls li.in .tg{background:var(--kavach)}
.ctrls li.in .tg i{transform:translateX(14px)}
.ctrls li.sum{background:none;border:0;padding:.3rem .2rem 0;font-size:.82rem;letter-spacing:.1em;text-transform:uppercase;font-weight:600}
.sum b{color:var(--kavach);font-size:1.1rem;margin-right:.1em}

/* ---- mobile list ---- */
.pjm{display:none;list-style:none;margin:0;padding:0 var(--gut);gap:1rem}
.pjm > li{display:grid;gap:.3rem;padding:1.5rem 1.3rem;border-radius:20px;background:linear-gradient(160deg,var(--t),var(--surface) 60%);border:1px solid color-mix(in srgb,var(--c) 22%,var(--border));box-shadow:var(--shadow)}
.pjm .wm{color:var(--c);margin-bottom:.4rem}
.pjm .go{justify-self:start;margin:0}

@media(max-width:1180px){.trust{grid-template-columns:1fr;padding-top:1rem;align-content:center}.shield svg{width:120px}.ctrls li{padding:.5rem .8rem;font-size:.86rem}.pr{display:none}}
@media(max-width:900px){.pj{display:none}.pjm{display:grid}}
@media(prefers-reduced-motion:reduce){.ring,.core,.pr,.mring,.live::before{animation:none!important}.sig{display:none}}
`]
})
export class LifecycleComponent implements AfterViewInit, OnDestroy {
  stages = STAGES;
  toasts = TOASTS; controls = CONTROLS;
  mdTech = MD_TECH; mdProducts = MD_PRODUCTS; mdTechPos = MD_TECH_POS; mdProdPos = MD_PROD_POS; mdC = MD_C;
  /** Channel nodes on the SUTRA hub (percent positions inside the window body, plus SVG spoke paths). */
  hubNodes = CHANNELS.map((label, j) => {
    const a = (-90 + j * 60) * Math.PI / 180;
    const cx = 300, cy = 230, R = 175, r0 = 70;
    const x = cx + R * Math.cos(a), y = cy + R * Math.sin(a);
    const sx = cx + r0 * Math.cos(a), sy = cy + r0 * Math.sin(a);
    const bend = 26 * (j % 2 ? 1 : -1);
    const mx = (sx + x) / 2 - Math.sin(a) * bend, my = (sy + y) / 2 + Math.cos(a) * bend;
    return { label, x: 1 + 66 * x / 600, y: 6 + 88 * y / 460, path: `M${sx.toFixed(1)} ${sy.toFixed(1)} Q${mx.toFixed(1)} ${my.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}` };
  });

  stage = signal(0);
  /** Quantised in-stage progress (0..20) drives the step-by-step reveals. */
  step = signal(0);
  cur = computed(() => this.stages[this.stage()]);
  /** How many MEDHA products have lit up so far. */
  mdLive = computed(() => this.stage() === 1 ? this.mdProducts.filter((_, k) => this.step() > 7 + k * 2).length : 0);
  activeControls = computed(() => this.stage() === 2 ? this.controls.filter((_, k) => this.step() > k * 3).length : 0);

  @ViewChild('track') track!: ElementRef<HTMLElement>;
  @ViewChild('rw') rw!: ElementRef<HTMLElement>;
  private zone = inject(NgZone);
  private host = inject(ElementRef<HTMLElement>);
  private off: (() => void)[] = [];
  private dragging = false;
  private stops: number[] = [];

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      let raf = 0;
      const on = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; this.update(); }); };
      addEventListener('scroll', on, { passive: true });
      addEventListener('resize', on);
      this.off.push(() => { removeEventListener('scroll', on); removeEventListener('resize', on); cancelAnimationFrame(raf); });
      this.update();
    });
  }
  ngOnDestroy() { this.off.forEach(f => f()); }

  /** Re-measure rail stops after a step expands or collapses. */
  relayout() { this.update(); }

  private measure() {
    const rw = this.rw?.nativeElement; if (!rw) return;
    const top = rw.getBoundingClientRect().top;
    this.stops = Array.from(rw.querySelectorAll<HTMLElement>('.sdot')).map(d => { const r = d.getBoundingClientRect(); return r.top + r.height / 2 - top; });
    if (this.stops.length) {
      rw.style.setProperty('--r0', this.stops[0] + 'px');
      rw.style.setProperty('--r1', (rw.offsetHeight - this.stops[this.stops.length - 1]) + 'px');
    }
  }
  private setKnob(y: number) {
    const rw = this.rw.nativeElement;
    rw.style.setProperty('--ky', y.toFixed(1) + 'px');
    rw.style.setProperty('--fh', Math.max(0, y - (this.stops[0] || 0)).toFixed(1) + 'px');
  }
  private progress() {
    const r = this.track.nativeElement.getBoundingClientRect();
    const range = r.height - innerHeight;
    return range > 0 ? Math.min(1, Math.max(0, -r.top / range)) : 0;
  }
  private update() {
    const n = this.stages.length;
    const f = Math.min(n - 0.0001, this.progress() * n);
    const s = Math.floor(f), lp = f - s;
    (this.host.nativeElement as HTMLElement).style.setProperty('--lp', lp.toFixed(3));
    const st = Math.floor(lp * 20);
    if (s !== this.stage() || st !== this.step()) this.zone.run(() => { this.stage.set(s); this.step.set(st); });
    this.measure();
    if (!this.dragging && this.stops.length) {
      const glide = s < n - 1 ? this.smooth(0.8, 1, lp) : 0;
      const a = this.stops[s], b = this.stops[Math.min(n - 1, s + 1)];
      this.setKnob(a + (b - a) * glide);
    }
  }
  private smooth(a: number, b: number, x: number) { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); }

  private scrollToStage(i: number, behavior: ScrollBehavior = 'smooth') {
    const el = this.track.nativeElement;
    const top = el.getBoundingClientRect().top + scrollY;
    const range = el.offsetHeight - innerHeight;
    scrollTo({ top: top + ((i + 0.45) / this.stages.length) * range, behavior });
  }
  goTo(i: number) { this.scrollToStage(i); }
  key(e: KeyboardEvent) {
    const d = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    this.scrollToStage(Math.min(this.stages.length - 1, Math.max(0, this.stage() + d)));
  }

  /** Drag the marker vertically: it follows the pointer and the page jumps to the nearest platform. */
  down(e: PointerEvent) {
    const rw = this.rw.nativeElement;
    const tgt = e.currentTarget as HTMLElement;
    this.measure();
    this.dragging = true;
    rw.classList.add('drag');
    tgt.setPointerCapture?.(e.pointerId);
    let last = -1;
    const move = (ev: PointerEvent) => {
      const y0 = rw.getBoundingClientRect().top;
      const lo = this.stops[0], hi = this.stops[this.stops.length - 1];
      const y = Math.min(hi, Math.max(lo, ev.clientY - y0));
      this.setKnob(y);
      let best = 0; this.stops.forEach((p, i) => { if (Math.abs(p - y) < Math.abs(this.stops[best] - y)) best = i; });
      if (best !== last) { last = best; this.scrollToStage(best, 'instant'); }
    };
    const up = () => {
      this.dragging = false;
      rw.classList.remove('drag');
      tgt.removeEventListener('pointermove', move); tgt.removeEventListener('pointerup', up); tgt.removeEventListener('pointercancel', up);
      requestAnimationFrame(() => this.update());
    };
    tgt.addEventListener('pointermove', move); tgt.addEventListener('pointerup', up); tgt.addEventListener('pointercancel', up);
    move(e);
    e.preventDefault();
  }
}
