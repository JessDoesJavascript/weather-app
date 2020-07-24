
const request = require('request');

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b9da3244fc3223f37ae8a92f58805557&query=' + lat + ',' + long + '&units=m';
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, 
               "It is currently " + body.current.temperature + " degrees in " + body.location.name + ". It feels like " + body.current.feelslike + " degrees."
            )
        }
    })
};

module.exports = forecast;