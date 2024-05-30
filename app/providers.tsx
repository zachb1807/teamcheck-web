'use client'
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import { headingTheme } from '../components/Heading'
import "../styles/globals.css";

const theme = extendTheme({
    components: {
        Heading: headingTheme,
        Modal: {
          baseStyle: {
            dialogContainer: {
              px: 4,
          },
        },
      }
    }
  });


export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}