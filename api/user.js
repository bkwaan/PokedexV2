const express = require("express");
const router = express.Router();
const Users = require("../models/user");
const bcrypt = require("bcrypt");

const saltRounds = 10;

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
  console.log(UserName + Password);
  try {
    let user = await Users.findOne({UserName:UserName}).exec();
    console.log(user);
    if (user!=null) {
      if(await bcrypt.compare(Password, user.Password)){
        res.status(201).send('Login Sucess');
      }
      else{
        res.status(409).send("UserName or Password is incorrect");
      }
    }
    else{
      res.status(409).send("Account does not exist");
    }

  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
