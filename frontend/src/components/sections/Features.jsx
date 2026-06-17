import { Code2, Search, BarChart3, TrendingUp, SlidersHorizontal, Terminal } from 'lucide-react'
import AnimatedSection from '../ui/AnimatedSection'
import StaggerContainer from '../ui/StaggerContainer'
import AnimatedCard from '../ui/AnimatedCard'
import features from '../../data/features.json'

const iconMap = {
  code2: Code2,
  search: Search,
  barChart3: BarChart3,
  trendingUp: TrendingUp,
  slidersHorizontal: SlidersHorizontal,
  terminal: Terminal,
}

export default function Features() {
  return (
    <AnimatedSection>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Everything you need to explore code
          </h2>
          <p className="text-text-secondary text-lg">
            Powerful tools to search, filter, and analyze millions of code
            snippets from open-source repositories.
          </p>
        </div>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = iconMap[feature.icon] || Code2
            return (
              <AnimatedCard key={feature.title} delay={i * 0.05}>
                <div className="h-12 w-12 rounded-xl bg-primary-soft text-primary flex items-center justify-center mb-4 transition-colors group-hover:bg-primary group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-text-primary mb-2">{feature.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{feature.description}</p>
              </AnimatedCard>
            )
          })}
        </StaggerContainer>
      </div>
    </AnimatedSection>
  )
}
