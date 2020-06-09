import React from 'react'

export default () => {
  return (
    <>
      <p>First, go ahead and authenticate with GitHub.</p>
      <button
        type='button'
        onClick={() => {
          window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_REDIRECT_URL}&state=${process.env.OAUTH_STATE_STRING}`
        }}
      >
        Authenticate
      </button>
    </>
  )
}
