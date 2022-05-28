import { FC, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { FaSortUp, FaSortDown } from 'react-icons/fa'
import { HiOutlineExternalLink } from 'react-icons/hi'
import numeral from 'numeral'
import Fuse from 'fuse.js'

import { EXPLORER_URL } from '@/constants'
import { Layout } from '@/components'
import { classNames } from '@/utils'
import { Skeleton } from './skeleton'
import { useValidatorsData } from './hooks'

// TODO
numeral.nullFormat('N/A')

type SortBy = 'moniker' | 'votingPower' | 'commission' | 'uptime' | 'rewards'

export const Validators: FC = () => {
  const [keyword, setKeyword] = useState<string>('')
  const sortByRef = useRef<SortBy>(null)
  const [isDesc, setIsDesc] = useState<boolean>(null)
  const [isActive, setIsActive] = useState<boolean>(true)

  const {
    data,
    missCounters,
    validatorRewards,
    isPoolLoading,
    isOracleParamsLoading,
    isValidatorsLoading: isLoading,
  } = useValidatorsData()

  const validators = useMemo(
    () => data.filter(({ status }) => (isActive ? status === 3 : status !== 3)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(data), isActive],
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

  const sortResult = useMemo(
    () =>
      sortByRef.current
        ? filterResult.sort((a, b) => {
            let aValue: unknown
            let bValue: unknown

            if (sortByRef.current === 'moniker') {
              aValue = a.description.moniker.toLowerCase()
              bValue = b.description.moniker.toLowerCase()
            } else if (sortByRef.current === 'rewards') {
              aValue = Number(a.rewards.amount)
              bValue = Number(b.rewards.amount)
            } else {
              aValue = Number(a[sortByRef.current])
              bValue = Number(b[sortByRef.current])
            }

            if (aValue < bValue) return isDesc ? 1 : -1
            if (aValue > bValue) return isDesc ? -1 : 1
            return 0
          })
        : filterResult,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filterResult, isDesc, sortByRef.current],
  )

  const changeSortBy = (key: SortBy) => {
    if (
      isLoading ||
      isPoolLoading ||
      isOracleParamsLoading ||
      !missCounters.every((v) => !v.isLoading) ||
      !validatorRewards.every((v) => !v.isLoading)
    )
      return
    if (key === sortByRef.current) {
      setIsDesc(!isDesc)
    } else {
      setIsDesc(false)
      sortByRef.current = key
    }
  }

  useEffect(() => {
    if (sortByRef.current) {
      setIsDesc(null)
      sortByRef.current = null
    }
  }, [keyword])

  return (
    <Layout>
      <div className="mx-auto max-w-screen-lg">
        <h1 className="mb-8 text-4xl font-bold text-cyan-600">
          Staking & Rewards
        </h1>
        <div className="rounded-lg bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 p-4 dark:from-indigo-700 dark:via-purple-700 dark:to-pink-700 dark:opacity-80">
          Tip: Stake Lion and earn rewards
        </div>
        <div className="mb-4 mt-8 flex items-center justify-between border-b border-gray-200 text-neutral-600 dark:border-neutral-800 dark:border-gray-700 dark:text-neutral-400">
          <ul
            className="-mb-px flex flex-wrap text-center text-sm font-medium"
            role="tablist"
          >
            <li
              className={classNames(
                'mr-2 pb-2',
                isActive && 'border-in border-b-2 border-neutral-600',
              )}
              role="presentation"
            >
              <button
                className={classNames(
                  'inline-block rounded px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-800',
                  isActive && 'text-black dark:text-neutral-50',
                )}
                type="button"
                onClick={() => setIsActive(true)}
                role="tab"
                aria-controls="active"
                aria-selected="false"
              >
                Active
              </button>
            </li>
            <li
              className={classNames(
                'mr-2 pb-2',
                !isActive && 'border-b-2 border-gray-600',
              )}
              role="presentation"
            >
              <button
                className={classNames(
                  'inline-block rounded px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-800',
                  !isActive && 'text-black dark:text-neutral-50',
                )}
                type="button"
                onClick={() => setIsActive(false)}
                role="tab"
                aria-controls="inactive"
                aria-selected="false"
              >
                Inactive
              </button>
            </li>
            <li className="ml-2 hidden pb-2 md:flex md:items-center">
              <a
                href={`${EXPLORER_URL}/validators`}
                className="mr-2 flex items-center text-xs hover:text-cyan-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                view on explorer
                <HiOutlineExternalLink className="ml-1" />
              </a>
            </li>
          </ul>
          <div className="pr-6 text-cyan-600">
            <span>Total: {validators.length}</span>
          </div>
        </div>
        <div className="rounded-lg border border-gray-100 bg-white p-8 pb-4 dark:border-neutral-700 dark:bg-neutral-800">
          <div className="mb-4 flex items-center rounded-lg border border-slate-200 px-2 dark:border-neutral-700">
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
              className="h-10 w-full border-none bg-transparent outline-none focus:ring-0"
              type="text"
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value)
              }}
            />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] table-auto border-collapse text-right">
              <thead>
                <tr className="border-b border-b-neutral-100 text-sm dark:border-b-neutral-700">
                  <th className="py-3 text-left">
                    <button
                      className="flex items-center font-semibold"
                      onClick={() => changeSortBy('moniker')}
                    >
                      Moniker
                      <span className="relative inline-block h-4 w-4">
                        <FaSortUp
                          className={classNames(
                            'absolute ml-0.5',
                            sortByRef.current === 'moniker' && !isDesc
                              ? ''
                              : 'text-gray-200',
                          )}
                        />
                        <FaSortDown
                          className={classNames(
                            'absolute ml-0.5',
                            sortByRef.current === 'moniker' && isDesc
                              ? ''
                              : 'text-gray-200',
                          )}
                        />
                      </span>
                    </button>
                  </th>
                  <th>
                    <button
                      className="inline-flex items-center font-semibold"
                      onClick={() => changeSortBy('votingPower')}
                    >
                      Voting power
                      <span className="relative inline-block h-4 w-4">
                        <FaSortUp
                          className={classNames(
                            'absolute ml-0.5',
                            sortByRef.current === 'votingPower' && !isDesc
                              ? ''
                              : 'text-gray-200',
                          )}
                        />
                        <FaSortDown
                          className={classNames(
                            'absolute ml-0.5',
                            sortByRef.current === 'votingPower' && isDesc
                              ? ''
                              : 'text-gray-200',
                          )}
                        />
                      </span>
                    </button>
                  </th>
                  <th>
                    <button
                      className="inline-flex items-center font-semibold"
                      onClick={() => changeSortBy('commission')}
                    >
                      Commission
                      <span className="relative inline-block h-4 w-4">
                        <FaSortUp
                          className={classNames(
                            'absolute ml-0.5',
                            sortByRef.current === 'commission' && !isDesc
                              ? ''
                              : 'text-gray-200',
                          )}
                        />
                        <FaSortDown
                          className={classNames(
                            'absolute ml-0.5',
                            sortByRef.current === 'commission' && isDesc
                              ? ''
                              : 'text-gray-200',
                          )}
                        />
                      </span>
                    </button>
                  </th>
                  <th>
                    <button
                      className="inline-flex items-center font-semibold"
                      onClick={() => changeSortBy('uptime')}
                    >
                      Uptime
                      <span className="relative inline-block h-4 w-4">
                        <FaSortUp
                          className={classNames(
                            'absolute ml-0.5',
                            sortByRef.current === 'uptime' && !isDesc
                              ? ''
                              : 'text-gray-200',
                          )}
                        />
                        <FaSortDown
                          className={classNames(
                            'absolute ml-0.5',
                            sortByRef.current === 'uptime' && isDesc
                              ? ''
                              : 'text-gray-200',
                          )}
                        />
                      </span>
                    </button>
                  </th>
                  <th>
                    <button
                      className="inline-flex items-center font-semibold"
                      onClick={() => changeSortBy('rewards')}
                    >
                      Rewards
                      <span className="relative inline-block h-4 w-4">
                        <FaSortUp
                          className={classNames(
                            'absolute ml-0.5',
                            sortByRef.current === 'rewards' && !isDesc
                              ? ''
                              : 'text-gray-200',
                          )}
                        />
                        <FaSortDown
                          className={classNames(
                            'absolute ml-0.5',
                            sortByRef.current === 'rewards' && isDesc
                              ? ''
                              : 'text-gray-200',
                          )}
                        />
                      </span>
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody
                className={classNames(
                  'divide-y divide-neutral-100 dark:divide-neutral-700',
                  isLoading && 'animate-pulse',
                )}
              >
                {isLoading && <Skeleton />}
                {!isLoading && !sortResult.length && (
                  <tr>
                    <td className="py-16 text-center" colSpan={5}>
                      No Data
                    </td>
                  </tr>
                )}
                {!isLoading &&
                  sortResult.map((v, i) => (
                    <tr key={v.operatorAddress}>
                      <td className="flex items-center space-x-2 py-4 text-left text-base font-semibold">
                        <div className="h-10 w-10 rounded-full bg-gray-200" />
                        <Link href={`/validators/${v.operatorAddress}`}>
                          <a className="hover:text-cyan-600">
                            {v.description.moniker}
                          </a>
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
                      <td>
                        <div className="flex h-6 justify-end">
                          <div
                            className={classNames(
                              isPoolLoading &&
                                'w-20 animate-pulse rounded bg-slate-100',
                            )}
                          >
                            {!isPoolLoading &&
                              numeral(v.votingPower).format('0.00%')}
                          </div>
                        </div>
                      </td>
                      <td>{numeral(v.commission).format('0.00%')}</td>
                      <td>
                        <div className="flex h-6 justify-end">
                          <div
                            className={classNames(
                              (missCounters[i].isLoading ||
                                isOracleParamsLoading) &&
                                'w-20 animate-pulse rounded bg-slate-100',
                            )}
                          >
                            {!(
                              missCounters[i].isLoading || isOracleParamsLoading
                            ) && numeral(v.uptime).format('0.00%')}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className={classNames('flex h-6 justify-end')}>
                          <div
                            className={classNames(
                              'uppercase',
                              validatorRewards[i].isLoading &&
                                'w-32 animate-pulse rounded bg-slate-100',
                            )}
                          >
                            {!validatorRewards[i].isLoading &&
                              `${
                                !validatorRewards[i].isLoading
                                  ? Number(v.rewards.amount) > 1000
                                    ? numeral(v.rewards.amount).format('0.00a')
                                    : numeral(v.rewards.amount).format(
                                        '0.000000',
                                      )
                                  : ''
                              } ${v.rewards.denom}`}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  )
}
