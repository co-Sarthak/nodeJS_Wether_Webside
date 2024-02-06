require('dotenv').config()

const mongoose = require('mongoose')

// Connecting Database through mongoose(ORM For Mongodb) 
// , { useNewUrlParser: true} Now no need of it
mongoose.connect(process.env.MONGODB_URI).then(() => { 
    console.log('Database connected');
}) .catch((err) => { 
    console.log('Error in connecting database', err);
});