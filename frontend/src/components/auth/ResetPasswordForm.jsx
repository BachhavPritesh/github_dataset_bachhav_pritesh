import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, KeyRound, CheckCircle2 } from 'lucide-react'
import Input from '../ui/Input'
import Button from '../ui/Button'
import api from '../../lib/api'

export default function ResetPasswordForm() {
  const location = useLocation()
  const navigate = useNavigate()
  const [email, setEmail] = useState(location.state?.email || '')
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await api.post('/auth/reset-password', { email, otp, newPassword })
      setSuccess(true)
      setTimeout(() => navigate('/login'), 2000)
    } catch (err) {
      setError(err.response?.data?.message || 'Reset failed')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="text-center py-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <CheckCircle2 className="h-12 w-12 text-success mx-auto mb-4" />
        </motion.div>
        <h2 className="text-xl font-bold text-text-primary mb-2">Password reset!</h2>
        <p className="text-text-secondary text-sm">Redirecting to login...</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-text-primary mb-2">Set new password</h2>
      <p className="text-text-secondary mb-8">Enter the reset code from your email and choose a new password.</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={Mail}
          required
        />
        <Input
          label="Reset code"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          icon={KeyRound}
          placeholder="Enter the code from your email"
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

        {error && (
          <p className="text-error text-sm text-center">{error}</p>
        )}

        <Button type="submit" loading={loading} className="w-full">
          Reset password
        </Button>
      </form>
    </div>
  )
}
