import { Box, Flex, Heading, Spacer, Link, Button, Divider, Center, Container, Text, Image, AbsoluteCenter, Spinner } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Inter } from "next/font/google";
import { usePathname, redirect } from 'next/navigation'
import { useRouter } from 'next/router'
import { useState } from 'react';
import * as React from "react";
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react';

const axios = require('axios');
const inter = Inter({ subsets: ["latin"] });


export default function Page() {
    var code = null;
    const params = useSearchParams()
    var code = params.get("code");

    if (code != null && code != "") {

        axios.post('/api/token', { code: code })
            .then((response) => {
                console.log(response.data);

                redirect('/dashboard');
            })
            .catch((error) => {
                console.log(error);
                //redirect to /error
                // redirect('/error');
            });

    }


    return (
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
                        />
                        <Box height='51'></Box>
                        <Heading variant="disable_font_center" color="gray.700">{code == null || code == "" ? 'Not Authorized' : 'Connecting to your account...'}</Heading>

                    </Container>
                </AbsoluteCenter>
            </Center>
        </Box>
    );
}
