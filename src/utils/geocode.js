// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const request=require('postman-request');
//Define Function
const geocode = (address, callback) =>{
    const url="http://api.weatherstack.com/current?access_key=07443be679ed0dd192931e010aa501c8&query="+encodeURIComponent(address);

    request({url: url, json:true},(error, response) =>{
        if(error){
            callback("Unable To Connect",undefined)
        }else if(response.body.error){
            callback("Unable To Find Location",undefined)
        }else{
            callback(undefined,{
                // weather_descriptions: response.body.current.weather_descriptions[0],
                // currently: response.body.current.temperature,
                // feelsLike: response.body.current.feelslike,
                location: response.body.location.name,
                latitude: response.body.location.lat,
                Longitude: response.body.location.lon
            })
        }
    })
}

module.exports = geocode;