/* NOTE this should be replaced by shared component in the future */
import React from 'react'
import PropTypes from 'prop-types'
import { Box, Glyph, Title, Text, StyledATag } from './Shared'

const ErrorView = ({ title, description, linkDisplay, linkhref }) => (
  <Box
    display='flex'
    width='100%'
    height='90vh'
    alignItems='center'
    justifyContent='center'
  >
    <Box
      width='100%'
      maxWidth={13}
      minHeight={10}
      p={3}
      border={1}
      borderRadius={2}
      borderWidth={1}
      display='flex'
      flexDirection='column'
      justifyContent='space-between'
      borderColor='card.error.background'
      bg='card.error.background'
      color='card.error.foreground'
      ml={2}
      minHeight={11}
    >
      <Box>
        <Glyph color='status.fail.foreground' acronym='Er' />
        <Title mt={4} mb={2}>
          {title}
        </Title>
        <Text>{description}</Text>
      </Box>

      <Box>
        <StyledATag
          rel='noopener'
          target='_blank'
          href={linkhref}
          fontSize={3}
          color='core.white'
        >
          {linkDisplay}
        </StyledATag>
      </Box>
    </Box>
  </Box>
)

ErrorView.propTypes = {
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  linkhref: PropTypes.string.isRequired,
  linkDisplay: PropTypes.string.isRequired
}

export default ErrorView
