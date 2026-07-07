import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Lock, User, ArrowRight } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import Input from '../ui/Input'
import Button from '../ui/Button'

export default function RegisterForm() {
  const { register } = useAuth()
  const { toast } = useToast()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await register(name, email, password)
      toast({ message: 'Account created successfully!', type: 'success' })
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed'
      setError(msg)
      toast({ message: msg, type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col">
      <div className="mb-6">
        <h2 className="text-3xl font-black tracking-tight text-text-primary dark:text-white">
          Create account
        </h2>
        <p className="text-text-secondary dark:text-slate-400 text-sm mt-1.5">
          Join RepoHub and query over 300K+ GitHub repository dataset entries.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 mt-2">
        <Input
          label="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          icon={User}
          required
        />
        <Input
          label="Email address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={Mail}
          required
        />
        <Input
          label="Password (min 6 characters)"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={Lock}
          required
          className="min-w-0"
        />

        {error && (
          <div className="bg-error/10 border border-error/20 rounded-xl p-3">
            <p className="text-error text-xs text-center font-medium">{error}</p>
          </div>
        )}

        <Button type="submit" loading={loading} className="w-full py-3 mt-2 flex items-center justify-center gap-1.5 group">
          <span>Create account</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </form>

      <div className="mt-8 text-center border-t border-border/60 dark:border-slate-700/60 pt-6">
        <p className="text-sm text-text-secondary dark:text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:text-primary-hover font-semibold transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
