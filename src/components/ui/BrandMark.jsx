import ResponsiveImage from '../media/ResponsiveImage'
import { brandLogo } from '../../data/images'
import { cn } from '../../utils/cn'

// The source logo file is a flat JPEG (no transparency) with its own light
// backdrop baked into the pixels, so it can't be laid directly over an
// arbitrary page background without showing a stray rectangle. Framing the
// icon in a small shadowed chip turns that constraint into an intentional
// emblem/plaque treatment that reads cleanly on both light and dark
// sections. The brand name itself is live text, not part of the image —
// crisper at small sizes and readable by search engines and screen readers.
export default function BrandMark({ tone = 'dark', className = '' }) {
  return (
    <span className={cn('inline-flex items-center gap-3', className)}>
      <ResponsiveImage
        desktop={brandLogo.mark}
        alt=""
        priority
        className="h-10 w-10 shrink-0 rounded-sm shadow-subtle ring-1 ring-black/5 md:h-11 md:w-11"
      />
      <span className={cn('font-display leading-tight', tone === 'dark' ? 'text-navy' : 'text-ivory')}>
        <span className="block text-base font-semibold tracking-wide md:text-lg">Parquet &amp; Decor</span>
        <span className="block text-[10px] font-medium uppercase tracking-[0.3em] opacity-80">Nepal</span>
      </span>
    </span>
  )
}
