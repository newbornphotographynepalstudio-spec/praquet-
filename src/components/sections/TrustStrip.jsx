import { m } from 'framer-motion'
import Container from '../ui/Container'
import { trustPoints } from '../../data/homepage'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

export default function TrustStrip() {
  const reduced = usePrefersReducedMotion()

  return (
    <section className="border-b border-navy/10 bg-white py-16 md:py-20">
      <Container>
        <div className="grid gap-10 md:grid-cols-3 md:gap-14">
          {trustPoints.map((point, i) => (
            <m.div
              key={point.title}
              className="flex flex-col items-start gap-4"
              initial={reduced ? {} : { opacity: 0, y: 16 }}
              whileInView={reduced ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] }}
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-sm bg-ivory text-gold">
                <point.icon size={24} aria-hidden="true" />
              </span>
              <h3 className="font-display text-xl text-navy">{point.title}</h3>
              <p className="font-body text-sm leading-relaxed text-charcoal">{point.description}</p>
            </m.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
