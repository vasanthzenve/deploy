import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { authApi } from '../api/auth'

const AuthContext = createContext(null)

const STORAGE_KEY = 'petcare_user'
const TOKEN_KEY = 'petcare_token'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  })
  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(STORAGE_KEY)
      localStorage.removeItem(TOKEN_KEY)
    }
  }, [user])

  const login = useCallback(async (email, password) => {
    const res = await authApi.login({ email, password })
    const data = res.data
    localStorage.setItem(TOKEN_KEY, data.token)
    setUser(data)
    return data
  }, [])

  const register = useCallback(async (payload) => {
    const res = await authApi.register(payload)
    return res.message
  }, [])

  const logout = useCallback(() => {
    authApi.logout().catch(() => {})
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
