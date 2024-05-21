import { Inter } from "next/font/google";
import { Container, Button, Box, Text, Heading, Center, Divider, Image, SimpleGrid, Grid, GridItem } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter, Stack, StackDivider } from '@chakra-ui/react'
import { Flex, Spacer } from '@chakra-ui/react'
import { defineStyle, defineStyleConfig } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'

const inter = Inter({ subsets: ["latin"] });
export default function Home() {
  return (
    <Box className={`${inter.className}`}>
      <Flex className={`${inter.className} p-4`} >
        <Heading className={`${inter.className} ml-1`} variant="disable_font_center" bgGradient='linear(to-l, teal.400, teal.600)' bgClip='text'>TeamCheck</Heading>
        <Spacer />
        <Button colorScheme="teal">Get Started<ChevronRightIcon className={`ml-2`} /></Button>
      </Flex>
      <Divider />
      <Container centerContent maxW='container.md' className="mt-16">
        <Box display="flex">
          <Heading className={`${inter.className}`} variant="disable_font_center" size='2xl' color="gray.700">The <Text as="span" bgGradient='linear(to-l, teal.400, teal.600)' bgClip='text'>improved</Text> attendance management dashboard for TeamSnap</Heading>
        </Box>
        <Box height={`51`}></Box>
        <Image src="/phone.png" alt="TeamCheck" />
        <Box height={`51`}></Box>
        <Text className={`${inter.className}`} align="center" fontSize='xl'>TeamCheck is a web application that provides a more efficient way for TeamSnap coaches to manage their players&apos; attendance.</Text>
        <Box height={`51`}></Box>
        <Button colorScheme="teal">Get Started<ChevronRightIcon className={`ml-2`} /></Button>
        <Box height={`41`}></Box>
        <Divider />
        <Box height={`41`}></Box>
        <Heading className={`${inter.className}`} variant="disable_font_center" size='2xl'>Features</Heading>
        <Box height={`30`}></Box>
      </Container>
      <Container maxW="container.xl">
        <SimpleGrid columns={[1, null, 3]} spacing='40px'>
          <Card>
            <CardBody>
              <Stack spacing={4}>
                <Image
                  src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                  alt='Green double couch with wooden legs'
                  borderRadius='lg'
                />
                <Box></Box>
                <Heading className={`${inter.className}`} align="center" fontSize='25px' variant="disable_font">Edit Attendance</Heading>
                <Text className={`${inter.className}`} align="center">Easily mark your players&apos; attendance for an event, update as needed, and refresh in real-time.</Text>
              </Stack>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Stack spacing={4}>
                <Image
                  src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                  alt='Green double couch with wooden legs'
                  borderRadius='lg'
                />
                <Box></Box>
                <Heading className={`${inter.className}`} align="center" fontSize='25px' variant="disable_font">View History</Heading>
                <Text className={`${inter.className}`} align="center">View attendance history for each event to track player attendance performance.</Text>
              </Stack>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Stack spacing={4}>
                <Image
                  src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                  alt='Green double couch with wooden legs'
                  borderRadius='lg'
                />
                <Box></Box>
                <Heading className={`${inter.className}`} align="center" fontSize='25px' variant="disable_font">Sort Players</Heading>
                <Text className={`${inter.className}`} align="center">Sort players by both last and first name for easy team management</Text>
              </Stack>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Stack spacing={4}>
                <Image
                  src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                  alt='Green double couch with wooden legs'
                  borderRadius='lg'
                />
                <Box></Box>
                <Heading className={`${inter.className}`} align="center" fontSize='25px' variant="disable_font">Filters</Heading>
                <Text className={`${inter.className}`} align="center">Apply filters to quickly find players based on specific criteria.</Text>
              </Stack>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Stack spacing={4}>
                <Image
                  src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                  alt='Green double couch with wooden legs'
                  borderRadius='lg'
                />
                <Box></Box>
                <Heading className={`${inter.className}`} align="center" fontSize='25px' variant="disable_font">Search Events</Heading>
                <Text className={`${inter.className}`} align="center">Search for specific events to quickly input attendance.</Text>
              </Stack>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Stack spacing={4}>
                <Image
                  src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                  alt='Green double couch with wooden legs'
                  borderRadius='lg'
                />
                <Box></Box>
                <Heading className={`${inter.className}`} align="center" fontSize='25px' variant="disable_font">Web-Based Dashboard</Heading>
                <Text className={`${inter.className}`} align="center">Access and manage your team&apos;s attendance from any device with our web-based dashboard. No app required.</Text>
              </Stack>
            </CardBody>
          </Card>
        </SimpleGrid>
        <Box height={`51`}></Box>
        <Divider />
        <Container centerContent maxW='container.md' className="mt-14">
          <Heading className={`${inter.className}`} variant="disable_font_center" size='xl'>Ready to give <Text as="span" bgGradient='linear(to-l, teal.400, teal.600)' bgClip='text'>TeamCheck</Text> a try?</Heading>
          <Box height={`31`}></Box>
          <Text className={`${inter.className}`} align="center" fontSize='lg'>Setup is as simple as connecting your TeamSnap account</Text>
          <Box height={`41`}></Box>
          <Button colorScheme="teal">Get Started<ChevronRightIcon className={`ml-2`} /></Button>
        </Container>
      </Container>
      <Box height={`51`}></Box>
    </Box>
  );
}
