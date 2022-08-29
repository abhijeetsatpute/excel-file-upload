const fs = require('fs');
const path = require('path');

const sendEmail = require('../utils/mail');

exports.getFiles = (req, res, next) => {
    fs.readdir(path.join(__dirname, '../public/uploads'), function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        res.status(200).json({message:'Fetched all the files', files: files});
    });
}

exports.postUpload = (req, res, next) => {
    const fileName = req.file.originalname;
    sendEmail(fileName);
    res.status(200).json({message:'Upload successful. Notified via Email'});
}