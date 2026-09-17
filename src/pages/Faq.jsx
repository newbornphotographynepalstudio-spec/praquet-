import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Layout from '../components/layout/Layout'
import Seo from '../components/seo/Seo'
import Breadcrumbs from '../components/ui/Breadcrumbs'
import Container from '../components/ui/Container'
import SectionHeading from '../components/ui/SectionHeading'
import FAQAccordion from '../components/ui/FAQAccordion'
import ConsultationCTA from '../components/ui/ConsultationCTA'
import { faqs as localFaqs } from '../data/faqs'
import { getPublishedFaqs } from '../lib/cms'

const groups = [
  { title: 'General', tags: ['general'] },
  { title: 'Flooring', tags: ['flooring', 'parquet', 'spc', 'laminate', 'wooden-flooring'] },
  { title: 'Wall Panels', tags: ['wall-panels', 'wpc', 'pvc', 'fluted', 'acoustic'] },
  { title: 'Installation & Consultation', tags: ['installation', 'consultation'] },
  { title: 'Service Areas', tags: ['kathmandu', 'lalitpur', 'bhaktapur'] },
]

export default function Faq() {
  // Renders instantly from the existing local FAQ bank, then quietly swaps
  // in the published CMS version if one exists — see the same pattern in
  // MaterialDetailPage.jsx / src/lib/cms/index.js.
  const [faqs, setFaqs] = useState(localFaqs)
  useEffect(() => {
    let cancelled = false
    getPublishedFaqs().then((cmsFaqs) => {
      if (!cancelled && cmsFaqs) setFaqs(cmsFaqs)
    })
    return () => {
      cancelled = true
    }
  }, [])

  const seen = new Set()
  const grouped = groups
    .map((group) => {
      const items = faqs.filter((f) => !seen.has(f.question) && f.tags.some((t) => group.tags.includes(t)))
      items.forEach((f) => seen.add(f.question))
      return { ...group, items }
    })
    .filter((group) => group.items.length > 0)

  const allShown = grouped.flatMap((g) => g.items)
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allShown.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }

  return (
    <Layout>
      <Seo
        title="FAQ"
        description="Answers to common questions about flooring, wall panels, installation, consultation and service areas."
        path="/faq"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'FAQ' }]} />

      <section className="bg-white py-16 md:py-24">
        <Container narrow>
          <SectionHeading as="h1" eyebrow="FAQ" title="Frequently Asked Questions" />

          <div className="mt-12 space-y-12">
            {grouped.map((group) => (
              <div key={group.title}>
                <h2 className="mb-4 font-display text-2xl text-navy">{group.title}</h2>
                <FAQAccordion items={group.items} />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <ConsultationCTA title="Still have a question?" description="A short consultation covers anything specific to your space." />
    </Layout>
  )
}
