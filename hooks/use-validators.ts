import { useQuery } from '@tanstack/react-query'

import { useMerlionClient } from './use-merlion-client'

export const useValidators = (params: { status: string }) => {
  const merlionClient = useMerlionClient()

  return useQuery(
    ['validators', params.status],
    async () => {
      if (!merlionClient) return null

      const { PageRequest } = await import(
        '@merjs/proto/cosmos/base/query/v1beta1/pagination'
      )

      const { response, status } = await merlionClient.query.staking.validators(
        {
          status: params.status,
          pagination: PageRequest.create({ limit: '9999' }),
        },
      )

      if (status.code !== 'OK') throw new Error('get valodators error')

      return response
    },
    { enabled: !!merlionClient },
  )
}
