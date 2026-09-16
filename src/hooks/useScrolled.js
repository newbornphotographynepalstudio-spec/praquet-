import { useEffect, useState } from 'react'

// Tracks whether the page has scrolled past `threshold`, rAF-throttled.
// Used by the header to switch from an overlay to a solid background.
export function useScrolled(threshold = 40) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let ticking = false
    function measure() {
      setScrolled(window.scrollY > threshold)
      ticking = false
    }
    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(measure)
        ticking = true
      }
    }
    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return scrolled
}
