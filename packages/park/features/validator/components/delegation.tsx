import type { FC } from 'react'
import { useMemo } from 'react'

import { useDelegation, useKeplr } from '@/hooks'
import { formatCoin } from '@/utils'
import { Delegate } from './delegate'
import { Redelegate } from './redelegate'
import { Undelegate } from './undelegate'

export interface DelegationProps {
  validatorAddr?: string
}

export const Delegation: FC<DelegationProps> = ({ validatorAddr }) => {
  const { address } = useKeplr()
  const { data } = useDelegation(validatorAddr, address)
  const balance = useMemo(() => data && formatCoin(data.balance), [data])

  return (
    <div className="flex-[2] space-y-6 rounded-md bg-white p-6 dark:bg-slate-700">
      <h3 className="font-medium">My delegations</h3>
      <div>
        <div>
          <span className="text-3xl font-medium">{balance?.amount ?? '0'}</span>
          &nbsp;
          <span className="text-sm font-semibold">{balance?.denom}</span>
        </div>
        <div className="text-xs">≈ 0USM</div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Delegate validatorAddr={validatorAddr} />
        <Redelegate validatorAddr={validatorAddr} />
        <Undelegate validatorAddr={validatorAddr} />
      </div>
    </div>
  )
}
