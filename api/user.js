const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const Users = require("../models/user");

const saltRounds = 10;

router.post("/SignUp", async (req, res) => {
  var { FirstName, LastName, UserName, Email, Password } = req.body;
  try {
    let user = await Users.find({
      $or: [{ Email: Email }, { UserName: UserName }],
    }).exec();
    if (!user) {
      res.status(409).send("Username or Email already exists");
    }

    let user1 = new Users({
      UserName: UserName,
      Email: Email,
      Password: Password,
      FirstName: FirstName,
      LastName: LastName,
    });

    let user2 = await user1.save();
    res.status(201).send(user2);

  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
