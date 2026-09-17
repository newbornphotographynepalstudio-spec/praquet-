import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { HiOutlinePlus, HiOutlineMagnifyingGlass } from 'react-icons/hi2'
import AdminLayout from '../components/AdminLayout'
import DataTable from '../components/DataTable'
import RecordForm from '../components/RecordForm'
import Button from '../components/Button'
import ConfirmDialog from '../components/ConfirmDialog'
import EmptyState from '../components/EmptyState'
import { getCollectionConfig } from '../config/collections'
import { listCollection, createRecord, updateRecord, deleteRecord } from '../lib/firestore'

// One page instance handles every CMS collection (see App.jsx routes) —
// `collectionKey` (the actual Firestore collection name) is passed
// explicitly per route rather than read from the URL, since a route's
// URL segment doesn't always match the collection name (e.g. the
// /admin/materials route manages the `materialOptions` collection). The
// schema comes from admin/config/collections.js. Fetches once when the
// section is opened (no polling, no onSnapshot) and refetches only after
// a write.
export default function CollectionManager({ collectionKey }) {
  const config = getCollectionConfig(collectionKey)

  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [search, setSearch] = useState('')
  const [editing, setEditing] = useState(null) // null = list view, {} = new, record = edit
  const [pendingDelete, setPendingDelete] = useState(null)

  async function load() {
    setLoading(true)
    setLoadError('')
    try {
      const data = await listCollection(collectionKey)
      setRows(data)
    } catch (err) {
      setLoadError(err.message || 'Could not load this collection.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setEditing(null)
    setSearch('')
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionKey])

  const searchField = config?.listColumns?.[0]
  const filteredRows = useMemo(() => {
    if (!search.trim()) return rows
    const term = search.toLowerCase()
    return rows.filter((r) => String(r[searchField] ?? '').toLowerCase().includes(term))
  }, [rows, search, searchField])

  const columnLabels = useMemo(() => {
    const map = {}
    for (const field of config?.fields || []) map[field.name] = field.label
    return map
  }, [config])

  if (!config) {
    return (
      <AdminLayout title="Not Found">
        <EmptyState message={`Unknown collection "${collectionKey}".`} />
      </AdminLayout>
    )
  }

  async function handleSave(payload) {
    if (editing?.id) {
      await updateRecord(collectionKey, editing.id, payload)
      toast.success(`${config.singular} updated`)
    } else {
      await createRecord(collectionKey, payload)
      toast.success(`${config.singular} created`)
    }
    setEditing(null)
    await load()
  }

  async function handleDelete() {
    try {
      await deleteRecord(collectionKey, pendingDelete.id)
      toast.success(`${config.singular} deleted`)
      setRows((r) => r.filter((row) => row.id !== pendingDelete.id))
    } catch (err) {
      toast.error(err.message || 'Could not delete this record.')
    } finally {
      setPendingDelete(null)
    }
  }

  return (
    <AdminLayout title={config.label}>
      {editing ? (
        <div className="max-w-2xl rounded border border-navy/10 bg-white p-6">
          <h2 className="mb-5 font-display text-lg text-navy">
            {editing.id ? `Edit ${config.singular}` : `Add ${config.singular}`}
          </h2>
          <RecordForm
            fields={config.fields}
            record={editing.id ? editing : null}
            onSubmit={handleSave}
            onCancel={() => setEditing(null)}
          />
        </div>
      ) : (
        <>
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-xs">
              <HiOutlineMagnifyingGlass
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/40"
                aria-hidden="true"
              />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={`Search ${config.label.toLowerCase()}…`}
                className="w-full min-h-[40px] rounded-sm border border-navy/20 bg-white py-2 pl-9 pr-3 font-body text-sm text-navy placeholder:text-charcoal/40 focus:border-gold focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-gold"
              />
            </div>
            <Button onClick={() => setEditing({})}>
              <HiOutlinePlus size={16} aria-hidden="true" />
              Add {config.singular}
            </Button>
          </div>

          {loading ? (
            <p className="font-body text-sm text-charcoal/60">Loading…</p>
          ) : loadError ? (
            <p className="rounded-sm bg-red-50 px-3 py-2 font-body text-sm text-red-700">{loadError}</p>
          ) : (
            <DataTable
              columns={config.listColumns}
              columnLabels={columnLabels}
              rows={filteredRows}
              onEdit={setEditing}
              onDelete={setPendingDelete}
              emptyLabel={
                rows.length === 0
                  ? `No ${config.label.toLowerCase()} yet — click "Add ${config.singular}" to create the first one.`
                  : 'No records match your search.'
              }
            />
          )}
        </>
      )}

      <ConfirmDialog
        open={!!pendingDelete}
        title={`Delete this ${config.singular.toLowerCase()}?`}
        description="This can't be undone."
        onConfirm={handleDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </AdminLayout>
  )
}
