'use client'

import { Box, Flex, Heading, Spacer, Link, Button, Divider, Center, Container, Text, Image, AbsoluteCenter, Spinner, useBoolean } from '@chakra-ui/react'
import { Inter } from "next/font/google";
import * as React from "react";
import { useState, useEffect, Suspense } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Stack } from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'

const axios = require('axios');
const inter = Inter({ subsets: ["latin"] });



export default function AttendanceLayout({ token, params, teamName, eventName }) {


    return (
        <Box className={`${inter.className}`} mb='10'>
            <Flex className={`${inter.className} p-4`} >
                <Heading className={`${inter.className} ml-1`} variant="disable_font_center" bgGradient='linear(to-l, teal.400, teal.600)' bgClip='text'>TeamCheck</Heading>
                <Spacer />
                <Button colorScheme="teal" onClick={() => { window.location.href = '/logout' }} variant='outline'>Logout</Button>
            </Flex>
            <Divider />
            <Center>
                <Container centerContent maxW='container.md' className="mt-16">
                    <Heading variant="disable_font_center" color="gray.700" >{eventName}</Heading>
                    <Heading variant="disable_font_center" color="gray.700" size='md' my='4' mb='8'>{teamName}</Heading>

                </Container>
            </Center>
        </Box>
    );
}
