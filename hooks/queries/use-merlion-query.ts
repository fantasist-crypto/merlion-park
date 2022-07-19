import { useMemo } from 'react'
import { MerlionClient } from '@merjs/core'
import {
  useQueries,
  useQuery,
  type UseQueryResult,
} from '@tanstack/react-query'
import { useMerlionClient } from '../use-merlion-client'

type Fn = (...args: any[]) => any

export function useMerlionQuery<
  Module extends keyof MerlionClient['query'],
  Method extends keyof MerlionClient['query'][Module],
  Params extends MerlionClient['query'][Module][Method] extends Fn
    ? Parameters<MerlionClient['query'][Module][Method]>
    : never,
  Result extends MerlionClient['query'][Module][Method] extends Fn
    ? Awaited<ReturnType<MerlionClient['query'][Module][Method]>>
    : never,
>(
  module: Module,
  method: Method,
  params: Params[0],
): UseQueryResult<Result['response']> {
  const client = useMerlionClient()

  const queryFn = useMemo(() => {
    if (!client) return

    if (!(module in client.query))
      throw new Error(`Module ${module} not found in Merlion client query`)

    if (!(method in client.query[module]))
      throw new Error(
        `Method ${String(
          method,
        )} not found in module ${module} of Merlion client query`,
      )

    return client.query[module][method] as any as (
      ...args: Params
    ) => Promise<Result>
  }, [client, method, module])

  return useQuery(
    [module, method, ...getKeyValues(params)],
    async () => {
      const { response, status }: Result = await queryFn.apply(
        client.query[module],
        [params[0]],
      )

      if (status.code !== 'OK') {
        throw new Error('') // TODO
      }

      return response as unknown
    },
    {
      enabled: !!client && params !== undefined && params !== null,
    },
  )
}

export function useMerlionQueries<
  Module extends keyof MerlionClient['query'],
  Method extends keyof MerlionClient['query'][Module],
  Params extends MerlionClient['query'][Module][Method] extends Fn
    ? Parameters<MerlionClient['query'][Module][Method]>
    : never,
  Result extends MerlionClient['query'][Module][Method] extends Fn
    ? Awaited<ReturnType<MerlionClient['query'][Module][Method]>>
    : never,
>(
  module: Module,
  method: Method,
  ...params: Params
): UseQueryResult<Result['response']>[] {
  const client = useMerlionClient()

  const queryFn = useMemo(() => {
    if (!client) return

    if (!(module in client.query))
      throw new Error(`Module ${module} not found in Merlion client query`)

    if (!(method in client.query[module]))
      throw new Error(
        `Method ${String(
          method,
        )} not found in module ${module} of Merlion client query`,
      )

    return client.query[module][method] as any as (
      ...args: Params
    ) => Promise<Result>
  }, [client, method, module])

  return useQueries({
    queries: params.map((p) => ({
      queryKey: [module, method, ...getKeyValues(p)],
      queryFn: async () => {
        const { response, status }: Result = await queryFn.apply(
          client.query[module],
          [params[0]],
        )

        if (status.code !== 'OK') {
          throw new Error('') // TODO
        }

        return response as unknown
      },
      enabled: queryFn && params.every((p) => p !== undefined && p !== null),
    })),
  })
}

function getKeyValues(obj: object): string[] {
  return Object.keys(obj)
    .map((key) => [key, obj[key]])
    .flatMap((keyValues) => keyValues)
}
