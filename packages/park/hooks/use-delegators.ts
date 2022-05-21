import { merlionClient } from '@/constants'
import { useQuery } from 'react-query'

export const useDelegators = (validatorAddr?: string) =>
  useQuery(
    ['vaildators', validatorAddr, 'delegators'],
    async () => {
      const { response, status } =
        await merlionClient.query.staking.validatorDelegations({
          validatorAddr,
        })
      if (status.code !== 'OK') throw new Error()

      return response
    },
    { enabled: !!validatorAddr },
  )
