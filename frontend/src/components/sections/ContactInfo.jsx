import { motion } from 'framer-motion'
import { Mail, MapPin, Phone } from 'lucide-react'
import { fadeUp } from '../../lib/animations'

const contacts = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@repohub.dev',
    href: 'mailto:hello@repohub.dev',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'San Francisco, CA',
    href: null,
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+1 (555) 123-4567',
    href: null,
  },
]

export default function ContactInfo() {
  return (
    <div className="space-y-6">
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-3xl sm:text-4xl font-bold text-text-primary mb-8"
      >
        Get in touch
      </motion.h2>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-text-secondary mb-8"
      >
        Have a question, suggestion, or want to contribute? We'd love to hear from you.
      </motion.p>

      <div className="space-y-4">
        {contacts.map((contact, i) => (
          <motion.div
            key={contact.label}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-4"
          >
            <motion.div
              whileHover={{ scale: 1.2, color: 'var(--color-primary)' }}
              className="h-12 w-12 rounded-xl bg-primary-soft text-primary flex items-center justify-center shrink-0"
            >
              <contact.icon className="h-5 w-5" />
            </motion.div>
            <div>
              <p className="text-sm text-text-muted">{contact.label}</p>
              {contact.href ? (
                <a
                  href={contact.href}
                  className="text-text-primary hover:text-primary transition-colors font-medium"
                >
                  {contact.value}
                </a>
              ) : (
                <p className="text-text-primary font-medium">{contact.value}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
