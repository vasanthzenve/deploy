import Icon from './Icon'

export default function Topbar({ title, subtitle, onMenuClick, action }) {
  return (
    <header className="topbar">
      <button className="icon-btn menu-toggle" onClick={onMenuClick} aria-label="Toggle menu">
        <Icon name="menu" />
      </button>
      <div className="topbar-titles">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {action && <div className="topbar-action">{action}</div>}
    </header>
  )
}
