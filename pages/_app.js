import App from 'next/app'
import Head from 'next/head'
import { theme, ThemeProvider } from '../components/Shared'
import { JwtProvider } from '../lib/JwtHandler'
import { MessageConfirmerProvider } from '../lib/ConfirmMessage'
import '../stylesheets/normalize.css'
import '../stylesheets/styles.css'
import ErrorBoundary from '../components/ErrorBoundary'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <>
        <Head>
          <title>Glif Verification</title>
          <meta
            name='description'
            content='A Filecoin verifier, made by Open Work Labs.'
          />
          <meta
            name='keywords'
            content='Filecoin,Data,Web,Storage,Blockchain'
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
          <MessageConfirmerProvider>
            <JwtProvider>
              <ErrorBoundary>
                <Component {...pageProps} />
              </ErrorBoundary>
            </JwtProvider>
          </MessageConfirmerProvider>
        </ThemeProvider>
      </>
    )
  }
}

export default MyApp
