import Layout from '../components/layout/Layout'
import Seo from '../components/seo/Seo'
import Container from '../components/ui/Container'
import Eyebrow from '../components/ui/Eyebrow'
import Button from '../components/ui/Button'

export default function NotFound() {
  return (
    <Layout>
      <Seo title="Page Not Found" noindex />
      <Container className="flex min-h-[55vh] flex-col items-start justify-center py-20">
        <Eyebrow className="mb-5">404</Eyebrow>
        <h1 className="font-display text-display-md text-navy">Page Not Found</h1>
        <p className="mt-4 max-w-md font-body text-base leading-relaxed text-charcoal">
          The page you're looking for doesn't exist or has moved. Explore our materials, or get in touch to talk
          through your space.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button to="/products" variant="primary">
            Explore Products
          </Button>
          <Button to="/" variant="secondary">
            Back to Home
          </Button>
          <Button to="/contact" variant="ghost">
            Get a Free Consultation
          </Button>
        </div>
      </Container>
    </Layout>
  )
}
