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
import { clearToken } from '/app/actions';
import { Radio, RadioGroup } from '@chakra-ui/react'
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

const inter = Inter({ subsets: ["latin"] });


export default function AttendanceLayout() {




    return (
        <Box className={`${inter.className}`} mb='10'>
            <Flex className={`${inter.className} p-4`} >
                <Heading className={`${inter.className} ml-1`} variant="disable_font_center" bgGradient='linear(to-l, teal.400, teal.600)' bgClip='text'>TeamCheck</Heading>
                <Spacer />
                <Button colorScheme="teal" onClick={() => clearToken()} variant='outline'>Logout</Button>
            </Flex>
            <Divider />
            <Center>
                <Container centerContent maxW='container.md' className="mt-16">
                    <Heading variant="disable_font_center" color="gray.700" >Practice - Oct. 26</Heading>
                    <Heading variant="disable_font_center" color="gray.700" size='md' my='4' mb='8'>Crimson Ridge Wildcats</Heading>
                    <Container maxW={'sm'}>
                        <ButtonGroup w='100%'>
                            <Button w='100%' leftIcon={<HamburgerIcon />}>Filter</Button>
                            <Button w='100%' leftIcon={<ArrowUpDownIcon />}>Sort</Button>
                        </ButtonGroup>
                        <InputGroup my='6'>
                            <InputLeftElement pointerEvents='none'>
                                <Search2Icon color='gray.400' />
                            </InputLeftElement>
                            <Input placeholder='Search' id='search' focusBorderColor='teal.500' borderColor='gray.400' _placeholder={{ opacity: 1, color: 'gray.500' }} maxW={'100%'} />
                        </InputGroup>
                    </Container>
                    <TableContainer w='md'>
                        <Table variant='simple' maxW='100%'>
                            <Tbody w='100%'>
                            <Tr maxW='100%'>
    <Td maxW={'20%'}>Avery Clark</Td>
    <Td isNumeric>
        <ButtonGroup variant='outline' spacing='0' isAttached>
            <Button colorScheme='green' variant="solid"><CheckIcon /></Button>
            <Button colorScheme='blackAlpha' variant="outline"><MinusIcon /></Button>
            <Button colorScheme='red' variant="outline"><CloseIcon /></Button>
        </ButtonGroup>
    </Td>
</Tr>

<Tr maxW='100%'>
    <Td maxW={'20%'}>Cameron Lee</Td>
    <Td isNumeric>
        <ButtonGroup variant='outline' spacing='0' isAttached>
            <Button colorScheme='green' variant="solid"><CheckIcon /></Button>
            <Button colorScheme='blackAlpha' variant="outline"><MinusIcon /></Button>
            <Button colorScheme='red' variant="outline"><CloseIcon /></Button>
        </ButtonGroup>
    </Td>
</Tr>

<Tr maxW='100%'>
    <Td maxW={'20%'}>Casey Garcia</Td>
    <Td isNumeric>
        <ButtonGroup variant='outline' spacing='0' isAttached>
            <Button colorScheme='green' variant="outline"><CheckIcon /></Button>
            <Button colorScheme='blackAlpha' variant="solid"><MinusIcon /></Button>
            <Button colorScheme='red' variant="outline"><CloseIcon /></Button>
        </ButtonGroup>
    </Td>
</Tr>

<Tr maxW='100%'>
    <Td maxW={'20%'}>Dakota Brown</Td>
    <Td isNumeric>
        <ButtonGroup variant='outline' spacing='0' isAttached>
            <Button colorScheme='green' variant="outline"><CheckIcon /></Button>
            <Button colorScheme='blackAlpha' variant="solid"><MinusIcon /></Button>
            <Button colorScheme='red' variant="outline"><CloseIcon /></Button>
        </ButtonGroup>
    </Td>
</Tr>

<Tr maxW='100%'>
    <Td maxW={'20%'}>Emerson Davis</Td>
    <Td isNumeric>
        <ButtonGroup variant='outline' spacing='0' isAttached>
            <Button colorScheme='green' variant="solid"><CheckIcon /></Button>
            <Button colorScheme='blackAlpha' variant="outline"><MinusIcon /></Button>
            <Button colorScheme='red' variant="outline"><CloseIcon /></Button>
        </ButtonGroup>
    </Td>
</Tr>

<Tr maxW='100%'>
    <Td maxW={'20%'}>Jamie Lewis</Td>
    <Td isNumeric>
        <ButtonGroup variant='outline' spacing='0' isAttached>
            <Button colorScheme='green' variant="solid"><CheckIcon /></Button>
            <Button colorScheme='blackAlpha' variant="outline"><MinusIcon /></Button>
            <Button colorScheme='red' variant="outline"><CloseIcon /></Button>
        </ButtonGroup>
    </Td>
</Tr>

<Tr maxW='100%'>
    <Td maxW={'20%'}>Jordan Wilson</Td>
    <Td isNumeric>
        <ButtonGroup variant='outline' spacing='0' isAttached>
            <Button colorScheme='green' variant="solid"><CheckIcon /></Button>
            <Button colorScheme='blackAlpha' variant="outline"><MinusIcon /></Button>
            <Button colorScheme='red' variant="outline"><CloseIcon /></Button>
        </ButtonGroup>
    </Td>
</Tr>

<Tr maxW='100%'>
    <Td maxW={'20%'}>Kendall Walker</Td>
    <Td isNumeric>
        <ButtonGroup variant='outline' spacing='0' isAttached>
            <Button colorScheme='green' variant="outline"><CheckIcon /></Button>
            <Button colorScheme='blackAlpha' variant="solid"><MinusIcon /></Button>
            <Button colorScheme='red' variant="outline"><CloseIcon /></Button>
        </ButtonGroup>
    </Td>
</Tr>

<Tr maxW='100%'>
    <Td maxW={'20%'}>Morgan Robinson</Td>
    <Td isNumeric>
        <ButtonGroup variant='outline' spacing='0' isAttached>
            <Button colorScheme='green' variant="solid"><CheckIcon /></Button>
            <Button colorScheme='blackAlpha' variant="outline"><MinusIcon /></Button>
            <Button colorScheme='red' variant="outline"><CloseIcon /></Button>
        </ButtonGroup>
    </Td>
</Tr>

<Tr maxW='100%'>
    <Td maxW={'20%'}>Riley Thompson</Td>
    <Td isNumeric>
        <ButtonGroup variant='outline' spacing='0' isAttached>
            <Button colorScheme='green' variant="outline"><CheckIcon /></Button>
            <Button colorScheme='blackAlpha' variant="solid"><MinusIcon /></Button>
            <Button colorScheme='red' variant="outline"><CloseIcon /></Button>
        </ButtonGroup>
    </Td>
</Tr>

<Tr maxW='100%'>
    <Td maxW={'20%'}>Taylor Martinez</Td>
    <Td isNumeric>
        <ButtonGroup variant='outline' spacing='0' isAttached>
            <Button colorScheme='green' variant="solid"><CheckIcon /></Button>
            <Button colorScheme='blackAlpha' variant="outline"><MinusIcon /></Button>
            <Button colorScheme='red' variant="outline"><CloseIcon /></Button>
        </ButtonGroup>
    </Td>
</Tr>


                            </Tbody>
                        </Table>
                    </TableContainer>
                </Container>
            </Center>

        </Box>
    );
}
