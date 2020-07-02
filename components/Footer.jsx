import React from 'react'
import { Box, Text, StyledATag } from './Shared'

export default () => (
  <Box
    display='flex'
    alignItems='center'
    justifyContent='center'
    mb={2}
    position='fixed'
    bottom='0'
    width='100%'
    textAlign='center'
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
