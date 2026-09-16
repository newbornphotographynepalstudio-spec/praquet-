import Container from '../ui/Container'
import Eyebrow from '../ui/Eyebrow'
import Button from '../ui/Button'
import ResponsiveImage from '../media/ResponsiveImage'
import { flutedCollectionImage } from '../../data/images'

// Honest "portfolio growing" framing — no fabricated project count or
// case studies (see brand content rule in README.md). Links to the real
// empty-state /projects page and to /gallery for inspiration meanwhile.
export default function ProjectsTeaser() {
  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-28">
      <Container>
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <div className="relative aspect-[4/5] overflow-hidden rounded md:aspect-[3/4]">
            <ResponsiveImage
              desktop={flutedCollectionImage.desktop}
              alt={flutedCollectionImage.alt}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="absolute inset-0 h-full w-full"
            />
          </div>
          <div className="md:max-w-md">
            <Eyebrow className="mb-5">Projects</Eyebrow>
            <h2 className="font-display text-display-md text-navy">Project Stories Are Coming Together</h2>
            <p className="mt-5 font-body text-base leading-relaxed text-charcoal">
              We're building a portfolio of verified, completed work. In the meantime, explore material inspiration
              — or get in touch to start planning your own space.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button to="/projects" variant="secondary">
                View Projects
              </Button>
              <Button to="/gallery" variant="ghost">
                Browse Inspiration
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
