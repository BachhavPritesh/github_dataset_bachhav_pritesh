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
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={cardHover}
    >
      <Link
        to={`/datasets/${dataset._id}`}
        className="block rounded-xl border border-border-subtle bg-surface-card shadow-sm hover:shadow-md transition-all p-5 group"
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2 text-text-secondary text-sm">
            <GitFork className="h-4 w-4 shrink-0" />
            <span className="truncate font-medium">{truncate(dataset.repo, 30)}</span>
          </div>
          <ChevronRight className="h-4 w-4 text-text-muted group-hover:text-primary transition-colors shrink-0" />
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {dataset.type && <Badge variant={dataset.type}>{dataset.type.replace(/_/g, ' ')}</Badge>}
          {dataset.language && <Badge variant={dataset.language}>{dataset.language}</Badge>}
          {dataset.framework && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300">
              {dataset.framework}
            </span>
          )}
        </div>

        <p className="text-text-secondary text-sm leading-relaxed line-clamp-2">
          {truncate(dataset.instruction || dataset.output, 120)}
        </p>

        <div className="flex items-center gap-2 mt-3 text-xs text-text-muted">
          <FileCode className="h-3 w-3" />
          {dataset.category && <span>{dataset.category}</span>}
        </div>
      </Link>
    </motion.div>
  )
}
