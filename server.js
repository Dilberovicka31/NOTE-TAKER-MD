const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, ""));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", function (req, res) {});
app.post("/api/notes", function (req, res) {
  //Access the POSTed data in req.body
  //Use the fs module to read the file
  //Parse the file contents with JSON.parse()
  //Push req.body to the array list
  //JSN.stringify the array list back into a JSON string
  //Then save the contents back to teh db.json wtih fs
});

app.delete("/api/notes/:id", function (req, res) {
  //Access the :id from req.params.id
  //Use fs module to read the file
  //Then parse teh file contents  JSON.parse

  //Use the array.filter to filter out teh id
  myArray = myArray.filter(({ id }) => id !== req.params.id);
});

app.listen(PORT, function () {
  console.log("App listening on PORT:" + PORT);
});

//STORE object for doing all the
