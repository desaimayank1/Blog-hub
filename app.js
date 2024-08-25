const express = require("express"); // express 
const connectDb = require("./config/db");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const path=require("path");

const passport = require("passport");

const app = express(); //making server from express
const PORT = 3000;

connectDb();

require("./models/User");
require("./models/Post");
require("./models/Comment");

app.set("view engine", "ejs");  // to use ejs throughout the server
app.set("views", path.join(__dirname,"views")); //done
app.use(express.static(path.join(__dirname,"public"))); //This means that any files in the "public" directory of your project can be accessed directly via the URL.
app.use(express.json()); // this tells express app that you need to receive json data as your body (express.json() this is middleware)

app.use(
  session({
    secret: "mysecretkey",
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

require("./config/passport");

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", require("./routes/auth"));
app.use("/", require("./routes/index"));
app.use("/post", require("./routes/post"));
app.use("/comment", require("./routes/comment"));
app.use("/upload", require("./routes/upload"));

app.get("/internal-server-error", (req, res) => {
  res.render("error-500");
});

app.get("/*", (req, res) => {
  res.render("error-404");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
