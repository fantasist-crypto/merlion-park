import type { MessageType } from '@protobuf-ts/runtime'
import { MsgSend } from '@merlion/proto/cosmos/bank/v1beta1/tx'
import { MsgGrant } from '@merlion/proto/cosmos/authz/v1beta1/tx'

export * from './types'
export * from './bank'
export * from './staking'

// TODO: remove any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type MsgDecoderRegistry = Map<string, MessageType<any>>

export const getMsgDecoderRegistry = () => {
  const registry: MsgDecoderRegistry = new Map()

  registry.set(`/${MsgGrant.typeName}`, MsgGrant)
  registry.set(`/${MsgSend.typeName}`, MsgSend)

  return Object.freeze(registry)
}
