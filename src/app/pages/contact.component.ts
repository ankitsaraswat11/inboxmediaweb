import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CAPABILITIES, AI_SOLUTIONS, FLOW_CONTACT, FINDER_GOALS, INDUSTRIES } from '../data';
import { PLATFORMS, ISO42001 } from '../content/platforms';
import { FinderChoice, SolutionFinderComponent } from '../components/solution-finder.component';
// TODO: point to the real enquiry endpoint (CRM or existing backend) once confirmed.
export const ENQUIRY_ENDPOINT = '/api/enquiry';
type K='demo'|'proposal'|'message';
@Component({standalone:true,imports:[ReactiveFormsModule,SolutionFinderComponent],template:`
<section class="s page-hero"><div class="wrap"><p class="eyebrow">Contact</p><h1>Talk to Inbox Media</h1><p class="lead">One short enquiry. We only ask what is relevant to what you need.</p></div></section>
<section class="s"><div class="wrap ct">
<div class="ct-main" id="enquiry">
@if(!type()){<h2>What do you need?</h2><div class="opts">@for(o of opts;track o.k){<button type="button" class="opt" (click)="pick(o.k)"><h3>{{o.t}}</h3><p>{{o.d}}</p></button>}</div>}
@else{<p><button type="button" class="lnk" (click)="type.set(null)">Change request type</button> &middot; <strong>{{label()}}</strong></p>
<form [formGroup]="f" (ngSubmit)="send()" novalidate>
<label>Name<input formControlName="name" autocomplete="name"></label>@if(bad('name')){<small class="err">Enter your name.</small>}
<label>Work email<input formControlName="email" type="email" autocomplete="email"></label>@if(bad('email')){<small class="err">Enter a valid email address.</small>}
@if(type()!=='message'){<label>Phone number<input formControlName="phone" type="tel" autocomplete="tel"></label>
<label>Company @if(type()==='proposal'){<span>(required)</span>}<input formControlName="company" autocomplete="organization"></label>@if(bad('company')){<small class="err">Enter your company name.</small>}
<label>Industry<select formControlName="industry"><option value="">Select one</option>@for(o of industries;track o){<option [value]="o">{{o}}</option>}</select></label>
<label>What do you want to improve?<select formControlName="goal"><option value="">Select one</option>@for(g of goals;track g.key){<option [value]="g.label">{{g.label}}</option>}</select></label>
<label>Area of interest<select formControlName="interest"><option value="">Select one</option>@for(o of interests;track o){<option [value]="o">{{o}}</option>}</select></label>@if(bad('interest')){<small class="err">Choose an area of interest.</small>}}
@if(type()==='demo'){<label>Preferred date (optional)<input type="date" formControlName="date"></label>}
@if(type()!=='demo'){<label>{{type()==='proposal'?'Your requirements':'Message'}}<textarea formControlName="message" rows="5"></textarea></label>@if(bad('message')){<small class="err">Tell us a little more.</small>}}
<label class="chk"><input type="checkbox" formControlName="consent"> I agree to be contacted about this enquiry.</label>@if(bad('consent')){<small class="err">Please confirm consent.</small>}
<input class="hp" formControlName="website" tabindex="-1" autocomplete="off" aria-hidden="true">
<button class="btn" [disabled]="status()==='sending'">{{status()==='sending'?'Sending...':'Send enquiry'}}</button>
<p role="status" aria-live="polite">@if(status()==='ok'){Thanks. Your enquiry was received.}@if(status()==='fail'){We could not send your enquiry. Please try again or email info&#64;inboxmedia.in.}</p></form>}
</div>
<aside class="ct-side" aria-label="Other ways to reach us">
  <div class="ct-card"><h2>What happens after you submit</h2>
    <ol class="vsteps">@for(s of flow;track s.t;let i=$index){<li><span>{{i+1}}</span><div><b>{{s.t}}</b><p>{{s.d}}</p></div></li>}</ol></div>
  <div class="ct-card"><h2>Prefer email?</h2><p><a class="text-link" href="mailto:info@inboxmedia.in">info&#64;inboxmedia.in</a></p>
    <h2>Our office</h2><p>619-620, Tower B, 6th Floor, Noida One, Sector 62, Noida, Uttar Pradesh 201309, India</p></div>
</aside>
</div></section>
<app-solution-finder (discuss)="useFinder($event)"></app-solution-finder>`,
styles:[`.ct{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(280px,1fr);gap:clamp(1.5rem,4vw,4rem);align-items:start}.ct-main>h2{font-size:clamp(1.7rem,3vw,2.3rem)}.opts{display:grid;gap:.8rem}.opt{position:relative;text-align:left;background:var(--surface);color:var(--fg);border:1px solid var(--border);border-radius:var(--r-lg);padding:1.3rem 3.4rem 1.3rem 1.5rem;cursor:pointer;font:inherit;transition:border-color .2s,background .2s}.opt::after{content:'';position:absolute;right:1.5rem;top:50%;width:9px;height:9px;border-right:2px solid var(--fg-2);border-top:2px solid var(--fg-2);transform:translateY(-50%) rotate(45deg);transition:right .2s,border-color .2s}.opt:hover,.opt:focus-visible{border-color:var(--primary);background:var(--bg-soft)}.opt:hover::after{right:1.25rem;border-color:var(--primary)}.opt h3{margin:0 0 .25rem}.opt p{margin:0}.ct-side{display:grid;gap:1rem;position:sticky;top:calc(var(--nh) + 24px)}.ct-card{padding:1.6rem;border-radius:var(--r-xl);background:var(--bg-alt);border:1px solid var(--border)}.ct-card h2{font-size:1.1rem;letter-spacing:-.01em;margin:0 0 .8rem;max-width:none}.ct-card h2:not(:first-child){margin-top:1.4rem}.ct-card p{margin:0;font-size:.95rem}.vsteps{list-style:none;margin:0;padding:0;display:grid;gap:0}.vsteps li{position:relative;display:grid;grid-template-columns:30px 1fr;gap:.8rem;padding-bottom:1rem}.vsteps li:not(:last-child)::before{content:'';position:absolute;left:14px;top:32px;bottom:4px;width:2px;background:color-mix(in srgb,var(--primary) 30%,transparent)}.vsteps span{display:grid;place-items:center;width:30px;height:30px;border-radius:50%;border:2px solid var(--primary);color:var(--primary);font-weight:600;font-size:.85rem;background:var(--bg-alt)}.vsteps b{display:block;font-size:.98rem;color:var(--fg);margin-top:.2rem}.vsteps p{font-size:.9rem}@media(max-width:900px){.ct{grid-template-columns:1fr}.ct-side{position:static}}
form{display:grid;gap:1rem;background:var(--surface);border:1px solid var(--border);border-radius:var(--r-xl);padding:clamp(1.2rem,3vw,2.2rem);box-shadow:var(--shadow)}label{display:grid;gap:.4rem;font-weight:600;font-size:.95rem}label span{font-weight:400;color:var(--mute)}.chk{display:flex;gap:.6rem;align-items:center;font-weight:400}.chk input{min-height:auto;width:20px;height:20px}
.err{color:var(--err)}.hp{position:absolute;left:-9999px;opacity:0;height:0}.lnk{background:none;border:0;color:var(--link);cursor:pointer;font:inherit;padding:0;text-decoration:underline}`]})
export class ContactComponent{
 private fb=inject(FormBuilder);private http=inject(HttpClient);status=signal<'idle'|'sending'|'ok'|'fail'>('idle');type=signal<K|null>(null);flow=FLOW_CONTACT;
 opts:{k:K;t:string;d:string}[]=[{k:'demo',t:'Book a demo',d:'See a product or capability in action.'},{k:'proposal',t:'Request a proposal',d:'Share your requirements and get a scoped response.'},{k:'message',t:'Send a message',d:'A general question or support request.'}];
 industries=INDUSTRIES.map(i=>i.name);goals=FINDER_GOALS;
 interests=[...PLATFORMS.map(p=>p.name),'Digital Engineering',...CAPABILITIES.map(c=>c.name),...AI_SOLUTIONS.map(a=>a.name),ISO42001.name];
 f=this.fb.nonNullable.group({name:[''],email:[''],phone:[''],company:[''],industry:[''],goal:[''],interest:[''],date:[''],message:[''],consent:[false],website:['']});
 constructor(){inject(ActivatedRoute).queryParamMap.subscribe(p=>{const t=p.get('type');if(t==='demo'||t==='proposal'||t==='message')this.pick(t);
  const i=p.get('interest');if(i&&this.interests.includes(i))this.f.patchValue({interest:i});
  const ind=p.get('industry'),g=p.get('goal');if(ind||g)this.applyChoice({industry:ind??'',goal:g??''})})}
 /** "Discuss this recommendation" in the finder: open a proposal request with the finder's selections filled in, then bring the form into view. */
 useFinder(c:FinderChoice){this.pick('proposal');this.applyChoice(c);
  setTimeout(()=>{document.getElementById('enquiry')?.scrollIntoView({block:'start'});(document.querySelector('#enquiry [formcontrolname="name"]') as HTMLElement|null)?.focus({preventScroll:true})})}
 private applyChoice(c:FinderChoice){const g=FINDER_GOALS.find(x=>x.key===c.goal);
  this.f.patchValue({industry:this.industries.includes(c.industry)?c.industry:'',goal:g?.label??'',...(g&&this.interests.includes(g.interest)?{interest:g.interest}:{})})}
 pick(k:K){this.type.set(k);this.status.set('idle');const R=Validators.required;
  const v=(n:string,x:any[])=>{const c=this.f.get(n)!;c.setValidators(x);c.updateValueAndValidity()};
  v('name',[R]);v('email',[R,Validators.email]);v('consent',[Validators.requiredTrue]);v('company',k==='proposal'?[R]:[]);v('interest',k==='message'?[]:[R]);v('message',k==='demo'?[]:[R])}
 label(){return this.opts.find(o=>o.k===this.type())?.t}
 bad(k:string){const c=this.f.get(k)!;return c.invalid&&(c.touched||c.dirty)}
 send(){const raw=this.f.getRawValue();if(raw.website)return;
  if(this.f.invalid){this.f.markAllAsTouched();return}
  this.status.set('sending');const {website,...body}=raw;
  this.http.post(ENQUIRY_ENDPOINT,{type:this.type(),...body}).subscribe({next:()=>{this.status.set('ok');this.f.reset()},error:()=>this.status.set('fail')})}}
