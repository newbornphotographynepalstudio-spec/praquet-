import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import {
  HiOutlineSquares2X2,
  HiOutlineCube,
  HiOutlineSwatch,
  HiOutlineTag,
  HiOutlineBuildingOffice2,
  HiOutlinePhoto,
  HiOutlineWrenchScrewdriver,
  HiOutlineNewspaper,
  HiOutlineQuestionMarkCircle,
  HiOutlineChatBubbleLeftEllipsis,
  HiOutlineDocumentText,
  HiOutlineMagnifyingGlass,
  HiOutlineArrowsRightLeft,
  HiOutlineInboxStack,
  HiOutlineCog6Tooth,
  HiOutlineBars3,
  HiOutlineXMark,
  HiOutlineArrowRightOnRectangle,
} from 'react-icons/hi2'
import { useAuth } from '../lib/AuthContext'
import { cn } from '../../utils/cn'

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: HiOutlineSquares2X2, end: true },
  { to: '/admin/inquiries', label: 'Inquiries', icon: HiOutlineInboxStack },
  { to: '/admin/products', label: 'Products', icon: HiOutlineCube },
  { to: '/admin/materials', label: 'Material Options', icon: HiOutlineSwatch },
  { to: '/admin/categories', label: 'Categories', icon: HiOutlineTag },
  { to: '/admin/projects', label: 'Projects', icon: HiOutlineBuildingOffice2 },
  { to: '/admin/gallery', label: 'Gallery', icon: HiOutlinePhoto },
  { to: '/admin/services', label: 'Services', icon: HiOutlineWrenchScrewdriver },
  { to: '/admin/blog', label: 'Blog', icon: HiOutlineNewspaper },
  { to: '/admin/faqs', label: 'FAQs', icon: HiOutlineQuestionMarkCircle },
  { to: '/admin/testimonials', label: 'Testimonials', icon: HiOutlineChatBubbleLeftEllipsis },
  { to: '/admin/pages', label: 'Pages', icon: HiOutlineDocumentText },
  { to: '/admin/seo', label: 'SEO', icon: HiOutlineMagnifyingGlass },
  { to: '/admin/redirects', label: 'Redirects', icon: HiOutlineArrowsRightLeft },
  { to: '/admin/settings', label: 'Settings', icon: HiOutlineCog6Tooth },
]

function SidebarLinks({ onNavigate }) {
  return (
    <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
      {navItems.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          onClick={onNavigate}
          className={({ isActive }) =>
            cn(
              'flex min-h-[40px] items-center gap-3 rounded px-3 py-2 font-body text-sm font-medium transition-colors',
              isActive ? 'bg-gold/15 text-gold-soft' : 'text-ivory/70 hover:bg-white/5 hover:text-ivory'
            )
          }
        >
          <Icon size={18} className="shrink-0" aria-hidden="true" />
          {label}
        </NavLink>
      ))}
    </nav>
  )
}

export default function AdminLayout({ title, children }) {
  const { user, logout } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-ivory-light">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col bg-navy lg:flex">
        <Link to="/admin" className="flex h-16 shrink-0 items-center gap-2 border-b border-white/10 px-5">
          <span className="font-display text-lg text-ivory">Parquet & Decor</span>
        </Link>
        <SidebarLinks />
        <div className="border-t border-white/10 p-3">
          <p className="truncate px-3 font-body text-xs text-ivory/50">{user?.email}</p>
          <button
            type="button"
            onClick={logout}
            className="mt-1 flex min-h-[40px] w-full items-center gap-3 rounded px-3 py-2 font-body text-sm font-medium text-ivory/70 transition-colors hover:bg-white/5 hover:text-ivory"
          >
            <HiOutlineArrowRightOnRectangle size={18} aria-hidden="true" />
            Log Out
          </button>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-navy/60"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative flex h-full w-72 max-w-[80vw] flex-col bg-navy">
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 px-5">
              <span className="font-display text-lg text-ivory">Parquet & Decor</span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded text-ivory/70"
              >
                <HiOutlineXMark size={22} aria-hidden="true" />
              </button>
            </div>
            <SidebarLinks onNavigate={() => setMobileOpen(false)} />
            <div className="border-t border-white/10 p-3">
              <p className="truncate px-3 font-body text-xs text-ivory/50">{user?.email}</p>
              <button
                type="button"
                onClick={logout}
                className="mt-1 flex min-h-[44px] w-full items-center gap-3 rounded px-3 py-2 font-body text-sm font-medium text-ivory/70 hover:bg-white/5 hover:text-ivory"
              >
                <HiOutlineArrowRightOnRectangle size={18} aria-hidden="true" />
                Log Out
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main column */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-navy/10 bg-white px-4 sm:px-6">
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded text-navy lg:hidden"
          >
            <HiOutlineBars3 size={22} aria-hidden="true" />
          </button>
          <h1 className="font-display text-xl text-navy">{title}</h1>
        </header>
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
