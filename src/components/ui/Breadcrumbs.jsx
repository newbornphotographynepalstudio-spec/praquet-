import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { HiChevronRight } from 'react-icons/hi'
import Container from './Container'

const SITE_URL = 'https://www.parquetdecornepal.com'

// `items`: [{ label, to }] — the last item is the current page (no link).
export default function Breadcrumbs({ items }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      item: `${SITE_URL}${item.to || ''}`,
    })),
  }

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
      <nav aria-label="Breadcrumb" className="border-b border-navy/10 bg-white">
        <Container>
          <ol className="flex flex-wrap items-center gap-1.5 py-4 font-body text-xs text-charcoal">
            {items.map((item, i) => {
              const isLast = i === items.length - 1
              return (
                <li key={item.to || item.label} className="flex items-center gap-1.5">
                  {i > 0 && <HiChevronRight className="text-charcoal/40" size={12} aria-hidden="true" />}
                  {isLast || !item.to ? (
                    <span aria-current={isLast ? 'page' : undefined} className="text-navy">
                      {item.label}
                    </span>
                  ) : (
                    <Link to={item.to} className="transition-colors hover:text-gold">
                      {item.label}
                    </Link>
                  )}
                </li>
              )
            })}
          </ol>
        </Container>
      </nav>
    </>
  )
}
