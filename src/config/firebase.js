import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAnalytics, isSupported } from 'firebase/analytics'

// Every value comes from Vite env vars (see .env.example) — never hard-code
// Firebase config in source. Missing vars degrade gracefully instead of
// crashing the app, so the site still runs in local dev without a .env.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

const isConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId)

export const firebaseApp = isConfigured ? (getApps().length ? getApp() : initializeApp(firebaseConfig)) : null

// Firestore/Auth are intentionally not initialized here — Phase 1 has no
// CMS or public data reads. When those land, read them lazily per-page
// (never as a top-level app-wide listener) to stay inside the Spark plan's
// free quota: no onSnapshot on public routes, no per-render queries.

let analyticsPromise = null

// Lazily and safely initialize Analytics. `isSupported()` guards against
// SSR, unsupported browsers, and blocked storage — a rejected/unsupported
// check simply resolves to `null` rather than throwing.
export function getFirebaseAnalytics() {
  if (typeof window === 'undefined' || !firebaseApp || !firebaseConfig.measurementId) {
    return Promise.resolve(null)
  }
  if (!analyticsPromise) {
    analyticsPromise = isSupported()
      .then((supported) => (supported ? getAnalytics(firebaseApp) : null))
      .catch(() => null)
  }
  return analyticsPromise
}
