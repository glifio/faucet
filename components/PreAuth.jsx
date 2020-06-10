import React from 'react'
import { Box, StepHeader, Text, IconGitHub } from './Shared'

export default () => {
  return (
    <>
      <Box>
        <StepHeader
          currentStep={1}
          totalSteps={2}
          glyphAcronym='Vr'
          title='Verify'
        />
        <Text>Link your GitHub account to get verified Filecoin storage.</Text>
      </Box>
      <Box
        flexGrow='1'
        display='flex'
        flexDirection='row'
        justifyContent='center'
        alignItems='center'
      >
        <IconGitHub
          css={`
            cursor: pointer;
          `}
          onClick={() => {
            window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_REDIRECT_URL}&state=${process.env.OAUTH_STATE_STRING}`
          }}
        />
      </Box>
    </>
  )
}
