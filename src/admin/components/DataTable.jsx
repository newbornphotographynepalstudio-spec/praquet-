import { HiOutlinePencilSquare, HiOutlineTrash, HiChevronUp, HiChevronDown } from 'react-icons/hi2'
import StatusBadge from './StatusBadge'
import EmptyState from './EmptyState'

const STATUS_LIKE = new Set(['status', 'active', 'featured', 'noindex'])

// One generic, responsive table for every CMS list — desktop renders real
// table rows; below `md` the same records render as stacked cards instead
// of a horizontally-scrolling table, which is unreadable at phone widths.
// `onTogglePublish` (optional) makes the status pill itself a quick
// publish/unpublish toggle — no need to open the full edit form just to
// flip a record live. `onReorder` (optional, paired with `reorderable` on
// the collection config) adds small up/down controls instead of a full
// drag-and-drop system, which would be a much bigger UI investment for a
// handful of items per category.
export default function DataTable({ columns, columnLabels, rows, onEdit, onDelete, onTogglePublish, onReorder, emptyLabel }) {
  if (rows.length === 0) {
    return <EmptyState message={emptyLabel} />
  }

  function renderValue(col, row) {
    const value = row[col]
    if (col === 'status' && onTogglePublish) {
      return (
        <button
          type="button"
          onClick={() => onTogglePublish(row)}
          title={value === 'published' ? 'Click to unpublish' : 'Click to publish'}
          className="cursor-pointer rounded-sm transition-opacity hover:opacity-70"
        >
          <StatusBadge value={value || 'draft'} />
        </button>
      )
    }
    if (STATUS_LIKE.has(col)) return <StatusBadge value={value} />
    if (Array.isArray(value)) return value.join(', ') || '—'
    return value ?? '—'
  }

  return (
    <>
      {/* Desktop table */}
      <div className="hidden overflow-x-auto rounded border border-navy/10 bg-white md:block">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-navy/10 bg-ivory-light">
              {columns.map((col) => (
                <th key={col} className="px-4 py-3 font-body text-xs font-semibold uppercase tracking-wide text-charcoal">
                  {columnLabels[col] || col}
                </th>
              ))}
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.id} className="border-b border-navy/5 last:border-0 hover:bg-ivory-light/60">
                {columns.map((col) => (
                  <td key={col} className="px-4 py-3 font-body text-sm text-navy">
                    {renderValue(col, row)}
                  </td>
                ))}
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1">
                    {onReorder && (
                      <>
                        <button
                          type="button"
                          aria-label="Move up"
                          disabled={index === 0}
                          onClick={() => onReorder(row, index, -1)}
                          className="flex h-8 w-8 items-center justify-center rounded text-navy hover:bg-navy/5 disabled:cursor-not-allowed disabled:opacity-30"
                        >
                          <HiChevronUp size={16} aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          aria-label="Move down"
                          disabled={index === rows.length - 1}
                          onClick={() => onReorder(row, index, 1)}
                          className="flex h-8 w-8 items-center justify-center rounded text-navy hover:bg-navy/5 disabled:cursor-not-allowed disabled:opacity-30"
                        >
                          <HiChevronDown size={16} aria-hidden="true" />
                        </button>
                      </>
                    )}
                    <button
                      type="button"
                      aria-label="Edit"
                      onClick={() => onEdit(row)}
                      className="flex h-8 w-8 items-center justify-center rounded text-navy hover:bg-navy/5"
                    >
                      <HiOutlinePencilSquare size={16} aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      aria-label="Delete"
                      onClick={() => onDelete(row)}
                      className="flex h-8 w-8 items-center justify-center rounded text-red-600 hover:bg-red-50"
                    >
                      <HiOutlineTrash size={16} aria-hidden="true" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {rows.map((row, index) => (
          <div key={row.id} className="rounded border border-navy/10 bg-white p-4">
            {columns.map((col) => (
              <div key={col} className="flex items-baseline justify-between gap-3 py-1 first:pt-0 last:pb-0">
                <span className="font-body text-xs font-semibold uppercase tracking-wide text-charcoal/60">
                  {columnLabels[col] || col}
                </span>
                <span className="text-right font-body text-sm text-navy">{renderValue(col, row)}</span>
              </div>
            ))}
            <div className="mt-3 flex gap-2 border-t border-navy/10 pt-3">
              {onReorder && (
                <>
                  <button
                    type="button"
                    aria-label="Move up"
                    disabled={index === 0}
                    onClick={() => onReorder(row, index, -1)}
                    className="flex min-h-[36px] items-center justify-center rounded border border-navy/20 px-3 text-navy disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <HiChevronUp size={16} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    aria-label="Move down"
                    disabled={index === rows.length - 1}
                    onClick={() => onReorder(row, index, 1)}
                    className="flex min-h-[36px] items-center justify-center rounded border border-navy/20 px-3 text-navy disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <HiChevronDown size={16} aria-hidden="true" />
                  </button>
                </>
              )}
              <button
                type="button"
                onClick={() => onEdit(row)}
                className="flex min-h-[36px] flex-1 items-center justify-center gap-1.5 rounded border border-navy/20 font-body text-xs font-semibold uppercase tracking-wide text-navy"
              >
                <HiOutlinePencilSquare size={14} aria-hidden="true" /> Edit
              </button>
              <button
                type="button"
                onClick={() => onDelete(row)}
                className="flex min-h-[36px] flex-1 items-center justify-center gap-1.5 rounded border border-red-200 font-body text-xs font-semibold uppercase tracking-wide text-red-700"
              >
                <HiOutlineTrash size={14} aria-hidden="true" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
