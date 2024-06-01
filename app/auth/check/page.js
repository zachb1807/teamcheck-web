import { Suspense } from 'react'
import CheckPage from './check.js'
import { cookies } from 'next/headers'
const axios = require('axios');
import { redirect } from 'next/navigation'


export default async function Page() {
    try {
        var accessToken = cookies().get('access_token').value
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: process.env.URL + '/api/user?token=' + accessToken,
            headers: {}
        };

        try {
            const response = await axios.request(config)
            return <CheckPage success={true} />
        }
        catch (error) {
            console.log(error)
            return <CheckPage success={false} client_id={process.env.client_id} redirect_uri={process.env.redirect_uri}/>
        }
    }
    catch (error) {
        return <CheckPage success={false} client_id={process.env.client_id} redirect_uri={process.env.redirect_uri} />
    }
}