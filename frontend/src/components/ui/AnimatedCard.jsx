import { motion } from 'framer-motion'
import { cardHover } from '../../lib/animations'
import { cn } from '../../lib/utils'

export default function AnimatedCard({ children, className, delay = 0, ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay }}
      whileHover={cardHover}
      className={cn(
        'rounded-xl border border-border-subtle bg-surface-card shadow-sm hover:shadow-md transition-shadow p-6',
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}
