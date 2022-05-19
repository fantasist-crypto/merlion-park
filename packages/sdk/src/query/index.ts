import {
  QueryClient as AuthQueryClient,
  IQueryClient as IAuthQueryClient,
} from '@merlion/proto/cosmos/auth/v1beta1/query.client'
import {
  QueryClient as AuthzQueryClient,
  IQueryClient as IAuthzQueryClient,
} from '@merlion/proto/cosmos/authz/v1beta1/query.client'
import {
  QueryClient as BankQueryClient,
  IQueryClient as IBankQueryClient,
} from '@merlion/proto/cosmos/bank/v1beta1/query.client'
import {
  QueryClient as DistributionQueryClient,
  IQueryClient as IDistributionQueryClient,
} from '@merlion/proto/cosmos/distribution/v1beta1/query.client'
import {
  QueryClient as EvidenceQueryClient,
  IQueryClient as IEvidenceQueryClient,
} from '@merlion/proto/cosmos/evidence/v1beta1/query.client'
import {
  QueryClient as FeegrantQueryClient,
  IQueryClient as IFeegrantQueryClient,
} from '@merlion/proto/cosmos/feegrant/v1beta1/query.client'
import {
  QueryClient as GovQueryClient,
  IQueryClient as IGovQueryClient,
} from '@merlion/proto/cosmos/gov/v1beta1/query.client'
import {
  QueryClient as MintQueryClient,
  IQueryClient as IMintQueryClient,
} from '@merlion/proto/cosmos/mint/v1beta1/query.client'
import {
  QueryClient as ParamsQueryClient,
  IQueryClient as IParamsQueryClient,
} from '@merlion/proto/cosmos/params/v1beta1/query.client'
import {
  QueryClient as SlashingQueryClient,
  IQueryClient as ISlashingQueryClient,
} from '@merlion/proto/cosmos/slashing/v1beta1/query.client'
import {
  QueryClient as StakingQueryClient,
  IQueryClient as IStakingQueryClient,
} from '@merlion/proto/cosmos/staking/v1beta1/query.client'
import {
  ServiceClient as TendermintQueryClient,
  IServiceClient as ITendermintQueryClient,
} from '@merlion/proto/cosmos/base/tendermint/v1beta1/query.client'
import {
  QueryClient as UpgradeQueryClient,
  IQueryClient as IUpgradeQueryClient,
} from '@merlion/proto/cosmos/upgrade/v1beta1/query.client'

import {
  QueryClient as OracleQueryClient,
  IQueryClient as IOracleQueryClient,
} from '@merlion/proto/merlion/oracle/v1/query.client'
import {
  QueryClient as ERC20QueryClient,
  IQueryClient as IERC20QueryClient,
} from '@merlion/proto/merlion/erc20/v1/query.client'
import {
  QueryClient as GaugeQueryClient,
  IQueryClient as IGaugeQueryClient,
} from '@merlion/proto/merlion/gauge/v1/query.client'
import {
  QueryClient as MakerQueryClient,
  IQueryClient as IMakerQueryClient,
} from '@merlion/proto/merlion/maker/v1/query.client'
// TODO: merlion staking
import {
  QueryClient as VeQueryClient,
  IQueryClient as IVeQueryClient,
} from '@merlion/proto/merlion/ve/v1/query.client'
import {
  QueryClient as VoterQueryClient,
  IQueryClient as IVoterQueryClient,
} from '@merlion/proto/merlion/voter/v1/query.client'

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

export const getQuerier = (transport: GrpcWebFetchTransport): Querier => ({
  auth: new AuthQueryClient(transport),
  authz: new AuthzQueryClient(transport),
  bank: new BankQueryClient(transport),
  distribution: new DistributionQueryClient(transport),
  evidence: new EvidenceQueryClient(transport),
  feegrant: new FeegrantQueryClient(transport),
  gov: new GovQueryClient(transport),
  mint: new MintQueryClient(transport),
  params: new ParamsQueryClient(transport),
  slashing: new SlashingQueryClient(transport),
  staking: new StakingQueryClient(transport),
  tendermint: new TendermintQueryClient(transport),
  upgrade: new UpgradeQueryClient(transport),

  erc20: new ERC20QueryClient(transport),
  gauge: new GaugeQueryClient(transport),
  maker: new MakerQueryClient(transport),
  oracle: new OracleQueryClient(transport),
  ve: new VeQueryClient(transport),
  voter: new VoterQueryClient(transport),
})
