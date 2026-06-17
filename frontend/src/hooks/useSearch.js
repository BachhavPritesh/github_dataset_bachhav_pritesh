import { useQuery } from '@tanstack/react-query'
import api from '../lib/api'

export function useSearch(query) {
  return useQuery({
    queryKey: ['search', query],
    queryFn: () => api.get('/search/datasets', { params: { q: query } }).then((r) => r.data),
    enabled: !!query,
  })
}
