//Importing postman-request module
const request=require('postman-request');

const geocode_forecast=(address, callback)=>{
    const url="http://api.weatherstack.com/current?access_key=07443be679ed0dd192931e010aa501c8&query="+encodeURIComponent(address);

    //In request method url of webside
    //We Know That response object has body propertity So We Can Directly use It
    request({url,json: true}, (error,{body})=>{
        if(error){
            callback("!Unable To Connnect Web_Server",undefined)
        }else if(body.error){
            callback("!Unable To Find Location Type Valid Location",undefined)
        }else{
            callback(undefined,{
                //AllLocation: body.location
                //response has been removed below because directly we are calling response.body in request function
                // location_name: body.location.name,
                // location_region: body.location.region,
                // location_country :body.location.country,
                // latitude: body.location.lat,
                // Longitude: body.location.lon,
                // weather_descriptions: body.current.weather_descriptions[0],
                // currently: body.current.temperature,
                // feelsLike: body.current.feelslike
                location: body.location,
                current: body.current
            })
        }
    })
};
//Exporting function
module.exports=geocode_forecast;
// const location={
//     loca=response.body.location
// }
// const current={
//     curr=response.body.current
// }