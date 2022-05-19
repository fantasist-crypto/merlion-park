import { GrpcWebFetchTransport } from '@protobuf-ts/grpcweb-transport'
import { fromHex } from '@cosmjs/encoding'

import type { IServiceClient } from '@merlion/proto/cosmos/tx/v1beta1/service.client'
import { ServiceClient } from '@merlion/proto/cosmos/tx/v1beta1/service.client'
import { GetTxsEventRequest } from '@merlion/proto/cosmos/tx/v1beta1/service'
import { TxMsgData } from '@merlion/proto/cosmos/base/abci/v1beta1/abci'
import { Tx as CosmosTx } from '@merlion/proto/cosmos/tx/v1beta1/tx'
import { getMsgDecoderRegistry, MsgDecoderRegistry } from './messages'
import { ArrayLog, JsonLog, Tx } from './tx'
import { getQuerier, Querier } from './query'

export interface Options {
  /** A gRPC-web url, by default on port 9091 */
  grpcWebUrl: string
}

export class MerlionClient {
  public readonly query: Querier
  protected readonly txService: IServiceClient
  protected readonly msgDecoderRegistry: MsgDecoderRegistry

  constructor({ grpcWebUrl: baseUrl }: Options) {
    const transport = new GrpcWebFetchTransport({ baseUrl })

    this.query = getQuerier(transport)

    this.txService = new ServiceClient(transport)

    this.msgDecoderRegistry = getMsgDecoderRegistry()
  }

  public async getTx(hash: string): Promise<Tx | null> {
    const results = await this.txsQuery(`tx.hash='${hash}'`)
    return results[0] ?? null
  }

  private async txsQuery(query: string): Promise<Tx[]> {
    const request = GetTxsEventRequest.create({
      events: query.split(' AND ').map((q) => q.trim()),
    })
    const { response } = await this.txService.getTxsEvent(request)

    return await Promise.all(
      response.txResponses.map(async (tx) => {
        let rawLog: string = tx.rawLog
        let jsonLog: JsonLog | undefined
        let arrayLog: ArrayLog | undefined
        if (tx.code === 0 && rawLog !== '') {
          jsonLog = JSON.parse(rawLog) as JsonLog

          arrayLog = []
          for (let msgIndex = 0; msgIndex < jsonLog.length; msgIndex++) {
            if (jsonLog[msgIndex].msg_index === undefined) {
              jsonLog[msgIndex].msg_index = msgIndex
              // See https://github.com/cosmos/cosmos-sdk/pull/11147
            }

            const log = jsonLog[msgIndex]
            for (const event of log.events) {
              for (const attr of event.attributes) {
                // Try to decrypt
                if (event.type === 'wasm') {
                  // TODO
                }

                arrayLog.push({
                  msg: msgIndex,
                  type: event.type,
                  key: attr.key,
                  value: attr.value,
                })
              }
            }
          }
        } else if (tx.code !== 0 && rawLog !== '') {
          try {
            const errorMessageRgx =
              /; message index: (\d+): encrypted: (.+?): (?:instantiate|execute|query) contract failed/g
            const rgxMatches = errorMessageRgx.exec(rawLog)
            if (rgxMatches?.length === 3) {
              try {
              } catch (e) {}
            }
          } catch (decryptionError) {
            // Not encrypted or can't decrypt because not original sender
          }
        }

        const txMsgData = TxMsgData.fromBinary(fromHex(tx.data))
        const data = new Array<Uint8Array>(txMsgData.data.length)

        // Decode input messages
        const decodedTx = CosmosTx.fromBinary(tx.tx!.value)
        for (let i = 0; i < decodedTx.body!.messages.length; i++) {
          const { typeUrl, value: msgBytes } = decodedTx.body!.messages[i]
          const msgDecoder = this.msgDecoderRegistry.get(typeUrl.slice(1))
          if (!msgDecoder) continue

          decodedTx.body!.messages[i] = {
            typeUrl,
            value: msgDecoder.fromBinary(msgBytes),
          }
        }

        return {
          height: Number(tx.height),
          transactionHash: tx.txhash,
          code: tx.code,
          tx: decodedTx,
          txBytes: tx.tx!.value,
          rawLog,
          jsonLog,
          arrayLog,
          data,
          gasUsed: Number(tx.gasUsed),
          gasWanted: Number(tx.gasWanted),
        }
      }),
    )
  }
}
