const express = require('express');
// For Mongodb Database Connect
require('./db/mongoose')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const path = require('path');
const hbs = require('hbs');

const app = express()

const morgan = require('morgan');

const port = process.env.PORT

// app.use((req, res, next)=>{
//     if(req.method === 'GET'|| 'POST') {
//         // return 
//         res.json({
//             "status": false,
//             "message": "WebSite is Under Maintenance B/O admin@Sarthak."
//         },503)
//     } else{
//         next()
//     }
// })

// Set the views directory
const PublicDicPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

// Set the view engine to HBS
app.set('view engine', 'hbs');
//set views lcoation
app.set('views',viewsPath);
//remember registerPartials
hbs.registerPartials(partialsPath);

// Way To Customiz Server
// Setup static directory to serve
// Now Ever File Avalicable here are live at node express server on port 3000
app.use(express.static(PublicDicPath));

// public folder that is avaliable public folder we create folder uploads where image are upload for web view also.
// So We Can Create image url to access image uploaded.
app.use('/uploads', express.static('uploads'));

// Autometicaly parse incomming object into json
// app.use(express.json());

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));
app.use(express.static("public"));
app.use(morgan("combined"));

app.use(userRouter,taskRouter);

app.listen(port, () => {
    console.info("Server Is Running On :"+port);
});

// With middleware:   new req  --> do something  -> run route handler


// const http = require('http');
// const hostname = '127.0.0.1';
// const port = 3000;
// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });
// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });