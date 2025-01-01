const { Router } = require("express");
const mongoose = require("mongoose");

const router = new Router();

const { ensureAuth } = require("../middleware/auth");
const Comment = mongoose.model("comments");

router.post("/create", ensureAuth, async (req, res) => {
  try {
    const author = req.user;

    const comment = await Comment.create({
      ...req.body,
      author: author.displayName,
      authorImage: author.image,
    });

    console.log(comment);
    res.status(201).send(comment);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: "Something went wrong",
    });
  }
});

router.get("/fetch/reply", ensureAuth, async (req, res) => {
  try {
    const { parentId, depth,postId } = req.query;
    // console.log(parentId,depth,postId);
  
    const replyList = await Comment.find({
      parentId: parentId,
      depth: Number(depth),
      postId:postId
    });
    // console.log(replyList);
    res.status(200).send({
      replyList,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: "Something went wrong",
    });
  }
});

module.exports = router;
