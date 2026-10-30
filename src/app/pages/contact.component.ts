import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FlowComponent } from '../flow.component';
import { CAPABILITIES, AI_SOLUTIONS, FLOW_CONTACT } from '../data';
// TODO: point to the real enquiry endpoint (CRM or existing backend) once confirmed.
export const ENQUIRY_ENDPOINT = '/api/enquiry';
type K='demo'|'proposal'|'message';
@Component({standalone:true,imports:[ReactiveFormsModule,FlowComponent],template:`
<section class="s dark page-hero"><div class="wrap"><h1>Talk to Inbox Media</h1><p class="lead">One short enquiry. We only ask what is relevant to what you need.</p></div></section>
<section class="s"><div class="wrap narrow">
@if(!type()){<h2>What do you need?</h2><div class="opts">@for(o of opts;track o.k){<button type="button" class="opt" (click)="pick(o.k)"><h3>{{o.t}}</h3><p>{{o.d}}</p></button>}</div>}
@else{<p><button type="button" class="lnk" (click)="type.set(null)">Change request type</button> &middot; <strong>{{label()}}</strong></p>
<form [formGroup]="f" (ngSubmit)="send()" novalidate>
<label>Name<input formControlName="name" autocomplete="name"></label>@if(bad('name')){<small class="err">Enter your name.</small>}
<label>Work email<input formControlName="email" type="email" autocomplete="email"></label>@if(bad('email')){<small class="err">Enter a valid email address.</small>}
@if(type()!=='message'){<label>Phone number<input formControlName="phone" type="tel" autocomplete="tel"></label>
<label>Company @if(type()==='proposal'){<span>(required)</span>}<input formControlName="company" autocomplete="organization"></label>@if(bad('company')){<small class="err">Enter your company name.</small>}
<label>Area of interest<select formControlName="interest"><option value="">Select one</option>@for(o of interests;track o){<option>{{o}}</option>}</select></label>@if(bad('interest')){<small class="err">Choose an area of interest.</small>}}
@if(type()==='demo'){<label>Preferred date (optional)<input type="date" formControlName="date"></label>}
@if(type()!=='demo'){<label>{{type()==='proposal'?'Your requirements':'Message'}}<textarea formControlName="message" rows="5"></textarea></label>@if(bad('message')){<small class="err">Tell us a little more.</small>}}
<label class="chk"><input type="checkbox" formControlName="consent"> I agree to be contacted about this enquiry.</label>@if(bad('consent')){<small class="err">Please confirm consent.</small>}
<input class="hp" formControlName="website" tabindex="-1" autocomplete="off" aria-hidden="true">
<button class="btn" [disabled]="status()==='sending'">{{status()==='sending'?'Sending...':'Send enquiry'}}</button>
<p role="status" aria-live="polite">@if(status()==='ok'){Thanks. Your enquiry was received.}@if(status()==='fail'){We could not send your enquiry. Please try again or email info&#64;inboxmedia.in.}</p></form>}
</div></section>
<section class="s tint"><div class="wrap"><h2>What happens after you submit</h2><app-flow [steps]="flow" label="Enquiry flow"/></div></section>`,
styles:[`.narrow{max-width:680px}.opts{display:grid;gap:1rem}.opt{text-align:left;background:#fff;border:1.5px solid var(--line);border-radius:12px;padding:1.2rem 1.4rem;cursor:pointer;font:inherit;transition:border-color .2s}.opt:hover,.opt:focus-visible{border-color:var(--blue)}.opt p{margin:0}
form{display:grid;gap:.9rem}label{display:grid;gap:.3rem;font-weight:600}label span{font-weight:400;color:var(--mute)}input,select,textarea{font:inherit;padding:.7rem;border:1.5px solid var(--line);border-radius:8px;min-height:44px}.chk{display:flex;gap:.6rem;align-items:center;font-weight:400}.chk input{min-height:auto;width:20px;height:20px}
.err{color:#B3261E}.hp{position:absolute;left:-9999px;opacity:0;height:0}.lnk{background:none;border:0;color:var(--blue);cursor:pointer;font:inherit;padding:0;text-decoration:underline}`]})
export class ContactComponent{
 private fb=inject(FormBuilder);private http=inject(HttpClient);status=signal<'idle'|'sending'|'ok'|'fail'>('idle');type=signal<K|null>(null);flow=FLOW_CONTACT;
 opts:{k:K;t:string;d:string}[]=[{k:'demo',t:'Book a demo',d:'See a product or capability in action.'},{k:'proposal',t:'Request a proposal',d:'Share your requirements and get a scoped response.'},{k:'message',t:'Send a message',d:'A general question or support request.'}];
 interests=[...CAPABILITIES.map(c=>c.name),...AI_SOLUTIONS.map(a=>a.name)];
 f=this.fb.nonNullable.group({name:[''],email:[''],phone:[''],company:[''],interest:[''],date:[''],message:[''],consent:[false],website:['']});
 constructor(){inject(ActivatedRoute).queryParamMap.subscribe(p=>{const t=p.get('type');if(t==='demo'||t==='proposal'||t==='message')this.pick(t)})}
 pick(k:K){this.type.set(k);this.status.set('idle');const R=Validators.required;
  const v=(n:string,x:any[])=>{const c=this.f.get(n)!;c.setValidators(x);c.updateValueAndValidity()};
  v('name',[R]);v('email',[R,Validators.email]);v('consent',[Validators.requiredTrue]);v('company',k==='proposal'?[R]:[]);v('interest',k==='message'?[]:[R]);v('message',k==='demo'?[]:[R])}
 label(){return this.opts.find(o=>o.k===this.type())?.t}
 bad(k:string){const c=this.f.get(k)!;return c.invalid&&(c.touched||c.dirty)}
 send(){const raw=this.f.getRawValue();if(raw.website)return;
  if(this.f.invalid){this.f.markAllAsTouched();return}
  this.status.set('sending');const {website,...body}=raw;
  this.http.post(ENQUIRY_ENDPOINT,{type:this.type(),...body}).subscribe({next:()=>{this.status.set('ok');this.f.reset()},error:()=>this.status.set('fail')})}}
