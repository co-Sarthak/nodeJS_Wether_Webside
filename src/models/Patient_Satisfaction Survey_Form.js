const mongoose = require('mongoose')
const { Schema, model } = mongoose

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email Is Invalid')
            }
        }
    },
    birthdate: {
        type: Date,
        required: true,
        validate(value){
            if(!validator.isDate(value)){
                throw new Error('Date Is Invalid')
            }
        }
    },
    gender: {
        type: String,
        // enum: ['male', 'female', 'other', 'Male', 'Female', 'Other'],
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('password Cannot Contain password')
            }
        }
    },
    phoneno: {
        type: Number,
        unique: true,
        required: true,
    },
    countryname: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        // required: true
    },
    profile: {
         type: String
    },
    otp: {
        type: Number
    },
    verified: {
        type: Boolean,
        default: false
    }
}, { versionKey: false })


const Patient_Survey = model('User',userSchema)

//Now This User model Can be Used Everywere
module.exports = Patient_Survey;