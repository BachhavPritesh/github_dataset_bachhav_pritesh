import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 dark:from-indigo-500 dark:via-indigo-600 dark:to-violet-700" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <Sparkles className="h-12 w-12 text-white/70 mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to explore GitHub intelligence?
          </h2>
          <p className="text-lg text-white/80 mb-8">
            Start browsing millions of code and documentation snippets from
            the world's best open-source repositories.
          </p>
          <Link to="/datasets">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-white text-indigo-700 font-bold text-base shadow-2xl shadow-indigo-900/30 hover:shadow-indigo-900/40 hover:bg-white/95 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 group"
            >
              Start Exploring
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
