import { useEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

const STORAGE_KEY = 'scroll-positions'

function readStore() {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY)) || {}
  } catch {
    return {}
  }
}

function writeStore(store) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(store))
  } catch {
    // sessionStorage unavailable (private mode, quota, etc.) — scroll
    // restoration on browser Back just degrades to "top of page" instead.
  }
}

// Centralized scroll behavior for every route change (mounted once in
// App.jsx, inside <BrowserRouter>) — no per-page window.scrollTo() calls.
//
// - Normal link navigation (PUSH/REPLACE): start at the top, or at a
//   `#hash` target if the URL has one.
// - Browser Back/Forward (POP): restore the scroll position the user was
//   at on that history entry, keyed by React Router's `location.key`
//   (unique per history entry, even for repeat visits to the same
//   pathname) and persisted in sessionStorage so it survives a full page
//   reload of a back-navigated entry.
//
// We take over `history.scrollRestoration` from the browser because the
// browser's own automatic restoration fires on `popstate` before React has
// re-rendered the destination route (especially with the lazy/Suspense
// pages in App.jsx), so it frequently restores against the wrong (still
// loading, still short) layout. Doing it ourselves after the route commits
// — with a couple of rAF passes to let layout settle — is more reliable.
export default function ScrollRestoration() {
  const location = useLocation()
  const navigationType = useNavigationType()
  const rafIds = useRef([])
  // React Router assigns `location.key === "default"` to the initial entry
  // of *every* fresh top-level page load (a hard refresh, typing a URL, a
  // deep link) — not only the very first load a browser tab ever sees — and
  // reports that initial mount's navigationType as 'POP'. sessionStorage
  // persists across a same-tab reload, so a stale "default" entry from an
  // earlier visit could otherwise hijack a genuinely fresh load's hash/top
  // scroll. This ref distinguishes "the app's first render this session" —
  // skip restoration then — from a real, later Back/Forward POP, where
  // restoring is exactly what we want.
  const hasMountedOnce = useRef(false)

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  // Continuously persist the current scroll position under this history
  // entry's key so it's already saved by the time the user navigates away
  // (rather than trying to catch a single "leaving" moment).
  useEffect(() => {
    function save() {
      const store = readStore()
      store[location.key] = window.scrollY
      writeStore(store)
    }
    window.addEventListener('scroll', save, { passive: true })
    return () => window.removeEventListener('scroll', save)
  }, [location.key])

  useEffect(() => {
    rafIds.current.forEach(cancelAnimationFrame)
    rafIds.current = []

    function scrollToHash(hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) el.scrollIntoView({ behavior: 'auto', block: 'start' })
      return Boolean(el)
    }

    const isFreshLoad = !hasMountedOnce.current
    hasMountedOnce.current = true

    function apply() {
      if (navigationType === 'POP' && !isFreshLoad) {
        const saved = readStore()[location.key]
        if (typeof saved === 'number') {
          // 'instant', not 'auto': the site sets `html { scroll-behavior:
          // smooth }` globally (for in-page anchor links) — 'auto' means
          // "defer to that CSS", so it would animate this jump over
          // several hundred ms instead of landing immediately. 'instant'
          // is the one value that bypasses the page's own scroll-behavior.
          window.scrollTo({ top: saved, left: 0, behavior: 'instant' })
          return
        }
      }
      if (location.hash && scrollToHash(location.hash)) return
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }

    // Route content (lazy-loaded pages, Suspense) may not have committed
    // its real layout height yet on the same tick as this effect — a
    // couple of rAF passes let it settle before we measure/scroll.
    apply()
    const id1 = requestAnimationFrame(() => {
      apply()
      const id2 = requestAnimationFrame(apply)
      rafIds.current.push(id2)
    })
    rafIds.current.push(id1)

    return () => rafIds.current.forEach(cancelAnimationFrame)
  }, [location.pathname, location.search, location.hash, location.key, navigationType])

  return null
}
