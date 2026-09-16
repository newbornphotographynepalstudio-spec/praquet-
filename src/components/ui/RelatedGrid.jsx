import { Link } from 'react-router-dom'
import { HiArrowRight } from 'react-icons/hi'
import ResponsiveImage from '../media/ResponsiveImage'
import { cn } from '../../utils/cn'

// Restrained card: image + small label + title + short description + arrow.
// No heavy shadow, no large radius, no decorative chrome — see "Cards"
// design principle in README.md. Used for related materials/products,
// gallery tiles, and family category grids.
export default function RelatedGrid({ items, columns = 3 }) {
  const cols = { 2: 'md:grid-cols-2', 3: 'md:grid-cols-3', 4: 'md:grid-cols-4' }[columns] || 'md:grid-cols-3'

  return (
    <div className={cn('grid grid-cols-1 gap-6 sm:grid-cols-2', cols)}>
      {items.map((item) => (
        <Link key={item.to} to={item.to} className="group block">
          <div className="relative aspect-[4/5] overflow-hidden rounded bg-charcoal/10">
            <ResponsiveImage
              desktop={item.image}
              alt={item.alt}
              sizes="(min-width: 768px) 25vw, 50vw"
              className="absolute inset-0 h-full w-full"
              imgClassName="transition-transform duration-600 ease-premium group-hover:scale-105"
            />
          </div>
          {item.label && (
            <span className="mt-3 block font-body text-[11px] font-semibold uppercase tracking-wide text-gold">
              {item.label}
            </span>
          )}
          <h3 className="mt-1 font-display text-xl text-navy">{item.title}</h3>
          {item.description && <p className="mt-1 font-body text-sm text-charcoal">{item.description}</p>}
          <span className="mt-2 inline-flex items-center gap-1.5 font-body text-xs font-semibold uppercase tracking-wide text-navy">
            {item.cta || 'Explore'}
            <HiArrowRight className="transition-transform duration-400 ease-premium group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </Link>
      ))}
    </div>
  )
}
