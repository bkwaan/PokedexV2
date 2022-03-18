const nodemailer = require('nodemailer');
const config = require("config");
const nodeEmail = config.get("nodeEmail");
const nodeEmailPassword = config.get("nodeEmailPassword");
const smtpTransport = require('nodemailer-smtp-transport');


const transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    auth: {
      user: nodeEmail,
      pass: nodeEmailPassword
    }
  }));


  const sendMail = (Sender, Receiver, subject, html)=>{
    const mailOptions = {
        from: Sender,
        to: Receiver,
        subject: subject,
        html: html
    }
    transporter.sendMail(mailOptions, function (error, info) {
      console.log(mailOptions)
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

  }
  module.exports = sendMail;

  