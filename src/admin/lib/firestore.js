import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy,
} from 'firebase/firestore'
import { getAdminDb } from './firebaseAdmin'

// Thin, generic wrappers around one-time Firestore reads/writes — no
// onSnapshot anywhere, by design (Spark plan discipline: see README.md /
// the Phase 3 brief). The admin only fetches a collection when its page is
// actually opened, and only writes on an explicit user action; nothing
// here polls or re-fetches on a timer.

// A genuine misconfiguration (wrong project id, Firestore not yet enabled
// on the project, a real network outage) doesn't necessarily make the
// Firestore SDK *reject* quickly — its retry/backoff transport can leave a
// read pending far longer than a user should ever stare at a spinner.
// Every read below is raced against this timeout so a real problem
// surfaces as a readable error instead of an infinite "Loading…".
const READ_TIMEOUT_MS = 15000

function withTimeout(promise) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Couldn't reach the database. Check your connection and try again.")), READ_TIMEOUT_MS)
    ),
  ])
}

export async function listCollection(collectionName, { orderByField = 'updatedAt', direction = 'desc' } = {}) {
  const db = getAdminDb()
  const ref = collection(db, collectionName)
  try {
    const snap = await withTimeout(getDocs(query(ref, orderBy(orderByField, direction))))
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
  } catch (err) {
    if (err.message.includes("Couldn't reach the database")) throw err
    // orderBy fails if the field is missing on every doc (empty collection)
    // or absent from some docs — fall back to an unordered read rather
    // than surfacing a Firestore index/error screen to the admin.
    const snap = await withTimeout(getDocs(ref))
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
  }
}

export async function getRecord(collectionName, id) {
  const db = getAdminDb()
  const snap = await withTimeout(getDoc(doc(db, collectionName, id)))
  return snap.exists() ? { id: snap.id, ...snap.data() } : null
}

export async function createRecord(collectionName, data) {
  const db = getAdminDb()
  const ref = await addDoc(collection(db, collectionName), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return ref.id
}

export async function updateRecord(collectionName, id, data) {
  const db = getAdminDb()
  await updateDoc(doc(db, collectionName, id), { ...data, updatedAt: serverTimestamp() })
}

export async function deleteRecord(collectionName, id) {
  const db = getAdminDb()
  await deleteDoc(doc(db, collectionName, id))
}

// For singleton documents (e.g. siteSettings) addressed by a fixed id
// rather than a generated one. `setDoc(..., {merge:true})` so a partial
// save never wipes fields the form doesn't currently know about.
export async function getSingleton(collectionName, id) {
  const db = getAdminDb()
  const snap = await withTimeout(getDoc(doc(db, collectionName, id)))
  return snap.exists() ? { id: snap.id, ...snap.data() } : null
}

export async function saveSingleton(collectionName, id, data) {
  const db = getAdminDb()
  await setDoc(doc(db, collectionName, id), { ...data, updatedAt: serverTimestamp() }, { merge: true })
}
