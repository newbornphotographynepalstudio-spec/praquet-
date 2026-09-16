import { useParams } from 'react-router-dom'
import Layout from '../../components/layout/Layout'
import Seo from '../../components/seo/Seo'
import Breadcrumbs from '../../components/ui/Breadcrumbs'
import Container from '../../components/ui/Container'
import Eyebrow from '../../components/ui/Eyebrow'
import ResponsiveImage from '../../components/media/ResponsiveImage'
import FAQAccordion from '../../components/ui/FAQAccordion'
import ConsultationCTA from '../../components/ui/ConsultationCTA'
import NotFound from '../NotFound'
import { getServiceBySlug } from '../../data/services'
import { getMaterialBySlug } from '../../data/materials'
import { getFaqsByTags } from '../../data/faqs'

export default function ServiceDetailPage() {
  const { slug } = useParams()
  const service = getServiceBySlug(slug)

  if (!service) return <NotFound />

  const heroMaterial = getMaterialBySlug(service.heroMaterialSlug)
  const faqs = getFaqsByTags(service.faqTags)

  return (
    <Layout>
      <Seo title={service.name} description={service.shortDescription} path={`/services/${service.slug}`} />
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Services', to: '/services' }, { label: service.name }]} />

      <section className="relative aspect-[4/5] w-full md:aspect-[16/9] lg:aspect-[21/9]">
        <ResponsiveImage
          desktop={heroMaterial.image.wide}
          alt={heroMaterial.image.alt}
          priority
          className="absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/25 to-navy/10" aria-hidden="true" />
        <Container className="relative flex h-full flex-col justify-end pb-10 md:pb-14">
          <Eyebrow tone="light" className="mb-4 text-gold-soft">
            Services
          </Eyebrow>
          <h1 className="max-w-xl font-display text-display-lg text-ivory">{service.name}</h1>
          <p className="mt-3 max-w-md font-body text-base text-ivory/85">{service.tagline}</p>
        </Container>
      </section>

      <section className="bg-white py-16 md:py-20">
        <Container narrow>
          <p className="font-body text-lg leading-relaxed text-charcoal">{service.intro}</p>
        </Container>
      </section>

      <section className="bg-ivory-light py-16 md:py-20">
        <Container>
          <h2 className="mb-10 font-display text-2xl text-navy">How It Works</h2>
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 md:gap-6">
            {service.process.map((step, i) => (
              <div key={step.title}>
                <span className="font-display text-3xl text-gold">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-3 font-body text-sm font-semibold uppercase tracking-wide text-navy">
                  {step.title}
                </h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-charcoal">{step.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 md:py-20">
        <Container>
          <h2 className="mb-6 font-display text-2xl text-navy">Suited To</h2>
          <ul className="flex flex-wrap gap-2">
            {service.applications.map((app) => (
              <li
                key={app}
                className="rounded-sm border border-navy/15 bg-ivory-light px-3 py-1.5 font-body text-xs font-semibold text-navy"
              >
                {app}
              </li>
            ))}
          </ul>
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

      <ConsultationCTA
        title="Ready to plan your project?"
        description={`Get a free consultation about ${service.name.toLowerCase()} for your space.`}
      />
    </Layout>
  )
}
