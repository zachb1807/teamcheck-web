// Import your Client Component
import DashboardLayout from './dashboard-layout.js'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
const axios = require('axios');

async function getUserData() {
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
        return response.data
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
        const data = await getUserData()
        if(data == null || data.first_name == null) {
            redirect("/get-started")
        }
        return <DashboardLayout name={data.first_name} token={cookies().get('access_token').value} user_id={data.id}/>
    }

}