import { useEffect, useState } from 'react'
import { MerlionClient } from '@merlion/sdk'

import { useKeplr } from './use-keplr'
import { CHAIN_ID } from '@/constants'

export const useMerlionClient = () => {
  const { signer, address } = useKeplr()

  const [merlionClient, setMerlionClient] = useState<MerlionClient>()

  useEffect(() => {
    if (signer) {
      setMerlionClient(
        new MerlionClient({
          grpcWebUrl: process.env.grpcWebUrl,
          signer,
          address,
          chainId: CHAIN_ID,
        }),
      )
    }
  }, [signer, address])

  return merlionClient
}
