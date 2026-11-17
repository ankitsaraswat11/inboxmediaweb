# Prerendering setup (biggest mobile win)

The site renders entirely in the browser today, so a phone shows a blank page until ~400 KB of
JavaScript has downloaded and run. Prerendering writes real HTML for every page at build time.
Measured on a throttled phone profile: first paint 3.0 s -> 1.1 s.

The code in this zip is already prerender-safe (browser-only code is guarded, hydration is enabled in
`app/app.config.ts`). You only need to add the SSR package and one routes file.

## 1. Add Angular SSR (run in the project root)

    ng add @angular/ssr

Accept the defaults. It installs `@angular/ssr` + `@angular/platform-server` matching your Angular
version and creates `src/main.server.ts`, `src/app/app.config.server.ts`, `src/server.ts`, and
(Angular 19.2+) `src/app/app.routes.server.ts`.

## 2. Tell it which platform pages exist

Open `src/app/app.routes.server.ts` and make it:

    import { RenderMode, ServerRoute } from '@angular/ssr';

    export const serverRoutes: ServerRoute[] = [
      {
        path: 'platforms/:slug',
        renderMode: RenderMode.Prerender,
        async getPrerenderParams() { return [{ slug: 'sutra' }, { slug: 'medha' }, { slug: 'kavach' }, { slug: 'shrotas' }]; }
      },
      { path: '**', renderMode: RenderMode.Prerender }
    ];

## 3. Static output (no Node server needed)

In `angular.json` -> projects -> <app> -> architect -> build -> options:

    "outputMode": "static"

and remove the `"ssr": { "entry": "src/server.ts" }` line. Then also remove `"src/server.ts"` from the
`files` list in `tsconfig.app.json` (you can delete `src/server.ts`).

## 4. Build and deploy

    ng build

Upload `dist/<app>/browser/`. It now contains an `index.html` per route (16 pages).
Configure your host to:
- serve `/<route>/index.html` for each route (most static hosts do this automatically), and
  fall back to `index.csr.html` for unknown URLs;
- enable gzip or brotli compression;
- cache hashed files (`*-HASH.js`, `*.css`, fonts) for a year (`Cache-Control: public, max-age=31536000, immutable`).

## How to measure correctly

Lighthouse on `ng serve` (localhost:4200) always scores low: it serves unminified development
code with no compression. Measure the production build instead, in an Incognito window
(extensions skew results):

    ng build
    npx serve dist/<app>/browser -l 8080      # serves with gzip compression
    # then run Lighthouse (Mobile) on http://localhost:8080 in an Incognito window
