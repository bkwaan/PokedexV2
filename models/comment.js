const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  UserName: {
    type: String,
    required: true,
  },
  Likes: [
    {
      UserName: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
    },
  ],
  Comment: {
      type: String,
      required: true
  },
  Date: {
    type: Date,
    default: Date.now()
  },

});

modules.export = Comment = mongoose.model("Comment", CommentSchema);
