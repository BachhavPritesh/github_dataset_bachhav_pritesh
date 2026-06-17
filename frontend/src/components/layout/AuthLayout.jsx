import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Code2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import ThemeToggle from '../ui/ThemeToggle'
import { scaleIn } from '../../lib/animations'

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-surface-alt">
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md"
        >
          <Link
            to="/"
            className="flex items-center justify-center gap-2 text-text-primary font-bold text-2xl mb-8"
          >
            <Code2 className="h-7 w-7 text-primary" />
            <span>RepoHub</span>
          </Link>
          <div className="rounded-2xl border border-border bg-surface-card shadow-sm p-8">
            <Outlet />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
