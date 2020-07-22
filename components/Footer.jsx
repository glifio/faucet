import React from 'react'
import { Box, Text, StyledATag } from './Shared'

export default () => (
  <Box
    display='flex'
    alignItems='center'
    justifyContent='center'
    py={4}
    bottom='0'
    width='100%'
    textAlign='center'
    bg='background.screen'

  >
    <Text m={0}>Made by</Text>
    <StyledATag
      ml={2}
      href='https://www.openworklabs.com'
      textAlign='right'
      color='core.primary'
    >
      OWL
    </StyledATag>
  </Box>
)
