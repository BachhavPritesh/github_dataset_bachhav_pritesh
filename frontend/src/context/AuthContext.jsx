import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import api from '../lib/api'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem('repohub_token'))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!token) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false)
      return
    }
    api
      .get('/auth/profile')
      .then((res) => setUser(res.data.data))
      .catch(() => {
        localStorage.removeItem('repohub_token')
        setToken(null)
        setUser(null)
      })
      .finally(() => setLoading(false))
  }, [token])

  const login = useCallback(async (email, password) => {
    const res = await api.post('/auth/login', { email, password })
    const { token: newToken, user: userData } = res.data.data
    localStorage.setItem('repohub_token', newToken)
    setToken(newToken)
    setUser(userData)
    return userData
  }, [])

  const register = useCallback(async (name, email, password) => {
    const res = await api.post('/auth/register', { name, email, password })
    const { token: newToken, user: userData } = res.data.data
    localStorage.setItem('repohub_token', newToken)
    setToken(newToken)
    setUser(userData)
    return userData
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('repohub_token')
    setToken(null)
    setUser(null)
  }, [])

  const updateProfile = useCallback(async (data) => {
    const res = await api.patch('/auth/profile', data)
    setUser(res.data.data)
    return res.data.data
  }, [])

  const changePassword = useCallback(async (oldPassword, newPassword) => {
    await api.post('/auth/change-password', { oldPassword, newPassword })
  }, [])

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, register, logout, updateProfile, changePassword }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
