import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import AdminLayout from '../components/AdminLayout'
import Button from '../components/Button'
import ConfirmDialog from '../components/ConfirmDialog'
import { getSingleton, saveSingleton } from '../lib/firestore'

const SETTINGS_ID = 'main'

const FIELDS = [
  { name: 'businessName', label: 'Business Name' },
  { name: 'phone', label: 'Phone', critical: true },
  { name: 'whatsapp', label: 'WhatsApp', critical: true },
  { name: 'email', label: 'Email', critical: true },
  { name: 'facebook', label: 'Facebook URL' },
  { name: 'instagram', label: 'Instagram URL' },
  { name: 'website', label: 'Website URL' },
  { name: 'footerCredit', label: 'Footer Credit' },
  { name: 'defaultSeoTitle', label: 'Default SEO Title' },
  { name: 'defaultSeoDescription', label: 'Default SEO Description', textarea: true },
]

const fieldClass =
  'block w-full min-h-[40px] rounded-sm border border-navy/20 bg-white px-3 py-2 font-body text-sm text-navy placeholder:text-charcoal/40 focus:border-gold focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-gold'

// Editable site-wide settings intended for future public consumption (see
// the Phase 3 brief: "Manage global settings such as..."). The live public
// site still reads its contact/social/developer info from
// src/data/contact.js and src/data/social.js — those are the verified,
// approved values (see the brand content rule in README.md) and are left
// untouched by this phase; this admin panel is the CMS side of the same
// data model, not yet wired to replace those static files.
export default function Settings() {
  const [values, setValues] = useState(null)
  const [original, setOriginal] = useState(null)
  const [loadError, setLoadError] = useState('')
  const [saving, setSaving] = useState(false)
  const [confirmClear, setConfirmClear] = useState(null)

  useEffect(() => {
    getSingleton('siteSettings', SETTINGS_ID)
      .then((doc) => {
        setValues(doc || {})
        setOriginal(doc || {})
      })
      .catch((err) => setLoadError(err.message || 'Could not load settings.'))
  }, [])

  function setField(name, value) {
    setValues((v) => ({ ...v, [name]: value }))
  }

  async function doSave(payload) {
    setSaving(true)
    try {
      await saveSingleton('siteSettings', SETTINGS_ID, payload)
      toast.success('Settings saved')
    } catch (err) {
      toast.error(err.message || 'Could not save settings.')
    } finally {
      setSaving(false)
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    const clearedCritical = FIELDS.filter(
      (f) => f.critical && String(original[f.name] || '').trim() && !String(values[f.name] || '').trim()
    )
    if (clearedCritical.length > 0) {
      setConfirmClear(clearedCritical.map((f) => f.label).join(', '))
      return
    }
    doSave(values)
  }

  if (loadError) {
    return (
      <AdminLayout title="Settings">
        <p className="rounded-sm bg-red-50 px-3 py-2 font-body text-sm text-red-700">{loadError}</p>
      </AdminLayout>
    )
  }

  if (!values) {
    return (
      <AdminLayout title="Settings">
        <p className="font-body text-sm text-charcoal/60">Loading…</p>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title="Settings">
      <form onSubmit={handleSubmit} className="max-w-xl space-y-5 rounded border border-navy/10 bg-white p-6">
        {FIELDS.map((field) => (
          <div key={field.name}>
            <label className="block font-body text-xs font-semibold uppercase tracking-wide text-navy">{field.label}</label>
            {field.textarea ? (
              <textarea
                rows={3}
                value={values[field.name] || ''}
                onChange={(e) => setField(field.name, e.target.value)}
                className={`mt-1.5 resize-y ${fieldClass}`}
              />
            ) : (
              <input
                type="text"
                value={values[field.name] || ''}
                onChange={(e) => setField(field.name, e.target.value)}
                className={`mt-1.5 ${fieldClass}`}
              />
            )}
          </div>
        ))}
        <div className="border-t border-navy/10 pt-5">
          <Button type="submit" disabled={saving}>
            {saving ? 'Saving…' : 'Save Settings'}
          </Button>
        </div>
      </form>

      <ConfirmDialog
        open={!!confirmClear}
        title="Clear critical contact info?"
        description={`You're about to save with these fields empty: ${confirmClear}. Customers use these to reach the business — continue?`}
        confirmLabel="Save Anyway"
        onConfirm={() => {
          setConfirmClear(null)
          doSave(values)
        }}
        onCancel={() => setConfirmClear(null)}
      />
    </AdminLayout>
  )
}
