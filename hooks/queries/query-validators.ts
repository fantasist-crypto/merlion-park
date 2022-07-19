import { useMerlionQuery } from './use-merlion-query'

// TODO
export function useQueryValidators(status: string) {
  return useMerlionQuery('staking', 'validators', { status })
}
