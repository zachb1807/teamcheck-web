'use client'

import { Box, Flex, Heading, Spacer, Link, Button, Divider, Center, Container, Text, Image, AbsoluteCenter, Spinner, useBoolean, ButtonGroup } from '@chakra-ui/react'
import { Inter } from "next/font/google";
import * as React from "react";
import { useState, useEffect, Suspense } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Stack } from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { Input, InputGroup, InputLeftElement, useDisclosure } from '@chakra-ui/react'
import { Search2Icon, CheckIcon, MinusIcon, CloseIcon, HamburgerIcon, ArrowUpDownIcon } from '@chakra-ui/icons'
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
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
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

    const { isSortOpen, onSortOpen, onSortClose } = useDisclosure()
    const cancelRef = React.useRef()

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
                    <Container maxW={'sm'} display={entriesLoaded == false ? 'none' : 'block'}>
                        <ButtonGroup w='100%'>
                            <Button w='100%' leftIcon={<HamburgerIcon />}>Filter</Button>
                            <Button w='100%' leftIcon={<ArrowUpDownIcon />} onClick={onSortOpen}>Sort</Button>
                        </ButtonGroup>
                        <InputGroup my='6'>
                            <InputLeftElement pointerEvents='none'>
                                <Search2Icon color='gray.400' />
                            </InputLeftElement>
                            <Input placeholder='Search' id='search' focusBorderColor='teal.500' borderColor='gray.400' _placeholder={{ opacity: 1, color: 'gray.500' }} maxW={'100%'} onInput={(object) => {
                                var search = object.target.value;
                                var filteredEvents = allAttendanceEntries.filter(entry => entry.first_name.toLowerCase().includes(search.toLowerCase()) || entry.last_name.toLowerCase().includes(search.toLowerCase()));
                                setEntries(filteredEvents);
                            }} />
                        </InputGroup>
                    </Container>

                    <TableContainer w='md'>
                        <Table variant='simple' maxW='100%'>
                            <Tbody w='100%'>
                                {attendanceEntries.map((entry, index) => {
                                    return (
                                        <Tr key={index} maxW='100%'>
                                            <Td maxW={'20%'}>{entry.first_name} {entry.last_name}</Td>
                                            <Td isNumeric><ButtonGroup variant='outline' spacing='0' isAttached >
                                                <Button colorScheme='green' variant={entry.status_code == 1 ? 'solid' : 'outline'}><CheckIcon /></Button>
                                                <Button colorScheme='blackAlpha' variant={entry.status_code == 0 ? 'solid' : 'outline'}><MinusIcon /></Button>
                                                <Button colorScheme='red' variant={entry.status_code == 2 ? 'solid' : 'outline'}><CloseIcon /></Button>
                                            </ButtonGroup></Td>
                                        </Tr>
                                    )
                                })}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Container>
            </Center>

            <AlertDialog
                isOpen={isSortOpen}
                leastDestructiveRef={cancelRef}
                onClose={onSortClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Delete Customer
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You can&apos;t undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onSortClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='red' onClick={onSortClose} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>

        </Box>
    );
}
