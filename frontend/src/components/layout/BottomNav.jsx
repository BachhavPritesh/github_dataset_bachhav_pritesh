import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, Database, BookOpen, User, Shield } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const tabs = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/datasets', label: 'Datasets', icon: Database },
  { to: '/blog', label: 'Blog', icon: BookOpen },
]

export default function BottomNav() {
  const { user } = useAuth()
  const location = useLocation()

  const shownTabs = [
    ...tabs,
    ...(user ? [{ to: '/profile', label: 'Profile', icon: User }] : []),
    ...(user?.role === 'admin' ? [{ to: '/admin', label: 'Admin', icon: Shield }] : []),
  ]

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 glass-card border-t-0 pb-[env(safe-area-inset-bottom,0px)]">
      <div className="flex items-center justify-around h-16">
        {shownTabs.map((tab) => {
          const isActive = location.pathname === tab.to
          const Icon = tab.icon
          return (
            <Link
              key={tab.to}
              to={tab.to}
              className="relative flex flex-col items-center justify-center gap-0.5 min-w-[56px] min-h-[44px]"
            >
              {isActive && (
                <motion.div
                  layoutId="bottom-nav-indicator"
                  className="absolute -top-0.5 h-0.5 w-8 rounded-full bg-primary"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <Icon
                className={`h-5 w-5 transition-colors ${
                  isActive ? 'text-primary' : 'text-text-muted'
                }`}
              />
              <span
                className={`text-[10px] font-semibold transition-colors ${
                  isActive ? 'text-primary' : 'text-text-muted'
                }`}
              >
                {tab.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
