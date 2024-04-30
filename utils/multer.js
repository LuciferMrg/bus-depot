const multer  = require('multer');
const path = require('path');


exports.multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'data/avatars/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

exports.imageFilter = function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

exports.multerLimits = {
    fileSize: 1024 * 1024 * 10, // 10 MB
};