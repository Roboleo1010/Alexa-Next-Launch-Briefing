const https = require('https');
const helpers = require('./helpers');

exports.handler = (event, context, callback) => {
    getData("https://launchlibrary.net/1.4/launch/next/1", buildResponse);

    function getData(url, callback) {
        var body = "";

        https.get(url, (response) => {
            response.on('data', (chunk) => {
                body += chunk;
            });
            response.on('end', () => {
                callback(JSON.parse(body));
            });
        });
    }

    function buildResponse(json) {
        try {
            json = json.launches[0];

            let responseData = {
                "uid": "urn:uuid:1335c695-cfb8-4ebb-abbd-80da344efa6b",
                "updateDate": new Date().toISOString(),
                "titleText": "Nächster Raketenstart:",
                "mainText": ` Der nächste Raketenstart ist für die Mission ${json.name} am ${helpers.buildDateTimeFromString(json.windowstart)}. Sie wird von einer ${json.rocket.name} aus ${json.location.name} durchgeführt.`,
                "redirectionUrl": "https://launchlibrary.net/"
            };

            const response = {
                statusCode: 200,
                body: JSON.stringify(responseData).replace("&", " und "),
            };

            console.log(response);
            callback(null, response);
        }
        catch (error) {
            const response = {
                statusCode: 500,
                body: error,
            };

            console.log(response);
            callback(null, response);
        }
    }
};