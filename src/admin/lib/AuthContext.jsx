import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { getAdminAuth, isFirebaseConfigured, FirebaseNotConfiguredError } from './firebaseAdmin'

const AuthContext = createContext(null)

// Admin-only auth state (mounted once, inside the /admin route subtree —
// see App.jsx). `onAuthStateChanged` is a Firebase *Auth* listener, not a
// Firestore one: it doesn't read/write Firestore or count against the
// Spark plan's Firestore quota, and it never runs on public pages, so it
// doesn't conflict with the "no Firestore listeners" constraint for this
// project.
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [configError, setConfigError] = useState(false)

  useEffect(() => {
    if (!isFirebaseConfigured()) {
      setConfigError(true)
      setLoading(false)
      return
    }
    const unsubscribe = onAuthStateChanged(getAdminAuth(), (firebaseUser) => {
      setUser(firebaseUser)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  async function login(email, password) {
    if (!isFirebaseConfigured()) throw new FirebaseNotConfiguredError()
    const credential = await signInWithEmailAndPassword(getAdminAuth(), email, password)
    return credential.user
  }

  async function logout() {
    if (!isFirebaseConfigured()) return
    await signOut(getAdminAuth())
  }

  return (
    <AuthContext.Provider value={{ user, loading, configError, login, logout }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
