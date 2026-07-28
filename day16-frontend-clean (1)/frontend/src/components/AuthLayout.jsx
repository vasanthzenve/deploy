import Icon from './Icon'

export default function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="auth-screen">
      <div className="auth-panel">
        <div className="auth-brand">
          <span className="brand-mark brand-mark-lg">
            <Icon name="paw" size={26} />
          </span>
          <div>
            <div className="brand-name">Burrow &amp; Bloom</div>
            <div className="brand-tag">Pet Wellness Console</div>
          </div>
        </div>
        <h2>{title}</h2>
        {subtitle && <p className="auth-subtitle">{subtitle}</p>}
        {children}
        {footer && <div className="auth-footer">{footer}</div>}
      </div>
      <div className="auth-visual" aria-hidden="true">
        <div className="auth-visual-inner">
          <Icon name="heart" size={40} />
          <p>Every wagging tail, every quiet purr — tracked with care.</p>
        </div>
      </div>
    </div>
  )
}
