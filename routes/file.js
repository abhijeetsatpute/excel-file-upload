const express = require('express');

const router = express.Router();

const fileController = require('../controllers/file');

router.post('/upload', fileController.postUpload);
router.get('/', fileController.getFiles);


module.exports = router;