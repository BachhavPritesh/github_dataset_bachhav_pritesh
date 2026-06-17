import { cn } from '../../lib/utils'

export default function Skeleton({ variant = 'text', width, height, className }) {
  const base = 'animate-pulse bg-gray-200 dark:bg-slate-700 rounded-lg'

  const variants = {
    text: 'h-4 w-full',
    card: 'h-48 w-full',
    circle: 'h-12 w-12 rounded-full',
  }

  return (
    <div
      className={cn(base, variants[variant], className)}
      style={{ width, height }}
    />
  )
}
