import { useQuery } from 'react-query'
import { merlionClient } from '@/constants'

export const useMissCounter = (validatorAddr: string) =>
  useQuery(['validators', validatorAddr, 'miss'], async () => {
    const { response, status } = await merlionClient.query.oracle.missCounter({
      validatorAddr,
    })
    if (status.code !== 'OK')
      throw new Error(`get validator(${validatorAddr}) miss counter`)

    return response.missCounter
  })
