import React from 'react'
import styled from 'styled-components'
import PreAuth from './PreAuth'
import PostAuth from './PostAuth'
import { Box, Title, Header, Label, Text } from './Shared'
import CheckBalanceAmount from './CheckBalanceAmount'
import { useJwt } from '../lib/JwtHandler'
import ErrorGlyph from './Shared/Glyph/ErrorGlyph'
import HeaderGlyph from './Shared/Glyph/HeaderGlyph'

const Highlight = styled.span`
  font-size: ${(props) => props.theme.fontSizes[3]};
  border-radius: ${(props) => props.theme.radii[6]};
  padding: 0rem 1rem;
  margin-right: 0.5rem;
  background-color: #ffc0cb;
`

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
          <Box mt={[2, 3, 4, 7]} maxWidth={12}>
            <Text color='core.darkgray' textAlign='left' mt={3}>
              <Highlight>Miners</Highlight>
              You can reuse this faucet by entering in your miner ID
            </Text>
            <Text color='core.darkgray' textAlign='left' mt={3}>
              <Highlight>Not a miner?</Highlight>
              t1 and t3 addresses can only use this faucet once
            </Text>
          </Box>
        </Box>
        <Title
          display={['inline-block', 'inline-block', 'none']}
          width='100%'
          textAlign='center'
          fontSize={6}
          css={`
            font-family: 'system-ui';
          `}
        >
          ↓
        </Title>
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
