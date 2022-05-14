import { useQuery } from 'react-query'
import { merlionClient } from '@/constants'

export const usePool = () =>
  useQuery(['pool'], async () => {
    const { response, status } = await merlionClient.query.staking.pool({})
    if (status.code !== 'OK') return null
    return response
  })
