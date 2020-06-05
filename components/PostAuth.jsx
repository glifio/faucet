import React, { useState } from 'react'
import axios from 'axios'

export default ({ code }) => {
  const [filAddress, setFilAddress] = useState('')
  const onSubmit = async (e) => {
    e.preventDefault()
    console.log('Sending code and FIL address to server!', code, filAddress)
    const res = await axios.post(`${process.env.GITHUB_AUTH_SERVER_URL}`, {
      code,
      address: filAddress
    })
    // handle errors / success
  }
  return (
    <>
      <p>Next, enter the Filecoin address you'd like to verify.</p>
      <form onSubmit={onSubmit}>
        <div>
          <input
            placeholder='Filecoin address'
            value={filAddress}
            onChange={(e) => setFilAddress(e.target.value)}
          />
          <button type='submit'>Verify</button>
        </div>
      </form>
    </>
  )
}
