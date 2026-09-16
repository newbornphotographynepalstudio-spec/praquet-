import { cn } from '../../utils/cn'

export default function Eyebrow({ children, tone = 'dark', className = '' }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-3 font-body text-xs font-semibold uppercase tracking-[0.2em]',
        tone === 'dark' ? 'text-gold' : 'text-gold-soft',
        className
      )}
    >
      <span className="h-px w-8 bg-current" aria-hidden="true" />
      {children}
    </span>
  )
}
