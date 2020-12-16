import React from 'react'
import { Box, Text, StyledATag } from '@glif/react-components'

export default () => (
  <Box
    display='flex'
    alignItems='center'
    justifyContent='center'
    py={4}
    bottom='0'
    width='100%'
    textAlign='center'
  >
    <Text m={0}>Made by</Text>
    <StyledATag
      ml={2}
      href='https://www.infinitescroll.org'
      textAlign='right'
      color='core.primary'
    >
      Infinite Scroll
    </StyledATag>
  </Box>
)
