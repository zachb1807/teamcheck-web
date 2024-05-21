import Image from "next/image";
import { Inter } from "next/font/google";
import { Container, Button, Box, Text, Heading, Center } from '@chakra-ui/react'
import { Flex, Spacer } from '@chakra-ui/react'
import { defineStyle, defineStyleConfig } from '@chakra-ui/react'
import {ChevronRightIcon } from '@chakra-ui/icons'

const inter = Inter({ subsets: ["latin"] });
export default function Home() {
  return (
    <Box className={`${inter.className}`}>
    <Flex className={`${inter.className} p-4`}>
      <Heading className={`${inter.className} ml-1`}  variant="disable_font" bgGradient='linear(to-l, teal.400, teal.600)' bgClip='text'>TeamCheck</Heading>
      <Spacer />
      <Button colorScheme="teal">Get Started<ChevronRightIcon className={`ml-2`} /></Button>
    </Flex>
    <Container centerContent maxW='container.md'>
      <Heading className={`${inter.className} ml-1`}  variant="disable_font" size='2xl' color="gray.700">The improved attendance management dashboard for TeamSnap</Heading>
    </Container>
    </Box>
  );
}
