import Icon from './Icon'
import { entityList } from '../config/entities'
import { useAuth } from '../context/AuthContext'

export default function Sidebar({ current, onNavigate, open, onClose }) {
  const { user, logout } = useAuth()

  const go = (key) => {
    onNavigate(key)
    onClose()
  }

  return (
    <>
      {open && <div className="sidebar-scrim" onClick={onClose} />}
      <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
        <div className="sidebar-brand">
          <span className="brand-mark">
            <Icon name="paw" size={20} />
          </span>
          <div>
            <div className="brand-name">Burrow &amp; Bloom</div>
            <div className="brand-tag">Pet Wellness Console</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button className={`nav-item ${current === 'dashboard' ? 'nav-item-active' : ''}`} onClick={() => go('dashboard')}>
            <Icon name="grid" />
            Dashboard
          </button>
          {entityList.map((e) => (
            <button key={e.key} className={`nav-item ${current === e.key ? 'nav-item-active' : ''}`} onClick={() => go(e.key)}>
              <Icon name={e.icon} />
              {e.label}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-chip">
            <span className="user-avatar">
              <Icon name="user" size={16} />
            </span>
            <div className="user-meta">
              <div className="user-name">
                {user?.firstName} {user?.lastName}
              </div>
              <div className="user-role">{user?.role}</div>
            </div>
          </div>
          <button className="nav-item nav-item-logout" onClick={logout}>
            <Icon name="logout" />
            Log out
          </button>
        </div>
      </aside>
    </>
  )
}
