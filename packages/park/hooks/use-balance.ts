import { useQuery } from 'react-query'

import { merlionClient } from '@/constants'

export const useBalance = (address: string, denom: string) =>
  useQuery(
    [],
    async () => {
      const { response } = await merlionClient.query.bank.balance({
        address,
        denom,
      })

      return response.balance
    },
    { enabled: !!address },
  )
