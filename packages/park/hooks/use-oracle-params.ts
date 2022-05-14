import { useQuery } from 'react-query'
import { merlionClient } from '@/constants'

export const useOracleParams = () =>
  useQuery(['oracle', 'params'], async () => {
    const { response, status } = await merlionClient.query.oracle.params({})
    if (status.code !== 'OK') throw new Error('get oracle params error')
    return response.params
  })
