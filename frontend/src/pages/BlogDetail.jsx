import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, User, Tag, Loader2 } from 'lucide-react'
import PageWrapper from '../components/ui/PageWrapper'
import EmptyState from '../components/ui/EmptyState'
import Skeleton from '../components/ui/Skeleton'
import Badge from '../components/ui/Badge'
import { fadeIn } from '../lib/animations'
import { formatDate } from '../lib/utils'
import api from '../lib/api'

export default function BlogDetail() {
  const { id } = useParams()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchBlog = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await api.get(`/blogs/${id}`)
      setBlog(res.data.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load article')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBlog()
  }, [id])

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 space-y-6">
        <Skeleton variant="text" className="h-8 w-48" />
        <Skeleton variant="card" className="h-64" />
        <Skeleton variant="text" className="h-4 w-full" />
        <Skeleton variant="text" className="h-4 w-3/4" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <EmptyState variant="error" message={error} onRetry={fetchBlog} />
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-text-muted text-lg">Article not found.</p>
        <Link to="/blog" className="text-primary hover:text-primary-hover mt-4 inline-block">
          Back to articles
        </Link>
      </div>
    )
  }

  return (
    <PageWrapper>
      <motion.article
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto px-4 sm:px-6 py-16"
      >
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to articles
        </Link>

        <div className="rounded-2xl border border-border bg-surface-card shadow-sm p-6 sm:p-8">
          {blog.image && (
            <div className="-mx-6 -mt-6 sm:-mx-8 sm:-mt-8 mb-6 rounded-t-2xl overflow-hidden">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-64 sm:h-80 object-cover"
                onError={(e) => { e.target.style.display = 'none' }}
              />
            </div>
          )}

          <div className="flex flex-wrap gap-2 mb-4">
            {blog.tags?.map((tag) => (
              <Badge key={tag} variant="default">{tag}</Badge>
            ))}
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4 leading-tight">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted mb-8 pb-6 border-b border-border">
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              {blog.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {formatDate(blog.createdAt)}
            </span>
          </div>

          <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none text-text-secondary leading-relaxed whitespace-pre-wrap">
            {blog.content}
          </div>
        </div>
      </motion.article>
    </PageWrapper>
  )
}
