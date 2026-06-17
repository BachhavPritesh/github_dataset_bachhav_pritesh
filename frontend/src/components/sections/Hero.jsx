import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Code2, BookOpen, Terminal, FileCode, GitFork, Sparkles, Braces, Clock } from 'lucide-react'
import { stagger, fadeUp } from '../../lib/animations'
import Button from '../ui/Button'
import { useRandomDataset } from '../../hooks/useRandomDataset'

const typeIcons = {
  function: Terminal,
  class: BookOpen,
  documentation: FileCode,
  function_implementation: Terminal,
  class_implementation: BookOpen,
  docstring_generation: FileCode,
}

const typeLabels = {
  function: 'Function',
  class: 'Class',
  documentation: 'Docs',
  function_implementation: 'Impl',
  class_implementation: 'Impl',
  docstring_generation: 'Docstring',
}

const languageColors = {
  python: '#3572A5',
  javascript: '#F7DF1E',
  typescript: '#3178C6',
  java: '#B07219',
  go: '#00ADD8',
  rust: '#DEA584',
  cpp: '#F34B7D',
  c: '#555555',
  ruby: '#701516',
  swift: '#F05138',
}

export default function Hero() {
  const { data: dataset } = useRandomDataset()

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-16">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-soft/50 via-surface to-transparent dark:from-primary-soft-dark/20" />
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.div variants={fadeUp} className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary leading-tight tracking-tight">
                Explore GitHub{' '}
                <span className="text-primary">Intelligence</span>
              </h1>
              <p className="text-lg sm:text-xl text-text-secondary max-w-xl leading-relaxed">
                Browse, search, and analyze millions of code and documentation
                snippets from the world's most popular open-source repositories.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Link to="/datasets">
                <Button size="lg">
                  Explore Datasets
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="secondary" size="lg">
                  Learn More
                </Button>
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} className="flex items-center gap-6 text-sm text-text-muted">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-success" />
                <span>1M+ entries</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span>10+ languages</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-amber-500" />
                <span>100+ repos</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            {/* glow behind the card */}
            <div className="absolute -inset-4 bg-gradient-to-b from-primary/20 via-primary/5 to-transparent rounded-[2rem] blur-2xl" />

            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
            >
              <div className="relative rounded-2xl p-[1px] overflow-hidden shadow-2xl">
                {/* rotating shine border */}
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: 'conic-gradient(from 0deg, transparent 30%, rgba(139,92,246,0.5), rgba(139,92,246,0.15) 45%, transparent 55%, transparent 100%)',
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                />

                {/* card body */}
                <div className="relative rounded-2xl bg-surface-card p-8 min-h-[300px] overflow-hidden">
                  {/* top accent bar */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary via-primary/60 to-primary/20" />

                {/* subtle grid pattern */}
                <div
                  className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
                  style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
                    backgroundSize: '24px 24px',
                  }}
                />

                <div className="relative">
                  {/* header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Code2 className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-text-primary">RepoHub</p>
                        <p className="text-[11px] text-text-muted tracking-wide uppercase">Dataset Explorer</p>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-semibold uppercase tracking-wider">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                      Live
                    </span>
                  </div>

                  {/* dataset content */}
                  <AnimatePresence mode="wait">
                    {dataset ? (
                      <motion.div
                        key={dataset._id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.35 }}
                        className="space-y-4"
                      >
                        {/* repo name row */}
                        <div className="flex items-center gap-2.5">
                          <div className="h-8 w-8 rounded-lg bg-primary-soft/50 flex items-center justify-center shrink-0">
                            <GitFork className="h-4 w-4 text-primary" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-text-primary truncate">{dataset.repo}</p>
                            <p className="text-[11px] text-text-muted">Source Repository</p>
                          </div>
                        </div>

                        {/* instruction block */}
                        <div className="rounded-xl border border-border/60 bg-surface/80 p-3.5">
                          <div className="flex items-center gap-1.5 mb-2">
                            <Braces className="h-3 w-3 text-text-muted" />
                            <span className="text-[10px] font-medium text-text-muted uppercase tracking-wider">Snippet</span>
                          </div>
                          <p className="text-xs text-text-secondary leading-relaxed line-clamp-3 font-mono">
                            {dataset.instruction.length > 120
                              ? dataset.instruction.slice(0, 120) + '...'
                              : dataset.instruction}
                          </p>
                        </div>

                        {/* tags row */}
                        <div className="flex flex-wrap gap-1.5">
                          {dataset.language && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border/60 text-[11px] font-medium text-text-secondary">
                              <span
                                className="h-2 w-2 rounded-full"
                                style={{ backgroundColor: languageColors[dataset.language] || '#8b5cf6' }}
                              />
                              {dataset.language}
                            </span>
                          )}
                          {dataset.type && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-100 dark:bg-purple-900/25 text-purple-700 dark:text-purple-300 text-[11px] font-medium">
                              {(() => {
                                const Icon = typeIcons[dataset.type]
                                return Icon ? <Icon className="h-3 w-3" /> : null
                              })()}
                              {typeLabels[dataset.type] || dataset.type}
                            </span>
                          )}
                          {dataset.framework && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/25 text-emerald-700 dark:text-emerald-300 text-[11px] font-medium">
                              {dataset.framework}
                            </span>
                          )}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-4"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="h-8 w-8 rounded-lg bg-surface-alt animate-pulse" />
                          <div className="space-y-1.5 flex-1">
                            <div className="h-3.5 bg-surface-alt rounded w-2/3 animate-pulse" />
                            <div className="h-2.5 bg-surface-alt rounded w-1/4 animate-pulse" />
                          </div>
                        </div>
                        <div className="rounded-xl border border-border/60 bg-surface/80 p-3.5 space-y-2">
                          <div className="h-2.5 bg-surface-alt rounded w-1/5 animate-pulse" />
                          <div className="h-2 bg-surface-alt rounded w-full animate-pulse" />
                          <div className="h-2 bg-surface-alt rounded w-5/6 animate-pulse" />
                          <div className="h-2 bg-surface-alt rounded w-3/4 animate-pulse" />
                        </div>
                        <div className="flex gap-1.5">
                          <div className="h-6 w-16 bg-surface-alt rounded-full animate-pulse" />
                          <div className="h-6 w-16 bg-surface-alt rounded-full animate-pulse" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
