import { Box, Flex, Heading, Spacer, Link, Button, Divider } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function Page() {
    return (
        <Box className={`${inter.className}`}>

            <Flex className={`${inter.className} p-4`} >
                <Heading className={`${inter.className} ml-1`} variant="disable_font_center" bgGradient='linear(to-l, teal.400, teal.600)' bgClip='text'>TeamCheck</Heading>

            </Flex>
            <Divider />
        </Box>
    );
}