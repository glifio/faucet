import React from 'react'
import { useRouter } from 'next/router'
import PreAuth from './PreAuth'
import PostAuth from './PostAuth'
import { Box, Text, Card, StepHeader, IconGitHub } from './Shared'

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
          justifyContent='space-between'
          maxWidth={16}
          width={11}
          height={11}
        >
          <StepHeader currentStep={1} totalSteps={2} glyphAcronym='Vr' />
          <Text>Auth</Text>
          <IconGitHub />
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
          maxWidth={16}
          width={11}
          height={11}
        />
      </Box>
      {/* {router.query.code ? <PostAuth code={router.query.code} /> : <PreAuth />} */}
    </>
  )
}
