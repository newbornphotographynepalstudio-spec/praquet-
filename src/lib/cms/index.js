import { collection, getDocs, query, where } from 'firebase/firestore'
import { getPublicDb } from './client'

// Public-facing CMS read layer. Every function here:
//  - does exactly ONE Firestore read (one getDocs call), never per-card/
//    per-component reads, and never onSnapshot;
//  - filters to `status == 'published'` only — drafts never reach a
//    visitor;
//  - sorts client-side by an `order` field rather than using Firestore's
//    own orderBy, so a category-slug + status filter never needs a
//    composite index to be created in the Firebase console first;
//  - returns `null` (never throws) on any failure, on a totally
//    unconfigured Firebase project, or when nothing published exists for
//    that query — every caller in src/pages falls back to the existing
//    local src/data/*.js content in that case, so a Firestore outage (or
//    content simply not having been migrated/published yet) can never
//    blank a page. See CMS_INTEGRATION.md for the full fallback contract.
//
// These are called once per page mount (inside a useEffect), not on every
// render and not kept alive across navigation — the existing
// ScrollRestoration/route-remount behavior (see App.jsx) means visiting a
// page again, or a fresh page load, naturally re-runs this fetch, so a
// newly published admin edit becomes visible on the next visit without any
// onSnapshot listener. See the Phase 3.7 report for the full explanation.

async function fetchPublished(collectionName, whereClauses = []) {
  const db = getPublicDb()
  if (!db) return null
  try {
    const constraints = [where('status', '==', 'published'), ...whereClauses]
    const snap = await getDocs(query(collection(db, collectionName), ...constraints))
    if (snap.empty) return null
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
  } catch {
    return null
  }
}

function byOrder(a, b) {
  return (a.order ?? 0) - (b.order ?? 0)
}

export async function getPublishedMaterialOptions(categorySlug) {
  const docs = await fetchPublished('materialOptions', [where('categorySlug', '==', categorySlug)])
  return docs ? docs.sort(byOrder) : null
}

export async function getPublishedServices() {
  const docs = await fetchPublished('services')
  return docs ? docs.sort(byOrder) : null
}

export async function getPublishedFaqs() {
  const docs = await fetchPublished('faqs')
  return docs ? docs.sort(byOrder) : null
}

export async function getPublishedGallery() {
  const docs = await fetchPublished('gallery')
  return docs ? docs.sort(byOrder) : null
}
