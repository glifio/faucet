import { Component } from 'react'
import axios from 'axios'
import CallbackRedirect from '../components/CallbackRedirect'

const getJWT = async (code) => {
  const res = await axios.post(`${process.env.VERIFIER_URL}/oauth/github`, {
    code,
    state: process.env.OAUTH_STATE_STRING
  })
  if (res.status !== 200) throw new Error(res.statusText)
  return res.data.jwt
}

export default class Callback extends Component {
  static async getInitialProps({ query }) {
    try {
      const jwt = await getJWT(query.code)
      return { jwt, err: null }
    } catch (err) {
      console.log('err', err.message)
      return { jwt: '', err }
    }
  }

  render() {
    return <CallbackRedirect jwt={this.props.jwt} />
  }
}
