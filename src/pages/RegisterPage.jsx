import { useEffect, useState } from 'react'
import AuthLayout from '../components/AuthLayout'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { authApi } from '../api/auth'

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  mobileNumber: '',
  password: '',
  role: '',
}

export default function RegisterPage({ onSwitchToLogin }) {
  const { register } = useAuth()
  const toast = useToast()
  const [form, setForm] = useState(initialForm)
  const [roles, setRoles] = useState([])
  const [newRole, setNewRole] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [rolesLoading, setRolesLoading] = useState(true)

  const loadRoles = async () => {
    setRolesLoading(true)
    try {
      const res = await authApi.listRoles()
      setRoles(res.data || [])
    } catch {
      setRoles([])
    } finally {
      setRolesLoading(false)
    }
  }

  useEffect(() => {
    loadRoles()
  }, [])

  const update = (name, value) => setForm((f) => ({ ...f, [name]: value }))

  const handleAddRole = async () => {
    if (!newRole.trim()) return
    try {
      await authApi.createRole({ name: newRole.trim().toUpperCase() })
      toast.success(`Role "${newRole.trim().toUpperCase()}" created.`)
      setNewRole('')
      loadRoles()
    } catch (err) {
      toast.error(err.message)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const message = await register(form)
      toast.success(message || 'Account created. You can sign in now.')
      onSwitchToLogin()
    } catch (err) {
      setError(err.details && err.details.length ? err.details.join(' ') : err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Register clinic staff, consultants, or pet owners."
      footer={
        <>
          Already registered?{' '}
          <button type="button" className="link-btn" onClick={onSwitchToLogin}>
            Sign in instead
          </button>
        </>
      }
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        {error && <div className="form-errors">{error}</div>}

        <div className="form-grid form-grid-two">
          <div className="form-field">
            <label htmlFor="firstName">First name</label>
            <input id="firstName" required value={form.firstName} onChange={(e) => update('firstName', e.target.value)} />
          </div>
          <div className="form-field">
            <label htmlFor="lastName">Last name</label>
            <input id="lastName" required value={form.lastName} onChange={(e) => update('lastName', e.target.value)} />
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="reg-email">Email</label>
          <input id="reg-email" type="email" required value={form.email} onChange={(e) => update('email', e.target.value)} />
        </div>

        <div className="form-field">
          <label htmlFor="mobileNumber">Mobile number</label>
          <input
            id="mobileNumber"
            required
            value={form.mobileNumber}
            onChange={(e) => update('mobileNumber', e.target.value)}
            placeholder="10-digit mobile number"
          />
        </div>

        <div className="form-field">
          <label htmlFor="reg-password">Password</label>
          <input id="reg-password" type="password" required minLength={8} maxLength={20} value={form.password} onChange={(e) => update('password', e.target.value)} />
        </div>

        <div className="form-field">
          <label htmlFor="role">Role</label>
          <select id="role" required value={form.role} onChange={(e) => update('role', e.target.value)}>
            <option value="" disabled>
              {rolesLoading ? 'Loading roles…' : roles.length ? 'Select a role…' : 'No roles yet — add one below'}
            </option>
            {roles.map((r) => (
              <option key={r.id} value={r.name}>
                {r.name}
              </option>
            ))}
          </select>
          <div className="inline-add-row">
            <input placeholder="Add a new role, e.g. PET_OWNER" value={newRole} onChange={(e) => setNewRole(e.target.value)} />
            <button type="button" className="btn btn-ghost btn-small" onClick={handleAddRole}>
              Add role
            </button>
          </div>
        </div>

        <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
          {loading ? 'Creating account…' : 'Create account'}
        </button>
      </form>
    </AuthLayout>
  )
}
