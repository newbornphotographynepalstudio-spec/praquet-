import { Link } from 'react-router-dom'
import { HiArrowRight } from 'react-icons/hi'
import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'
import { services } from '../../data/services'

// Editorial list, not an icon grid (see "Do Not Overuse Cards" / avoid
// "giant icon grids" design principles).
export default function ServicesPreview() {
  return (
    <section className="bg-navy py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow="Services"
          title="From Material Selection to Finished Installation"
          tone="light"
          description="Professional installation and consultation across every material we work with."
        />

        <ul className="mt-12 divide-y divide-ivory/10 border-t border-ivory/10 md:mt-16">
          {services.map((service) => (
            <li key={service.slug}>
              <Link
                to={`/services/${service.slug}`}
                className="group flex items-center justify-between gap-6 py-6 transition-colors hover:bg-ivory/5"
              >
                <div>
                  <h3 className="font-display text-2xl text-ivory">{service.name}</h3>
                  <p className="mt-1 max-w-md font-body text-sm text-ivory/70">{service.shortDescription}</p>
                </div>
                <HiArrowRight
                  className="hidden shrink-0 text-gold-soft transition-transform duration-400 ease-premium group-hover:translate-x-1 sm:block"
                  size={22}
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
