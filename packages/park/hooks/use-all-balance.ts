import { useQuery } from 'react-query'

import { useMerlionClient } from './use-merlion-client'

export const useAllBalance = (address: string) => {
  const merlionClient = useMerlionClient()

  const result = useQuery(
    ['allBalance', address],
    async () => {
      const { response } = await merlionClient.query.bank.allBalances({
        address,
      })

      return response.balances
    },
    { enabled: !!merlionClient },
  )

  return { ...result, isLoading: result.isLoading && merlionClient }
}
