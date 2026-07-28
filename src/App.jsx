import { useState } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ToastProvider } from './context/ToastContext'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import EntityListPage from './pages/EntityListPage'
import Sidebar from './components/Sidebar'
import { entities } from './config/entities'

function AuthGate() {
  const { user } = useAuth()
  const [authView, setAuthView] = useState('login')
  const [view, setView] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (!user) {
    return authView === 'login' ? (
      <LoginPage onSwitchToRegister={() => setAuthView('register')} />
    ) : (
      <RegisterPage onSwitchToLogin={() => setAuthView('login')} />
    )
  }

  const toggleSidebar = () => setSidebarOpen((o) => !o)
  const closeSidebar = () => setSidebarOpen(false)

  const config = entities[view]

  return (
    <div className="app-shell">
      <Sidebar current={view} onNavigate={setView} open={sidebarOpen} onClose={closeSidebar} />
      <main className="app-main">
        {view === 'dashboard' || !config ? (
          <DashboardPage onMenuClick={toggleSidebar} onNavigate={setView} />
        ) : (
          <EntityListPage key={view} config={config} onMenuClick={toggleSidebar} />
        )}
      </main>
    </div>
  )
}

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <AuthGate />
      </AuthProvider>
    </ToastProvider>
  )
}
