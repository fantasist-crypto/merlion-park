import type { FC } from 'react'
import Link from 'next/link'

import { classNames } from '@/utils'
import { ThemeSwitch } from './theme-switch'

export const Header: FC = () => {
  return (
    <header className={classNames('bg-white dark:bg-slate-700')}>
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between">
        <Link href="/">
          <a className="text-2xl" style={{ fontFamily: 'Righteous' }}>
            Merlion
          </a>
        </Link>
        <div className="flex-1" />
        <ThemeSwitch />
        <button className="ml-6 rounded-full bg-cyan-600 px-6 py-1.5 text-slate-50">
          Connect Wallet
        </button>
      </div>
    </header>
  )
}
