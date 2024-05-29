const axios = require('axios');

exports.handler = async function (event, context, callback) {

    const queryString = event.queryStringParameters;
    var token = queryString.token;
    var team_id = queryString.team_id;

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://api.teamsnap.com/v3/teams/' + team_id,
        headers: {
            'Authorization': 'Bearer ' + token
        }
    };

    await axios.request(config)
        .then((response) => {
            var responseTeamObject = response.data.collection.items[0].data;
            var teamObject = new Object();

            for (var key in responseTeamObject) {
                teamObject[responseTeamObject[key]["name"]] = responseTeamObject[key]["value"]
            }

            callback(null, {
                statusCode: 200,
                body: JSON.stringify(teamObject)
            });

        })
        .catch((error) => {
            if (error.status == 401) {
                callback(null, {
                    statusCode: 401,
                    body: "Unauthorized"
                });
            }
            else {
                callback(null, {
                    statusCode: 500,
                    body: "Internal Server Error"
                });
            }
        });




}