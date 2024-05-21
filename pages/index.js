import { Inter } from "next/font/google";
import { Container, Button, Box, Text, Heading, Center, Divider, Image } from '@chakra-ui/react'
import { Flex, Spacer } from '@chakra-ui/react'
import { defineStyle, defineStyleConfig } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'

const inter = Inter({ subsets: ["latin"] });
export default function Home() {
  return (
    <Box className={`${inter.className}`}>
      <Flex className={`${inter.className} p-4`}>
        <Heading className={`${inter.className} ml-1`} variant="disable_font_center" bgGradient='linear(to-l, teal.400, teal.600)' bgClip='text'>TeamCheck</Heading>
        <Spacer />
        <Button colorScheme="teal">Get Started<ChevronRightIcon className={`ml-2`} /></Button>
      </Flex>
      <Divider/>
      <Container centerContent maxW='container.md' className="mt-16">
        <Heading className={`${inter.className} ml-1`} variant="disable_font_center" size='2xl' color="gray.700">The improved attendance management dashboard for TeamSnap</Heading>
        
        <Image src="/phone.png" alt="TeamCheck" className={`mt-14`}/>
      </Container>
    </Box>
  );
}
