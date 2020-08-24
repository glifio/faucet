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
    setErr('')
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
      p={3}
      mt={5}
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
                position='absolute'
                right='0'
                type='submit'
                title='Check'
                variant='secondary'
                mx={2}
                px={4}
                disabled={!filAddress}
                bg='transparent'
              />
            </Box>
          </Form>
        </Box>
      </Card>
      <Box display='flex' width='100%' minHeight={6} pt={3} px={2}>
        {balance && !err && (
          <>
            <Label
              display='inline-block'
              color='core.darkgray'
              maxWidth={9}
              m={0}
              overflow='hidden'
              css={`
                text-overflow: ellipsis;
                white-space: nowrap;
              `}
            >
              {filAddress}
            </Label>
            <Label display='inline-block' color='core.darkgray' my={0}>
              has
            </Label>
            <Label display='inline-block' color='core.primary' ml={1} my={0}>
              {balance.toFil()} FIL
            </Label>
          </>
        )}
        <Label color='status.fail.background' m={0}>
          {err}
        </Label>
      </Box>
    </Box>
  )
}
