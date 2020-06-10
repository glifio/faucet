import App from 'next/app'
import Head from 'next/head'
import { theme, ThemeProvider } from '../components/Shared'

import '../stylesheets/normalize.css'
import '../stylesheets/styles.css'

class MyApp extends App {
  static getInitialProps({ ctx: { query, pathname } }) {
    return { query, pathname }
  }

  render() {
    const { Component, pageProps, reduxStore, query, pathname } = this.props

    return (
      <>
        <Head>
          <title>Glif Verification</title>
          <meta
            name='description'
            content='A Filecoin web wallet, made by Open Work Labs.'
          />
          <meta
            name='keywords'
            content='Filecoin,Wallet,Web,Storage,Blockchain'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='32x32'
            href='/favicon-32x32.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='16x16'
            href='/favicon-32x32.png'
          />
        </Head>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </>
    )
  }
}

export default MyApp
