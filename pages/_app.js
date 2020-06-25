import App from 'next/app'
import Head from 'next/head'
import { theme, ThemeProvider } from '../components/Shared'

import '../stylesheets/normalize.css'
import '../stylesheets/styles.css'
import { JwtProvider } from '../lib/JWTHandler'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
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
          <JwtProvider>
            <Component {...pageProps} />
          </JwtProvider>
        </ThemeProvider>
      </>
    )
  }
}

export default MyApp
