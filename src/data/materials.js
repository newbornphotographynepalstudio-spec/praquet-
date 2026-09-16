import { productImages } from './images'

// Single source of truth for the 8 flooring/wall-panel categories — used by
// the homepage product strip, /flooring, /wall-panels, every material detail
// page, and the /products/:slug template. All copy below describes general,
// well-established facts about each material category (how the category
// works, in general) — never a specification, certification, or warranty
// claim specific to Parquet & Decor Nepal's own supplied product, since no
// such verified data exists yet. See the "brand content rule" in README.md.
export const materialFamilies = {
  flooring: { label: 'Flooring', to: '/flooring' },
  'wall-panels': { label: 'Wall Panels', to: '/wall-panels' },
}

export const materials = [
  {
    slug: 'parquet',
    family: 'flooring',
    name: 'Parquet Flooring',
    finish: 'Herringbone Pattern',
    tagline: 'Warm, architectural, timeless.',
    shortDescription: 'Wood laid in geometric patterns — herringbone, chevron and beyond — so the floor itself becomes part of the room’s architecture.',
    intro:
      'Parquet is a flooring technique where wood pieces are arranged into geometric patterns — herringbone, chevron, basket-weave — rather than laid as simple straight planks. The pattern itself becomes part of the room’s architecture, catching light differently across the floor.',
    features: [
      'Natural wood surface with visible grain and character',
      'Geometric laying patterns — herringbone, chevron and more — add visual depth',
      'Warmer underfoot than hard tile or stone',
      'A real wood surface that can be refinished over time',
    ],
    applications: ['Living rooms', 'Bedrooms', 'Hospitality interiors', 'Feature-floor entryways'],
    image: productImages.parquet,
    faqTags: ['parquet', 'flooring'],
  },
  {
    slug: 'spc',
    family: 'flooring',
    name: 'SPC Flooring',
    finish: 'Wood-Look Finish',
    tagline: 'Contemporary, practical, durability-focused.',
    shortDescription: 'A rigid-core vinyl floor with a wood- or stone-look surface, built for stability in busy, moisture-prone spaces.',
    intro:
      'SPC (Stone Plastic Composite) is a rigid-core vinyl flooring, built up from a stone-plastic composite base beneath a printed wood- or stone-look surface layer. The rigid core keeps it dimensionally stable across everyday temperature and humidity changes.',
    features: [
      'Rigid core construction for dimensional stability',
      'Wide range of wood-look and stone-look finishes',
      'Well suited to areas with more moisture or foot traffic than solid wood',
      'Click-lock installation over a suitable subfloor',
    ],
    applications: ['Kitchens', 'Bathrooms', 'Commercial spaces', 'Busy family households'],
    image: productImages.spc,
    faqTags: ['spc', 'flooring'],
  },
  {
    slug: 'laminate',
    family: 'flooring',
    name: 'Laminate Flooring',
    finish: 'Wood-Look Finish',
    tagline: 'Versatile, accessible, design-forward.',
    shortDescription: 'A high-resolution wood-look surface over a durable core — a practical way to bring a timber look across larger areas.',
    intro:
      'Laminate flooring uses a high-resolution printed decorative layer — often replicating wood grain — protected by a hard-wearing top coat, over a fibreboard core. It offers a wide design range at a more accessible price point than solid wood.',
    features: [
      'Printed decorative layer available in many wood and stone visuals',
      'Wear-resistant top layer',
      'Fibreboard core with click-lock or glue-down installation',
      'A practical way to introduce a wood look across larger areas',
    ],
    applications: ['Living areas', 'Bedrooms', 'Offices', 'Renovation projects'],
    image: productImages.laminate,
    faqTags: ['laminate', 'flooring'],
  },
  {
    slug: 'wooden-flooring',
    family: 'flooring',
    name: 'Wooden Flooring',
    finish: 'Natural Timber',
    tagline: 'Natural, characterful, enduring.',
    shortDescription: 'Genuine timber flooring — natural grain and tone variation, and the warmth that only a real wood surface brings.',
    intro:
      'Solid and engineered wooden flooring bring genuine timber into a space — natural grain, tone variation from board to board, and the tactile warmth that comes only from a real wood surface underfoot.',
    features: [
      'A genuine timber wear layer or solid boards',
      'Natural grain and colour variation, board to board',
      'Can be sanded and refinished over its lifetime',
      'Develops character and a natural patina with age',
    ],
    applications: ['Living rooms', 'Bedrooms', 'Studies', 'Premium residential interiors'],
    image: productImages.wooden,
    faqTags: ['wooden-flooring', 'flooring'],
  },
  {
    slug: 'wpc',
    family: 'wall-panels',
    name: 'WPC Wall Panels',
    finish: 'Wood-Texture Finish',
    tagline: 'Warm texture, modern performance.',
    shortDescription: 'Wood-fibre composite panels that carry the warmth of timber with more stability in humid conditions than solid wood panelling.',
    intro:
      'WPC (Wood Plastic Composite) wall panels combine wood fibre with a polymer binder, giving a panel that carries the visual warmth of timber with greater resistance to humidity than solid wood panelling.',
    features: [
      'Wood-fibre and polymer composite construction',
      'More stable in humid conditions than solid timber panelling',
      'Available in slatted and flat profiles',
      'Installs as a straightforward feature-wall system',
    ],
    applications: ['Feature walls', 'Media walls', 'Reception areas', 'Commercial interiors'],
    image: productImages.wpc,
    faqTags: ['wpc', 'wall-panels'],
  },
  {
    slug: 'pvc',
    family: 'wall-panels',
    name: 'PVC Wall Panels',
    finish: 'Smooth Matte Finish',
    tagline: 'Light, practical, easy to live with.',
    shortDescription: 'Lightweight, moisture-resistant panels that offer an easy-to-clean alternative to paint or tiling in demanding spaces.',
    intro:
      'PVC wall panels are lightweight polymer panels finished in a range of decorative surfaces, offering an easy-to-clean, moisture-resistant alternative to paint or tiling in demanding spaces.',
    features: [
      'Lightweight and straightforward to install',
      'Moisture-resistant surface',
      'Easy to wipe clean',
      'A wide range of decorative finishes',
    ],
    applications: ['Bathrooms', 'Kitchens', 'Commercial interiors', 'Low-maintenance walls'],
    image: productImages.pvc,
    faqTags: ['pvc', 'wall-panels'],
  },
  {
    slug: 'fluted',
    family: 'wall-panels',
    name: 'Fluted Wall Panels',
    finish: 'Vertical Groove Profile',
    tagline: 'Depth, rhythm, architectural presence.',
    shortDescription: 'A vertical ribbed profile that brings depth, shadow and rhythm to a flat wall — considered architecture, not applied decoration.',
    intro:
      'Fluted panels use a vertical ribbed or grooved profile to bring depth, shadow and rhythm to an otherwise flat wall — a detail that reads as considered architecture rather than applied decoration.',
    features: [
      'Vertical ribbed profile creates natural shadow lines',
      'Adds tactile depth to a flat wall',
      'Works as a full feature wall or a defined partition',
      'Pairs naturally with warm wood flooring',
    ],
    applications: ['Feature walls', 'Room dividers', 'Reception and hospitality interiors', 'Headboard walls'],
    image: productImages.fluted,
    faqTags: ['fluted', 'wall-panels'],
  },
  {
    slug: 'acoustic',
    family: 'wall-panels',
    name: 'Acoustic Wall Panels',
    finish: 'Slatted Profile',
    tagline: 'Texture with a quieter room in mind.',
    shortDescription: 'A slatted architectural surface paired with a sound-absorbing backing — texture and a calmer room, together.',
    intro:
      'Acoustic wall panels pair an architectural slatted or perforated surface with a sound-absorbing backing, adding texture to a wall while helping soften hard-surface echo in the room.',
    features: [
      'Slatted or perforated architectural surface',
      'Backing material designed to help absorb sound reflections',
      'Adds the same warmth and texture as other wood-panel systems',
      'Suited to rooms where both appearance and sound matter',
    ],
    applications: ['Living rooms', 'Home theatres', 'Offices', 'Studios and meeting rooms'],
    // Deliberately no NRC rating, certification, or dB reduction figure —
    // none has been verified for our supplied panels. See brand content rule.
    specNote: 'Specific acoustic performance ratings will be published here once documented for our supplied panels.',
    image: productImages.acoustic,
    faqTags: ['acoustic', 'wall-panels'],
  },
]

// Curated homepage selection (Phase 2.1): 6 of the 8 categories, spanning
// both families, so the homepage reads as inspiration rather than a full
// catalogue — the complete 8 remain one click away via /products, the
// mega menu, and the footer.
export const featuredMaterialSlugs = ['parquet', 'spc', 'laminate', 'wooden-flooring', 'wpc', 'fluted']

export function getFeaturedMaterials() {
  return featuredMaterialSlugs.map((slug) => materials.find((m) => m.slug === slug)).filter(Boolean)
}

export function getMaterialBySlug(slug) {
  return materials.find((m) => m.slug === slug)
}

export function getMaterialsByFamily(family) {
  return materials.filter((m) => m.family === family)
}

export function getRelatedMaterials(material, count = 3) {
  return materials.filter((m) => m.family === material.family && m.slug !== material.slug).slice(0, count)
}
