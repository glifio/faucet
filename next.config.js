const {
  PHASE_PRODUCTION_BUILD,
  PHASE_PRODUCTION_SERVER
} = require('next/constants')

module.exports = (phase) => {
  if (phase === PHASE_PRODUCTION_SERVER || phase === PHASE_PRODUCTION_BUILD) {
    return {
      env: {
        GITHUB_CLIENT_ID: '8861de8f921b556a4a0e',
        GITHUB_REDIRECT_URL: 'https://github-oauth.glif.io/callback',
        BACKEND_URL: 'https://spacerace.verifier.glif.io',
        OAUTH_STATE_STRING: 'faucet-spacerace',
        LOTUS_NODE_JSONRPC: 'https://node.glif.io/space01/lotus/rpc/v0',
        NETWORK_IDENTIFIER: 'space-race',
        IS_PROD: true
      }
    }
  }

  return {
    env: {
      GITHUB_CLIENT_ID: '82c4ac1b64e9ef7a0efa',
      GITHUB_REDIRECT_URL: 'http://localhost:3000/callback',
      BACKEND_URL: 'http://localhost:8080',
      OAUTH_STATE_STRING: 'faucet-spacerace',
      LOTUS_NODE_JSONRPC: 'http://localhost:1234/rpc/v0',
      NETWORK_IDENTIFIER: 'local',
      IS_PROD: false
    }
  }
}
