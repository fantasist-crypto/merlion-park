import type { FC } from 'react'
import type { DocumentProps } from 'next/document'
import { Html, Head, Main, NextScript } from 'next/document'

const Document: FC<DocumentProps> = () => {
  return (
    <Html className="dark h-full">
      <Head>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <body className="h-full min-h-full bg-slate-50 font-sans text-slate-900 dark:bg-slate-800 dark:text-slate-200">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
