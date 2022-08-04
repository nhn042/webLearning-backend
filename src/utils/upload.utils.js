const multer = require('multer');
const path = require('path');

const fileFilter = (req, file, cb) => {
    const extname = path.extname(file.originalname).toLowerCase();
    try {
        if (extname === '.jpg' || extname === '.jpeg' || extname === '.png') {
            cb(null, true);
        } else {
            cb(null, false);
        }
    } catch (err) {
        cb(new Error('400', 'You upload wrong file'));
    }
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/assets/uploads/photos');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + String(Math.round(Math.random() * 100)) + path.extname(file.originalname));
    },
});

const uploadPhotos = multer({ storage: storage, fileFilter });

module.exports = { uploadPhotos };
