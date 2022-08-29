const fs = require('fs');
const path = require('path');

const sendEmail = require('../utils/mail');

const File = require('../models/file');

// Fetch all files
exports.getFiles = async (req, res, next) => {
    try {
        const files = await File.find();
        const numberOfFIles = await File.find().countDocuments();
        res.status(200).json({message: `Fetched all ${numberOfFIles} files`, files: files});
    } catch (error) {
        console.log(error);
    }
};

// Insert files deatils into mongoDB as a document
exports.postUpload = async (req, res, next) => {
    const fileName = req.file.filename;
    const fileSize = req.file.size;
    const filePath = req.file.path;
    const newFile = new File({
        fileName: fileName,
        fileSize: fileSize,
        filePath: `${req.protocol}://${req.get('host')}/uploads/${fileName}`
    })
    try {
        const resulr = await newFile.save();
        sendEmail(fileName);
        res.status(200).json({message:'Upload successful & Notified via Email'});
    } catch (error) {
        console.log(error);
    }
}