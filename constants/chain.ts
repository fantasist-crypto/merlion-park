import type { ChainInfo, Currency } from '@keplr-wallet/types'

export const CHAIN_ID = 'merlion_5000-101'

export const BECH32_PREFIX = process.env.BECH32_PREFIX

export const LION: Currency = {
  coinDenom: process.env.DENOM,
  coinMinimalDenom: process.env.MINIMAL_DENOM,
  coinDecimals: Number(process.env.DECIMALS),
}

export const CHAIN_INFO: ChainInfo = {
  chainId: CHAIN_ID,
  chainName: 'Merlion Testnet',
  rpc: process.env.rpcEndpoint,
  rest: process.env.restEndpoint,
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
