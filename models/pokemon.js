const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PokemonSchema = new Schema({
  pokeID: {
    type: mongoose.Schema.Types.ObjectId,
    index: true,
    required: true,
    auto: true,
  },
  Name: {
    type: String,
    required: true,
  },
  Comment: [
    {
      UserNameID: {
        type: String, 
        required: true,
      },
    },
    {
      CommentBody: {
        type: String,
        required: true,
      },
    },
    {
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

module.exports = Pokemon = mongoose.model("Pokemon", PokemonSchema);
