const express = require("express");
const router = express.Router();
const Comment = require("../models/comment");

// Add a comment
router.post("/AddComment", async (req, res) => {
  const { PokeID, UserName, CommentBody } = req.body;
  try {
    let comment = await Comment.findOne({ pokeID: PokeID }).exec();
    if (!comment) {
      let newComment = new Comment({
        pokeID: PokeID,
        Comment: [{ UserName, CommentBody }],
      });
      await newComment.save();
      return res.status(209).json({
        Msg: "Comment has been added",
        Success: true,
      });
    }

    comment.Comment.push({ UserName, CommentBody });
    await comment.save();
    res.status(209).json({
      Msg: "Comment has been added",
      Success: true,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
});

//Get Comment
router.get("/GetComment/pokeID/:pokeID", async (req, res) => {
  const { pokeID } = req.params;
  console.log(pokeID)
  try {
    let comment = await Comment.findOne({ pokeID }).exec();
    if (!comment) {
      return res.status(404).json({
        Msg: "Pokemon has no comments",
        Success: false,
      });
    }
    res.status(209).json({
      Success: true,
      Data: comment.Comment,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});


module.exports = router;
