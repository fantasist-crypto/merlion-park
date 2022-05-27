import { FC, useMemo } from 'react'
import { formatDistanceToNow } from 'date-fns'
import numeral from 'numeral'
import type { Commission } from '@merlion/proto/cosmos/staking/v1beta1/staking'
import { Timestamp } from '@merlion/proto/google/protobuf/timestamp'

import { classNames, formatCommissionRates } from '@/utils'

export interface CommissionProps {
  commission?: Commission
  isLoading?: boolean
}

export const CommissionCard: FC<CommissionProps> = ({
  commission,
  isLoading,
}) => {
  const commissionRates = useMemo(() => {
    if (isLoading || !commission) return null
    return formatCommissionRates(commission.commissionRates)
  }, [commission, isLoading])

  const commissionUpdateTime = useMemo(() => {
    if (isLoading || !commission) return null
    return Timestamp.toDate(commission.updateTime)
  }, [commission, isLoading])

  return (
    <div className="rounded-md bg-white px-6 dark:bg-neutral-800">
      <h3 className="border-b py-4 text-lg font-medium dark:border-b-slate-600">
        Commission
      </h3>
      <div className="grid grid-cols-2 gap-y-8 py-6">
        <div>
          <div className="mb-1 text-sm font-medium text-slate-600 dark:text-slate-400">
            Current
          </div>
          <div
            className={classNames(
              'text-2xl font-medium',
              isLoading &&
                'h-8 w-32 animate-pulse rounded bg-slate-100 dark:bg-slate-600',
            )}
          >
            {commissionRates && numeral(commissionRates.rate).format('0.00%')}
          </div>
        </div>

        <div>
          <div className="mb-1 text-sm font-medium text-slate-600 dark:text-slate-400">
            Last changed
          </div>
          <div
            className={classNames(
              'text-2xl font-medium',
              isLoading &&
                'h-8 w-40 animate-pulse rounded bg-slate-100 dark:bg-slate-600',
            )}
          >
            {commissionUpdateTime &&
              formatDistanceToNow(commissionUpdateTime, {
                addSuffix: true,
              })}
          </div>
        </div>

        <div>
          <div className="mb-1 text-sm font-medium text-slate-600 dark:text-slate-400">
            Max
          </div>
          <div
            className={classNames(
              'text-2xl font-medium',
              isLoading &&
                'h-8 w-36 animate-pulse rounded bg-slate-100 dark:bg-slate-600',
            )}
          >
            {commissionRates &&
              numeral(commissionRates.maxRate).format('0.00%')}
          </div>
        </div>

        <div>
          <div className="mb-1 text-sm font-medium text-slate-600 dark:text-slate-400">
            Max daily change
          </div>
          <div
            className={classNames(
              'text-2xl font-medium',
              isLoading &&
                'h-8 w-32 animate-pulse rounded bg-slate-100 dark:bg-slate-600',
            )}
          >
            {commissionRates &&
              numeral(commissionRates.maxChangeRate).format('0.00%')}
          </div>
        </div>
      </div>
    </div>
  )
}
