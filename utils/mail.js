const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config();

const sendEmail= (filename) =>{
    const msg = {
        from: process.env.FROM_EMAIL,
        to: process.env.TO_EMAIL,
        subject: 'File Uploaded Successfully !!',
        text: `You have uploaded a new Excel file "${filename}" Successfully!`
    };
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PSWD
        },
        port: 465,
        host: 'smtp.gmail.com'
    });
    transporter.sendMail(msg, (err)=> {
        if(err) {
            return console.log('Error sending mail', err);
        } else {
            console.log('Email sent');
        }
    })

} 

module.exports = sendEmail;