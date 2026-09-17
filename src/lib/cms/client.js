import { getFirestore } from 'firebase/firestore'
import { firebaseApp } from '../../config/firebase'

// Lazily-created Firestore instance for PUBLIC reads only — deliberately
// separate from src/admin/lib/firebaseAdmin.js (which also pulls in Auth)
// so a visitor's page only ever downloads 'firebase/firestore', never the
// admin's auth machinery. Returns null when Firebase isn't configured
// (see config/firebase.js) so callers can fail soft instead of throwing.
let dbInstance = null
export function getPublicDb() {
  if (!firebaseApp) return null
  if (!dbInstance) dbInstance = getFirestore(firebaseApp)
  return dbInstance
}
