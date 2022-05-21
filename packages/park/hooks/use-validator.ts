import { useQuery } from 'react-query'

import { merlionClient } from '@/constants'

export const useValidator = (validatorAddr: string) =>
  useQuery(
    ['validators', validatorAddr],
    async () => {
      const { response, status } = await merlionClient.query.staking.validator({
        validatorAddr,
      })
      if (status.code !== 'OK')
        throw new Error(`get validator(${validatorAddr}) error`)

      return response.validator
    },
    { enabled: !!validatorAddr },
  )
