import { useQuery } from '@tanstack/react-query'
import api from '../lib/api'

export function useRandomDataset() {
  return useQuery({
    queryKey: ['randomDataset'],
    queryFn: () => api.get('/datasets/random').then((r) => r.data.data),
    refetchInterval: 2000,
  })
}
