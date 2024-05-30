const axios = require('axios');

exports.handler = async function (event, context, callback) {

    const queryString = event.queryStringParameters;
    var token = queryString.token;
    var user_id = queryString.user_id;

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://api.teamsnap.com/v3/teams/search?user_id=' + user_id,
        headers: {
            'Authorization': 'Bearer ' + token
        }
    };

    await axios.request(config)
        .then((response) => {
            if(response.data.collection.items == null || response.data.collection.items.length == 0) {
                callback(null, {
                    statusCode: 200,
                    body: JSON.stringify([])
                });
                return;
            }
            
            var teamsArray = new Array();
            for (i = 0; i < response.data.collection.items.length; i++) {
                var responseTeamObject = response.data.collection.items[i].data;
                var teamObject = new Object();

                for (var key in responseTeamObject) {
                    teamObject[responseTeamObject[key]["name"]] = responseTeamObject[key]["value"]
                }
                teamsArray.push(teamObject);
            }

            callback(null, {
                statusCode: 200,
                body: JSON.stringify(teamsArray)
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