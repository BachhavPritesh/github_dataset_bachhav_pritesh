import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useDatasets } from '../../hooks/useDatasets'
import DatasetCard from './DatasetCard'
import FilterBar from './FilterBar'
import Skeleton from '../ui/Skeleton'
import ErrorState from '../ui/ErrorState'

export default function DatasetGrid() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({})

  const queryFilters = {
    page,
    limit: 12,
    ...(search && { search }),
    ...Object.fromEntries(
      Object.entries(filters)
        .filter(([, values]) => values.length > 0)
        .map(([key, values]) => [key, values.join(',')]),
    ),
  }

  const { data, isLoading, isError, error, refetch } = useDatasets(queryFilters)

  const handleSearch = useCallback((value) => {
    setSearch(value)
    setPage(1)
  }, [])

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters)
    setPage(1)
  }, [])

  const datasets = data?.data || []
  const pagination = data?.pagination || {}

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-2">Datasets</h1>
          <p className="text-text-secondary">Browse and search code datasets from open-source repositories.</p>
        </div>

        <FilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
        />

        <div className="mt-8">
          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} variant="card" />
              ))}
            </div>
          ) : isError ? (
            <ErrorState
              message={error?.response?.data?.message || 'Failed to load datasets'}
              onRetry={refetch}
            />
          ) : datasets.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-text-muted text-lg">No datasets found matching your criteria.</p>
            </div>
          ) : (
            <>
              <AnimatePresence mode="wait">
                <motion.div
                  key={page}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {datasets.map((dataset, i) => (
                    <DatasetCard key={dataset._id} dataset={dataset} index={i} />
                  ))}
                </motion.div>
              </AnimatePresence>

              {pagination.totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 mt-12">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page <= 1}
                    className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-alt transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  <span className="text-sm text-text-secondary">
                    Page {pagination.page} of {pagination.totalPages}
                  </span>

                  <button
                    onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                    disabled={page >= pagination.totalPages}
                    className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-alt transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    aria-label="Next page"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  )
}
