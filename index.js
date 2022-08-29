const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const path = require('path');

const fileController = require('./routes/file');

const app = express();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null,file.originalname);
    }
});

// Serving static files that are uploaded
app.use(express.static(path.join(__dirname, 'public')));

// Bodyparser middleware to parse incoming requests from encoded values
app.use(bodyParser.urlencoded({ extended: true }));

// Multer middleware to handle single file upload with ID 'excel' only.
app.use(multer({storage : fileStorage}).single('excel'));

app.use(fileController);

mongoose
  .connect(process.env.MONGO_URI)
  .then(result => {
    console.log("🎉 Database connected.");
    app.listen(80, function () {
        console.log('✨ App listening on port', this.address().port);
    });
  })
  .catch(err => {
    console.log(err);
  });
