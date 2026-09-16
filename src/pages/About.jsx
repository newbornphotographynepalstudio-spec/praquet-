import Layout from '../components/layout/Layout'
import Seo from '../components/seo/Seo'
import Breadcrumbs from '../components/ui/Breadcrumbs'
import Container from '../components/ui/Container'
import Eyebrow from '../components/ui/Eyebrow'
import ResponsiveImage from '../components/media/ResponsiveImage'
import ConsultationCTA from '../components/ui/ConsultationCTA'
import { materialDetailImage } from '../data/images'

// No founding year, founder biography, team size, awards, certifications
// or project counts are stated here — none of that has been verified. See
// brand content rule in README.md and section 29 of the Phase 2 brief.
export default function About() {
  return (
    <Layout>
      <Seo
        title="About"
        description="Parquet & Decor Nepal brings together premium flooring, architectural wall surfaces and professional installation."
        path="/about"
      />
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'About' }]} />

      <section className="bg-white py-16 md:py-24">
        <Container narrow className="text-center">
          <Eyebrow className="mb-5 justify-center">About</Eyebrow>
          <h1 className="font-display text-display-lg text-navy">
            Flooring and wall surfaces, considered as one system.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-body text-lg leading-relaxed text-charcoal">
            Parquet &amp; Decor Nepal brings together premium flooring, architectural wall surfaces and professional
            installation for spaces designed to feel considered — not assembled from whatever materials happened to
            be chosen separately.
          </p>
        </Container>
      </section>

      <section className="bg-ivory-light py-16 md:py-24">
        <Container>
          <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16 lg:gap-24">
            <div className="relative aspect-[4/5] overflow-hidden rounded md:aspect-[3/4]">
              <ResponsiveImage
                desktop={materialDetailImage.desktop}
                alt={materialDetailImage.alt}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="absolute inset-0 h-full w-full"
              />
            </div>
            <div className="md:max-w-md">
              <h2 className="font-display text-display-sm text-navy">Why Flooring and Walls, Together</h2>
              <p className="mt-5 font-body text-base leading-relaxed text-charcoal">
                Floors and walls are usually specified by different people at different times — a flooring
                contractor here, a painter or panel installer there. We work across both, so the material decisions
                for a room are made together rather than reconciled after the fact.
              </p>
              <p className="mt-4 font-body text-base leading-relaxed text-charcoal">
                That means parquet, SPC, laminate and wooden flooring on one side, and WPC, PVC, fluted and acoustic
                wall panels on the other — plus the installation and consultation work that connects them.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 md:py-24">
        <Container narrow className="text-center">
          <h2 className="font-display text-display-sm text-navy">How We Work</h2>
          <div className="mx-auto mt-10 grid gap-8 text-left md:grid-cols-3 md:gap-6">
            <div>
              <span className="font-display text-3xl text-gold">01</span>
              <h3 className="mt-3 font-body text-sm font-semibold uppercase tracking-wide text-navy">Consultation</h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-charcoal">
                Understanding the space and how it's used, before recommending materials.
              </p>
            </div>
            <div>
              <span className="font-display text-3xl text-gold">02</span>
              <h3 className="mt-3 font-body text-sm font-semibold uppercase tracking-wide text-navy">
                Material Selection
              </h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-charcoal">
                Choosing flooring and wall panels that suit the space, and each other.
              </p>
            </div>
            <div>
              <span className="font-display text-3xl text-gold">03</span>
              <h3 className="mt-3 font-body text-sm font-semibold uppercase tracking-wide text-navy">Installation</h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-charcoal">
                Professional installation, from subfloor and wall preparation through to finish.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <ConsultationCTA
        eyebrow="Get Started"
        title="Let's talk about your space."
        secondaryCta={{ label: 'Explore Products', to: '/products' }}
      />
    </Layout>
  )
}
