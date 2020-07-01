import React, { createContext, useContext, useRef, useCallback } from 'react'
import { node } from 'prop-types'
import LotusRpcEngine from '@openworklabs/lotus-jsonrpc-engine'
import { setVerification, removeVerificationCid } from '../utils/storage'

const ConfirmMessageContext = createContext({})

export const MessageConfirmerProvider = ({ children }) => {
  const timeout = useRef()
  const confirm = useCallback(
    (msgCid, filecoinAddress, pollInterval = 3000) => {
      setVerification(msgCid, filecoinAddress)
      return new Promise((resolve, reject) => {
        if (timeout.current) {
          clearTimeout(timeout.current)
        }

        timeout.current = setTimeout(async () => {
          try {
            const lotus = new LotusRpcEngine({
              apiAddress: process.env.LOTUS_NODE_JSONRPC
            })
            const res = await lotus.request('StateSearchMsg', {
              '/': msgCid
            })

            if (res && res.Receipt.ExitCode === 0) {
              removeVerificationCid()
              return resolve(true)
            } else if (res && res.Receipt.ExitCode !== 0) {
              return reject(new Error('Transaction failed'))
            } else {
              return resolve(confirm(msgCid, filecoinAddress))
            }
          } catch (err) {
            if (err.message.includes('504'))
              return resolve(confirm(msgCid, filecoinAddress))
            return reject(err)
          }
        }, pollInterval)
      })
    }
  )

  return (
    <ConfirmMessageContext.Provider
      value={{
        confirm
      }}
    >
      {children}
    </ConfirmMessageContext.Provider>
  )
}

MessageConfirmerProvider.propTypes = {
  children: node
}

MessageConfirmerProvider.defaultProps = {
  children: <></>
}

export const useMessageConfirmation = () => {
  return useContext(ConfirmMessageContext)
}
