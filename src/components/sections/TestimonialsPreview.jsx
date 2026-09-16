import Container from '../ui/Container'
import Eyebrow from '../ui/Eyebrow'
import { testimonials } from '../../data/testimonials'

// No verified customer testimonials exist yet — this renders a tasteful
// "incoming" state rather than fabricated quotes, names or star ratings
// (see brand content rule in README.md and section 61 of the Phase 2
// brief). Ready to render real entries from src/data/testimonials.js the
// moment they exist.
export default function TestimonialsPreview() {
  if (testimonials.length > 0) {
    return (
      <section className="bg-ivory-light py-20 md:py-28">
        <Container narrow className="text-center">
          <Eyebrow className="mb-4 justify-center">In Their Words</Eyebrow>
          {/* Real testimonial cards render here once src/data/testimonials.js has entries. */}
        </Container>
      </section>
    )
  }

  return (
    <section className="bg-ivory-light py-16 md:py-20">
      <Container narrow className="text-center">
        <Eyebrow className="mb-4 justify-center">In Their Words</Eyebrow>
        <p className="mx-auto max-w-md font-body text-base text-charcoal">
          We're gathering feedback from early clients — real testimonials will appear here soon.
        </p>
      </Container>
    </section>
  )
}
