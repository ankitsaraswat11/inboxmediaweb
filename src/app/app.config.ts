import { ApplicationConfig } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      // URL me #fragment nahi aata (scrollIntoView app.component.ts me hota hai),
      // isliye anchorScrolling ki zaroorat nahi; har naya page top se khulta hai
      withInMemoryScrolling({ scrollPositionRestoration: 'top' })
    ),
  ],
};