'use client'

import { Box, Flex, Heading, Spacer, Link, Button, Divider, Center, Container, Text, Image, AbsoluteCenter } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import { useRouter } from 'next/navigation'
import { use } from 'react';

export default function GetStartedAuthedLayout({ client_id, redirect_uri }) {
    useEffect(() => {
        document.title = "Get Started | TeamCheck";
    }, []);
    const router = useRouter()
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
                        <Heading variant="disable_font_center" color="gray.700">You&apos;re already signed in</Heading>
                        <Box height={`51`}></Box>
                        <Text align="center" fontSize='xl' color="gray.700">Click below to access your dashboard using your currently saved account. If we have issues connecting, we&apos;ll send you to TeamSnap to sign in again.</Text>
                        <Box height={`51`}></Box>
                        <Button colorScheme="teal" onClick={() => router.push('/auth/check')}>Access Dashboard</Button>
                    </Container>
                </AbsoluteCenter>
            </Center>
        </Box>
    );
}
