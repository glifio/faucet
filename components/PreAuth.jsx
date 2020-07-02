import React from 'react'
import { Box, StepHeader, Text, Card, IconGitHub } from './Shared'

export default () => {
  return (
    <Box display='flex' flexDirection='column' m={3} width='100%' maxWidth={14}>
      <Text color='core.darkgray' textAlign='center' m='0' p='0'>
        Connect to GitHub to begin
      </Text>
      <Card
        p={3}
        mt={3}
        border={0}
        display='flex'
        flexDirection='column'
        justifyContent='space-between'
        minWidth={11}
        bg='background.screen'
        boxShadow={2}
      >
        <Box display='flex' justifyContent='space-between'>
          <StepHeader
            currentStep={1}
            totalSteps={3}
            glyphAcronym='Vr'
            title='Verify'
            showStepper={false}
            width='auto'
          />
          <Box
            display='flex'
            flexDirection='row'
            justifyContent='center'
            alignItems='center'
            alignSelf='center'
            borderRadius={2}
            backgroundColor='buttons.primary.background'
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
            <IconGitHub size={5} ml={2} fill='white' color='white' />
            <Text mx={3} my={3}>
              Start
            </Text>
          </Box>
        </Box>
      </Card>
    </Box>
  )
}
