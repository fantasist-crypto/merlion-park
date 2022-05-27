import { FC, Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { SunIcon, MoonIcon } from '@heroicons/react/outline'

import { Theme, useTheme } from '@/hooks'
import { classNames } from '@/utils'

export interface ThemeSwitchProps {
  className?: string
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({ className }) => {
  const { theme, setTheme } = useTheme()

  const handle = (value: Theme, callback?: (...args: any[]) => void) => {
    setTheme(value)
    callback?.()
  }

  return (
    <Popover className={classNames('relative', className)}>
      <label className="sr-only" id="headlessui-listbox-label-3">
        Theme
      </label>
      <Popover.Button className="block h-6 w-6 text-2xl text-cyan-600 dark:text-neutral-50">
        <SunIcon className="block dark:hidden" />
        <MoonIcon className="hidden dark:block" />
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel
          as="ul"
          className="dark:highlight-white/5 absolute -right-4 top-full z-50 mt-6 w-36 overflow-hidden rounded-lg bg-white py-1 text-sm font-semibold text-slate-700 shadow-lg ring-1 ring-slate-900/10 dark:bg-neutral-800 dark:text-slate-300 dark:ring-0"
        >
          {({ close }) => (
            <>
              <li
                className={classNames(
                  'flex cursor-pointer items-center px-2 py-1',
                  theme === 'dark' && 'text-cyan-500',
                )}
                onClick={() => handle('dark', close)}
              >
                <MoonIcon className="mr-2 h-6 w-6" />
                <span>Dark</span>
              </li>

              <li
                className={classNames(
                  'flex cursor-pointer items-center px-2 py-1',
                  theme === 'light' && 'text-cyan-500',
                )}
                onClick={() => handle('light', close)}
              >
                <SunIcon className="mr-2 h-6 w-6" />
                <span>Light</span>
              </li>

              <li
                className={classNames(
                  'flex cursor-pointer items-center px-2 py-1',
                  theme === null && 'text-cyan-500',
                )}
                onClick={() => handle(null, close)}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="mr-2 h-6 w-6"
                  stroke="currentColor"
                >
                  <path
                    d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Z"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M14 15c0 3 2 5 2 5H8s2-2 2-5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                <span>System</span>
              </li>
            </>
          )}
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
