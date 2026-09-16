import { useParams } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import Seo from '../components/seo/Seo'
import Breadcrumbs from '../components/ui/Breadcrumbs'
import Container from '../components/ui/Container'
import ResponsiveImage from '../components/media/ResponsiveImage'
import RelatedGrid from '../components/ui/RelatedGrid'
import ConsultationCTA from '../components/ui/ConsultationCTA'
import EmptyState from '../components/ui/EmptyState'
import { getProjectBySlug } from '../data/projects'
import { getMaterialBySlug } from '../data/materials'

// Reusable case-study template (section 31 of the Phase 2 brief) — fully
// built out, but src/data/projects.js is intentionally empty (no verified
// Parquet & Decor Nepal projects exist yet), so every slug currently falls
// through to the "not yet published" state below. The moment a real entry
// is added to that file, this template renders it with no further changes.
export default function ProjectDetail() {
  const { projectSlug } = useParams()
  const project = getProjectBySlug(projectSlug)

  if (!project) {
    return (
      <Layout>
        <Seo title="Project" noindex />
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Projects', to: '/projects' }, { label: 'Not Found' }]} />
        <Container>
          <EmptyState
            as="h1"
            eyebrow="Projects"
            title="This project isn't published yet"
            description="It may still be in progress, or the link may be out of date. Browse our current project portfolio instead."
            cta={{ label: 'Back to Projects', to: '/projects' }}
          />
        </Container>
      </Layout>
    )
  }

  const relatedMaterials = (project.productsUsed || []).map(getMaterialBySlug).filter(Boolean)

  return (
    <Layout>
      <Seo title={project.name} description={project.description} path={`/projects/${project.slug}`} />
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/' },
          { label: 'Projects', to: '/projects' },
          { label: project.name },
        ]}
      />

      <section className="relative aspect-[16/9] w-full">
        <ResponsiveImage desktop={project.gallery?.[0]} alt={project.name} priority className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/20 to-navy/10" aria-hidden="true" />
        <Container className="relative flex h-full flex-col justify-end pb-10">
          <h1 className="font-display text-display-lg text-ivory">{project.name}</h1>
          <p className="mt-2 font-body text-sm text-ivory/80">
            {project.location} — {project.projectType}
          </p>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container narrow>
          <p className="font-body text-lg leading-relaxed text-charcoal">{project.description}</p>
        </Container>
      </section>

      {relatedMaterials.length > 0 && (
        <section className="bg-ivory-light py-16">
          <Container>
            <h2 className="mb-8 font-display text-2xl text-navy">Materials Used</h2>
            <RelatedGrid
              items={relatedMaterials.map((m) => ({
                to: `/${m.family}/${m.slug}`,
                image: m.image.tile,
                alt: m.image.alt,
                title: m.name,
              }))}
            />
          </Container>
        </section>
      )}

      <ConsultationCTA title="Planning something similar?" />
    </Layout>
  )
}
