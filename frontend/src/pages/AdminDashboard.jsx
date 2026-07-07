import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Database, Plus, Edit2, Trash2, Loader2, TrendingUp, Code2,
  BarChart3, Layers, ChevronLeft, ChevronRight, Shield, GitBranch
} from 'lucide-react'
import Button from '../components/ui/Button'
import api from '../lib/api'
import DatasetModal from '../components/admin/DatasetModal'
import AnalyticsCharts from '../components/admin/AnalyticsCharts'
import PageWrapper from '../components/ui/PageWrapper'
import { useCounter } from '../hooks/useCounter'

// Color palette for analytics bars
const BAR_COLORS = [
  'bg-indigo-500', 'bg-violet-500', 'bg-sky-500',
  'bg-emerald-500', 'bg-amber-500', 'bg-rose-500',
  'bg-teal-500', 'bg-fuchsia-500',
]

const LANG_COLORS = {
  python: 'bg-yellow-500',
  javascript: 'bg-amber-400',
  typescript: 'bg-blue-500',
  java: 'bg-red-500',
  go: 'bg-cyan-500',
  rust: 'bg-orange-600',
  cpp: 'bg-pink-500',
  csharp: 'bg-purple-500',
  ruby: 'bg-red-600',
  php: 'bg-indigo-400',
}

export default function AdminDashboard() {
  const [datasets, setDatasets] = useState([])
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingDataset, setEditingDataset] = useState(null)
  const [deletingId, setDeletingId] = useState(null)

  const fetchData = async () => {
    setLoading(true)
    try {
      const [analyticsRes, datasetsRes] = await Promise.all([
        api.get('/admin/analytics').catch(() => null),
        api.get('/admin/datasets', { params: { page, limit: 10 } })
      ])

      // Analytics response: { success, data: { typeAnalysis, repoAnalysis } }
      if (analyticsRes?.data?.data) {
        setAnalytics(analyticsRes.data.data)
      }

      // Datasets response: { success, data: [...], pagination: { total, totalPages, ... } }
      const dsData = datasetsRes.data
      setDatasets(dsData.data || [])
      const pag = dsData.pagination || {}
      setTotalPages(pag.totalPages || 1)
      setTotalCount(pag.total || 0)
    } catch (err) {
      console.error('Failed to fetch admin data', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  // Derived stats
  const totalTypes = useMemo(() =>
    analytics?.typeAnalysis?.reduce((s, i) => s + i.count, 0) || 0,
    [analytics]
  )
  const totalRepos = useMemo(() =>
    analytics?.repoAnalysis?.length || 0,
    [analytics]
  )

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this dataset?')) return
    setDeletingId(id)
    try {
      await api.delete(`/datasets/${id}`)
      fetchData()
    } catch (err) {
      console.error('Failed to delete', err)
    } finally {
      setDeletingId(null)
    }
  }

  const handleEdit = (dataset) => {
    setEditingDataset(dataset)
    setModalOpen(true)
  }

  const handleAdd = () => {
    setEditingDataset(null)
    setModalOpen(true)
  }

  const handleModalSuccess = () => {
    setModalOpen(false)
    fetchData()
  }

  if (loading && !analytics) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-text-muted font-medium">Loading dashboard…</p>
        </div>
      </div>
    )
  }

  return (
    <PageWrapper>
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <div className="border-b border-border bg-surface-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">Admin Dashboard</h1>
                <p className="text-sm text-text-muted mt-0.5">Manage datasets and monitor platform analytics</p>
              </div>
            </div>
            <Button onClick={handleAdd} className="gap-2">
              <Plus className="h-4 w-4" />
              New Dataset
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Stat Cards Row */}
            {analytics && (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Total Datasets', value: totalCount, icon: Database, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
                  { label: 'Dataset Types', value: analytics.typeAnalysis?.length || 0, icon: Layers, color: 'text-violet-500', bg: 'bg-violet-500/10' },
                  { label: 'Repositories', value: totalRepos, icon: GitBranch, color: 'text-sky-500', bg: 'bg-sky-500/10' },
                  { label: 'Total Entries', value: totalTypes, icon: BarChart3, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                ].map((stat) => (
                  <StatCard key={stat.label} stat={stat} />
                ))}
              </div>
            )}

        {/* Analytics Cards */}
        {analytics && (
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* Dataset Types with Progress Bars */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-surface-card border border-border rounded-2xl overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-border flex items-center gap-3">
                <Code2 className="h-4.5 w-4.5 text-text-muted" />
                <h2 className="text-sm font-semibold text-text-primary uppercase tracking-wider">Types Breakdown</h2>
              </div>
              <div className="p-6 space-y-4">
                {analytics.typeAnalysis?.map((item, i) => {
                  const pct = totalTypes > 0 ? (item.count / totalTypes) * 100 : 0
                  return (
                    <div key={item._id}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-medium text-text-primary capitalize">
                          {String(item._id || '').replaceAll('_', ' ')}
                        </span>
                        <span className="text-xs font-semibold text-text-muted tabular-nums">
                          {item.count.toLocaleString()} ({pct.toFixed(1)}%)
                        </span>
                      </div>
                      <div className="h-2 bg-surface-alt rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.8, delay: i * 0.05, ease: 'easeOut' }}
                          className={`h-full rounded-full ${BAR_COLORS[i % BAR_COLORS.length]}`}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>

            {/* Top Repositories */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-surface-card border border-border rounded-2xl overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-border flex items-center gap-3">
                <TrendingUp className="h-4.5 w-4.5 text-text-muted" />
                <h2 className="text-sm font-semibold text-text-primary uppercase tracking-wider">Top Repositories</h2>
              </div>
              <div className="divide-y divide-border">
                {analytics.repoAnalysis?.slice(0, 6).map((item, i) => (
                  <div key={item._id} className="px-6 py-3.5 flex items-center gap-4 hover:bg-surface-alt/40 transition-colors">
                    <span className="text-xs font-bold text-text-muted w-5 text-right tabular-nums">{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-text-primary truncate">{item._id}</p>
                    </div>
                    <span className="text-sm font-semibold text-text-primary tabular-nums">
                      {item.count.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {/* Analytics Charts */}
        <AnalyticsCharts />

        {/* Dataset Table */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-surface-card border border-border rounded-2xl overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Database className="h-4.5 w-4.5 text-text-muted" />
              <h2 className="text-sm font-semibold text-text-primary uppercase tracking-wider">All Datasets</h2>
              <span className="text-xs text-text-muted bg-surface-alt px-2 py-0.5 rounded-full font-medium">
                {totalCount.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Mobile card list */}
          <div className="block lg:hidden divide-y divide-border">
            {datasets.map((ds) => (
              <div key={ds._id} className="px-4 py-3.5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="h-8 w-8 rounded-lg bg-surface-alt border border-border flex items-center justify-center shrink-0">
                    <GitBranch className="h-3.5 w-3.5 text-text-muted" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-text-primary truncate">{ds.repo}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] font-semibold capitalize px-1.5 py-0.5 rounded bg-surface-alt border border-border text-text-muted">
                        {String(ds.type || '').replaceAll('_', ' ')}
                      </span>
                      {ds.language && (
                        <span className={`h-2 w-2 rounded-full shrink-0 ${LANG_COLORS[ds.language] || 'bg-gray-400'}`} />
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={() => handleEdit(ds)} className="p-2 rounded-lg text-text-muted hover:text-indigo-500 hover:bg-indigo-500/10 transition-all" title="Edit">
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button onClick={() => handleDelete(ds._id)} disabled={deletingId === ds._id} className="p-2 rounded-lg text-text-muted hover:text-red-500 hover:bg-red-500/10 transition-all disabled:opacity-50" title="Delete">
                    {deletingId === ds._id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">
              <thead>
                <tr className="border-b border-border bg-surface-alt/30">
                  <th className="px-6 py-4 text-[11px] font-semibold text-text-muted uppercase tracking-widest min-w-[300px]">Repository</th>
                  <th className="px-6 py-4 text-[11px] font-semibold text-text-muted uppercase tracking-widest min-w-[150px]">Type</th>
                  <th className="px-6 py-4 text-[11px] font-semibold text-text-muted uppercase tracking-widest min-w-[120px]">Language</th>
                  <th className="px-6 py-4 text-[11px] font-semibold text-text-muted uppercase tracking-widest text-right min-w-[100px]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {datasets.map((ds, idx) => (
                  <tr
                    key={ds._id}
                    className={`border-b border-border/50 hover:bg-surface-alt/30 transition-colors ${idx % 2 === 0 ? '' : 'bg-surface-alt/10'}`}
                  >
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="h-8 w-8 rounded-lg bg-surface-alt border border-border flex items-center justify-center shrink-0">
                          <GitBranch className="h-3.5 w-3.5 text-text-muted" />
                        </div>
                        <span className="text-sm font-medium text-text-primary truncate">
                          {ds.repo}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold capitalize bg-surface-alt border border-border text-text-secondary">
                        {String(ds.type || '').replaceAll('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-2">
                        {ds.language && (
                          <span className={`h-2.5 w-2.5 rounded-full shrink-0 ${LANG_COLORS[ds.language] || 'bg-gray-400'}`} />
                        )}
                        <span className="text-sm text-text-secondary capitalize font-medium">
                          {ds.language || '—'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-3.5">
                      <div className="flex justify-end gap-1">
                        <button
                          onClick={() => handleEdit(ds)}
                          className="p-2 rounded-lg text-text-muted hover:text-indigo-500 hover:bg-indigo-500/10 transition-all"
                          title="Edit"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(ds._id)}
                          disabled={deletingId === ds._id}
                          className="p-2 rounded-lg text-text-muted hover:text-red-500 hover:bg-red-500/10 transition-all disabled:opacity-50"
                          title="Delete"
                        >
                          {deletingId === ds._id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-border flex items-center justify-between">
              <p className="text-xs text-text-muted font-medium">
                Page <span className="text-text-primary font-semibold">{page}</span> of{' '}
                <span className="text-text-primary font-semibold">{totalPages}</span>
              </p>
              <div className="flex items-center gap-1">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(p => p - 1)}
                  className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-alt transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                {/* Page number pills — hidden on mobile */}
                <div className="hidden sm:flex items-center gap-1">
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    let pageNum
                    if (totalPages <= 5) {
                      pageNum = i + 1
                    } else if (page <= 3) {
                      pageNum = i + 1
                    } else if (page >= totalPages - 2) {
                      pageNum = totalPages - 4 + i
                    } else {
                      pageNum = page - 2 + i
                    }
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={`h-8 w-8 rounded-lg text-xs font-semibold transition-colors ${
                          page === pageNum
                            ? 'bg-primary text-white shadow-sm'
                            : 'text-text-muted hover:text-text-primary hover:bg-surface-alt'
                        }`}
                      >
                        {pageNum}
                      </button>
                    )
                  })}
                </div>
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(p => p + 1)}
                  className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-alt transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      <AnimatePresence>
        {modalOpen && (
          <DatasetModal
            dataset={editingDataset}
            onClose={() => setModalOpen(false)}
            onSuccess={handleModalSuccess}
          />
        )}
      </AnimatePresence>
    </div>
    </PageWrapper>
  )
}

function StatCard({ stat }) {
  const animatedValue = useCounter(stat.value, { duration: 1200 })

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-surface-card border border-border rounded-2xl p-5 flex items-start gap-4"
    >
      <div className={`p-2.5 rounded-xl ${stat.bg} shrink-0`}>
        <stat.icon className={`h-5 w-5 ${stat.color}`} />
      </div>
      <div className="min-w-0">
        <p className="text-2xl font-bold text-text-primary tracking-tight tabular-nums">
          {animatedValue.toLocaleString()}
        </p>
        <p className="text-xs text-text-muted font-medium mt-0.5">{stat.label}</p>
      </div>
    </motion.div>
  )
}
