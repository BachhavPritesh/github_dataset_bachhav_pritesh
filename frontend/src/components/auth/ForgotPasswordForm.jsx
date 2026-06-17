import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, CheckCircle2 } from 'lucide-react'
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
          <CheckCircle2 className="h-12 w-12 text-success mx-auto mb-4" />
        </motion.div>
        <h2 className="text-xl font-bold text-text-primary mb-2">Check your email</h2>
        <p className="text-text-secondary text-sm">
          We've sent a password reset code to your email.
        </p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-text-primary mb-2">Reset password</h2>
      <p className="text-text-secondary mb-8">
        Enter your email and we'll send you a reset code.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={Mail}
          required
        />

        {error && (
          <p className="text-error text-sm text-center">{error}</p>
        )}

        <Button type="submit" loading={loading} className="w-full">
          Send reset code
        </Button>
      </form>
    </div>
  )
}
