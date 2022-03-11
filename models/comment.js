const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  pokeID: {
    type: Number,
    required: true,
    unique: true,
  },
  PokeName: {
    type: String,
  },
  Comment: [
    {
      UserName: {
        type: String,
      },
      CommentBody: {
        type: String,
      },
      CommentDate: {
        type: Date,
        default: Date.now(),
      },
      Likes: [
        { type: mongoose.Schema.Types.ObjectId, unique: true, ref: "Users" },
      ],
    },
  ],
});

module.exports = Comment = mongoose.model("Comment", CommentSchema);
