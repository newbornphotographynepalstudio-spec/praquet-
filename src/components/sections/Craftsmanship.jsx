import Container from '../ui/Container'
import Button from '../ui/Button'
import Eyebrow from '../ui/Eyebrow'
import ResponsiveImage from '../media/ResponsiveImage'
import { materialDetailImage } from '../../data/images'
import { craftsmanshipContent } from '../../data/homepage'

// Editorial split layout (image + text side by side), not a card — see
// homepage layout rhythm notes on avoiding an all-card homepage.
export default function Craftsmanship() {
  return (
    <section className="bg-ivory-light py-20 md:py-28">
      <Container>
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16 lg:gap-24">
          <div className="relative aspect-[4/5] overflow-hidden rounded md:aspect-[3/4]">
            <ResponsiveImage
              desktop={materialDetailImage.desktop}
              alt={materialDetailImage.alt}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="absolute inset-0 h-full w-full"
            />
          </div>
          <div className="md:max-w-md">
            <Eyebrow className="mb-5">{craftsmanshipContent.eyebrow}</Eyebrow>
            <h2 className="font-display text-display-md text-navy">{craftsmanshipContent.title}</h2>
            <p className="mt-5 font-body text-base leading-relaxed text-charcoal">{craftsmanshipContent.description}</p>
            <Button to={craftsmanshipContent.cta.to} variant="secondary" className="mt-8">
              {craftsmanshipContent.cta.label}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
