import {
  QueryClient as AuthQueryClient,
  IQueryClient as IAuthQueryClient,
} from '../proto/cosmos/auth/v1beta1/query.client'
import {
  QueryClient as StakingQueryClient,
  IQueryClient as IStakingQueryClient,
} from '../proto/cosmos/staking/v1beta1/query.client'
import type { GrpcWebFetchTransport } from '@protobuf-ts/grpcweb-transport'

export interface Querier {
  auth: IAuthQueryClient
  staking: IStakingQueryClient
}

export const getQuerier = (transport: GrpcWebFetchTransport): Querier => ({
  auth: new AuthQueryClient(transport),
  staking: new StakingQueryClient(transport),
})
