const multer = require('multer');
const path = require('path');
const { nextTick } = require('process');

const fileFilter = (req, file, cb) => {
    const extname = path.extname(file.originalname).toLowerCaser();
    console.log(extname);
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
        console.log('ggfg');
        cb(null, path.join(__dirname, '../assets/uploads/photos'));
    },
    filename: function (req, file, cb) {
        console.log('ggsssfg');
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 100);
        cb(null, file.fieldname + '/' + uniqueSuffix);
    },
});

const uploadPhotos = multer({ storage: storage, fileFilter }).array('img', 5);

module.exports = { uploadPhotos };
