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
  publicRuntimeConfig: {
    // Will be available on both server and client
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_REDIRECT_URL: process.env.GITHUB_REDIRECT_URL,
    BACKEND_URL: process.env.BACKEND_URL,
    OAUTH_STATE_STRING: process.env.OAUTH_STATE_STRING,
    LOTUS_NODE_JSONRPC: process.env.LOTUS_NODE_JSONRPC,
    NETWORK_IDENTIFIER: process.env.NETWORK_IDENTIFIER,
    IS_PROD: process.env.IS_PROD
  }
}
