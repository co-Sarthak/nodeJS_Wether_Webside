const multer = require('multer')
const path = require('path')
var mkdirp = require('mkdirp')
const mime = require('mime-types')

const Companystore = multer.diskStorage({
  destination: function (req, file, cb) {
    upload_path = './uploads/company/logo'
    // mkdirp(upload_path, function (err) {
    // 	if (err) console.error(err)
    // 	else {
    // 		//setting destination.
    // 		cb(null, upload_path);
    // 	}
    // });
    cb(null, upload_path)
  },
  filename: (req, file, cb) => {
    console.log(file.mimetype)
    cb(
      null,
      file.fieldname + '_' + Date.now() + '.' + mime.extension(file.mimetype),
    )
  },
})

const uploadcompanylogo = multer({
  storage: Companystore,
}).single('companyLogo')

const excelFilter = (req, file, cb) => {
  if (
    file.mimetype.includes('excel') ||
    file.mimetype.includes('spreadsheetml')
  ) {
    cb(null, true)
  } else {
    cb('Please upload only excel file.', false)
  }
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    upload_path = './uploads'
    // mkdirp(upload_path, function (err) {
    // 	if (err) console.error(err)
    // 	else {
    //setting destination.
    cb(null, upload_path)
    // }
    // });
  },
  filename: (req, file, cb) => {
    console.log(file.mimetype)
    cb(null, `${Date.now()}-bezkoder-${file.originalname}`)
  },
})

const uploadfile = multer({
  storage: storage,
  fileFilter: excelFilter,
}).single('file')


// const imageFilter = (req, file, cb) => {
//   if (
//     file.mimetype.includes('JPEG') ||
//     file.mimetype.includes('PNG') ||
//     file.mimetype.includes('JPG') ||
//     file.mimetype.includes('jpeg') ||
//     file.mimetype.includes('png') ||
//     file.mimetype.includes('jpg')
//   ) {
//     cb(null, true)
//   } else {
//     cb('Please upload image in jpeg or png or jpg format.', false)
//   }
// }

const userPhoto = multer.diskStorage({
  destination: function (req, file, cb) {
    upload_path = './uploads/user/photo'
    // mkdirp(upload_path, function (err) {
    // 	if (err) console.error(err)
    // 	else {
    //setting destination.
    cb(null, upload_path)
    // }
    // });
  },
  filename: (req, file, cb) => {
    console.log(file.mimetype)
    cb(
      null,
      file.fieldname + '_' + Date.now() + '.' + mime.extension(file.mimetype),
    )
  },
})

const uploaduserphoto = multer({
  storage: userPhoto,
  // fileFilter: imageFilter,
}).single('photo')

const userdocument = multer.diskStorage({
  destination: function (req, file, cb) {
    upload_path = './uploads/user/document'
    // mkdirp(upload_path, function (err) {
    // 	if (err) console.error(err)
    // 	else {
    //setting destination.
    cb(null, upload_path)
    // 			}
    // });
  },
  filename: (req, file, cb) => {
    console.log(file.mimetype)
    cb(
      null,
      file.fieldname + '_' + Date.now() + '.' + mime.extension(file.mimetype),
    )
  },
})

const uploaduserdocument = multer({
  storage: userdocument,
}).single('document')

const usersignature = multer.diskStorage({
  destination: function (req, file, cb) {
    upload_path = './uploads/user/signature'
    // mkdirp(upload_path, function (err) {
    // 	if (err) console.error(err)
    // 	else {
    //setting destination.
    cb(null, upload_path)
    // 	}
    // });
  },
  filename: (req, file, cb) => {
    console.log(file.mimetype)
    cb(
      null,
      file.fieldname + '_' + Date.now() + '.' + mime.extension(file.mimetype),
    )
  },
})

const uploadempsignature = multer({
  storage: usersignature,
}).single('signature')

const companyLetterhead = multer.diskStorage({
  destination: function (req, file, cb) {
    upload_path = './uploads/company/letterhead'
    // mkdirp(upload_path, function (err) {
    // 	if (err) console.error(err)
    // 	else {
    //setting destination.
    cb(null, upload_path)
    // 	}
    // });
  },
  filename: (req, file, cb) => {
    console.log(file.mimetype)
    cb(
      null,
      file.fieldname + '_' + Date.now() + '.' + mime.extension(file.mimetype),
    )
  },
})

const uploadletterhead = multer({
  storage: companyLetterhead,
}).single('letterhead')

const companydocument = multer.diskStorage({
  destination: function (req, file, cb) {
    upload_path = './uploads/company/document'
    // mkdirp(upload_path, function (err) {
    // 	if (err) console.error(err)
    // 	else {
    //setting destination.
    cb(null, upload_path)
    // 	}
    // });
  },
  filename: (req, file, cb) => {
    console.log(file.mimetype)
    cb(
      null,
      file.fieldname + '_' + Date.now() + '.' + mime.extension(file.mimetype),
    )
  },
})

const uploadcompanydocument = multer({
  storage: companydocument,
}).single('document')

const productPhotoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    upload_path = './uploads/product/photo'
    // mkdirp(upload_path, function (err) {
    // 	if (err) console.error(err)
    // 	else {
    //setting destination.
    cb(null, upload_path)
    // 			}
    // });
  },
  filename: (req, file, cb) => {
    console.log(file.mimetype)
    cb(
      null,
      file.fieldname + '_' + Date.now() + '.' + mime.extension(file.mimetype),
    )
  },
})

const uploadProductPhoto = multer({
  storage: productPhotoStorage,
}).single('productPhoto')

const employeeAssetStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    upload_path = './uploads/user/assets'
    // mkdirp(upload_path, function (err) {
    // 	if (err) console.error(err)
    // 	else {
    //setting destination.
    cb(null, upload_path)
    // 	}
    // });
  },
  filename: (req, file, cb) => {
    console.log('abc', file)
    cb(
      null,
      file.fieldname + '_' + Date.now() + '.' + mime.extension(file.mimetype),
    )
  },
})

const uploademployeeassets = multer({
  storage: employeeAssetStorage,
}).array('assetImages', 10)

const LeaveMaster = multer.diskStorage({
  destination: function (req, file, cb) {
    upload_path = './uploads/leaveMaster'
    // mkdirp(upload_path, function (err) {
    // 	if (err) console.error(err)
    // 	else {
    //setting destination.
    cb(null, upload_path)
    // 	}
    // });
  },
  filename: (req, file, cb) => {
    console.log(file.mimetype)
    cb(
      null,
      file.fieldname + '_' + Date.now() + '.' + mime.extension(file.mimetype),
    )
  },
})

const uploadLeaveMaster = multer({
  storage: LeaveMaster,
}).single('file')

//   var storage = multer.diskStorage({
// 	destination: (req, file, cb) => {
// 	  cb(null, __basedir + "/resources/static/assets/uploads/");
// 	},
// 	filename: (req, file, cb) => {
// 	  console.log(file.originalname);
// 	  cb(null, `${Date.now()}-bezkoder-${file.originalname}`);
// 	},
//   });
//   const uploadFile = multer({ storage: storage, fileFilter: excelFilter });
const companyNda = multer.diskStorage({
  destination: function (req, file, cb) {
    upload_path = './uploads/company/Nda'
    // mkdirp(upload_path, function (err) {
    // 	if (err) console.error(err)
    // else {
    //setting destination.
    cb(null, upload_path)
    // 	}
    // });
  },
  filename: (req, file, cb) => {
    console.log(file.mimetype)
    cb(
      null,
      file.fieldname + '_' + Date.now() + '.' + mime.extension(file.mimetype),
    )
  },
})

const uploadcompanyNda = multer({
  storage: companyNda,
}).single('pdf')

const UploadAssetMaster = multer.diskStorage({
  destination: function (req, file, cb) {
    upload_path = './uploads/asset/'
    mkdirp(upload_path, function (err) {
      if (err) console.error(err)
      else {
        //setting destination.
        cb(null, upload_path)
      }
    })
  },
  filename: (req, file, cb) => {
    console.log(file.mimetype)
    cb(
      null,
      file.fieldname + '_' + Date.now() + '.' + mime.extension(file.mimetype),
    )
  },
})

const uploadAssetMaster = multer({
  storage: UploadAssetMaster,
}).single('assetDocument')
module.exports = {
  uploadAssetMaster,
  uploadcompanylogo,
  uploadcompanyNda,
  uploadfile,
  uploaduserphoto,
  uploaduserdocument,
  uploadProductPhoto,
  uploadcompanydocument,
  uploadempsignature,
  uploadletterhead,
  uploademployeeassets,
  uploadLeaveMaster,
}
