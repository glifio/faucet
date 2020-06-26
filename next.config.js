const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        GITHUB_CLIENT_ID: '82c4ac1b64e9ef7a0efa',
        GITHUB_REDIRECT_URL: 'http://localhost:3000',
        VERIFIER_URL: 'http://localhost:8080',
        OAUTH_STATE_STRING: 'aslkdjflskjdflksjfdlj',
        LOTUS_NODE_JSONRPC: 'https://node.glif.io/02/rpc/v0'
      }
    }
  }

  return {
    env: {
      GITHUB_CLIENT_ID: '8861de8f921b556a4a0e',
      GITHUB_REDIRECT_URL: 'https://www.verify.glif.io',
      VERIFIER_URL: 'http://localhost:8080',
      OAUTH_STATE_STRING: 'aslkdjflskjdflksjfdlj',
      LOTUS_NODE_JSONRPC: 'https://node.glif.io/02/rpc/v0'
    }
  }
}
