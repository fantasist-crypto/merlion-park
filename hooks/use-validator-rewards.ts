import { useQuery } from '@tanstack/react-query'
import BigNumber from 'bignumber.js'

import { useMerlionClient } from './use-merlion-client'

export const useValidatorRewards = (validatorAddress: string) => {
  const merlionClient = useMerlionClient()

  return useQuery(
    ['validators', validatorAddress, 'rewards'],
    async () => {
      if (!merlionClient) return null

      const { status, response } =
        await merlionClient.query.distribution.validatorOutstandingRewards({
          validatorAddress: validatorAddress,
        })
      if (status.code !== 'OK')
        throw new Error(`get validator '${validatorAddress}' rewards error`)

      // only support lion
      const coin = response.rewards?.rewards.find(
        (c) => c.denom.toLowerCase() === 'alion',
      )
      const amount = new BigNumber(coin?.amount ?? 0)

      return { amount, denom: 'lion' }
    },
    { enabled: !!(merlionClient && validatorAddress) },
  )
}
