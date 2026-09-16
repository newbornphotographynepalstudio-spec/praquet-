// Premium, format-negotiating responsive image.
//
// - Serves AVIF -> WebP -> JPG in that order of preference.
// - Optionally art-directs a separate crop for narrow viewports (`mobile`),
//   shown below the `md` breakpoint (767px) — used for the hero, where the
//   desktop crop loses its subject when simply scaled down.
// - Ships width/height so the browser reserves space before the image
//   loads, preventing layout shift; the caller controls the aspect-ratio
//   box via `className` (e.g. `aspect-[4/5] md:aspect-[16/9]`).
// - IMPORTANT: when nesting this inside an `aspect-[...]` container, the
//   `desktop`/`mobile` image's own aspect ratio must match (or you must
//   pass `className="h-full w-full"` explicitly). The <img> fills its
//   *own* box via `object-cover`, but the <picture> wrapper itself does
//   NOT stretch to fill an ancestor by default — a mismatched source
//   (e.g. a 3:2 photo in a 4:5 grid tile) renders short and exposes
//   whatever sits behind it. This can't safely be defaulted on: Tailwind's
//   cascade is resolved by generated stylesheet order, not by where a
//   class sits in the attribute string, so forcing `h-full w-full` here
//   can silently outrank a caller's own fixed size (e.g. `<BrandMark>`'s
//   `h-10 w-10` logo chip) instead of losing to it as markup order would
//   suggest.
// - Defaults to native lazy-loading; pass `loading="eager"` for images in a
//   horizontally-scrolling container (e.g. a filmstrip) — native lazy-load
//   is keyed to vertical viewport intersection and doesn't reliably fire
//   for content that only becomes visible via horizontal scroll.
export default function ResponsiveImage({
  alt,
  desktop,
  mobile,
  sizes = '100vw',
  priority = false,
  loading,
  className = '',
  imgClassName = '',
  objectPosition = 'center',
}) {
  if (!desktop) return null

  return (
    <picture className={`block overflow-hidden ${className}`}>
      {mobile && (
        <>
          <source media="(max-width: 767px)" srcSet={mobile.avifSrcSet} type="image/avif" sizes={sizes} />
          <source media="(max-width: 767px)" srcSet={mobile.webpSrcSet} type="image/webp" sizes={sizes} />
          <source media="(max-width: 767px)" srcSet={mobile.jpgSrcSet} type="image/jpeg" sizes={sizes} />
        </>
      )}
      <source srcSet={desktop.avifSrcSet} type="image/avif" sizes={sizes} />
      <source srcSet={desktop.webpSrcSet} type="image/webp" sizes={sizes} />
      <img
        src={desktop.fallback}
        srcSet={desktop.jpgSrcSet}
        sizes={sizes}
        alt={alt}
        width={desktop.width}
        height={desktop.height}
        loading={loading || (priority ? 'eager' : 'lazy')}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        className={`h-full w-full object-cover ${imgClassName}`}
        style={{ objectPosition }}
      />
    </picture>
  )
}
