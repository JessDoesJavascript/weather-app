
const request = require('request');

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b9da3244fc3223f37ae8a92f58805557&query=' + lat + ',' + long + '&units=m';
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Weather services aren't fucking working", undefined)
        } else if (body.error) {
            callback("Location doesn't fucking exist", undefined);
        } else if (body.current.temperature <= 0) {
            callback(undefined, 
               "It is absolutely fucking freezing. Wear a coat, asshole."
            )
        } else if (body.current.temperature < 7) {
            callback(undefined,
                "It is pretty fucking chilly out there."
            )
        } else if (body.current.temperature < 12) {
            callback(undefined,
                "There's been worse fucking days but it's still fucking miserable."
            )
        } else if (body.current.temperature < 22) {
            callback(undefined,
                "It's fucking pleasant."
            )
        } else if (body.current.temperature > 22) {
            callback(undefined,
                "It's hot as fuck out there. Wear some fucking sunscreen."
            )
        }
    })
};

module.exports = forecast;