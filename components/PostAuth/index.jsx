import React, { useEffect, useState } from 'react'
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
  Label,
  Card
} from '../Shared'
import { Confirming, Confirmed } from './CardStates'
import { useJwt } from '../../lib/JwtHandler'
import { useMessageConfirmation } from '../../lib/ConfirmMessage'
import { getFaucetGrant, removeFaucetGrantCid } from '../../utils/storage'
import reportError from '../../utils/reportError'

const Form = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-grow: 1;
`

const StepHeaderTitle = ({ confirming, confirmed, error }) => {
  if (error) return 'Oops. Please try again.'
  if (confirming) return 'Confirming...'
  if (confirmed) return 'You have successfully received FIL'
  if (!confirming && !confirmed) return ''
}

export default () => {
  const [filAddress, setFilAddress] = useState('')
  const [confirming, setConfirming] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [cidToConfirm, setCidToConfirm] = useState('')
  const [err, setErr] = useState('')
  const { jwt, removeJwt } = useJwt()
  const { confirm } = useMessageConfirmation()

  useEffect(() => {
    const confirmMsgFromStorage = async (cid, address) => {
      setConfirming(true)
      try {
        await confirm(cid, address)
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
      confirmMsgFromStorage(pendingFaucetGrant.cid, pendingFaucetGrant.address)
      setFilAddress(pendingFaucetGrant.address)
    }
  }, [confirming, confirm, setConfirming, setErr])

  const requestFaucetGrant = async (jwt, filAddress) => {
    const res = await axios.post(
      `${process.env.BACKEND_URL}/faucet/${filAddress}`,
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
    return res.data.cid
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setErr('')
    const isValid = validateAddressString(filAddress)
    if (isValid) {
      setConfirming(true)
      try {
        const faucetGrantCid = await requestFaucetGrant(jwt, filAddress)
        await confirm(faucetGrantCid)
        setConfirmed(true)
      } catch (error) {
        setErr(error.message)
        setFilAddress('')
        reportError(
          'components/PostAuth/index.jsx:2',
          false,
          err.message,
          err.stack
        )
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

  return (
    <Box display='flex' flexDirection='column' m={3} width='100%' maxWidth={14}>
      <Text color='core.darkgray' textAlign='center' m='0' p='0'>
        {!confirmed && !confirming && !err && 'Enter an address to request FIL'}
        {confirming && '.  .  .'}
        {confirmed && 'Niceee, transaction success!'}
        {err && 'Uh oh'}
      </Text>
      <Card
        p={3}
        mt={3}
        border={0}
        display='flex'
        flexDirection='column'
        justifyContent='space-between'
        minWidth={11}
        bg={
          confirmed
            ? 'status.success.background'
            : err
            ? 'status.fail.background'
            : 'background.screen'
        }
        boxShadow={2}
      >
        <Box display='flex' flexWrap='wrap' justifyContent='space-between'>
          <StepHeader
            showStepper={false}
            glyphAcronym={err ? 'Er' : 'Vr'}
            loading={confirming}
            title=''
            width='auto'
            title={StepHeaderTitle({ confirmed, confirming, error: err })}
          />
          {!confirming && !confirmed && !err && (
            <Form onSubmit={onSubmit}>
              <Box display='flex' flexGrow='1' flexWrap='wrap'>
                <InputLabelBase display='none' htmlFor='fil-address' />
                <Input.Base
                  id='fil-address'
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
                  mt={[2, 2, 0]}
                  type='submit'
                  title='Request'
                  disabled={!filAddress}
                />
              </Box>
            </Form>
          )}
          {err && <Button variant='secondary' title='Retry' onClick={reset} />}
        </Box>
      </Card>
      <Box p={3} pt={0} mx={3}>
        {confirming && <Confirming cid={cidToConfirm} err={err} />}
        {!confirming && confirmed && (
          <Confirmed address={filAddress} cid={cidToConfirm} />
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
