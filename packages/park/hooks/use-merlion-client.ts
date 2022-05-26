import { useEffect, useCallback, useState } from 'react'
import { MerlionClient } from '@merlion/sdk'

import { useKeplr } from './use-keplr'
import { CHAIN_ID } from '@/constants'

export const useMerlionClient = () => {
  const { signer, address } = useKeplr()

  const [merlionClient, setMerlionClient] = useState<MerlionClient>()

  const createMerlionClient = useCallback(async () => {
    setMerlionClient(
      await MerlionClient.create({
        grpcWebUrl: process.env.grpcWebUrl,
        signer,
        address,
        chainId: CHAIN_ID,
      }),
    )
  }, [signer, address])

  useEffect(() => {
    void createMerlionClient()
  }, [createMerlionClient])

  return merlionClient
}
