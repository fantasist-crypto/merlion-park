import { useCallback, useEffect, useState } from 'react'
import { OfflineSigner } from '@merlion/sdk'

import { CHAIN_ID, CHAIN_INFO } from '@/constants'

export const useKeplr = () => {
  const [signer, setSigner] = useState<OfflineSigner>()
  const [address, setAddress] = useState<string>()
  const [isActive, setisActive] = useState(false)

  const connect = useCallback(async () => {
    try {
      await window.keplr.enable(CHAIN_ID)
    } catch {
      await window.keplr
        .experimentalSuggestChain(CHAIN_INFO)
        .catch((error) => console.error(error))
    }

    const offlineSigner = window.keplr.getOfflineSigner(CHAIN_ID)
    const [account] = await offlineSigner.getAccounts()
    setAddress(account.address)
    setSigner(offlineSigner)
    setisActive(true)
  }, [])

  useEffect(() => {
    if (window === undefined || !window.keplr) return
    void connect()
  }, [connect])

  return { signer, address, isActive, connect }
}
