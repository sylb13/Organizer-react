const userRouter = require("./routers/userRouter");
const matterRouter = require("./routers/mattersRouter");
const calendarRouter = require("./routers/calendarRouter");

// Express for node.js
const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.json());

// Sequelize models
const models = require("./models");

// Body Parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

// Bcrypt
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

// Session
const session = require("express-session");
const req = require("express/lib/request");
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: false,
  })
);

app.use("/", userRouter);
app.use("/", matterRouter);
app.use("/", calendarRouter);
// app.use("/login", userRouter);
// app.use("/register", userRouter);
// app.use("/matters", matterRouter);
// app.use("/add-new-matter", matterRouter);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
