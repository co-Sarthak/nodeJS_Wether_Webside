//Importing postman-request module
const request=require('postman-request');

const forecast=(latitude, longitude, callback)=>{
    const url="http://api.weatherstack.com/current?access_key=07443be679ed0dd192931e010aa501c8&query="+latitude+","+longitude+"&units=s";

    //In request method url of webside 
    request({url: url,json: true}, (error,response)=>{
        if(error){
            callback("!Unable To Connnect Web_Server",undefined)
        }else if(response.body.error){
            callback("!Unable To Find Location Type Valid Location")
        }else{
            callback(undefined,{
                location: response.body.location.name,
                weather_descriptions: response.body.current.weather_descriptions[0],
                currently: response.body.current.temperature,
                feelsLike: response.body.current.feelslike
            })
        }
    })
};
//Exporting function
module.exports=forecast;