const express = require("express");
const router = express.Router();
const Users = require("../models/user");
const bcrypt = require("bcrypt");
const speakeasy = require("speakeasy");
const saltRounds = 10;
const mailer = require('../Util/mailer')
const crypto = require('crypto');
const fs = require('fs')
const util = require('util')
const promiseFs = util.promisify(fs.readFile);
const promiseCrypto = util.promisify(crypto.randomBytes);
const handleBars = require('handlebars');




router.post("/SignUp", async (req, res) => {
  let { FirstName, LastName, UserName, Email, Password } = req.body;
  try {
    let user = await Users.find({
      $or: [{ Email: Email }, { UserName: UserName }],
    }).exec();
    if (user.length) {
      res
        .status(409)
        .json({ Msg: "Username or Email already exists", Success: false });
    } else {
      Password = await bcrypt.hash(Password, saltRounds);
      console.log(Password);
      let user1 = new Users({
        UserName,
        Email,
        Password,
        FirstName,
        LastName,
      });
      await user1.save();
      res
        .status(201)
        .json({ Msg: "User has successfully been saved", Success: true });
    }
  } catch (err) {
    console.log(err);
  }
});


router.get("/Login", async (req, res) => {
  const { UserName, Password } = req.body;
  try {
    const user = await Users.findOne({ UserName: UserName }).exec();

    if (user != null) {
      if (await bcrypt.compare(Password, user.Password)) {
        const secret = speakeasy.generateSecret({ length: 20 });
        const token = speakeasy.totp({
          secret: secret.base32,
          encoding: 'base32'
        });

        mailer('PokedexV2Mailer@gmail.com', user.Email, 'OTP Code', '<p>Your OTP Code: ' + token + '</p>');
        res.status(201).json({ Msg: 'OTP Code sent', Success: true });
      }
      else {
        res.status(409).json({ Msg: 'Failed username or login is incorrect', Success: false });
      }
    }
    else {
      res.status(409).json({ Msg: 'Account does not exist', Success: false });
    }

  } catch (err) {
    console.log(err);
  }
});


router.get("/ForgotPassword", async (req, res) => {
  const { UserName } = req.body;
  try {
    let user = await Users.findOne({ UserName: UserName }).exec();
    if (user != null) {
      const token = (await promiseCrypto(12)).toString('hex')
      const html = await promiseFs('./api/temp.html', 'utf-8');
      let template = handleBars.compile(html);
      template = template({ token: 'http://localhost:3000/ResetPassword' + token, firstname: user.FirstName });
      console.log(token);
      mailer('PokedexV2Mailer@gmail.com', user.Email, 'Pasword Reset', template);
      res.status(201).json({ Msg: 'Email Sent', Success: true });
    }
    else {
      res.status(409).json({ Msg: 'Account does not exist', Success: false });
    }

  } catch (err) {
    console.log(err);
  }
});

module.exports = router;




