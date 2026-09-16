import { useParams } from 'react-router-dom'
import Layout from '../../components/layout/Layout'
import Seo from '../../components/seo/Seo'
import Breadcrumbs from '../../components/ui/Breadcrumbs'
import Container from '../../components/ui/Container'
import Eyebrow from '../../components/ui/Eyebrow'
import RelatedGrid from '../../components/ui/RelatedGrid'
import FAQAccordion from '../../components/ui/FAQAccordion'
import ConsultationCTA from '../../components/ui/ConsultationCTA'
import NotFound from '../NotFound'
import { getLocationBySlug } from '../../data/locations'
import { getFaqsByTags } from '../../data/faqs'
import { materials } from '../../data/materials'

export default function LocationPage() {
  const { locationSlug } = useParams()
  const location = getLocationBySlug(locationSlug)

  if (!location) return <NotFound />

  const faqs = getFaqsByTags(location.faqTags)
  const featured = materials.filter((m) => ['parquet', 'wooden-flooring', 'fluted', 'spc'].includes(m.slug))

  return (
    <Layout>
      <Seo title={`Flooring & Wall Panels in ${location.name}`} description={location.intro} path={`/locations/${location.slug}`} />
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Locations' }, { label: location.name }]} />

      <section className="bg-white py-16 md:py-24">
        <Container narrow>
          <Eyebrow className="mb-5">{location.name}</Eyebrow>
          <h1 className="font-display text-display-lg text-navy">{location.tagline}</h1>
          <p className="mt-6 font-body text-lg leading-relaxed text-charcoal">{location.intro}</p>
        </Container>
      </section>

      <section className="bg-ivory-light py-16 md:py-20">
        <Container>
          <h2 className="mb-8 font-display text-2xl text-navy">Where We Focus in {location.name}</h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            {location.focusAreas.map((area) => (
              <li key={area} className="flex gap-3 rounded-sm border border-navy/10 bg-white px-4 py-3 font-body text-sm text-charcoal">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                {area}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-white py-16 md:py-20">
        <Container>
          <h2 className="mb-8 font-display text-2xl text-navy">Popular Materials</h2>
          <RelatedGrid
            columns={4}
            items={featured.map((m) => ({
              to: `/${m.family}/${m.slug}`,
              image: m.image.tile,
              alt: m.image.alt,
              title: m.name,
              description: m.tagline,
            }))}
          />
        </Container>
      </section>

      {faqs.length > 0 && (
        <section className="bg-ivory-light py-16 md:py-20">
          <Container narrow>
            <h2 className="mb-8 font-display text-2xl text-navy">Frequently Asked Questions</h2>
            <FAQAccordion items={faqs} />
          </Container>
        </section>
      )}

      <ConsultationCTA title={`Planning a project in ${location.name}?`} />
    </Layout>
  )
}
