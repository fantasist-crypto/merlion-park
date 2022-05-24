import type { FC } from 'react'
import type { AppProps } from 'next/app'
import Script from 'next/script'
import { QueryClientProvider } from 'react-query'

import { queryClient } from '@/constants'
import { CustomToaster } from '@/components'
import '@/styles/index.css'

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <QueryClientProvider client={queryClient}>
    <Component {...pageProps} />
    <CustomToaster />
    <Script
      id="update-html-classes"
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
  </QueryClientProvider>
)

export default App
