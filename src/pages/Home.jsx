import Layout from '../components/layout/Layout'
import Seo from '../components/seo/Seo'
import OrganizationSchema from '../components/seo/OrganizationSchema'
import Hero from '../components/sections/Hero'
import TrustStrip from '../components/sections/TrustStrip'
import Craftsmanship from '../components/sections/Craftsmanship'
import CollectionPreview from '../components/sections/CollectionPreview'
import ProductStrip from '../components/sections/ProductStrip'
import BeforeAfterPreview from '../components/sections/BeforeAfterPreview'
import ServicesPreview from '../components/sections/ServicesPreview'
import ProjectsTeaser from '../components/sections/ProjectsTeaser'
import TestimonialsPreview from '../components/sections/TestimonialsPreview'
import FAQPreview from '../components/sections/FAQPreview'
import ConsultationCTA from '../components/ui/ConsultationCTA'

export default function Home() {
  return (
    <Layout overlayHeader>
      <Seo path="/" />
      <OrganizationSchema />
      <Hero />
      <TrustStrip />
      <Craftsmanship />
      <CollectionPreview />
      <ProductStrip />
      <BeforeAfterPreview />
      <ServicesPreview />
      <ProjectsTeaser />
      <TestimonialsPreview />
      <FAQPreview />
      <ConsultationCTA />
    </Layout>
  )
}
