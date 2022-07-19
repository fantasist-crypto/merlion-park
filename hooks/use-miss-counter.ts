import { useQuery } from '@tanstack/react-query'

import { useMerlionClient } from './use-merlion-client'

export const useMissCounter = (validatorAddr: string) => {
  const merlionClient = useMerlionClient()

  return useQuery(
    ['validators', validatorAddr, 'miss'],
    async () => {
      if (!merlionClient) return null

      const { response, status } = await merlionClient.query.oracle.missCounter(
        {
          validatorAddr,
        },
      )
      if (status.code !== 'OK')
        throw new Error(`get validator(${validatorAddr}) miss counter`)

      return response.missCounter
    },
    { enabled: !!merlionClient },
  )
}
