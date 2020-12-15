import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

export const GITHUB_CLIENT_ID = publicRuntimeConfig.GITHUB_CLIENT_ID
export const GITHUB_REDIRECT_URL = publicRuntimeConfig.GITHUB_REDIRECT_URL
export const BACKEND_URL = publicRuntimeConfig.BACKEND_URL
export const OAUTH_STATE_STRING = publicRuntimeConfig.OAUTH_STATE_STRING
export const LOTUS_NODE_JSONRPC = publicRuntimeConfig.LOTUS_NODE_JSONRPC
export const NETWORK_IDENTIFIER = publicRuntimeConfig.NETWORK_IDENTIFIER
export const IS_PROD = publicRuntimeConfig.IS_PROD

export const FILSCAN = 'https://api.filscan.io:8700/v0/filscan'
export const FILSCOUT = 'https://filscoutv2api.ipfsunion.cn'
