import ResponsiveImage from '../media/ResponsiveImage'

// A single material-option tile inside a category's "Explore {Category}"
// collection (see MaterialCollection). Deliberately editorial, not
// interactive: large image, small eyebrow, name, finish and a short
// description — no e-commerce styling (no price, no stock/SKU badge, no
// rating, no "sale" tag), and no per-card enquiry action. Options don't
// have their own indexed route (the per-option content is too thin for a
// real page — see the Phase 2.2 brief), and per Phase 2.3 the per-card
// WhatsApp CTA was removed to keep the card visually quiet; the site-wide
// WhatsApp/consultation CTAs (ConsultationCTA, MobileStickyCTA,
// FloatingWhatsApp) already cover enquiries for every material.
export default function MaterialOptionCard({ option, categoryName }) {
  // `option.image` is either the local build-time responsive-image
  // descriptor ({tile, alt} — avif/webp/jpg srcsets, from src/data/images.js)
  // for options still sourced from src/data/materialOptions.js, or a plain
  // Cloudinary/URL string for a CMS-authored option (see src/lib/cms/) —
  // the admin's image field only ever stores a single URL, since Cloudinary
  // uploads (or a pasted URL) don't go through the build-time AVIF/WebP
  // pipeline. Both render at the same size/position; the CMS path is a
  // plain <img> rather than <ResponsiveImage>, since there's no multi-format
  // srcset to give it.
  const isResponsive = option.image && typeof option.image === 'object'

  return (
    <div className="group">
      <div className="relative aspect-[4/5] overflow-hidden rounded bg-charcoal/10">
        {isResponsive ? (
          <ResponsiveImage
            desktop={option.image.tile}
            alt={option.image.alt}
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            className="absolute inset-0 h-full w-full"
            imgClassName="transition-transform duration-600 ease-premium group-hover:scale-105"
          />
        ) : (
          <img
            src={option.image}
            alt={`${option.name} — ${option.finish || categoryName}`}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-600 ease-premium group-hover:scale-105"
          />
        )}
      </div>
      <span className="mt-3 block font-body text-[11px] font-semibold uppercase tracking-wide text-gold">
        {categoryName}
      </span>
      <h3 className="mt-1 font-display text-xl text-navy">{option.name}</h3>
      <p className="mt-1 font-body text-sm text-charcoal">{option.finish}</p>
      {option.description && (
        <p className="mt-2 font-body text-sm leading-relaxed text-charcoal/80">{option.description}</p>
      )}
    </div>
  )
}
