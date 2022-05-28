import BigNumber from 'bignumber.js'

import type { CommissionRates } from '@merlion/proto/cosmos/staking/v1beta1/staking'

export function shortenAddress(address: string, chars = 4): string {
  // TODO: check address
  return `${address.slice(0, 4)}...${address.slice(-chars)}`
}

const DECIMAL = '1000000000000000000'

export const formatCommissionRates = (
  rates?: CommissionRates,
): CommissionRates => {
  if (!rates) return { rate: '0', maxRate: '0', maxChangeRate: '0' }

  const maxChangeRate = new BigNumber(rates.maxChangeRate)
    .div(DECIMAL)
    .toFixed(4)
  const maxRate = new BigNumber(rates.maxRate).div(DECIMAL).toFixed(4)
  const rate = new BigNumber(rates.rate).div(DECIMAL).toFixed(4)
  return { rate, maxRate, maxChangeRate }
}
