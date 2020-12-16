const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.send("Welcome to the Note Taker Page!");
});

app.listen(PORT, function () {
  console.log("App listening on PORT:" + PORT);
});

//Set public folder as a static file SEND file function static directory that can be assigned
