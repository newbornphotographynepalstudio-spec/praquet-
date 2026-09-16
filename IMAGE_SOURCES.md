# Image Source & Licensing Manifest

This file tracks the provenance of every photographic/video asset used on
the site. It is a developer/owner reference — none of this is shown in the
public UI. Categories used below: `GEMINI_GENERATED`, `COMPANY_PROVIDED`,
`EXTERNAL_FREE_LICENSED`, `FUTURE_REAL_PROJECT`.

## 1. Brand assets — `COMPANY_PROVIDED`

| File | Description | Used for |
|---|---|---|
| `logo.jpeg` | Official brand lockup (icon + wordmark) | Favicon set, header/footer icon chip (`brandLogo.mark`) |
| `logo_video.mp4` | Animated reveal of the logo mark | Not currently used — kept for a possible future intro/loading treatment |

Treated as source-of-truth brand artwork. Pixels are only cropped/resized
(favicon extraction), never redrawn, recolored, or altered — see README.md
for why the logo is presented inside a small framed chip rather than
directly on page backgrounds (the source JPEG has no transparency).

## 2. Approved core interior images — `GEMINI_GENERATED`

Confirmed by the owner: these five images were generated with Gemini and
are the approved visual anchors for the brand. They are used as-is (only
cropped/resized by the pipeline, never re-generated or replaced) and are
labeled in the UI as demonstration/inspiration imagery, not real company
projects, per the brand content rule below.

| File | Used for |
|---|---|
| `hero-premium-interior.jpeg` | Homepage hero (`heroImage`) |
| `flooring-collection-parquet.jpeg` | Flooring collection tile + Parquet product-strip tile (`parquetCollectionImage`) |
| `wall-panel-collection-fluted.jpeg` | Wall panel collection tile + Fluted product-strip tile (`flutedCollectionImage`) |
| `before-living-room.jpeg` | "Before" side of the before/after demo (`beforeAfterDemo.before`) |
| `after-living-room.jpeg` | "After" side of the before/after demo (`beforeAfterDemo.after`) |

**Brand content rule:** the before/after slider and every section using
this imagery explicitly labels it as demonstration/inspiration in the UI
copy ("Demonstration imagery for illustration only — not an actual
Parquet & Decor Nepal project"). Do not remove that disclaimer without
replacing the underlying images with real, verified project photography
(see `FUTURE_REAL_PROJECT` below).

## 3. Additional sourced imagery (Phase 1.5) — `EXTERNAL_FREE_LICENSED`

Sourced to fill out the product-category strip and two new editorial
sections, chosen to visually cohere with the five Gemini anchors (warm
wood tones, natural light, restrained architectural composition). All
downloaded and stored locally under `_incoming-assets/`, processed through
the existing pipeline — no hotlinking, no `source.unsplash.com`. Several
other candidates were reviewed and rejected first; see §5.

| Asset filename | Used for | Source | Author | License | Date sourced | Notes |
|---|---|---|---|---|---|---|
| `spc-flooring-modern-interior.jpg` | SPC Flooring — product-strip tile | [pexels.com/photo/6890405](https://www.pexels.com/photo/light-apartment-with-white-walls-and-wooden-furniture-and-decorative-elements-6890405/) | Max Vakhtbovych | Pexels License (free for commercial use, no attribution required) | 2026-09-16 | Light wood-look floor, minimal studio apartment. Contextual/inspiration only — not literal SPC product photography. |
| `laminate-flooring-interior.jpg` | Laminate Flooring — product-strip tile | [pexels.com/photo/6180674](https://www.pexels.com/photo/modern-interior-of-comfortable-living-room-6180674/) | Max Vakhtbovych | Pexels License | 2026-09-16 | Warm-toned dining nook seen through a mirrored wood partition; wood flooring visible. Inspiration only. |
| `wooden-flooring-interior.jpg` | Wooden Flooring — product-strip tile | [pexels.com/photo/4352247](https://www.pexels.com/photo/white-couch-on-wooden-floor-4352247/) | Maksim Goncharenok | Pexels License | 2026-09-16 | Natural wood plank floor, ivory sofa, generous negative space. Inspiration only. |
| `wpc-wall-panel-interior.jpg` | WPC Panels — product-strip tile | [unsplash.com/photos/tUcVQwXsNck](https://unsplash.com/photos/modern-lobby-with-reception-desk-and-elevators-tUcVQwXsNck) | Aalo Lens | Unsplash License (free for commercial and noncommercial use) | 2026-09-16 | Commercial lobby, dark vertical wood-slat feature wall. Inspiration only. |
| `pvc-wall-panel-interior.jpg` | PVC Panels — product-strip tile | [pexels.com/photo/7166928](https://www.pexels.com/photo/contemporary-hallway-in-an-apartment-with-wooden-elements-7166928/) | Max Vakhtbovych | Pexels License | 2026-09-16 | Hallway with a 3D wood-mosaic accent wall. Inspiration only — not literal PVC panel photography. |
| `acoustic-wall-panel-detail.jpg` | Acoustic Panels — product-strip tile | [unsplash.com/photos/MEUtre4hH3o](https://unsplash.com/photos/a-room-filled-with-lots-of-wooden-slats-MEUtre4hH3o) | Declan Sun | Unsplash License | 2026-09-16 | Abstract close-up of layered wood slats. Source had a very saturated tungsten-orange color cast; moderately desaturated during processing (`saturation: 0.6, brightness: 1.03`, no hue shift) so it reads as natural warm timber rather than the as-shot neon-orange lighting artifact. An earlier pass also rotated hue (`-8`), which pushed the wood toward an inaccurate pink/salmon tone — reverted on final QA since that miscolored the material more than the original did; see `scripts/process-images.mjs`. |
| `material-sample-selection.jpg` | "Every Detail Chosen With Intent" editorial section | [pexels.com/photo/6583355](https://www.pexels.com/photo/hand-of-a-person-holding-wooden-plank-samples-6583355/) | cottonbro studio | Pexels License | 2026-09-16 | Hands comparing wood veneer and fabric samples. Used for the craftsmanship/material-selection story, not a specific product. |

None of these carry watermarks, third-party logos, or unclear licensing —
each was checked on its source page before download. All were reviewed
against the five Gemini anchors for color temperature, lighting, and
compositional consistency before selection.

## 4. Video asset

| File | Content | Decision |
|---|---|---|
| `Modern_luxury_interior_architect…mp4` → served as `public/videos/flooring-ambient-loop.mp4` | 10s, 1280×720, H.264/AAC. Cinematic low-angle push-in over herringbone wood flooring into an ambient-lit living room. | **Used** — as the homepage's "visual break" moment (`VideoMoment` section, between the before/after demo and the closing CTA), muted/looped, not as the hero. See README.md "Video" for the full autoplay/performance strategy. |
| `logo_video.mp4` | Animated logo reveal on a concrete backdrop. | **Not used.** This is a brand-mark animation, not interior/material content — doesn't fit a content section. Kept available for a possible future intro/splash treatment. |

The video's poster frame (`_incoming-assets/video-poster-source.png`, 1200×675)
was extracted with macOS Quick Look (`qlmanage -t`) since no `ffmpeg`/`ffprobe`
was available in this environment — worth installing for Phase 2 if further
video processing (compression, additional posters, trimming) is needed. The
source video itself (3.6MB for 10s) was **not** re-encoded/compressed for the
same reason; it is currently only downloaded when a visitor scrolls near the
section, and never on mobile unless the visitor explicitly taps play (see
README.md).

## 5. Candidates reviewed and rejected

Kept for context — reasons ranged from clashing decor style to color
palette mismatch, not just resolution/relevance:

- Several "SPC/laminate flooring" candidates (Pexels 3952034, 7027720, 4846106,
  6510974) — rejected for cluttered/bohemian styling, cool gray tones, dated
  "real-estate listing" staging, or overly ornate mouldings that clash with
  the brand's clean architectural minimalism.
- A "PVC wall panel" candidate (Pexels 7045844, striped beige staircase) —
  rejected for a traditional/classical decor style (chandelier, curved
  staircase) that doesn't match the brand.
- A "wooden flooring" candidate (Unsplash, Clay Banks) — beautiful and
  on-brand, but the visible floor material read as dark stone/slate rather
  than wood, which would have mislabeled the image.
- One Unsplash "minimalist living room" candidate (rawkkim) was visually
  strong but included an identifiable person mid-stride; skipped in favor
  of unpopulated interiors.

## 6. Generated, web-served assets (`public/images/`)

Everything under `public/images/` is derived from the sources above by
`scripts/process-images.mjs` (AVIF / WebP / JPEG, multiple widths — see
README.md "Responsive image strategy"). These are build outputs, not
sources; re-run `npm run images:process` any time a source file changes.

| Folder | Contents |
|---|---|
| `brand/` | Favicons (16/32/180/512px, cropped from `logo.jpeg`'s icon mark only), `logo-mark-256.*` for the header/footer chip |
| `hero/` | `hero-desktop-*` (16:9, 960–1920w) and `hero-mobile-*` (4:5, right-anchored, 480–900w) |
| `flooring/` | `parquet-wide-*` (3:2) and `parquet-tile-*` (4:5) |
| `wall-panels/` | `fluted-wide-*` (3:2) and `fluted-tile-*` (4:5) |
| `products/` | `{spc,laminate,wooden,wpc,pvc,acoustic}-tile-*` (4:5, 480/720w) — product-strip tiles; `{spc,laminate,wooden,wpc,pvc,acoustic}-wide-*` (3:2, 640–1280w, added in Phase 2) — material detail page heroes, same source photos, no new external sourcing |
| `before-after/` | `demo-before-*` / `demo-after-*` (4:3), used by `<BeforeAfterSlider demo />` |
| `editorial/` | `material-detail-*` (4:5, craftsmanship section) and `video-poster-*` (16:9, video section fallback) |
| `og/` | `default-og.jpg` (1200×630), the fallback Open Graph image for `<Seo>` |

## How to add or replace images

1. Drop the new source JPEG into `_incoming-assets/` (gitignored — raw
   sources never get committed).
2. Add or update its entry in `scripts/process-images.mjs` (`jobs` array —
   each entry sets the crop aspect ratio, output widths, and optional
   `modulate` color correction for its role).
3. Run `npm run images:process`.
4. If it's a new image (not replacing an existing role), add a descriptor
   for it in `src/data/images.js` and reference that from a component via
   `<ResponsiveImage desktop={...} mobile={...} alt="..." />`.

## Phase 2 note

No new images were sourced for Phase 2 — the approved library from
Phase 1/1.5 was sufficient for the full public site (material detail
pages, service pages, gallery, locations, about). The only pipeline
change was generating a `-wide` (3:2) crop of each already-downloaded
product photo for material detail-page heroes, alongside the existing
`-tile` (4:5) crop — same source files, same licenses, no new entries
needed in §3.

## Phase 2.1 note

No new images were sourced for Phase 2.1 either — the homepage's curated
6-material selection (`featuredMaterialSlugs` in `src/data/materials.js`)
and every other change this phase drew entirely from the existing
approved library.

**Image audit fix:** `pvc-tile-*` was cropping out the mosaic wall panel
entirely (the panel sits at the right edge of the source photo; the
default centre-gravity crop for the 4:5 tile showed only the hallway
floor and doors, none of the actual wall material). Fixed by setting
`position: 'right'` on that job in `scripts/process-images.mjs` and
regenerating — same source file, no relicensing needed. No other tile or
wide crop had this problem; see README.md's image-audit notes for the
full list checked.

## 7. Material Collection option cards (Phase 2.2) — `EXTERNAL_FREE_LICENSED`

Sourced to fill the "Explore {Category}" material-option cards added on each
of the 8 category pages (`src/data/materialOptions.js`). Nepal market
research (see below) informed which patterns/tones to look for; every
candidate was reviewed visually before selection, and several were
rejected — see the rejection notes at the end of this section. All
downloaded and stored locally under `_incoming-assets/`, processed through
the existing pipeline — no hotlinking.

| Asset filename | Used for | Source | Author | License | Date sourced | Notes |
|---|---|---|---|---|---|---|
| `parquet-herringbone-detail.jpg` | Parquet — Herringbone Pattern | [pexels.com/photo/15066939](https://www.pexels.com/photo/pattern-on-a-hardwood-flooring-15066939/) | Pexels contributor | Pexels License | 2026-09-16 | Clean top-down herringbone floor, warm oak tone, no clutter. |
| `parquet-chevron-warm-interior.jpg` | Parquet — Chevron Pattern (Warm Oak Tone) | [pexels.com/photo/chevron-pattern-wood-floor-kitchen](https://www.pexels.com) (kitchen interior, chevron floor) | Pexels contributor | Pexels License | 2026-09-16 | Full kitchen interior — pre-cropped to the bottom ~60% of the source (`parquet-chevron-warm-interior-precrop.jpg`, generated locally, not committed) before the pipeline resize, since the target 4:5 tile is much taller than the 800×534 source and a `position` gravity alone couldn't reach the floor. See the job comment in `scripts/process-images.mjs`. |
| `parquet-chevron-dark-detail.jpg` | Parquet — Chevron Pattern (Dark Walnut Tone) | Pexels (dark stained diagonal-plank close-up) | Pexels contributor | Pexels License | 2026-09-16 | Clean close-up, no clutter, moodier/darker tone than the warm option for genuine variety. |
| `spc-warm-oak-plank.jpg` | SPC — Warm Oak | Pexels (light honey plank texture) | Pexels contributor | Pexels License | 2026-09-16 | Clean vertical-plank texture, minor vignette from the original photo treatment, acceptable at card size. |
| `spc-ash-grey-plank.jpg` | SPC — Ash Grey; also reused for Wooden Flooring — Weathered Grey Tone | Pexels (grey weathered plank texture) | Pexels contributor | Pexels License | 2026-09-16 | Clean, no clutter. Reused for a second, genuinely-matching tone option on a different category page rather than sourcing a near-duplicate grey plank photo. |
| `spc-light-pine-plank.jpg` | SPC — Light Pine | Pexels (blonde pine plank texture) | Pexels contributor | Pexels License | 2026-09-16 | Clean, visible knots, reads as pine. |
| `laminate-natural-oak-detail.jpg` | Laminate — Natural Oak; also reused for Wooden Flooring — Warm Honey Tone | Pexels (close warm golden wood grain) | Pexels contributor | Pexels License | 2026-09-16 | Clean close-grain texture, no defects. Reused for a second, genuinely-matching tone option (see note above). |
| `laminate-rustic-reclaimed-detail.jpg` | Laminate — Rustic Reclaimed-Look | Pexels (aged plank with nail holes/patina) | Pexels contributor | Pexels License | 2026-09-16 | Visible wear/patina used intentionally for the "reclaimed-look" finish. |
| `laminate-charcoal-dark-detail.jpg` | Laminate — Charcoal Dark | Pexels (dark grey-black weathered plank) | Pexels contributor | Pexels License | 2026-09-16 | Matches the darker/grey wood-look tones noted as trending in Nepal market research. |
| `slat-wood-grain-detail.jpg` | WPC — Natural Wood-Grain; also reused for Fluted — Natural Oak | Pexels (warm slatted panel close-up) | Pexels contributor | Pexels License | 2026-09-16 | Source has a faint shadow silhouette along the left ~30%; pre-cropped to the right 68% of width (`slat-wood-grain-detail-precrop.jpg`, generated locally, not committed) before the pipeline resize, since the target aspect was too close to the source's own to crop it out via `position` alone. Reused for a second, genuinely-matching option on Fluted's page (both categories cover natural-tone slatted/grooved profiles). |
| `wpc-espresso-flat-panel.jpg` | WPC — Espresso (Flat Panel Finish) | [pexels.com/photo/3705687](https://www.pexels.com/photo/brown-and-black-wooden-surface-3705687/) | Pexels contributor | Pexels License | 2026-09-16 | Clean dark horizontal-grain board texture — used to represent WPC's flat-profile option (materials.js already notes WPC comes in "slatted and flat profiles"). |
| `fluted-charcoal-lobby.jpg` | Fluted — Charcoal | Pexels (elevator lobby with slatted wall) | Pexels contributor | Pexels License | 2026-09-16 | Source includes readable wall signage/branding at the right edge of frame — left-weighted crop (`position: 'left'` in the pipeline job) keeps only the elevator and slatted wall, fully excluding the sign. Matches the darker/charcoal finish noted as a current trend in Nepal market research. |
| `pvc-marble-look-panel.jpg` | PVC — Marble-Look | Pexels (backlit marble-look panel grid) | Pexels contributor | Pexels License | 2026-09-16 | Clean, modern, repeating pattern — safe to crop anywhere. |

No new sourcing was needed for PVC — Wood-Look (reuses the existing
`pvc-wall-panel-interior.jpg`, same crop rationale as `pvc-tile` above) or
Acoustic — Natural Wood-Tone (reuses the existing
`acoustic-wall-panel-detail.jpg` with the same warm-cast correction as its
category hero).

**Candidates reviewed and rejected for this phase:**

- Three "Jali"/geometric-lattice screen candidates (an ornate heritage
  carved-wood window, a busy modern metal screen with hanging lamps and a
  garden view, and a dusty white perforated-concrete screen with dead grey
  space) — none fit the brand's clean, modern aesthetic or read as a
  genuine PVC panel finish. No dedicated Jali option card was added; PVC
  stays at two options (Wood-Look, Marble-Look).
- An industrial interior with riveted steel pillars and glass walls
  (candidate for an SPC "Stone-Look" option) — rejected for being too busy/
  architectural, with a blurred person visible in the background, and not
  reading clearly as a floor material.
- A wood-plank photo with an odd blue-stained board — rejected as a defect,
  not a genuine finish.
- Two additional wood-slat candidates (a furniture/cabinet plinth detail,
  and an outdoor slat fence with daylight/foliage shadow) — rejected as not
  representing an interior wall panel.
- A duplicate hit of the same herringbone photo already used, returned
  again under a "basket-weave" search — no distinct basket-weave pattern
  photo was found; Parquet stays at three options (Herringbone, two Chevron
  tones) rather than forcing in a repeat or a mismatched image.

**Nepal market context:** research for this phase found no readily
available Nepal-specific documentation of a wider acoustic-panel range, so
Acoustic intentionally ships with a single option card, framed in its own
copy as a style reference rather than a confirmed catalogue. Grey/ash and
charcoal/dark tones came up repeatedly as current, in-demand finishes
across flooring and wall-panel searches, which is reflected in the
Ash Grey (SPC), Charcoal Dark (Laminate), and Charcoal (Fluted) options
above.

## 8. Future sourcing — `FUTURE_REAL_PROJECT`

Once Parquet & Decor Nepal completes real installations, replace the
`GEMINI_GENERATED` before/after pair and any "inspiration" product-strip
tile with actual project photography using the same filenames/roles (or
new ones wired the same way) — no redesign required. Until then, do not
relabel any current image as a real project, location, or customer work.
When additional external sourcing is needed, use Unsplash, Pexels,
Pixabay, or Wikimedia Commons under clearly permissive licenses, and record
it here with the same fields as §3 before adding it to `_incoming-assets/`.
