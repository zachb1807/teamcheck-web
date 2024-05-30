'use client'

import { Box, Flex, Heading, Spacer, Link, Button, Divider, Center, Container, Text, Image, AbsoluteCenter, Spinner, useBoolean, ButtonGroup } from '@chakra-ui/react'
import { Inter } from "next/font/google";
import * as React from "react";
import { useState, useEffect, Suspense } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Stack } from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { Search2Icon, CheckIcon, MinusIcon, CloseIcon } from '@chakra-ui/icons'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'

const axios = require('axios');
const inter = Inter({ subsets: ["latin"] });


function sortFirstName(a, b) {
    if (a.first_name < b.first_name) {
        return -1;
    }
    if (a.first_name > b.first_name) {
        return 1;
    }
    return 0;
}
function sortLastName(a, b) {
    if (a.last_name < b.last_name) {
        return -1;
    }
    if (a.last_name > b.last_name) {
        return 1;
    }
    return 0;
}



export default function AttendanceLayout({ token, params, teamName, eventName }) {

    const [attendanceEntries, setEntries] = useState([]);
    const [allAttendanceEntries, setAllEntries] = useState([]);
    const [entriesLoaded, setEntriesLoaded] = useBoolean();

    useEffect(() => {
        axios.get('/api/event?token=' + token + '&event_id=' + params.event_id + '&team_id=' + params.team_id)
            .then((response) => {
                response.data.sort(sortLastName);
                setEntries(response.data);
                setAllEntries(response.data);
                setEntriesLoaded.on();
            })
            .catch((error) => {
                console.error(error);

            });
    }, [])

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
                    <TableContainer>
                        <Table variant='simple'>
                            <Tbody>
                                {attendanceEntries.map((entry, index) => {
                                    return (
                                        <Tr key={index}>
                                            <Td>{entry.first_name} {entry.last_name}</Td>
                                            <Td><ButtonGroup variant='outline' spacing='0' isAttached >
                                                <Button colorScheme='green' variant={entry.status_code == 1 ? 'solid' : 'outline'}><CheckIcon /></Button>
                                                <Button colorScheme='blackAlpha' variant={entry.status_code == 0 ? 'solid' : 'outline'}><MinusIcon /></Button>
                                                <Button  colorScheme='red' variant={entry.status_code == 2 ? 'solid' : 'outline'}><CloseIcon /></Button>
                                            </ButtonGroup></Td>
                                        </Tr>
                                    )
                                })}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Container>
            </Center>
        </Box>
    );
}
