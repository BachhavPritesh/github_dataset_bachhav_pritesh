import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, SlidersHorizontal } from 'lucide-react'

const typeOptions = [
  'function', 'class', 'documentation', 'function_implementation',
  'class_implementation', 'docstring_generation',
]
const languageOptions = [
  'python', 'javascript', 'typescript', 'java', 'go', 'rust',
]
const frameworkOptions = [
  'pytorch', 'tensorflow', 'django', 'flask', 'transformers',
  'numpy', 'pandas', 'scikit-learn',
]

export default function FilterBar({ filters, onFilterChange, onSearch }) {
  const [showFilters, setShowFilters] = useState(false)

  const handleAdd = (key, value) => {
    const current = filters[key] || []
    if (current.includes(value)) return
    onFilterChange({ ...filters, [key]: [...current, value] })
  }

  const handleRemove = (key, value) => {
    const current = filters[key] || []
    const remaining = current.filter((v) => v !== value)
    if (remaining.length === 0) {
      const { [key]: _, ...rest } = filters
      onFilterChange(rest)
    } else {
      onFilterChange({ ...filters, [key]: remaining })
    }
  }

  const activeFilters = Object.entries(filters).filter(
    ([, v]) => Array.isArray(v) && v.length > 0,
  )

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
        <input
          type="text"
          placeholder="Search datasets..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-surface text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          <AnimatePresence>
            {activeFilters.map(([key, values]) =>
              values.map((value) => (
                <motion.span
                  key={`${key}-${value}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-primary-soft text-primary"
                >
                  {value}
                  <button
                    onClick={() => handleRemove(key, value)}
                    className="hover:text-primary-hover"
                    aria-label={`Remove ${value} filter`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </motion.span>
              )),
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary transition-colors"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </button>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl border border-border bg-surface-alt">
              <FilterSelect
                label="Type"
                options={typeOptions}
                onSelect={(v) => handleAdd('type', v)}
                selected={filters.type || []}
              />
              <FilterSelect
                label="Language"
                options={languageOptions}
                onSelect={(v) => handleAdd('language', v)}
                selected={filters.language || []}
              />
              <FilterSelect
                label="Framework"
                options={frameworkOptions}
                onSelect={(v) => handleAdd('framework', v)}
                selected={filters.framework || []}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function FilterSelect({ label, options, onSelect, selected }) {
  return (
    <div>
      <label className="block text-xs font-medium text-text-muted mb-1.5">{label}</label>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => {
          const isSelected = selected.includes(opt)
          return (
            <button
              key={opt}
              onClick={() => onSelect(opt)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                isSelected
                  ? 'bg-primary text-white'
                  : 'bg-surface text-text-secondary hover:text-text-primary border border-border'
              }`}
            >
              {opt.replace(/_/g, ' ')}
            </button>
          )
        })}
      </div>
    </div>
  )
}
