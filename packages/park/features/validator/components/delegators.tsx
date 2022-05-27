import type { FC } from 'react'

import type { Coin } from '@/constants'
import { useDelegators } from '@/hooks'
import { classNames, formatCoin, shortenAddress } from '@/utils'

export interface DelegatorsProps {
  validatorAddr: string
}

const Balance: FC<{ coin: Coin }> = ({ coin }) => {
  const balance = formatCoin(coin)

  return (
    <div>
      <span>{balance.amount}</span>
      &nbsp;
      <span className="text-sm font-semibold uppercase">{balance.denom}</span>
    </div>
  )
}

export const Delegators: FC<DelegatorsProps> = ({ validatorAddr }) => {
  const { data, isLoading } = useDelegators(validatorAddr)

  return (
    <div className="rounded-md bg-white p-6 dark:bg-neutral-800">
      <h3 className="mb-6 border-b  pb-4 text-lg font-medium dark:border-b-slate-600">
        Delegators
      </h3>
      <ul className={classNames('space-y-2', isLoading && 'animate-pulse')}>
        {isLoading && (
          <>
            <li className="flex justify-between">
              <div className="h-5 w-32 rounded bg-slate-100 dark:bg-slate-600" />
              <div className="h-5 w-28 rounded bg-slate-100 dark:bg-slate-600" />
            </li>
            <li className="flex justify-between">
              <div className="h-5 w-28 rounded bg-slate-100 dark:bg-slate-600" />
              <div className="h-5 w-24 rounded bg-slate-100 dark:bg-slate-600" />
            </li>
            <li className="flex justify-between">
              <div className="h-5 w-24 rounded bg-slate-100 dark:bg-slate-600" />
              <div className="h-5 w-32 rounded bg-slate-100 dark:bg-slate-600" />
            </li>
            <li className="flex justify-between">
              <div className="h-5 w-28 rounded bg-slate-100 dark:bg-slate-600" />
              <div className="h-5 w-28 rounded bg-slate-100 dark:bg-slate-600" />
            </li>
          </>
        )}
        {data?.delegationResponses.map((d) => (
          <li
            key={d.delegation.delegatorAddress}
            className="flex items-center justify-between"
          >
            <div>
              <a
                href="@/features/validator/components/delegators#"
                className="font-medium hover:text-cyan-600"
              >
                {shortenAddress(d.delegation?.delegatorAddress)}
              </a>
            </div>
            <Balance coin={d.balance} />
          </li>
        ))}
      </ul>
    </div>
  )
}
