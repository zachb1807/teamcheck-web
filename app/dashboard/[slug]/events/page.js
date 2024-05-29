import EventsLayout from './events-layout'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
const axios = require('axios');

 
export default async function Page() {
    if (!cookies().get('access_token')) {
        redirect("/get-started")
    }
    else {
        return <EventsLayout token={cookies().get('access_token').value}/>
    }

}