import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
const P='Pending approval for public disclosure';
@Component({standalone:true,imports:[RouterLink],template:`
<section class="s page-hero"><div class="wrap"><h1>Certifications &amp; Compliance</h1><p class="lead">We publish certificate details only after they are verified and approved for public disclosure.</p></div></section>
<section class="s"><div class="wrap"><div class="scroll"><table><caption class="sr">Certification details</caption>
<thead><tr><th>Standard</th><th>Certificate number</th><th>Certification body</th><th>Covered scope</th><th>Valid until</th></tr></thead>
<tbody>@for(r of rows;track r.s){<tr><th scope="row">{{r.s}}<small>{{r.n}}</small></th><td>{{p}}</td><td>{{p}}</td><td>{{p}}</td><td>{{p}}</td></tr>}</tbody></table></div>
<p class="note"><span class="pill pending">Pending verification</span> The current standard versions and transition status are confirmed with the certifier before any claim is displayed. Certificate details are available on request.</p>
<div class="btns"><a class="btn" routerLink="/contact" [queryParams]="{type:'message'}">Request certificate details</a><a class="btn ghost" routerLink="/platforms/kavach">KAVACH: trust &amp; compliance</a></div></div></section>`,
styles:[`.scroll{overflow-x:auto;margin-bottom:1.5rem;border:1px solid var(--border);border-radius:var(--r-lg);background:var(--surface)}table{min-width:640px}td{color:var(--fg-2);font-style:italic}th small{display:block;font-weight:400;color:var(--fg-2)}.sr{position:absolute;left:-9999px}.note{margin:0 0 1.5rem}`]})
export class CertComponent{p=P;rows=[{s:'ISO 9001:2015',n:'Quality Management System'},{s:'ISO 27001:2013',n:'Information Security Management'}];}
