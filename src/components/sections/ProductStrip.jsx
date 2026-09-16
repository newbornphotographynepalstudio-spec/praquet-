import { Link } from 'react-router-dom'
import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'
import ResponsiveImage from '../media/ResponsiveImage'
import { getFeaturedMaterials } from '../../data/materials'

const featured = getFeaturedMaterials()

// Deliberately not another row of cards (see homepage layout rhythm notes):
// a horizontal-scroll filmstrip of material tiles reads as a showroom
// browsing moment rather than a repeated card grid. Native scroll-snap,
// no JS carousel. Curated to 6 of the 8 categories (see
// featuredMaterialSlugs in materials.js) so the homepage stays inspiration
// -> discovery, not a full catalogue — /products has the complete range.
export default function ProductStrip() {
  return (
    <section className="bg-white py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow="The Range"
          title="Flooring & Wall Materials"
          description="A look at the flooring and wall panel materials we work with most — the full range is one click away."
        />
      </Container>

      <div className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-gutter pb-4 md:mt-14 md:gap-6 md:px-gutter-md lg:px-gutter-lg [scrollbar-width:thin]">
        {featured.map((material) => (
          <Link
            key={material.slug}
            to={`/${material.family}/${material.slug}`}
            className="group relative w-[220px] shrink-0 snap-start overflow-hidden rounded md:w-[260px]"
          >
            <div className="aspect-[4/5] overflow-hidden bg-charcoal/10">
              <ResponsiveImage
                desktop={material.image.tile}
                alt={material.image.alt}
                sizes="260px"
                loading="eager"
                imgClassName="transition-transform duration-600 ease-premium group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/15 to-transparent" aria-hidden="true" />
            <span className="absolute bottom-4 left-4 right-4">
              <span className="block font-body text-sm font-semibold uppercase tracking-wide text-ivory">
                {material.name}
              </span>
              <span className="mt-0.5 block font-body text-xs text-ivory/70">{material.finish}</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
