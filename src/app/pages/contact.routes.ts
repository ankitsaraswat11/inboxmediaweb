import { Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { ContactComponent } from './contact.component';

/** Contact page routes. Title and description stay on the parent route in app.routes.ts. */
export const CONTACT_ROUTES: Routes = [
  { path: '', component: ContactComponent, providers: [provideHttpClient()] }
];
