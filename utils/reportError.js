import axios from 'axios'
// import Router from 'next/router'

// This simply formats error messages and sends them to our slack channel
export default async (id, shouldSendToErrorPage, ...args) => {
  let errorText = args.reduce(
    (err, ele) => {
      return `${err}\n${ele}`
    },
    [`VERIFIER:${id}\n`]
  )
  errorText += '------------'
  if (process.env.IS_PROD) {
    await axios.post(
      'https://errors.glif.io',
      JSON.stringify({ text: errorText })
    )
  }
  if (shouldSendToErrorPage) Router.push('/error/wallet-down')
}
