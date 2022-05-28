import type { FC } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { VscArrowSwap } from 'react-icons/vsc'
import { FaTwitter, FaMedium } from 'react-icons/fa'
import { HiOutlineBookOpen } from 'react-icons/hi'
import { FiUser } from 'react-icons/fi'
import { classNames } from '@/utils'

export interface SidebarProps {
  className?: string
}

export const Sidebar: FC<SidebarProps> = ({ className }) => {
  const { pathname } = useRouter()

  return (
    <div
      className={classNames(
        'border-r border-gray-100 bg-white dark:border-neutral-700 dark:bg-neutral-800',
        className,
      )}
      aria-label="Sidebar"
    >
      <div className="border-b border-gray-100 dark:border-neutral-700">
        <Link href="/">
          <a className="flex h-16 items-center justify-center text-2xl">
            <div className="block sm:hidden lg:block">
              <span className="font-bold">Merlion</span>
              &nbsp;
              <span>Park</span>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="hidden w-12 fill-transparent sm:block lg:hidden"
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
      <div className="flex-grow overflow-y-auto rounded px-1 py-4 lg:px-3 ">
        <ul className="space-y-2">
          <li>
            <Link href="/swap">
              <a
                className={classNames(
                  'flex items-center rounded-lg px-4 py-3 font-normal hover:bg-gray-100 dark:hover:bg-neutral-700',
                  pathname === '/swap' && 'text-cyan-600',
                )}
              >
                <VscArrowSwap className="text-xl" />
                <span className="ml-4 inline sm:hidden lg:inline">Swap</span>
              </a>
            </Link>
          </li>

          <li>
            <Link href="/validators">
              <a
                className={classNames(
                  'flex items-center rounded-lg px-4 py-3 font-normal hover:bg-gray-50 dark:hover:bg-neutral-700',
                  pathname === '/validators' && 'text-cyan-600',
                )}
              >
                <FiUser className="text-xl" />
                <span className="ml-4 inline sm:hidden lg:inline">
                  Validators
                </span>
              </a>
            </Link>
          </li>
        </ul>
      </div>
      <div className="divide-y divide-neutral-100 px-3 dark:divide-neutral-700">
        <a
          href="//docs.merlion.zone"
          className="flex items-center justify-start py-4 hover:text-cyan-600 hover:underline sm:justify-center lg:justify-start"
          target="_blank"
          rel="noopener noreferrer"
        >
          <HiOutlineBookOpen className="text-xl" />
          <span className="ml-2 inline sm:hidden lg:inline">Documention</span>
        </a>
        <div className="block pb-4 sm:hidden lg:block">
          <ul className="flex space-x-4 text-xl">
            <li>
              <a href="" className="block p-2">
                <FaTwitter />
              </a>
            </li>

            <li>
              <a href="" className="block p-2">
                <FaMedium />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
