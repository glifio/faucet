import React, { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { validateAddressString } from '@openworklabs/filecoin-address'

import {
  Box,
  Button,
  StepHeader,
  Text,
  Input,
  InputLabelBase,
  Label
} from './Shared'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  flex-grow: 1;
  justify-content: space-around;
`

export default ({ code }) => {
  const [filAddress, setFilAddress] = useState('')
  const [err, setErr] = useState('')
  const onSubmit = async (e) => {
    e.preventDefault()
    const isValid = validateAddressString(filAddress)
    if (isValid) {
      try {
        const res = await axios.post(`${process.env.GITHUB_AUTH_SERVER_URL}`, {
          code,
          filecoinAddress: filAddress,
          state: process.env.OAUTH_STATE_STRING
        })
        // handle response errors like: account too young, already have too muc hstorage... etc
      } catch (error) {
        setErr(error.message)
      }
    } else {
      setErr('Invalid Filecoin address.')
    }
  }
  return (
    <>
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='space-between'
        height='100%'
      >
        <StepHeader
          currentStep={2}
          totalSteps={2}
          glyphAcronym='Vr'
          title='Verify'
        />
        <Text>
          Enter the Filecoin address to grant verified Filecoin storage.
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
              placeholder='f1OwL...'
              value={filAddress}
              onChange={(e) => {
                setErr('')
                setFilAddress(e.target.value)
              }}
              borderRadius={2}
            />
            {err && (
              <Label color='status.fail.background' mt={3} mb={0}>
                {err}
              </Label>
            )}
          </Box>
          <Box height={2} />
          <Button type='submit' title='Submit'>
            Verify
          </Button>
        </Form>
      </Box>
    </>
  )
}
