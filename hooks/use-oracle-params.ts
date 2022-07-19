import { useQuery } from '@tanstack/react-query'

import { useMerlionClient } from './use-merlion-client'

export const useOracleParams = () => {
  const merlionClient = useMerlionClient()

  return useQuery(
    ['oracle', 'params'],
    async () => {
      const { response, status } = await merlionClient.query.oracle.params({})
      if (status.code !== 'OK') throw new Error('get oracle params error')
      return response.params
    },
    { enabled: !!merlionClient },
  )
}
