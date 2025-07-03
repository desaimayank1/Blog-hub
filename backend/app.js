const express = require("express"); // express 
const connectDb = require("./config/db");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const path=require("path");
const cors=require("cors");
const baseUrl=process.env.BASE_URL;
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

const corsOptions = {
  origin: `${baseUrl}`, // Replace with your frontend URL
  methods: "GET,POST,PATCH,UPDATE,DELETE,PUT", 
  credentials: true, // Allow cookies to be sent with the requests
};
app.use(cors(corsOptions));

app.use(
  session({
    secret: "mysecretkey",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: {
      httpOnly:true,
      secure: true, 
      sameSite:'None',   
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    },
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


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
