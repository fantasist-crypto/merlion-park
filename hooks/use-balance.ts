import { useQuery } from '@tanstack/react-query'

import { useMerlionClient } from './use-merlion-client'

export const useBalance = (address: string, denom: string) => {
  const merlionClient = useMerlionClient()

  return useQuery(
    [],
    async () => {
      const { response } = await merlionClient.query.bank.balance({
        address,
        denom,
      })

      return response.balance
    },
    { enabled: !!(merlionClient && address && denom) },
  )
}
