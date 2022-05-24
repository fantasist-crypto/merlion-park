import { useQuery } from 'react-query'
import { merlionClient } from '@/constants'

export const useAllBalance = (address: string) =>
  useQuery(['allBalance', address], async () => {
    const { response } = await merlionClient.query.bank.allBalances({ address })

    return response.balances
  })
