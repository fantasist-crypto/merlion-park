import { useQuery } from '@tanstack/react-query'

import { useMerlionClient } from './use-merlion-client'

export const useValidator = (validatorAddr: string) => {
  const merlionClient = useMerlionClient()

  return useQuery(
    ['validators', validatorAddr],
    async () => {
      if (!merlionClient) return null

      const { response, status } = await merlionClient.query.staking.validator({
        validatorAddr,
      })
      if (status.code !== 'OK')
        throw new Error(`get validator(${validatorAddr}) error`)

      return response.validator
    },
    { enabled: !!(merlionClient && validatorAddr) },
  )
}
