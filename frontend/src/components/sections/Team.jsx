import { motion } from 'framer-motion'
import { Globe, MessageCircle, ExternalLink } from 'lucide-react'
import AnimatedSection from '../ui/AnimatedSection'
import StaggerContainer from '../ui/StaggerContainer'
import AnimatedCard from '../ui/AnimatedCard'
import team from '../../data/team.json'

export default function Team() {
  return (
    <AnimatedSection className="bg-surface-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Meet the team
          </h2>
          <p className="text-text-secondary text-lg">
            We're a distributed team of engineers, data scientists, and open source enthusiasts.
          </p>
        </div>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <AnimatedCard key={member.name} delay={i * 0.05} className="text-center relative group">
              <div className="h-20 w-20 rounded-full bg-primary-soft text-primary flex items-center justify-center font-bold text-xl mx-auto mb-4 overflow-hidden">
                <motion.span
                  whileHover={{ scale: 1.1 }}
                  className="group-hover:scale-110 transition-transform duration-300"
                >
                  {member.avatar}
                </motion.span>
              </div>
              <h3 className="font-semibold text-text-primary">{member.name}</h3>
              <p className="text-sm text-primary font-medium mb-2">{member.role}</p>
              <p className="text-sm text-text-secondary leading-relaxed">{member.bio}</p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="flex justify-center gap-2 mt-4"
              >
                <button className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-alt transition-colors" aria-label="GitHub">
                  <Globe className="h-4 w-4" />
                </button>
                <button className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-alt transition-colors" aria-label="Twitter">
                  <MessageCircle className="h-4 w-4" />
                </button>
                <button className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-alt transition-colors" aria-label="LinkedIn">
                  <ExternalLink className="h-4 w-4" />
                </button>
              </motion.div>
            </AnimatedCard>
          ))}
        </StaggerContainer>
      </div>
    </AnimatedSection>
  )
}
