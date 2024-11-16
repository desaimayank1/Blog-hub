const { Router } = require("express");
const passport = require("passport");

const router = new Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
  }),
  (req, res) => {
    const user = req.user;
    console.log(user, user.role);

    if (!(user.role === 0 || user.role === 1)) {
      return res.redirect("/signup");
    }
    res.redirect("/dashboard");
  }
);

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error("Error logging out:", err);
      return res.status(500).send("An error occurred while logging out.");
    }

    // Destroy the session
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        return res.status(500).send("An error occurred while destroying the session.");
      }

      // Clear the cookie
      res.clearCookie("connect.sid"); // `connect.sid` is the default session cookie name
      res.redirect("/"); // Redirect to home or login page
    });
  });
});

module.exports = router;
