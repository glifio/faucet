import React, { useState, createContext, useContext, useEffect } from 'react'
import { node } from 'prop-types'
import { NETWORK_IDENTIFIER } from '@env'

const JwtContext = createContext({})

export const JwtProvider = ({ children }) => {
  const [jwt, setJwt] = useState('')

  useEffect(() => {
    if (!!window && typeof window !== 'undefined') {
      // we had some breaking changes, so we're using a diff jwt
      const jwt = window.localStorage.getItem(
        `faucet-jwt:${NETWORK_IDENTIFIER}`
      )
      if (jwt) setJwt(jwt)
    }
  })

  const storeJwt = (jwt) => {
    setJwt(jwt)
    window.localStorage.setItem(
      `faucet-jwt:${NETWORK_IDENTIFIER}`,
      jwt
    )
  }

  const removeJwt = () => {
    setJwt('')
    window.localStorage.removeItem(
      `faucet-jwt:${NETWORK_IDENTIFIER}`
    )
  }

  return (
    <JwtContext.Provider value={{ jwt, removeJwt, storeJwt }}>
      {children}
    </JwtContext.Provider>
  )
}

JwtProvider.propTypes = {
  children: node
}

JwtProvider.defaultProps = {
  children: <></>
}

export const useJwt = () => {
  return useContext(JwtContext)
}
