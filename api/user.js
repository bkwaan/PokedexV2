const express = require("express");
const router = express.Router();
const Users = require("../models/user");
const bcrypt = require("bcrypt");
const speakeasy = require("speakeasy");
const saltRounds = 10;
const mailer = require('../Util/mailer')



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
  var { UserName, Password } = req.body;
 
  try {
    let user = await Users.findOne({ UserName: UserName }).exec();
   
    if (user != null) {
      if (await bcrypt.compare(Password, user.Password)) {
        const secret = speakeasy.generateSecret({ length: 20 });
        const token = speakeasy.totp({
          secret: secret.base32,
          encoding: 'base32'
        });

        mailer('PokedexV2Mailer@gmail.com',user.Email, 'OTP Code', "Your OTP Code: " + token);
        res.status(201).json({Msg: 'OTP Code sent', Success:true});
      }
      else {
        res.status(409).json({Msg:'Failed username or login is incorrect', Success:failed});
      }
    }
    else {
      res.status(409).json({Msg:'Account does not exist', Success:failed});
    }

  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
