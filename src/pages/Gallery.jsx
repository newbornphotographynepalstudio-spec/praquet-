import { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import Seo from '../components/seo/Seo'
import Breadcrumbs from '../components/ui/Breadcrumbs'
import Container from '../components/ui/Container'
import SectionHeading from '../components/ui/SectionHeading'
import ResponsiveImage from '../components/media/ResponsiveImage'
import ConsultationCTA from '../components/ui/ConsultationCTA'
import { cn } from '../utils/cn'
import { materials } from '../data/materials'
import { materialDetailImage, beforeAfterDemo } from '../data/images'
import { getPublishedGallery } from '../lib/cms'

// Visual inspiration only — deliberately NOT a portfolio of completed
// Parquet & Decor Nepal projects (see /projects for that, currently an
// honest empty state). Every entry here is either an approved Gemini
// anchor image or licensed stock photography — see IMAGE_SOURCES.md.
const localItems = [
  ...materials.map((m) => ({
    id: m.slug,
    image: m.image.wide,
    alt: m.image.alt,
    category: m.family === 'flooring' ? 'Flooring' : 'Wall Panels',
    label: m.name,
  })),
  {
    id: 'material-detail',
    image: materialDetailImage.desktop,
    alt: materialDetailImage.alt,
    category: 'Materials',
    label: 'Material Selection',
  },
  {
    id: 'before-demo',
    image: beforeAfterDemo.before,
    alt: beforeAfterDemo.beforeAlt,
    category: 'Interiors',
    label: 'Before (Demonstration)',
  },
  {
    id: 'after-demo',
    image: beforeAfterDemo.after,
    alt: beforeAfterDemo.afterAlt,
    category: 'Interiors',
    label: 'After (Demonstration)',
  },
]

const filters = ['All', 'Flooring', 'Wall Panels', 'Materials', 'Interiors']

export default function Gallery() {
  const [active, setActive] = useState('All')
  // Renders instantly from the existing local composed set, then quietly
  // swaps in the published CMS gallery if one exists — see the same
  // pattern in MaterialDetailPage.jsx / src/lib/cms/index.js. CMS-sourced
  // items carry a plain image URL rather than the local build-time
  // responsive-image descriptor (see the isResponsive check below and the
  // matching one in MaterialOptionCard.jsx).
  const [items, setItems] = useState(localItems)
  useEffect(() => {
    let cancelled = false
    getPublishedGallery().then((cmsItems) => {
      if (!cancelled && cmsItems) {
        setItems(cmsItems.map((doc) => ({ id: doc.id, image: doc.image, alt: doc.title, category: doc.category, label: doc.title })))
      }
    })
    return () => {
      cancelled = true
    }
  }, [])
  const visible = active === 'All' ? items : items.filter((item) => item.category === active)

  return (
    <Layout>
      <Seo
        title="Gallery"
        description="Material and interior inspiration from Parquet & Decor Nepal — flooring, wall panels and design references."
        path="/gallery"
      />
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Gallery' }]} />

      <section className="bg-white py-16 md:py-24">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Inspiration"
            title="Material & Interior Inspiration"
            description="A visual reference for what's possible with our materials — not a record of completed projects. See our Projects page for verified company work."
          />

          <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Filter gallery by category">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActive(filter)}
                aria-pressed={active === filter}
                className={cn(
                  'rounded-sm border px-4 py-2 font-body text-sm font-semibold transition-colors duration-400',
                  active === filter
                    ? 'border-navy bg-navy text-ivory'
                    : 'border-navy/15 text-navy hover:border-navy'
                )}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
            {visible.map((item) => (
              <div key={item.id} className="group relative overflow-hidden rounded">
                <div className="relative aspect-[4/5] overflow-hidden bg-charcoal/10">
                  {item.image && typeof item.image === 'object' ? (
                    <ResponsiveImage
                      desktop={item.image}
                      alt={item.alt}
                      sizes="(min-width: 768px) 33vw, 50vw"
                      className="absolute inset-0 h-full w-full"
                      imgClassName="transition-transform duration-600 ease-premium group-hover:scale-105"
                    />
                  ) : (
                    <img
                      src={item.image}
                      alt={item.alt}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-600 ease-premium group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-navy/75 via-transparent to-transparent" aria-hidden="true" />
                <span className="absolute bottom-3 left-3 right-3 font-body text-xs font-semibold uppercase tracking-wide text-ivory">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <ConsultationCTA secondaryCta={{ label: 'Explore Products', to: '/products' }} />
    </Layout>
  )
}
