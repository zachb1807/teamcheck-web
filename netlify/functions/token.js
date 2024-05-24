const axios = require('axios');

exports.handler = async function (event, context, callback) {
    const { identity, user } = context.clientContext;
    const querystring = event.queryStringParameters;
    const client_id = process.env.client_id;
    const client_secret = process.env.client_secret;
    
    if (event.httpMethod !== 'POST') {
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

    if (body.code == "" | body.code == null) {
        callback(null, {
            statusCode: 400,
            body: 'Bad Request'
        });
        return;
    }

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://auth.teamsnap.com/oauth/token?client_id=' + client_id + '&client_secret=' +  client_secret + '&redirect_uri=urn:ietf:wg:oauth:2.0:oob&grant_type=authorization_code&code=' + body.code,
    };

    await axios.request(config)
        .then((response) => {
            callback(null, {
                statusCode: 200,
                body: JSON.stringify(response.data)
            });
        })
        .catch((error) => {
            callback(null, {
                statusCode: 500,
                body: JSON.stringify(error)
            });
        });


}