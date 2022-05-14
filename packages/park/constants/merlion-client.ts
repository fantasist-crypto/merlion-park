import { MerlionClient } from '@merlion/sdk'

export const merlionClient = new MerlionClient({
  grpcWebUrl: process.env.grpcWebUrl,
})
