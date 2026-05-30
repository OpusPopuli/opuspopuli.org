# CLAUDE.md — opuspopuli.org

## What this is

Public landing page for the Opus Populi platform. Astro 5 static site deployed to `https://opuspopuli.org`.

**This repo uses `npm`, not `pnpm`.** Do not run `pnpm` commands here.

## Commands

```bash
npm run dev       # Dev server (default Astro port)
npm run build     # Static build → dist/
npm run preview   # Preview the production build locally
npm run e2e       # Playwright end-to-end tests
npm run e2e:a11y  # WCAG 2.2 AA accessibility tests
```

## What belongs here

- Marketing copy, platform descriptions, feature explanations
- Static pages: home, platform overview, about, get-involved
- Public assets (images, fonts, icons)
- Sitemap and robots configuration

## What does NOT belong here

- Application code — that lives in `opuspopuli` (the main monorepo)
- Region configs — those live in `opuspopuli-regions`
- Any server-side logic or API calls at runtime (this is a static site)

## Accessibility

All pages must meet **WCAG 2.2 Level AA**. Run `npm run e2e:a11y` before marking any UI change done. Check keyboard navigation manually for interactive elements.

## Internationalization

User-facing copy that warrants translation should be flagged. Currently English-only, but structure content so it can be localized later (avoid hardcoded strings deep in component logic).

## Deployment

Deployed as a static site. `npm run build` produces `dist/`. The deployment target is configured in `astro.config.mjs` (`site: 'https://opuspopuli.org'`). Do not change the site URL without coordinating with the sitemap and any external references.

## Dependencies

- Astro 5
- TailwindCSS (via Vite plugin)
- `@astrojs/sitemap`

Keep the dependency footprint small — this is a static marketing site, not an application.
