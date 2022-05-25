import type { Any } from '@merlion/proto/google/protobuf/any'
import type {
  BaseAccount,
  ModuleAccount,
} from '@merlion/proto/cosmos/auth/v1beta1/auth'
import type { BaseVestingAccount } from '@merlion/proto/cosmos/vesting/v1beta1/vesting'
import type { EthAccount } from '@merlion/proto/ethermint/types/v1/account'

type AccountData = {
  type: 'EthAccount' | 'BaseAccount' | 'ModuleAccount' | 'BaseVestingAccount'
  account: EthAccount | BaseAccount | ModuleAccount | BaseVestingAccount
}

export type Account = AccountData

/**
 * Takes an `Any` encoded account from the chain and converts it into common `Account` types.
 * Adapted from https://github.com/cosmos/cosmjs/blob/main/packages/stargate/src/accounts.ts#L38-L89
 */
export async function accountFromAny({
  typeUrl,
  value,
}: Any): Promise<Account> {
  switch (typeUrl) {
    case '/ethermint.types.v1.EthAccount':
      return {
        type: 'EthAccount',
        account: (
          await import('@merlion/proto/ethermint/types/v1/account')
        ).EthAccount.fromBinary(value),
      }
    case '/cosmos.auth.v1beta1.BaseAccount':
      return {
        type: 'BaseAccount',
        account: (
          await import('@merlion/proto/cosmos/auth/v1beta1/auth')
        ).BaseAccount.fromBinary(value),
      }
    case '/cosmos.auth.v1beta1.ModuleAccount':
      return {
        type: 'ModuleAccount',
        account: (
          await import('@merlion/proto/cosmos/auth/v1beta1/auth')
        ).ModuleAccount.fromBinary(value),
      }
    case '/cosmos.vesting.v1beta1.BaseVestingAccount':
      return {
        type: 'BaseVestingAccount',
        account: (
          await import('@merlion/proto/cosmos/vesting/v1beta1/vesting')
        ).BaseVestingAccount.fromBinary(value),
      }
    default:
      throw new Error(`Unsupported type: ${typeUrl}`)
  }
}
