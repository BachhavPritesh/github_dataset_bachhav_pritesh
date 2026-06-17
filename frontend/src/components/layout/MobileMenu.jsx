import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { X, Code2 } from 'lucide-react'
import { stagger, fadeIn } from '../../lib/animations'
import Button from '../ui/Button'

export default function MobileMenu({ links, user, onClose, onLogout }) {
  const menuRef = useRef(null)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      ref={menuRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 lg:hidden"
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />

      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="absolute top-0 right-0 bottom-0 w-72 max-w-[85vw] bg-surface border-l border-border shadow-xl"
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2 text-text-primary font-bold text-lg">
            <Code2 className="h-5 w-5 text-primary" />
            <span>RepoHub</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-alt transition-colors"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="p-4 space-y-1"
        >
          {links.map((link) => (
            <motion.div key={link.to} variants={fadeIn}>
              <Link
                to={link.to}
                onClick={onClose}
                className="block px-4 py-3 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-alt transition-colors font-medium"
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          {user ? (
            <div className="space-y-3">
              <Link
                to="/profile"
                onClick={onClose}
                className="block px-4 py-2 text-sm text-text-secondary hover:text-text-primary"
              >
                {user.name}
              </Link>
              <Button variant="ghost" className="w-full" onClick={onLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <Link to="/login" onClick={onClose}>
                <Button variant="secondary" className="w-full">
                  Log in
                </Button>
              </Link>
              <Link to="/register" onClick={onClose}>
                <Button className="w-full">Sign up</Button>
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
