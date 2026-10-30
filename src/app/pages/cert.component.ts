import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
const P='Pending approval for public disclosure';
@Component({standalone:true,imports:[RouterLink],template:`
<section class="s dark page-hero"><div class="wrap"><h1>Certifications &amp; Compliance</h1><p class="lead">We publish certificate details only after they are verified and approved for public disclosure.</p></div></section>
<section class="s"><div class="wrap"><div class="scroll"><table><caption class="sr">Certification details</caption>
<thead><tr><th>Standard</th><th>Certificate number</th><th>Certification body</th><th>Covered scope</th><th>Valid until</th></tr></thead>
<tbody>@for(r of rows;track r.s){<tr><th scope="row">{{r.s}}<small>{{r.n}}</small></th><td>{{p}}</td><td>{{p}}</td><td>{{p}}</td><td>{{p}}</td></tr>}</tbody></table></div>
<p class="note">The current standard versions and transition status are confirmed with the certifier before any claim is displayed. Certificate details are available on request.</p>
<a class="btn" routerLink="/contact" [queryParams]="{type:'message'}">Request certificate details</a></div></section>`,
styles:[`.scroll{overflow-x:auto;margin-bottom:1.5rem}table{border-collapse:collapse;min-width:640px;width:100%}th,td{text-align:left;padding:.9rem 1rem;border-bottom:1px solid var(--line);vertical-align:top}thead th{font-size:.8rem;text-transform:uppercase;letter-spacing:.06em;color:var(--mute)}td{color:var(--mute)}th small{display:block;font-weight:400;color:var(--mute)}.sr{position:absolute;left:-9999px}.note{margin:0 0 1.5rem}`]})
export class CertComponent{p=P;rows=[{s:'ISO 9001:2015',n:'Quality Management System'},{s:'ISO 27001:2013',n:'Information Security Management'}];}
