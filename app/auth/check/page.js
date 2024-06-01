import { Suspense } from 'react'
import CheckPage from './check.js'
import { cookies } from 'next/headers'


export default async function Page() {
    var accessToken = cookies().get('access_token').value
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: process.env.URL + '/api/user?token=' + accessToken,
        headers: {}
    };

    try {
        const response = await axios.request(config)
        return <CheckPage msg={"sucess"}/>
    }
    catch (error) {
        console.log(error)
        return <CheckPage message={"didnt work"}/>
    }
}