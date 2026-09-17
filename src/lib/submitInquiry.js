import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { firebaseApp } from '../config/firebase'

// Public-side Firestore write for the contact form only — deliberately
// separate from src/admin/lib/firebaseAdmin.js (which pulls in Auth too)
// so a visitor loading the contact page's chunk only ever downloads
// 'firebase/firestore', not the admin's auth machinery. This is the site's
// only Firestore write path outside /admin, and it only runs on explicit
// form submission — no listener, no read, no request on any other page.
let dbInstance = null
function getDb() {
  if (!firebaseApp) return null
  if (!dbInstance) dbInstance = getFirestore(firebaseApp)
  return dbInstance
}

// See the Phase 3 brief's `inquiries` schema. Firestore security rules
// (see firestore.rules) restrict what an unauthenticated client may write
// here — status is always forced to "New" server-side by rule, regardless
// of what's sent.
export async function submitInquiry({ name, phone, email, location, interestedProduct, interestedService, projectType, message }) {
  const db = getDb()
  if (!db) {
    throw new Error('Firebase is not configured.')
  }
  const params = new URLSearchParams(window.location.search)
  await addDoc(collection(db, 'inquiries'), {
    name: name || '',
    phone: phone || '',
    email: email || '',
    location: location || '',
    interestedProduct: interestedProduct || '',
    interestedService: interestedService || '',
    projectType: projectType || '',
    message: message || '',
    source: 'website-contact-form',
    utmSource: params.get('utm_source') || '',
    utmMedium: params.get('utm_medium') || '',
    utmCampaign: params.get('utm_campaign') || '',
    utmTerm: params.get('utm_term') || '',
    utmContent: params.get('utm_content') || '',
    pageUrl: window.location.href,
    status: 'New',
    createdAt: serverTimestamp(),
  })
}
