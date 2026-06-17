import { cn } from '../../lib/utils'

const colorMap = {
  function: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  class: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  documentation: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  function_implementation: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300',
  class_implementation: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300',
  docstring_generation: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  python: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
  javascript: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
  typescript: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  java: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  go: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300',
  rust: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
  default: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
}

export default function Badge({ variant = 'default', children, className }) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        colorMap[variant] || colorMap.default,
        className,
      )}
    >
      {children}
    </span>
  )
}
