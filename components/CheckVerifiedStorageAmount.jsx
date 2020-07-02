import React, { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { validateAddressString } from '@openworklabs/filecoin-address'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import { Card } from './Shared'

dayjs.extend(relativeTime)

import { Box, Button, Text, Input, Label, StepHeader } from './Shared'

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
      display='flex'
      flexDirection='column'
      m={3}
      mt={[4, 6]}
      width='100%'
      maxWidth={14}
    >
      <Text color='core.darkgray' textAlign='center' m='0' p='0'>
        Enter an address to check its current verified data allowance
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
              <Input.Base
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
                  setErr('')
                  setFilAddress(e.target.value)
                }}
              />
              <Button
                type='submit'
                title='Check'
                variant='secondary'
                mt={[2, 2, 0]}
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
              {filAddress} can reup its verified Filecoin data{' '}
              {dayjs().to(dayjs(mostRecentAllocation).add(30, 'day'))}.
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
