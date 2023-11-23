import type { AppProps } from 'next/app'
import {ChakraProvider} from "@chakra-ui/react";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
  <ChakraProvider colorModeManager={{
    type: 'localStorage',
    get: (init) => {
      return 'light';
    },
    set: (value) => {
    },
  }}>
    <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
    </Head>
    <Component {...pageProps} />
  </ChakraProvider>
    )
}
export default MyApp
