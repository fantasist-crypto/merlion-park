import type { FC } from 'react'
import { Layout } from '@/components'

const Home: FC = () => (
  <Layout>
    <div className="flex justify-center py-24">
      <h1 className="text-4xl font-extrabold">Welcome to Merlion Park!</h1>
    </div>
  </Layout>
)

export default Home
