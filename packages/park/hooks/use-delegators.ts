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
        })
      if (status.code !== 'OK') throw new Error()

      return response
    },
    { enabled: !!(merlionClient && validatorAddr) },
  )
}
