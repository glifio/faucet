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
      minHeight={10}
      width='100%'
      maxWidth={13}
      alignItems='center'
      justifyContent='center'
    >
      <Box
        display='flex'
        width='100%'
        justifyContent='space-between'
        flexWrap='wrap'
        mb={3}
      >
        <Text
          color='core.nearblack'
          textAlign='center'
          p='0'
          m={0}
          textTransform='uppercase'
        >
          CHECK
        </Text>
        <Text color='core.darkgray' textAlign='left' p='0' m={0}>
          Enter an address to check its balance
        </Text>
      </Box>
      <Card
        p={0}
        border={0}
        width='100%'
        maxWidth={13}
        height={7}
        display='flex'
        flexDirection='column'
        justifyContent='space-between'
        boxShadow={2}
      >
        <Box
          display='flex'
          flexDirection='row'
          justifyContent='space-between'
          flexWrap='wrap'
          // bg='input.background.base'
        >
          <Form onSubmit={onSubmit}>
            <Box
              position='relative'
              display='flex'
              flexGrow='1'
              flexWrap='wrap'
              alignItems='center'
            >
              <InputLabelBase display='none' htmlFor='check-fil-address' />
              <Input.Base
                id='check-fil-address'
                width='100%'
                flexShrink='1'
                pr={8}
                overflow='scroll'
                placeholder='t1OwL...'
                value={filAddress}
                onChange={(e) => {
                  setBalance(null)
                  setErr('')
                  setFilAddress(e.target.value)
                }}
              />
              <Button
                type='submit'
                title='Check'
                variant='secondary'
                mx={2}
                px={4}
                disabled={!filAddress}
                bg='transparent'
                css={`
                  position: absolute;
                  right: 0;
                `}
              />
            </Box>
          </Form>
        </Box>
      </Card>
      <Box p={3} pt={0} mx={3}>
        {balance && !err && (
          <Text color='core.primary'>
            {filAddress} has {balance.toFil()} FIL.
          </Text>
        )}
        <Label color='status.fail.background' minHeight={6} mt={3} mb={0}>
          {err}
        </Label>
      </Box>
    </Box>
  )
}
