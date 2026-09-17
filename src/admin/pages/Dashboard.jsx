import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { HiOutlinePlus, HiOutlineInboxStack } from 'react-icons/hi2'
import AdminLayout from '../components/AdminLayout'
import StatusBadge from '../components/StatusBadge'
import EmptyState from '../components/EmptyState'
import { listCollection } from '../lib/firestore'

const STATUSES = ['New', 'Contacted', 'Qualified', 'Converted', 'Lost']

function formatDate(value) {
  const date = value?.toDate ? value.toDate() : value ? new Date(value) : null
  if (!date || Number.isNaN(date.getTime())) return '—'
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function Dashboard() {
  const [inquiries, setInquiries] = useState(null)
  const [loadError, setLoadError] = useState('')

  useEffect(() => {
    listCollection('inquiries')
      .then(setInquiries)
      .catch((err) => setLoadError(err.message || 'Could not load inquiries.'))
  }, [])

  const total = inquiries?.length ?? 0
  const newCount = inquiries?.filter((i) => (i.status || 'New') === 'New').length ?? 0
  const recent = (inquiries || [])
    .slice()
    .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0))
    .slice(0, 5)

  const breakdown = STATUSES.map((status) => ({
    status,
    count: inquiries?.filter((i) => (i.status || 'New') === status).length ?? 0,
  }))

  return (
    <AdminLayout title="Dashboard">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="rounded border border-navy/10 bg-white p-5">
          <p className="font-body text-xs font-semibold uppercase tracking-wide text-charcoal/60">New Inquiries</p>
          <p className="mt-2 font-display text-3xl text-navy">{inquiries === null && !loadError ? '—' : newCount}</p>
        </div>
        <div className="rounded border border-navy/10 bg-white p-5">
          <p className="font-body text-xs font-semibold uppercase tracking-wide text-charcoal/60">Total Inquiries</p>
          <p className="mt-2 font-display text-3xl text-navy">{inquiries === null && !loadError ? '—' : total}</p>
        </div>
        {breakdown.slice(0, 2).map(({ status, count }) => (
          <div key={status} className="rounded border border-navy/10 bg-white p-5">
            <p className="font-body text-xs font-semibold uppercase tracking-wide text-charcoal/60">{status}</p>
            <p className="mt-2 font-display text-3xl text-navy">{inquiries === null && !loadError ? '—' : count}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="rounded border border-navy/10 bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg text-navy">Recent Inquiries</h2>
            <Link to="/admin/inquiries" className="font-body text-xs font-semibold uppercase tracking-wide text-gold hover:text-gold-soft">
              View All
            </Link>
          </div>
          {loadError ? (
            <p className="rounded-sm bg-red-50 px-3 py-2 font-body text-sm text-red-700">{loadError}</p>
          ) : inquiries === null ? (
            <p className="font-body text-sm text-charcoal/60">Loading…</p>
          ) : recent.length === 0 ? (
            <EmptyState message="No inquiries yet — new consultation requests from the website will appear here." />
          ) : (
            <ul className="divide-y divide-navy/5">
              {recent.map((inquiry) => (
                <li key={inquiry.id} className="flex items-center justify-between gap-3 py-3">
                  <div className="min-w-0">
                    <p className="truncate font-body text-sm font-semibold text-navy">{inquiry.name || 'Unnamed'}</p>
                    <p className="truncate font-body text-xs text-charcoal/60">
                      {inquiry.interestedProduct || inquiry.message?.slice(0, 60) || '—'}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <span className="font-body text-xs text-charcoal/50">{formatDate(inquiry.createdAt)}</span>
                    <StatusBadge value={inquiry.status || 'New'} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded border border-navy/10 bg-white p-5">
          <h2 className="mb-4 font-display text-lg text-navy">Quick Links</h2>
          <div className="space-y-2">
            <Link
              to="/admin/products"
              className="flex min-h-[40px] items-center gap-2 rounded border border-navy/15 px-3 font-body text-sm text-navy hover:bg-ivory-light"
            >
              <HiOutlinePlus size={16} aria-hidden="true" /> Add Product
            </Link>
            <Link
              to="/admin/projects"
              className="flex min-h-[40px] items-center gap-2 rounded border border-navy/15 px-3 font-body text-sm text-navy hover:bg-ivory-light"
            >
              <HiOutlinePlus size={16} aria-hidden="true" /> Add Project
            </Link>
            <Link
              to="/admin/blog"
              className="flex min-h-[40px] items-center gap-2 rounded border border-navy/15 px-3 font-body text-sm text-navy hover:bg-ivory-light"
            >
              <HiOutlinePlus size={16} aria-hidden="true" /> Add Blog Post
            </Link>
            <Link
              to="/admin/inquiries"
              className="flex min-h-[40px] items-center gap-2 rounded border border-navy/15 px-3 font-body text-sm text-navy hover:bg-ivory-light"
            >
              <HiOutlineInboxStack size={16} aria-hidden="true" /> View Inquiries
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
