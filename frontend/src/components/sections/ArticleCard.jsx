import { motion } from 'framer-motion'
import { Calendar, User } from 'lucide-react'
import { cardHover } from '../../lib/animations'
import { formatDate } from '../../lib/utils'
import Badge from '../ui/Badge'

export default function ArticleCard({ article, index = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={cardHover}
      className="rounded-xl border border-border-subtle bg-surface-card shadow-sm hover:shadow-md transition-shadow p-6 cursor-pointer"
    >
      <div className="flex flex-wrap gap-2 mb-3">
        {article.tags.map((tag) => (
          <Badge key={tag} variant="default">
            {tag}
          </Badge>
        ))}
      </div>
      <h3 className="font-semibold text-text-primary text-lg mb-2 leading-snug">
        {article.title}
      </h3>
      <p className="text-text-secondary text-sm leading-relaxed mb-4">{article.excerpt}</p>
      <div className="flex items-center gap-4 text-xs text-text-muted">
        <span className="flex items-center gap-1">
          <User className="h-3 w-3" />
          {article.author}
        </span>
        <span className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          {formatDate(article.date)}
        </span>
      </div>
    </motion.article>
  )
}
