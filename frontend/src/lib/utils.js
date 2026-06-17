export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function truncate(str, length = 100) {
  if (!str) return ''
  return str.length > length ? str.slice(0, length) + '...' : str
}
