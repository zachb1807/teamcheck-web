// Import your Client Component
import DashboardLayout from './thepages.js'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
const axios = require('axios');

async function getUserName() {
    const cookieStore = cookies()
    const access_token = cookieStore.get('access_token')
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: process.env.URL + '/api/user?token=' + access_token.value,
        headers: {}
    };

    try {
        const response = await axios.request(config)
        return response.data.first_name
    }
    catch (error) {
        console.log(error)
        return null
    }

}

export default async function Page() {
    if (!cookies().get('access_token')) {
        redirect("/get-started")
    }
    else {
        const name = await getUserName()
        return <DashboardLayout name={name} />
    }

}