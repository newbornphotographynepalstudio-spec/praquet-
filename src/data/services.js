// The 3 service detail pages, plus how they're framed on the services
// landing page. Process steps describe the general, honest shape of the
// engagement — no certifications, guarantees, or timelines are claimed
// since none have been verified. See "brand content rule" in README.md.
export const services = [
  {
    slug: 'flooring-installation',
    name: 'Flooring Installation',
    tagline: 'From material selection to a finished floor.',
    shortDescription: 'Professional installation for parquet, SPC, laminate and wooden flooring — handled from subfloor preparation through to finish.',
    intro:
      'Good flooring is as much about the installation as the material itself. A poorly prepared subfloor or rushed fit undermines even the best product. Our installation service covers preparation, laying and finishing across parquet, SPC, laminate and wooden flooring.',
    process: [
      { title: 'Site & Space Assessment', description: 'Understanding the room, subfloor condition and how the space is actually used before recommending a material.' },
      { title: 'Material Selection', description: 'Choosing the right flooring category and finish for the space, budget and traffic level.' },
      { title: 'Preparation', description: 'Preparing the subfloor so the finished floor sits flat, stable and long-lasting.' },
      { title: 'Installation', description: 'Laying the flooring — including pattern work for parquet — with attention to trims, transitions and finish.' },
    ],
    applications: ['Residential renovations', 'New-build interiors', 'Commercial fit-outs', 'Single-room upgrades'],
    heroMaterialSlug: 'parquet',
    faqTags: ['installation', 'flooring'],
  },
  {
    slug: 'wall-panel-installation',
    name: 'Wall Panel Installation',
    tagline: 'Architectural walls, properly fitted.',
    shortDescription: 'Installation for WPC, PVC, fluted and acoustic wall panel systems — from layout planning to a clean architectural finish.',
    intro:
      'Wall panels only read as intentional architecture when they’re planned and fitted properly — panel layout, joins and transitions all matter. Our installation service covers WPC, PVC, fluted and acoustic wall panel systems.',
    process: [
      { title: 'Wall & Layout Assessment', description: 'Reviewing the wall, surrounding elements and how the panel layout should be planned around them.' },
      { title: 'Panel Selection', description: 'Choosing the right panel system and profile for the look and the space.' },
      { title: 'Preparation', description: 'Preparing the wall surface for a flat, secure, long-lasting fit.' },
      { title: 'Installation', description: 'Fitting the panels with attention to joins, corners and transitions for a clean architectural result.' },
    ],
    applications: ['Feature walls', 'Reception and lobby areas', 'Media walls', 'Commercial interiors'],
    heroMaterialSlug: 'fluted',
    faqTags: ['installation', 'wall-panels'],
  },
  {
    slug: 'interior-consultation',
    name: 'Interior Surface Consultation',
    tagline: 'Getting the material decisions right, early.',
    shortDescription: 'A practical consultation on flooring and wall-panel choices for your space — before installation day, not after.',
    intro:
      'Material decisions are easiest to get right before installation day, not after. Our consultation service is a practical conversation about the space, the way it’s used, and which flooring and wall-panel materials genuinely fit — coordinated as one system rather than chosen separately.',
    process: [
      { title: 'Understanding the Space', description: 'Room function, natural light, traffic and how the space will actually be lived or worked in.' },
      { title: 'Material Selection', description: 'Working through flooring and wall-panel options that suit the space and each other.' },
      { title: 'Flooring & Wall Coordination', description: 'Making sure floor and wall materials read as one considered interior, not two separate decisions.' },
      { title: 'Practical Planning', description: 'Sequencing, site considerations and next steps toward installation.' },
    ],
    applications: ['New builds', 'Renovations', 'Multi-room projects', 'Residential and commercial spaces'],
    heroMaterialSlug: 'wooden-flooring',
    faqTags: ['consultation'],
  },
]

export function getServiceBySlug(slug) {
  return services.find((s) => s.slug === slug)
}
