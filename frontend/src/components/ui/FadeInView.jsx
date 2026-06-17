import { motion } from 'framer-motion'
import { fadeIn } from '../../lib/animations'
import { cn } from '../../lib/utils'

export default function FadeInView({ children, className, delay = 0 }) {
  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
