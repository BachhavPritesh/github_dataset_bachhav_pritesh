import { useQuery } from '@tanstack/react-query'
import api from '../lib/api'

export function useRepoStats() {
  return useQuery({
    queryKey: ['repoStats'],
    queryFn: () => api.get('/datasets/trending').then((r) => r.data.data),
  })
}
