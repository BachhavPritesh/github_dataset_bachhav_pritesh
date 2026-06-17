import { useQuery } from '@tanstack/react-query'
import api from '../lib/api'

export function useDatasets(filters = {}) {
  return useQuery({
    queryKey: ['datasets', filters],
    queryFn: () => api.get('/datasets', { params: filters }).then((r) => r.data),
  })
}
