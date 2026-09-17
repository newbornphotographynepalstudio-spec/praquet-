import { cn } from '../../utils/cn'

const tones = {
  published: 'bg-green-50 text-green-700',
  draft: 'bg-charcoal/10 text-charcoal',
  new: 'bg-gold/15 text-gold',
  contacted: 'bg-blue-50 text-blue-700',
  qualified: 'bg-purple-50 text-purple-700',
  converted: 'bg-green-50 text-green-700',
  lost: 'bg-charcoal/10 text-charcoal/60',
  true: 'bg-green-50 text-green-700',
  false: 'bg-charcoal/10 text-charcoal',
}

// Renders any status-like value (a CMS "draft"/"published" status, an
// inquiry status, or a boolean like `active`/`featured`) as a small pill —
// one shared visual language across every admin list instead of ad hoc
// per-page styling.
export default function StatusBadge({ value }) {
  const key = String(value).toLowerCase()
  const tone = tones[key] || 'bg-charcoal/10 text-charcoal'
  const label = typeof value === 'boolean' ? (value ? 'Yes' : 'No') : String(value ?? '—')
  return (
    <span className={cn('inline-flex items-center rounded-sm px-2 py-0.5 font-body text-xs font-semibold capitalize', tone)}>
      {label}
    </span>
  )
}
