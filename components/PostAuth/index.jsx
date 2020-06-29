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
} from '../Shared'
import { Confirming, Confirmed } from './CardStates'
import { useJwt } from '../../lib/JwtHandler'
import { useMessageConfirmation } from '../../lib/ConfirmMessage'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  flex-grow: 1;
  justify-content: space-around;
`

const StepHeaderTitle = ({ confirming, confirmed, error }) => {
  if (error) return 'Error'
  if (confirming) return 'Confirming...'
  if (confirmed) return 'Verified'
  if (!confirming && !confirmed) return 'Verify'
}

export default () => {
  const [filAddress, setFilAddress] = useState('')
  const [confirming, setConfirming] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [cidToConfirm, setCidToConfirm] = useState('')
  const [err, setErr] = useState('')
  const { jwt } = useJwt()
  const { confirm } = useMessageConfirmation()

  const verify = async (jwt, filAddress) => {
    const res = await axios.post(
      `${process.env.VERIFIER_URL}/verify`,
      {
        targetAddr: filAddress
      },
      {
        headers: { Authorization: `Bearer ${jwt}` }
      }
    )
    if (res.status !== 200) throw new Error(res.data.error)
    setCidToConfirm(res.data.cid)
    return res.data.cid
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setErr('')
    const isValid = validateAddressString(filAddress)
    if (isValid) {
      setConfirming(true)
      setFilAddress('')
      try {
        const verificationCid = await verify(jwt, filAddress)
        await confirm(verificationCid)
        setConfirmed(true)
      } catch (error) {
        setErr(error.response.data.error)
      }
      setConfirming(false)
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
          currentStep={confirming ? 3 : 2}
          showStepper={!confirmed}
          totalSteps={3}
          glyphAcronym='Vr'
          loading={confirming}
          title={StepHeaderTitle({ confirmed, confirming, error: err })}
        />
        {confirming && <Confirming cid={cidToConfirm} err={err} />}
        {!confirming && confirmed && (
          <Confirmed address={filAddress} cid={cidToConfirm} />
        )}
        {!confirming && !confirmed && (
          <>
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
              <Button type='submit' title='Verify' />
            </Form>
          </>
        )}
      </Box>
    </>
  )
}
