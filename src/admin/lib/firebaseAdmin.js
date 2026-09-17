import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { firebaseApp } from '../../config/firebase'

// Auth + Firestore are only ever imported from here, and this module is
// only ever imported by admin-route components (each already its own
// React.lazy chunk — see App.jsx) — so these SDKs never ship to a visitor
// browsing the public site. Public pages that need Firestore (currently
// only the contact form, for lead capture) import 'firebase/firestore'
// directly rather than through this file, for the same reason: keeping the
// admin auth/session machinery out of their chunk.
//
// `firebaseApp` is `null` when VITE_FIREBASE_* env vars aren't set (see
// config/firebase.js) — every getter below surfaces that as a clear error
// instead of throwing deep inside the Firebase SDK.
export class FirebaseNotConfiguredError extends Error {
  constructor() {
    super('Firebase is not configured. Set the VITE_FIREBASE_* environment variables (see .env.example).')
    this.name = 'FirebaseNotConfiguredError'
  }
}

let authInstance = null
let dbInstance = null

export function getAdminAuth() {
  if (!firebaseApp) throw new FirebaseNotConfiguredError()
  if (!authInstance) authInstance = getAuth(firebaseApp)
  return authInstance
}

export function getAdminDb() {
  if (!firebaseApp) throw new FirebaseNotConfiguredError()
  if (!dbInstance) dbInstance = getFirestore(firebaseApp)
  return dbInstance
}

export function isFirebaseConfigured() {
  return Boolean(firebaseApp)
}
