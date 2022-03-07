const express = require("express");
const router = express.Router();
const Users = require("../models/user");
const bcrypt = require("bcrypt");
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
const totp = require("otplib").totp;

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
        token: `http://localhost:3000/VerifyAccount/${UserName}/${VerifyToken}`, //need to update this later
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
router.put("/VerifyAccount", async (req, res) => {
  const { UserName, VerifyToken } = req.body;
  try {
    let user = await Users.findOne({ UserName: UserName }).exec();
    if (user) {
      if (!user.isVerified && jwt.verify(VerifyToken, config.get("jwtPass"))) {
        user.isVerified = true;
        await user.save();
        res.status(209).json({
          Success: true,
          Msg: "User has been verified",
        });
      }
      else {
        res.status(401).json({ Success: false, Msg: "User already verified" });
      }
    }
    else {
      res.status(404).json({ Success: false, Msg: "User not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(401).json({ Succcess: false, Msg: "Token has expired" });
  }
});

// Send new verification link
router.get("/NewVerificationLink/:UserName", async (req, res) => {
  const { UserName } = req.params;
  try {
    const user = await Users.findOne({ UserName }).exec();
    if (user) {
      if (user.isVerified) {
        res.status(409).json({
          Success: false,
          Message: "User has aready been verified",
        });
      } else {
        let VerifyToken = crypto.randomBytes(10).toString("hex");
        VerifyToken = jwt.sign({ data: VerifyToken }, config.get("jwtPass"), {
          expiresIn: "1h",
        });
        const html = await promiseFs("./Util/temp.html", "utf-8");
        let template = handleBars.compile(html);
        template = template({
          header: "Account Verification",
          title: "Please Verify Your Account",
          token: `http://localhost:3000/VerifyAccount/${UserName}/${VerifyToken}`, //need to update this later
          content: "Please verify your account by clicking the link below.",
          firstname: user.FirstName,
          linkText: "Verify Account",
        });
        mailer("PokedexV2Mailer@gmail.com", user.Email, "Verify Account", template);
        res.status(209).json({
          Success: true,
          msg: "New Verification link has been sent, please check your email",
        });
      }
    } else{
      res.status(404).json({
        Success: false,
        Message: "User not found",
      });
    }
  } catch (err) {
    console.log(err);
  }
});

//Login
router.post("/Login", async (req, res) => {
  const { UserName, Password } = req.body;
  try {
    const user = await Users.findOne({ UserName: UserName }).exec();
    if (user != null) {
      if (await bcrypt.compare(Password, user.Password) && user.isVerified) {
        const secret = (await promiseCrypto(12)).toString("hex");
        totp.options = { step: 300 };
        const token = totp.generate(secret);
        user.TwoFactSecret = secret;
        await user.save();
        const clientInfo = {
          ID: user['_id'],
          UserName: user.UserName,
          FirstName: user.FirstName,
          LastName: user.LastName,
          Email: user.Email,
          isVerified: user.isVerified
        }
        mailer(
          "PokedexV2Mailer@gmail.com",
          user.Email,
          "OTP Code",
          "<p>Your OTP Code: " + token + "</p>"
        );
        res.status(201).json({ Msg: "OTP Code sent", Success: true, clientInfo: clientInfo });
      } else if (!user.isVerified) {
        res.status(401).json({
          Msg: "Account has not been verified",
          Success: false,
        });
      } else {
        res.status(401).json({
          Msg: "Failed credentials are incorrect",
          Success: false,
        });
      }
    } else {
      res.status(404).json({ Msg: "Account does not exist", Success: false });
    }
  } catch (err) {
    res.status(409).json({ Msg: err.message, Success: false });
  }
});

// Verify OTP Code
router.post("/VerifyOTP", async (req, res) => {
  const { UserName, Token } = req.body;
  try {
    const user = await Users.findOne({ UserName: UserName }).exec();
    const verify = totp.check(Token, user.TwoFactSecret);
    if (verify) {
      res.status(201).json({ Msg: "OTP Accepted", Success: true });
    }
    else {
      res.status(401).json({ Msg: "OTP Expired or Incorrect", Success: false });
    }
  } catch (err) {
    res.status(409).json({ Msg: err.message, Success: false });
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
router.get("/ForgotPassword/:Email", async (req, res) => {
  const { Email } = req.params;
  try {
    const user = await Users.findOne({ Email: Email }).exec();
    if (user != null) {
      const token = jwt.sign({}, `${config.get("jwtPass")}${user.Password.substr(user.Password.length - 5)}`, {
        expiresIn: "5m",
      });
      console.log(user.Password)
      const html = await promiseFs("./Util/temp.html", "utf-8");
      let template = handleBars.compile(html);
      template = template({
        header: "Password Reset",
        title: "Password reset has been requested for your account",
        token: "http://localhost:3000/ResetPassword/" + token,
        content: "A Password Reset link was requested for your account",
        firstname: user.FirstName,
        linkText: "Reset Password",
      });
      mailer(
        "PokedexV2Mailer@gmail.com",
        user.Email,
        "Password Reset",
        template
      );
      res.status(201).json({ Msg: "Email Sent", Success: true });
    } else {
      res.status(404).json({ Msg: "Account does not exist", Success: false });
    }
  } catch (err) {
    console.log(err);
    res.status(409).json({ Msg: err.message, Success: false });

  }
});

//Reset Password
router.post("/ResetPassword", async (req, res) => {
  const { Email, Password, Token } = req.body;
  try {
    const user = await Users.findOne({ Email: Email }).exec();
    if (user === null) {
      res.status(404).json({ Msg: "User does not exist", Success: false });
      return;
    }
    jwt.verify(Token, `${config.get("jwtPass")}${user.Password.substr(user.Password.length - 5)}`);
    const comparePasswords = await bcrypt.compare(Password, user.Password)
    if (comparePasswords) {
      res.status(409).json({ Msg: 'Cannot use old password', Success: false });
      return;
    }
    user.Password = await bcrypt.hash(Password, saltRounds);
    await user.save()
    res.status(201).json({ Msg: "Password Reset Success", Success: true });
  } catch (err) {
    if (err.message === 'invalid signature' || err.message === 'jwt malformed') {
      res.status(409).json({ Msg: 'Token invalid', Success: false });
      return
    }
    res.status(409).json({ Msg: err.message, Success: false });
  }
});

router.post("/UpdateUser", async (req, res) => {
  const { Email, Password, FirstName, LastName, UserName, ID } = req.body;
  try {
    let user = await Users.findById(ID).exec();
    if (user === null) {
      res.status(404).json({ Msg: "User does not exist", Success: false });
      return;
    }
    let duplicateUser = await Users.find({
      '_id': {$ne: ID},
      $or: [{ Email: Email }, { UserName: UserName }],
    }).exec();
    if(duplicateUser.length>=1) {
      res.status(409).json({ Msg: 'UserName/Email already taken', Success: false });
    } else{
      if (Password.length === 0) {
        await Users.updateOne({ '_id': ID }, { Email, UserName, FirstName, LastName })
      }
      else {
        let newPassword = await bcrypt.hash(Password, saltRounds);
        await Users.updateOne({ '_id': ID }, { Email, Password: newPassword, UserName, FirstName, LastName })
      }
      res.status(201).json({ Msg: "Updated user profile data", Success: true, clientInfo: { Email, UserName, FirstName, LastName } });
    }
  } catch (err) {
    console.log(err);
    res.status(409).json({ Msg: err.message, Success: false }); 
  }
});

module.exports = router;
