const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport');
const cors = require('cors')
require('dotenv').config();
const keys = require('./config/keys');
const path = require("path");

mongoose.connect(keys.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

if (process.env.NODE_ENV === "production") {
  // app.use(express.static("client/build"));
  
  app.use(express.static(path.join(__dirname, "../client", "build")));
}

app.use(passport.initialize());
require('./config/passport');

app.use("/", require("./routes/index"))
app.use("/users", require("./routes/users"))
app.use("/books", require("./routes/books"))


app.get("*", async (req, res) => {
  res.sendFile(path.join(__dirname, "../client", "build", "index.html"))
})
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})