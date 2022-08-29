const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const fileController = require('./routes/file');

const app = express();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, 'dec' + '-' + file.originalname);
    }
});

// Bodyparser middleware to parse incoming requests from encoded values
app.use(bodyParser.urlencoded({ extended: true }));

// Multer middleware to handle single file upload with ID 'excel' only.
app.use(multer({storage : fileStorage}).single('excel'));

app.use(fileController);

app.listen(80, function () {
    console.log('✨ App listening on port', this.address().port);
});