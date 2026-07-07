import { motion } from 'framer-motion'
import { BarChart3, BookOpen, Globe } from 'lucide-react'
import { useAnalytics } from '../../hooks/useAnalytics'
import Skeleton from '../ui/Skeleton'

const ACCENT_COLORS = [
  'bg-indigo-500', 'bg-violet-500', 'bg-sky-500',
  'bg-emerald-500', 'bg-amber-500', 'bg-rose-500',
  'bg-teal-500', 'bg-fuchsia-500',
]

const LANG_COLORS = {
  python: '#3572A5', javascript: '#F7DF1E', typescript: '#3178C6',
  java: '#B07219', go: '#00ADD8', rust: '#DEA584',
  cpp: '#F34B7D', csharp: '#178600', ruby: '#701516', php: '#777BB4',
}

function HorizontalBar({ data, labelKey, maxCount = null, colorMap = null }) {
  if (!data || data.length === 0) return null
  const max = maxCount || Math.max(...data.map((d) => d.count))

  return (
    <div className="space-y-2.5">
      {data.map((item, i) => {
        const pct = max > 0 ? (item.count / max) * 100 : 0
        const label = item[labelKey] || item._id || 'Unknown'
        const barColor = colorMap?.[label]
          ? `bg-[${colorMap[label]}]`
          : ACCENT_COLORS[i % ACCENT_COLORS.length]
        return (
          <div key={label}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2 min-w-0">
                {colorMap?.[label] && (
                  <span
                    className="h-2.5 w-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: colorMap[label] }}
                  />
                )}
                <span className="text-xs font-medium text-text-primary capitalize truncate">
                  {String(label).replace(/_/g, ' ')}
                </span>
              </div>
              <span className="text-xs font-semibold text-text-muted tabular-nums shrink-0 ml-3">
                {item.count.toLocaleString()}
              </span>
            </div>
            <div className="h-2 bg-surface-alt rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.8, delay: i * 0.04, ease: 'easeOut' }}
                className={`h-full rounded-full ${barColor}`}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

function DonutChart({ data, labelKey = '_id', valueKey = 'count' }) {
  if (!data || data.length === 0) return null
  const total = data.reduce((s, d) => s + d[valueKey], 0)
  const top = data[0]
  const pct = total > 0 ? ((top[valueKey] / total) * 100).toFixed(1) : 0
  const circumference = 2 * Math.PI * 40
  const offset = circumference - (parseFloat(pct) / 100) * circumference

  return (
    <div className="flex items-center gap-6">
      <div className="relative h-24 w-24 shrink-0">
        <svg className="h-24 w-24 -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="var(--color-surface-alt)" strokeWidth="8" />
          <motion.circle
            cx="50" cy="50" r="40"
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-bold text-text-primary">{pct}%</span>
        </div>
      </div>
      <div className="space-y-1.5">
        <p className="text-xs text-text-muted font-medium">Largest source</p>
        <p className="text-sm font-semibold text-text-primary capitalize">
          {String(top[labelKey] || top._id || 'N/A').replace(/_/g, ' ')}
        </p>
        <p className="text-xs text-text-muted">
          {top[valueKey].toLocaleString()} of {total.toLocaleString()} total
        </p>
      </div>
    </div>
  )
}

export default function AnalyticsCharts() {
  const { data, isLoading } = useAnalytics()

  if (isLoading) {
    return (
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-surface-card border border-border rounded-2xl p-6 space-y-4">
            <Skeleton variant="text" className="h-5 w-32" />
            <Skeleton variant="text" className="h-3 w-48" />
            <Skeleton variant="text" className="h-3 w-48" />
            <Skeleton variant="text" className="h-3 w-40" />
          </div>
        ))}
      </div>
    )
  }

  if (!data) return null

  return (
    <div className="grid lg:grid-cols-3 gap-6 mb-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-surface-card border border-border rounded-2xl overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-border flex items-center gap-3">
          <BarChart3 className="h-4.5 w-4.5 text-text-muted" />
          <h2 className="text-sm font-semibold text-text-primary uppercase tracking-wider">Languages</h2>
        </div>
        <div className="p-6">
          <HorizontalBar data={data.languageAnalysis} labelKey="_id" colorMap={LANG_COLORS} />
          {(!data.languageAnalysis || data.languageAnalysis.length === 0) && (
            <p className="text-xs text-text-muted text-center py-4">No language data</p>
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-surface-card border border-border rounded-2xl overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-border flex items-center gap-3">
          <BookOpen className="h-4.5 w-4.5 text-text-muted" />
          <h2 className="text-sm font-semibold text-text-primary uppercase tracking-wider">Frameworks</h2>
        </div>
        <div className="p-6">
          <HorizontalBar data={data.frameworkAnalysis} labelKey="_id" />
          {(!data.frameworkAnalysis || data.frameworkAnalysis.length === 0) && (
            <p className="text-xs text-text-muted text-center py-4">No framework data</p>
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="bg-surface-card border border-border rounded-2xl overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-border flex items-center gap-3">
          <Globe className="h-4.5 w-4.5 text-text-muted" />
          <h2 className="text-sm font-semibold text-text-primary uppercase tracking-wider">Sources</h2>
        </div>
        <div className="p-6">
          <DonutChart data={data.sourceAnalysis} />
          {(!data.sourceAnalysis || data.sourceAnalysis.length === 0) && (
            <p className="text-xs text-text-muted text-center py-4">No source data</p>
          )}
        </div>
      </motion.div>
    </div>
  )
}
