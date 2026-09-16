import { HiArrowRight } from 'react-icons/hi'
import Layout from '../../components/layout/Layout'
import Seo from '../../components/seo/Seo'
import Breadcrumbs from '../../components/ui/Breadcrumbs'
import Container from '../../components/ui/Container'
import SectionHeading from '../../components/ui/SectionHeading'
import Button from '../../components/ui/Button'
import ResponsiveImage from '../../components/media/ResponsiveImage'
import ConsultationCTA from '../../components/ui/ConsultationCTA'
import { services } from '../../data/services'
import { getMaterialBySlug } from '../../data/materials'
import { cn } from '../../utils/cn'

const projectsEntry = {
  name: 'Residential & Commercial Projects',
  tagline: 'Two very different briefs, one material approach.',
  shortDescription: 'Whether it’s a single room or a full commercial fit-out, the same material and installation care applies — see how it comes together in our project portfolio.',
  image: getMaterialBySlug('wpc').image,
  to: '/projects',
  cta: 'View Projects',
}

export default function ServicesLanding() {
  const rows = services.map((s) => ({
    ...s,
    image: getMaterialBySlug(s.heroMaterialSlug).image,
    to: `/services/${s.slug}`,
    cta: 'Learn More',
  }))
  rows.push(projectsEntry)

  return (
    <Layout>
      <Seo
        title="Services"
        description="Flooring installation, wall panel installation and interior surface consultation — from Parquet & Decor Nepal."
        path="/services"
      />
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Services' }]} />

      <section className="bg-white py-16 md:py-24">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Services"
            title="From Material Selection to Finished Installation"
            description="Four ways we work with you, from the first conversation about your space through to a finished result."
          />
        </Container>
      </section>

      <section className="bg-ivory-light py-4 md:py-8">
        <Container className="space-y-16 py-12 md:space-y-24 md:py-16">
          {rows.map((row, i) => (
            <div
              key={row.to}
              className={cn(
                'grid items-center gap-8 md:grid-cols-2 md:gap-16',
                i % 2 === 1 && 'md:[&>*:first-child]:order-2'
              )}
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded md:aspect-[4/3]">
                <ResponsiveImage
                  desktop={row.image.wide || row.image.tile}
                  alt={row.image.alt}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="absolute inset-0 h-full w-full"
                />
              </div>
              <div>
                <span className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                  {row.tagline}
                </span>
                <h2 className="mt-3 font-display text-3xl text-navy">{row.name}</h2>
                <p className="mt-4 max-w-md font-body text-base leading-relaxed text-charcoal">
                  {row.shortDescription}
                </p>
                <Button to={row.to} variant="secondary" className="mt-6">
                  {row.cta}
                  <HiArrowRight className="ml-1" aria-hidden="true" />
                </Button>
              </div>
            </div>
          ))}
        </Container>
      </section>

      <ConsultationCTA />
    </Layout>
  )
}
