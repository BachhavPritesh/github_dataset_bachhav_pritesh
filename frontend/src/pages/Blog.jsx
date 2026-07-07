import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PenSquare, X, Tag, Plus, Loader2 } from 'lucide-react'
import PageWrapper from '../components/ui/PageWrapper'
import EmptyState from '../components/ui/EmptyState'
import ArticleCard from '../components/sections/ArticleCard'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import api from '../lib/api'
import Button from '../components/ui/Button'

// ─── Post Form (admin only) ───────────────────────────────────────────────────
function PostBlogModal({ onClose, onSuccess }) {
  const { toast } = useToast()
  const [form, setForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    tags: '',
    image: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handle = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const tagsArray = form.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)
      await api.post('/blogs', {
        title: form.title,
        excerpt: form.excerpt,
        content: form.content,
        tags: tagsArray,
        image: form.image || null,
      })
      onSuccess()
      toast({ message: 'Post published!', type: 'success' })
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to create post'
      setError(msg)
      toast({ message: msg, type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25 }}
        className="w-full max-w-2xl bg-surface-card border border-border rounded-2xl shadow-2xl p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
              <PenSquare className="h-4 w-4 text-white" />
            </div>
            <h2 className="text-xl font-bold text-text-primary">New Blog Post</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-alt transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={submit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Title *</label>
            <input
              name="title"
              value={form.title}
              onChange={handle}
              required
              placeholder="Enter article title…"
              className="w-full px-4 py-2.5 rounded-xl bg-surface-alt border border-border text-text-primary placeholder-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Excerpt *</label>
            <textarea
              name="excerpt"
              value={form.excerpt}
              onChange={handle}
              required
              rows={2}
              placeholder="Short summary shown on the blog card…"
              className="w-full px-4 py-2.5 rounded-xl bg-surface-alt border border-border text-text-primary placeholder-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all resize-none"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Content *</label>
            <textarea
              name="content"
              value={form.content}
              onChange={handle}
              required
              rows={6}
              placeholder="Full article content (markdown supported)…"
              className="w-full px-4 py-2.5 rounded-xl bg-surface-alt border border-border text-text-primary placeholder-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all resize-none"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              <Tag className="inline h-3.5 w-3.5 mr-1" />
              Tags (comma separated)
            </label>
            <input
              name="tags"
              value={form.tags}
              onChange={handle}
              placeholder="e.g. announcement, engineering, tutorial"
              className="w-full px-4 py-2.5 rounded-xl bg-surface-alt border border-border text-text-primary placeholder-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
            />
          </div>

          {/* Image URL (optional) */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Cover Image URL (optional)</label>
            <input
              name="image"
              value={form.image}
              onChange={handle}
              placeholder="https://…"
              className="w-full px-4 py-2.5 rounded-xl bg-surface-alt border border-border text-text-primary placeholder-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="ghost" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button type="submit" loading={loading} disabled={loading}>
              {loading ? 'Publishing…' : 'Publish Post'}
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

// ─── Main Blog Page ───────────────────────────────────────────────────────────
export default function Blog() {
  const { user } = useAuth()
  const isAdmin = user?.role === 'admin'

  const [articles, setArticles] = useState([])
  const [fetching, setFetching] = useState(true)
  const [showModal, setShowModal] = useState(false)

  const fetchBlogs = async () => {
    setFetching(true)
    try {
      const res = await api.get('/blogs')
      setArticles(res.data.data)
    } catch {
      // fallback: keep empty
    } finally {
      setFetching(false)
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchBlogs()
  }, [])

  const handleSuccess = () => {
    setShowModal(false)
    fetchBlogs()
  }

  return (
    <>
    <PageWrapper>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between max-w-full mx-auto mb-12 gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-2">Resources</h1>
              <p className="text-text-secondary text-lg">
                Articles, tutorials, and updates from the RepoHub team.
              </p>
            </div>

            {isAdmin && (
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button onClick={() => setShowModal(true)} className="gap-2 whitespace-nowrap">
                  <Plus className="h-4 w-4" />
                  Write Post
                </Button>
              </motion.div>
            )}
          </div>

          {/* Content */}
          {fetching ? (
            <div className="flex justify-center items-center py-24">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : articles.length === 0 ? (
            <EmptyState variant="empty" title="No posts yet" message={isAdmin ? 'Click Write Post to publish the first article.' : ''} />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article, i) => (
                <ArticleCard key={article._id} article={article} index={i} />
              ))}
            </div>
          )}
        </div>
    </PageWrapper>

      {/* Post Modal */}
      <AnimatePresence>
        {showModal && (
          <PostBlogModal onClose={() => setShowModal(false)} onSuccess={handleSuccess} />
        )}
      </AnimatePresence>
    </>
  )
}
