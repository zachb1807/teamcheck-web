import AttendanceLayout from './attendance-layout'
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

function getEventInfo(token, team_id, event_id) {
    return axios.get(process.env.URL + '/api/events?token=' + token + '&team_id=' + team_id)
        .then((response) => {
            for (var i = 0; i < response.data.length; i++) {
                if (response.data[i].id == event_id) {
                    return response.data[i];
                }
            }
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
        var eventInfo = await getEventInfo(cookies().get('access_token').value, params.team_id, params.event_id)
        return <AttendanceLayout token={cookies().get('access_token').value} params={params} teamName={teamInfo.name} eventName={eventInfo.name} />
    }

}