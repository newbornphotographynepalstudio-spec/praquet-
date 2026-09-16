import { useId, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { HiPlus } from 'react-icons/hi'
import { cn } from '../../utils/cn'

// Accessible accordion: button + aria-expanded/aria-controls, not <details>,
// so the open/close chevron can animate with the rest of the design system.
// `schema`: set true to emit FAQPage JSON-LD (only one instance per page).
export default function FAQAccordion({ items, schema = false }) {
  const [openIndex, setOpenIndex] = useState(null)
  const baseId = useId()

  if (!items.length) return null

  const jsonLd = schema
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      }
    : null

  return (
    <div className="divide-y divide-navy/10 border-y border-navy/10">
      {schema && (
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        </Helmet>
      )}
      {items.map((item, i) => {
        const open = openIndex === i
        const panelId = `${baseId}-panel-${i}`
        const buttonId = `${baseId}-button-${i}`
        return (
          <div key={item.question}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : i)}
                className="flex w-full min-h-[56px] items-center justify-between gap-4 py-4 text-left font-body text-base font-semibold text-navy"
              >
                {item.question}
                <HiPlus
                  className={cn('shrink-0 text-gold transition-transform duration-400 ease-premium', open && 'rotate-45')}
                  size={18}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!open}
              className="pb-5 pr-8 font-body text-sm leading-relaxed text-charcoal"
            >
              {item.answer}
            </div>
          </div>
        )
      })}
    </div>
  )
}
