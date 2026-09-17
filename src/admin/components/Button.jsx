import { cn } from '../../utils/cn'

const base =
  'inline-flex min-h-[40px] items-center justify-center gap-2 rounded px-4 py-2 font-body text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold'

const variants = {
  primary: 'bg-navy text-ivory hover:bg-navy-light',
  secondary: 'border border-navy/20 text-navy hover:bg-navy/5',
  danger: 'border border-red-200 text-red-700 hover:bg-red-50',
  ghost: 'text-navy hover:bg-navy/5',
}

export default function Button({ variant = 'primary', className, ...props }) {
  return <button type="button" className={cn(base, variants[variant], className)} {...props} />
}
