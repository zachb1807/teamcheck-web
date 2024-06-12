'use client'

import { Box, Flex, Heading, Spacer, Link, Button, Divider, Center, Container, Text, Image, AbsoluteCenter, Spinner, useBoolean, InputRightElement } from '@chakra-ui/react'
import { Inter } from "next/font/google";
import * as React from "react";
import { useState, useEffect, Suspense } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Stack } from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { Search2Icon, CloseIcon } from '@chakra-ui/icons'
import { clearToken } from '/app/actions';
import  EventCard  from './event-card';
import TopBar from '../../top-bar';

const axios = require('axios');
const inter = Inter({ subsets: ["latin"] });



export default function EventsLayout({ token, params, teamName }) {

    const [events, setEvents] = useState([]);
    const [allEvents, setAllEvents] = useState([]);
    const [eventsLoaded, setEventsLoaded] = useBoolean();
    const [search, setSearch] = useState('');

    const [, updateState] = React.useState();
const forceUpdate = React.useCallback(() => updateState({}), []);


    useEffect(() => {
        document.title = teamName + " | TeamCheck";
        axios.get('/api/events?token=' + token + '&team_id=' + params.team_id)
            .then((response) => {
                response.data.reverse();
                setEvents(response.data);
                setAllEvents(response.data);
                setEventsLoaded.on();
            })
            .catch((error) => {
                console.error(error);

            });
    }, [])

    return (
        <Box className={`${inter.className}`} mb='10'>
           <TopBar logoutAction={() => clearToken()}/>
            <Center>
                <Container centerContent maxW='container.md' className="mt-16">
                    <Heading variant="disable_font_center" color="gray.700" >Tracked Events</Heading>
                    <Heading variant="disable_font_center" color="gray.700" size='md' my='4' mb='8'>{teamName}</Heading>
                    <Container centerContent maxW='lg'>
                        <InputGroup display={eventsLoaded == false ? 'none' : 'block'}>
                            <InputLeftElement pointerEvents='none'>
                                <Search2Icon color='gray.400' />
                            </InputLeftElement>
                            <Input placeholder='Search' value={search} id='search' mb='8' focusBorderColor='teal.500' bg={'white'} borderColor='gray.400' _placeholder={{ opacity: 1, color: 'gray.500' }} maxW={'100%'} onInput={(object) => {
                                setSearch(object.target.value);
                                var filteredEvents = allEvents.filter(event => event.name.toLowerCase().includes(search.toLowerCase()));
                                setEvents(filteredEvents);
                            }} />
                            <InputRightElement onClick={() => {setSearch(''); forceUpdate()}} display={search.length > 0 ? null : 'none'}>
                                <CloseIcon color='gray.400' />
                            </InputRightElement>
                        </InputGroup>
                        <Spinner
                            thickness='4px'
                            speed='0.65s'
                            emptyColor='gray.200'
                            color='teal.500'
                            size='xl'
                            className='my-5'
                            display={eventsLoaded == true ? 'none' : 'block'}
                        />
                        <Stack spacing='4' w={"100%"} >
                            {events.map((event, index) => {
                                var date = new Date(event.updated_at);
                                var updatedAtString = date.toDateString() + ' at ' + date.toLocaleTimeString();

                                return (
                                    <EventCard key={index} event={event} updatedAtString={updatedAtString} team_id={params.team_id} />

                                )
                            })}
                        </Stack>
                    </Container>

                </Container>
            </Center>
        </Box>
    );
}
