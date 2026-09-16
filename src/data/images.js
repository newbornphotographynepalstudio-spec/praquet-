// Central image manifest: every generated responsive asset, described once
// and consumed by <ResponsiveImage>. Keeping this separate from components
// means a future swap to Cloudinary-hosted URLs only touches this file.
//
// Provenance / licensing for every source file lives in IMAGE_SOURCES.md —
// this file only describes how each image is *used* on the site.

function srcSet(basePath, widths, ext) {
  return widths.map((w) => `${basePath}-${w}.${ext} ${w}w`).join(', ')
}

function variant(basePath, widths, { width, height }) {
  const mid = widths[Math.floor(widths.length / 2)]
  return {
    avifSrcSet: srcSet(basePath, widths, 'avif'),
    webpSrcSet: srcSet(basePath, widths, 'webp'),
    jpgSrcSet: srcSet(basePath, widths, 'jpg'),
    fallback: `${basePath}-${mid}.jpg`,
    width,
    height,
  }
}

export const heroImage = {
  desktop: variant('/images/hero/hero-desktop', [960, 1440, 1920], { width: 1920, height: 1080 }),
  mobile: variant('/images/hero/hero-mobile', [480, 750, 900], { width: 900, height: 1125 }),
  alt: 'Modern living room with warm herringbone wood flooring and a vertical wood-slat feature wall, lit by daylight',
}

export const parquetCollectionImage = {
  desktop: variant('/images/flooring/parquet-wide', [640, 960, 1280], { width: 1280, height: 853 }),
  tile: variant('/images/flooring/parquet-tile', [480, 720], { width: 720, height: 900 }),
  alt: 'Herringbone parquet wood flooring in a bright, minimal living room',
}

export const flutedCollectionImage = {
  desktop: variant('/images/wall-panels/fluted-wide', [640, 960, 1280], { width: 1280, height: 853 }),
  tile: variant('/images/wall-panels/fluted-tile', [480, 720], { width: 720, height: 900 }),
  alt: 'Vertical fluted wood wall panels forming a partition beside a natural-linen sofa',
}

export const beforeAfterDemo = {
  before: variant('/images/before-after/demo-before', [480, 768, 1024], { width: 1024, height: 768 }),
  after: variant('/images/before-after/demo-after', [480, 768, 1024], { width: 1024, height: 768 }),
  beforeAlt: 'Unfinished apartment interior with bare concrete floor and walls, prior to any flooring or wall panel installation',
  afterAlt: 'Same interior after installation of warm herringbone wood flooring and a fluted wood accent wall',
}

// Product category strip (Phase 1.5). Two are the approved Gemini anchors
// (parquet, fluted) reused from above; the rest are externally sourced —
// see IMAGE_SOURCES.md for license/attribution on each. All contextual/
// inspiration imagery, not literal product photography — labeled as such
// in the UI copy.
export const productImages = {
  parquet: { tile: parquetCollectionImage.tile, wide: parquetCollectionImage.desktop, alt: parquetCollectionImage.alt },
  spc: {
    tile: variant('/images/products/spc-tile', [480, 720], { width: 720, height: 900 }),
    wide: variant('/images/products/spc-wide', [640, 960, 1280], { width: 1280, height: 853 }),
    alt: 'Bright modern living room with light wood-look flooring and minimal furniture',
  },
  laminate: {
    tile: variant('/images/products/laminate-tile', [480, 720], { width: 720, height: 900 }),
    wide: variant('/images/products/laminate-wide', [640, 960, 1280], { width: 1280, height: 853 }),
    alt: 'Warm-toned dining area with wood flooring, seen through a mirrored wood-framed partition',
  },
  wooden: {
    tile: variant('/images/products/wooden-tile', [480, 720], { width: 720, height: 900 }),
    wide: variant('/images/products/wooden-wide', [640, 960, 1280], { width: 1280, height: 853 }),
    alt: 'Natural wood plank flooring beneath a low ivory sofa in a minimal, sunlit room',
  },
  wpc: {
    tile: variant('/images/products/wpc-tile', [480, 720], { width: 720, height: 900 }),
    wide: variant('/images/products/wpc-wide', [640, 960, 1280], { width: 1280, height: 853 }),
    alt: 'Hotel lobby reception wall clad in dark vertical wood slats with a marble desk',
  },
  pvc: {
    tile: variant('/images/products/pvc-tile', [480, 720], { width: 720, height: 900 }),
    wide: variant('/images/products/pvc-wide', [640, 960, 1280], { width: 1280, height: 853 }),
    alt: 'Hallway feature wall with a warm mosaic wood-block panel beside walnut doors',
  },
  fluted: { tile: flutedCollectionImage.tile, wide: flutedCollectionImage.desktop, alt: flutedCollectionImage.alt },
  acoustic: {
    tile: variant('/images/products/acoustic-tile', [480, 720], { width: 720, height: 900 }),
    wide: variant('/images/products/acoustic-wide', [640, 960, 1280], { width: 1280, height: 853 }),
    alt: 'Close-up of layered horizontal wood slats forming a sculptural acoustic wall surface',
  },
}

// Material Collection option-card tiles (Phase 2.2) — one entry per option
// in src/data/materialOptions.js, all a single 4:5 tile crop (see
// MaterialOptionCard). Provenance for each source photo, including the two
// intentionally reused across categories, is in IMAGE_SOURCES.md §7.
function tile(basePath, alt) {
  return { tile: variant(basePath, [480, 720], { width: 720, height: 900 }), alt }
}

export const materialOptionImages = {
  'parquet-herringbone': tile('/images/material-options/parquet-herringbone', 'Close-up of warm oak herringbone parquet flooring'),
  'parquet-chevron-warm': tile('/images/material-options/parquet-chevron-warm', 'Chevron-pattern wood flooring in warm oak tone in a modern kitchen'),
  'parquet-chevron-dark': tile('/images/material-options/parquet-chevron-dark', 'Close-up of a dark walnut-toned chevron wood pattern'),
  'spc-warm-oak': tile('/images/material-options/spc-warm-oak', 'Warm oak wood-look plank texture'),
  'spc-ash-grey': tile('/images/material-options/spc-ash-grey', 'Ash grey wood-look plank texture'),
  'spc-light-pine': tile('/images/material-options/spc-light-pine', 'Light pine wood-look plank texture'),
  'laminate-natural-oak': tile('/images/material-options/laminate-natural-oak', 'Natural oak wood-look laminate texture'),
  'laminate-rustic-reclaimed': tile('/images/material-options/laminate-rustic-reclaimed', 'Rustic reclaimed-look wood plank texture with visible grain and patina'),
  'laminate-charcoal-dark': tile('/images/material-options/laminate-charcoal-dark', 'Charcoal dark wood-look plank texture'),
  'wooden-warm-honey': tile('/images/material-options/wooden-warm-honey', 'Warm honey-toned natural wood grain close-up'),
  'wooden-weathered-grey': tile('/images/material-options/wooden-weathered-grey', 'Weathered grey-toned natural wood plank texture'),
  'wpc-natural-grain': tile('/images/material-options/wpc-natural-grain', 'Close-up of a natural wood-grain slatted panel'),
  'wpc-espresso-flat': tile('/images/material-options/wpc-espresso-flat', 'Dark espresso-toned flat wood panel texture'),
  'pvc-wood-look': tile('/images/material-options/pvc-wood-look', 'Hallway feature wall with a warm mosaic wood-look panel'),
  'pvc-marble-look': tile('/images/material-options/pvc-marble-look', 'Backlit marble-look panel wall in a grid layout'),
  'fluted-natural-oak': tile('/images/material-options/fluted-natural-oak', 'Close-up of a natural oak-toned grooved panel'),
  'fluted-charcoal': tile('/images/material-options/fluted-charcoal', 'Charcoal-toned vertical fluted wall panel beside an elevator'),
  'acoustic-natural-slat': tile('/images/material-options/acoustic-natural-slat', 'Close-up of layered natural wood-tone acoustic slats'),
}

export const materialDetailImage = {
  desktop: variant('/images/editorial/material-detail', [480, 768, 1024], { width: 1024, height: 1280 }),
  alt: 'Hands comparing warm oak and walnut flooring samples alongside fabric and paint swatches',
}

export const videoPoster = {
  desktop: variant('/images/editorial/video-poster', [800, 1280, 1920], { width: 1920, height: 1080 }),
  alt: 'Close-up push-in shot of warm herringbone wood flooring in an ambient-lit living room',
}

export const brandLogo = {
  // Icon-only crop of the official mark. The source is a flat JPEG (no
  // transparency) with its own light backdrop baked in, so it is presented
  // inside a small framed chip (see <BrandMark>) rather than laid directly
  // over page backgrounds. The brand *name* is set as live text next to it.
  mark: variant('/images/brand/logo-mark', [256], { width: 256, height: 256 }),
}
