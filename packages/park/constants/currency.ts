export interface Currency {
  readonly denom: string
  readonly decimal: number
  readonly minDenom: string
}

export const CURRENCIES: Currency[] = [
  { denom: 'lion', decimal: 18, minDenom: 'alion' },
]
