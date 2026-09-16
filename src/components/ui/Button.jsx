import { Link } from 'react-router-dom'
import { cn } from '../../utils/cn'

const base =
  'inline-flex min-h-[44px] items-center justify-center gap-2 rounded px-7 py-3 font-body text-sm font-semibold uppercase tracking-wide transition-colors duration-400 ease-premium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold'

const variants = {
  primary: 'bg-navy text-ivory hover:bg-navy-light',
  secondary: 'border border-navy text-navy hover:bg-navy hover:text-ivory',
  inverse: 'border border-ivory text-ivory hover:bg-ivory hover:text-navy',
  ghost: 'text-navy hover:text-gold px-2',
  // Solid gold-soft fill — for a WhatsApp/secondary action placed on a navy
  // background (e.g. ConsultationCTA), distinct from `inverse`. Defined as
  // one self-contained variant rather than overridden with extra classes at
  // the call site: two same-property utility classes (e.g. `text-navy` from
  // a variant plus a `text-ivory` override) tie on specificity, so whichever
  // Tailwind happens to emit later in the generated stylesheet wins — not
  // necessarily the one written last in the class string. That exact trap
  // previously broke BrandMark's sizing (see ResponsiveImage's header
  // comment) and was silently rendering this button as navy-on-navy
  // (invisible) before this fix — verified via computed-style inspection,
  // not just visual guesswork. Contrast: gold-soft/navy ≈ 7.45:1, gold/navy
  // ≈ 5.3:1 — both clear AA passes for normal-weight text.
  whatsapp: 'border border-gold-soft bg-gold-soft text-navy hover:border-gold hover:bg-gold',
}

export default function Button({ to, href, variant = 'primary', className = '', children, ...props }) {
  const classes = cn(base, variants[variant], className)

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }
  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  )
}
