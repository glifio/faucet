import React, { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { validateAddressString } from '@openworklabs/filecoin-address'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import {
  Box,
  Button,
  Card,
  Text,
  Input,
  InputLabelBase,
  Label,
  StepHeader
} from './Shared'
import reportError from '../utils/reportError'

dayjs.extend(relativeTime)

const Form = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-grow: 1;
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
      try {
        const res = await axios.get(
          `${process.env.VERIFIER_URL}/account-remaining-bytes/${filAddress}`
        )
        if (res.status !== 200) {
          setErr(res.statusText)
          reportError(
            'components/CheckVerifiedStorageAmount.jsx:1',
            false,
            res.statusText
          )
        } else {
          setRemainingBytes(res.data.remainingBytes)
          setMostRecentAllocation(res.data.mostRecentAllocation)
        }
      } catch (err) {
        setErr(err.message)
        reportError(
          'components/CheckVerifiedStorageAmount.jsx:2',
          false,
          err.reponse.data.error,
          err.message,
          err.stack
        )
      }
    } else {
      setErr('Invalid Filecoin address.')
    }
    setLoading(false)
  }

  const calcNextAllocationTime = () => {
    if (dayjs(mostRecentAllocation).isBefore(dayjs())) {
      return 'now'
    }
    return dayjs().to(dayjs(mostRecentAllocation).add(30, 'day'))
  }

  return (
    <Box
      display='flex'
      flexDirection='column'
      m={3}
      mt={[4, 6]}
      width='100%'
      maxWidth={14}
    >
      <Text color='core.darkgray' textAlign='center' m='0' p='0'>
        Enter an address to check its verification status
      </Text>
      <Card
        p={3}
        mt={3}
        border={0}
        display='flex'
        flexDirection='column'
        justifyContent='space-between'
        bg='background.screen'
        boxShadow={2}
      >
        <Box
          display='flex'
          flexDirection='row'
          justifyContent='space-between'
          flexWrap='wrap'
        >
          <StepHeader
            glyphAcronym='Ck'
            showStepper={false}
            title=''
            loading={loading}
            width='auto'
          />
          <Form onSubmit={onSubmit}>
            <Box display='flex' flexGrow='1' flexWrap='wrap'>
              <InputLabelBase display='none' htmlFor='check-fil-address' />
              <Input.Base
                id='check-fil-address'
                width='auto'
                flexShrink='1'
                height={7}
                minWidth={11}
                mr={2}
                mt={[2, 2, 0]}
                overflow='scroll'
                borderRadius={2}
                placeholder='f1OwL...'
                value={filAddress}
                onChange={(e) => {
                  setMostRecentAllocation('')
                  setRemainingBytes(null)
                  setErr('')
                  setFilAddress(e.target.value)
                }}
              />
              <Button
                type='submit'
                title='Check'
                variant='secondary'
                mt={[2, 2, 0]}
                disabled={!filAddress}
              />
            </Box>
          </Form>
        </Box>
      </Card>
      <Box p={3} pt={0} mx={3}>
        {remainingBytes && !err && (
          <>
            <Text color='core.primary'>
              {filAddress} has {remainingBytes} bytes of verified Filecoin
              storage left.
            </Text>
            <Text color='core.black'>
              {filAddress} can renew its verification {calcNextAllocationTime()}
              .
            </Text>
          </>
        )}
        {err && (
          <Label color='status.fail.background' mt={3} mb={0}>
            {err}
          </Label>
        )}
      </Box>
    </Box>
  )
}
