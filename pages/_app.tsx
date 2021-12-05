import '@/lib/firebase'
import { ChakraProvider } from '@chakra-ui/react'
import { RecoilRoot } from 'recoil'
import theme from '../styles/theme'
import '../styles/globals.css'
import React from 'react'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <Head>
          <title>Custom MyPage</title>
          <meta name="description" content="My custom page for GitHub" />
        </Head>

        <Component {...pageProps} />
      </ChakraProvider>
    </RecoilRoot>
  )
}

export default MyApp
