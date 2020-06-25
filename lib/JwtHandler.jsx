import React, { useState, createContext, useContext, useEffect } from 'react'

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
  return (
    <JwtContext.Provider value={{ jwt, storeJwt }}>
      {children}
    </JwtContext.Provider>
  )
}

export const useJwt = () => {
  return useContext(JwtContext)
}
