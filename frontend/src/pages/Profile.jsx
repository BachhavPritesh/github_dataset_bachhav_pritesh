import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Shield, Calendar, Edit3, Save, X, Lock } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import AnimatedSection from '../components/ui/AnimatedSection'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import { formatDate } from '../lib/utils'

export default function Profile() {
  const { user, updateProfile, changePassword } = useAuth()
  const [editing, setEditing] = useState(false)
  const [changingPassword, setChangingPassword] = useState(false)
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const handleSave = async () => {
    setError('')
    setSaving(true)
    try {
      await updateProfile({ name, email })
      setEditing(false)
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed')
    } finally {
      setSaving(false)
    }
  }

  const handleChangePassword = async (e) => {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      await changePassword(oldPassword, newPassword)
      setChangingPassword(false)
      setOldPassword('')
      setNewPassword('')
    } catch (err) {
      setError(err.response?.data?.message || 'Password change failed')
    } finally {
      setSaving(false)
    }
  }

  return (
    <AnimatedSection>
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl font-bold text-text-primary mb-8">Profile</h1>

        <div className="rounded-2xl border border-border bg-surface-card shadow-sm p-6 sm:p-8 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-primary-soft text-primary flex items-center justify-center font-bold text-xl">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-text-primary">{user?.name}</h2>
                <p className="text-sm text-text-muted">{user?.email}</p>
              </div>
            </div>
            {!editing && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditing(true)}
              >
                <Edit3 className="h-4 w-4" />
                Edit
              </Button>
            )}
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3 text-text-secondary">
              <Mail className="h-4 w-4" />
              <span>{user?.email}</span>
            </div>
            <div className="flex items-center gap-3 text-text-secondary">
              <Shield className="h-4 w-4" />
              <span className="capitalize">{user?.role || 'user'}</span>
            </div>
            {user?.createdAt && (
              <div className="flex items-center gap-3 text-text-secondary">
                <Calendar className="h-4 w-4" />
                <span>Joined {formatDate(user.createdAt)}</span>
              </div>
            )}
          </div>
        </div>

        {editing && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-border bg-surface-card shadow-sm p-6 sm:p-8 mb-6"
          >
            <h3 className="font-semibold text-text-primary mb-4">Edit Profile</h3>
            <div className="space-y-4">
              <Input
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                icon={User}
              />
              <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={Mail}
              />
              {error && <p className="text-error text-sm">{error}</p>}
              <div className="flex gap-3">
                <Button onClick={handleSave} loading={saving}>
                  <Save className="h-4 w-4" />
                  Save
                </Button>
                <Button variant="ghost" onClick={() => setEditing(false)}>
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        <div className="rounded-2xl border border-border bg-surface-card shadow-sm p-6 sm:p-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-text-primary">Password</h3>
            {!changingPassword && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setChangingPassword(true)}
              >
                <Lock className="h-4 w-4" />
                Change
              </Button>
            )}
          </div>

          {changingPassword && (
            <motion.form
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleChangePassword}
              className="space-y-4"
            >
              <Input
                label="Current password"
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                icon={Lock}
                required
              />
              <Input
                label="New password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                icon={Lock}
                required
              />
              {error && <p className="text-error text-sm">{error}</p>}
              <div className="flex gap-3">
                <Button type="submit" loading={saving}>
                  Update password
                </Button>
                <Button variant="ghost" onClick={() => setChangingPassword(false)}>
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
              </div>
            </motion.form>
          )}
        </div>
      </div>
    </AnimatedSection>
  )
}
