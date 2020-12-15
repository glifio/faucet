import React, { createContext, useContext, useRef, useCallback } from 'react'
import { node } from 'prop-types'
import LotusRpcEngine from '@openworklabs/lotus-jsonrpc-engine'
import { setFaucetGrant, removeFaucetGrantCid } from '../utils/storage'
import { LOTUS_NODE_JSONRPC } from '@env'

const ConfirmMessageContext = createContext({})

export const MessageConfirmerProvider = ({ children }) => {
  const timeout = useRef()
  const confirm = useCallback(
    (msgCid, enteredAddress, sentAddress, pollInterval = 3000) => {
      setFaucetGrant(msgCid, enteredAddress, sentAddress)
      return new Promise((resolve, reject) => {
        if (timeout.current) {
          clearTimeout(timeout.current)
        }

        timeout.current = setTimeout(async () => {
          try {
            const lotus = new LotusRpcEngine({
              apiAddress: LOTUS_NODE_JSONRPC
            })
            const res = await lotus.request('StateSearchMsg', {
              '/': msgCid
            })

            if (res && res.Receipt && res.Receipt.ExitCode === 0) {
              removeFaucetGrantCid()
              return resolve(true)
            } else if (res && res.Receipt && res.Receipt.ExitCode !== 0) {
              removeFaucetGrantCid()
              return reject(new Error('Transaction failed'))
            } else {
              return resolve(confirm(msgCid, enteredAddress, sentAddress))
            }
          } catch (err) {
            if (err.message.includes('504'))
              return resolve(confirm(msgCid, enteredAddress, sentAddress))
            removeFaucetGrantCid()
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
