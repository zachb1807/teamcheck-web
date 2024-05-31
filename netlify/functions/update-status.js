const axios = require('axios');

exports.handler = async function (event, context, callback) {

    const queryString = event.queryStringParameters;

    if (event.httpMethod !== 'PUT') {
        callback(null, {
            statusCode: 405,
            body: 'Method Not Allowed'
        });
        return;

    }

    var body;

    try {
        body = JSON.parse(event.body);
    }

    catch (error) {
        callback(null, {
            statusCode: 400,
            body: 'Bad Request'
        });
        return;
    }

    if (body.tracked_item_id == "" || body.tracked_item_id == null || body.status_code == "" || body.status_code == null || body.token == "" || body.token == null) {
        callback(null, {
            statusCode: 400,
            body: 'Bad Request'
        });
        return;
    }

    let data = JSON.stringify({
        "template": {
            "data": [
                {
                    "name": "status_code",
                    "value": body.status_code - 1
                }
            ]
        }
    });

    let config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: 'https://api.teamsnap.com/v3/tracked_item_statuses/' + body.tracked_item_id,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + body.token
        },
        data: data
    }


    await axios.request(config)
        .then((response) => {
            callback(null, {
                statusCode: 200,
                body: "Success"
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