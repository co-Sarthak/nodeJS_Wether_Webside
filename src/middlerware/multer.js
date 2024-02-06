const multer = require('multer');
const mime = require('mime-types');
const path = require('path');
const fs = require('fs');

const userPhoto = multer.diskStorage({
    destination: function (req, file, cb) {
    // Static Store of image (means Image is Not Accessable on web) (We Can't Create imageurl of that)
    // const uploadPath = path.join(__dirname, '../uploads/Userprofile');

    // Now We Can Create ImageUrl
    const uploadPath = path.join(__dirname, '../../public/uploads');

    // Create the directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath)
    },
    filename: (req, file, cb) => {
      // For see file type log it
      // console.log(file.mimetype)
      cb(
        null,
        'userprofile' + '_' + Date.now() + '.' + mime.extension(file.mimetype)
        // To Save With Same name As file below code with today's date
        // file.fieldname + '_' + Date.now() + '.' + mime.extension(file.mimetype),
      )
    },
  })

const uploaduserphoto = multer({
    storage: userPhoto,
    // fileFilter: imageFilter,
    // .single('Name Of the Filed at req time')
}).single('profile')

module.exports = uploaduserphoto