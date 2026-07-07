import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react'
import Input from '../ui/Input'
import Button from '../ui/Button'
import api from '../../lib/api'

export default function ForgotPasswordForm() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await api.post('/auth/forgot-password', { email })
      setSent(true)
      setTimeout(() => navigate('/reset-password', { state: { email } }), 1500)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send reset code')
    } finally {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <div className="text-center py-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <CheckCircle2 className="h-16 w-16 text-success mx-auto mb-5" />
        </motion.div>
        <h2 className="text-2xl font-bold text-text-primary dark:text-white mb-2">Check your email</h2>
        <p className="text-text-secondary dark:text-slate-400 text-sm">
          We've sent a password reset code to <span className="font-semibold text-text-primary dark:text-white">{email}</span>.
        </p>
        <p className="text-xs text-text-muted mt-4">Redirecting you to code input...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      <div className="mb-6">
        <h2 className="text-3xl font-black tracking-tight text-text-primary dark:text-white">
          Reset password
        </h2>
        <p className="text-text-secondary dark:text-slate-400 text-sm mt-1.5">
          Enter your email and we'll send you an verification OTP to reset your password.
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

        {error && (
          <div className="bg-error/10 border border-error/20 rounded-xl p-3">
            <p className="text-error text-xs text-center font-medium">{error}</p>
          </div>
        )}

        <Button type="submit" loading={loading} className="w-full py-3 mt-2 flex items-center justify-center gap-1.5 group">
          <span>Send verification code</span>
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
