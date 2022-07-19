import { useQuery } from '@tanstack/react-query'

import { useMerlionClient } from './use-merlion-client'

export const useDelegation = (
  validatorAddr?: string,
  delegatorAddr?: string,
) => {
  const merlionClient = useMerlionClient()

  return useQuery(
    ['validators', validatorAddr, delegatorAddr],
    async () => {
      try {
        const { response, status } =
          await merlionClient.query.staking.delegation({
            delegatorAddr,
            validatorAddr,
          })

        if (status.code !== 'OK') {
          console.error(
            new Error(
              `get delegation with validator address (${validatorAddr}) and delegator address (${delegatorAddr}) error`,
            ),
          )
          return null
        }

        return response.delegationResponse
      } catch (error) {
        if (error.code === 'NOT_FOUND') return null

        console.error(error)
      }
    },
    { enabled: !!(merlionClient && validatorAddr && delegatorAddr) },
  )
}
