import { motion } from 'framer-motion'
import { Code2, Database, Search, Users, Cpu } from 'lucide-react'
import AnimatedSection from '../ui/AnimatedSection'
import AnimatedCard from '../ui/AnimatedCard'
import StaggerContainer from '../ui/StaggerContainer'
import { fadeUp } from '../../lib/animations'

const topics = [
  {
    icon: Database,
    title: 'What is RepoHub?',
    text: 'A search engine and analytics platform for GitHub code datasets. It indexes millions of code snippets and documentation entries extracted from popular open-source repositories. Every entry is an instruction-input-output triplet — the same format used to train LLMs for code understanding.',
  },
  {
    icon: Search,
    title: 'What data does it contain?',
    text: 'Function implementations, class definitions, documentation blocks, docstring generation examples, and README files. Each entry is tagged with its source repository, language, framework, and category. Repositories span PyTorch, Hugging Face, Django, scikit-learn, and many more across Python, JavaScript, TypeScript, Java, Go, and Rust.',
  },
  {
    icon: Users,
    title: 'Who is it for?',
    text: 'ML researchers find training data for fine-tuning code models. Developers search for implementation patterns across top projects. Data scientists analyze framework and language trends. Educators teach code generation concepts. Open-source maintainers gain insights into how their repos are used.',
  },
  {
    icon: Cpu,
    title: 'How does it work?',
    text: 'Code snippets are extracted from GitHub repos and categorized by type, language, framework, and source. A powerful search engine lets you query across all fields. Filter endpoints drill down by criteria. Analytics provide aggregate views. All data is accessible via a REST API for programmatic use.',
  },
]

const stats = [
  { label: 'Total Entries', value: '1M+' },
  { label: 'Languages', value: '10+' },
  { label: 'Repositories', value: '100+' },
  { label: 'Frameworks', value: '15+' },
  { label: 'Dataset Types', value: '6+' },
  { label: 'API Endpoints', value: '70+' },
]

export default function CompanyStory() {
  return (
    <AnimatedSection>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-4xl sm:text-5xl font-bold text-text-primary mb-4 tracking-tight"
          >
            About RepoHub
          </motion.h1>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="text-lg text-text-secondary"
          >
            A platform for exploring, searching, and analyzing code datasets extracted from
            the world's most popular open-source GitHub repositories.
          </motion.p>
        </div>

        <StaggerContainer className="grid sm:grid-cols-2 gap-6 mb-16">
          {topics.map((topic, i) => (
            <AnimatedCard key={topic.title} delay={i * 0.05}>
              <div className="h-10 w-10 rounded-lg bg-primary-soft text-primary flex items-center justify-center mb-4">
                <topic.icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-text-primary mb-2">{topic.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{topic.text}</p>
            </AnimatedCard>
          ))}
        </StaggerContainer>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="rounded-2xl border border-border bg-surface-card shadow-sm p-6 sm:p-8">
            <div className="flex items-center gap-2 text-primary mb-6">
              <Code2 className="h-5 w-5" />
              <span className="font-semibold">RepoHub by the numbers</span>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-xl font-bold text-primary">{stat.value}</p>
                  <p className="text-xs text-text-muted mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  )
}
