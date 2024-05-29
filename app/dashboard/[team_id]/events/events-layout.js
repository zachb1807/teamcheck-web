'use client'

import { Box, Flex, Heading, Spacer, Link, Button, Divider, Center, Container, Text, Image, AbsoluteCenter, Spinner } from '@chakra-ui/react'
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



export default function EventsLayout({ token, params, teamName }) {

    const [events, setEvents] = useState([]);
    const [allEvents, setAllEvents] = useState([]);

    useEffect(() => {
        axios.get('/api/events?token=' + token + '&team_id=' + params.team_id)
            .then((response) => {
                response.data.reverse();
                setEvents(response.data);
                setAllEvents(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [])

    return (
        <Box className={`${inter.className}`}>
            <Flex className={`${inter.className} p-4`} >
                <Heading className={`${inter.className} ml-1`} variant="disable_font_center" bgGradient='linear(to-l, teal.400, teal.600)' bgClip='text'>TeamCheck</Heading>
                <Spacer />
                <Button colorScheme="teal" onClick={() => { window.location.href = '/logout' }} variant='outline'>Logout</Button>
            </Flex>
            <Divider />
            <Center>
                <Container centerContent maxW='container.md' className="mt-16">
                    <Heading variant="disable_font_center" color="gray.700" >Tracked Events</Heading>
                    <Heading variant="disable_font_center" color="gray.700" size='md' my='4' mb='8'>{teamName}</Heading>
                    <Container centerContent maxW='lg'>
                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                <Search2Icon color='gray.400' />
                            </InputLeftElement>
                            <Input placeholder='Search' id='search' mb='8' maxW={'100%'} onInput={(object) => {
                                var search = object.target.value;
                                var filteredEvents = allEvents.filter(event => event.name.toLowerCase().includes(search.toLowerCase()));
                                setEvents(filteredEvents);
                            }} />
                        </InputGroup>
                        <Stack spacing='4' w={"100%"}>
                            {events.map((event, index) => {
                                var date = new Date(event.updated_at);
                                var updatedAtString = date.toDateString() + ' at ' + date.toLocaleTimeString();

                                return (
                                    <Link key={index} style={{ textDecoration: 'none' }} href={'/dashboard/' + params.team_id + '/events/' + event.id} w={"100%"}>
                                        <Card direction={{ base: 'row' }} variant='filled' overflow='hidden' _hover={{ bg: "gray.200" }} w={"100%"}>
                                            <Stack>
                                                <CardHeader>
                                                    <Heading size='md'> {event.name}</Heading>
                                                </CardHeader>
                                                <CardBody>
                                                    <Text>Updated {updatedAtString}</Text>
                                                </CardBody>
                                            </Stack>
                                            <Spacer />
                                            <CardFooter>
                                                <Center w='5'>
                                                    <ArrowForwardIcon boxSize={7} color="teal.600" />
                                                </Center>
                                            </CardFooter>
                                        </Card>
                                    </Link>
                                )
                            })}
                        </Stack>
                    </Container>

                </Container>
            </Center>
        </Box>
    );
}
