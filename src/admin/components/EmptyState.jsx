export default function EmptyState({ message = 'Nothing here yet.' }) {
  return (
    <div className="rounded border border-dashed border-navy/15 bg-white px-6 py-16 text-center">
      <p className="font-body text-sm text-charcoal/60">{message}</p>
    </div>
  )
}
