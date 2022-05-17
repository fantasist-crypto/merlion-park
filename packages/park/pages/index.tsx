import type { FC } from 'react'
import type { GetStaticProps } from 'next'

export const getStaticProps: GetStaticProps = () => ({
  redirect: {
    destination: '/validators',
    permanent: false,
  },
})

const Home: FC = () => null

export default Home
