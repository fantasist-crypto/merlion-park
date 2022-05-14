import type { FC } from 'react'
import Link from 'next/link'

export const Header: FC = () => {
  return (
    <header className="bg-white">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between">
        <Link href="/">
          <a className="text-2xl" style={{ fontFamily: 'Righteous' }}>
            Merlion
          </a>
        </Link>
        <div className="flex-1" />
        <button>
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
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>
        <button className="ml-6 rounded-full bg-cyan-600 px-6 py-1.5 text-slate-50">
          Connect Wallet
        </button>
      </div>
    </header>
  )
}
