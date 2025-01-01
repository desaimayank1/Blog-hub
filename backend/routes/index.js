const { Router } = require("express");
const mongoose = require("mongoose");

const User = mongoose.model("users");
const Post = mongoose.model("posts");
const Comment=mongoose.model("comments");

const { ensureAuth } = require("../middleware/auth");
const { ensureSignUp, ensureNewUser } = require("../middleware/user");

const router = new Router();


router.patch(
  "/role",
  ensureAuth,
  ensureNewUser,
  async (req, res) => {
    try {
      const { role } = req.body;
      const user = req.user;
      user.role = Number(role);
      await user.save();
      res.status(200).send({});
    } catch (error) {
      console.log(error);
      res.status(500).send({
        error: "Something went wrong",
      });
    }
  }
);

router.get("/getuser", ensureAuth, ensureSignUp, async (req, res) => {
  try {
    // console.log(req.user);
    res.status(200).send(req.user);
  } catch (error) {
    console.log(error);
    res.redirect("/internal-server-error");
  }
});



module.exports = router;
