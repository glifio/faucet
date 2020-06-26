import { Box, IconGlif, StyledATag, Title, Text, BigTitle } from './Shared'

const QA = ({ question, answers }) => (
  <Box mt={4}>
    <Title color='core.white'>{question}</Title>
    {answers.map((answer, i) => (
      <Text key={i} mt={4} color='core.white'>
        {answer}
      </Text>
    ))}
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
          <QA
            question='What is a Filecoin verified client?'
            answers={[
              'A verified client is anyone who is likely to be using Filecoin to store and use real data.'
            ]}
          />
          <QA
            question='What is a Filecoin verifier?'
            answers={[
              'A verifier is someone who is charged with assessing the amount of data a verified client is likely to require, and granting them a data cap up to that amount. This app is one example of a verifier.'
            ]}
          />
          <QA
            question='Why does it matter?'
            answers={[
              'Data stored by verified clients makes Filecoin storage miners eligible for more block rewards. This drives miners to compete for verified client deals by improving quality of service.'
            ]}
          />
          <QA
            question='How do I become a verified client?'
            answers={[
              "This app provides small data caps to anyone who has a GitHub account over 180 days old to make testing and experimentation easy. Simply link your GitHub account to a Filecoin address, and we'll grant that address 8 GB of verified Filecoin data.",
              'If you’re looking to store larger amounts of data on Filecoin, there are many verifiers who can grant larger data caps. A list of verifiers will be added below when it’s available.'
            ]}
          />
          <QA
            question='How can I get more verified data?'
            answers={[
              'Once your Filecoin address has exhausted its verified data allowance, come back here and follow the same steps. This process can only be repeated at most once per 30 days.'
            ]}
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
