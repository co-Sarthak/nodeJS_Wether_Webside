const express = require('express');
const router = new express.Router()
const auth = require('../middlerware/auth')

const uploaduserphoto = require('../middlerware/multer')
const userController = require('../controllers/user')
// cors cross origin resource
var cors = require('cors')
const Joi = require('joi');


// const schema = Joi.object({
//     email: Joi.string().email().required(),
//     password: Joi.string().min(6).max(30).required()
//   });
  
//   const validate = (req, res, next) => {
//     const { error, value } = schema.validate(req.body);
  
//     if (value) {
//         return res.status(200).send(value);
//       }
//     if (error) {
//       return res.status(200).send(error.details[0].message);
//     }
  
//     next();
//   };

//FontEnd Home Route
router.get('/', async (req, res) => {
    res.render('index',{
        name: "Node Js"
    });
});

router.get('/Patient_Satisfaction Survey_Form', async (req, rse) => {
    res.render('Patient_Satisfaction Survey_Form')
});

// For Next js terms & condition
// get works 
router.get('/account/Terms-condition', async (req, res) => {
    res.render("Terms-condition");
})

//register And login route Are Public route
//UserSignUp
router.get('/user/register', uploaduserphoto, userController.userSignUp)
router.get('/user/verifyotp', userController.userOtp)
router.get('/user/login', userController.userSignIn)

// auth,
router.get('/user/update', uploaduserphoto, userController.userWebUpdate)

// userController.userList, function
// auth,
router.get("/user/list", async   (req, res) => {
    // rendering userlist file on localserver
    res.render("userlist", {
        // data: users
    });
})

// This Route Will Direcly Send Validated Data to controller
// validate,
router.post('/user/register', cors(), uploaduserphoto, userController.UserCreate)
// route for OTP verification
router.post('/user/verifyotp', auth, userController.UserVerifyOtp)

router.post('/user/login', userController.UserVerify)

// router.post('/user/password/reset', userController.UserPasswordReset)
//Now All Are Secure route with auth Token
router.post('/user/logout', auth,userController.UserLogout)

//User Profile
router.get('/user/me', auth, async (req, res) => {
    const user=req.user
    res.send({ status :true, user })
})
// upload.single('Profile-Pic'),
router.post('/user/me/profile',auth, uploaduserphoto,userController.UploadUserProfile ,(error, req, res, next) => {
    res.status(400).send({status: false,error: error.message})
})
//Above Code Will Convert Http Error into Json Error

//This route Used For Brower Side Output
router.get('/user/:id/profile',userController.ShowUserProfile)

//User Profile Delete
router.delete('/user/me/profile',auth,userController.UserProfileDelete)

// auth,
router.get('/users', userController.UsersList)
router.post('/users/all', auth, userController.UsersList)

router.post('/user/update/me', auth, uploaduserphoto, userController.UserUpdate)

//If We Are Not using Auth We Can't use user._id
router.delete('/user/me', auth, userController.UserDelete)

module.exports = router;