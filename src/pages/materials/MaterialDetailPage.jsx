import { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { FaWhatsapp } from 'react-icons/fa'
import Layout from '../../components/layout/Layout'
import Seo from '../../components/seo/Seo'
import Breadcrumbs from '../../components/ui/Breadcrumbs'
import Container from '../../components/ui/Container'
import Eyebrow from '../../components/ui/Eyebrow'
import Button from '../../components/ui/Button'
import ResponsiveImage from '../../components/media/ResponsiveImage'
import RelatedGrid from '../../components/ui/RelatedGrid'
import FAQAccordion from '../../components/ui/FAQAccordion'
import ConsultationCTA from '../../components/ui/ConsultationCTA'
import MaterialCollection from '../../components/sections/MaterialCollection'
import NotFound from '../NotFound'
import { getMaterialBySlug, getRelatedMaterials, materialFamilies } from '../../data/materials'
import { getMaterialOptionsByCategory } from '../../data/materialOptions'
import { getFaqsByTags } from '../../data/faqs'
import { contact } from '../../data/contact'
import { getPublishedMaterialOptions } from '../../lib/cms'

// One reusable template serves three URL patterns — /flooring/:slug,
// /wall-panels/:slug, and /products/:slug — all backed by the same
// materials.js records (see section 24 of the Phase 2 brief: no separate
// per-SKU "product" data exists beyond these 8 material categories, so
// /products/:slug intentionally resolves the same real content rather than
// a duplicate or fabricated entry).
export default function MaterialDetailPage() {
  const { slug } = useParams()
  const location = useLocation()
  const material = getMaterialBySlug(slug)

  // Renders instantly with the existing local data (identical to before
  // this phase — no loading state, no risk of a blank section) and then,
  // once, checks Firestore for a published CMS version of this category's
  // material options; if one exists it quietly replaces the displayed set.
  // See src/lib/cms/index.js for why this can't regress to a blank page
  // (Firestore down, unconfigured, or not migrated yet all resolve to
  // `null`, and this component just keeps showing the local data below).
  // Hooks must run unconditionally (before the `!material` early return
  // below), so they no-op safely when the slug doesn't match anything.
  const [options, setOptions] = useState(() => (material ? getMaterialOptionsByCategory(material.slug) : []))
  useEffect(() => {
    if (!material) return
    setOptions(getMaterialOptionsByCategory(material.slug))
    let cancelled = false
    getPublishedMaterialOptions(material.slug).then((cmsOptions) => {
      if (!cancelled && cmsOptions) setOptions(cmsOptions)
    })
    return () => {
      cancelled = true
    }
  }, [material])

  if (!material) return <NotFound />

  const family = materialFamilies[material.family]
  const onProductsRoute = location.pathname.startsWith('/products/')
  const breadcrumbItems = onProductsRoute
    ? [
        { label: 'Home', to: '/' },
        { label: 'Products', to: '/products' },
        { label: material.name },
      ]
    : [
        { label: 'Home', to: '/' },
        { label: family.label, to: family.to },
        { label: material.name },
      ]

  const related = getRelatedMaterials(material)
  const faqs = getFaqsByTags(material.faqTags)

  return (
    <Layout>
      <Seo
        title={material.name}
        description={material.shortDescription}
        path={`/${material.family}/${material.slug}`}
      />
      <Breadcrumbs items={breadcrumbItems} />

      <section className="relative aspect-[4/5] w-full md:aspect-[16/9] lg:aspect-[21/9]">
        <ResponsiveImage desktop={material.image.wide} alt={material.image.alt} priority className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/20 to-navy/10" aria-hidden="true" />
        <Container className="relative flex h-full flex-col justify-end pb-10 md:pb-14">
          <Eyebrow tone="light" className="mb-4 text-gold-soft">
            {family.label}
          </Eyebrow>
          <h1 className="font-display text-display-lg text-ivory">{material.name}</h1>
          <p className="mt-3 max-w-md font-body text-base text-ivory/85">{material.tagline}</p>
        </Container>
      </section>

      <section className="bg-white py-16 md:py-20">
        <Container narrow>
          <p className="font-body text-lg leading-relaxed text-charcoal">{material.intro}</p>
        </Container>
      </section>

      <MaterialCollection
        categoryName={material.name}
        options={options}
        note={
          material.slug === 'acoustic'
            ? 'Shown as a style reference for the acoustic slat look — the full range available for supply in Nepal will be confirmed at consultation.'
            : undefined
        }
      />

      <section className="bg-ivory-light py-16 md:py-20">
        <Container>
          <div className="grid gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <h2 className="font-display text-2xl text-navy">Key Characteristics</h2>
              <ul className="mt-5 space-y-3">
                {material.features.map((feature) => (
                  <li key={feature} className="flex gap-3 font-body text-sm leading-relaxed text-charcoal">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-display text-2xl text-navy">Where It Works</h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {material.applications.map((app) => (
                  <li
                    key={app}
                    className="rounded-sm border border-navy/15 bg-white px-3 py-1.5 font-body text-xs font-semibold text-navy"
                  >
                    {app}
                  </li>
                ))}
              </ul>
              {material.specNote && (
                <p className="mt-6 font-body text-xs italic text-charcoal/70">{material.specNote}</p>
              )}
              <div className="mt-8 flex flex-wrap gap-3">
                <Button to="/contact" variant="primary">
                  Get a Free Consultation
                </Button>
                <Button href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" variant="secondary">
                  <FaWhatsapp size={16} aria-hidden="true" />
                  Enquire on WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 md:py-20">
        <Container>
          <h2 className="mb-8 font-display text-2xl text-navy">Material Gallery</h2>
          <div className="grid gap-4 md:grid-cols-3 md:gap-6">
            <div className="aspect-[3/2] overflow-hidden rounded md:col-span-2">
              <ResponsiveImage desktop={material.image.wide} alt={material.image.alt} sizes="(min-width: 768px) 66vw, 100vw" />
            </div>
            <div className="aspect-[4/5] overflow-hidden rounded md:col-span-1">
              <ResponsiveImage desktop={material.image.tile} alt={material.image.alt} sizes="(min-width: 768px) 33vw, 100vw" />
            </div>
          </div>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="bg-ivory-light py-16 md:py-20">
          <Container>
            <h2 className="mb-8 font-display text-2xl text-navy">
              More from {family.label}
            </h2>
            <RelatedGrid
              items={related.map((m) => ({
                to: `/${m.family}/${m.slug}`,
                image: m.image.tile,
                alt: m.image.alt,
                label: family.label,
                title: m.name,
                description: m.tagline,
              }))}
            />
          </Container>
        </section>
      )}

      {faqs.length > 0 && (
        <section className="bg-white py-16 md:py-20">
          <Container narrow>
            <h2 className="mb-8 font-display text-2xl text-navy">Frequently Asked Questions</h2>
            <FAQAccordion items={faqs} />
          </Container>
        </section>
      )}

      <ConsultationCTA
        title={`Considering ${material.name.toLowerCase()} for your space?`}
        description="Talk through material fit, applications and next steps with a free consultation."
      />
    </Layout>
  )
}
