import { FC, useMemo } from 'react'
import BigNumber from 'bignumber.js'
import numeral from 'numeral'
import type { Validator } from '@merlion/sdk/dist/proto/cosmos/staking/v1beta1/staking'

import { useValidatorRewards } from '@/hooks'
import { classNames } from '@/utils'

export interface ValidatorRewardsProps {
  validator: Validator
  className?: string
}

export const ValidatorRewards: FC<ValidatorRewardsProps> = ({
  validator,
  className,
}) => {
  const { data, isLoading } = useValidatorRewards(validator.operatorAddress)
  const amount = useMemo(() => {
    const rewards = new BigNumber(data?.amount ?? 0)
      .div(validator.tokens)
      .multipliedBy(100) // TODO
    const amountNumeral = numeral(rewards ?? null)
    const amountNum = Number(rewards ?? 0)
    return amountNum > 1000
      ? amountNumeral.format('0.00a')
      : amountNumeral.format('0.000000')
  }, [data?.amount, validator.tokens])

  return (
    <div className={classNames('flex h-6 justify-end', className)}>
      <div
        className={classNames(
          'uppercase',
          isLoading && 'w-32 animate-pulse rounded bg-slate-100',
        )}
      >
        {data && `${amount} ${data?.denom}`}
      </div>
    </div>
  )
}
