const { Router } = require("express");
const mongoose = require("mongoose");
const moment = require("moment");

const { ensureAuth } = require("../middleware/auth");
const { ensureSignUp, ensureCreator } = require("../middleware/user");

const Post = mongoose.model("posts");
const Comment = mongoose.model("comments");

const router = new Router();


router.get("/getposts",ensureAuth,ensureSignUp, async (req,res)=>{
  try {
    const posts = await Post.find({});
    // console.log(posts);
    res.status(200).json({ message: "Got posts", posts });
  } catch (error) {
    res.status(500).send({
      error: "Something went wrong while getting posts",
    });
  }
})

router.post(
  "/create",
  ensureAuth,
  ensureSignUp,
  ensureCreator,
  async (req, res) => {
    try {
      // Logic to Create Post

      const post = await Post.create({
        ...req.body,
        userId: req.user._id,
      });

      console.log(post);

      res.status(201).send({
        id: post._id,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        error: "Something went wrong",
      });
    }
  }
);

router.put(
  "/create",async (req, res) => {
    try {
      // console.log(req.body);
      const _id=req.body._id;
      const post=await Post.findById(_id);

      for(key in req.body)
      {
         post[key]=req.body[key];
      }
      await post.save();
      res.status(201).json(_id);


    } catch (error) {
      // console.log(error);
      res.status(500).send({
        error: "Something went wrong",
      });
    }
  }
);

router.get("/view/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;
    // console.log(postId);
    const post = await Post.findById(postId);

    const postDate = moment(post.createdAt).format("MMMM Do YYYY");

    const commentList = await Comment.find({ postId, depth: 1 });

    const postInfo={
      ...post._doc,
      postDate:postDate,
      commentList:commentList,
    }
    // console.log(postInfo);
    res.status(200).json(postInfo);
  } catch (error) {
    console.log(error);
    res.redirect(`${baseUrl}/error500`);
  }
});

router.delete("/delete",async (req,res)=>{
  try {
    const _id=req.query.postId;
    const postId=_id;
    console.log(postId);
    const delRes=await Post.deleteOne({_id});
    const delcom=await Comment.deleteMany({postId});
    res.status(200).json({
      postDelete: delRes,
      commentsDelete: delcom
    });

  } catch (error) {
    console.log(error);
    res.redirect(`${baseUrl}/error500`);
  }
});


module.exports = router;
