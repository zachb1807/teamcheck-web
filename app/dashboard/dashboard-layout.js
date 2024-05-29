'use client'

import { Box, Flex, Heading, Spacer, Link, Button, Divider, Center, Container, Text, Image, AbsoluteCenter, Spinner } from '@chakra-ui/react'
import { Inter } from "next/font/google";
import * as React from "react";
import { useState, useEffect, Suspense } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Stack } from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'

const axios = require('axios');
const inter = Inter({ subsets: ["latin"] });


async function getTeams(user_id, token) {
    return axios.get('/api/teams?user_id=' + user_id + '&token=' + token)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.error(error);
        });
}


export default function DashboardLayout({ name, token, user_id }) {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        getTeams(user_id, token)
            .then((data) => {
                setTeams(data);
            });
    })

    var greeting = null

    var time = new Date().getHours();
    if (time < 12) {
        greeting = "Good Morning";
    } else if (time < 18) {
        greeting = "Good Afternoon";
    } else {
        greeting = "Good Evening";
    }


    return (
        <Box className={`${inter.className}`}>
            <Flex className={`${inter.className} p-4`} >
                <Heading className={`${inter.className} ml-1`} variant="disable_font_center" bgGradient='linear(to-l, teal.400, teal.600)' bgClip='text'>TeamCheck</Heading>
                <Spacer />
                <Button colorScheme="teal" onClick={() => { window.location.href = '/logout' }}>Logout</Button>
            </Flex>
            <Divider />
            <Center>
                <AbsoluteCenter axis='vertical' className='mx-2'>
                    <Container centerContent maxW='container.md' className="mt-16">
                        <Heading variant="disable_font_center" color="gray.700">{greeting}, {name}</Heading>
                        <Text variant="disable_font_center" color="gray.700" className='my-4'>Choose a team to record attendance:</Text>
                        <Spinner
                            thickness='4px'
                            speed='0.65s'
                            emptyColor='gray.200'
                            color='teal.500'
                            size='xl'
                            className='my-5'
                            display={teams.length > 0 == true ? 'none' : 'block'}
                        />
                        <Stack spacing='6' className='my-4'>
                            {teams.map((team, index) => {
                                return (
                                    <Card key={index} direction={{ base: 'row' }} variant='filled' overflow='hidden'>
                                        <Stack>
                                            <CardHeader>
                                                <Heading size='md'> {team.name}</Heading>
                                            </CardHeader>
                                            <CardBody>
                                                <Text>{team.season_name}</Text>
                                                <Text>{team.player_member_count} players</Text>
                                            </CardBody>
                                        </Stack>
                                        <Spacer />
                                        <CardFooter>
                                            <Center w='5'>
                                                <ArrowForwardIcon boxSize={7} color="teal.600"/>
                                            </Center>
                                        </CardFooter>
                                    </Card>
                                )
                            })}
                        </Stack>


                    </Container>
                </AbsoluteCenter>
            </Center>
        </Box>
    );
}
