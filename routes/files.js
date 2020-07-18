const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

var storage = multer.diskStorage({ //multers disk storage settings
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../', 'uploads/'));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
  }
});

var upload = multer({ //multer settings
  storage: storage
});

//const upload = multer({ dest: path.join(__dirname, '../', 'uploads/') });
const filesController = require('../controllers/files_controller');

router.post('/upload', upload.single('csvfile'), filesController.uploadFile);
router.get('/', filesController.displayAllFiles);
router.get('/:id/view', filesController.openFile);

//export router
module.exports = router;
