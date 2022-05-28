import { useQuery } from 'react-query'

import { useMerlionClient } from './use-merlion-client'

export const useDelegators = (validatorAddr?: string) => {
  const merlionClient = useMerlionClient()

  return useQuery(
    ['vaildators', validatorAddr, 'delegators'],
    async () => {
      const { response, status } =
        await merlionClient.query.staking.validatorDelegations({
          validatorAddr,
          pagination: (
            await import('@merjs/proto/cosmos/base/query/v1beta1/pagination')
          ).PageRequest.create({ limit: '10' }),
        })
      if (status.code !== 'OK') throw new Error()

      return response
    },
    { enabled: !!(merlionClient && validatorAddr) },
  )
}
