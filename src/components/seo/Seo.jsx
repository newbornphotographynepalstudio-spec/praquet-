import { Helmet } from 'react-helmet-async'

const SITE_NAME = 'Parquet & Decor Nepal'
const DEFAULT_DESCRIPTION =
  'Premium flooring and architectural wall panel solutions in Nepal — parquet, SPC, laminate and wooden flooring, WPC, PVC, fluted and acoustic wall panels, with professional installation.'
// Placeholder until the production domain is confirmed — update before
// launch so canonical/OG URLs are correct.
const SITE_URL = 'https://www.parquetdecornepal.com'

export default function Seo({ title, description = DEFAULT_DESCRIPTION, path = '/', noindex = false, image }) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Premium Flooring & Wall Panel Solutions`
  const canonical = `${SITE_URL}${path}`
  const ogImage = image || `${SITE_URL}/images/og/default-og.jpg`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  )
}
