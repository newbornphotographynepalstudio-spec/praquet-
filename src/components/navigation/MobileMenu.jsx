import { useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, m } from 'framer-motion'
import { NavLink, Link } from 'react-router-dom'
import { HiChevronDown } from 'react-icons/hi'
import { FaWhatsapp } from 'react-icons/fa'
import { primaryNav } from '../../data/navigation'
import Button from '../ui/Button'
import SocialLinks from '../ui/SocialLinks'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { contact } from '../../data/contact'
import { cn } from '../../utils/cn'

// "Products" expands into its two family groups (Flooring, Wall Panels),
// each independently expandable to their 4 categories — a nested
// disclosure rather than a second-level page, so the whole catalogue is
// reachable in the mobile menu without leaving it. See section 42 of the
// Phase 2 brief.
function ProductsDisclosure({ item, onClose }) {
  const [open, setOpen] = useState(false)
  const [openGroup, setOpenGroup] = useState(null)

  return (
    <div className="border-b border-navy/10">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex min-h-[44px] w-full items-center justify-between py-4 font-display text-2xl text-navy"
      >
        {item.label}
        <HiChevronDown className={cn('transition-transform duration-300 ease-premium', open && 'rotate-180')} size={22} aria-hidden="true" />
      </button>
      {open && (
        <div className="pb-4">
          <Link
            to={item.to}
            onClick={onClose}
            className="flex min-h-[44px] items-center font-body text-sm font-semibold uppercase tracking-wide text-gold"
          >
            All Products
          </Link>
          {item.megaMenu.map((group) => {
            const groupOpen = openGroup === group.title
            return (
              <div key={group.title} className="mt-1 border-t border-navy/5 pt-1">
                <button
                  type="button"
                  onClick={() => setOpenGroup(groupOpen ? null : group.title)}
                  aria-expanded={groupOpen}
                  className="flex min-h-[44px] w-full items-center justify-between font-body text-sm font-semibold uppercase tracking-wide text-navy"
                >
                  {group.title}
                  <HiChevronDown className={cn('transition-transform duration-300 ease-premium', groupOpen && 'rotate-180')} size={16} aria-hidden="true" />
                </button>
                {groupOpen && (
                  <ul className="pb-1 pl-3">
                    {group.items.map((sub) => (
                      <li key={sub.to}>
                        <Link
                          to={sub.to}
                          onClick={onClose}
                          className="flex min-h-[44px] items-center font-body text-sm text-charcoal transition-colors hover:text-navy"
                        >
                          {sub.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default function MobileMenu({ open, onClose }) {
  const reduced = usePrefersReducedMotion()

  // Rendered into document.body via a portal rather than in place inside
  // <header>: the header applies `backdrop-blur-sm` (a backdrop-filter)
  // once solid, and per the CSS spec an element with a filter/
  // backdrop-filter becomes the *containing block* for its `position:
  // fixed` descendants. With this panel nested inside <header>, its
  // `fixed inset-0` was resolving against the header's own ~80px box
  // instead of the viewport — collapsing the "full-screen" menu into a
  // sliver the height of the header bar, on every page where the header is
  // solid (i.e. always, except the homepage before it scrolls past the
  // overlay threshold — which is exactly the "works, then breaks after
  // scrolling" symptom this was reported as). A portal sidesteps the
  // containing-block trap entirely without touching the header's own
  // visual design.
  return createPortal(
    <AnimatePresence>
      {open && (
        <m.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-ivory-light xl:hidden"
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 1 } : { opacity: 0, y: -16 }}
          transition={{ duration: reduced ? 0 : 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="pointer-events-none h-20 shrink-0" aria-hidden="true" />
          <nav className="flex flex-1 flex-col px-gutter pt-4" aria-label="Mobile">
            {primaryNav.map((item) =>
              item.megaMenu ? (
                <ProductsDisclosure key={item.to} item={item} onClose={onClose} />
              ) : (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    cn(
                      'flex min-h-[44px] items-center border-b border-navy/10 py-4 font-display text-2xl',
                      isActive ? 'text-gold' : 'text-navy'
                    )
                  }
                >
                  {item.label}
                </NavLink>
              )
            )}
          </nav>
          <div className="px-gutter pb-10 pt-4">
            <Button to="/contact" variant="primary" className="w-full" onClick={onClose}>
              Get a Free Consultation
            </Button>
            <Button
              href={contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              className="mt-3 w-full"
            >
              <FaWhatsapp size={16} aria-hidden="true" />
              WhatsApp Us
            </Button>
            <SocialLinks tone="dark" className="mt-6 justify-center" />
          </div>
        </m.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
