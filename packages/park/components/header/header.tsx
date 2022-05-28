import { FC, Fragment, useEffect, useState } from 'react'
import Link from 'next/link'
import { Popover, Transition } from '@headlessui/react'
import { MdAccountBalanceWallet } from 'react-icons/md'
import { HiOutlineMenu } from 'react-icons/hi'

import { useKeplr } from '@/hooks'
import { classNames, shortenAddress } from '@/utils'
import { Sidebar } from '../sidebar'
import { ThemeSwitch } from './theme-switch'

export interface HeaderProps {
  className?: string
}

export const Header: FC<HeaderProps> = ({ className }) => {
  const { address, isActive, connect } = useKeplr()

  const [isShow, setIsShow] = useState(false)

  const toggleSidebar = () => {
    setIsShow(!isShow)
  }

  useEffect(() => {
    connect()
  }, [connect])

  return (
    <Popover as="header" className={classNames('z-40', className)}>
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between space-x-4 px-6">
        <div className="flex sm:hidden">
          <Popover.Button>
            <HiOutlineMenu className="text-3xl" />
          </Popover.Button>
          <Link href="/">
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2 w-8 fill-transparent"
                viewBox="0 0 400 400"
              >
                <rect width="400" height="400" />
                <path
                  className="fill-neutral-900 dark:fill-white"
                  d="M274.18,309.39V178.61q0-18.09,1.81-45.5h-1.11q-4.17,20.74-6.68,27.69L215.06,309.39H178.47l-53.85-147.2q-2-5.28-6.81-29.08h-1.26q1.82,27.13,1.81,54.4V309.39H76.9V93.88h66.78L190.15,224.1a156.11,156.11,0,0,1,7.93,30.33h1a317.35,317.35,0,0,1,8.9-30.6l46.61-130h65V309.39Z"
                />
              </svg>
            </a>
          </Link>
        </div>
        <div className="flex-1" />
        <ThemeSwitch />
        {isActive ? (
          <div className="flex items-center justify-center rounded-full px-6 py-1.5 text-cyan-600 ring-1 ring-cyan-600 dark:text-slate-50 dark:ring-neutral-50">
            <MdAccountBalanceWallet className="mr-1 text-xl" />
            {shortenAddress(address)}
          </div>
        ) : (
          <button
            className="rounded-full bg-cyan-600 px-6 py-1.5 text-white"
            onClick={connect}
          >
            Connect Wallet
          </button>
        )}
      </div>
      <Popover.Overlay className="fixed inset-0 bg-black opacity-30" />
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 -left-full"
        enterTo="opacity-100 left-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 left-0"
        leaveTo="opacity-0 -left-full"
      >
        <Popover.Panel>
          <Sidebar className="fixed top-0 bottom-0 flex w-64 flex-col" />
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
