import { FC, useEffect } from 'react'
import { useRouter } from 'next/router'

const Home: FC = () => {
  const router = useRouter()

  useEffect(() => {
    void router.replace(`/validators`)
  }, [router])

  return null
}

export default Home
