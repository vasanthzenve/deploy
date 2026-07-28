import { useState } from 'react'

function buildInitial(fields, record) {
  const initial = {}
  fields.forEach((f) => {
    if (record && record[f.name] !== undefined && record[f.name] !== null) {
      initial[f.name] = record[f.name]
    } else if (f.default) {
      initial[f.name] = f.default()
    } else {
      initial[f.name] = ''
    }
  })
  return initial
}

export default function EntityForm({ fields, record, onSubmit, onCancel, submitLabel }) {
  const [values, setValues] = useState(() => buildInitial(fields, record))
  const [errors, setErrors] = useState([])
  const [saving, setSaving] = useState(false)

  const handleChange = (name, value) => {
    setValues((v) => ({ ...v, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setErrors([])
    try {
      const payload = { ...values }
      fields.forEach((f) => {
        if (f.type === 'number' && payload[f.name] !== '') {
          payload[f.name] = Number(payload[f.name])
        }
      })
      await onSubmit(payload)
    } catch (err) {
      setErrors(err.details && err.details.length ? err.details : [err.message])
    } finally {
      setSaving(false)
    }
  }

  return (
    <form className="entity-form" onSubmit={handleSubmit}>
      {errors.length > 0 && (
        <div className="form-errors">
          {errors.map((e, i) => (
            <div key={i}>{e}</div>
          ))}
        </div>
      )}

      <div className="form-grid">
        {fields.map((f) => (
          <div key={f.name} className={`form-field ${f.type === 'textarea' ? 'form-field-wide' : ''}`}>
            <label htmlFor={f.name}>
              {f.label}
              {f.required && <span className="required-mark">*</span>}
            </label>

            {f.type === 'textarea' ? (
              <textarea
                id={f.name}
                rows={3}
                value={values[f.name] ?? ''}
                required={f.required}
                placeholder={f.placeholder}
                onChange={(e) => handleChange(f.name, e.target.value)}
              />
            ) : f.type === 'select' ? (
              <select
                id={f.name}
                value={values[f.name] ?? ''}
                required={f.required}
                onChange={(e) => handleChange(f.name, e.target.value)}
              >
                <option value="" disabled>
                  Select…
                </option>
                {f.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt.replaceAll('_', ' ')}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={f.name}
                type={f.type}
                value={values[f.name] ?? ''}
                required={f.required}
                min={f.min}
                max={f.max}
                step={f.step}
                placeholder={f.placeholder}
                onChange={(e) => handleChange(f.name, e.target.value)}
              />
            )}
          </div>
        ))}
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-ghost" onClick={onCancel} disabled={saving}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? 'Saving…' : submitLabel}
        </button>
      </div>
    </form>
  )
}
