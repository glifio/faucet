import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Box, Text, IconGitHub } from './Shared'
import { GITHUB_CLIENT_ID, GITHUB_REDIRECT_URL, OAUTH_STATE_STRING } from '@env'

export default () => {
  return (
    <Box display='flex' flexDirection='column' m={3}>
      <Text color='core.darkgray' textAlign='center' p='0'>
        Connect to GitHub to begin
      </Text>
      <Box
        display='flex'
        flexDirection='row'
        justifyContent='center'
        alignItems='center'
        alignSelf='center'
        height={6}
        borderRadius={2}
        color='white'
        backgroundColor='#1A0066'
        px={3}
        boxShadow={2}
        css={`
          transition: 0.24s ease-in-out;
          cursor: pointer;
          &:hover {
            opacity: 0.8;
          }
        `}
        onClick={() => {
          window.location.href = `https://github.com/login/oauth/authorize?client_id=${
            GITHUB_CLIENT_ID
          }&redirect_uri=${GITHUB_REDIRECT_URL}&state=${
            OAUTH_STATE_STRING
          }-${uuidv4()}`
        }}
      >
        <IconGitHub size={5} mr={2} fill='#fff' />
        <Text m='0'>Start</Text>
      </Box>
    </Box>
  )
}
