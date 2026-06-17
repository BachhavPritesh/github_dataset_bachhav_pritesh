import { motion } from 'framer-motion'
import { stagger } from '../../lib/animations'
import { cn } from '../../lib/utils'

export default function StaggerContainer({ children, className }) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
