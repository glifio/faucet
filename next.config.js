const webpack = require('webpack')
const path = require('path')

module.exports = {
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@env': path.join(__dirname, './constants.js'),
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
      next: path.resolve('./node_modules/next'),
      'styled-components': path.resolve('./node_modules/styled-components')
    }
    return config
  },
  env: {
    NEXT_PUBLIC_GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    NEXT_PUBLIC_GITHUB_REDIRECT_URL: process.env.GITHUB_REDIRECT_URL,
    NEXT_PUBLIC_BACKEND_URL: process.env.BACKEND_URL,
    NEXT_PUBLIC_OAUTH_STATE_STRING: process.env.OAUTH_STATE_STRING,
    NEXT_PUBLIC_LOTUS_NODE_JSONRPC: process.env.LOTUS_NODE_JSONRPC,
    NEXT_PUBLIC_NETWORK_IDENTIFIER: process.env.NETWORK_IDENTIFIER,
    NEXT_PUBLIC_IS_PROD: process.env.IS_PROD
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
  }
}
