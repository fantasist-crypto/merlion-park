import { useQuery } from 'react-query'
import type { QueryValidatorsRequest } from '@merlion/sdk'

import { merlionClient } from '@/constants'

export const useValidators = (params: QueryValidatorsRequest) =>
  useQuery(['validators'], async () => {
    const { response, status } = await merlionClient.query.staking.validators(
      params,
    )
    if (status.code !== 'OK') throw new Error('get valodators error')
    return response
  })
