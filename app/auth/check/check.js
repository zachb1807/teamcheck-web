'use client'

import { Box, Flex, Heading, Spacer, Link, Button, Divider, Center, Container, Text, Image, AbsoluteCenter, Spinner, ColorModeProvider } from '@chakra-ui/react'
import { ChevronLeftIcon } from '@chakra-ui/icons'
import { Inter } from "next/font/google";
import { usePathname, redirect, useSearchParams, useRouter } from 'next/navigation'
import { useState, useEffect, Suspense } from 'react';
import * as React from "react";
import { useCookies } from 'next-client-cookies';
import Cookies from 'js-cookie'

const axios = require('axios');
const inter = Inter({ subsets: ["latin"] });



export default function CallbackPage({message}) {

    return (
        <Text>{message}</Text>
    );
}
