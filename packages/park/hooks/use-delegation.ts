import { useQuery } from 'react-query'
import { merlionClient } from '@/constants'

export const useDelegation = (validatorAddr?: string, delegatorAddr?: string) =>
  useQuery(
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
    { enabled: !!validatorAddr && !!delegatorAddr },
  )
