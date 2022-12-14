const express = require('express');

const router = express.Router();

const fileController = require('../controllers/file');

router.post('/upload', fileController.postUpload);
router.get('/files', fileController.getFiles);


module.exports = router;