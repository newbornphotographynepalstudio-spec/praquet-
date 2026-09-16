import { materialOptionImages } from './images'

// Material Collection option cards (Phase 2.2) — the individual patterns,
// tones and finishes shown under "Explore {Category}" on each category
// page. Deliberately separate from materials.js: that file describes the
// 8 CATEGORIES (Parquet, SPC, Laminate, …); this file describes specific
// OPTIONS *within* a category (e.g. Parquet — Herringbone Pattern), keyed
// by categorySlug back to materials.js rather than repeating any category
// copy here. See the "brand content rule" — every description below is
// general style/finish language, never a manufacturer, SKU, price or
// certification claim, since none has been verified for our supplied
// product. Image provenance is in IMAGE_SOURCES.md §7; several tone photos
// are intentionally reused across two closely related categories rather
// than forcing in a mismatched image — documented there.
export const materialOptions = [
  // ---- Parquet ------------------------------------------------------------
  {
    slug: 'herringbone-pattern',
    categorySlug: 'parquet',
    name: 'Herringbone Pattern',
    finish: 'Warm Oak Tone',
    description: 'The classic zigzag lay — short, even planks set at a right angle to each other, running wall to wall.',
    image: materialOptionImages['parquet-herringbone'],
  },
  {
    slug: 'chevron-pattern-warm',
    categorySlug: 'parquet',
    name: 'Chevron Pattern',
    finish: 'Warm Oak Tone',
    description: 'Planks cut at an angle so each pair meets in a continuous point, giving a sharper, more directional line than herringbone.',
    image: materialOptionImages['parquet-chevron-warm'],
  },
  {
    slug: 'chevron-pattern-dark',
    categorySlug: 'parquet',
    name: 'Chevron Pattern',
    finish: 'Dark Walnut Tone',
    description: 'The same chevron lay in a deeper, more dramatic tone — a good fit for a room that wants the floor to anchor it.',
    image: materialOptionImages['parquet-chevron-dark'],
  },

  // ---- SPC ------------------------------------------------------------
  {
    slug: 'warm-oak-wood-look',
    categorySlug: 'spc',
    name: 'Warm Oak',
    finish: 'Wood-Look Finish',
    description: 'A honey-toned oak visual on a rigid SPC core — a practical, moisture-tolerant alternative where genuine timber isn’t suitable.',
    image: materialOptionImages['spc-warm-oak'],
  },
  {
    slug: 'ash-grey-wood-look',
    categorySlug: 'spc',
    name: 'Ash Grey',
    finish: 'Wood-Look Finish',
    description: 'A cooler, muted grey wood visual — one of the more requested tones for contemporary interiors right now.',
    image: materialOptionImages['spc-ash-grey'],
  },
  {
    slug: 'light-pine-wood-look',
    categorySlug: 'spc',
    name: 'Light Pine',
    finish: 'Wood-Look Finish',
    description: 'A pale, blonde wood visual that keeps a room feeling bright and opens up smaller spaces.',
    image: materialOptionImages['spc-light-pine'],
  },

  // ---- Laminate ------------------------------------------------------------
  {
    slug: 'natural-oak-finish',
    categorySlug: 'laminate',
    name: 'Natural Oak',
    finish: 'Wood-Look Finish',
    description: 'A clean, even oak grain print — a versatile, accessible starting point for most living and office spaces.',
    image: materialOptionImages['laminate-natural-oak'],
  },
  {
    slug: 'rustic-reclaimed-look',
    categorySlug: 'laminate',
    name: 'Rustic Reclaimed-Look',
    finish: 'Wood-Look Finish',
    description: 'A weathered, characterful surface print with visible grain and patina, for a more lived-in, informal feel.',
    image: materialOptionImages['laminate-rustic-reclaimed'],
  },
  {
    slug: 'charcoal-dark-finish',
    categorySlug: 'laminate',
    name: 'Charcoal Dark',
    finish: 'Wood-Look Finish',
    description: 'A near-black wood visual for a bolder, more contemporary room, usually paired with lighter walls and furniture.',
    image: materialOptionImages['laminate-charcoal-dark'],
  },

  // ---- Wooden Flooring ------------------------------------------------------------
  // Deliberately tone-led rather than species-led: no specific wood species
  // is claimed here, since that hasn't been independently verified for our
  // supplied product. See the brand content rule.
  {
    slug: 'warm-honey-tone',
    categorySlug: 'wooden-flooring',
    name: 'Warm Honey Tone',
    finish: 'Natural Timber',
    description: 'A warm, golden-brown genuine timber tone with natural grain and colour variation from board to board.',
    image: materialOptionImages['wooden-warm-honey'],
  },
  {
    slug: 'weathered-grey-tone',
    categorySlug: 'wooden-flooring',
    name: 'Weathered Grey Tone',
    finish: 'Natural Timber',
    description: 'A softer, greyed-down timber tone for a calmer, more understated wood floor.',
    image: materialOptionImages['wooden-weathered-grey'],
  },

  // ---- WPC Wall Panels ------------------------------------------------------------
  {
    slug: 'natural-wood-grain-finish',
    categorySlug: 'wpc',
    name: 'Natural Wood-Grain',
    finish: 'Slatted Profile',
    description: 'An evenly slatted profile with a warm, natural wood-grain surface — the more understated of the two WPC finishes.',
    image: materialOptionImages['wpc-natural-grain'],
  },
  {
    slug: 'espresso-flat-panel',
    categorySlug: 'wpc',
    name: 'Espresso',
    finish: 'Flat Panel Finish',
    description: 'A dark, flat-profile panel with a horizontal wood-grain surface, for a quieter feature wall than a slatted profile gives.',
    image: materialOptionImages['wpc-espresso-flat'],
  },

  // ---- PVC Wall Panels ------------------------------------------------------------
  {
    slug: 'wood-look-finish',
    categorySlug: 'pvc',
    name: 'Wood-Look',
    finish: 'Mosaic Panel Finish',
    description: 'A lightweight, easy-to-clean panel finished with a warm wood-block visual — a practical alternative to real wood panelling.',
    image: materialOptionImages['pvc-wood-look'],
  },
  {
    slug: 'marble-look-finish',
    categorySlug: 'pvc',
    name: 'Marble-Look',
    finish: 'Backlit Panel Finish',
    description: 'A cooler, stone-textured panel visual, shown here with backlighting — a look increasingly used in reception and hospitality interiors.',
    image: materialOptionImages['pvc-marble-look'],
  },

  // ---- Fluted Wall Panels ------------------------------------------------------------
  {
    slug: 'natural-oak-fluted',
    categorySlug: 'fluted',
    name: 'Natural Oak',
    finish: 'Vertical Groove Profile',
    description: 'A warm, natural-toned fluted profile — the softer of the two finishes, and an easy match for most wood flooring tones.',
    image: materialOptionImages['fluted-natural-oak'],
  },
  {
    slug: 'charcoal-fluted',
    categorySlug: 'fluted',
    name: 'Charcoal',
    finish: 'Vertical Groove Profile',
    description: 'A darker, more graphic fluted profile — currently one of the most requested feature-wall finishes for reception and lobby spaces.',
    image: materialOptionImages['fluted-charcoal'],
  },

  // ---- Acoustic Wall Panels ------------------------------------------------------------
  // Only one option is listed here — see the note on the category page.
  // Unlike the other seven categories, no Nepal-specific market evidence
  // for a wider acoustic-panel range was found during research for this
  // phase, so this is shown as a style reference rather than a confirmed
  // catalogue, per the brand content rule.
  {
    slug: 'natural-wood-tone-slat',
    categorySlug: 'acoustic',
    name: 'Natural Wood-Tone',
    finish: 'Slatted Profile',
    description: 'A layered natural wood-tone slat surface over a sound-absorbing backing — shown here as a style reference for what an acoustic panel wall can look like.',
    image: materialOptionImages['acoustic-natural-slat'],
  },
]

export function getMaterialOptionsByCategory(categorySlug) {
  return materialOptions.filter((option) => option.categorySlug === categorySlug)
}

export function getMaterialOptionBySlug(categorySlug, optionSlug) {
  return materialOptions.find((option) => option.categorySlug === categorySlug && option.slug === optionSlug)
}
