import React from 'react'
import PreAuth from './PreAuth'
import PostAuth from './PostAuth'
import { Box, Title, Menu, MenuItem, Header } from './Shared'
import CheckBalanceAmount from './CheckBalanceAmount'
import { useJwt } from '../lib/JwtHandler'
import ErrorGlyph from './Shared/Glyph/ErrorGlyph'
import HeaderGlyph from './Shared/Glyph/HeaderGlyph'

export default () => {
  const { jwt } = useJwt()
  return (
    <Box
      display='flex'
      flexWrap='wrap'
      alignItems='center'
      justifyContent='center'
      height='100%'
      p={[2, 3, 5]}
    >
      <Box
        display='flex'
        width={['100%', '100%', '40%']}
        flexDirection='column'
        alignItems='flex-start'
        alignContent='center'
        mb={4}
      >
        <HeaderGlyph
          alt='Source: https://unsplash.com/photos/g2Zf3hJyYAc'
          text='Faucet'
          imageUrl='/imgfaucet.jpg'
        />

        <Box
          display='flex'
          flexDirection='column'
          mt={4}
          alignSelf='center'
          textAlign='left'
        >
          <Header>Quickly, easily receive testnet Filecoin</Header>
          <Title mt={3} lineHeight='140%'>
            Receive small amounts of testnet FIL to help your testing and
            experimentation.
          </Title>
        </Box>
      </Box>
      <Box
        display='flex'
        // flexGrow='1'
        minHeight={12}
        width={['100%', '100%', '50%']}
        minWidth={11}
        flexWrap='wrap'
        justifyContent='space-evenly'
        margin='auto'
      >
        {jwt ? <PostAuth /> : <PreAuth />}
        <CheckBalanceAmount />
      </Box>
    </Box>
  )
}
