import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle2 } from 'lucide-react'
import Input from '../ui/Input'
import Button from '../ui/Button'
import StaggerContainer from '../ui/StaggerContainer'
import { fadeUp } from '../../lib/animations'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    // Simulate submission — replace with actual Formspree endpoint
    await new Promise((r) => setTimeout(r, 1500))
    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-16 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          <CheckCircle2 className="h-16 w-16 text-success mb-4" />
        </motion.div>
        <h3 className="text-xl font-semibold text-text-primary mb-2">Message sent!</h3>
        <p className="text-text-secondary">We'll get back to you soon.</p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <StaggerContainer className="space-y-5">
        <motion.div variants={fadeUp}>
          <Input
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </motion.div>
        <motion.div variants={fadeUp}>
          <Input
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </motion.div>
        <motion.div variants={fadeUp}>
          <div className="relative">
            <label className="block text-sm text-text-muted mb-2">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full rounded-xl border border-border bg-surface px-3 py-3 text-sm text-text-primary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary placeholder:text-text-muted"
              placeholder="Your message..."
            />
          </div>
        </motion.div>
        <motion.div variants={fadeUp}>
          <Button type="submit" loading={loading} className="w-full">
            <Send className="h-4 w-4" />
            Send Message
          </Button>
        </motion.div>
      </StaggerContainer>
    </form>
  )
}
