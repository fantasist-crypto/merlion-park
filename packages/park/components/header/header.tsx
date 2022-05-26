import { FC, useEffect } from 'react'
import Link from 'next/link'
import { MdAccountBalanceWallet } from 'react-icons/md'

import { useKeplr } from '@/hooks'
import { shortenAddress } from '@/utils'
import { ThemeSwitch } from './theme-switch'

export interface HeaderProps {
  className?: string
}

export const Header: FC<HeaderProps> = ({ className }) => {
  const { address, isActive, connect } = useKeplr()

  useEffect(() => {
    connect()
  }, [connect])

  return (
    <header className={className}>
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between space-x-4 px-6">
        <Link href="/">
          <a className="text-2xl">Merlion</a>
        </Link>
        <div className="flex-1" />
        <ThemeSwitch />
        {isActive ? (
          <div className="flex items-center justify-center rounded-full px-6 py-1.5 text-cyan-600 ring-1 ring-cyan-600 dark:text-slate-50 dark:ring-neutral-50">
            <MdAccountBalanceWallet className="mr-1 text-xl" />
            {shortenAddress(address)}
          </div>
        ) : (
          <button
            className="rounded-full px-6 py-1.5 text-neutral-50"
            onClick={connect}
          >
            Connect Wallet
          </button>
        )}
      </div>
    </header>
  )
}
