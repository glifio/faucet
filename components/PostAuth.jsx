import React, { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'

import { Box, Button, StepHeader, Text, Input, InputLabelBase } from './Shared'

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
  const onSubmit = async (e) => {
    e.preventDefault()
    const res = await axios.post(`${process.env.GITHUB_AUTH_SERVER_URL}`, {
      code,
      filecoinAddress: filAddress,
      state: process.env.OAUTH_STATE_STRING
    })
    // handle errors / success
  }
  return (
    <>
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='space-between'
        height='100%'
      >
        <StepHeader currentStep={2} totalSteps={2} glyphAcronym='Vr' />
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
            <InputLabelBase htmlFor='fil-address'>FIL Address</InputLabelBase>
            <Box height={1} />
            <Input.Base
              id='fil-address'
              height={6}
              maxHeight={6}
              placeholder='f1OwL...'
              value={filAddress}
              onChange={(e) => setFilAddress(e.target.value)}
            />
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
