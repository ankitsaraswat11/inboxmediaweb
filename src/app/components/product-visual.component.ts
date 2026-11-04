import { Component, Input, OnDestroy, OnInit, signal } from '@angular/core';
import { ProductVisual } from '../data';

/**
 * A distinct, illustrative interface for each MEDHA product, so the five products never look like identical cards.
 * All content is example UI, labelled as such; no customer data or metrics.
 */
@Component({
  selector: 'app-product-visual',
  standalone: true,
  template: `
  <div class="pv" [attr.data-v]="kind">
    <div class="bar"><span class="dots" aria-hidden="true"><i></i><i></i><i></i></span><span>{{ titles[kind] }}</span><span class="ex">Example</span></div>
    @switch (kind) {
      @case ('aura') {
        <div class="aura">
          <div class="avatar" aria-hidden="true"><div class="face"><i></i><i></i><b></b></div>
            <div class="wave">@for (b of bars; track $index) { <span [style.animation-delay.ms]="b"></span> }</div>
            <small>Speaking · English, Hindi</small></div>
          <div class="chat">
            <p class="msg in">Hello, I can help with appointments, timings and directions.</p>
            <p class="msg out">I need a consultation on Tuesday.</p>
            <p class="msg in">Tuesday at 11:00 is free. Shall I book it and send a WhatsApp confirmation?</p>
            <p class="msg typing" aria-label="Assistant typing"><i></i><i></i><i></i></p>
          </div>
        </div>
      }
      @case ('tellco') {
        <div class="tellco">
          <div class="dial" aria-hidden="true"><span class="ring"></span><svg viewBox="0 0 24 24"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z"/></svg></div>
          <table>
            <thead><tr><th>Lead</th><th>Status</th><th>Next step</th></tr></thead>
            <tbody>
              @for (r of rows; track r.id; let i = $index) {
                <tr><td>{{ r.id }}</td><td><span class="st" [attr.data-s]="state(i)">{{ statusOf(i) }}</span></td><td>{{ nextOf(i) }}</td></tr>
              }
            </tbody>
          </table>
        </div>
      }
      @case ('slm') {
        <div class="slm">
          <div class="docs">
            <span class="doc"><i></i>Credit policy</span><span class="doc hot"><i></i>SOP 4.2 · KYC</span><span class="doc"><i></i>Product FAQ</span>
          </div>
          <div class="model" aria-hidden="true"><span>Custom SLM</span><em>private · domain-tuned</em></div>
          <div class="qa">
            <p class="q">Which documents are needed for re-KYC of a joint account?</p>
            <p class="a">Each holder submits a valid ID and current address proof. Re-verification is completed before the account is updated.<span class="cite">Source: SOP 4.2, section 3</span></p>
          </div>
        </div>
      }
      @case ('trainexl') {
        <div class="trainexl">
          <div class="src"><span class="doc big"><i></i>Branch operations SOP<br><small>48 pages</small></span><span class="arrow" aria-hidden="true"></span></div>
          <div class="mods">
            @for (m of modules; track m.t; let i = $index) {
              <div class="mod"><b>{{ m.t }}</b><small>{{ m.d }}</small><span class="prog"><i [style.--w]="m.p + '%'" [style.animation-delay.ms]="i * 400"></i></span></div>
            }
            <div class="quiz"><span class="ok">&#10003;</span> Knowledge check: 4 of 5 correct</div>
          </div>
        </div>
      }
      @case ('edge') {
        <div class="edge">
          <div class="site">
            <span class="tag">Your premises</span>
            <div class="box"><span class="chip" aria-hidden="true"></span><b>Edge AI node</b><small>Local inference</small>
              <span class="meter"><i></i></span><small class="lat">Response on site, no round trip</small></div>
            <div class="data"><span class="lock" aria-hidden="true"></span>Data stays on site</div>
          </div>
          <div class="cloud"><span class="cl" aria-hidden="true"></span><small>Cloud</small><span class="off">Offline OK</span></div>
        </div>
      }
    }
  </div>`,
  styles: [`
  :host{display:block;--pc:var(--medha)}
  .pv{background:var(--surface);border:1px solid var(--border);border-radius:var(--r-lg);box-shadow:var(--shadow);overflow:hidden;min-height:300px;display:flex;flex-direction:column}
  .bar{display:flex;align-items:center;gap:.6rem;padding:.6rem .9rem;border-bottom:1px solid var(--border);font-size:.8rem;font-weight:600;color:var(--fg-2);background:var(--surface-2)}
  .dots{display:flex;gap:5px}.dots i{width:8px;height:8px;border-radius:50%;background:var(--border-strong)}
  .ex{margin-left:auto;font-size:.7rem;font-weight:700;color:var(--primary);background:var(--lavender);border-radius:5px;padding:.1rem .45rem}
  .pv>div:last-child{flex:1;padding:1rem}
  p{margin:0;max-width:none}
  /* Aura AI */
  .aura{display:grid;grid-template-columns:150px 1fr;gap:1rem;align-items:center}
  .avatar{display:grid;justify-items:center;gap:.6rem;text-align:center}
  .face{position:relative;width:96px;height:96px;border-radius:50%;background:radial-gradient(circle at 35% 30%,var(--medha-l),var(--medha));box-shadow:0 0 0 8px var(--medha-tint),0 0 0 16px color-mix(in srgb,var(--medha) 8%,transparent);animation:breathe 3s ease-in-out infinite}
  .face i{position:absolute;top:38px;width:9px;height:12px;border-radius:5px;background:#fff;animation:blinkEye 4s infinite}.face i:first-child{left:30px}.face i:nth-child(2){right:30px}
  .face b{position:absolute;left:36px;right:36px;bottom:26px;height:6px;border-radius:0 0 8px 8px;background:#fff;animation:talk .5s ease-in-out infinite alternate}
  .wave{display:flex;align-items:center;gap:3px;height:28px}.wave span{width:4px;border-radius:2px;background:var(--medha);height:30%;animation:wave 1s ease-in-out infinite}
  .avatar small{font-size:.72rem;color:var(--fg-2)}
  .chat{display:grid;gap:.45rem}
  .msg{font-size:.82rem;line-height:1.45;padding:.5rem .7rem;border-radius:12px;max-width:92%;color:var(--fg)}
  .msg.in{background:var(--medha-tint);border-top-left-radius:4px}
  .msg.out{background:var(--surface-2);border:1px solid var(--border);justify-self:end;border-top-right-radius:4px}
  .typing{display:flex;gap:4px;background:var(--medha-tint);width:max-content}.typing i{width:6px;height:6px;border-radius:50%;background:var(--medha);animation:dot 1.2s infinite}.typing i:nth-child(2){animation-delay:.2s}.typing i:nth-child(3){animation-delay:.4s}
  /* Tellco */
  .tellco{display:grid;grid-template-columns:auto 1fr;gap:1rem;align-items:start}
  .dial{position:relative;width:64px;height:64px;border-radius:50%;background:var(--medha);display:grid;place-items:center;margin-top:.4rem}
  .dial svg{width:28px;height:28px;fill:#fff;animation:shake 1.6s ease-in-out infinite}
  .dial .ring{position:absolute;inset:-8px;border-radius:50%;border:2px solid var(--medha);opacity:0;animation:ringOut 1.6s ease-out infinite}
  table{font-size:.8rem}th,td{padding:.45rem .5rem;border-bottom:1px solid var(--border)}th{font-size:.72rem;background:none;color:var(--fg-2)}td:first-child{color:var(--fg);font-variant-numeric:tabular-nums;font-weight:600}
  .st{display:inline-block;border-radius:5px;padding:.1rem .45rem;font-weight:700;font-size:.72rem;white-space:nowrap;transition:background .3s,color .3s}
  .st[data-s="0"]{background:var(--surface-2);color:var(--fg-2)}.st[data-s="1"]{background:var(--lavender);color:var(--primary)}.st[data-s="2"]{background:var(--pending-tint);color:var(--pending)}.st[data-s="3"]{background:var(--ok-tint);color:var(--ok)}
  /* Custom SLM */
  .slm{display:grid;gap:.8rem}
  .docs{display:flex;flex-wrap:wrap;gap:.4rem}
  .doc{display:inline-flex;align-items:center;gap:.4rem;font-size:.76rem;font-weight:600;color:var(--fg);border:1px solid var(--border);border-radius:8px;padding:.35rem .6rem;background:var(--surface-2)}
  .doc i{width:10px;height:12px;border:1.5px solid var(--fg-2);border-radius:2px}
  .doc.hot{border-color:var(--medha);background:var(--medha-tint);animation:glow 2.4s ease-in-out infinite}
  .model{display:flex;align-items:baseline;gap:.6rem;justify-content:center;padding:.55rem;border-radius:10px;border:1px dashed var(--medha);color:var(--medha);font-weight:700;font-size:.85rem;background:repeating-linear-gradient(90deg,transparent 0 10px,var(--medha-tint) 10px 20px);background-size:200% 100%;animation:scan 3s linear infinite}
  .model em{font-style:normal;font-weight:500;font-size:.74rem;color:var(--fg-2)}
  .qa{display:grid;gap:.5rem}
  .q{font-size:.8rem;color:var(--fg-2);font-style:italic}
  .a{font-size:.84rem;line-height:1.5;color:var(--fg);background:var(--surface-2);border:1px solid var(--border);border-left:3px solid var(--medha);border-radius:8px;padding:.6rem .75rem}
  .cite{display:block;margin-top:.35rem;font-size:.72rem;font-weight:700;color:var(--medha)}
  /* TrainExl */
  .trainexl{display:grid;grid-template-columns:auto 1fr;gap:1rem;align-items:center}
  .src{display:flex;align-items:center;gap:.6rem}
  .doc.big{flex-direction:column;align-items:flex-start;padding:.7rem;line-height:1.3;max-width:110px}
  .doc.big small{font-weight:500;color:var(--fg-2)}
  .arrow{width:26px;height:2px;background:var(--medha);position:relative}.arrow::after{content:"";position:absolute;right:-1px;top:-4px;border:5px solid transparent;border-left:7px solid var(--medha);border-right:0}
  .mods{display:grid;gap:.5rem}
  .mod{display:grid;grid-template-columns:1fr auto;gap:.1rem .6rem;padding:.55rem .7rem;border:1px solid var(--border);border-radius:10px;background:var(--surface-2)}
  .mod b{font-size:.82rem;color:var(--fg)}.mod small{grid-row:2;font-size:.72rem;color:var(--fg-2)}
  .prog{grid-row:1/3;grid-column:2;align-self:center;width:70px;height:6px;border-radius:3px;background:var(--border);overflow:hidden}
  .prog i{display:block;height:100%;width:0;background:var(--medha);border-radius:3px;animation:fill 2.2s ease-out forwards}
  .quiz{font-size:.78rem;color:var(--fg);display:flex;align-items:center;gap:.4rem}.quiz .ok{display:grid;place-items:center;width:18px;height:18px;border-radius:50%;background:var(--ok-tint);color:var(--ok);font-size:.7rem;font-weight:800}
  /* Edge AI */
  .edge{display:grid;grid-template-columns:1fr auto;gap:1rem;align-items:center}
  .site{position:relative;border:1.5px dashed var(--medha);border-radius:14px;padding:1.6rem .9rem .9rem;display:grid;gap:.6rem}
  .site .tag{position:absolute;top:-.7rem;left:.8rem;background:var(--surface);padding:0 .4rem;font-size:.74rem;font-weight:700;color:var(--medha)}
  .box{display:grid;gap:.2rem;padding:.8rem;border-radius:10px;background:var(--medha-tint);position:relative}
  .box b{font-size:.88rem;color:var(--fg)}.box small{font-size:.74rem;color:var(--fg-2)}
  .chip{position:absolute;right:.8rem;top:.8rem;width:22px;height:22px;border-radius:4px;border:2px solid var(--medha);box-shadow:0 0 0 3px var(--surface),0 0 0 4px var(--medha);animation:pulse 2s ease-in-out infinite}
  .meter{height:6px;border-radius:3px;background:var(--border);overflow:hidden;margin-top:.4rem}.meter i{display:block;height:100%;width:22%;background:var(--ok);animation:lat 2.6s ease-in-out infinite}
  .data{display:flex;align-items:center;gap:.45rem;font-size:.8rem;font-weight:600;color:var(--fg)}
  .lock{width:12px;height:10px;border-radius:2px;background:var(--medha);position:relative;margin-top:4px}.lock::before{content:"";position:absolute;left:2px;top:-6px;width:5px;height:6px;border:2px solid var(--medha);border-bottom:0;border-radius:4px 4px 0 0}
  .cloud{display:grid;justify-items:center;gap:.3rem;opacity:.75}
  .cl{width:54px;height:30px;border-radius:16px;background:var(--surface-2);border:1.5px dashed var(--border-strong);position:relative}
  .cl::after{content:"";position:absolute;left:-6px;right:-6px;top:50%;height:2px;background:var(--fg-2);transform:rotate(-20deg)}
  .cloud small{font-size:.72rem;color:var(--fg-2)}
  .off{font-size:.7rem;font-weight:700;color:var(--ok);background:var(--ok-tint);border-radius:5px;padding:.1rem .4rem}
  @keyframes breathe{50%{transform:scale(1.03)}}
  @keyframes blinkEye{0%,92%,100%{transform:scaleY(1)}95%{transform:scaleY(.1)}}
  @keyframes talk{to{height:12px}}
  @keyframes wave{0%,100%{height:25%}50%{height:100%}}
  @keyframes dot{0%,60%,100%{opacity:.3;transform:none}30%{opacity:1;transform:translateY(-3px)}}
  @keyframes shake{0%,40%,100%{transform:rotate(0)}10%,30%{transform:rotate(-12deg)}20%{transform:rotate(12deg)}}
  @keyframes ringOut{from{opacity:.7;transform:scale(.85)}to{opacity:0;transform:scale(1.35)}}
  @keyframes glow{50%{box-shadow:0 0 0 4px var(--medha-tint)}}
  @keyframes scan{to{background-position:-200% 0}}
  @keyframes fill{to{width:var(--w)}}
  @keyframes pulse{50%{box-shadow:0 0 0 3px var(--surface),0 0 0 7px var(--medha-tint)}}
  @keyframes lat{0%,100%{width:18%}50%{width:30%}}
  @media(max-width:520px){.aura,.tellco,.trainexl{grid-template-columns:1fr}.avatar{grid-template-columns:auto 1fr;justify-items:start;align-items:center}.avatar small{grid-column:2}.dial{display:none}.src{display:none}.edge{grid-template-columns:1fr}.cloud{grid-auto-flow:column;align-items:center;justify-content:start}}
  @media(prefers-reduced-motion:reduce){.prog i{width:var(--w)}}
  `]
})
export class ProductVisualComponent implements OnInit, OnDestroy {
  @Input({ required: true }) kind!: ProductVisual;
  titles: Record<ProductVisual, string> = { aura: 'Aura AI · Virtual front desk', tellco: 'Tellco · Outreach campaign', slm: 'Custom SLM · Staff assistant', trainexl: 'TrainExl · Learning path', edge: 'Edge AI · On-site deployment' };
  bars = Array.from({ length: 14 }, (_, i) => (i * 97) % 600);
  rows = [{ id: 'Lead 0142' }, { id: 'Lead 0143' }, { id: 'Lead 0144' }, { id: 'Lead 0145' }];
  modules = [{ t: 'Module 1 · Account opening', d: '6 min', p: 100 }, { t: 'Module 2 · KYC checks', d: '5 min', p: 70 }, { t: 'Module 3 · Escalations', d: '4 min', p: 30 }];
  private STATUSES = ['Queued', 'Dialling', 'Qualified', 'Visit booked'];
  private NEXT = ['Call at 10:30', 'In progress', 'Send brochure', 'Reminder set'];
  tick = signal(0);
  private timer?: ReturnType<typeof setInterval>;
  ngOnInit() {
    const reduce = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (this.kind === 'tellco' && !reduce) this.timer = setInterval(() => this.tick.update(t => t + 1), 1400);
  }
  ngOnDestroy() { clearInterval(this.timer); }
  state(i: number) { return (i + this.tick()) % 4; }
  statusOf(i: number) { return this.STATUSES[this.state(i)]; }
  nextOf(i: number) { return this.NEXT[this.state(i)]; }
}
