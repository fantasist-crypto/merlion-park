import { MessageType } from '@protobuf-ts/runtime'
import { MsgSend } from '../proto/cosmos/bank/v1beta1/tx'
import { MsgGrant } from '../proto/cosmos/authz/v1beta1/tx'
export * from './types'

// TODO: remove any
export type MsgDecoderRegistry = Map<string, MessageType<any>>

export const getMsgDecoderRegistry = () => {
  const registry: MsgDecoderRegistry = new Map()

  registry.set(`/${MsgGrant.typeName}`, MsgGrant)
  registry.set(`${MsgSend.typeName}`, MsgSend)

  return Object.freeze(registry)
}
