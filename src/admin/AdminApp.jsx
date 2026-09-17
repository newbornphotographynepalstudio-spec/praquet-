import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './lib/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Inquiries from './pages/Inquiries'
import Settings from './pages/Settings'
import CollectionManager from './pages/CollectionManager'

// URL segment (matches the Phase 3 brief's route list) -> actual Firestore
// collection name (see admin/config/collections.js). Most match; a couple
// intentionally don't (e.g. the public-facing "/admin/materials" route
// manages the `materialOptions` collection).
const collectionRoutes = [
  { path: 'products', key: 'products' },
  { path: 'materials', key: 'materialOptions' },
  { path: 'categories', key: 'categories' },
  { path: 'projects', key: 'projects' },
  { path: 'gallery', key: 'gallery' },
  { path: 'services', key: 'services' },
  { path: 'blog', key: 'blog' },
  { path: 'faqs', key: 'faqs' },
  { path: 'testimonials', key: 'testimonials' },
  { path: 'pages', key: 'pages' },
  { path: 'seo', key: 'seo' },
  { path: 'redirects', key: 'redirects' },
]

// Mounted at /admin/* (see App.jsx) as its own lazy chunk — Firebase Auth,
// Firestore, and every admin page/component live only here, so a visitor
// browsing the public site never downloads any of it. A single
// AuthProvider wraps this whole nested router (rather than each route
// individually) so the auth-state listener stays mounted across
// in-admin navigation instead of re-subscribing — and re-showing a loading
// flicker — on every click.
export default function AdminApp() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route
          path=""
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="inquiries"
          element={
            <ProtectedRoute>
              <Inquiries />
            </ProtectedRoute>
          }
        />
        <Route
          path="settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        {collectionRoutes.map(({ path, key }) => (
          <Route
            key={path}
            path={path}
            element={
              <ProtectedRoute>
                <CollectionManager collectionKey={key} />
              </ProtectedRoute>
            }
          />
        ))}
      </Routes>
    </AuthProvider>
  )
}
