import React from 'react'
import { string } from 'prop-types'
import { Box, Text, Label, StyledATag } from '../Shared'
import { ADDRESS_PROPTYPE } from '../../customPropTypes'

export const Confirming = ({ cid, err }) => {
  return (
    <>
      <Text>
        We're making sure your FIL request gets processed by the Filecoin
        network...
      </Text>
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='flex-start'
        width='100%'
      >
        {/* <StyledATag
          rel='noopener noreferrer'
          target='_blank'
          href={`https://filscan.io/#/message/detail?cid=${cid}`}
        >
          <Label color='core.primary'>View transaction on Filscan</Label>
        </StyledATag> */}
        {err && (
          <Label color='status.fail.background' mt={3} mb={0}>
            {err}
          </Label>
        )}
      </Box>
    </>
  )
}

Confirming.propTypes = {
  cid: string.isRequired,
  err: string
}

Confirming.defaultProps = {
  err: ''
}

export const Confirmed = ({ address, cid }) => {
  return (
    <>
      <Box my={3}>
        <Text display='inline'>All set!</Text>{' '}
        <Text display='inline' color='core.primary'>
          {address}
        </Text>{' '}
        <Text display='inline'>has Filecoin.</Text>
      </Box>
      <StyledATag
        rel='noopener noreferrer'
        target='_blank'
        href={`https://filscan.io/#/message/detail?cid=${cid}`}
      >
        <Label color='core.primary'>View transaction on Filscan</Label>
      </StyledATag>
    </>
  )
}

Confirmed.propTypes = {
  address: ADDRESS_PROPTYPE,
  cid: string.isRequired
}
