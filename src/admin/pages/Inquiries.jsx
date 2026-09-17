import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { HiOutlineMagnifyingGlass, HiOutlineTrash } from 'react-icons/hi2'
import AdminLayout from '../components/AdminLayout'
import StatusBadge from '../components/StatusBadge'
import EmptyState from '../components/EmptyState'
import ConfirmDialog from '../components/ConfirmDialog'
import Button from '../components/Button'
import { listCollection, updateRecord, deleteRecord } from '../lib/firestore'

const STATUSES = ['New', 'Contacted', 'Qualified', 'Converted', 'Lost']

function formatDate(value) {
  const date = value?.toDate ? value.toDate() : value ? new Date(value) : null
  if (!date || Number.isNaN(date.getTime())) return '—'
  return date.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })
}

function DetailRow({ label, value }) {
  if (!value) return null
  return (
    <div className="py-1.5">
      <span className="block font-body text-xs font-semibold uppercase tracking-wide text-charcoal/50">{label}</span>
      <span className="font-body text-sm text-navy">{value}</span>
    </div>
  )
}

export default function Inquiries() {
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [selected, setSelected] = useState(null)
  const [pendingDelete, setPendingDelete] = useState(null)

  async function load() {
    setLoading(true)
    setLoadError('')
    try {
      const data = await listCollection('inquiries')
      setInquiries(data)
    } catch (err) {
      setLoadError(err.message || 'Could not load inquiries.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const filtered = useMemo(() => {
    return inquiries
      .filter((i) => statusFilter === 'All' || (i.status || 'New') === statusFilter)
      .filter((i) => {
        if (!search.trim()) return true
        const term = search.toLowerCase()
        return [i.name, i.email, i.phone, i.interestedProduct].some((v) => String(v || '').toLowerCase().includes(term))
      })
      .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0))
  }, [inquiries, search, statusFilter])

  async function handleStatusChange(inquiry, status) {
    setInquiries((prev) => prev.map((i) => (i.id === inquiry.id ? { ...i, status } : i)))
    setSelected((s) => (s?.id === inquiry.id ? { ...s, status } : s))
    try {
      await updateRecord('inquiries', inquiry.id, { status })
      toast.success('Status updated')
    } catch (err) {
      toast.error(err.message || 'Could not update status.')
      load()
    }
  }

  async function handleDelete() {
    try {
      await deleteRecord('inquiries', pendingDelete.id)
      setInquiries((prev) => prev.filter((i) => i.id !== pendingDelete.id))
      if (selected?.id === pendingDelete.id) setSelected(null)
      toast.success('Inquiry deleted')
    } catch (err) {
      toast.error(err.message || 'Could not delete this inquiry.')
    } finally {
      setPendingDelete(null)
    }
  }

  return (
    <AdminLayout title="Inquiries">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-64">
            <HiOutlineMagnifyingGlass
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/40"
              aria-hidden="true"
            />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, email, phone…"
              className="w-full min-h-[40px] rounded-sm border border-navy/20 bg-white py-2 pl-9 pr-3 font-body text-sm text-navy placeholder:text-charcoal/40 focus:border-gold focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-gold"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="min-h-[40px] rounded-sm border border-navy/20 bg-white px-3 font-body text-sm text-navy focus:border-gold focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-gold"
          >
            <option value="All">All Statuses</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <p className="font-body text-sm text-charcoal/60">Loading…</p>
      ) : loadError ? (
        <p className="rounded-sm bg-red-50 px-3 py-2 font-body text-sm text-red-700">{loadError}</p>
      ) : filtered.length === 0 ? (
        <EmptyState
          message={
            inquiries.length === 0
              ? 'No inquiries yet — new consultation requests from the website will appear here.'
              : 'No inquiries match your search/filter.'
          }
        />
      ) : (
        <div className="overflow-hidden rounded border border-navy/10 bg-white">
          <ul className="divide-y divide-navy/5">
            {filtered.map((inquiry) => (
              <li key={inquiry.id}>
                <button
                  type="button"
                  onClick={() => setSelected(inquiry)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left hover:bg-ivory-light/60"
                >
                  <div className="min-w-0">
                    <p className="truncate font-body text-sm font-semibold text-navy">{inquiry.name || 'Unnamed'}</p>
                    <p className="truncate font-body text-xs text-charcoal/60">
                      {inquiry.email || inquiry.phone || '—'} · {inquiry.interestedProduct || inquiry.interestedService || 'General'}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <span className="hidden font-body text-xs text-charcoal/50 sm:inline">{formatDate(inquiry.createdAt)}</span>
                    <StatusBadge value={inquiry.status || 'New'} />
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Detail panel */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/50 p-4">
          <div className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-lg bg-white p-6">
            <div className="mb-4 flex items-start justify-between gap-3">
              <h2 className="font-display text-lg text-navy">{selected.name || 'Unnamed'}</h2>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="font-body text-xs font-semibold uppercase tracking-wide text-charcoal/60 hover:text-navy"
              >
                Close
              </button>
            </div>

            <div className="mb-4">
              <label className="block font-body text-xs font-semibold uppercase tracking-wide text-charcoal/50">
                Status
              </label>
              <select
                value={selected.status || 'New'}
                onChange={(e) => handleStatusChange(selected, e.target.value)}
                className="mt-1.5 min-h-[40px] rounded-sm border border-navy/20 bg-white px-3 font-body text-sm text-navy focus:border-gold focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-gold"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="divide-y divide-navy/5 border-t border-navy/10">
              <DetailRow label="Phone" value={selected.phone} />
              <DetailRow label="Email" value={selected.email} />
              <DetailRow label="Location" value={selected.location} />
              <DetailRow label="Interested Product" value={selected.interestedProduct} />
              <DetailRow label="Interested Service" value={selected.interestedService} />
              <DetailRow label="Project Type" value={selected.projectType} />
              <DetailRow label="Message" value={selected.message} />
              <DetailRow label="Source" value={selected.source} />
              <DetailRow label="Page URL" value={selected.pageUrl} />
              <DetailRow label="UTM Source" value={selected.utmSource} />
              <DetailRow label="UTM Medium" value={selected.utmMedium} />
              <DetailRow label="UTM Campaign" value={selected.utmCampaign} />
              <DetailRow label="Submitted" value={formatDate(selected.createdAt)} />
            </div>

            <div className="mt-5 flex justify-end border-t border-navy/10 pt-4">
              <Button variant="danger" onClick={() => setPendingDelete(selected)}>
                <HiOutlineTrash size={16} aria-hidden="true" /> Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={!!pendingDelete}
        title="Delete this inquiry?"
        description="This can't be undone."
        onConfirm={handleDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </AdminLayout>
  )
}
