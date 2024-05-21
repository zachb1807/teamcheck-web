import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import { headingTheme } from './theme/components/Heading'
import "../styles/globals.css";

const theme = extendTheme({
  components: {
      Heading: headingTheme,
  }
});


function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp