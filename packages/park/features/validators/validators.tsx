import { FC, useMemo, useState } from 'react'
import Link from 'next/link'
import BigNumber from 'bignumber.js'
import numeral from 'numeral'
import Fuse from 'fuse.js'
import clsx from 'clsx'

import { Layout } from '@/components'
import { LION_DECIMAL } from '@/constants'
import { useValidators, usePool } from '@/hooks'
import { MissCounter, Skeleton, ValidatorRewards } from './components'

// TODO
numeral.nullFormat('N/A')

export const Validators: FC = () => {
  const {
    data: poolData,
    isError: isPoolError,
    isLoading: isPoolLoading,
  } = usePool()
  const {
    data: validatorsData,
    isError: isValidatorsError,
    isLoading: isValidatorsLoading,
  } = useValidators({
    status: 'BOND_STATUS_BONDED',
  })

  const [keyword, setKeyword] = useState('')

  const isError = useMemo(
    () => isPoolError && isValidatorsError,
    [isPoolError, isValidatorsError],
  )
  const isLoading = useMemo(
    () => isPoolLoading && isValidatorsLoading,
    [isPoolLoading, isValidatorsLoading],
  )

  const validators = useMemo(
    () =>
      validatorsData?.validators.map((v) => {
        const bondedTokens = poolData.pool?.bondedTokens
        const votingPower = bondedTokens
          ? new BigNumber(v.tokens).div(bondedTokens).toFixed(4)
          : null
        const commission = new BigNumber(
          v.commission?.commissionRates?.rate ?? 0,
        )
          .div(LION_DECIMAL)
          .toNumber()

        return {
          operatorAddress: v.operatorAddress,
          description: v.description,
          votingPower,
          commission,
          tokens: v.tokens,
        }
      }) ?? [],
    [poolData, validatorsData],
  )

  const validatorsFuse = useMemo(
    () =>
      new Fuse(validators, {
        includeScore: false,
        keys: ['description.moniker'],
      }),
    [validators],
  )

  const filterResult = useMemo(
    () =>
      keyword
        ? validatorsFuse.search(keyword).map(({ item }) => item)
        : validators,
    [keyword, validators, validatorsFuse],
  )

  return (
    <Layout>
      <div className="mx-auto max-w-screen-lg">
        <div className="flex items-center pt-8 pb-4">
          <h2 className="text-4xl font-semibold">Validators</h2>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-8 pb-4">
          <div className="mb-4 flex items-center rounded-lg border border-slate-200 bg-white px-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              className="ml-2 h-10 w-full bg-transparent outline-none"
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          <table className="min-w-full table-auto border-collapse text-right">
            <thead>
              <tr className="border-b border-b-slate-200 text-xs">
                <th className="py-3 text-left">Moniker</th>
                <th className="">Voting power</th>
                <th className="">Commission</th>
                <th className="">Uptime</th>
                <th className="">Rewards</th>
              </tr>
            </thead>
            <tbody
              className={clsx(
                'divide-y divide-slate-200',
                isLoading && 'animate-pulse',
              )}
            >
              {isLoading && <Skeleton />}
              {isError && (
                <tr>
                  <td className="py-16 text-center" colSpan={5}>
                    Error
                  </td>
                </tr>
              )}
              {!isLoading && !isError && !filterResult.length && (
                <tr>
                  <td className="py-16 text-center" colSpan={5}>
                    No Data
                  </td>
                </tr>
              )}
              {!isError &&
                !isLoading &&
                filterResult.map((v) => (
                  <tr key={v.operatorAddress} className="">
                    <td className="flex items-center space-x-2 py-4 text-left text-base font-semibold">
                      <Link href={`/validators/${v.operatorAddress}`}>
                        <a>{v.description.moniker}</a>
                      </Link>
                      {v.description.identity && (
                        <svg
                          className="h-4 w-4 text-xs text-cyan-600"
                          focusable="false"
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="m23 12-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.69 3.1 5.5l.34 3.7L1 12l2.44 2.79-.34 3.7 3.61.82L8.6 22.5l3.4-1.47 3.4 1.46 1.89-3.19 3.61-.82-.34-3.69L23 12zm-12.91 4.72-3.8-3.81 1.48-1.48 2.32 2.33 5.85-5.87 1.48 1.48-7.33 7.35z"></path>
                        </svg>
                      )}
                    </td>
                    <td>{numeral(v.votingPower).format('0.00%')}</td>
                    <td>{numeral(v.commission).format('0.00%')}</td>
                    <td>
                      <MissCounter validatorAddr={v.operatorAddress} />
                    </td>
                    <td>
                      <ValidatorRewards validator={v as any} />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  )
}
