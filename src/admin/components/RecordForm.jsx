import { useState } from 'react'
import Button from './Button'
import ImageField from './ImageField'

const fieldClass =
  'block w-full min-h-[40px] rounded-sm border border-navy/20 bg-white px-3 py-2 font-body text-sm text-navy placeholder:text-charcoal/40 focus:border-gold focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-gold'
const labelClass = 'block font-body text-xs font-semibold uppercase tracking-wide text-navy'

function initialValues(fields, record) {
  const values = {}
  for (const field of fields) {
    if (record && field.name in record) {
      values[field.name] = field.type === 'tags' ? (record[field.name] || []).join(', ') : record[field.name]
    } else {
      values[field.name] = field.default ?? (field.type === 'boolean' ? false : '')
    }
  }
  return values
}

// Renders one field per the collection's schema (see admin/config/
// collections.js) — a single form component serves every CMS collection
// instead of one hand-built form per collection.
export default function RecordForm({ fields, record, onSubmit, onCancel, submitLabel = 'Save' }) {
  const [values, setValues] = useState(() => initialValues(fields, record))
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  function setField(name, value) {
    setValues((v) => ({ ...v, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    for (const field of fields) {
      if (field.required && !String(values[field.name] ?? '').trim()) {
        setError(`"${field.label}" is required.`)
        return
      }
    }
    setSaving(true)
    try {
      const payload = { ...values }
      for (const field of fields) {
        if (field.type === 'tags') {
          payload[field.name] = String(values[field.name] || '')
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean)
        } else if (field.type === 'number') {
          payload[field.name] = values[field.name] === '' ? null : Number(values[field.name])
        }
      }
      await onSubmit(payload)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && <p className="rounded-sm bg-red-50 px-3 py-2 font-body text-sm text-red-700">{error}</p>}

      {fields.map((field) => (
        <div key={field.name}>
          {field.type === 'image' ? (
            <ImageField
              label={field.label}
              hint={field.hint}
              value={values[field.name]}
              onChange={(v) => setField(field.name, v)}
            />
          ) : field.type === 'boolean' ? (
            <label className="flex items-center gap-2 font-body text-sm text-navy">
              <input
                type="checkbox"
                checked={!!values[field.name]}
                onChange={(e) => setField(field.name, e.target.checked)}
                className="h-4 w-4 rounded border-navy/30 text-gold focus:ring-gold"
              />
              {field.label}
            </label>
          ) : field.type === 'select' ? (
            <>
              <label className={labelClass}>{field.label}</label>
              <select
                className={`mt-1.5 ${fieldClass}`}
                value={values[field.name]}
                onChange={(e) => setField(field.name, e.target.value)}
              >
                {field.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </>
          ) : field.type === 'textarea' || field.type === 'richtext' ? (
            <>
              <label className={labelClass}>{field.label}</label>
              {field.hint && <p className="mt-1 font-body text-xs text-charcoal/60">{field.hint}</p>}
              <textarea
                rows={field.type === 'richtext' ? 10 : 4}
                className={`mt-1.5 resize-y ${fieldClass}`}
                value={values[field.name]}
                onChange={(e) => setField(field.name, e.target.value)}
              />
            </>
          ) : (
            <>
              <label className={labelClass}>{field.label}</label>
              {field.hint && <p className="mt-1 font-body text-xs text-charcoal/60">{field.hint}</p>}
              <input
                type={field.type === 'date' ? 'date' : field.type === 'number' ? 'number' : 'text'}
                className={`mt-1.5 ${fieldClass}`}
                value={values[field.name]}
                onChange={(e) => setField(field.name, e.target.value)}
              />
            </>
          )}
        </div>
      ))}

      <div className="flex gap-3 border-t border-navy/10 pt-5">
        <Button type="submit" disabled={saving}>
          {saving ? 'Saving…' : submitLabel}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel} disabled={saving}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
