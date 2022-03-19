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
const promiseFsUnlink = util.promisify(fs.unlink)
const promiseCrypto = util.promisify(crypto.randomBytes);
const handleBars = require("handlebars");
const jwt = require("jsonwebtoken");
const config = require("config");
const totp = require("otplib").totp;
const multer = require('multer');
const jwtPass = process.env.jwtPass;



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'profilePics');
  },
  filename: function (req, file, cb) {
    const { UserName } = req.body
    const name = `${UserName}-${file.originalname}`
    cb(null, name);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const upload = multer({ storage, fileFilter })

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
      VerifyToken = jwt.sign({ data: VerifyToken }, jwtPass, {
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
        token: `https://pokedex--v2.herokuapp.com/VerifyAccount/${UserName}/${VerifyToken}`, //need to update this later
        content:
          "Thank you for creating your account, please verify your account by clicking the link below.",
        firstname: user.FirstName,
        linkText: "Verify Account",
      });
      mailer("pepeinccs@outlook.com", Email, "Verify Account", template);
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
      if (!user.isVerified && jwt.verify(VerifyToken, jwtPass)) {
        user.isVerified = true;
        await user.save();
        res.status(200).json({
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
        VerifyToken = jwt.sign({ data: VerifyToken }, jwtPass, {
          expiresIn: "1h",
        });
        const html = await promiseFs("./Util/temp.html", "utf-8");
        let template = handleBars.compile(html);
        template = template({
          header: "Account Verification",
          title: "Please Verify Your Account",
          token: `https://pokedex--v2.herokuapp.com/VerifyAccount/${UserName}/${VerifyToken}`, //need to update this later
          content: "Please verify your account by clicking the link below.",
          firstname: user.FirstName,
          linkText: "Verify Account",
        });
        mailer(
          "pepeinccs@outlook.com",
          user.Email,
          "Verify Account",
          template
        );
        res.status(200).json({
          Success: true,
          msg: "New Verification link has been sent, please check your email",
        });
      }
    } else {
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
        console.log(user.ID);
        const clientInfo = {
          ID: user["_id"],
          UserName: user.UserName,
          FirstName: user.FirstName,
          LastName: user.LastName,
          Email: user.Email,
          isVerified: user.isVerified,
          FavouritePokemon: user.FavouritePokemon,
          profilePic: user.profilePic
        };
        mailer(
          "pepeinccs@outlook.com",
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
    } else {
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
          "pepeinccs@outlook.com",
          user.Email,
          "Pasword Change",
          template
        );
        res.status(200).json({
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
      const token = jwt.sign(
        {},
        `${jwtPass}${user.Password.substr(
          user.Password.length - 5
        )}`,
        {
          expiresIn: "5m",
        }
      );
      console.log(user.Password);
      const html = await promiseFs("./Util/temp.html", "utf-8");
      let template = handleBars.compile(html);
      template = template({
        header: "Password Reset",
        title: "Password reset has been requested for your account",
        token: "https://pokedex--v2.herokuapp.com/ResetPassword/" + token,
        content: "A Password Reset link was requested for your account",
        firstname: user.FirstName,
        linkText: "Reset Password",
      });
      mailer(
        "pepeinccs@outlook.com",
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
    jwt.verify(
      Token,
      `${jwtPass}${user.Password.substr(
        user.Password.length - 5
      )}`
    );
    const comparePasswords = await bcrypt.compare(Password, user.Password);
    if (comparePasswords) {
      res.status(409).json({ Msg: "Cannot use old password", Success: false });
      return;
    }
    user.Password = await bcrypt.hash(Password, saltRounds);
    await user.save();
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
      '_id': { $ne: ID },
      $or: [{ Email: Email }, { UserName: UserName }],
    }).exec();
    if (duplicateUser.length >= 1) {
      res.status(409).json({ Msg: 'UserName/Email already taken', Success: false });
    } else {
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

// Favouriting Pokemon
router.put("/FavouritePoke", async (req, res) => {
  let { userID, PokeID } = req.body;
  try {
    let user = await Users.updateOne(
      { _id: userID },
      { $addToSet: { FavouritePokemon: PokeID } }
    );
    if (user.modifiedCount === 1) {
      return res.status(200).json({
        Msg: "Pokemon Successfully liked",
        Data: PokeID,
        Succcess: true,
      });
    }
    console.log(user);
    res.status(400).json({
      Msg: "Pokemon is already in the favourites list",
      Succcess: false,
    });
  } catch (err) {
    console.log(err);
    res.status(409).json({ Msg: err.message, Success: false });
  }
});

//unFavourite Pokemon
router.put("/UnfavouritePoke", async (req, res) => {
  let { userID, PokeID } = req.body;
  try {
    let user = await Users.updateOne(
      { _id: userID },
      { $pull: { FavouritePokemon: PokeID } }
    );
    if (user.modifiedCount === 1) {
      return res.status(200).json({
        Msg: "Pokemon Successfully unliked",
        Data: PokeID,
        Succcess: true,
      });
    }
    res.status(400).json({
      Msg: "Pokemon is not in the favourites list",
      Succcess: false,
    });
  } catch (err) {
    console.log(err);
    res.status(409).json({ Msg: err.message, Success: false });
  }
});


router.post("/UpdateProfilePic", upload.single('profilePic'), async (req, res) => {
  const { UserName } = req.body;
  try {
    const user = await Users.findOne({ UserName }).exec()
    if (user != null) {
      await promiseFsUnlink(`profilePics/${user.profilePic}`)
      user.profilePic = req.file.filename
      await user.save()
      res.status(200).json({ Msg: 'Upload success', Success: true, filepath: req.file.filename })
    } else {
      res.status(404), json({ Msg: 'User not found', Succcess: failed })
    }
  } catch (err) {
    console.log(err)
    res.status(409).json({ Msg: err.message, Success: false })
  }
})


router.get("/GetUserData/:ID", async (req, res) => {
  const { ID } = req.params
  try {
    const user = await Users.findOne({ _id: ID }).exec()
    if (user != null) {
      const clientInfo = {
        UserName: user.UserName,
        FirstName: user.FirstName,
        LastName: user.LastName,
        Email: user.Email,
        isVerified: user.isVerified,
        FavouritePokemon: user.FavouritePokemon,
        profilePic: user.profilePic
      };
      res.status(200).json({ Msg: 'user found', Success: true, clientInfo })
    } else {
      res.status(404).json({ Msg: 'User Not found', Success: false })
    }
  } catch (err) {
    res.status(409).json({ Msg: err.message, Success: false })
  }
})


module.exports = router;
