import Icon from './Icon'

function badgeTone(value) {
  const v = String(value).toLowerCase()
  if (['true', 'active', 'available', 'completed', 'excellent', 'good', 'improving'].some((s) => v.includes(s))) return 'tone-good'
  if (['false', 'expired', 'cancelled', 'unavailable', 'declining', 'needs_attention'].some((s) => v.includes(s))) return 'tone-bad'
  return 'tone-neutral'
}

export default function DataTable({ columns, rows, onEdit, onDelete, emptyLabel }) {
  if (!rows.length) {
    return (
      <div className="empty-state">
        <Icon name="search" size={28} />
        <p>{emptyLabel}</p>
      </div>
    )
  }

  return (
    <div className="table-scroll">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key}>{c.label}</th>
            ))}
            <th className="col-actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {columns.map((c) => {
                const value = row[c.key]
                if (c.type === 'badge') {
                  const display = typeof value === 'boolean' ? (value ? 'Active' : 'Inactive') : value ?? '—'
                  return (
                    <td key={c.key}>
                      <span className={`badge ${badgeTone(display)}`}>{String(display).replaceAll('_', ' ')}</span>
                    </td>
                  )
                }
                return <td key={c.key}>{value ?? '—'}</td>
              })}
              <td className="col-actions">
                <button type="button" className="icon-btn" onClick={() => onEdit(row)} aria-label="Edit">
                  <Icon name="edit" size={16} />
                </button>
                <button type="button" className="icon-btn icon-btn-danger" onClick={() => onDelete(row)} aria-label="Delete">
                  <Icon name="trash" size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
