import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight, FileCode, GitFork } from 'lucide-react'
import { cardHover } from '../../lib/animations'
import Badge from '../ui/Badge'
import { truncate } from '../../lib/utils'

export default function DatasetCard({ dataset, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.03 }}
      whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(99,102,241,0.1)' }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <Link
        to={`/datasets/${dataset._id}`}
        className="block rounded-2xl border border-border bg-surface-card hover:border-primary/20 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all p-6 group relative overflow-hidden"
      >
        {/* Top Hover Gradient Bar */}
        <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-indigo-500 via-violet-500 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5 text-text-secondary dark:text-slate-400 text-sm min-w-0">
            <div className="h-7 w-7 rounded-lg bg-surface-alt/80 border border-border flex items-center justify-center shrink-0">
              <GitFork className="h-4 w-4 text-text-muted group-hover:text-primary transition-colors" />
            </div>
            <span className="truncate font-semibold tracking-tight">{truncate(dataset.repo, 26)}</span>
          </div>
          <div className="h-7 w-7 rounded-lg border border-transparent group-hover:border-border group-hover:bg-surface-alt/50 flex items-center justify-center transition-all shrink-0">
            <ChevronRight className="h-4.5 w-4.5 text-text-muted group-hover:text-primary transition-colors" />
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {dataset.type && <Badge variant={dataset.type} className="font-semibold">{dataset.type.replace(/_/g, ' ')}</Badge>}
          {dataset.language && <Badge variant={dataset.language} className="font-semibold">{dataset.language}</Badge>}
          {dataset.framework && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100/70 text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-400 border border-emerald-500/10">
              {dataset.framework}
            </span>
          )}
        </div>

        <p className="text-text-secondary dark:text-slate-300 text-sm leading-relaxed line-clamp-2 mb-4 font-normal">
          {truncate(dataset.instruction || dataset.output, 120)}
        </p>

        <div className="flex items-center justify-between mt-2 pt-4 border-t border-border-subtle">
          <div className="flex items-center gap-1.5 text-xs text-text-muted">
            <FileCode className="h-3.5 w-3.5" />
            {dataset.category && <span className="font-medium tracking-wide uppercase text-[10px]">{dataset.category}</span>}
          </div>
          <span className="text-[10px] font-semibold text-primary uppercase tracking-wider group-hover:underline">
            Inspect entry
          </span>
        </div>
      </Link>
    </motion.div>
  )
}
