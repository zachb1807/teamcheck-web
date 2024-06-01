'use client'

import { Box, Flex, Heading, Spacer, Link, Button, Divider, Center, Container, Text, Image, AbsoluteCenter, Spinner, ColorModeProvider } from '@chakra-ui/react'
import { ChevronLeftIcon } from '@chakra-ui/icons'
import { Inter } from "next/font/google";
import { usePathname, redirect, useSearchParams, useRouter } from 'next/navigation'
import { useState, useEffect, Suspense } from 'react';
import * as React from "react";
import { useCookies } from 'next-client-cookies';
import Cookies from 'js-cookie'
import { ExternalLinkIcon } from '@chakra-ui/icons'

const axios = require('axios');
const inter = Inter({ subsets: ["latin"] });



export default function CheckPage({success, client_id, redirect_uri}) {
    const router = useRouter()

    if(success) {
        router.push('/dashboard')
    }
    else {
        Cookies.remove('access_token')
        return (<Box className={`${inter.className}`}>
        <Flex className={`${inter.className} p-4`} >
            <Heading className={`${inter.className} ml-1`} variant="disable_font_center" bgGradient='linear(to-l, teal.400, teal.600)' bgClip='text'>TeamCheck</Heading>
        </Flex>
        <Divider />
        <Center>
            <AbsoluteCenter axis='vertical' className='mx-2'>
                <Container centerContent maxW='container.md' className="mt-16">
                    <Image src="/teamsnap.svg" alt="TeamSnap logo" className="h-11"></Image>
                    <Box height={`51`}></Box>
                    <Heading variant="disable_font_center" color="gray.700">Unable to use your saved account</Heading>
                    <Box height={`51`}></Box>
                    <Text align="center" fontSize='xl' color="gray.700">Please sign in again with TeamSnap</Text>
                    <Box height={`51`}></Box>
                    <Link href={"https://auth.teamsnap.com/oauth/authorize?authorization_test=true&client_id=" + client_id + "&redirect_uri=" + redirect_uri + "&response_type=code&scope=write%20read"}>
                        <Button colorScheme="teal">Sign In<ExternalLinkIcon className={`ml-2`} /></Button>
                    </Link>
                </Container>
            </AbsoluteCenter>
        </Center>
    </Box>)
    }

}
