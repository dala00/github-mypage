import '@/lib/firebase'
import { ChakraProvider } from '@chakra-ui/react'
import { RecoilRoot } from 'recoil'
import theme from '../styles/theme'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </RecoilRoot>
  )
}

export default MyApp
