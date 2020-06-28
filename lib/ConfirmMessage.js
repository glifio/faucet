import React, { createContext, useContext, useRef, useCallback } from 'react'
import { node } from 'prop-types'
import LotusRpcEngine from '@openworklabs/lotus-jsonrpc-engine'

const ConfirmMessageContext = createContext({})

export const MessageConfirmerProvider = ({ children }) => {
  const timeout = useRef()
  const confirm = useCallback(
    (msgCid, pollInterval = 3000) =>
      new Promise((resolve, reject) => {
        if (timeout.current) {
          clearTimeout(timeout.current)
        }

        timeout.current = setTimeout(async () => {
          try {
            const lotus = new LotusRpcEngine({
              apiAddress: process.env.LOTUS_NODE_JSONRPC,
              token: ''
            })
            const res = await lotus.request('StateSearchMsg', {
              '/': msgCid
            })

            // TODO: exit code ?
            if (res && res.Receipt.ExitCode === 16) {
              return resolve(true)
            } else if (res && res.Receipt.ExitCode !== 0) {
              return reject(new Error('Transaction failed'))
            } else {
              return resolve(confirm(msgCid))
            }
          } catch (err) {
            if (err.message.includes('504')) return resolve(confirm(msgCid))
            return reject(err)
          }
        }, pollInterval)
      })
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
