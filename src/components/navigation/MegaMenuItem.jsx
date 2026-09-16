import { useEffect, useRef, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { HiChevronDown } from 'react-icons/hi'
import { cn } from '../../utils/cn'

// A single header nav item — a plain link, or (when `item.megaMenu` is
// set) a trigger that reveals a small two-column dropdown. Opens on
// hover or focus, closes on Escape, blur-out, or an outside click —
// keyboard and mouse both fully supported.
export default function MegaMenuItem({ item, solid }) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)
  const closeTimer = useRef(null)

  const openNow = () => {
    clearTimeout(closeTimer.current)
    setOpen(true)
  }
  const closeSoon = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120)
  }

  useEffect(() => {
    if (!open) return
    function onKeyDown(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    function onClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('mousedown', onClickOutside)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('mousedown', onClickOutside)
    }
  }, [open])

  const linkTone = solid ? 'text-navy hover:text-gold' : 'text-ivory hover:text-gold'

  if (!item.megaMenu) {
    return (
      <NavLink
        to={item.to}
        className={({ isActive }) =>
          cn('font-body text-sm font-semibold uppercase tracking-wide transition-colors duration-400', linkTone, isActive && 'text-gold')
        }
      >
        {item.label}
      </NavLink>
    )
  }

  return (
    <div ref={containerRef} className="relative" onMouseEnter={openNow} onMouseLeave={closeSoon}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        onFocus={openNow}
        className={cn('flex items-center gap-1 font-body text-sm font-semibold uppercase tracking-wide transition-colors duration-400', linkTone)}
      >
        {item.label}
        <HiChevronDown className={cn('transition-transform duration-300 ease-premium', open && 'rotate-180')} size={14} aria-hidden="true" />
      </button>

      {open && (
        <div className="absolute left-1/2 top-full z-50 mt-4 w-[440px] -translate-x-1/2 rounded border border-navy/10 bg-white p-6 shadow-lifted">
          <div className="grid grid-cols-2 gap-8">
            {item.megaMenu.map((group) => (
              <div key={group.title}>
                <Link
                  to={group.to}
                  onClick={() => setOpen(false)}
                  className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold transition-colors hover:text-navy"
                >
                  {group.title}
                </Link>
                <ul className="mt-3 space-y-2.5">
                  {group.items.map((sub) => (
                    <li key={sub.to}>
                      <Link to={sub.to} onClick={() => setOpen(false)} className="font-body text-sm text-navy transition-colors hover:text-gold">
                        {sub.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
