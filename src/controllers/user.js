//User Model
const User = require('../models/user')
const bcrypt = require('bcrypt')
const Joi = require('joi');


// HTTP status code and name
//200 Ok
//201 Created
//400 Bad req
//401 Unauthorized
//500 Internal Server Error

// const { generateOTP } = require('../middlerware/otp')

const userSignUp = async (req, res, next) => {
    res.render('register',{
        name: "Node Js"
    });
}

const userSignIn = async (req, res, next) => {
    res.render('login',{
        name: "Node Js"
    });
}

const userWebUpdate = async (req, res, next) => {
    res.render('update',{
        name: "Node Js"
    });
}

const UserCreate = async (req, res, next) => {
    //It Will log passed value on console
    // console.log("User Create Controller : ",req.body);
    // console.log("User Create Controller : ",req.file);
    // return;

    const schema = Joi.object({
        countryname: Joi.string(),
        gender: Joi.string(),
        birthdate: Joi.string(),
        name: Joi.string().alphanum().min(3).max(30).required(),
        phoneno: Joi.number().integer().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(30).required()
    });

    const { error, value } = schema.validate(req.body);

    if(error){
        return res.json({
            status: false,
            wrmessage: error.details[0].message
        },200)
    }
    // else{
    //     return res.json({
    //         status: true,
    //         message: "Validation Successfully Done.",
    //         data: value
    //     })
    // }

    // For Check If User Already Created
    const { email, phoneno } = value;
    {
        const user = await User.findOne({email})
        if(user){
            return res.json({
                wrmessage: "With This email Already User Created",
                status: false
            })
        }
    }
    // Extra Validation with phoneno
    {
        const user = await User.findOne({phoneno})
        if(user){
            return res.json({
                wrmessage: "With This Phone no Already User Created",
                status: false
            })
        }
    }

    // if (!email && !phoneno) {
    //     return res.json({
    //         message: "email and phoneno not present",
    //         status: false
    //     })
    // }


    // phone no is input tel at website so need to check number datatype length properity
    // phone no length checker
    // if(phoneno.length>10){
    //     return res.json({
    //         wrmessage: "Provide Original phone no",
    //         status: false
    //     })
    // }
    const user = new User(req.body)
    try{
        const { filename, path } = req.file;
        // Here Just Storing file name
        if(filename){
            user.profile=filename;
            console.log("profile store name : "+user.profile);
            console.log(path);
            urlimage = process.env.Image_Url+user.profile;
        }
        
        const token = await user.generateAuthToken()
        await user.save()
        //For Sending OTP To Registered User Email
        await user.generateOTP()
        await user.sendmail()
        
        res.json({ status: true, message: 'User created successfully','urlimage' : urlimage, token, 'data': user });
    }catch(e){
        res.status(400).json({
            status: false,
            wrmessage: "User not successful created",
            error: e,
        })
    }
};

const userOtp = async ( req, res, next ) => {
    res.render('userverify',{
        name: 'node js'
    });
}

const UserVerifyOtp = async ( req, res, next ) => {
    const { email } = req.user

    const { otp } = req.body;
    console.log(email ,otp)
    // Retrieve the user from the database based on the email
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ status: false, wrmessage: 'User not found' });
    }
    console.log(user)
    if (user.otp != otp) {
      return res.json({ status: false, wrmessage: 'Incorrect OTP' });
    }
    // OTP is correct, mark the user as verified
    user.verified = true;
    await user.save();
    // Send a response indicating successful verification
    res.json({ status: true, message: 'User successfully verified' });
}

const UserVerify = async (req, res, next) => {
    
    console.log("Userlogin Controller : ",req.body)
    const { email, password, resend_mail } = req.body
    
    // Check And give error if password,email is are not provided
    if (!email && !password) {
        return res.json({
            wrmessage: "email and password not present",
            status: false
        })
    }
    if (!email) {
        return res.json({
            message: "email not present",
            status: false
        })
    }else if (!password) {
        return res.json({
            message: "password not present",
            status: false
        })
    }
    //Here Checks email & password are correct
    const user = await User.findOne({ email })
    if(!user){
        return res.json({
            // rmessage: "No User Found Unable to login",
            wrmessage: "Please Give Us Valid credentials",
            status: false
        })
    }
    // This Will Check user is verified or not
    // If User Is Not Verifed It Will Give error message
    if(user.verified==false){
        if(!resend_mail){
            return res.json({
                wrmessage: "User Is Not Verified For Resend Verification mail give filed resend_mail as true boolen",
                status: false
            })
        }
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        return res.json({
            // Never Give Accurate Information about security thigs(data).
            // wrmessage: "Password Not Match",
            wrmessage: "Please Give Us Valid credentials",
            status: false
        })
    }
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        
        const token = await user.generateAuthToken()

        // Just for testing If User Whant To Resend email then he/she can
        if(user.verified==false){
            if(resend_mail==true){

                await user.sendmail()

                return res.json({
                    status: true,
                    message: "Mail Send To Registed User email Id",
                    token
                })
            }
        }
        // res.send({status: true, user, token})
        // console.log("You Are Inside UserVerify try Block");
        res.send({ status: true, message: "User successfully Login", token })
    }catch(e){
        res.send({ status: false, message: "User Not Successfully Login", "error": e.message })
    }
}
// This Code is for All User List With Auth User Also
// const UsersList = async (req, res, next) => {
//     try{
//         //select "-" remove passed field 
//         //await return user list as promise
//         const users = await User.find({})
//         // .select("-password")
//         // Removing Auth User
//         // const result = await users
//         // res.send({ status: true, users })
//         return users;
//     }catch(e){
//         res.status(500).send({ status: false, e })
//     }
// }

// const UserPasswordReset = async (req, res, next) => {
    
// }

// This Code is for All User List Without Auth(Logged) User
const UsersList = async (req, res, next) => {
    try {
        // const users = await User.find({});
        // if(req()->ajax()){
            // $data = Products::latest()->get();
            // const data = await User.find({});
        // }
        const allusers = await User.find({});

        // res.send(allusers);
        
        // User to be removed
        // const userToRemove = { email: req.user.email };
        // email = req.user.email

        // data of user to be removed are below two line
        // const check = await User.find({ email })
        // console.log(check)

        // Below One Display All users
        // console.log('users:', users);

        // console.log('userToRemove:', userToRemove);
        
        // Create a new array excluding the user to be removed
        // const updatedUsers = users.filter(user => user.email != userToRemove.email);

        // List of updated Users
        // console.log('updatedUsers:', updatedUsers);
        
        res.send({ status: true, message: "Users Get successfully", users: allusers });
    } catch (e) {
        res.status(500).send({ status: false, message: "Users Not Get successfully", "error": e.message });
    }
};

const UserLogout = async (req, res, next) => {
    try{
        // req.user.tokens = req.user.tokens.filter((token)=>{
        //     return token.token !== req.token
        // })
        req.user.token = ''
        await req.user.save()

        res.send({ status: true,message : "User successfully logout" })
    }catch(e){
        res.status(500).send({ status: false})
    }
}

const UserUpdate = async (req, res, next) => {
    const {email} = req.body
    const check = req.user.email;
    // Below Condtion is For Checking email stored inside database with email given at req time
    if(email==check){
        return res.json({
            status: false,
            message: "Given Email id Is Already Used By You."
        },200)
    }
    // If Any Other User Has Used req Given email id.
    const user = await User.findOne({email})
    if(user){
        return res.json({
            status: false,
            // message: "Given Email id Is Already In Used."
            // for more security We Can Also Use Below Message
            message: "Use Another email id."
        },200)
    }
    
    const updates = Object.keys(req.body)
    allowedupdates=['name','email','birthdate','gender','password','phoneno','countryname','profile']
    const isvalidOperation = updates.every((update)=>allowedupdates.includes(update))

    if(!isvalidOperation){
        res.status(200).send({status: false, error: 'Invaild update parameter'})
    }
    try{
        updates.forEach((update) => req.user[update] = req.body[update])

        if(req.body.profile){
            const { filename } = req.file;
        
            if(filename){
                req.user.profile=filename;
            }
        }
        await req.user.save()
        
        const user = req.user;
        const urlimage = process.env.Image_Url+user.profile;
        user.profile = urlimage;
        return res.json({
            status: true,
            message: "User Record Updated Successfully.",
            data: user
        },200)
    }catch(e){
        res.status(400).send({ status: false, "error": e.message });
    }
}

const UserDelete = async (req, res, next) =>{
    try{
        const user = await User.findByIdAndDelete(req.user._id)
        res.send({ status: true, user })
    }catch(e){
        res.status(500).send({ status: false, e})
    }
}

const UploadUserProfile = async (req, res, next) => {
    req.user.profile=req.file.buffer
    await req.user.save()
    if(upload){
        res.send({status: true, message: 'Image Uploaded'})
    }
}

const ShowUserProfile = async (req, res, next) =>{
    try{
        const user = await User.findById(req.params.id) 
        if(!user || !user.profile){
            throw new Error()
        }
        res.set('Content-Type', 'image/jpg')
        res.send(user.profile)
    }catch(e){
        res.status(404).send({status: false})
    }
}

const UserProfileDelete = async (req, res, next) => {
    try{
        //This Will Remove Whole Profile Filed
        req.user.profile=undefined
        await req.user.save()
        res.send({status: true})
    }catch(e){
        res.send({status: false, e})
    }
}

module.exports = {
    userSignUp,
    UserCreate,

    userOtp,
    UserVerifyOtp,

    userSignIn,
    UserVerify,

    // userList,
    UsersList,

    userWebUpdate,
    UserUpdate,

    UserLogout,

    UserDelete,

    UploadUserProfile,
    ShowUserProfile,
    UserProfileDelete
};