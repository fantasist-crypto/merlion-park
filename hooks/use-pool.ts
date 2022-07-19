import { useQuery } from '@tanstack/react-query'
import { useMerlionClient } from './use-merlion-client'

export const usePool = () => {
  const merlionClient = useMerlionClient()
  return useQuery(
    ['pool'],
    async () => {
      const { response, status } = await merlionClient.query.staking.pool({})
      if (status.code !== 'OK') return null

      return response.pool
    },
    { enabled: !!merlionClient },
  )
}
