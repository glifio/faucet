import { Box, IconGlif, StyledATag, Title, Text, BigTitle } from './Shared'

const QA = ({ question, answer }) => (
  <Box>
    <Title color='core.white'>{question}</Title>
    <Text color='core.white'>{answer}</Text>
  </Box>
)

export default () => (
  <Box width='50%' bg='core.primary' height='100'>
    <Box
      padding={4}
      display='flex'
      justifyContent='space-between'
      flexDirection='column'
      minHeight='100%'
      height='auto'
    >
      <Box>
        <Box display='flex' alignItems='center'>
          <Box
            px={1}
            py={3}
            borderRadius={3}
            display='inline-block'
            bg='core.primary'
            boxShadow={1}
          >
            <IconGlif width='48px' height='48px' fill='white' />
          </Box>
          <BigTitle fontSize={5} ml={3} color='core.white'>
            VERIFY
          </BigTitle>
        </Box>
        <Box
          display='flex'
          flexDirection='column'
          height='100%'
          width='100%'
          justifyContent='spaced-evenly'
          mt={4}
        >
          <Box mt={4}>
            <QA
              question='What is verified Filecoin data?'
              answer='Data that is considered "real" by the Filecoin network.'
            />
          </Box>
          <Box mt={4}>
            <QA
              question='Why does it matter?'
              answer='The Filecoin network incentivizes storing real data in the network and not garbage data. Storing verified Filecoin data is cheaper because it’s more valuable to miners.'
            />
          </Box>
          <Box mt={4}>
            <QA
              question='How do I verify my data?'
              answer="As long as you're a real person, your data is considered verified!
            Simply link your GitHub account to a Filecoin address, and we'll
            grant that address 32 GB of verified Filecoin data."
            />
          </Box>
          <Box mt={4}>
            <QA
              question='How can I get more verified data?'
              answer='Once your Filecoin address has less than 3 GB of verified data allowance, come back here and follow the same steps.'
            />
          </Box>
        </Box>
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
