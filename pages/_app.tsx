import type { FC } from 'react'
import type { AppProps } from 'next/app'
import { QueryClientProvider } from '@tanstack/react-query'
import { initializeStore, ZustandProvider } from '@/store'

import { queryClient } from '@/constants'
import { CustomToaster } from '@/components'
import '@/styles/index.css'

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <ZustandProvider createStore={() => initializeStore()}>
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <CustomToaster />
    </QueryClientProvider>
  </ZustandProvider>
)

export default App
