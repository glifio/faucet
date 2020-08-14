import React from 'react'
import PreAuth from './PreAuth'
import PostAuth from './PostAuth'
import { Box, Title, Header, Label } from './Shared'
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
      flexGrow='1'
      p={[2, 3, 5]}
    >
      <Box
        display='flex'
        width={['100%', '100%', '40%']}
        flexDirection='column'
        alignItems='flex-start'
        alignContent='center'
        mx={3}
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
          mt={[2, 4, 4]}
          alignSelf='center'
          textAlign='left'
        >
          <Header>Quickly, easily receive testnet Filecoin</Header>
          <Title mt={3} lineHeight='140%'>
            Receive small amounts of testnet FIL to help your testing and
            experimentation.
          </Title>
          <Label mt={4}>
            Miners can reuse this faucet by entering in their miner ID when they
            need more FIL.
          </Label>
          <Label mt={4} p={4} borderRadius={3} bg='lightgray'>
            The amount of FIL a miner receives depends on how much power they
            hold in the network
          </Label>
        </Box>
      </Box>
      <Box
        display='flex'
        // flexGrow='1'
        width={['100%', '100%', '50%']}
        minWidth={11}
        flexWrap='wrap'
        justifyContent='space-evenly'
        margin='auto'
      >
        <Box
          display='flex'
          flexDirection='column'
          m={3}
          minHeight={10}
          width='100%'
          maxWidth={13}
          alignItems='center'
          justifyContent='center'
        >
          {jwt ? <PostAuth /> : <PreAuth />}
        </Box>
        <CheckBalanceAmount />
      </Box>
    </Box>
  )
}
