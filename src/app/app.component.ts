import { Component, HostListener, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { CAPABILITIES, AI_SOLUTIONS, PLATFORMS } from './data';
const DESC='Inbox Media: enterprise communication, AI automation and digital engineering.';
const LOGO='https://inboxmedia.in/wp-content/themes/wpinboxmedia/images/logo-white.svg';
@Component({selector:'app-root',standalone:true,imports:[RouterOutlet,RouterLink,RouterLinkActive],template:`
<div class="hdr"><header class="nav" [class.sc]="sc()" [class.open]="open()"><div class="wrap row">
<a routerLink="/" class="brand" aria-label="Inbox Media home">@if(logoOk()){<img [src]="logo" alt="Inbox Media" height="40" (error)="logoOk.set(false)">}@else{Inbox Media}</a>
<nav class="menu" aria-label="Main">
<div class="dd"><a routerLink="/platforms/sutra" [class.on]="onPlatforms()">Platforms</a><div class="panel mega">@for(p of plats;track p.slug){<a class="mcol" [routerLink]="['/platforms',p.slug]" [style.--c]="p.color" [style.--t]="p.tint"><b>{{p.name}}</b><span class="mlay">{{p.layer}}</span><span class="mdesc">{{p.descriptor}}</span><span class="minc">@for(x of p.includes;track x.name){<i>{{x.name}}</i>}</span></a>}</div></div>
<div class="dd"><a routerLink="/capabilities" routerLinkActive="on">Capabilities</a><div class="panel">@for(c of caps;track c.name){<a routerLink="/capabilities">{{c.name}}</a>}</div></div>
<div class="dd"><a routerLink="/ai-solutions" routerLinkActive="on">AI Solutions</a><div class="panel">@for(a of ai;track a.name){<a routerLink="/ai-solutions">{{a.name}}</a>}</div></div>
<div class="dd"><a routerLink="/industries" routerLinkActive="on">Industries</a></div>
<div class="dd"><a routerLink="/integrations" routerLinkActive="on">Integrations</a></div><div class="dd"><a routerLink="/resources" routerLinkActive="on">Resources</a></div>
<div class="dd"><a routerLink="/about" routerLinkActive="on">About</a><div class="panel"><a routerLink="/about/certifications">Certifications</a><a routerLink="/about/why-inbox-media">Why Inbox Media</a></div></div>
<div class="dd"><a routerLink="/contact" routerLinkActive="on">Contact</a></div></nav>
<a class="btn cta" routerLink="/contact" [queryParams]="{type:'demo'}">Book Demo</a>
<button class="burger" [class.open]="open()" (click)="open.set(!open())" [attr.aria-expanded]="open()" aria-label="Toggle menu"><span></span><span></span><span></span></button></div>
<div class="mnav"><a routerLink="/">Home</a><div class="mplat">@for(p of plats;track p.slug){<a [routerLink]="['/platforms',p.slug]" [style.--c]="p.light"><b>{{p.name}}</b><span>{{p.short}}</span></a>}</div><a routerLink="/capabilities">Capabilities</a><a routerLink="/ai-solutions">AI Solutions</a><a routerLink="/industries">Industries</a><a routerLink="/integrations">Integrations</a><a routerLink="/resources">Resources</a><a routerLink="/about">About &amp; Certifications</a><a routerLink="/contact">Contact</a><a class="btn" routerLink="/contact" [queryParams]="{type:'demo'}">Book Demo</a></div></header></div>
<main><router-outlet/></main>
<footer><div class="wrap"><div class="fg"><div>@if(logoOk()){<img [src]="logo" alt="Inbox Media" height="40">}<p style="margin-top:1rem">Enterprise communication infrastructure and AI automation company. Serving enterprises across 8+ industries since 2009.</p></div>
<div><h4>Platforms</h4>@for(p of plats;track p.slug){<a [routerLink]="['/platforms',p.slug]"><b class="fmark">{{p.name}}</b> {{p.short}}</a>}</div>
<div><h4>Capabilities</h4>@for(c of caps;track c.name){<a routerLink="/capabilities">{{c.name}}</a>}</div>
<div><h4>AI Solutions</h4>@for(a of ai;track a.name){<a routerLink="/ai-solutions">{{a.name}}</a>}</div>
<div><h4>Company</h4><a routerLink="/about">About Story</a><a routerLink="/about/certifications">Certifications</a><a routerLink="/about/why-inbox-media">Why Inbox Media</a><a routerLink="/integrations">Integrations</a><a routerLink="/resources">Resources</a></div>
<div><h4>Our Offices</h4><p>619-620, Tower B, 6th Floor, Noida One, Sector 62 Noida, Uttar Pradesh-201309, India</p><a href="mailto:info@inboxmedia.in">info&#64;inboxmedia.in</a></div></div>
<div class="legal"><span>© 2026 Inbox Media Pvt. Ltd.</span><span class="soc"><a href="https://www.facebook.com/Inboxmedia.in" target="_blank" rel="noopener">Facebook</a><a href="https://www.instagram.com/inboxmedia_in" target="_blank" rel="noopener">Instagram</a><a href="https://www.linkedin.com/company/inbox-media-private-limited/" target="_blank" rel="noopener">LinkedIn</a><a href="https://x.com/inboxmedia_in" target="_blank" rel="noopener">X</a></span></div></div></footer>`})
export class AppComponent{caps=CAPABILITIES;ai=AI_SOLUTIONS;plats=PLATFORMS;onPlatforms=signal(false);logo=LOGO;logoOk=signal(true);sc=signal(false);open=signal(false);private meta=inject(Meta);
 constructor(r:Router){r.events.subscribe(e=>{if(e instanceof NavigationEnd){this.open.set(false);this.onPlatforms.set(e.urlAfterRedirects.startsWith('/platforms'));
  let s=r.routerState.snapshot.root;while(s.firstChild)s=s.firstChild;
  this.meta.updateTag({name:'description',content:s.data['description']||DESC});
  let l=document.querySelector('link[rel=canonical]') as HTMLLinkElement|null;if(!l){l=document.createElement('link');l.rel='canonical';document.head.appendChild(l)}
  l.href='https://inboxmedia.in'+e.urlAfterRedirects.split('?')[0].replace(/\/$/,'')}})}
 @HostListener('window:scroll')onScroll(){this.sc.set(window.scrollY>10)}}
