import type { FC } from 'react'
import type { DocumentProps } from 'next/document'
import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

const Document: FC<DocumentProps> = () => {
  return (
    <Html className="">
      <Head>
        <link rel="icon" href="/favicon.svg" />
        <Script
          id="set-html-classes"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
try {
  if (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
} catch (_) {}`,
          }}
        />
      </Head>
      <body className="bg-gray-50 font-sans text-neutral-900 dark:bg-neutral-900 dark:text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
