import React from 'react'
import { useRouter } from 'next/router'
import PreAuth from './PreAuth'
import PostAuth from './PostAuth'

export default () => {
  const router = useRouter()
  return (
    <>
      <h1>Welcome to Glif Verification!</h1>
      {router.query.code ? <PostAuth code={router.query.code} /> : <PreAuth />}
    </>
  )
}
