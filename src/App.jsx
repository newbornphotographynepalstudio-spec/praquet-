import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast'
import { LazyMotion, domAnimation } from 'framer-motion'
import ScrollRestoration from './components/navigation/ScrollRestoration'

// Route-level code splitting: every page ships in its own chunk, loaded on
// navigation rather than bloating the initial bundle every visitor
// downloads. Reusable templates (MaterialDetailPage, ServiceDetailPage,
// LocationPage) each serve several real URLs — see the comments where
// they're mounted below.
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const ProductsLanding = lazy(() => import('./pages/products/ProductsLanding'))
const MaterialFamilyLanding = lazy(() => import('./pages/materials/MaterialFamilyLanding'))
const MaterialDetailPage = lazy(() => import('./pages/materials/MaterialDetailPage'))
const ServicesLanding = lazy(() => import('./pages/services/ServicesLanding'))
const ServiceDetailPage = lazy(() => import('./pages/services/ServiceDetailPage'))
const Projects = lazy(() => import('./pages/Projects'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const Gallery = lazy(() => import('./pages/Gallery'))
const LocationPage = lazy(() => import('./pages/locations/LocationPage'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogDetail = lazy(() => import('./pages/BlogDetail'))
const Faq = lazy(() => import('./pages/Faq'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

export default function App() {
  useEffect(() => {
    // Dynamically imported so the Firebase SDK ships in its own chunk and
    // never blocks or bloats the initial page load. No-ops safely if
    // VITE_FIREBASE_* env vars aren't configured (see config/firebase.js).
    import('./config/firebase').then(({ getFirebaseAnalytics }) => {
      getFirebaseAnalytics()
    })
  }, [])

  return (
    <HelmetProvider>
      <LazyMotion features={domAnimation} strict>
        <BrowserRouter>
          <ScrollRestoration />
          <Suspense fallback={<div className="min-h-screen bg-ivory-light" />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />

              <Route path="/products" element={<ProductsLanding />} />
              {/* Same template as the family routes below — see the comment
                  in MaterialDetailPage.jsx on why /products/:slug resolves
                  the same real material content rather than separate data. */}
              <Route path="/products/:slug" element={<MaterialDetailPage />} />

              <Route path="/flooring" element={<MaterialFamilyLanding family="flooring" />} />
              <Route path="/flooring/:slug" element={<MaterialDetailPage />} />
              <Route path="/wall-panels" element={<MaterialFamilyLanding family="wall-panels" />} />
              <Route path="/wall-panels/:slug" element={<MaterialDetailPage />} />

              <Route path="/services" element={<ServicesLanding />} />
              <Route path="/services/:slug" element={<ServiceDetailPage />} />

              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:projectSlug" element={<ProjectDetail />} />
              <Route path="/gallery" element={<Gallery />} />

              <Route path="/locations/:locationSlug" element={<LocationPage />} />

              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:blogSlug" element={<BlogDetail />} />

              <Route path="/faq" element={<Faq />} />
              <Route path="/contact" element={<Contact />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </LazyMotion>
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: '#081F32',
            color: '#F4F0E8',
            fontFamily: 'Manrope, system-ui, sans-serif',
            fontSize: '14px',
            borderRadius: '4px',
          },
        }}
      />
    </HelmetProvider>
  )
}
