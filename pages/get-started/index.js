import { Box, Flex, Heading, Spacer, Link, Button, Divider, AbsoluteCenter, Container, Text, Image } from '@chakra-ui/react'
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
            <AbsoluteCenter>
                <Container centerContent maxW='container.md' className="mt-16">
                    <Image src="/teamsnap.svg" alt="TeamSnap logo" boxSize='sm' objectFit='fit'></Image>
                    <Heading variant="disable_font_center" color="gray.700">Authorize your TeamSnap account to continue</Heading>
                    <Box height={`51`}></Box>
                    <Text align="center" fontSize='xl' color="gray.700">We're going to redirect you to TeamSnap for sign in. Please allow all permissions to ensure TeamCheck works properly.</Text>
                    <Box height={`51`}></Box>
                    <Button colorScheme="teal">Sign In<ExternalLinkIcon className={`ml-2`} /></Button>
                </Container>
            </AbsoluteCenter>
        </Box>
    );
}