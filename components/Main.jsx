import React from 'react'
import PreAuth from './PreAuth'
import PostAuth from './PostAuth'
import {
  Box,
  Card,
  IconGlif,
  Title,
  Text,
  StyledATag,
  Menu,
  MenuItem,
  NodeConnectedGlyph
} from './Shared'
import CheckVerifiedStorageAmount from './CheckVerifiedStorageAmount'
import { useJwt } from '../lib/JwtHandler'

export default () => {
  const { jwt } = useJwt()
  return (
    <Box p={[2, 3, 5]} mb={[0, 4]}>
      <Box
        display='flex'
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
            <Box
              display='flex'
              justifyContent='center'
              alignItems='center'
              borderRadius={3}
              bg='core.primary'
              borderRadius={3}
              height={7}
            >
              <IconGlif width='48px' height='48px' fill='white' />
            </Box>
          </MenuItem>
          <MenuItem>
            <NodeConnectedGlyph apiAddress={process.env.LOTUS_NODE_JSONRPC} />
          </MenuItem>
        </Menu>
        <Box
          display='flex'
          flexDirection='column'
          mt={4}
          alignSelf='center'
          alignItems='center'
          textAlign='center'
        >
          <Title fontSize={5}>Verify your Filecoin address</Title>
          <Text maxWidth={15}>
            This app provides small data allowances to anyone who has a GitHub
            account over 180 days old to make testing and experimentation easy.
          </Text>
        </Box>
      </Box>
      <Box
        display='flex'
        flexWrap='wrap'
        justifyContent='space-evenly'
        maxWidth={19}
        margin='auto'
      >
        {jwt ? <PostAuth /> : <PreAuth />}
        <CheckVerifiedStorageAmount />
      </Box>
    </Box>
  )
}
