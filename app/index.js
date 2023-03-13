const nodemailer = require('nodemailer');

const sendEmail = async options =>{
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST, 
      port: process.env.EMAIL_PORT, 
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    })
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: options.email,
      subject: options.subject,
      text: `This email is to notify you have recently reset your password, \nif you did not perform this request kindly contact your adminstrator.`
    
    };
    console.log(mailOptions.text)
    await transporter.sendMail(mailOptions)
    }
    

module.exports = sendEmail;