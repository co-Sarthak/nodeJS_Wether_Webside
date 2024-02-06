const otpGenerator = require('otp-generator');
// const { OTP_LENGTH, OTP_CONFIG } = require('../constants/constants');
// const User = require('../models/user');
// module.exports.
generateOTP = () => {
  const OTP = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
  console.log(OTP)
  // req.user.otp = OTP
  // // return OTP;
  // req.user.save();
};

generateOTP()

// The OTP_LENGTH is a number, For my app i selected 10.
// The OTP_CONFIG is an object that looks like 
// OTP_CONFIG: {
//   upperCaseAlphabets: true,
//   specialChars: false,
// },