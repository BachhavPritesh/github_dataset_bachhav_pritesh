import { motion } from 'framer-motion'
import { fadeUp } from '../../lib/animations'
import { cn } from '../../lib/utils'

export default function AnimatedSection({ children, className, delay = 0, ...props }) {
  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      transition={{ delay }}
      className={cn('py-16 md:py-24', className)}
      {...props}
    >
      {children}
    </motion.section>
  )
}
