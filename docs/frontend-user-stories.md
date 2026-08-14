# FreshFold Marketing Site — Frontend User Stories

**App:** `freshfold` (Next.js App Router, TypeScript, Tailwind, `lucide-react` icons)
**Scope:** The public marketing landing page — a single scrollable page (`app/page.tsx`) with no authentication, no roles, and no backend. There is no "customer panel" here; the audience is an anonymous **site visitor / prospective customer** being funneled toward downloading the mobile app.
**Source of truth:** `app/page.tsx`, `components/{site-header,hero,services,how-it-works,vendors,delivery,download-cta,site-footer,store-badges}.tsx`

> Every section on this page is static marketing content — there is no client-side state, no forms, and no data fetching. "Interaction" here means anchor-link scrolling and hover states, not app logic.

---

## Epic A — Site-Wide Navigation

### FF-A.1 Jump to a section via the sticky header nav
**As a** visitor,
**I want** a sticky header with links to Services, How it works, Vendors, and Delivery,
**so that** I can jump straight to the part of the page I care about instead of scrolling manually.

- **Files:** `components/site-header.tsx`
- **Frontend behavior:** Header is `sticky top-0` with a blurred background (`backdrop-blur-md`) so it stays visible while scrolling. Nav links are plain in-page anchors (`#services`, `#how`, `#vendors`, `#delivery`) matching `id` attributes on each section.
- **⚠️ Gap:** Nav links are wrapped in `hidden md:flex` — on small/mobile viewports the entire nav disappears with **no hamburger menu or alternative** provided. Mobile visitors lose in-page navigation entirely (only the logo and "Download app" button remain visible).

### FF-A.2 Return to the top of the page via the logo
**As a** visitor,
**I want** the FreshFold logo/wordmark in the header to act as a home link,
**so that** I have a predictable way to reset my scroll position.

- **Files:** `components/site-header.tsx`
- **Frontend behavior:** Logo is an `<a href="#">`, which scrolls to page top.

### FF-A.3 Start the download flow from anywhere via the header CTA
**As a** visitor,
**I want** a persistent "Download app" button in the header,
**so that** I can convert at any scroll position without hunting for the download section.

- **Files:** `components/site-header.tsx`
- **Frontend behavior:** Button links to `#download`, scrolling to the `DownloadCta` section rather than opening an app store directly.

---

## Epic B — Hero Section (First Impression)

### FF-B.1 Understand what FreshFold does within seconds of landing
**As a** visitor,
**I want** a clear headline ("Laundry day, handled.") and one-sentence description of the service,
**so that** I immediately understand the value proposition without reading further.

- **Files:** `components/hero.tsx`

### FF-B.2 See a location-relevance badge
**As a** visitor,
**I want** a small pill badge ("Now live across Dar es Salaam") near the top of the hero,
**so that** I can quickly confirm the service is available where I am before reading on.

- **Files:** `components/hero.tsx`

### FF-B.3 See trust signals next to the download prompt
**As a** visitor,
**I want** a star rating ("4.9 Play Store") and vendor count ("120+ vendors in Dar") shown right under the download badges,
**so that** social proof reinforces my decision to download at the exact moment I'm deciding.

- **Files:** `components/hero.tsx`

### FF-B.4 See app store badges immediately, without scrolling
**As a** visitor ready to convert right away,
**I want** App Store / Google Play badges in the hero section itself,
**so that** I don't have to scroll to the bottom of the page to download.

- **Files:** `components/hero.tsx`, `components/store-badges.tsx`
- **⚠️ Gap:** Both badges link to `#download` (an in-page anchor), **not** real `itms-apps://` / Play Store URLs. Clicking either badge just scrolls to the bottom CTA section, which itself has the same badges — there is currently no actual store destination anywhere on the page.

---

## Epic C — Services Showcase

### FF-C.1 Browse the range of services offered
**As a** visitor,
**I want** a grid of service cards (Wash & Fold, Dry Cleaning, Ironing & Press, Shoe & Sneaker Care, Bedding & Bulky, Delicates & Baby) each with an icon and one-line description,
**so that** I can confirm the app covers the specific type of laundry I need before downloading.

- **Files:** `components/services.tsx`
- **Frontend behavior:** Responsive grid (1 → 2 → 3 columns by breakpoint). Cards have a hover state (`-translate-y-1`, border/shadow change, icon background inverts to filled) signaling interactivity even though cards aren't actually clickable/linked anywhere.
- **Note:** Cards are visually "hoverable" but have no `href`/`onClick` — purely decorative hover polish, not a functional link into the app's service list.

---

## Epic D — How It Works

### FF-D.1 See the 4-step process before committing to download
**As a** visitor,
**I want** a numbered 4-step walkthrough (Download & pick a vendor → Book & schedule pickup → We clean it fresh → Pay & get it delivered),
**so that** I know what to expect after installing the app, reducing hesitation to download.

- **Files:** `components/how-it-works.tsx`
- **Frontend behavior:** Steps rendered as an ordered list (`<ol>`) with large decorative step numbers (`01`–`04`) for scannability; responsive 1 → 2 → 4 column grid.

---

## Epic E — Vendor Marketplace Preview

### FF-E.1 Preview real vendor listings before downloading
**As a** visitor,
**I want** a preview of a few actual vendors (name, rating, review count, area, ETA, price-per-kg) with a "vetted cleaners" framing,
**so that** I can gauge quality and pricing before committing to download an app I haven't used yet.

- **Files:** `components/vendors.tsx`
- **Frontend behavior:** 3 vendor cards in a responsive grid, each with a colored initial avatar, a tag badge (e.g. "Eco-friendly," "Budget friendly"), star rating, area/ETA row, and a price + "In the app" label signaling the booking action lives inside the app, not on the site.
- **Note:** This section explicitly does not let the visitor book — "In the app" is a label, not a link, consistent with the site's role as a pure funnel to app download.

### FF-E.2 See the scale of the vendor network
**As a** visitor,
**I want** a "120+ vendors available across Dar" stat card next to the vendor preview,
**so that** I trust there's enough real supply/choice before I download.

- **Files:** `components/vendors.tsx`

---

## Epic F — Delivery & Logistics Value Props

### FF-F.1 Understand the pickup/delivery model at a glance
**As a** visitor,
**I want** a 2×2 feature list (Free pickup & delivery, Live order tracking, Pay with mobile money, Smart notifications) paired with a lifestyle image,
**so that** I understand the full-service logistics promise, not just the washing service.

- **Files:** `components/delivery.tsx`
- **Frontend behavior:** Each feature is an icon + title + one-line description; image and text swap order at the `lg` breakpoint (`order-last lg:order-first`) so the image leads on desktop but text leads on mobile stacking.

---

## Epic G — Download Conversion (Bottom-of-Page CTA)

### FF-G.1 Get a final, high-contrast conversion push with an incentive
**As a** visitor who has scrolled through the whole page,
**I want** a visually distinct closing section ("Download FreshFold and get your first pickup free in Dar") with an incentive and app store badges again,
**so that** if I wasn't convinced earlier, I have one more compelling, low-friction chance to convert right where I am.

- **Files:** `components/download-cta.tsx`
- **Frontend behavior:** High-contrast primary-color panel with rounded corners and decorative blurred gradient orbs; repeats `StoreBadges` (light variant for contrast against the colored background) plus a 4-stat grid (25k+ customers, 120+ vendors, 80k+ loads cleaned, 4.9★ rating) for a final trust push.
- **⚠️ Gap:** Same as FF-B.4 — badges link to `#download` (this section's own anchor), so tapping them just re-scrolls to the section already in view, with no real store destination.

---

## Epic H — Footer

### FF-H.1 Find secondary/legal links from anywhere via the footer
**As a** visitor,
**I want** a footer with Product / Company / Support link columns (Pricing, Vendors, About us, Careers, Help center, Terms, Privacy, etc.),
**so that** I can find supporting information the main page doesn't cover.

- **Files:** `components/site-footer.tsx`
- **⚠️ Gap:** Every footer link is `href="#"` — none of these routes/pages actually exist yet. This is placeholder content, not functional navigation.

### FF-H.2 See brand trust and locality signals in the footer
**As a** visitor,
**I want** the footer to reiterate the brand description and a local, human tagline ("Made in Dar es Salaam for people who hate laundry day."),
**so that** the site closes with the same local, trustworthy tone it opened with.

- **Files:** `components/site-footer.tsx`

---

## Cross-Cutting Frontend Notes & Gaps

1. **No real app store links anywhere on the page** — all three `StoreBadges` instances (hero, download CTA ×1 via shared component) point at the in-page `#download` anchor rather than actual App Store/Play Store URLs. This is the single highest-impact gap since the entire page's purpose is to drive that click.
2. **No mobile navigation** — the header's nav links are fully hidden below the `md` breakpoint with no hamburger/drawer replacement (`components/site-header.tsx`). Mobile visitors (likely the majority, given this is a phone-app funnel) cannot jump to sections at all.
3. **All footer links are placeholders** (`href="#"`) — Terms, Privacy, Help center, Careers, etc. don't resolve anywhere.
4. **Static-only content** — vendor listings, ratings, and stats (25k+ customers, 120+ vendors, 80k+ loads, 4.9★) are hardcoded in component files, not fetched from any API. They will drift from reality over time unless wired to real data or manually maintained.
5. **No contact/lead-capture form** — "Contact" and "Help center" are footer link labels only; there's no on-page way to reach the company without leaving the site.
6. **No analytics/CTA-tracking hooks** visible in the CTA components — worth flagging if conversion tracking is a goal (can't currently measure which of the 3 badge placements drives downloads).

---

*Document generated from a full component-level analysis of `freshfold/freshfold/app/` and `freshfold/freshfold/components/` on 2026-08-13. This is a separate, unrelated codebase from `laundryApp` — see `laundryApp/docs/customer-frontend-user-stories.md` for the mobile app's customer-facing frontend.*
