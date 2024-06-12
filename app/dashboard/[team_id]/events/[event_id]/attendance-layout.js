'use client'
import { Inter } from "next/font/google";
import * as React from "react";
import { useState, useEffect } from 'react';
import { Stack } from '@chakra-ui/react'
import { Input, InputGroup, InputLeftElement, useDisclosure, Center } from '@chakra-ui/react'
import { Search2Icon, CheckIcon, MinusIcon, CloseIcon, HamburgerIcon, ArrowUpDownIcon } from '@chakra-ui/icons'
import { clearToken } from '/app/actions';
import { Radio, RadioGroup } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import {
    Table,
    Tbody,
    Tr,
    Td,
    TableContainer,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Box, 
    Heading, Button, Container, Spinner, useBoolean, ButtonGroup
} from '@chakra-ui/react'
import TopBar from '/app/dashboard/top-bar';

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
    const toast = useToast()
    const [attendanceEntries, setEntries] = useState([]);
    const [allAttendanceEntries, setAllEntries] = useState([]);
    const [entriesLoaded, setEntriesLoaded] = useBoolean();

    const { isOpen: isSortOpen, onOpen: onSortOpen, onClose: onSortClose } = useDisclosure()
    const cancelRef = React.useRef()

    const { isOpen: isFilterOpen, onOpen: onFilterOpen, onClose: onFilterClose } = useDisclosure()

    const [sortScheme, setSortScheme] = React.useState('1')

    function sortList(value) {
        setEntries(attendanceEntries.sort(value == '1' ? sortFirstName : sortLastName));
        setAllEntries(allAttendanceEntries.sort(value == '1' ? sortFirstName : sortLastName));
    }

    const updateEntries = (entries, trackedItemId, updates) => {
        return entries.map(entry =>
            entry.id === trackedItemId ? { ...entry, ...updates } : entry
        );
    };

    const updateStatus = (statusCode, trackedItemId) => {
        const updates = { loading_status_code: statusCode };

        setEntries(prevEntries => updateEntries(prevEntries, trackedItemId, updates));
        setAllEntries(prevEntries => updateEntries(prevEntries, trackedItemId, updates));

        axios.put('/api/update-status', {
            status_code: statusCode + 1,
            tracked_item_id: trackedItemId,
            token: token
        })
            .then((response) => {
                console.log(response);
                const finalizeUpdates = { status_code: statusCode, loading_status_code: null };

                setEntries(prevEntries => updateEntries(prevEntries, trackedItemId, finalizeUpdates));
                setAllEntries(prevEntries => updateEntries(prevEntries, trackedItemId, finalizeUpdates));
            })
            .catch((error) => {
                console.error(error);
                const finalizeUpdates = { loading_status_code: null };
                setEntries(prevEntries => updateEntries(prevEntries, trackedItemId, finalizeUpdates));
                setAllEntries(prevEntries => updateEntries(prevEntries, trackedItemId, finalizeUpdates));
                toast({
                    title: 'Unable to update attendance',
                    description: "We were unable to update the attendance status. Please try again or check your internet connection.",
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                  })

            });

        console.log(`${trackedItemId} ${statusCode}`);
    };

    useEffect(() => {
        document.title = eventName + " | TeamCheck";
        axios.get('/api/event?token=' + token + '&event_id=' + params.event_id + '&team_id=' + params.team_id)
            .then((response) => {
                response.data.sort(sortFirstName);
                setEntries(response.data);
                setAllEntries(response.data);
                setEntriesLoaded.on();
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <Box className={`${inter.className}`} mb='10'>
            <TopBar logoutAction={() => clearToken()} />
            <Center>
                <Container centerContent maxW='container.md' className="mt-16">
                    <Heading variant="disable_font_center" color="gray.700" >{eventName}</Heading>
                    <Heading variant="disable_font_center" color="gray.700" size='md' my='4' mb='8'>{teamName}</Heading>
                    <Container maxW={'sm'} display={entriesLoaded == false ? 'none' : 'block'}>
                        <ButtonGroup w='100%'>
                            <Button variant='outline' w='100%' leftIcon={<HamburgerIcon />} onClick={onFilterOpen} className="backdrop-blur bg-zinc-500/5">Filter</Button>
                            <Button variant='outline' w='100%' leftIcon={<ArrowUpDownIcon />} onClick={onSortOpen} className="backdrop-blur bg-zinc-500/5">Sort</Button>
                        </ButtonGroup>
                        <InputGroup my='6'>
                            <InputLeftElement pointerEvents='none'>
                                <Search2Icon color='gray.400' />
                            </InputLeftElement>
                            <Input placeholder='Search' id='search' focusBorderColor='teal.500' borderColor='gray.400' bg={'white'} _placeholder={{ opacity: 1, color: 'gray.500' }} maxW={'100%'} onInput={(object) => {
                                var search = object.target.value;
                                var filteredEvents = allAttendanceEntries.filter(entry => entry.first_name.toLowerCase().includes(search.toLowerCase()) || entry.last_name.toLowerCase().includes(search.toLowerCase()));
                                setEntries(filteredEvents);
                            }} />
                        </InputGroup>
                    </Container>
                    <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='teal.500'
                        size='xl'
                        className='my-5'
                        display={entriesLoaded == true ? 'none' : 'block'}
                    />

                    <TableContainer w='md'>
                        <Table variant='simple' maxW='100%'>
                            <Tbody w='100%'>
                                {attendanceEntries.map((entry, index) => {
                                    if (!entry.is_non_player) {
                                        return (
                                            <Tr key={index} maxW='100%'>
                                                <Td maxW={'20%'}>{entry.first_name} {entry.last_name}</Td>
                                                <Td isNumeric><ButtonGroup variant='outline' spacing='0' isAttached >
                                                    <Button isLoading={entry.loading_status_code == 1} colorScheme='green' variant={entry.status_code == 1 ? 'solid' : 'outline'} onClick={() => updateStatus(1, entry.id)}><CheckIcon /></Button>
                                                    <Button isLoading={entry.loading_status_code == 0} colorScheme='blackAlpha' variant={entry.status_code == 0 ? 'solid' : 'outline'} onClick={() => updateStatus(0, entry.id)}><MinusIcon /></Button>
                                                    <Button isLoading={entry.loading_status_code == 2} colorScheme='red' variant={entry.status_code == 2 ? 'solid' : 'outline'} onClick={() => updateStatus(2, entry.id)}><CloseIcon /></Button>
                                                </ButtonGroup></Td>
                                            </Tr>
                                        )
                                    }
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
                            Sort
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            <RadioGroup onChange={(value) => {
                                setSortScheme(value)
                                sortList(value)
                            }} value={sortScheme}>
                                <Stack spacing={5}>
                                    <Radio colorScheme='teal' value='1' size='lg'>
                                        First Name
                                    </Radio>
                                    <Radio colorScheme='teal' value='2' size='lg'>
                                        Last Name
                                    </Radio>
                                </Stack>
                            </RadioGroup>
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onSortClose}>
                                Close
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>

            <AlertDialog
                isOpen={isFilterOpen}
                leastDestructiveRef={cancelRef}
                onClose={onFilterClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Filter
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Filters will be coming soon. Stay tuned!
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onFilterClose}>
                                Close
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>

        </Box>
    );
}
