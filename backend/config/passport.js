const passport = require("passport");
const mongoose = require("mongoose");

const User = mongoose.model("users");

require('dotenv').config()
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID:process.env.CLIENT_ID,
      clientSecret:process.env.CLIENT_SECRET,
      callbackURL:process.env.CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      const newUser = {
        googleId: profile.id,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        displayName: profile.displayName,
        email: profile.emails[0].value,
        image: profile.photos[0].value,
      };

      try {
        let user = await User.findOne({ email: newUser.email });
        if (user) {
          // User Exists
          // console.log("EXISTS ", user);
          done(null, user);
        } else {
          // Sign Up for the first time
          user = await User.create(newUser);
          // console.log("NEW ", user);
          done(null, user);
        }
      } catch (error) {
        console.log(error);
        done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
