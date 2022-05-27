import { FC } from 'react'
import { useRouter } from 'next/router'
import { DuplicateIcon } from '@heroicons/react/solid'
import { toast } from 'react-hot-toast'

import { Layout } from '@/components'
import { useValidator, useCopyToClipboard } from '@/hooks'
import { classNames } from '@/utils'
import { CommissionCard, Delegators, Address, Delegation } from './components'

export const Validator: FC = () => {
  const { query } = useRouter()
  const { copy } = useCopyToClipboard()

  const copyAddress = async (address?: string) => {
    if (!address) return
    await copy(address)
    toast.success('Copied!')
  }

  const { data, isLoading } = useValidator(query.addr as string)

  return (
    <Layout>
      <div className="mx-auto mb-10 max-w-screen-lg">
        <h1 className="text-3xl font-semibold">Validator details</h1>
      </div>
      <div className="mx-auto max-w-screen-lg items-start space-y-10 lg:flex lg:space-y-0 lg:space-x-6">
        <div className="flex-[3] space-y-10">
          <div className="flex rounded-md bg-white p-6 dark:bg-neutral-800">
            <div className="h-16 w-16 overflow-hidden rounded-full border-0 bg-slate-300">
              {/* TODO */}
            </div>
            <div className="flex flex-col justify-center px-4">
              <div className="mb-0.5 flex items-center">
                <h2
                  className={classNames(
                    'text-2xl font-semibold',
                    (!query.addr || isLoading) &&
                      'mb-1 h-8 w-32 animate-pulse rounded bg-slate-100 dark:bg-slate-600',
                  )}
                >
                  {data?.description.moniker}
                </h2>
                <span className="ml-4 inline-block rounded-full bg-emerald-500 px-2 text-xs font-medium text-white">
                  Active
                </span>
              </div>
              <div
                className="flex cursor-pointer items-center text-sm text-slate-600 hover:text-cyan-600 dark:text-slate-400"
                onClick={() => copyAddress(data?.operatorAddress)}
              >
                <span
                  className={classNames(
                    'inline-block',
                    (!query.addr || isLoading) &&
                      'h-4 w-80 animate-pulse rounded bg-slate-100 dark:bg-slate-600',
                  )}
                >
                  {data?.operatorAddress}
                </span>
                &nbsp;
                <DuplicateIcon className="h-4 w-4" />
              </div>
              {data?.description?.website && (
                <a
                  className="mt-0.5 text-sm text-cyan-600 hover:underline"
                  href={data?.description.website}
                >
                  {data?.description?.website}
                </a>
              )}
            </div>
          </div>

          <CommissionCard
            commission={data?.commission}
            isLoading={!query.addr || isLoading}
          />

          <Delegators validatorAddr={query.addr as string} />

          <Address
            validatorAddr={query.addr as string}
            validatorPubKey={data?.consensusPubkey}
          />
        </div>

        <Delegation validatorAddr={query.addr as string} />
      </div>
    </Layout>
  )
}
