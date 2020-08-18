import React from 'react'
import { string } from 'prop-types'
import { Box, Text, Label, StyledATag } from '../Shared'
import { ADDRESS_PROPTYPE } from '../../customPropTypes'

export const Confirming = ({ err }) => {
  return (
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='flex-start'
      width='100%'
    >
      {err && (
        <Label color='status.fail.background' m={0}>
          {err}
        </Label>
      )}
    </Box>
  )
}

Confirming.propTypes = {
  err: string
}

Confirming.defaultProps = {
  err: ''
}

export const Confirmed = ({ address, enteredAddress, cid }) => {
  return (
    <Box display='flex' alignItems='center' justifyContent='center'>
      {address !== enteredAddress ? (
        <Text display='inline' my={0} mx={2}>
          Filecoin sent to {address} - {enteredAddress}'s worker address
        </Text>
      ) : (
        <Text display='inline' my={0} mx={2}>
          Filecoin sent to {address}
        </Text>
      )}{' '}
      <StyledATag
        display='inline'
        rel='noopener noreferrer'
        target='_blank'
        border='none'
        href={`https://filscan.io/#/message/detail?cid=${cid}`}
      >
        <Label color='core.primary'>VIEW</Label>
      </StyledATag>
    </Box>
  )
}

Confirmed.propTypes = {
  address: ADDRESS_PROPTYPE,
  enteredAddress: ADDRESS_PROPTYPE,
  cid: string.isRequired
}
