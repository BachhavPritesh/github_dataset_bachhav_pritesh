import { useQuery } from '@tanstack/react-query'
import api from '../lib/api'

export function useAnalytics() {
  return useQuery({
    queryKey: ['analytics'],
    queryFn: () =>
      Promise.all([
        api.get('/analytics/datasets/type-analysis'),
        api.get('/analytics/datasets/language-analysis'),
        api.get('/analytics/datasets/framework-analysis'),
      ]).then((res) => res.map((r) => r.data.data)),
  })
}
