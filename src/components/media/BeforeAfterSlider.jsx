import { useId, useState } from 'react'
import ResponsiveImage from './ResponsiveImage'
import { cn } from '../../utils/cn'

// Reusable before/after reveal. A native <input type="range"> drives an
// absolutely-positioned clip-path, which keeps full keyboard, touch and
// screen-reader support "for free" instead of hand-rolling drag handling.
//
// `demo` marks the imagery as inspiration/demonstration rather than an
// actual completed project — required until real project photography
// exists (see IMAGE_SOURCES.md / brand content rules).
export default function BeforeAfterSlider({
  before,
  after,
  beforeAlt,
  afterAlt,
  beforeLabel = 'Before',
  afterLabel = 'After',
  caption,
  demo = false,
  className = '',
}) {
  const [value, setValue] = useState(50)
  const id = useId()

  return (
    <div className={className}>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded bg-charcoal/10">
        <ResponsiveImage desktop={after} alt={afterAlt} className="absolute inset-0 h-full w-full" priority={false} />

        <div className="absolute inset-0 h-full w-full" style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}>
          <ResponsiveImage desktop={before} alt={beforeAlt} className="absolute inset-0 h-full w-full" priority={false} />
        </div>

        <div
          className="pointer-events-none absolute inset-y-0 w-0.5 bg-ivory shadow-lifted"
          style={{ left: `${value}%` }}
          aria-hidden="true"
        >
          <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ivory text-navy shadow-lifted">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M5 3 1 8l4 5M11 3l4 5-4 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>

        <span className="pointer-events-none absolute left-3 top-3 rounded-sm bg-navy/80 px-2.5 py-1 font-body text-[11px] font-semibold uppercase tracking-wide text-ivory">
          {beforeLabel}
        </span>
        <span className="pointer-events-none absolute right-3 top-3 rounded-sm bg-navy/80 px-2.5 py-1 font-body text-[11px] font-semibold uppercase tracking-wide text-ivory">
          {afterLabel}
        </span>

        <label htmlFor={id} className="sr-only">
          Reveal {beforeLabel.toLowerCase()} vs {afterLabel.toLowerCase()}
        </label>
        <input
          id={id}
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className={cn(
            'absolute inset-0 h-full w-full cursor-ew-resize appearance-none bg-transparent',
            '[&::-webkit-slider-thumb]:h-full [&::-webkit-slider-thumb]:w-10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-transparent',
            '[&::-moz-range-thumb]:h-full [&::-moz-range-thumb]:w-10 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-transparent',
            'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold'
          )}
        />
      </div>

      {(caption || demo) && (
        <div className="mt-3 space-y-1">
          {caption && <p className="font-body text-sm text-charcoal">{caption}</p>}
          {demo && (
            <p className="font-body text-xs italic text-charcoal/70">
              Demonstration imagery for illustration only — not an actual Parquet &amp; Decor Nepal project.
            </p>
          )}
        </div>
      )}
    </div>
  )
}
