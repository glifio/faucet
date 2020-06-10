import React from 'react'
import { useRouter } from 'next/router'
import PreAuth from './PreAuth'
import PostAuth from './PostAuth'
import { Box, Text, Card, StepHeader } from './Shared'
import CheckVerifiedStorageAmount from './CheckVerifiedStorageAmount'

export default () => {
  const router = useRouter()
  return (
    <>
      <Box
        justifyContent='center'
        height='100vh'
        display='flex'
        flexGrow='1'
        flexDirection='column'
        alignItems='center'
      >
        <Card
          minHeight={10}
          p={3}
          border={1}
          borderRadius={2}
          borderWidth={1}
          overflow='hidden'
          display='flex'
          flexDirection='column'
          flexWrap='wrap'
          maxWidth='380px'
          maxHeight='380px'
          width='380px'
          height='380px'
          bg='background.screen'
        >
          {router.query.code ? (
            <PostAuth code={router.query.code} />
          ) : (
            <PreAuth />
          )}
        </Card>
        <Box height={5} />
        <Card
          width='100%'
          minHeight={10}
          p={3}
          border={1}
          borderRadius={2}
          borderWidth={1}
          overflow='hidden'
          display='flex'
          flexDirection='row'
          flexWrap='wrap'
          justifyContent='center'
          maxWidth='380px'
          maxHeight='380px'
          width='380px'
          height='380px'
        >
          <CheckVerifiedStorageAmount />
        </Card>
      </Box>
    </>
  )
}
