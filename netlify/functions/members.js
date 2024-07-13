const axios = require('axios');

exports.handler = async function (event, context, callback) {

    const queryString = event.queryStringParameters;
    var token = queryString.token;
    var team_id = queryString.team_id;

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://api.teamsnap.com/v3/members/search?team_id=' + team_id,
        headers: {
            'Authorization': 'Bearer ' + token
        }
    };

    await axios.request(config)
        .then((response) => {

            var membersArray = new Array();
            for (i = 0; i < response.data.collection.items.length; i++) {
                var responseMembersObject = response.data.collection.items[i].data;
                var membersObject = new Object();

                for (var key in responseMembersObject) {
                    membersObject[responseMembersObject[key]["name"]] = responseMembersObject[key]["value"]
                }
                membersArray.push(membersObject);
            }

                callback(null, {
                    statusCode: 200,
                    body: JSON.stringify(membersArray)
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
                console.log(error)
                callback(null, {
                    statusCode: 500,
                    body: "Internal Server Error"
                });
            }
        });
}