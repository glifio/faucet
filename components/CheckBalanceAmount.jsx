import React, { useState } from 'react'
import LotusRpcEngine from '@openworklabs/lotus-jsonrpc-engine'
import { FilecoinNumber } from '@openworklabs/filecoin-number'
import styled from 'styled-components'
import { validateAddressString } from '@openworklabs/filecoin-address'

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
  const [balance, setBalance] = useState(null)
  const onSubmit = async (e) => {
    e.preventDefault()
    const isValid = validateAddressString(filAddress)
    if (isValid) {
      setLoading(true)
      try {
        const lotus = new LotusRpcEngine({
          apiAddress: process.env.LOTUS_NODE_JSONRPC
        })

        const balance = new FilecoinNumber(
          await lotus.request('WalletBalance', filAddress),
          'attofil'
        )
        setBalance(balance)
      } catch (err) {
        setErr(err.message)
        reportError(
          'components/CheckBalanceAmount.jsx:1',
          false,
          err.message,
          err.stack
        )
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
        Enter an address to check its FIL balance
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
        {balance && !err && (
          <Text color='core.primary'>
            {filAddress} has {balance}.
          </Text>
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
