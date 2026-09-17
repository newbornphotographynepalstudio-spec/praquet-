import Button from './Button'

// Simple blocking confirm modal — used before any delete. No animation
// library needed for something this small and infrequent.
export default function ConfirmDialog({ open, title, description, confirmLabel = 'Delete', onConfirm, onCancel }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/50 p-4">
      <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lifted">
        <h2 className="font-display text-lg text-navy">{title}</h2>
        {description && <p className="mt-2 font-body text-sm text-charcoal">{description}</p>}
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}
