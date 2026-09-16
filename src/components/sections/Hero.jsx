import { m } from 'framer-motion'
import ResponsiveImage from '../media/ResponsiveImage'
import Container from '../ui/Container'
import Button from '../ui/Button'
import Eyebrow from '../ui/Eyebrow'
import { heroImage } from '../../data/images'
import { heroContent } from '../../data/homepage'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

// Composition note: the source photo has open, blank wall/window space on
// its left and the subject (sofa + wood-slat wall) on its right, so copy
// sits left on desktop. The mobile crop instead frames a light ceiling/wall
// band across the top with the subject below, so copy sits at the top
// there. Two gradient overlays (one per breakpoint) keep contrast without
// darkening the material photography itself.
export default function Hero() {
  const reduced = usePrefersReducedMotion()
  const rise = (delay = 0) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] },
        }

  return (
    <section className="relative min-h-[600px] overflow-hidden md:min-h-[720px]" style={{ height: '92svh' }}>
      <ResponsiveImage
        desktop={heroImage.desktop}
        mobile={heroImage.mobile}
        alt={heroImage.alt}
        priority
        sizes="100vw"
        className="absolute inset-0 h-full w-full"
      />

      <div
        className="absolute inset-0 bg-gradient-to-b from-navy/75 via-navy/25 to-navy/10 md:hidden"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 hidden bg-gradient-to-r from-navy/80 via-navy/35 to-transparent md:block"
        aria-hidden="true"
      />

      <Container className="relative flex h-full items-start pt-28 md:items-center md:pt-0">
        <m.div className="max-w-xl" {...rise(0)}>
          <m.div {...rise(0.05)}>
            <Eyebrow tone="light" className="mb-5 text-gold-soft">
              {heroContent.eyebrow}
            </Eyebrow>
          </m.div>
          <m.h1 className="font-display text-display-xl text-ivory" {...rise(0.15)}>
            {heroContent.title}
          </m.h1>
          <m.p className="mt-6 max-w-md font-body text-base leading-relaxed text-ivory/85 md:text-lg" {...rise(0.25)}>
            {heroContent.description}
          </m.p>
          <m.div className="mt-9 flex flex-wrap gap-4" {...rise(0.35)}>
            <Button to={heroContent.primaryCta.to} variant="primary">
              {heroContent.primaryCta.label}
            </Button>
            <Button to={heroContent.secondaryCta.to} variant="inverse">
              {heroContent.secondaryCta.label}
            </Button>
          </m.div>
        </m.div>
      </Container>
    </section>
  )
}
