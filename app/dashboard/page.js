// Import your Client Component
import DashboardLayout from './thepages.js'
import { cookies } from 'next/headers'
const axios = require('axios');

async function getUsersName() {
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
    const name = await getUsersName()
    // const name = "yeah"

    // Fetch data directly in a Server Component
    //   const recentPosts = await getPosts()
    // Forward fetched data to your Client Component
    return <DashboardLayout name={name}/>
}