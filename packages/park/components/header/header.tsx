import type { FC } from 'react'
import Link from 'next/link'
import { MdAccountBalanceWallet } from 'react-icons/md'

import { useKeplr } from '@/hooks'
import { classNames, shortenAddress } from '@/utils'
import { ThemeSwitch } from './theme-switch'

export const Header: FC = () => {
  const { address, isActive, connect } = useKeplr(true)

  return (
    <header className={classNames('bg-white dark:bg-slate-700')}>
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between space-x-4 px-6">
        <Link href="/">
          <a className="text-2xl">Merlion</a>
        </Link>
        <div className="flex-1" />
        <ThemeSwitch />
        {isActive ? (
          <div className="flex items-center justify-center rounded-full bg-cyan-600 px-6 py-1.5 text-slate-50">
            <MdAccountBalanceWallet className="mr-1 text-xl" />
            {shortenAddress(address)}
          </div>
        ) : (
          <button
            className="rounded-full bg-cyan-600 px-6 py-1.5 text-slate-50"
            onClick={connect}
          >
            Connect Wallet
          </button>
        )}
      </div>
    </header>
  )
}
