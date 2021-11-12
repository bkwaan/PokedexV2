const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'PokedexV2Mailer@gmail.com',
      pass: 'Lebronnash33!'
    }
  });


  const sendMail = (Sender, Receiver, subject, text)=>{
    const mailOptions = {
        from: Sender,
        to: Receiver,
        subject: subject,
        text: text
    }
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

  }
  module.exports = sendMail;

  