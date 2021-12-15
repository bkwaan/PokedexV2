const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  pokeID: {
    type: Number,
    required: true,
    unique: true
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
        {
          UserID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
        },
      ],
    },
  ],
});

module.exports = Comment = mongoose.model("Comment", CommentSchema);
