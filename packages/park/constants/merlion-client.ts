import { MerlionClient, ReadonlySigner } from '@merlion/sdk'

import { CHAIN_ID } from './chain'

export const merlionClient = new MerlionClient({
  grpcWebUrl: process.env.grpcWebUrl,
  signer: new ReadonlySigner(),
  chainId: CHAIN_ID,
  address: '', // TODO
})
