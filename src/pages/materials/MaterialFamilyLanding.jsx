import Layout from '../../components/layout/Layout'
import Seo from '../../components/seo/Seo'
import Breadcrumbs from '../../components/ui/Breadcrumbs'
import Container from '../../components/ui/Container'
import Eyebrow from '../../components/ui/Eyebrow'
import ResponsiveImage from '../../components/media/ResponsiveImage'
import RelatedGrid from '../../components/ui/RelatedGrid'
import ConsultationCTA from '../../components/ui/ConsultationCTA'
import { getMaterialsByFamily, materialFamilies } from '../../data/materials'

const CONTENT = {
  flooring: {
    heading: 'Flooring that changes the character of a space.',
    intro:
      'Four flooring families, each suited to different rooms, budgets and material preferences — from genuine timber to practical, durable composites. Every one is shown here as inspiration; final specification happens during consultation.',
    heroSlug: 'parquet',
  },
  'wall-panels': {
    heading: 'Walls that define the room.',
    intro:
      'Architectural wall surfaces bring texture, depth and warmth to a space in a way paint alone can’t. From warm wood-look composites to acoustic-conscious slatted panels, each family below serves a different kind of wall.',
    heroSlug: 'fluted',
  },
}

export default function MaterialFamilyLanding({ family }) {
  const config = CONTENT[family]
  const familyInfo = materialFamilies[family]
  const familyMaterials = getMaterialsByFamily(family)
  const heroMaterial = familyMaterials.find((m) => m.slug === config.heroSlug) || familyMaterials[0]

  return (
    <Layout>
      <Seo
        title={familyInfo.label}
        description={config.intro}
        path={familyInfo.to}
      />
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: familyInfo.label }]} />

      <section className="relative aspect-[4/5] w-full md:aspect-[16/9] lg:aspect-[21/9]">
        <ResponsiveImage desktop={heroMaterial.image.wide} alt={heroMaterial.image.alt} priority className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/25 to-navy/10" aria-hidden="true" />
        <Container className="relative flex h-full flex-col justify-end pb-10 md:pb-14">
          <Eyebrow tone="light" className="mb-4 text-gold-soft">
            {familyInfo.label}
          </Eyebrow>
          <h1 className="max-w-2xl font-display text-display-lg text-ivory">{config.heading}</h1>
          <p className="mt-4 max-w-lg font-body text-base text-ivory/85">{config.intro}</p>
        </Container>
      </section>

      <section className="bg-white py-16 md:py-24">
        <Container>
          <RelatedGrid
            columns={4}
            items={familyMaterials.map((m) => ({
              to: `/${m.family}/${m.slug}`,
              image: m.image.tile,
              alt: m.image.alt,
              label: m.tagline,
              title: m.name,
              description: m.shortDescription,
              cta: `Explore ${m.name.replace(' Flooring', '').replace(' Wall Panels', '')}`,
            }))}
          />
        </Container>
      </section>

      <ConsultationCTA
        title={`Not sure which ${familyInfo.label.toLowerCase()} option fits your space?`}
        description="A short consultation is the fastest way to narrow it down."
      />
    </Layout>
  )
}
