import { LION } from './chain'

export interface Currency {
  readonly denom: string
  readonly decimal: number
  readonly minDenom: string
}

export const CURRENCIES: Currency[] = [
  {
    denom: LION.coinDenom,
    decimal: LION.coinDecimals,
    minDenom: LION.coinMinimalDenom,
  },
]
