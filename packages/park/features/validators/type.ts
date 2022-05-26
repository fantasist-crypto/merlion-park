export interface Validator {
  operatorAddress: string
  description: {
    moniker: string
    identity: string
    website: string
    securityContact: string
    details: string
  }
  votingPower: string
  commission: number
  uptime: number
  rewards: {
    amount: string
    denom: string
  }
}
