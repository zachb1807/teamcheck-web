const axios = require('axios');

exports.handler = async function (event, context, callback) {

    const queryString = event.queryStringParameters;
    var token = queryString.token;

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://api.teamsnap.com/v3/me',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    };

    await axios.request(config)
        .then((response) => {
            var responseUserObject = response.data.collection.items[0].data;
            var userObject = new Object();

            for (var key in responseUserObject) {
                userObject[responseUserObject[key]["name"]] = responseUserObject[key]["value"]
            }

            callback(null, {
                statusCode: 200,
                body: JSON.stringify(userObject)
            });

        })
        .catch((error) => {
            if (error.response.status == 401) {
                callback(null, {
                    statusCode: 401,
                    body: "Unauthorized"
                });
            }
            else {
                callback(null, {
                    statusCode: 500,
                    body: JSON.stringify("Internal Server Error")
                });
            }
        });




}