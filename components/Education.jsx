import { Box, IconGlif, StyledATag, Title, Text } from './Shared'

export default () => (
  <Box width='50%' bg='core.primary' height='100vh'>
    <Box
      padding={4}
      display='flex'
      justifyContent='space-between'
      flexDirection='column'
      height='100%'
    >
      <Box>
        <IconGlif width='100px' height='100px' mb={4} fill='white' />
        <Title color='core.white'>Verify your Filecoin storage.</Title>
        <Text color='core.white'>
          Verified storage is cheaper yadayadayaya.
        </Text>
      </Box>
      <StyledATag
        href='https://www.openworklabs.com'
        textAlign='right'
        color='core.white'
      >
        What is Open Work Labs?
      </StyledATag>
    </Box>
  </Box>
)
