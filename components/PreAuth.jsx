import React from 'react'
import { Box, StepHeader, Text, Title, IconGitHub } from './Shared'

export default () => {
  return (
    <>
      <Box>
        <StepHeader currentStep={1} totalSteps={2} glyphAcronym='Vr' />
        <Title mt={4}>Verify</Title>
        <Text>Link your GitHub account to get verified Filecoin storage.</Text>
      </Box>
      <Box
        display='flex'
        flexDirection='row'
        justifyContent='center'
        alignItems='center'
        alignSelf='center'
        border={1}
        borderRadius={2}
        px={3}
        mt={4}
        width='100%'
        css={`
          transition: 0.24s ease-in-out;
          cursor: pointer;
          &:hover {
            opacity: 0.8;
          }
        `}
        onClick={() => {
          window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_REDIRECT_URL}&state=${process.env.OAUTH_STATE_STRING}`
        }}
      >
        <IconGitHub size={5} />
        <Text ml={3} my={3}>
          Start
        </Text>
      </Box>
    </>
  )
}
