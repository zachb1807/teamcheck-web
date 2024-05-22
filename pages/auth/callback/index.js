import { Box, Flex, Heading, Spacer, Link, Button, Divider, Center, Container, Text, Image, AbsoluteCenter } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Inter } from "next/font/google";
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/router'
import { useState } from 'react';
import * as React from "react";
const inter = Inter({ subsets: ["latin"] });

export default function Page() {
    const [currentDomain, setCurrentDomain] = useState('');
    console.log(currentDomain);
    return (
        <Box className={`${inter.className}`}>
            <Flex className={`${inter.className} p-4`} >
                <Heading className={`${inter.className} ml-1`} variant="disable_font_center" bgGradient='linear(to-l, teal.400, teal.600)' bgClip='text'>TeamCheck</Heading>
            </Flex>
            <Divider />
            <Center>
                <AbsoluteCenter axis='vertical' className='mx-2'>
                    <Container centerContent maxW='container.md' className="mt-16">
                        <Heading variant="disable_font_center" color="gray.700">Authorized</Heading>
                        
                    </Container>
                </AbsoluteCenter>
            </Center>
        </Box>
    );
}
