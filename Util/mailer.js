const nodemailer = require("nodemailer");
const nodeEmail = process.env.nodeEmail;
const nodeEmailPassword = process.env.nodeEmailPassword;

const transporter = nodemailer.createTransport({
  service: "hotmail",
  tls: {
    rejectUnauthorized: false,
  },
  auth: {
    user: nodeEmail,
    pass: nodeEmailPassword,
  },
});

const sendMail = (Sender, Receiver, subject, html) => {
  const mailOptions = {
    from: Sender,
    to: Receiver,
    subject: subject,
    html: html,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    console.log(mailOptions);
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
module.exports = sendMail;
