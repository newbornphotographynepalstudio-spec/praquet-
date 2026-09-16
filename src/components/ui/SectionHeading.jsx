import Eyebrow from './Eyebrow'
import { cn } from '../../utils/cn'

export default function SectionHeading({
  eyebrow,
  title,
  description,
  as: Tag = 'h2',
  align = 'left',
  tone = 'dark',
  className = '',
}) {
  return (
    <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && (
        <Eyebrow tone={tone} className={cn('mb-4', align === 'center' && 'justify-center')}>
          {eyebrow}
        </Eyebrow>
      )}
      <Tag
        className={cn(
          'font-display text-display-md',
          tone === 'dark' ? 'text-navy' : 'text-ivory'
        )}
      >
        {title}
      </Tag>
      {description && (
        <p
          className={cn(
            'mt-4 font-body text-base leading-relaxed',
            tone === 'dark' ? 'text-charcoal' : 'text-ivory/75'
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
