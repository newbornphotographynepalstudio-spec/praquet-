import { useParams } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import Seo from '../components/seo/Seo'
import Breadcrumbs from '../components/ui/Breadcrumbs'
import Container from '../components/ui/Container'
import ResponsiveImage from '../components/media/ResponsiveImage'
import EmptyState from '../components/ui/EmptyState'
import ConsultationCTA from '../components/ui/ConsultationCTA'
import { getPostBySlug } from '../data/blog'

// Reusable editorial article template (section 37 of the Phase 2 brief) —
// fully built, but src/data/blog.js is intentionally empty (no articles
// have been written yet), so every slug currently falls through to the
// "not yet published" state below.
export default function BlogDetail() {
  const { blogSlug } = useParams()
  const post = getPostBySlug(blogSlug)

  if (!post) {
    return (
      <Layout>
        <Seo title="Article" noindex />
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Insights', to: '/blog' }, { label: 'Not Found' }]} />
        <Container>
          <EmptyState
            as="h1"
            eyebrow="Insights"
            title="This article isn't published yet"
            description="It may still be in progress, or the link may be out of date. Browse our current insights instead."
            cta={{ label: 'Back to Insights', to: '/blog' }}
          />
        </Container>
      </Layout>
    )
  }

  return (
    <Layout>
      <Seo title={post.title} description={post.excerpt} path={`/blog/${post.slug}`} />
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Insights', to: '/blog' }, { label: post.title }]} />

      <article>
        <Container narrow className="py-12 md:py-16">
          {post.category && (
            <span className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold">{post.category}</span>
          )}
          <h1 className="mt-3 font-display text-display-lg text-navy">{post.title}</h1>
          {post.excerpt && <p className="mt-4 font-body text-lg text-charcoal">{post.excerpt}</p>}
          <p className="mt-4 font-body text-xs text-charcoal/70">
            {post.author} {post.publishedAt && `· ${post.publishedAt}`}
          </p>
        </Container>

        {post.heroImage && (
          <Container>
            <div className="relative aspect-[16/9] overflow-hidden rounded">
              <ResponsiveImage desktop={post.heroImage} alt={post.title} priority className="absolute inset-0 h-full w-full" />
            </div>
          </Container>
        )}

        <Container narrow className="py-12 font-body text-base leading-relaxed text-charcoal">
          {post.content}
        </Container>
      </article>

      <ConsultationCTA secondaryCta={{ label: 'More Insights', to: '/blog' }} />
    </Layout>
  )
}
