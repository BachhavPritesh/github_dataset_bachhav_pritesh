import { motion } from 'framer-motion'
import { AlertCircle, SearchX, Inbox, RefreshCw } from 'lucide-react'
import Button from './Button'

const variants = {
  error: {
    icon: AlertCircle,
    defaultTitle: 'Something went wrong',
    defaultMessage: 'An unexpected error occurred. Please try again.',
  },
  empty: {
    icon: Inbox,
    defaultTitle: 'No data yet',
    defaultMessage: 'There is nothing here yet.',
  },
  'no-results': {
    icon: SearchX,
    defaultTitle: 'No matches found',
    defaultMessage: 'Try adjusting your search or filter criteria.',
  },
}

export default function EmptyState({ variant = 'empty', title, message, icon: IconOverride, onRetry }) {
  const config = variants[variant] || variants.empty
  const Icon = IconOverride || config.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      <div className="h-14 w-14 rounded-2xl bg-surface-alt border border-border flex items-center justify-center mb-5">
        <Icon className="h-6 w-6 text-text-muted" />
      </div>
      <h3 className="text-lg font-semibold text-text-primary mb-1">
        {title || config.defaultTitle}
      </h3>
      <p className="text-sm text-text-muted max-w-sm mb-6">
        {message || config.defaultMessage}
      </p>
      {onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry} className="gap-2">
          <RefreshCw className="h-3.5 w-3.5" />
          Try again
        </Button>
      )}
    </motion.div>
  )
}
