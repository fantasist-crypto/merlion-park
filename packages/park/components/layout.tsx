import type { FC, ReactNode } from 'react'
import Head from 'next/head'

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
      <Header />
      <main className="pb-16">{children}</main>
      <footer />
    </>
  )
}
