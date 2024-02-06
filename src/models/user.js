require('dotenv').config()

const mongoose = require('mongoose')
const { Schema, model } = mongoose
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//Sending OTP && Mail
const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer')
// Not Comment This This In Use 
const Mailgen = require('mailgen');
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
        // enum type is string it will validate string value given if any mismatch happen it will throw error
        type: String,
        // If enum will problem comment below line
        enum: ['male', 'female', 'other', 'Male', 'Female', 'Other'],
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
        required: true
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
//toJSON apply change to all routes
userSchema.methods.toJSON = function() {
    const user = this
    //to method is provided by moongoose
    //that is used in user.toObject that gives us raw user data
    const userObject = user.toObject()
    // Here delete filed is not showen to user side
    delete userObject._id
    delete userObject.verified
    delete userObject.password
    delete userObject.token
    delete userObject.otp

    return userObject
}

userSchema.methods.generateOTP = async function () {
    const user = this

    const OTP = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
    console.log("User OTP : ",OTP)
    user.otp = OTP
    await user.save();
    // return OTP;
}

userSchema.methods.sendmail = async function () {
    /** send mail from gmail account */
    const user = this

    const config = {
        service : 'gmail',
        auth : {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    }

    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
        // theme: "default", "neopolitan", "salted", "cerberus"
        // pov just default looks good
        theme: "default",
        product : {
            // Appears in header & footer of e-mails
            name: "Node js Api",
            link : 'https://nodejs.org/en/docs'
        }
    })

    let response = {
        body: {
            name : "From Node js Api",
            intro: "Verification Mail From Node Website",
            table : {
                data : [
                    {
                        Name: user.name,
                        OTP: user.otp
                    }
                ]
            },
            outro: "Looking forward to send more information about your account"
        }
    }

    let mail = MailGenerator.generate(response)

    let mailOptions = {
        from : process.env.EMAIL,
        to : user.email,
        subject: "Node Js Account Verification OTP",
        html: mail
        // We Can Send Also In txt But Not Recommaded for Production Website Mail Send
        // text: user.name + " You Have Just Signed up To Node Js User API And Your OTP IS : " + user.otp + " Enter It on User Verify"
        // Normal html
        // html: `
        //     <div class="container" style="max-width: 100%; margin: auto; padding-top: 20px; text-align: center; background-color: #0C0A00; color: white;" >
        //         <h2>Welcome to the node.js club.</h2>
        //         <h4>You are officially In ✔</h4>
        //         <p style="margin-bottom: 30px;">Please enter the sign up OTP to get started</p>
        //         <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${user.otp}</h1>
        //     </div>
        // `,
    }
    transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
          console.log("Error " + err);
        } else {
          console.log("sendmail function : Email with otp sent successfully");
        }
    })
    // For Just Send mail and get response use below code
    // .then(() => {
    //     return res.status(200).json({
    //         msg: "you should receive an email"
    //     })
    // }).catch(error => {
    //     return res.status(500).json({ error })
    // })

    // res.status(200).json("sendmail Successfully...!");
}

userSchema.methods.generateAuthToken = async function () {
    const user = this

    // If not specified a defaults will be used based on the type of key provided

    //     secret - ['HS256', 'HS384', 'HS512']
    //     rsa - ['RS256', 'RS384', 'RS512']
    //     ec - ['ES256', 'ES384', 'ES512']
    //     default - ['RS256', 'RS384', 'RS512']

    const token = jwt.sign({ _id: user._id.toString() }, 'thisisnodejsdev', { expiresIn: '6h' })
    // expiresIn: '1 days'

    // Migration Notes: v8 to v9(fiexes in jwt)
    // RSA key size must be 2048 bits or greater
    // sign now enforces a minimum key size for RSA keys. To preserver the old behaviour and allow keys of less than 2048 bits,
    // set allowInsecureKeySizes to true.

    // ,allowInsecureKeySizes: true
    // const token = jwt.sign({ _id: user._id.toString() }, 'thisisnodejsdev', { algorithm: 'RS256' })

    user.token = token;

    await user.save()
    // console.log("From AuthToken"+user);
    return token;
}

userSchema.statics.findByCredentials = async (email, password)=>{
    const user = await User.findOne({email})
    if(!user){
        throw new Error('No User Found Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        throw new Error('Password Not Match')
    }
    return user
}

// Arrow function don't support this
// here(Inside function) this means document that being save 
userSchema.pre('save',async function(next){
    //now this is const user
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }
    next()
})

const User = model('User',userSchema)

//Now This User model Can be Used Everywere
module.exports = User;