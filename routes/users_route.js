const express = require('express');
const multer  = require('multer');
const path  = require('path');
const AppError = require('../utils/AppError');
const httpstatus = require('../utils/http_status');
const user_controler = require('../controler/User_controller');

function fileFilter (req, file, cb) {
    const imageType = file.mimetype.split('/')[0];
    if(imageType == 'image'){
        return cb(null, true);
    } else {
        return cb(AppError.create("file must be image",  400, httpstatus.FAIL), false);
    }
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const newFilename = "user" + '_' + Date.now() + path.extname(file.originalname);
        cb(null, newFilename);
    }
});

const upload = multer({ storage: storage,
    fileFilter,
});

const router = express.Router()

router.route('/register')
    .post(upload.single('photo'), user_controler.user_register)

router.route('/login')
    .post(user_controler.user_login)



module.exports = router;