import { Component } from 'react'
import axios from 'axios'
import CallbackRedirect from '../components/CallbackRedirect'
import reportError from '../utils/reportError'
import { BACKEND_URL } from '@env'

const getJWT = async (code, state) => {
  const res = await axios.post(`${BACKEND_URL}/oauth/github`, {
    code,
    state
  })
  if (res.status !== 200) throw new Error(res.statusText)
  return res.data.jwt
}

export default class Callback extends Component {
  static async getInitialProps({ query, res }) {
    try {
      const jwt = await getJWT(query.code, query.state)
      return { jwt, err: null }
    } catch (err) {
      if (typeof window === 'undefined') {
        // we redirect the error in the catch statement,
        // since reportError can only make client side transitions
        reportError(
          'pages/callback.js:1',
          false,
          !!query.code,
          err.message,
          err.stack
        )
        res.writeHead(307, { Location: '/error' })
        res.end()
      } else {
        reportError(
          'pages/callback.js:2',
          true,
          !!query.code,
          err.message,
          err.stack
        )
      }
      return { jwt: '', err }
    }
  }

  render() {
    return <CallbackRedirect jwt={this.props.jwt} />
  }
}
