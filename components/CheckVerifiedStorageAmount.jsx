import React, { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { validateAddressString } from '@openworklabs/filecoin-address'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

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
  const [loading, setLoading] = useState(false)
  const [remainingBytes, setRemainingBytes] = useState(null)
  const [mostRecentAllocation, setMostRecentAllocation] = useState('')
  const onSubmit = async (e) => {
    e.preventDefault()
    const isValid = validateAddressString(filAddress)
    if (isValid) {
      setLoading(true)
      const res = await axios.get(
        `${process.env.VERIFIER_URL}/account-remaining-bytes/${filAddress}`
      )
      if (res.status !== 200) setErr(res.statusText)
      else {
        setRemainingBytes(res.data.remainingBytes)
        setMostRecentAllocation(res.data.mostRecentAllocation)
      }
    } else {
      setErr('Invalid Filecoin address.')
    }
    setLoading(false)
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
        <StepHeader
          glyphAcronym='Ck'
          showStepper={false}
          title='Check'
          loading={loading}
        />
      </Box>
      {remainingBytes ? (
        <>
          <Text color='core.primary'>
            {filAddress} has {remainingBytes} bytes of verified Filecoin storage
            left.
          </Text>
          <Text color='core.black'>
            {filAddress} can reup its verified Filecoin data{' '}
            {dayjs().to(dayjs(mostRecentAllocation).add(30, 'day'))}.
          </Text>
        </>
      ) : (
        <>
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
            <Button
              type='submit'
              title='Submit'
              variant='secondary'
              width='100%'
            >
              Check
            </Button>
          </Form>
        </>
      )}
    </Box>
  )
}
