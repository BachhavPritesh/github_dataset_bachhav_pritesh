import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

export default function Input({
  label,
  type = 'text',
  value,
  onChange,
  error,
  icon: Icon,
  className,
  ...props
}) {
  const [focused, setFocused] = useState(false)
  const hasValue = value && value.length > 0

  return (
    <div className="relative">
      {label && (
        <motion.label
          animate={{
            y: focused || hasValue ? -20 : 0,
            scale: focused || hasValue ? 0.85 : 1,
            color: error
              ? 'var(--color-error)'
              : focused
                ? 'var(--color-primary)'
                : 'var(--color-text-muted)',
          }}
          transition={{ duration: 0.2 }}
          className={cn(
            'absolute left-3 top-3.5 origin-left cursor-text pointer-events-none z-10',
            'text-text-muted text-sm',
          )}
        >
          {label}
        </motion.label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={cn(
            'w-full rounded-xl border bg-surface px-3 py-3 text-sm text-text-primary',
            'transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-primary/50',
            'placeholder:text-text-muted',
            Icon && 'pl-10',
            error ? 'border-error' : 'border-border focus:border-primary',
            className,
          )}
          {...props}
        />
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-error text-xs mt-1"
        >
          {error}
        </motion.p>
      )}
    </div>
  )
}
