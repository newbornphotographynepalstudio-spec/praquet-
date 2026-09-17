import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../lib/AuthContext'

// Guards every /admin/* route except /admin/login. Firestore/Auth access
// is ALSO enforced server-side via firestore.rules — this is the UX layer
// (redirect + loading state), not the security boundary.
export default function ProtectedRoute({ children }) {
  const { user, loading, configError } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-navy">
        <p className="font-body text-sm text-ivory/60">Loading…</p>
      </div>
    )
  }

  if (configError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-navy px-6">
        <div className="max-w-md rounded border border-ivory/10 bg-white/5 p-8 text-center">
          <h1 className="font-display text-xl text-ivory">Firebase is not configured</h1>
          <p className="mt-3 font-body text-sm leading-relaxed text-ivory/60">
            Set the VITE_FIREBASE_* environment variables (see .env.example) and reload to access the admin panel.
          </p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />
  }

  return children
}
