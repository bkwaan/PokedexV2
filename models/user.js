const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    UserName: {
      type: String,
      required: true,
      unique: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
    },
    Password: {
      type: String,
      required: true,
    },
    FirstName: {
      type: String,
      required: true,
    },
    LastName: {
      type: String,
      required: true,
    },
    FavouritePokemon: [
      {
        PokeID: { type: String },
      },
    ],
    ResetAuth: {
       type: String 
    },
    TwoFactSecret: { 
      type: String 
    },
    isVerified: { 
      type: Boolean, default: false 
    },
    PreviousPassword: {
      type: String
    },
  },
  { collection: "Users" }
);

module.exports = User = mongoose.model("User", UserSchema);
