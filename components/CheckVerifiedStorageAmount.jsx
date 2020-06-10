import React, { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { validateAddressString } from '@openworklabs/filecoin-address'

import {
  Box,
  Button,
  Text,
  Input,
  InputLabelBase,
  Label,
  StepHeader
} from './Shared'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  flex-grow: 1;
  justify-content: space-around;
`

export default () => {
  const [filAddress, setFilAddress] = useState('')
  const [err, setErr] = useState('')
  const onSubmit = (e) => {
    e.preventDefault()
    const isValid = validateAddressString(filAddress)
    if (isValid) {
    } else {
      setErr('Invalid Filecoin address.')
    }
  }
  return (
    <Box
      width='100%'
      display='flex'
      flexDirection='column'
      justifyContent='space-between'
      height='100%'
    >
      <Box display='flex' flexDirection='row' alignItems='center'>
        <StepHeader glyphAcronym='Ck' showStepper={false} title='Check' />
      </Box>
      <Text>
        Enter a Filecoin address to check its verified Filecoin storage
        allowance.
      </Text>
      <Form onSubmit={onSubmit}>
        <Box
          display='flex'
          flexDirection='column'
          justifyContent='flex-start'
          width='100%'
        >
          <InputLabelBase htmlFor='fil-address'>
            Your FIL Address
          </InputLabelBase>
          <Box height={1} />
          <Input.Base
            id='fil-address'
            height={7}
            borderRadius={2}
            placeholder='f1OwL...'
            value={filAddress}
            onChange={(e) => {
              setErr('')
              setFilAddress(e.target.value)
            }}
          />
          {err && (
            <Label color='status.fail.background' mt={3} mb={0}>
              {err}
            </Label>
          )}
        </Box>
        <Box height={2} />
        <Button type='submit' title='Submit' variant='secondary' width='100%'>
          Check
        </Button>
      </Form>
    </Box>
  )
}
