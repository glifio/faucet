import React from 'react'
import PropTypes from 'prop-types'
import reportError from '../utils/reportError'
import ErrorView from './ErrorView'

// This component catches all uncaught react and syncronous JS errors
// and forwards the user to an error page + sends us the error report
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    reportError('ErrorBoundary.jsx:1', false, error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorView
          title='Oops, something went wrong.'
          description="We've been notified of the issue."
          linkDisplay='Follow @openworklabs for updates.'
          linkhref='https://twitter.com/openworklabs'
        />
      )
    }
    return this.props.children
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired
}

export default ErrorBoundary
