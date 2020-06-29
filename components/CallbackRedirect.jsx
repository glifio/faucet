import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useJwt } from '../lib/JwtHandler'

export default ({ jwt }) => {
  const { storeJwt } = useJwt()
  const router = useRouter()
  useEffect(() => {
    if (jwt) {
      storeJwt(jwt)
      router.replace('/')
    }
  }, [jwt])

  return null
}
