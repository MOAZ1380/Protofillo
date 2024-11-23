const multer  = require('multer');
const path  = require('path');
const AppError = require('../utils/AppError');
const httpstatus = require('../utils/http_status');

function fileFilter (req, file, cb) {
    console.log(file);
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
    limits: { fileSize: 1024 * 1024 * 5 }
});

module.exports = upload;