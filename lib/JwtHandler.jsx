import React, { useState, createContext, useContext, useEffect } from 'react'
import { node } from 'prop-types'

const JwtContext = createContext({})

export const JwtProvider = ({ children }) => {
  const [jwt, setJwt] = useState('')

  useEffect(() => {
    if (!!window && typeof window !== 'undefined') {
      const jwt = window.localStorage.getItem('verifier-jwt')
      if (jwt) setJwt(jwt)
    }
  })

  const storeJwt = (jwt) => {
    setJwt(jwt)
    window.localStorage.setItem('verifier-jwt', jwt)
  }

  const removeJwt = () => {
    setJwt('')
    window.localStorage.removeItem('verifier-jwt')
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
