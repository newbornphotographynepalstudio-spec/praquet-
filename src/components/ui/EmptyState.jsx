import Button from './Button'
import Eyebrow from './Eyebrow'

// Tasteful "nothing here yet" state — used where real content (projects,
// blog posts, testimonials) doesn't exist yet and must not be fabricated
// (see brand content rule in README.md). Never styled as an error.
export default function EmptyState({ eyebrow, title, description, cta, as: Tag = 'h2', className = '' }) {
  return (
    <div className={`mx-auto max-w-lg py-16 text-center ${className}`}>
      {eyebrow && (
        <Eyebrow className="mb-4 justify-center">
          {eyebrow}
        </Eyebrow>
      )}
      <Tag className="font-display text-display-sm text-navy">{title}</Tag>
      {description && <p className="mt-4 font-body text-base leading-relaxed text-charcoal">{description}</p>}
      {cta && (
        <Button to={cta.to} variant="secondary" className="mt-8">
          {cta.label}
        </Button>
      )}
    </div>
  )
}
