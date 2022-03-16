const express = require("express");
const router = express.Router();
const Comment = require("../models/comment");

router.put("/LikeComment", async (req, res) => {
  let { commentID, userID } = req.body;
  try {
    let comment = await Comment.updateOne(
      {
        "Comment._id": commentID,
      },
      { $addToSet: { "Comment.$.Likes": userID } }
    );
    if (comment.modifiedCount === 1) {
      return res.status(200).json({
        Msg: "Comment was succesfully liked",
        Success: true,
        Data: comment,
      });
    }
    res.status(400).json({ Msg: "Comment was not updated", Success: false });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

router.put("/UnlikeComment", async (req, res) => {
  let { commentID, userID } = req.body;
  try {
    let comment = await Comment.updateOne(
      {
        "Comment._id": commentID,
      },
      {
        $pull: { "Comment.$.Likes": userID },
      }
    );
    console.log(comment);
    if (comment.modifiedCount === 1) {
      return res.status(200).json({
        Msg: "Comment was succesfully unliked",
        Success: true,
        Data: comment,
      });
    }
    res.status(400).json({ Msg: "Like was not updated", Success: false });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

// Add a comment
router.post("/AddComment", async (req, res) => {
  const { PokeID, UserName, CommentBody, PokeName, UserId } = req.body;
  try {
    console.log(UserId)
    let comment = await Comment.findOne({ pokeID: PokeID }).exec();
    const CommentDate = new Date()
    if (!comment) {
      let newComment = new Comment({
        pokeID: PokeID,
        PokeName,
        Comment: [{ UserName, CommentBody, UserId, CommentDate }],
      });
      console.log(newComment.Comment);
      await newComment.save();
      console.log(comment)
      return res.status(209).json({
        Data: newComment.Comment[0],
        Msg: "Comment has been added",
        Success: true,
      });
    }
    
    comment.Comment.push({ UserName, CommentBody, UserId, CommentDate });
    await comment.save();
    res.status(209).json({
      Data: comment.Comment[comment.Comment.length - 1],
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

//Delete a comment
router.delete("/DeleteComment", async (req, res) => {
  const { PokeID, id } = req.body;
  try {
    let comment = await Comment.findOne({ pokeID: PokeID }).exec();
    if (!comment) {
      return res.status(404).json({
        Msg: "Comment not found",
        Success: false,
      });
    }
    comment.Comment.pull(id);
    await comment.save();
    res.status(209).json({
      Msg: "Comment has been removed",
      Success: true,
    });
  } catch (err) {
    if (err.errors["Comment.0._id"].kind === "ObjectId") {
      return res.status(404).send("Comment not found");
    }
    res.status(500).send("Server Error");
  }
});

router.put("/UpdateComment", async (req, res) => {
  let { _id, CommentBody } = req.body;
  try {
    let comment = await Comment.updateOne(
      { "Comment._id": _id },
      { $set: { "Comment.$.CommentBody": CommentBody } }
    );
    if (comment.acknowledged) {
      return res.status(200).json({
        Msg: "Comment was succesfully updated",
        Success: true,
        Data: req.body,
      });
    }
    res.status(400).json({ Msg: "Comment was not updated", Success: false });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});


router.get("/GetUserComments/:ID", async (req, res) => {
  const { ID } = req.params
  try {
    const comments = await Comment.find({ "Comment.UserId": ID }).exec()
    if (comments.length > 0) {
      const filteredComments = []
      comments.forEach((x) => {
        x.Comment.forEach((y) => {
          if(y.UserId.equals(ID)){
            filteredComments.push({...y.toObject(),pokeID:x.pokeID, pokeName:x.PokeName})
          }
        })
      })
      filteredComments.sort((x, y) => {
        return ((Date.parse(y.CommentDate) - Date.parse(x.CommentDate)))
      })
      console.log(filteredComments)
      // console.log(filteredComments)
      res.status(200).json({
        Msg: "Comments found",
        Success: true,
        payload: filteredComments
      });
    } else {
      res.status(404).json({ Msg: "Comments not found", Success: false });
    }
  } catch (err) {
    console.log(err)
    res.status(500).send("Server Error");
  }
});

module.exports = router;
