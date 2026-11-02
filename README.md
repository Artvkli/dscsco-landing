# DSCSCO — Secure Inter-Branch Connectivity landing page

Multilingual (Persian · English · Arabic) advertising landing page for **DSCSCO — شرکت توسعه ارتباطات ایمن ثنا**.
Built with **Next.js (App Router) + TypeScript**, plain CSS, and zero UI dependencies.

## Quick start

```bash
npm install
cp .env.example .env.local   # then edit values
npm run dev                  # http://localhost:3000 → redirects to /fa
npm run build && npm start   # production
```

Requires Node.js 20.9+.

## Languages & routing

| URL   | Language | Direction |
|-------|----------|-----------|
| `/fa` | Persian (default — `/` redirects here) | RTL |
| `/en` | English  | LTR |
| `/ar` | Arabic   | RTL |

- Every language is its own statically generated URL with `lang`/`dir` on `<html>`, a canonical URL and `hreflang` alternates (plus `x-default` → `/fa`).
- Copy lives in `lib/dictionaries/{fa,en,ar}.ts`. `en.ts` and `ar.ts` are type-checked against `fa.ts`, so a missing key fails the build.
- Numerals are localized (۰۱ / ٠١ / 01); the Persian footer year uses the Solar Hijri calendar.
- Fonts are self-hosted at build time via `next/font`: Vazirmatn (FA), IBM Plex Sans Arabic (AR), Manrope (EN), IBM Plex Mono (technical labels).

## Project structure

```
app/
  [locale]/layout.tsx   html lang/dir, fonts, metadata, hreflang, Open Graph
  [locale]/page.tsx     page composition + Organization JSON-LD
  api/contact/route.ts  lead endpoint (server-side validation, honeypot, webhook delivery)
  globals.css           design tokens, components, animations, responsive rules
  sitemap.ts, robots.ts, icon.svg
components/              one component per section (Hero, Services, Benefits, International,
                         Process, WhyUs, FinalCta, Contact/ContactForm, SiteNav, SiteFooter)
lib/
  i18n.ts               locales, direction, digit localization, dictionaries
  validation.ts         form validation shared by browser and server
  dictionaries/         FA / EN / AR copy
```

## Editing copy

All text for the three languages lives in **`scripts/copy.py`**, one block per language with identical keys and order.
After editing, run:

```bash
python3 scripts/copy.py
```

The script refuses to write if FA, EN and AR are not structurally identical (same keys, same list lengths),
then regenerates `lib/dictionaries/{fa,en,ar}.ts`. This keeps the Persian, English and Arabic pages consistent in
content and section order. Don't edit the generated `.ts` dictionaries by hand.

## Contact form

- **Short first step:** only full name, company and phone are required — enough for a specialist to call back.
- **Optional details** (collapsed under "Add more details"): business email, country, number of branches, message.
  Optional fields are validated only when filled in; if one has an error, the panel opens automatically.
- Validation runs in the browser for instant feedback and again on the server (`lib/validation.ts` is shared).
  Persian/Arabic digits are accepted in the phone number. Errors are announced to screen readers and focus moves
  to the first invalid field.
- **Delivery:** set `LEAD_WEBHOOK_URL` (CRM, Zapier/Make/n8n, email service…). The endpoint receives JSON:
  `name, company, phone, email, country, branches, message, locale, source, receivedAt`.
  Optional `LEAD_WEBHOOK_SECRET` is sent as the `x-webhook-secret` header.
  In development without a webhook, leads are logged to the server console; in production the API returns 503 until it is configured.
- Add rate limiting in front of `/api/contact` in production (WAF / edge middleware / Redis).

## Before going live — content to confirm

Nothing below was invented; these are placeholders or proposals to replace:

- **Logo** — `components/Logo.tsx` and `app/icon.svg` are a proposed mark. Swap in the official logo.
- **English / Arabic company names** — "Sana Secure Communications Development Co." / «شركة ثنا لتطوير الاتصالات الآمنة» are translations; confirm the official names in `lib/dictionaries/*`.
- **Promotional image** — the "Why DSCSCO" section has a designed placeholder (1200×800). Replace it in `components/WhyUs.tsx` with real photography via `next/image`.
- **Open Graph image** — add `app/[locale]/opengraph-image.png` (1200×630) for social previews.
- **Contact details** — only the website link is shown. Add phone / email / address once confirmed.
- **Legal review** — the International section's compliance wording should be approved by your legal team.

## Accessibility & performance notes

- Semantic landmarks, skip link, labelled navigation, one `h1`, proper `label`/`aria-invalid`/`aria-describedby` on fields.
- Visible focus rings, 44px+ touch targets, WCAG AA text contrast on all backgrounds.
- All illustrations are inline SVG + CSS animation (no images, no animation library). `prefers-reduced-motion` disables motion.
- Only two small client components ship JavaScript: the contact form and the scroll-reveal observer.
