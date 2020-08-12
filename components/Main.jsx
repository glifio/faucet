import React from 'react'
import PreAuth from './PreAuth'
import PostAuth from './PostAuth'
import {
  Box,
  Card,
  Title,
  Text,
  StyledATag,
  Menu,
  MenuItem,
  Header,
  NodeConnectedGlyph,
} from './Shared'
import CheckBalanceAmount from './CheckBalanceAmount'
import { useJwt } from '../lib/JwtHandler'
import ErrorGlyph from './Shared/Glyph/ErrorGlyph'
import HeaderGlyph from './Shared/Glyph/HeaderGlyph'



export default () => {
  const { jwt } = useJwt()
  return (
    <Box display="flex" flexWrap="wrap" alignItems="center" height="100%" p={[2, 3, 5]} mb={[0, 4]}>
      <Box
        display='flex'
        width="40%"
        minWidth={12}
        flexDirection='column'
        alignItems='flex-start'
        alignContent='center'
        mb={4}
      >
        <Menu
          display='flex'
          justifyContent='space-between'
          width='100%'
          alignItems='center'
        >
          <MenuItem>
            <HeaderGlyph 
            alt='Source: https://unsplash.com/photos/g2Zf3hJyYAc'
            text='Faucet'
            imageUrl='/imgfaucet.jpg'
            />
          </MenuItem>
          {/* <MenuItem>
            <NodeConnectedGlyph apiAddress={process.env.LOTUS_NODE_JSONRPC} />
          </MenuItem> */}
        </Menu>
        <Box
          display='flex'
          flexDirection='column'
          mt={4}
          alignSelf='center'
          textAlign='left'
        >
          <Header>Quickly, easily receive testnet Filecoin</Header>
          <Title mt={3} lineHeight='140%'>
            Receive small amounts of testnet FIL to help your testing and experimentation.
          </Title>
          
        </Box>
      </Box>
      <Box
        display='flex'
        width="50%"
        flexWrap='wrap'
        justifyContent='space-evenly'
        maxWidth={19}
        margin='auto'
      >
        {jwt ? <PostAuth /> : <PreAuth />}
        <CheckBalanceAmount />
      </Box>
    </Box>
  )
}
