import React from 'react'

import ErrorView from '../components/ErrorView'

export default () => (
  <ErrorView
    title='Oops, something went wrong.'
    description="We've been notified of the issue."
    linkDisplay='Follow @openworklabs for updates.'
    linkhref='https://twitter.com/openworklabs'
  />
)
