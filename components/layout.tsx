import type { FC, ReactNode } from 'react'
import Head from 'next/head'

import { Sidebar } from './sidebar'
import { Header } from './header'

export interface LayoutProps {
  title?: string
  description?: string
  children?: ReactNode
}

export const Layout: FC<LayoutProps> = ({
  title = 'Merlion Park',
  description = '',
  children,
}) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
      </Head>
      <div className="flex h-screen">
        <Sidebar className="hidden w-16 flex-none flex-col sm:flex lg:w-64" />
        <div className="flex flex-grow flex-col overflow-hidden">
          <Header className="border-b border-b-gray-100 bg-white dark:border-neutral-700 dark:bg-neutral-800" />
          <main className="flex-grow overflow-x-auto py-16 px-6 xl:px-0">
            {children}
          </main>
        </div>
      </div>
    </>
  )
}
