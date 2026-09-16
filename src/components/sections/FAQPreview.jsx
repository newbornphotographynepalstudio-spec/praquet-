import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'
import Button from '../ui/Button'
import FAQAccordion from '../ui/FAQAccordion'
import { getFaqsByTags } from '../../data/faqs'

const homepageFaqs = getFaqsByTags(['general']).slice(0, 4)

export default function FAQPreview() {
  return (
    <section className="bg-white py-20 md:py-28">
      <Container narrow>
        <SectionHeading eyebrow="FAQ" title="A Few Common Questions" />
        <div className="mt-10">
          <FAQAccordion items={homepageFaqs} />
        </div>
        <div className="mt-8 text-center">
          <Button to="/faq" variant="secondary">
            View All FAQs
          </Button>
        </div>
      </Container>
    </section>
  )
}
