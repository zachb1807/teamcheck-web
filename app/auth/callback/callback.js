'use client'

import { Box, Flex, Heading, Spacer, Link, Button, Divider, Center, Container, Text, Image, AbsoluteCenter, Spinner } from '@chakra-ui/react'
import { ChevronLeftIcon } from '@chakra-ui/icons'
import { Inter } from "next/font/google";
import { usePathname, redirect } from 'next/navigation'
import { useState } from 'react';
import * as React from "react";
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { useCookies } from 'next-client-cookies';
import { Suspense } from 'react';

const axios = require('axios');
const inter = Inter({ subsets: ["latin"] });



export default function CallbackPage() {
    var code = null;
    const params = useSearchParams()
    const router = useRouter()
    const cookies = useCookies();
    const [message, setMessage] = useState('Connecting to TeamSnap...');
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        var code = params.get("code");

        if (code != null && code != "") {
            axios.post('/api/token', { code: code })
                .then((response) => {
                    console.log(response.data.access_token);
                    cookies.set('access_token', response.data.access_token)
                    router.push('/dashboard')
                })
                .catch((error) => {
                    console.log(error);
                    setFailed(true);
                    setMessage('There was an error authorizing your TeamSnap account. Please try again.');
                });

        }
    }, []);


    return (
        <Suspense>
        <Box className={`${inter.className}`}>
            <Flex className={`${inter.className} p-4`} >
                <Heading className={`${inter.className} ml-1`} variant="disable_font_center" bgGradient='linear(to-l, teal.400, teal.600)' bgClip='text'>TeamCheck</Heading>
            </Flex>
            <Divider />
            <Center>
                <AbsoluteCenter axis='vertical' className='mx-2'>
                    <Container centerContent maxW='container.md' className="mt-16">
                        <Spinner
                            thickness='4px'
                            speed='0.65s'
                            emptyColor='gray.200'
                            color='teal.500'
                            size='xl'
                            display={failed == true ? 'none' : 'block'}
                        />
                        <Box height='51'></Box>
                        <Heading variant="disable_font_center" color="gray.700">{message}</Heading>
                        <Box height='51'></Box>
                        <Button colorScheme="teal" display={failed == true ? 'block' : 'none'} onClick={() => { router.push('/get-started') }}><ChevronLeftIcon className={`mr-2`} />Try Again</Button>

                    </Container>
                </AbsoluteCenter>
            </Center>
        </Box>
        </Suspense>
    );
}
