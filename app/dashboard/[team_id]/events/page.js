import EventsLayout from './events-layout'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
const axios = require('axios');

function getTeamInfo(token, team_id) {
    return axios.get(process.env.URL + '/api/team?token=' + token + '&team_id=' + team_id)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.error(error);
            redirect("/get-started")
        });
}


export default async function Page({ params }) {
    if (!cookies().get('access_token')) {
        redirect("/get-started")
    }
    else {
        var teamInfo = await getTeamInfo(cookies().get('access_token').value, params.team_id)
        return <EventsLayout token={cookies().get('access_token').value} params={params} teamName={teamInfo.name} />
    }

}