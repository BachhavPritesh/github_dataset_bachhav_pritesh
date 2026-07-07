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
        api.get('/analytics/datasets/source-analysis'),
      ]).then((res) => ({
        typeAnalysis: res[0].data.data,
        languageAnalysis: res[1].data.data,
        frameworkAnalysis: res[2].data.data,
        sourceAnalysis: res[3].data.data,
      })),
  })
}
