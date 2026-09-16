import Layout from '../components/layout/Layout'
import Seo from '../components/seo/Seo'
import Breadcrumbs from '../components/ui/Breadcrumbs'
import Container from '../components/ui/Container'
import SectionHeading from '../components/ui/SectionHeading'
import EmptyState from '../components/ui/EmptyState'
import ConsultationCTA from '../components/ui/ConsultationCTA'
import { posts } from '../data/blog'

// No articles have been published yet (see brand content rule in
// README.md and section 36 of the Phase 2 brief) — an honest editorial
// "coming soon" state, ready to list real entries from src/data/blog.js
// the moment they exist.
const upcomingTopics = [
  'Choosing between parquet, SPC, laminate and wooden flooring',
  'WPC vs. PVC wall panels — what actually differs',
  'What fluted panels add to a room beyond decoration',
  'Acoustic wall panels: what they do and don’t solve',
  'Flooring maintenance basics for Kathmandu Valley homes',
]

export default function Blog() {
  return (
    <Layout>
      <Seo
        title="Insights"
        description="Editorial articles on flooring, wall panels and interior material selection — coming soon from Parquet & Decor Nepal."
        path="/blog"
      />
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Insights' }]} />

      <section className="bg-white py-16 md:py-24">
        <Container narrow>
          <SectionHeading
            as="h1"
            eyebrow="Insights"
            title="A Journal on Materials & Interiors"
            description="Our editorial section is just getting started. Here's what we're planning to cover first."
          />
        </Container>

        {posts.length === 0 ? (
          <Container narrow className="mt-4">
            <EmptyState
              title="Articles are on the way"
              description="Check back soon, or explore our material pages in the meantime."
              cta={{ label: 'Explore Products', to: '/products' }}
            />
            <ul className="mt-4 space-y-3 border-t border-navy/10 pt-8">
              {upcomingTopics.map((topic) => (
                <li key={topic} className="flex gap-3 font-body text-sm text-charcoal">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                  {topic}
                </li>
              ))}
            </ul>
          </Container>
        ) : (
          <Container className="mt-12 grid gap-8 md:grid-cols-3">
            {/* Real article cards render here once src/data/blog.js has entries. */}
          </Container>
        )}
      </section>

      <ConsultationCTA secondaryCta={{ label: 'Explore Products', to: '/products' }} />
    </Layout>
  )
}
