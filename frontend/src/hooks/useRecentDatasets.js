import { useQuery } from '@tanstack/react-query'
import api from '../lib/api'

export function useRecentDatasets() {
  return useQuery({
    queryKey: ['recentDatasets'],
    queryFn: () => api.get('/datasets/sort/recent').then((r) => r.data.data),
  })
}
