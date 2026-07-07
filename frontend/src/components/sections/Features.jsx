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
    <AnimatedSection className="bg-dots border-y border-border/50 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary mb-4">
            Everything you need to <span className="bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">explore code</span>
          </h2>
          <p className="text-text-secondary text-base sm:text-lg">
            Powerful tools to search, filter, and analyze millions of code
            snippets from open-source repositories.
          </p>
        </div>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = iconMap[feature.icon] || Code2
            return (
              <AnimatedCard key={feature.title} delay={i * 0.05} className="cursor-pointer">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-tr from-indigo-500/10 to-violet-500/10 border border-indigo-500/20 text-primary flex items-center justify-center mb-5 group-hover:from-indigo-500 group-hover:to-violet-500 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-text-primary text-base mb-2">{feature.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{feature.description}</p>
              </AnimatedCard>
            )
          })}
        </StaggerContainer>
      </div>
    </AnimatedSection>
  )
}
