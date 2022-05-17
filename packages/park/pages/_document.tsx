import type { FC } from 'react'
import type { DocumentProps } from 'next/document'
import { Html, Head, Main, NextScript } from 'next/document'

const Document: FC<DocumentProps> = () => {
  return (
    <Html className="dark">
      <Head>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <body className="bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-50">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
