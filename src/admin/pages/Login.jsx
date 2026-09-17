import { useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../lib/AuthContext'
import Button from '../components/Button'

const fieldClass =
  'block w-full min-h-[44px] rounded-sm border border-navy/20 bg-white px-3 py-2.5 font-body text-sm text-navy placeholder:text-charcoal/40 focus:border-gold focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-gold'

export default function Login() {
  const { user, loading, configError, login } = useAuth()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (!loading && user) {
    return <Navigate to={location.state?.from || '/admin'} replace />
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await login(email, password)
    } catch {
      // Never surface raw Firebase error codes (e.g. auth/invalid-credential)
      // to the login screen — one generic message either way.
      setError('Incorrect email or password.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy px-4">
      <div className="w-full max-w-sm rounded-lg bg-white p-8 shadow-lifted">
        <h1 className="font-display text-2xl text-navy">Admin Sign In</h1>
        <p className="mt-1 font-body text-sm text-charcoal/60">Parquet & Decor Nepal</p>

        {configError ? (
          <p className="mt-6 rounded-sm bg-red-50 px-3 py-2 font-body text-sm text-red-700">
            Firebase is not configured. Set the VITE_FIREBASE_* environment variables (see .env.example).
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {error && <p className="rounded-sm bg-red-50 px-3 py-2 font-body text-sm text-red-700">{error}</p>}
            <div>
              <label htmlFor="email" className="block font-body text-xs font-semibold uppercase tracking-wide text-navy">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="username"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`mt-1.5 ${fieldClass}`}
              />
            </div>
            <div>
              <label htmlFor="password" className="block font-body text-xs font-semibold uppercase tracking-wide text-navy">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`mt-1.5 ${fieldClass}`}
              />
            </div>
            <Button type="submit" disabled={submitting} className="w-full">
              {submitting ? 'Signing in…' : 'Sign In'}
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}
