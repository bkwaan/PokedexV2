const express = require("express");
const router = express.Router();
const Users = require("../models/user");
const bcrypt = require("bcrypt");

const saltRounds = 10;

router.post("/SignUp", async (req, res) => {
  var { FirstName, LastName, UserName, Email, Password } = req.body;
  try {
    let user = await Users.find({
      $or: [{ Email: Email }, { UserName: UserName }],
    }).exec();

    console.log("My log" + user)
    if (user) {
      res.status(409).send("Username or Email already exists");
    }
    let user1 = new Users({
      UserName,
      Email,
      Password,
      FirstName,
      LastName,
    });
    await user1.save();
    res.status(201).send(user1);
  } catch (err) {
    console.log(err);
  }
});


router.get("/Login", async (req, res) => {
  var { UserName, Password } = req.body;
  console.log(UserName + Password);
  try {
    let user = await Users.findOne({UserName:UserName, Password: Password }).exec();
    console.log(user);
    if (!user) {
      res.status(409).send("UserName or Password is incorrect");
    }

    else {
      res.status(201).send('Login Sucess');
    }

  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
