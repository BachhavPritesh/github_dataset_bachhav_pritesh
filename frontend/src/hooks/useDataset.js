import { useQuery } from '@tanstack/react-query'
import api from '../lib/api'

export function useDataset(id) {
  return useQuery({
    queryKey: ['dataset', id],
    queryFn: () => api.get(`/datasets/${id}`).then((r) => r.data),
    enabled: !!id,
  })
}
