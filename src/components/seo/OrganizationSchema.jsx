import { Helmet } from 'react-helmet-async'

// Minimal, strictly factual Organization schema. Do NOT add address,
// telephone, geo coordinates, openingHours, aggregateRating, or review
// fields here until the business supplies real, verifiable values — see
// the "brand content rule" in README.md (no invented stats, certifications,
// or testimonials).
export default function OrganizationSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Parquet & Decor Nepal',
    url: 'https://www.parquetdecornepal.com',
    logo: 'https://www.parquetdecornepal.com/images/brand/logo-mark-256.jpg',
    description:
      'Premium flooring and architectural wall panel solutions in Nepal, offering parquet, SPC, laminate and wooden flooring alongside WPC, PVC, fluted and acoustic wall panels with professional installation.',
  }

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  )
}
