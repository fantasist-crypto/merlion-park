import { useMerlionQuery } from './use-merlion-query'

export function useQueryPool() {
  return useMerlionQuery('staking', 'pool', {})
}
