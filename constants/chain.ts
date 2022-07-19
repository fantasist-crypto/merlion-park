import type { ChainInfo, Currency } from '@keplr-wallet/types'
import {
  DENOM,
  DECIMALS,
  MINIMAL_DENOM,
  BECH32_PREFIX,
  CHAIN_ID,
  RPC_ENDPOINT,
  REST_ENDPOINT,
} from './env'

const LION: Currency = {
  coinDenom: DENOM,
  coinDecimals: DECIMALS,
  coinMinimalDenom: MINIMAL_DENOM,
}

export const CHAIN_INFO: ChainInfo = {
  chainId: CHAIN_ID,
  chainName: 'Merlion Testnet',
  rpc: RPC_ENDPOINT,
  rest: REST_ENDPOINT,
  bip44: {
    coinType: 60,
  },
  bech32Config: {
    bech32PrefixAccAddr: BECH32_PREFIX,
    bech32PrefixAccPub: BECH32_PREFIX + 'pub',
    bech32PrefixValAddr: BECH32_PREFIX + 'valoper',
    bech32PrefixValPub: BECH32_PREFIX + 'valoperpub',
    bech32PrefixConsAddr: BECH32_PREFIX + 'valcons',
    bech32PrefixConsPub: BECH32_PREFIX + 'valconspub',
  },
  currencies: [LION],
  feeCurrencies: [LION],
  stakeCurrency: LION,
  coinType: 60,
  gasPriceStep: {
    low: 0.05,
    average: 0.25,
    high: 0.4,
  },
}
