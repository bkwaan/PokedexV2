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

module.exports = router;
