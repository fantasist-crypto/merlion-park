import { Any } from '@merlion/proto/google/protobuf/any'
import {
  BaseAccount,
  ModuleAccount,
} from '@merlion/proto/cosmos/auth/v1beta1/auth'
import { BaseVestingAccount } from '@merlion/proto/cosmos/vesting/v1beta1/vesting'
import { EthAccount } from '@merlion/proto/ethermint/types/v1/account'

type AccountData = {
  type: 'EthAccount' | 'BaseAccount' | 'ModuleAccount' | 'BaseVestingAccount'
  account: EthAccount | BaseAccount | ModuleAccount | BaseVestingAccount
}

export type Account = AccountData

/**
 * Takes an `Any` encoded account from the chain and converts it into common `Account` types.
 * Adapted from https://github.com/cosmos/cosmjs/blob/main/packages/stargate/src/accounts.ts#L38-L89
 */
export function accountFromAny({ typeUrl, value }: Any): Account {
  switch (typeUrl) {
    case '/ethermint.types.v1.EthAccount':
      return {
        type: 'EthAccount',
        account: EthAccount.fromBinary(value),
      }
    case '/cosmos.auth.v1beta1.BaseAccount':
      return {
        type: 'BaseAccount',
        account: BaseAccount.fromBinary(value),
      }
    case '/cosmos.auth.v1beta1.ModuleAccount':
      return { type: 'ModuleAccount', account: ModuleAccount.fromBinary(value) }
    case '/cosmos.vesting.v1beta1.BaseVestingAccount':
      return {
        type: 'BaseVestingAccount',
        account: BaseVestingAccount.fromBinary(value),
      }
    default:
      throw new Error(`Unsupported type: ${typeUrl}`)
  }
}
