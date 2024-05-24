'use client'

import { Box, Flex, Heading, Spacer, Link, Button, Divider, Center, Container, Text, Image, AbsoluteCenter } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function Page() {
    return (
        <Box className={`${inter.className}`}>
            <Flex className={`${inter.className} p-4`} >
                <Heading className={`${inter.className} ml-1`} variant="disable_font_center" bgGradient='linear(to-l, teal.400, teal.600)' bgClip='text'>TeamCheck</Heading>
            </Flex>
            <Divider />
            <Center>
                <AbsoluteCenter axis='vertical' className='mx-2'>
                    <Container centerContent maxW='container.md' className="mt-16">
                        <Image src="/teamsnap.svg" alt="TeamSnap logo" className="h-11"></Image>
                        <Box height={`51`}></Box>
                        <Heading variant="disable_font_center" color="gray.700">Authorize your TeamSnap account to continue</Heading>
                        <Box height={`51`}></Box>
                        <Text align="center" fontSize='xl' color="gray.700">We&apos;re going to redirect you to TeamSnap to connect your account. Please allow all permissions to ensure TeamCheck works properly.</Text>
                        <Box height={`51`}></Box>
                        <Link href="https://auth.teamsnap.com/oauth/authorize?authorization_test=true&client_id=PnmPH_LyHmJB8-I1CIVk59jodY4vxVLqiEVKuK8MkpY&redirect_uri=https://teamcheck.netlify.app/auth/callback&response_type=code&scope=write%20read">
                            <Button colorScheme="teal">Sign In<ExternalLinkIcon className={`ml-2`} /></Button>
                        </Link>
                    </Container>
                </AbsoluteCenter>
            </Center>
        </Box>
    );
}
