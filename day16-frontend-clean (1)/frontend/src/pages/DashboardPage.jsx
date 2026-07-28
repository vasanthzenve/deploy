import { useEffect, useState } from 'react'
import Topbar from '../components/Topbar'
import Icon from '../components/Icon'
import { entityList } from '../config/entities'
import { createCrudApi } from '../api/crud'
import { useAuth } from '../context/AuthContext'

export default function DashboardPage({ onMenuClick, onNavigate }) {
  const { user } = useAuth()
  const [counts, setCounts] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      setLoading(true)
      setError('')
      const results = await Promise.all(
        entityList.map(async (e) => {
          try {
            const res = await createCrudApi(e.endpoint).list()
            return [e.key, res.data || []]
          } catch {
            return [e.key, null]
          }
        }),
      )
      if (cancelled) return
      const next = {}
      let anyFailed = false
      results.forEach(([key, data]) => {
        next[key] = data
        if (data === null) anyFailed = true
      })
      setCounts(next)
      if (anyFailed) setError('Some modules could not be reached. Confirm the backend is running.')
      setLoading(false)
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  const activeCount = (key) => (counts[key] || []).filter((r) => r.active !== false).length
  const totalRecords = entityList.reduce((sum, e) => sum + (counts[e.key]?.length || 0), 0)

  const upcoming = [
    ...(counts.therapy || []).map((t) => ({ label: `${t.patientName} · ${t.therapyType}`, date: t.nextSessionDate, type: 'Therapy' })),
    ...(counts.wellness || []).map((w) => ({ label: `${w.patientName} · wellness check`, date: w.nextAssessmentDate, type: 'Wellness' })),
    ...(counts.treatments || []).map((t) => ({ label: `${t.petName || t.ownerName} · follow-up`, date: t.nextVisitDate, type: 'Treatment' })),
  ]
    .filter((u) => u.date)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 6)

  return (
    <>
      <Topbar title={`Welcome, ${user?.firstName || 'there'}`} subtitle="Here's how the clinic looks today." onMenuClick={onMenuClick} />

      <div className="page-body">
        {error && <div className="banner banner-warning">{error}</div>}

        <div className="stat-grid">
          <div className="stat-card stat-card-highlight">
            <Icon name="grid" size={22} />
            <div className="stat-value">{loading ? '—' : totalRecords}</div>
            <div className="stat-label">Total records across the clinic</div>
          </div>
          {entityList.map((e) => (
            <button key={e.key} className="stat-card stat-card-clickable" onClick={() => onNavigate(e.key)}>
              <Icon name={e.icon} size={22} />
              <div className="stat-value">{loading ? '—' : counts[e.key]?.length ?? '—'}</div>
              <div className="stat-label">{e.label}</div>
              <div className="stat-sub">{loading ? '' : `${activeCount(e.key)} active`}</div>
            </button>
          ))}
        </div>

        <div className="card upcoming-card">
          <div className="card-header">
            <h3>Upcoming follow-ups</h3>
            <p>The soonest scheduled therapy sessions, wellness checks, and treatment visits.</p>
          </div>
          {loading ? (
            <div className="loading-state">Gathering the schedule…</div>
          ) : upcoming.length ? (
            <ul className="upcoming-list">
              {upcoming.map((u, i) => (
                <li key={i}>
                  <span className={`tag tag-${u.type.toLowerCase()}`}>{u.type}</span>
                  <span className="upcoming-label">{u.label}</span>
                  <span className="upcoming-date">{u.date}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty-state">
              <Icon name="calendar" size={26} />
              <p>Nothing scheduled yet. Add a therapy session, wellness check, or treatment to see it here.</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
