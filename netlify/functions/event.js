const axios = require('axios');

exports.handler = async function (event, context, callback) {

    const queryString = event.queryStringParameters;
    var token = queryString.token;
    var event_id = queryString.event_id;
    var team_id = queryString.team_id;

    let eventConfig = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://api.teamsnap.com/v3/tracked_item_statuses/search?tracked_item_id=' + event_id,
        headers: {
            'Authorization': 'Bearer ' + token
        }
    };

    await axios.request(eventConfig)
        .then(async (eventResponse) => {
            let membersConfig = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'https://api.teamsnap.com/v3/members/search?team_id=' + team_id,
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            };

            await axios.request(membersConfig)
                .then((membersResponse) => {
                    var membersArray = new Array();
                    for (i = 0; i < membersResponse.data.collection.items.length; i++) {
                        var responseMembersObject = membersResponse.data.collection.items[i].data;
                        var membersObject = new Object();

                        for (var key in responseMembersObject) {
                            membersObject[responseMembersObject[key]["name"]] = responseMembersObject[key]["value"]
                        }
                        membersArray.push(membersObject);
                    }

                    if (eventResponse.data.collection.items == null || eventResponse.data.collection.items.length == 0) {
                        callback(null, {
                            statusCode: 200,
                            body: JSON.stringify([])
                        });
                        return;
                    }
                    var eventArray = new Array();
                    for (i = 0; i < eventResponse.data.collection.items.length; i++) {
                        var responseEventObject = eventResponse.data.collection.items[i].data;
                        var eventObject = new Object();

                        for (var key in responseEventObject) {
                            eventObject[responseEventObject[key]["name"]] = responseEventObject[key]["value"]
                            if (responseEventObject[key]["name"] == "member_id") {
                                for (j = 0; j < membersArray.length; j++) {
                                    if (membersArray[j].id == responseEventObject[key]["value"]) {
                                        eventObject["first_name"] = membersArray[j].first_name;
                                        eventObject["last_name"] = membersArray[j].last_name;
                                        eventObject["is_non_player"] = membersArray[j].is_non_player;
                                    }
                                }
                            }
                        }
                        eventArray.push(eventObject);
                    }

                    callback(null, {
                        statusCode: 200,
                        body: JSON.stringify(eventArray)
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