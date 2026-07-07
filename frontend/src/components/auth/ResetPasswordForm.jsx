import { useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, KeyRound, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react'
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
      setError(err.response?.data?.message || 'Password reset failed')
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
          <CheckCircle2 className="h-16 w-16 text-success mx-auto mb-5" />
        </motion.div>
        <h2 className="text-2xl font-bold text-text-primary dark:text-white mb-2">Password reset successful!</h2>
        <p className="text-text-secondary dark:text-slate-400 text-sm">Your password has been successfully updated.</p>
        <p className="text-xs text-text-muted mt-4">Redirecting you to login page...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      <div className="mb-6">
        <h2 className="text-3xl font-black tracking-tight text-text-primary dark:text-white">
          Enter reset details
        </h2>
        <p className="text-text-secondary dark:text-slate-400 text-sm mt-1.5">
          Enter the verification code sent to your email and select your new password.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={Mail}
          required
        />
        <Input
          label="Reset code (OTP)"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          icon={KeyRound}
          placeholder="Enter 6-digit OTP code"
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
          <div className="bg-error/10 border border-error/20 rounded-xl p-3">
            <p className="text-error text-xs text-center font-medium">{error}</p>
          </div>
        )}

        <Button type="submit" loading={loading} className="w-full py-3 mt-2 flex items-center justify-center gap-1.5 group">
          <span>Update password</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </form>

      <div className="mt-8 text-center border-t border-border/60 dark:border-slate-700/60 pt-6">
        <Link 
          to="/login" 
          className="inline-flex items-center gap-2 text-sm text-text-secondary dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to sign in</span>
        </Link>
      </div>
    </div>
  )
}
