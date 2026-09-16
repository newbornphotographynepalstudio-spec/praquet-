// Three Kathmandu Valley locations, each with genuinely distinct framing
// rather than the same paragraph with the city name swapped. No physical
// address or service-radius claim is made — see "brand content rule" in
// README.md. General geographic/cultural context below is well-established
// public knowledge about these cities, not a company-specific claim.
export const locations = [
  {
    slug: 'kathmandu',
    name: 'Kathmandu',
    tagline: 'Flooring and wall panels for the valley’s busiest interiors.',
    intro:
      'Kathmandu’s mix of dense apartment living, renovated older homes and commercial fit-outs means flooring and wall surfaces need to hold up to real daily use without losing their finish. From SPC in busy kitchens to fluted feature walls in newer offices and cafés, material choice matters as much as installation quality here.',
    focusAreas: [
      'Apartment and condominium interiors',
      'Renovations of older residential properties',
      'Office and retail fit-outs',
      'Café and hospitality interiors',
    ],
    faqTags: ['kathmandu', 'general'],
  },
  {
    slug: 'lalitpur',
    name: 'Lalitpur',
    tagline: 'Considered materials for Lalitpur’s heritage-conscious interiors.',
    intro:
      'Lalitpur’s architecture — from Patan’s heritage core to its newer residential neighbourhoods — tends to reward a more considered approach to materials. Natural wood flooring and warm wall-panel treatments sit comfortably alongside both traditional detailing and contemporary renovation work.',
    focusAreas: [
      'Residential renovations near heritage areas',
      'New-build homes and residential compounds',
      'Boutique retail and studio interiors',
      'Wood flooring and wall-panel pairing for warmer interiors',
    ],
    faqTags: ['lalitpur', 'general'],
  },
  {
    slug: 'bhaktapur',
    name: 'Bhaktapur',
    tagline: 'Warm materials that respect Bhaktapur’s character.',
    intro:
      'Bhaktapur’s interiors — many connected to guesthouses, cafés and homes near its historic core — often call for materials that add modern comfort without fighting the building’s existing character. Warm wood-look flooring and textured wall panels tend to sit well here, upgrading a space while keeping its atmosphere intact.',
    focusAreas: [
      'Guesthouse and hospitality interiors',
      'Café and small commercial spaces',
      'Residential upgrades near the historic core',
      'Warm, low-disruption material choices',
    ],
    faqTags: ['bhaktapur', 'general'],
  },
]

export function getLocationBySlug(slug) {
  return locations.find((l) => l.slug === slug)
}
