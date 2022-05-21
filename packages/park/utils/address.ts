import { bech32 } from 'bech32'

export const validatorToDelegatorAddress = (address: string) => {
  const decode = bech32.decode(address).words
  return bech32.encode('mer', decode)
}
