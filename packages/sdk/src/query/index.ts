import type { IQueryClient as IAuthQueryClient } from '@merlion/proto/cosmos/auth/v1beta1/query.client'
import type { IQueryClient as IAuthzQueryClient } from '@merlion/proto/cosmos/authz/v1beta1/query.client'
import type { IQueryClient as IBankQueryClient } from '@merlion/proto/cosmos/bank/v1beta1/query.client'
import type { IQueryClient as IDistributionQueryClient } from '@merlion/proto/cosmos/distribution/v1beta1/query.client'
import type { IQueryClient as IEvidenceQueryClient } from '@merlion/proto/cosmos/evidence/v1beta1/query.client'
import type { IQueryClient as IFeegrantQueryClient } from '@merlion/proto/cosmos/feegrant/v1beta1/query.client'
import type { IQueryClient as IGovQueryClient } from '@merlion/proto/cosmos/gov/v1beta1/query.client'
import type { IQueryClient as IMintQueryClient } from '@merlion/proto/cosmos/mint/v1beta1/query.client'
import type { IQueryClient as IParamsQueryClient } from '@merlion/proto/cosmos/params/v1beta1/query.client'
import type { IQueryClient as ISlashingQueryClient } from '@merlion/proto/cosmos/slashing/v1beta1/query.client'
import type { IQueryClient as IStakingQueryClient } from '@merlion/proto/cosmos/staking/v1beta1/query.client'
import type { IServiceClient as ITendermintQueryClient } from '@merlion/proto/cosmos/base/tendermint/v1beta1/query.client'
import type { IQueryClient as IUpgradeQueryClient } from '@merlion/proto/cosmos/upgrade/v1beta1/query.client'
import type { IQueryClient as IOracleQueryClient } from '@merlion/proto/merlion/oracle/v1/query.client'
import type { IQueryClient as IERC20QueryClient } from '@merlion/proto/merlion/erc20/v1/query.client'
import type { IQueryClient as IGaugeQueryClient } from '@merlion/proto/merlion/gauge/v1/query.client'
import type { IQueryClient as IMakerQueryClient } from '@merlion/proto/merlion/maker/v1/query.client'
// TODO: merlion staking
import type { IQueryClient as IVeQueryClient } from '@merlion/proto/merlion/ve/v1/query.client'
import type { IQueryClient as IVoterQueryClient } from '@merlion/proto/merlion/voter/v1/query.client'

import type { GrpcWebFetchTransport } from '@protobuf-ts/grpcweb-transport'

export interface Querier {
  auth: IAuthQueryClient
  authz: IAuthzQueryClient
  bank: IBankQueryClient
  distribution: IDistributionQueryClient
  evidence: IEvidenceQueryClient
  feegrant: IFeegrantQueryClient
  gov: IGovQueryClient
  mint: IMintQueryClient
  params: IParamsQueryClient
  slashing: ISlashingQueryClient
  staking: IStakingQueryClient
  tendermint: ITendermintQueryClient
  upgrade: IUpgradeQueryClient

  erc20: IERC20QueryClient
  gauge: IGaugeQueryClient
  maker: IMakerQueryClient
  ve: IVeQueryClient
  oracle: IOracleQueryClient
  voter: IVoterQueryClient
}

export const getQuerier = async (
  transport: GrpcWebFetchTransport,
): Promise<Querier> => ({
  auth: new (
    await import('@merlion/proto/cosmos/auth/v1beta1/query.client')
  ).QueryClient(transport),
  authz: new (
    await import('@merlion/proto/cosmos/authz/v1beta1/query.client')
  ).QueryClient(transport),
  bank: new (
    await import('@merlion/proto/cosmos/bank/v1beta1/query.client')
  ).QueryClient(transport),
  distribution: new (
    await import('@merlion/proto/cosmos/distribution/v1beta1/query.client')
  ).QueryClient(transport),
  evidence: new (
    await import('@merlion/proto/cosmos/evidence/v1beta1/query.client')
  ).QueryClient(transport),
  feegrant: new (
    await import('@merlion/proto/cosmos/feegrant/v1beta1/query.client')
  ).QueryClient(transport),
  gov: new (
    await import('@merlion/proto/cosmos/gov/v1beta1/query.client')
  ).QueryClient(transport),
  mint: new (
    await import('@merlion/proto/cosmos/mint/v1beta1/query.client')
  ).QueryClient(transport),
  params: new (
    await import('@merlion/proto/cosmos/params/v1beta1/query.client')
  ).QueryClient(transport),
  slashing: new (
    await import('@merlion/proto/cosmos/slashing/v1beta1/query.client')
  ).QueryClient(transport),
  staking: new (
    await import('@merlion/proto/cosmos/staking/v1beta1/query.client')
  ).QueryClient(transport),
  tendermint: new (
    await import('@merlion/proto/cosmos/base/tendermint/v1beta1/query.client')
  ).ServiceClient(transport),
  upgrade: new (
    await import('@merlion/proto/cosmos/upgrade/v1beta1/query.client')
  ).QueryClient(transport),

  erc20: new (
    await import('@merlion/proto/merlion/erc20/v1/query.client')
  ).QueryClient(transport),
  gauge: new (
    await import('@merlion/proto/merlion/gauge/v1/query.client')
  ).QueryClient(transport),
  maker: new (
    await import('@merlion/proto/merlion/maker/v1/query.client')
  ).QueryClient(transport),
  oracle: new (
    await import('@merlion/proto/merlion/oracle/v1/query.client')
  ).QueryClient(transport),
  ve: new (
    await import('@merlion/proto/merlion/ve/v1/query.client')
  ).QueryClient(transport),
  voter: new (
    await import('@merlion/proto/merlion/voter/v1/query.client')
  ).QueryClient(transport),
})
