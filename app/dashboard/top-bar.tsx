import { Box, Button, Divider, Flex, Heading, Spacer } from "@chakra-ui/react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function TopBar({logoutAction}) {
    return (
        <Box>
        <Flex className={`${inter.className} p-4`} >
            <Heading className={`${inter.className} ml-1`} variant="disable_font_center" bgGradient='linear(to-l, teal.400, teal.600)' bgClip='text'>TeamCheck</Heading>
            <Spacer />
            <Button colorScheme="teal" onClick={logoutAction} variant='outline'>Logout</Button>
        </Flex>
        <Divider />
        </Box>
    )
}