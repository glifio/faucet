import { Box, Title, Text } from './Shared'

const QA = ({ question, answers }) => (
  <Box m={4} maxWidth={12}>
    <Title color='core.primary'>{question}</Title>
    {answers.map((answer, i) => (
      <Text key={i} mt={4} color='core.darkgray'>
        {answer}
      </Text>
    ))}
  </Box>
)

export default () => (
  <Box
    id='help'
    width='100%'
    bg='background.screen'
    flexGrow={2}
    py={4}
    px={[4, 5]}
    display='flex'
    justifyContent='space-between'
    alignItems='center'
    flexDirection='column'
  >
    <Box
      display='flex'
      flexDirection='row'
      flexWrap='wrap'
      width='100%'
      maxWidth={19}
      justifyContent={['center', 'center', 'space-between']}
    >
      <QA
        question='What is a verified Filecoin address?'
        answers={[
          'Anyone who is likely to be using Filecoin to store and use real data can verify their Filecoin address. Verified Filecoin addresses are kept on chain.'
        ]}
      />
      <QA
        question='What is a Filecoin verifier?'
        answers={[
          'A verifier is someone who is charged with assessing the amount of data a verified address is likely to require, and granting that address a data cap up to that amount. This app is one example of a verifier.'
        ]}
      />
      <QA
        question='Why does it matter?'
        answers={[
          'Data stored by verified addresses makes Filecoin storage miners eligible for more block rewards. This drives miners to compete for verified deals by improving quality of service.'
        ]}
      />

      <QA
        question='How can I renew my address verification?'
        answers={[
          'Once your Filecoin address has exhausted its verified allowance, come back here and follow the same steps. This process can only be repeated at most once per 30 days.'
        ]}
      />
      <QA
        question='How do I verify my address?'
        answers={[
          "This app provides small data caps to anyone who has a GitHub account over 180 days old to make testing and experimentation easy. Simply link your GitHub account to a Filecoin address, and we'll grant that address 8 GB of verified Filecoin data.",
          'If you’re looking to store larger amounts of data on Filecoin, there are many verifiers who can grant larger data caps. A list of verifiers will be added below when it’s available.'
        ]}
      />
    </Box>
  </Box>
)
