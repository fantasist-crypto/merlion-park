import BigNumber from 'bignumber.js'

import { Coin, CURRENCIES } from '@/constants'
import { CommissionRates } from '@merlion/proto/cosmos/staking/v1beta1/staking'

export function shortenAddress(address: string, chars = 4): string {
  // TODO: check address
  return `${address.slice(0, 5)}...${address.slice(-chars)}`
}

export function formatCoin(coin: Coin, decimalPlaces: number = 6): Coin {
  const currency = CURRENCIES.find(
    (c) => coin.denom === c.denom || coin.denom === c.minDenom,
  )

  if (!currency) throw new Error(`not supported coin: ${coin}`)

  const amount = new BigNumber(coin.amount)

  if (coin.denom === currency.denom)
    return {
      denom: coin.denom,
      amount: amount.toFixed(decimalPlaces),
    }

  if (coin.denom === currency.minDenom) {
    const decimal = new BigNumber(10).pow(currency.decimal)
    return {
      denom: currency.denom,
      amount: amount.div(decimal).toFixed(decimalPlaces),
    }
  }
}

const DECIMAL = '1000000000000000000'

export const formatCommissionRates = (
  rates?: CommissionRates,
): CommissionRates => {
  if (!rates) return { rate: '0', maxRate: '0', maxChangeRate: '0' }

  const maxChangeRate = new BigNumber(rates.maxChangeRate).div(DECIMAL).toFixed(4)
  const maxRate = new BigNumber(rates.maxRate).div(DECIMAL).toFixed(4)
  const rate = new BigNumber(rates.rate).div(DECIMAL).toFixed(4)
  return { rate, maxRate, maxChangeRate }
}
