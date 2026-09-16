import Layout from '../components/layout/Layout'
import Seo from '../components/seo/Seo'
import Breadcrumbs from '../components/ui/Breadcrumbs'
import Container from '../components/ui/Container'
import SectionHeading from '../components/ui/SectionHeading'
import EmptyState from '../components/ui/EmptyState'
import BeforeAfterSlider from '../components/media/BeforeAfterSlider'
import ConsultationCTA from '../components/ui/ConsultationCTA'
import { projects } from '../data/projects'
import { beforeAfterDemo } from '../data/images'

// No verified Parquet & Decor Nepal projects exist yet (see brand content
// rule in README.md and section 30/62 of the Phase 2 brief) — this renders
// an honest "growing" state rather than fabricated case studies. The grid
// below is ready to render real entries from src/data/projects.js the
// moment they exist, with zero page changes needed.
export default function Projects() {
  return (
    <Layout>
      <Seo
        title="Projects"
        description="Our project portfolio is growing. In the meantime, explore material inspiration and get in touch to discuss your own space."
        path="/projects"
      />
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Projects' }]} />

      <section className="bg-white py-16 md:py-24">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Projects"
            title="Project Stories Are Coming Together"
            description="We're building out a portfolio of verified, completed work. Until then, here's a look at the kind of transformation the right materials bring — using demonstration imagery, not a real project."
          />
        </Container>

        {projects.length === 0 ? (
          <Container className="mt-4">
            <EmptyState
              title="No published projects yet"
              description="Explore material inspiration in the gallery while our project portfolio grows, or get in touch to start planning your own."
              cta={{ label: 'Explore Material Inspiration', to: '/gallery' }}
            />
          </Container>
        ) : (
          <Container className="mt-12 grid gap-8 md:grid-cols-2 md:gap-10">
            {/* Real project cards render here once src/data/projects.js has entries. */}
          </Container>
        )}
      </section>

      <section className="bg-ivory-light py-16 md:py-20">
        <Container narrow>
          <div className="mx-auto max-w-3xl">
            <BeforeAfterSlider
              before={beforeAfterDemo.before}
              after={beforeAfterDemo.after}
              beforeAlt={beforeAfterDemo.beforeAlt}
              afterAlt={beforeAfterDemo.afterAlt}
              caption="An example of the kind of transformation premium flooring and wall panels bring to a space."
              demo
            />
          </div>
        </Container>
      </section>

      <ConsultationCTA
        title="Want your space to be next?"
        secondaryCta={{ label: 'View Material Inspiration', to: '/gallery' }}
      />
    </Layout>
  )
}
