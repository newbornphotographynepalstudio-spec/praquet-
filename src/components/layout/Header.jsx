import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { HiMenu, HiX } from 'react-icons/hi'
import Container from '../ui/Container'
import Button from '../ui/Button'
import BrandMark from '../ui/BrandMark'
import MobileMenu from '../navigation/MobileMenu'
import MegaMenuItem from '../navigation/MegaMenuItem'
import { primaryNav } from '../../data/navigation'
import { useScrolled } from '../../hooks/useScrolled'
import { cn } from '../../utils/cn'

// `overlay`: start transparent over a hero image and switch to a solid
// ivory bar after scrolling. Pages without a full-bleed hero should leave
// this false so the header is always solid and legible.
export default function Header({ overlay = false }) {
  const scrolled = useScrolled(48)
  const solid = !overlay || scrolled
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen) return
    function onKeyDown(e) {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevOverflow
    }
  }, [menuOpen])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-400 ease-premium',
        solid ? 'border-b border-navy/10 bg-ivory-light/95 shadow-subtle backdrop-blur-sm' : 'bg-transparent'
      )}
    >
      <Container className="flex h-20 items-center justify-between">
        <Link to="/" aria-label="Parquet & Decor Nepal — home" onClick={() => setMenuOpen(false)}>
          <BrandMark tone={solid ? 'dark' : 'light'} />
        </Link>

        <nav className="hidden items-center gap-9 xl:flex" aria-label="Primary">
          {primaryNav.map((item) => (
            <MegaMenuItem key={item.to} item={item} solid={solid} />
          ))}
        </nav>

        <div className="hidden xl:block">
          <Button to="/contact" variant="primary" className="text-xs">
            Get a Free Consultation
          </Button>
        </div>

        <button
          type="button"
          className={cn(
            // `relative z-50`: the mobile menu overlay below is `fixed z-40`
            // and, as a *sibling* of this button inside the same `header`
            // stacking context, would otherwise paint above a
            // non-positioned/auto-z-index button once open — silently
            // eating every tap meant to close/toggle the menu. Explicit
            // z-index here keeps this button clickable above the overlay
            // regardless of what the overlay renders.
            'relative z-50 flex h-11 w-11 items-center justify-center rounded xl:hidden',
            solid || menuOpen ? 'text-navy' : 'text-ivory'
          )}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <HiX size={26} aria-hidden="true" /> : <HiMenu size={26} aria-hidden="true" />}
        </button>
      </Container>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  )
}
