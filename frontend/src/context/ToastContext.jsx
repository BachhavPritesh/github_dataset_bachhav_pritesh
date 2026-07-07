import { createContext, useContext, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, Info, X } from 'lucide-react'

const ToastContext = createContext()

const typeConfig = {
  success: { icon: CheckCircle, bg: 'bg-emerald-500/10 border-emerald-500/20', color: 'text-emerald-500', text: 'text-emerald-900 dark:text-emerald-100' },
  error: { icon: XCircle, bg: 'bg-red-500/10 border-red-500/20', color: 'text-red-500', text: 'text-red-900 dark:text-red-100' },
  info: { icon: Info, bg: 'bg-blue-500/10 border-blue-500/20', color: 'text-blue-500', text: 'text-blue-900 dark:text-blue-100' },
}

let toastId = 0

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const toast = useCallback(({ message, type = 'info', duration = 3000 }) => {
    const id = ++toastId
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, duration)
  }, [])

  const remove = (id) => setToasts((prev) => prev.filter((t) => t.id !== id))

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => {
            const config = typeConfig[t.type] || typeConfig.info
            const Icon = config.icon
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, x: 60, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 60, scale: 0.95 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg backdrop-blur-xl ${config.bg} ${config.text} min-w-[280px] max-w-sm`}
              >
                <Icon className={`h-5 w-5 shrink-0 ${config.color}`} />
                <p className="text-sm font-medium flex-1">{t.message}</p>
                <button
                  onClick={() => remove(t.id)}
                  className="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors shrink-0"
                >
                  <X className="h-3.5 w-3.5 opacity-60" />
                </button>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast must be used within ToastProvider')
  return context
}
