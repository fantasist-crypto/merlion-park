import { useMemo } from 'react'
import { useQueries } from '@tanstack/react-query'

import {
  useMerlionClient,
  useOracleParams,
  usePool,
  useValidators,
} from '@/hooks'
import { Validator } from './type'
import BigNumber from 'bignumber.js'
import { LION, LION_DECIMAL } from '@/constants'

export const useValidatorsData = (
  { status = '' }: { status?: string } = { status: '' },
) => {
  const merlionClient = useMerlionClient()
  const { data: pool, isLoading: isPoolLoading } = usePool()
  const { data: oracleParams, isLoading: isOracleParamsLoading } =
    useOracleParams()

  const { data: validatorsData, isLoading: isValidatorsLoading } =
    useValidators({ status })

  const missCounters = useQueries({
    queries:
      validatorsData?.validators.map(({ operatorAddress }) => ({
        queryKey: ['missCounter', operatorAddress],
        queryFn: async () => {
          const { response, status } =
            await merlionClient.query.oracle.missCounter({
              validatorAddr: operatorAddress,
            })

          return response.missCounter
        },
        enabled: !!merlionClient,
      })) ?? [],
  })

  const validatorRewards = useQueries({
    queries:
      validatorsData?.validators.map(({ operatorAddress }, i) => ({
        queryKey: ['validatorRewards', operatorAddress],
        queryFn: async () => {
          const { response, status } =
            await merlionClient.query.distribution.validatorOutstandingRewards({
              validatorAddress: operatorAddress,
            })

          const coin = response.rewards?.rewards.find(
            (c) => c.denom.toLowerCase() === LION.minDenom,
          )
          const amount = new BigNumber(coin?.amount ?? 0).toString()

          return { amount, denom: LION.minDenom }
        },
        enabled: !!merlionClient,
      })) ?? [],
  })

  const data: Validator[] = useMemo(() => {
    if (!validatorsData) return []

    const bondedTokens = pool?.bondedTokens
    const slashWindow = oracleParams?.slashWindow

    return validatorsData.validators.map((validator, index) => {
      const votingPower = bondedTokens
        ? new BigNumber(validator.tokens).div(bondedTokens).toFixed(4)
        : null

      const commission = validator.commission?.commissionRates?.rate
        ? new BigNumber(validator.commission?.commissionRates?.rate ?? 0)
            .div(LION_DECIMAL)
            .toNumber()
        : null

      const missCounter = missCounters[index].data
      const uptime =
        slashWindow && missCounter
          ? 1 - Number(new BigNumber(missCounter).div(slashWindow).toFixed(4))
          : null

      // const denom = validatorRewards[index].data?.denom ?? ''
      const rewardAmount = validatorRewards[index].data?.amount
      const amount = new BigNumber(rewardAmount ?? 0)
        .div(validator.tokens)
        .multipliedBy(100)
        .toFixed(6)

      return {
        operatorAddress: validator.operatorAddress,
        description: validator.description,
        votingPower,
        commission,
        uptime,
        rewards: { amount, denom: LION.denom },
        status: validator.status,
      }
    })
  }, [missCounters, validatorsData, oracleParams, pool, validatorRewards])

  return {
    data,
    missCounters,
    validatorRewards,
    isPoolLoading,
    isOracleParamsLoading,
    isValidatorsLoading,
  }
}
