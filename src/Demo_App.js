//express module return a function in return
const express = require('express');

//Creating Variable as express function
const app=express()

//console.log("FileName : "+__filename)
// Home Page
app.get('', (req, res) =>{
    res.send("express Hello World!");
});

// Help Page
app.get('/help', (req, res) =>{
    res.send([{
        name: "Sarthak",
        Age: 21
    },
    {
        name: "Samrath",
        Age: 21
    }])
});

// About Page
app.get('/about', (req, res) =>{
    res.send("<h1>You Are in About Page</h1>")
});

//Listen Port 
app.listen(3080, ()=>{
    console.log("Server is up on port 3080.");
})