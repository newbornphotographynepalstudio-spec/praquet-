import { Link } from 'react-router-dom'
import { HiArrowRight } from 'react-icons/hi'
import Layout from '../../components/layout/Layout'
import Seo from '../../components/seo/Seo'
import Breadcrumbs from '../../components/ui/Breadcrumbs'
import Container from '../../components/ui/Container'
import SectionHeading from '../../components/ui/SectionHeading'
import ResponsiveImage from '../../components/media/ResponsiveImage'
import ConsultationCTA from '../../components/ui/ConsultationCTA'
import { materials, getMaterialsByFamily } from '../../data/materials'

const families = [
  {
    key: 'flooring',
    to: '/flooring',
    title: 'Flooring',
    description: 'Parquet, SPC, laminate and wooden flooring — for every room, budget and material preference.',
  },
  {
    key: 'wall-panels',
    to: '/wall-panels',
    title: 'Wall Panels',
    description: 'WPC, PVC, fluted and acoustic wall panels — architectural texture for walls that do more than divide a room.',
  },
]

export default function ProductsLanding() {
  return (
    <Layout>
      <Seo
        title="Products"
        description="Explore Parquet & Decor Nepal's two material families — premium flooring and architectural wall panels."
        path="/products"
      />
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Products' }]} />

      <section className="bg-white py-16 md:py-24">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="The Showroom"
            title="Two Material Families, One Interior System"
            description="Everything we work with falls into one of two families. Start with whichever matches what you're planning."
          />
        </Container>

        <Container className="mt-12 md:mt-16">
          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            {families.map((family) => {
              const anchor = getMaterialsByFamily(family.key)[0]
              return (
                <Link key={family.key} to={family.to} className="group relative block overflow-hidden rounded">
                  <div className="relative aspect-[4/5] overflow-hidden md:aspect-[3/4]">
                    <ResponsiveImage
                      desktop={anchor.image.wide}
                      alt={anchor.image.alt}
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="absolute inset-0 h-full w-full"
                      imgClassName="transition-transform duration-600 ease-premium group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent" aria-hidden="true" />
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                    <h2 className="font-display text-3xl text-ivory">{family.title}</h2>
                    <p className="mt-2 max-w-sm font-body text-sm text-ivory/80">{family.description}</p>
                    <span className="mt-4 inline-flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-wide text-gold-soft">
                      Explore {family.title}
                      <HiArrowRight className="transition-transform duration-400 ease-premium group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </Container>
      </section>

      <section className="bg-ivory-light py-16 md:py-20">
        <Container>
          <h2 className="font-display text-2xl text-navy">Every Category</h2>
          <p className="mt-2 max-w-xl font-body text-sm text-charcoal">
            Each category page opens into its own collection of patterns, tones and finishes —
            explore a category to see the full range.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {materials.map((m) => (
              <Link
                key={m.slug}
                to={`/${m.family}/${m.slug}`}
                className="rounded-sm border border-navy/15 bg-white px-4 py-2 font-body text-sm font-semibold text-navy transition-colors hover:border-gold hover:text-gold"
              >
                {m.name}
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <ConsultationCTA />
    </Layout>
  )
}
