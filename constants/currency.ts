import { DENOM, DECIMALS, MINIMAL_DENOM } from './env'

export interface Currency {
  readonly denom: string
  readonly decimal: number
  readonly minDenom: string
}

export const LION: Currency = {
  denom: DENOM,
  decimal: DECIMALS,
  minDenom: MINIMAL_DENOM,
}

export const USD: Currency = {
  denom: 'usd',
  decimal: 6,
  minDenom: 'uusd',
}

export const CURRENCIES: Currency[] = [LION, USD]
