import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, GitFork, FileCode, Calendar } from 'lucide-react'
import { useDataset } from '../hooks/useDataset'
import Badge from '../components/ui/Badge'
import Skeleton from '../components/ui/Skeleton'
import EmptyState from '../components/ui/EmptyState'
import PageWrapper from '../components/ui/PageWrapper'
import { fadeIn } from '../lib/animations'
import { formatDate } from '../lib/utils'

export default function DatasetDetail() {
  const { id } = useParams()
  const { data, isLoading, isError, error, refetch } = useDataset(id)

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 space-y-6">
        <Skeleton variant="text" className="h-8 w-48" />
        <Skeleton variant="card" className="h-64" />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <EmptyState
          variant="error"
          message={error?.response?.data?.message || 'Failed to load dataset'}
          onRetry={refetch}
        />
      </div>
    )
  }

  const dataset = data?.data

  if (!dataset) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-text-muted text-lg">Dataset not found.</p>
        <Link to="/datasets" className="text-primary hover:text-primary-hover mt-4 inline-block">
          Back to datasets
        </Link>
      </div>
    )
  }

  return (
    <PageWrapper>
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto px-4 sm:px-6 py-16"
    >
      <Link
        to="/datasets"
        className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to datasets
      </Link>

      <div className="rounded-2xl border border-border bg-surface-card shadow-sm p-6 sm:p-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {dataset.type && <Badge variant={dataset.type}>{dataset.type.replace(/_/g, ' ')}</Badge>}
          {dataset.language && <Badge variant={dataset.language}>{dataset.language}</Badge>}
          {dataset.framework && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300">
              {dataset.framework}
            </span>
          )}
          {dataset.category && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300">
              {dataset.category}
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted mb-6">
          <span className="flex items-center gap-1.5">
            <GitFork className="h-4 w-4" />
            {dataset.repo}
          </span>
          <span className="flex items-center gap-1.5">
            <FileCode className="h-4 w-4" />
            {dataset.source}
          </span>
          {dataset.createdAt && (
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {formatDate(dataset.createdAt)}
            </span>
          )}
        </div>

        <div className="space-y-6">
          {dataset.instruction && (
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-2">Instruction</h3>
              <div className="rounded-xl bg-surface-alt p-4 text-sm text-text-secondary font-mono leading-relaxed whitespace-pre-wrap">
                {dataset.instruction}
              </div>
            </div>
          )}

          {dataset.input && (
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-2">Input</h3>
              <div className="rounded-xl bg-surface-alt p-4 text-sm text-text-secondary font-mono leading-relaxed whitespace-pre-wrap">
                {dataset.input}
              </div>
            </div>
          )}

          {dataset.output && (
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-2">Output</h3>
              <div className="rounded-xl bg-surface-alt p-4 text-sm text-text-secondary font-mono leading-relaxed whitespace-pre-wrap">
                {dataset.output}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
    </PageWrapper>
  )
}
