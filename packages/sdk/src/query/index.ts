import {
  QueryClient as AuthQueryClient,
  IQueryClient as IAuthQueryClient,
} from '../proto/cosmos/auth/v1beta1/query.client'
import {
  QueryClient as AuthzQueryClient,
  IQueryClient as IAuthzQueryClient,
} from '../proto/cosmos/authz/v1beta1/query.client'
import {
  QueryClient as BankQueryClient,
  IQueryClient as IBankQueryClient,
} from '../proto/cosmos/bank/v1beta1/query.client'
import {
  QueryClient as DistributionQueryClient,
  IQueryClient as IDistributionQueryClient,
} from '../proto/cosmos/distribution/v1beta1/query.client'
import {
  QueryClient as EvidenceQueryClient,
  IQueryClient as IEvidenceQueryClient,
} from '../proto/cosmos/evidence/v1beta1/query.client'
import {
  QueryClient as FeegrantQueryClient,
  IQueryClient as IFeegrantQueryClient,
} from '../proto/cosmos/feegrant/v1beta1/query.client'
import {
  QueryClient as GovQueryClient,
  IQueryClient as IGovQueryClient,
} from '../proto/cosmos/gov/v1beta1/query.client'
import {
  QueryClient as MintQueryClient,
  IQueryClient as IMintQueryClient,
} from '../proto/cosmos/mint/v1beta1/query.client'
import {
  QueryClient as ParamsQueryClient,
  IQueryClient as IParamsQueryClient,
} from '../proto/cosmos/params/v1beta1/query.client'
import {
  QueryClient as SlashingQueryClient,
  IQueryClient as ISlashingQueryClient,
} from '../proto/cosmos/slashing/v1beta1/query.client'
import {
  QueryClient as StakingQueryClient,
  IQueryClient as IStakingQueryClient,
} from '../proto/cosmos/staking/v1beta1/query.client'
import {
  ServiceClient as TendermintQueryClient,
  IServiceClient as ITendermintQueryClient,
} from '../proto/cosmos/base/tendermint/v1beta1/query.client'
import {
  QueryClient as UpgradeQueryClient,
  IQueryClient as IUpgradeQueryClient,
} from '../proto/cosmos/upgrade/v1beta1/query.client'
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
})
