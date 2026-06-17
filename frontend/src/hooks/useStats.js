import { useQuery } from '@tanstack/react-query'
import api from '../lib/api'

export function useStats() {
  return useQuery({
    queryKey: ['stats'],
    queryFn: () =>
      Promise.all([
        api.get('/stats/datasets/count'),
        api.get('/stats/datasets/repos'),
        api.get('/stats/datasets/languages'),
        api.get('/stats/datasets/frameworks'),
      ]).then((res) => res.map((r) => r.data.data)),
  })
}
