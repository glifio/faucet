import { Box, IconGlif, StyledATag, Title, Text, BigTitle } from './Shared'

const QA = ({ question, answer }) => (
  <Box>
    <Title color='core.white'>{question}</Title>
    <Text color='core.white'>{answer}</Text>
  </Box>
)

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
        <Box
          display='flex'
          flexDirection='column'
          height='100%'
          width='100%'
          justifyContent='space-between'
        >
          <QA
            question='What is verified Filecoin data?'
            answer='Data that is considered "real" by the Filecoin network.'
          />
          <QA
            question='Why does it matter?'
            answer='The Filecoin network incentivizes storing real data in the network and not garbage data. Storing verified Filecoin data is cheaper because it’s more valuable to miners.'
          />
          <QA
            question='How do I verify my data?'
            answer="As long as you're a real person, your data is considered verified!
            Simply link your GitHub account to a Filecoin address, and we'll
            grant that address 32 GB of verified Filecoin data."
          />
          <QA
            question='How can I get more verified data?'
            answer='Once your Filecoin address has less than 3 GB of verified data allowance, come back here and follow the same steps.'
          />
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
