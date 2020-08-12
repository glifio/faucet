import React, { useState, createContext, useContext, useEffect } from 'react'
import { node } from 'prop-types'

const JwtContext = createContext({})

export const JwtProvider = ({ children }) => {
  const [jwt, setJwt] = useState('')

  useEffect(() => {
    if (!!window && typeof window !== 'undefined') {
      // remove previous JWT from last version
      window.localStorage.removeItem('faucet-jwt')

      // we had some breaking changes, so we're using a diff jwt
      const jwt = window.localStorage.getItem(`faucet-jwt:2`)
      if (jwt) setJwt(jwt)
    }
  })

  const storeJwt = (jwt) => {
    setJwt(jwt)
    window.localStorage.setItem(`faucet-jwt:2`, jwt)
  }

  const removeJwt = () => {
    setJwt('')
    window.localStorage.removeItem(`faucet-jwt:2`)
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
