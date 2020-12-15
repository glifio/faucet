import React, { useEffect, useState } from 'react'
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
  Card
} from '../Shared'
import Loading from '../Shared/LoaderGlyph'
import { Confirming, Confirmed } from './CardStates'
import { useJwt } from '../../lib/JwtHandler'
import { useMessageConfirmation } from '../../lib/ConfirmMessage'
import { getFaucetGrant, removeFaucetGrantCid } from '../../utils/storage'
import reportError from '../../utils/reportError'
import { BACKEND_URL } from '@env'

const Form = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-grow: 1;
`

const StepHeaderTitle = ({ confirming, confirmed, error }) => {
  if (error) return 'Oops. Try again.'
  if (confirming) return 'Confirming...'
  if (confirmed) return 'Success!'
  if (!confirming && !confirmed) return ''
}

export default () => {
  const [filAddress, setFilAddress] = useState('')
  const [confirming, setConfirming] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [cidToConfirm, setCidToConfirm] = useState('')
  const [sentAddress, setSentAddress] = useState('')
  const [err, setErr] = useState('')
  const { jwt, removeJwt } = useJwt()
  const { confirm } = useMessageConfirmation()

  useEffect(() => {
    const confirmMsgFromStorage = async (cid, address, sentAddress) => {
      setConfirming(true)
      try {
        await confirm(cid, address, sentAddress)
        setConfirmed(true)
      } catch (err) {
        setFilAddress('')
        setErr(err.message)
        reportError(
          'components/PostAuth/index.jsx:3',
          false,
          err.message,
          err.stack
        )
      }
      setConfirming(false)
    }
    const pendingFaucetGrant = getFaucetGrant()
    if (pendingFaucetGrant.cid && !confirming && !err) {
      confirmMsgFromStorage(
        pendingFaucetGrant.cid,
        pendingFaucetGrant.address,
        pendingFaucetGrant.sentAddress
      )
      setFilAddress(pendingFaucetGrant.address)
      setSentAddress(pendingFaucetGrant.sentAddress)
      setCidToConfirm(pendingFaucetGrant.cid)
    }
  }, [confirming, confirm, setConfirming, setErr])

  const requestFaucetGrant = async (jwt, filAddress) => {
    const res = await axios.post(
      `${BACKEND_URL}/faucet/${filAddress}`,
      {
        targetAddr: filAddress
      },
      {
        headers: { Authorization: `Bearer ${jwt}` }
      }
    )
    if (res.status !== 200) {
      throw new Error(res.data.error)
    }
    setCidToConfirm(res.data.cid)
    return {
      faucetGrantCid: res.data.cid,
      faucetGrantAddress: res.data.toAddress
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setErr('')
    const isValid = validateAddressString(filAddress)
    const isActorAddress = filAddress[1] === '2'
    if (isActorAddress) {
      setErr("Please use this actor's ID address (t0)")
      return
    }
    if (isValid) {
      setConfirming(true)
      try {
        const { faucetGrantCid, faucetGrantAddress } = await requestFaucetGrant(
          jwt,
          filAddress
        )
        await confirm(faucetGrantCid, filAddress, faucetGrantAddress)
        setSentAddress(faucetGrantAddress)
        setConfirmed(true)
      } catch (error) {
        if (error.response && error.response.status === 403) {
          setErr(error.response.data.error)
        } else {
          setErr(error.message)
          reportError(
            'components/PostAuth/index.jsx:2',
            false,
            error.message,
            error.stack
          )
        }
        setFilAddress('')
      }
      setConfirming(false)
    } else {
      setErr('Invalid Filecoin address.')
      setFilAddress('')
    }
  }

  const reset = () => {
    setErr('')
    setFilAddress('')
    removeJwt('')
    removeFaucetGrantCid()
  }

  const back = () => {
    setErr('')
    setFilAddress('')
    removeFaucetGrantCid()
    setCidToConfirm('')
    setConfirmed(false)
  }

  return (
    <>
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
          REQUEST
        </Text>
        <Text color='core.darkgray' textAlign='left' p='0' m={0}>
          Enter an address to request FIL
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
        bg={
          err
            ? 'status.fail.background'
            : confirmed
            ? 'status.success.background'
            : 'input.background.base'
        }
      >
        {!confirming && !confirmed && !err && (
          <Form onSubmit={onSubmit}>
            <Box
              position='relative'
              display='flex'
              flexGrow='1'
              flexWrap='wrap'
              alignItems='center'
            >
              <InputLabelBase display='none' htmlFor='fil-address' />
              <Input.Base
                id='fil-address'
                width='100%'
                pr={8}
                overflow='scroll'
                placeholder='t1OwL...'
                value={filAddress}
                onChange={(e) => {
                  setErr('')
                  setFilAddress(e.target.value)
                }}
              />
              <Button
                position='absolute'
                right='0'
                mx={2}
                type='submit'
                title='Request'
                disabled={!filAddress}
              />
            </Box>
          </Form>
        )}
        <Box
          display='flex'
          flexDirection='row'
          justifyContent='space-between'
          alignItems='center'
          flexWrap='wrap'
          height='100%'
        >
          <Text
            m={0}
            px={4}
            maxWidth={10}
            whiteSpace='nowrap'
            textOverflow='ellipsis'
            overflow='hidden'
          >
            {StepHeaderTitle({ confirmed, confirming, error: err })}
          </Text>
          {confirming && !err && (
            <Box mr={2}>
              <Loading />
            </Box>
          )}
          {confirmed && !err && (
            <Button mx={2} variant='secondary' title='Return' onClick={back} />
          )}
          {err && (
            <Button mx={2} variant='secondary' title='Retry' onClick={reset} />
          )}
        </Box>
      </Card>
      <Box
        display='flex'
        width='100%'
        textAlign='left'
        minHeight={7}
        pt={3}
        px={2}
        color='core.darkgray'
      >
        {confirming && !err && <Confirming />}
        {!confirming && confirmed && !err && (
          <Confirmed
            address={sentAddress}
            enteredAddress={filAddress}
            cid={cidToConfirm}
          />
        )}
        {err && (
          <Label color='status.fail.background' m={0}>
            {err}
          </Label>
        )}
      </Box>
    </>
  )
}
