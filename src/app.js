//Core Node Module
const path=require('path')
const geocode_forecast=require('./utils/geocode_forecast')

//express module return a function in return
const express = require('express');
//Creating Variable as express function
const app=express()
const hbs=require('hbs');
const { error } = require('console');

//Define path for express config
//Use To Join a Path
//Here We Go Back To Web_Server/Public
const PublicDicPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')
// console.log(PublicDicPath);

//Setup handlebar
app.set('view engine','hbs')
//set views lcoation
app.set('views',viewsPath)
//remember registerPartials
hbs.registerPartials(partialsPath)

//Way To Customiz Server
//Setup static directory to serve
//Now Ever File Avalicable here are live at node express server on port 8080
app.use(express.static(PublicDicPath))

//With render we can render our hbs handlebar templte
app.get('', (req, res) =>{
    res.render('index',{
        title: 'Weather',
        name: 'સાર્થક ચારોલા'
    })
});
app.get('/about',(req, res)=>{
    res.render('about',{
        title: 'about',
        name: 'સાર્થક ચારોલા'
    })
});
app.get('/help',(req, res)=>{
    res.render('help',{
        title: 'help',
        Company_name: 'ॐ सर्वे भवन्तु सुखिनः',
        location: 'Bapunager',
        name: 'સાર્થક ચારોલા'
    })
});
// app.get('/product',(req, res)=>{
//     if(!req.query.search){
//         return res.send({
//             error: 'Plz Provide Search Input'
//         })
//     }else{
//         console.log(req.query.search)
//         res.send({
//             product: [{'User_location':'Ahmedabad','Whether_data':'Mostly Sunny'}]
//         })
//     }
// });
// app.get method tells express to what do(configure what the server should do when someone tries to get the url)
// maybe html sending or json
//Weather Page
app.get('/weather', (req, res) =>{
    //If No Value is Given Then if condition show error at browser
    if(!req.query.address){
        return res.send({
            error: 'Provide address to see forecast and geocode'
        })
    }else{
        address = req.query.address
        geocode_forecast(address, (error, {location,current} = {}) => {
            if(error){
                console.log('Error', error)
            }
            if(!error){
                //Console Print
                //console.log(AllLocation);
                console.log("\n\t***Geocode Detalis***")
                console.log("\nLocation : ",location.name,"\nLocation_State : ",location.region,"\nLocation_Country : ",location.country,"\nLatitude : ",location.lat,"\nLongitude : ",location.lon)
                console.log("\n\t***Current forecast Detalis***")
                console.log("\nweather_descriptions : ",current.weather_descriptions[0],"\ncurrently : ",current.temperature,"\nfeelsLike : ",current.feelslike)

                //Brower (fountEnd Side) Print
                res.send({
                    forecast: current.weather_descriptions[0],
                    temperature: current.temperature,
                    feelslike: current.feelslike,
                    location: location.name+","+location.region+","+location.country,
                    address,
                    unit: req.query.unit
                })
            }
        });
    }
});
app.get('/help/*',(req, res)=>{
    res.render('404_Error',{
        title: 404,
        textString: "help article Not Found",
        name: 'સાર્થક ચારોલા'
    })
});
app.get('*',(req, res)=>{
    res.render('404_Error',{
        title: '404',
        textString: "Page Not Found",
        name: 'સાર્થક ચારોલા'
    })
});
//Seting port to listen on brower
app.listen(8080, () => {
    console.log("Server is up on port 8080.");
});
//