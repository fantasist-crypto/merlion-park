import { FC, useMemo } from 'react'
import BigNumber from 'bignumber.js'
import numeral from 'numeral'

import { useMissCounter, useOracleParams } from '@/hooks'
import { classNames } from '@/utils'

export interface MissCounterProps {
  validatorAddr: string
  className?: string
}

export const MissCounter: FC<MissCounterProps> = ({
  className,
  validatorAddr,
}) => {
  const { data: missCounter, isLoading: isMissCounterLoading } =
    useMissCounter(validatorAddr)
  const { data: oracleParams, isLoading: isOracleParamsLoading } =
    useOracleParams()

  const missRate = useMemo(
    () =>
      new BigNumber(missCounter ?? 0)
        .div(oracleParams?.slashWindow ?? 0)
        .toFixed(4),
    [missCounter, oracleParams],
  )

  return (
    <div className={classNames('flex h-6 justify-end', className)}>
      <div
        className={classNames(
          'uppercase',
          isMissCounterLoading &&
            isOracleParamsLoading &&
            'w-20 animate-pulse rounded bg-slate-100',
        )}
      >
        {numeral(1 - Number(missRate)).format('0.00%')}
      </div>
    </div>
  )
}
