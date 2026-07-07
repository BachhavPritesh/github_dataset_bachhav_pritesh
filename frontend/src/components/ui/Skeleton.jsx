import { cn } from '../../lib/utils'

const variants = {
  text: 'h-4 w-full rounded-md',
  card: 'h-48 w-full rounded-2xl',
  circle: 'h-10 w-10 rounded-full',
  'table-row': 'h-12 w-full rounded-lg',
}

export default function Skeleton({ variant = 'text', className }) {
  return (
    <div
      className={cn(
        'shimmer',
        variants[variant] || variants.text,
        className,
      )}
    />
  )
}
