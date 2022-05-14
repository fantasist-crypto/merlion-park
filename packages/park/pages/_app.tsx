import type { FC } from 'react'
import type { AppProps } from 'next/app'
import { QueryClientProvider } from 'react-query'

import { queryClient } from '@/constants'
import '@/styles/index.css'

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <QueryClientProvider client={queryClient}>
    <Component {...pageProps} />
  </QueryClientProvider>
)

export default App
