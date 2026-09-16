# Parquet & Decor Nepal — Website

Premium flooring & wall panel solutions, Nepal. **Phase 1** built the
technical foundation: design system, responsive image architecture,
routing skeleton, and the homepage's header/hero/collection sections.
**Phase 1.5** built on top of it: the approved Gemini-generated anchor
imagery wired through the same pipeline, additional licensed photography
for the product-category strip, an ambient video "visual break" section,
and Instagram/Facebook social integration. **Phase 2** turned the
foundation into the complete public-facing website — every route in the
brief now renders real content (not a placeholder), backed by a small
local data layer designed to make a future CMS a drop-in rather than a
rewrite. **Phase 2.1** added the real contact channels (phone, WhatsApp,
email), removed the homepage video, curated the homepage's material
section, and fixed a real image-cropping bug found during an audit. See
"What's built" below for the full breakdown.

## Stack

React 18 + Vite + Tailwind CSS + React Router 7 + Framer Motion (via
`LazyMotion`/`m`, not the full `motion` import — keeps the animation
bundle small) + React Icons + React Hook Form (installed, not yet wired to
a form) + React Hot Toast + Firebase (Analytics only, so far).

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in Firebase values, see below
npm run dev                  # http://localhost:5173
```

Other scripts:

```bash
npm run build             # production build to dist/
npm run preview           # serve the production build locally
npm run lint               # ESLint
npm run images:process     # regenerate public/images/ from _incoming-assets/
```

## Firebase setup

The project is wired to Firebase project `parquet-4d844` (Spark/free
plan) via environment variables — **never hard-coded**. Copy
`.env.example` to `.env.local` and fill in the values from Firebase
Console → Project settings → General → Your apps:

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=parquet-4d844
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
```

`src/config/firebase.js` initializes the app only if these are present
(the site still runs fine without them — no crash, Analytics simply stays
off), and initializes Analytics lazily via `isSupported()` so it never
throws in environments that don't support it (SSR, blocked storage,
certain browsers). The Firebase SDK itself loads in its own async chunk
(dynamically imported from `App.jsx` on mount) so it never blocks or
bloats the initial page load.

**Spark-plan discipline (important for later phases):** no Firestore
reads exist yet, and none should be added as a public-page realtime
listener. When the CMS (products/projects/services/blog/FAQ/testimonials/
inquiries/settings) is built in a later phase:

- No `onSnapshot` on public routes.
- No per-render or per-scroll Firestore queries.
- Prefer static generation / build-time fetch / cached reads over live
  listeners, to stay inside the free quota.
- Firebase Storage is **not** used for website images — see the image
  architecture below.

**Phase 2 confirmation:** no Firestore code was added or touched.
`src/config/firebase.js` is unchanged from Phase 1 (Analytics only). The
new consultation form (`/contact`) does not write to Firestore — see
"Forms" above for what it does instead.

## Design system

Tokens live in `tailwind.config.js`:

- **Colors**: `navy` (#081F32), `wood-warm` (#916C50), `wood-deep`
  (#6B422D), `gold` (#B08A5A), `ivory` (#F4F0E8), `charcoal` (#605D57),
  plus white. Used with restraint — navy + ivory/white do most of the
  work, wood comes from photography, gold is an accent only.
- **Type**: `font-display` = Cormorant Garamond (headlines, editorial
  statements only), `font-body` = Manrope (everything else — nav, buttons,
  body copy, forms, labels). Loaded via Google Fonts `<link>` in
  `index.html` with `preconnect` hints; swap to self-hosted `@font-face`
  files later if you want to drop the Google Fonts request entirely.
- **Spacing/containers**: `max-w-container` (1440px), `max-w-container-narrow`
  (1120px), gutter utilities (`px-gutter` 20px mobile → `gutter-lg` 64px
  desktop, via `<Container>`).
- **Radius**: 2–6px everywhere (`rounded-sm`/`rounded`/`rounded-md`) — no
  large rounded corners.
- **Shadows**: `shadow-subtle` / `shadow-card` / `shadow-lifted` — all
  low-opacity, no heavy drop shadows.
- **Motion**: `duration-400`/`duration-600` with a custom `ease-premium`
  cubic-bezier. All Framer Motion usage respects
  `prefers-reduced-motion` (see `usePrefersReducedMotion` hook and the
  global CSS override in `src/styles/index.css`).

## Image architecture

Phase 1 established how images are sourced, processed, and served; Phase
1.5 populated it with the approved core photography plus additional
licensed imagery. Full provenance/licensing for every asset — including
which five images are the confirmed Gemini-generated brand anchors, which
are externally sourced with license/attribution recorded, and which
candidates were reviewed and rejected — is in **`IMAGE_SOURCES.md`**.

### Pipeline

`scripts/process-images.mjs` (run via `npm run images:process`) uses
`sharp` to turn raw sources in `_incoming-assets/` (gitignored — never
committed, never shipped) into the actual served files in
`public/images/`:

- **3 formats per image**: AVIF (best compression) → WebP → JPEG
  (universal fallback), so `<picture>` lets the browser pick the best it
  supports.
- **Multiple widths per role** (e.g. hero: 960/1440/1920w) for `srcSet`.
- **Art-directed crops**, not just scaled-down images: the hero has a
  separate mobile crop (`hero-mobile-*`, 4:5, right-anchored) because
  simply shrinking the desktop 16:9 crop lost the flooring/wall-panel
  subject on narrow screens.
- Favicons are cropped from the logo's icon mark only (no wordmark — it's
  illegible at 16–32px) — see `IMAGE_SOURCES.md` for why the header/footer
  also present the logo inside a small framed chip rather than directly
  on the page background (the source JPEG has no transparency).
- **Per-image crop position**: most jobs use sharp's default centre
  gravity, but pass `position: 'right'` (or any sharp gravity keyword)
  when the important content isn't centred — see the `pvc-tile` job for
  a real example (its source photo's wall panel sits at the right edge;
  a centre crop into the 4:5 tile showed none of it).
- **Resilient to a single bad source**: `main()` wraps `processBrand`,
  `processOg`, and `processVideoPoster` in `attempt()`, which logs a
  warning and continues rather than aborting the whole run. This matters
  in practice — `_incoming-assets/logo.jpeg` currently has a macOS-level
  file ACL (`com.apple.macl` extended attribute, likely set by some other
  app that touched the file) blocking read access for this environment;
  without this wrapper, that one file stops every other image from
  regenerating. The already-built `public/images/brand/*` files are
  unaffected (they're outputs, not re-read), so the live site's logo/
  favicons are untouched — but regenerating them will fail until that
  file's permissions are fixed (Finder → Get Info → check permissions, or
  re-save/re-export the file from whatever last touched it).

### `<ResponsiveImage>` component

`src/components/media/ResponsiveImage.jsx` is the one place every image
goes through:

```jsx
<ResponsiveImage
  desktop={heroImage.desktop}   // { avifSrcSet, webpSrcSet, jpgSrcSet, fallback, width, height }
  mobile={heroImage.mobile}     // optional — art-directed crop shown below 768px
  alt={heroImage.alt}
  priority                      // eager + fetchPriority=high, for above-the-fold images
  sizes="100vw"
  className="aspect-[4/5] md:aspect-[16/9]"  // caller controls the aspect-ratio box
/>
```

It renders a `<picture>` with AVIF/WebP `<source>`s (mobile ones scoped to
`(max-width: 767px)`), a JPEG `<img>` fallback with `srcSet`/`sizes`, and
explicit `width`/`height` so the browser reserves space before the image
loads (no layout shift). Swapping to Cloudinary-hosted URLs later only
means changing how `src/data/images.js` builds these descriptor objects —
no component changes.

### Image data

`src/data/images.js` is the single manifest describing how each image is
*used* (which crop, which alt text, which widths) — components import
from here, never a raw path. This is also the seam for a future
Cloudinary migration.

### Folder layout

```
_incoming-assets/        raw sources (gitignored, local only)
public/images/
  brand/                 favicons, header/footer logo chip
  hero/                  homepage hero, desktop + mobile crops
  flooring/               flooring collection preview
  wall-panels/            wall panel collection preview
  products/               product-category strip tiles (spc/laminate/wooden/wpc/pvc/acoustic)
  before-after/           before/after demo slider images
  editorial/              craftsmanship section image + video poster
  og/                     default Open Graph image
public/videos/            flooring-ambient-loop.mp4 (see "Video" below)
```

Folders are created as needed, not speculatively — e.g. there's still no
`projects/` folder since no project photography exists yet.

### `loading` override for non-vertical scroll contexts

`<ResponsiveImage>` defaults to `loading="lazy"`, which is keyed to
*vertical* viewport intersection. The product-category strip
(`ProductStrip.jsx`) scrolls *horizontally*, and native lazy-loading does
not reliably fire for images that only enter view that way (confirmed via
automated browser testing — images past the first few tiles silently
never loaded in some cases). Pass `loading="eager"` for images inside a
horizontally-scrolling container; the tiles are small (a few KB each in
AVIF), so eager-loading eight of them has no meaningful performance cost.

### `<ResponsiveImage>` inside an `aspect-[...]` box — always pass `className="absolute inset-0 h-full w-full"`

The `<picture>` element does **not** stretch to fill an ancestor by
default — only the `<img>` inside it does, via `object-cover`, and only
within `<picture>`'s own box. If you nest `<ResponsiveImage>` in a plain
`aspect-[4/5]` div without absolutely positioning it, the picture sizes
itself the old-fashioned way: full width, height following the *source
image's own* aspect ratio. When that source happens to already be 4:5,
this looks identical to "filling the box" and the bug stays invisible.
The moment a differently-shaped image lands in that same slot — Phase 2
found this three times, in `Gallery.jsx`, `ServicesLanding.jsx`, and
`ProductsLanding.jsx`'s family cards, each using a 3:2 "wide" crop inside
a 4:5/4:3/3:4 tile — the image renders short and exposes whatever sits
behind it (a stray gradient block, or just the section background,
which is easy to miss in a quick screenshot review if it happens to be
a similar color).

**The fix, and the only pattern to use going forward:** make the
containing box `relative`, and pass `className="absolute inset-0 h-full
w-full"` to `<ResponsiveImage>`:

```jsx
<div className="relative aspect-[4/5] overflow-hidden rounded">
  <ResponsiveImage desktop={...} alt="..." className="absolute inset-0 h-full w-full" />
</div>
```

This crops correctly via `object-cover` regardless of the source image's
native aspect ratio, so it can never silently break when the image
changes. Every usage in this codebase follows this pattern now. (An
earlier attempt fixed this by making `<ResponsiveImage>` default to
`h-full w-full` internally — reverted, because Tailwind's cascade is
resolved by generated stylesheet order, not by where a class sits in the
markup string, and that default silently outranked `<BrandMark>`'s fixed
`h-10 w-10` logo chip instead of losing to it as the source order would
suggest. The `absolute inset-0` pattern above doesn't have that
failure mode.)

**Phase 2.1 image audit:** with that pattern in place sitewide, a second
audit specifically checked every pre-generated `-tile`/`-wide` file for
*content* problems — not the "renders short" bug above, but crops that
technically fill their box correctly while cropping out the actual
material. Checked: all 8 tile crops, all 8 wide crops, and every page
that uses them (homepage, `/products`, `/flooring`, `/wall-panels` and
their category pages, `/services`, `/gallery`, `/about`, `/locations`).
Found one real case — `pvc-tile` (see the Pipeline section above) — fixed
at the source and regenerated. Everything else was already showing its
material correctly; nothing else was changed.

### Before/After slider

`src/components/media/BeforeAfterSlider.jsx` is a reusable, accessible
(native `<input type="range">`, full keyboard support) reveal component,
demoed on the homepage with the `demo` prop, which renders a visible
disclaimer ("Demonstration imagery... not an actual Parquet & Decor Nepal
project"). Do not reuse it with real project photography without removing
that prop, and do not remove that prop without real project photography.

## Video

**Removed from the live homepage in Phase 2.1** — the owner didn't want
the ambient video experience on the site for now. `VideoMoment.jsx`
(and the video files themselves, in `_incoming-assets/` and
`public/videos/`) are left in the codebase, just no longer imported by
`Home.jsx`. No replacement video, autoplay, splash screen, or logo-video
intro was added — the section between the before/after demo and the
services preview simply closes up, no gap. To bring it back later:
re-add `<VideoMoment />` to `Home.jsx`; nothing else needs to change.

What it did, for reference: a homepage "visual break" between the
before/after demo and the closing CTA, using the ambient flooring clip
found in `_incoming-assets/` (see `IMAGE_SOURCES.md` §4 for how it was
identified and why the logo animation video wasn't used instead).
Deliberately **not** the hero — Phase 1 avoided autoplay hero video for
performance, and that reasoning still holds.

Strategy (still intact in the component, in case it's re-enabled):

- The poster image (`videoPoster` in `src/data/images.js`) is always in
  the DOM and only fades out on the video's `onPlaying` event — a slow
  network or failed load never leaves a blank/black rectangle.
- Autoplay is gated on **three** conditions: an `IntersectionObserver`
  (`rootMargin: 200px`, so the ~3.6MB file isn't fetched until the section
  is nearly in view), a `min-width: 768px` media query (no autoplay
  download on mobile), and `!prefers-reduced-motion`.
- Everyone who doesn't meet all three (mobile visitors, reduced-motion
  visitors) sees the static poster with an accessible play button instead
  — video loads only on that explicit tap, with native `controls` shown
  since it's now a deliberate, user-initiated action.
- `muted loop playsInline preload="none"` throughout; no audio.

The source clip is unprocessed (no `ffmpeg` available in this
environment — see `IMAGE_SOURCES.md` §4) and is somewhat heavy for its
10s length. Re-encoding it (lower bitrate, resolution matched to typical
display size) is a good Phase 2 follow-up once `ffmpeg` is available.

## Social links

`src/data/social.js` holds the two official accounts (Instagram, Facebook
— exact URLs as supplied, never invented) rendered by
`src/components/ui/SocialLinks.jsx`: small subtle icon links (React Icons'
`Fa` set, not downloaded logo images), `target="_blank" rel="noopener
noreferrer"`, accessible labels. Used in the footer and, more compactly,
at the bottom of the mobile menu — deliberately not in the header, to
avoid cluttering primary navigation.

## Contact channels (phone, WhatsApp, email)

`src/data/contact.js` holds the three real, owner-supplied channels —
never invented, never altered:

```js
phoneHref: 'tel:+9779851278641'        // "Call 9851278641"
whatsappHref: 'https://wa.me/9779851278641'   // opens a chat, no message prefilled
emailHref: 'mailto:parquetdecornepal@gmail.com'
```

Everything reads from this one file, so a future number/email change is a
one-line edit. Where each channel appears:

- **`MobileStickyCTA.jsx`** — a `xl:hidden` bar fixed to the bottom of
  every page (mounted once, in `Layout.jsx`): Call · WhatsApp · Get Quote,
  each a 52px tap target. `Layout.jsx` adds `pb-[52px] xl:pb-0` to the
  page's root flex container so the bar never overlaps the footer's own
  content — verified by measuring the footer's bottom edge against the
  bar's top edge, not just eyeballing a screenshot.
- **`ConsultationCTA.jsx`** (the sitewide closing-CTA band, used on 11+
  pages) — shows "Get a Quote on WhatsApp" alongside the existing
  "Get a Free Consultation" link by default (`showWhatsapp={false}` to
  opt out, not currently used anywhere).
- **`MaterialDetailPage.jsx`** — an "Enquire on WhatsApp" button next to
  the consultation button, in the per-material CTA block.
- **Footer** — phone/WhatsApp/email as a clickable list under the brand
  description, above the social icons.
- **Contact page** — the same three, with icons, above the form.
- **Mobile menu** — a "WhatsApp Us" button under "Get a Free
  Consultation".

`tel:`/`mailto:` links never get `target="_blank"` (there's no page to
open in a new tab); WhatsApp links always do, with `rel="noopener
noreferrer"`, since `wa.me` is a real destination.

## Routing

Every route from the brief is defined directly and explicitly in
`src/App.jsx` (React Router 7, code-split with `React.lazy` per page) —
there's no generic route-config indirection anymore, since every route
now has real, page-specific content. A handful of **reusable templates**
each serve several URLs:

| Template | Serves |
|---|---|
| `pages/materials/MaterialDetailPage.jsx` | `/flooring/:slug`, `/wall-panels/:slug`, **and** `/products/:slug` |
| `pages/materials/MaterialFamilyLanding.jsx` | `/flooring`, `/wall-panels` (family passed as a prop) |
| `pages/services/ServiceDetailPage.jsx` | `/services/:slug` |
| `pages/locations/LocationPage.jsx` | `/locations/:locationSlug` |

**Why `/products/:slug` reuses the flooring/wall-panel template rather than
having its own data:** there's no per-SKU product catalogue beyond the 8
material categories (see `src/data/materials.js`) — Parquet & Decor Nepal
sells material categories, not individually named products. Rather than
fabricate a separate "product" layer or leave the route as a placeholder,
`/products/parquet` resolves the exact same real content as
`/flooring/parquet`, just addressed differently; the page's breadcrumb
adapts to whichever URL was used to reach it.

`/projects/:projectSlug` and `/blog/:blogSlug` are also wired to real
lookup logic (`getProjectBySlug` / `getPostBySlug`), but `src/data/projects.js`
and `src/data/blog.js` are intentionally empty arrays (see "Content
authenticity" below) — every slug currently falls through to an honest
"not published yet" state, not a 404 and not a fake entry. The templates
themselves (`ProjectDetail.jsx`, `BlogDetail.jsx`) are fully built and
render real data the moment any is added.

Unmatched paths render a proper, on-brand 404 (`pages/NotFound.jsx`) with
links back to Products, Home, and a consultation path — not a router
crash or a generic error page.

## Data layer

Everything content-shaped lives in `src/data/`, imported by pages —
never scattered inline, and never read from Firestore (see "Firebase"
below):

| File | Contents |
|---|---|
| `materials.js` | The 8 flooring/wall-panel categories — the single source of truth, also consumed by the homepage product strip, the mega menu, and the footer |
| `services.js` | The 3 services (flooring installation, wall panel installation, interior consultation) |
| `locations.js` | Kathmandu, Lalitpur, Bhaktapur — each with genuinely distinct copy, not the same paragraph with the city swapped |
| `faqs.js` | A tagged FAQ bank — the `/faq` page groups and shows everything; material/service/location pages show a filtered subset via `getFaqsByTags()` |
| `projects.js`, `blog.js`, `testimonials.js` | **Intentionally empty** — see "Content authenticity" |
| `navigation.js` | Header mega-menu structure (derived from `materials.js`, not duplicated) and footer columns |
| `social.js` | The two official social links |

Every material/service/location record carries only general, factual
information about *what the category is* (how SPC flooring works, in
general) — never a Parquet & Decor Nepal–specific specification,
certification, or warranty claim, since none has been verified. See
"Content authenticity."

## Navigation

**Desktop** (`Header.jsx` + `MegaMenuItem.jsx`): Products, Projects,
Services, About, Contact, plus the "Get a Free Consultation" CTA.
"Products" is the only item with a dropdown — a small two-column mega
menu (Flooring / Wall Panels, 4 categories each) rather than adding
separate top-level "Flooring" and "Wall Panels" items, which would have
duplicated what the dropdown already covers. Opens on hover or focus,
closes on Escape, an outside click, or blur.

**Mobile** (`MobileMenu.jsx`): "Products" expands into Flooring and Wall
Panels, each independently expandable to their 4 categories — a nested
disclosure, not a second-level page, so the entire catalogue stays
reachable without leaving the menu. Every interactive target is 44px+;
Escape and outside-click both close the whole menu; focus isn't lost.

The mega-menu structure lives in `src/data/navigation.js`, derived
directly from `materials.js` — adding a 9th material to that one file
would automatically appear in both menus and the footer.

## Forms

`src/components/forms/ConsultationForm.jsx` (used on `/contact`, via
React Hook Form) — Name, Phone, Email, Location, Product/Service
interest, Project Type, Message. Accessible labels, `aria-invalid`/
`aria-describedby` wired to inline error text, 44px+ controls,
`react-hot-toast` for a single success confirmation (not one per field).

**No backend is connected yet** — see "Firebase" below and section 40 of
the Phase 2 brief, which explicitly defers the Firestore lead-management
system. Submitting validates the fields, builds the full future lead
shape (`name, phone, email, location, interest, projectType, message,
source, utm, date, status: 'New'`), and logs it to the console — it does
not currently email, store, or notify anyone. This is a deliberate stub:
swapping the `console.info` in `onSubmit` for a real write is the only
change Phase 3 needs.

## SEO foundation

Every page (28 routes, all real — see "Routing") sets its own title,
meta description, and canonical URL via `<Seo>`
(`src/components/seo/Seo.jsx`, `react-helmet-async`), plus Open Graph and
Twitter card tags. `H1` hierarchy was audited across every page during
Phase 2 QA — six pages (`ProductsLanding`, `ServicesLanding`, `Projects`,
`Gallery`, `Blog`, `Faq`) were found rendering their primary heading as an
`<h2>` via `<SectionHeading>`'s default tag; all now pass `as="h1"`
explicitly (same fix applied to `<EmptyState>`'s two standalone
not-found states).

**Structured data:**
- `OrganizationSchema.jsx` — sitewide, **only verified fields** (name,
  url, logo, description); deliberately no address/phone/geo/rating.
- `Breadcrumbs.jsx` — renders both the visible trail and a
  `BreadcrumbList` JSON-LD, used on every material, service, location,
  project and article page (not the homepage).
- `FAQAccordion.jsx` — an optional `schema` prop emits `FAQPage` JSON-LD;
  used on `/faq` (one schema covering every question actually shown,
  across all groups) and on each material/service/location page's
  filtered FAQ subset.

No rating, review, price, or address schema exists anywhere, since none
of that data is verified — see "Content authenticity" below.

`public/robots.txt` allows all crawling and points to `public/sitemap.xml`,
which lists all 25 real, indexable static routes (the `/products/:slug`
alias, and the empty-state `/projects/:slug` / `/blog/:slug` details, are
intentionally excluded — the first is a non-canonical duplicate, the
other two are `noindex`ed). Update it by hand when a new static route is
added; once `projects.js`/`blog.js` gain real entries, generating it at
build time from those files becomes worthwhile.

## Accessibility

Skip-to-content link, visible focus rings (`:focus-visible`, not just a
color change), semantic nav landmarks (`<nav aria-label>`), keyboard-
operable mobile menu (Escape to close, focus not lost), 44px minimum
touch targets on buttons and every mobile-menu disclosure/link, alt text
on every content image (decorative logo chip uses `alt=""` since the
brand name is adjacent as real text), and a global
`prefers-reduced-motion` override that disables animation duration
site-wide for users who request it.

Phase 2 additions: `FAQAccordion` uses real `<button aria-expanded
aria-controls>` + `role="region"` panels, not `<details>`, so it can
share the design system's animation and still work with a screen reader;
the desktop mega menu and mobile nested disclosures both close on
Escape and an outside click, and every trigger carries
`aria-expanded`/`aria-haspopup`; the consultation form ties every error
message to its field with `aria-invalid`/`aria-describedby`.

## Performance

- Route-based code splitting (`React.lazy` + `Suspense`) — now across all
  28 routes; per-page chunks are typically 1–4KB gzip (see `npm run
  build` output), so navigating the site never pulls in every page's code
  at once.
- Firebase loads in its own async chunk, only after mount.
- Framer Motion imported via `LazyMotion`/`m` (domAnimation feature set)
  instead of the full `motion` API — cut the animation-related JS by
  roughly two-thirds compared to the naive import.
- AVIF/WebP responsive images with explicit dimensions (no layout shift),
  `loading="lazy"` below the fold (`eager` for the small horizontally-
  scrolling product tiles — see above), `priority`/`fetchPriority="high"`
  on the hero only.
- The homepage's ambient video never downloads until scrolled near, never
  autoplays on mobile, and never autoplays for `prefers-reduced-motion`.
- Production build: ~94KB gzip main chunk + small per-route chunks (see
  `npm run build` output) — no unnecessary third-party scripts.

## Content authenticity

No invented testimonials, project names/locations, installation
statistics, years-of-experience claims, certifications, founder
biography, team size, awards, or manufacturer partnerships appear
anywhere in this codebase. Concretely:

- `src/data/projects.js`, `blog.js`, and `testimonials.js` are **empty
  arrays**, not placeholder entries. `Projects.jsx`, `Blog.jsx`, and
  `TestimonialsPreview.jsx` render an honest, on-brand "coming soon" /
  "incoming" state instead — see `EmptyState.jsx`. The moment real data
  is added to any of those three files, the corresponding page (and, for
  projects/blog, the `:slug` detail template) renders it with **no other
  code changes**.
- `/gallery` is explicitly framed as inspiration/reference imagery, never
  as completed company work — kept structurally separate from `/projects`
  (verified work only) throughout the UI copy.
- Material pages (parquet, SPC, WPC, acoustic, etc.) describe how each
  *category* generally works — never a Parquet & Decor Nepal–specific
  spec, warranty, or certification. The acoustic panel page carries an
  explicit `specNote` rather than a fabricated NRC rating.
- `/about` has no founding year, founder bio, team size, or project count.
- `/contact` states no phone, email, or physical address — none has been
  verified. Instagram and Facebook (the two confirmed channels) are the
  only contact info shown.
- `/locations/*` make no physical-address or showroom claim, and each
  city's copy is genuinely distinct — not the same paragraph with the
  name swapped.

Keep it that way until the business supplies real, verifiable
information — add it then, don't placeholder it now with something a
visitor could mistake for a real claim.

## What's built

**Phase 1:** project setup, design tokens, typography, Firebase config
architecture (no CMS), image pipeline + `<ResponsiveImage>` +
`<BeforeAfterSlider>` foundations, full route skeleton, header (with
overlay→solid scroll behavior) + mobile menu, homepage hero + trust strip
+ collection preview + before/after demo, footer, SEO/schema foundation,
accessibility and performance baseline.

**Phase 1.5:** the five approved Gemini anchor images confirmed and
documented; six additional licensed images sourced, vetted, and processed
for the product-category strip; the editorial "Craftsmanship" split
section; the ambient video "visual break" section with a fully-gated
autoplay strategy; Instagram/Facebook social links; a `loading="eager"`
escape hatch on `<ResponsiveImage>` for horizontally-scrolling content.

**Phase 2 — the complete public-facing website:** every route in the
brief now renders real, non-placeholder content — 8 material detail
pages (+ the `/products/:slug` alias) and 2 family landings, 1 products
showcase, 4 service pages, 3 location pages, `/projects` and `/blog` with
honest empty states plus fully-built detail templates ready for real
data, `/gallery` with client-side category filtering, `/faq` with 5
grouped sections and full `FAQPage` schema, and a `/contact` page with a
validated, accessible consultation form. New shared components:
`Breadcrumbs`, `FAQAccordion`, `ConsultationCTA`, `RelatedGrid`,
`EmptyState`, `MegaMenuItem`, `SocialLinks` (carried over), and
`ConsultationForm`. The header gained a two-column Products mega menu;
the mobile menu gained nested Flooring/Wall Panels disclosures. The
homepage was extended (not rebuilt) with Services, Projects, Testimonials
and FAQ preview sections plus a closing `ConsultationCTA`, completing the
conceptual structure from the brief. `src/data/products.js` and
`routesConfig.js` were retired in favor of `materials.js` (single source
of truth) and explicit routes in `App.jsx`; the now-unused `ComingSoon.jsx`
placeholder was deleted.

**Phase 2.1 — content, contact & polish:** homepage video removed (kept
in the codebase, unused); real contact channels wired up everywhere —
`MobileStickyCTA` (new, `xl:hidden`, mounted once in `Layout.jsx`),
WhatsApp added to `ConsultationCTA` and material detail pages, phone/
WhatsApp/email added to the footer and Contact page; footer redesigned
with a "Designed & Crafted by Aayush Mainali" credit; homepage material
strip curated from 8 to 6 items with name + finish-descriptor labels
(`featuredMaterialSlugs` in `materials.js`); a real image-cropping bug
found and fixed (`pvc-tile`, see Image architecture); `process-images.mjs`
made resilient to a single unreadable source file. No `svgContact`
element existed in the codebase (checked, nothing to remove); breadcrumbs
were already correct React Router navigation with no raw URLs (checked,
nothing to fix).

**Not built (by design):** CMS/admin dashboard, authentication, Firestore
CRUD, Cloudinary upload UI, the lead-management backend and dashboard,
fake data of any kind, video re-encoding (no `ffmpeg` in this
environment).
