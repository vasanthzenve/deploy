import { useEffect, useMemo, useState } from 'react'
import Topbar from '../components/Topbar'
import DataTable from '../components/DataTable'
import Modal from '../components/Modal'
import ConfirmDialog from '../components/ConfirmDialog'
import EntityForm from '../components/EntityForm'
import Icon from '../components/Icon'
import { createCrudApi } from '../api/crud'
import { useToast } from '../context/ToastContext'

export default function EntityListPage({ config, onMenuClick }) {
  const api = useMemo(() => createCrudApi(config.endpoint), [config.endpoint])
  const toast = useToast()

  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [formState, setFormState] = useState(null) // null | 'create' | record
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const res = await api.list()
      setRows(res.data || [])
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.endpoint])

  const filtered = rows.filter((row) => {
    if (!search.trim()) return true
    const needle = search.toLowerCase()
    return config.columns.some((c) => String(row[c.key] ?? '').toLowerCase().includes(needle))
  })

  const handleCreate = async (payload) => {
    const res = await api.create(payload)
    toast.success(res.message || `${config.singular} created.`)
    setFormState(null)
    load()
  }

  const handleUpdate = async (payload) => {
    const res = await api.update(formState.id, payload)
    toast.success(res.message || `${config.singular} updated.`)
    setFormState(null)
    load()
  }

  const handleDelete = async () => {
    setDeleting(true)
    try {
      const res = await api.remove(deleteTarget.id)
      toast.success(res.message || `${config.singular} deleted.`)
      setDeleteTarget(null)
      load()
    } catch (err) {
      toast.error(err.message)
    } finally {
      setDeleting(false)
    }
  }

  return (
    <>
      <Topbar
        title={config.label}
        subtitle={config.description}
        onMenuClick={onMenuClick}
        action={
          <button className="btn btn-primary" onClick={() => setFormState('create')}>
            <Icon name="plus" size={16} />
            New {config.singular}
          </button>
        }
      />

      <div className="page-body">
        <div className="toolbar">
          <div className="search-box">
            <Icon name="search" size={16} />
            <input placeholder={`Search ${config.label.toLowerCase()}…`} value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <span className="record-count">{filtered.length} of {rows.length}</span>
        </div>

        <div className="card">
          {loading ? (
            <div className="loading-state">Loading {config.label.toLowerCase()}…</div>
          ) : (
            <DataTable
              columns={config.columns}
              rows={filtered}
              onEdit={(row) => setFormState(row)}
              onDelete={(row) => setDeleteTarget(row)}
              emptyLabel={rows.length ? 'No records match your search.' : `No ${config.label.toLowerCase()} yet. Create the first one.`}
            />
          )}
        </div>
      </div>

      {formState && (
        <Modal
          title={formState === 'create' ? `New ${config.singular}` : `Edit ${config.singular}`}
          subtitle={formState === 'create' ? undefined : `Record #${formState.id}`}
          onClose={() => setFormState(null)}
          wide
        >
          <EntityForm
            fields={config.fields}
            record={formState === 'create' ? null : formState}
            onSubmit={formState === 'create' ? handleCreate : handleUpdate}
            onCancel={() => setFormState(null)}
            submitLabel={formState === 'create' ? 'Create' : 'Save changes'}
          />
        </Modal>
      )}

      {deleteTarget && (
        <ConfirmDialog
          title={`Delete ${config.singular}?`}
          message={`This will permanently remove this ${config.singular.toLowerCase()} record. This action cannot be undone.`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
          busy={deleting}
        />
      )}
    </>
  )
}
