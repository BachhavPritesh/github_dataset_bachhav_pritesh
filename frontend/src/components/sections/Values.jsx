import { motion } from 'framer-motion'
import { Globe, ShieldCheck, Zap, Sparkles, Code2 } from 'lucide-react'
import AnimatedSection from '../ui/AnimatedSection'
import StaggerContainer from '../ui/StaggerContainer'
import values from '../../data/values.json'

const iconMap = {
  globe: Globe,
  shieldCheck: ShieldCheck,
  zap: Zap,
  sparkles: Sparkles,
}

export default function Values() {
  return (
    <AnimatedSection>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Our Values
          </h2>
          <p className="text-text-secondary text-lg">
            The principles that guide everything we build.
          </p>
        </div>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, i) => {
            const Icon = iconMap[value.icon] || Code2
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="text-center p-6"
              >
                <motion.div
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  className="h-14 w-14 rounded-2xl bg-primary-soft text-primary flex items-center justify-center mx-auto mb-4"
                >
                  <Icon className="h-7 w-7" />
                </motion.div>
                <h3 className="font-semibold text-text-primary mb-2">{value.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{value.description}</p>
              </motion.div>
            )
          })}
        </StaggerContainer>
      </div>
    </AnimatedSection>
  )
}
