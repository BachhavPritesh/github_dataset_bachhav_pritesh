import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

export default function AnimatedCard({ children, className, delay = 0, ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -3, boxShadow: '0 12px 40px rgba(99,102,241,0.1)', transition: { duration: 0.2, ease: 'easeOut' } }}
      className={cn(
        'rounded-xl border border-border-subtle bg-surface-card shadow-sm p-6 cursor-pointer',
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}
