import BigNumber from 'bignumber.js'

import { Coin, CURRENCIES } from '@/constants'

export const parseCoin = (coin: Coin): Coin => {
  const currency = CURRENCIES.find(
    (c) => coin.denom === c.denom || coin.denom === c.minDenom,
  )

  if (!currency) throw new Error(`not supported coin: ${coin.denom}`)

  const amount = new BigNumber(coin.amount)

  if (coin.denom === currency.denom) {
    const decimal = new BigNumber(10).pow(currency.decimal)

    return {
      denom: currency.minDenom,
      amount: amount.times(decimal).toString(),
    }
  }

  if (coin.denom === currency.minDenom) return coin
}

export function formatCoin(coin: Coin, decimalPlaces: number = 6): Coin {
  const currency = CURRENCIES.find(
    (c) => coin.denom === c.denom || coin.denom === c.minDenom,
  )

  if (!currency) throw new Error(`not supported coin: ${coin.denom}`)

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
