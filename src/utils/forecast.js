
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
               "It is currently " + body.current.temperature + " degrees. It feels like " + body.current.feelslike + " degrees. The weather could be described as " + body.current.weather_descriptions[0] + ". This observation is from " + body.current.observation_time + "."
            )
        }
    })
};

module.exports = forecast;