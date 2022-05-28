import { bech32 } from 'bech32'

import { BECH32_PREFIX } from '@/constants'

export const validatorToDelegatorAddress = (address: string) => {
  const decode = bech32.decode(address).words
  return bech32.encode(BECH32_PREFIX, decode)
}
