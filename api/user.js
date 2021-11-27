const express = require("express");
const router = express.Router();
const Users = require("../models/user");
const bcrypt = require("bcrypt");
const speakeasy = require("speakeasy");
const saltRounds = 10;
const mailer = require("../Util/mailer");
const crypto = require("crypto");
const fs = require("fs");
const util = require("util");
const promiseFs = util.promisify(fs.readFile);
const promiseCrypto = util.promisify(crypto.randomBytes);
const handleBars = require("handlebars");
const jwt = require("jsonwebtoken");
const config = require("config");

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
      var VerifyToken = crypto.randomBytes(10).toString("hex");
      VerifyToken = jwt.sign({ data: VerifyToken }, config.get("jwtPass"), {
        expiresIn: "1h",
      });
      let user1 = new Users({
        UserName,
        Email,
        Password,
        FirstName,
        LastName,
      });
      await user1.save();
      const html = await promiseFs("./Util/temp.html", "utf-8");
      let template = handleBars.compile(html);
      template = template({
        header: "Account Creation",
        title: "Please Verify Your Account",
        token: "http://localhost3000:/api/User/VerifyAccount/" + VerifyToken, //need to update this later
        content:
          "Thank you for creating your account, please verify your account by clicking the link below.",
        firstname: user.FirstName,
        linkText: "Verify Account",
      });
      mailer("PokedexV2Mailer@gmail.com", Email, "Verify Account", template);
      res
        .status(201)
        .json({ Msg: "User has successfully been saved", Success: true });
    }
  } catch (err) {
    console.log(err);
  }
});

//Verify Account

router.post("/VerifyAccount", async (req, res) => {
  const { UserName, VerifyToken } = req.body;
  try {
    let user = await Users.findOne({ UserName: UserName }).exec();
    if (user) {
      if (jwt.verify(VerifyToken, config.get("jwtPass"))) {
        user.isVerified = true;
        await user.save();
        res
          .status(209)
          .json({
            Success: true,
            Msg: "User has been verified, Please login to your account",
          });
      } else {
        res.status(401).json({ Succcess: false, Msg: "Token has expired" });
      }
    } else {
      res.status(404).json({ Success: false, Msg: "User not found" });
    }
  } catch (err) {
    console.log(err);
  }
});

//Login
router.get("/Login", async (req, res) => {
  const { UserName, Password } = req.body;
  try {
    const user = await Users.findOne({ UserName: UserName }).exec();

    if (user != null) {
      if (await bcrypt.compare(Password, user.Password)) {
        const secret = speakeasy.generateSecret({ length: 20 });
        const token = speakeasy.totp({
          secret: secret.base32,
          encoding: "base32",
        });
        mailer(
          "PokedexV2Mailer@gmail.com",
          user.Email,
          "OTP Code",
          "<p>Your OTP Code: " + token + "</p>"
        );
        res.status(201).json({ Msg: "OTP Code sent", Success: true });
      } else {
        res.status(409).json({
          Msg: "Failed username or login is incorrect",
          Success: false,
        });
      }
    } else {
      res.status(409).json({ Msg: "Account does not exist", Success: false });
    }
  } catch (err) {
    console.log(err);
  }
});

// Update password
router.post("/UpdatePassword", async (req, res) => {
  let { UserName, OldPassword, Password } = req.body;
  try {
    let user1 = await Users.findOne({ UserName: UserName }).exec();
    let comparePass = await bcrypt.compare(OldPassword, user1.Password);
    if (comparePass) {
      Password = await bcrypt.hash(Password, saltRounds);
      let user = await Users.findOneAndUpdate(
        {
          UserName: UserName,
        },
        { Password: Password }
      );
      if (user) {
        console.log(user);
        const html = await promiseFs("./Util/temp.html", "utf-8");
        let template = handleBars.compile(html);
        template = template({
          header: "Password Change",
          title: "Password hass been changed on your account",
          token: "www.google.ca", //need to update this later
          content:
            "Your password has been recently changed on your account, if you have not requested the change. Please click the link below to update your password",
          firstname: user.FirstName,
          linkText: "Change Password",
        });
        mailer(
          "PokedexV2Mailer@gmail.com",
          user.Email,
          "Pasword Change",
          template
        );
        res.status(209).json({
          Msg: "Password has been successfully updated!",
          Success: true,
        });
      } else {
        res
          .status(409)
          .json({ Msg: "Password has not been updated", Success: false });
      }
    } else {
      res.status(409).json({ Msg: "Password does not match", Success: false });
    }
  } catch (err) {
    console.log(err);
  }
});

// Forget Password
router.get("/ForgotPassword", async (req, res) => {
  const { UserName } = req.body;
  try {
    const user = await Users.findOne({ UserName: UserName });
    if (user != null) {
      const token = (await promiseCrypto(12)).toString("hex");
      Users.updateOne({ UserName: UserName }, {}).set(
        "Authentication.0.ResetAuth",
        token
      );
      const html = await promiseFs("./Util/temp.html", "utf-8");
      let template = handleBars.compile(html);
      template = template({
        header: "Password Reset",
        title: "Password reset has been requested for your account",
        token: "http://localhost:3000/ResetPassword" + token,
        content: "A Password Reset link was requested for your account",
        firstname: user.FirstName,
        linkText: "Reset Password",
      });
      mailer(
        "PokedexV2Mailer@gmail.com",
        user.Email,
        "Pasword Reset",
        template
      );
      res.status(201).json({ Msg: "Email Sent", Success: true });
    } else {
      res.status(409).json({ Msg: "Account does not exist", Success: false });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
