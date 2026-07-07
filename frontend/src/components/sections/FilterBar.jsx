import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, SlidersHorizontal, Filter } from 'lucide-react'

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
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    setIsMobile(mq.matches)
    const handler = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const handleAdd = (key, value) => {
    const current = filters[key] || []
    if (current.includes(value)) return
    onFilterChange({ ...filters, [key]: [...current, value] })
  }

  const handleRemove = (key, value) => {
    const current = filters[key] || []
    const remaining = current.filter((v) => v !== value)
    if (remaining.length === 0) {
      // eslint-disable-next-line no-unused-vars
      const { [key]: _removed, ...rest } = filters
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
      {/* High-Fidelity Search Bar */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-violet-500/5 to-primary/5 rounded-2xl blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Search datasets by repo name, instructions, snippet contents..."
            onChange={(e) => onSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-border bg-surface dark:bg-slate-900 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary shadow-sm hover:shadow-md transition-all duration-200"
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        {/* Active Filters List */}
        <div className="flex flex-wrap gap-1.5">
          <AnimatePresence>
            {activeFilters.map(([key, values]) =>
              values.map((value) => (
                <motion.span
                  key={`${key}-${value}`}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-soft text-primary border border-primary/10 shadow-sm"
                >
                  <span className="text-[10px] text-primary/60 font-bold uppercase">{key}:</span>
                  <span>{value.replace(/_/g, ' ')}</span>
                  <button
                    onClick={() => handleRemove(key, value)}
                    className="hover:text-primary-hover hover:bg-primary/10 rounded-full p-0.5 transition-colors cursor-pointer"
                    aria-label={`Remove ${value} filter`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </motion.span>
              )),
            )}
          </AnimatePresence>
        </div>

        {/* Toggle Filters Button */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all cursor-pointer shadow-sm shrink-0 ${
            showFilters 
              ? 'bg-primary text-white border-primary shadow-indigo-500/20' 
              : 'bg-surface dark:bg-slate-900 border-border text-text-secondary hover:text-text-primary hover:shadow-md'
          }`}
        >
          <SlidersHorizontal className="h-4.5 w-4.5" />
          <span>Filters</span>
        </button>
      </div>

      {/* Collapsible Filter Panel */}
      <AnimatePresence>
        {showFilters && (
          <>
            {/* Mobile: full-screen overlay modal */}
            {isMobile && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
                onClick={() => setShowFilters(false)}
              >
                <motion.div
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                  className="absolute bottom-0 left-0 right-0 rounded-t-2xl bg-surface-card border border-border p-6 max-h-[70vh] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-text-primary">Filters</h3>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-alt transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="space-y-5">
                    <FilterSelect
                      label="Dataset Type"
                      options={typeOptions}
                      onSelect={(v) => handleAdd('type', v)}
                      selected={filters.type || []}
                    />
                    <FilterSelect
                      label="Programming Language"
                      options={languageOptions}
                      onSelect={(v) => handleAdd('language', v)}
                      selected={filters.language || []}
                    />
                    <FilterSelect
                      label="Development Framework"
                      options={frameworkOptions}
                      onSelect={(v) => handleAdd('framework', v)}
                      selected={filters.framework || []}
                    />
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Desktop: inline panel */}
            {!isMobile && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-3 gap-6 p-6 rounded-2xl border border-border bg-surface-alt dark:bg-slate-900/60 backdrop-blur-md shadow-inner">
                  <FilterSelect
                    label="Dataset Type"
                    options={typeOptions}
                    onSelect={(v) => handleAdd('type', v)}
                    selected={filters.type || []}
                  />
                  <FilterSelect
                    label="Programming Language"
                    options={languageOptions}
                    onSelect={(v) => handleAdd('language', v)}
                    selected={filters.language || []}
                  />
                  <FilterSelect
                    label="Development Framework"
                    options={frameworkOptions}
                    onSelect={(v) => handleAdd('framework', v)}
                    selected={filters.framework || []}
                  />
                </div>
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

function FilterSelect({ label, options, onSelect, selected }) {
  return (
    <div className="space-y-2">
      <label className="block text-xs font-bold text-text-muted uppercase tracking-wider">{label}</label>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => {
          const isSelected = selected.includes(opt)
          return (
            <button
              key={opt}
              onClick={() => onSelect(opt)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                isSelected
                  ? 'bg-primary text-white border-primary shadow-sm shadow-indigo-500/10'
                  : 'bg-surface dark:bg-slate-900 text-text-secondary hover:text-text-primary border-border hover:shadow-sm'
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
