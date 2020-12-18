//Setting up express server

const express = require("express");
const path = require("path");
const fs = require("fs");
const { nanoid } = require("nanoid");
const app = express();

const PORT = process.env.PORT || 8080;
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes

app.get("/api/notes", function (req, res) {
  //Read file
  const readFile = JSON.parse(
    fs.readFileSync("db/db.json", {
      encoding: "utf-8",
    })
  );

  //Send JSON response
  res.json(readFile);
});

app.post("/api/notes", function (req, res) {
  //Read file
  const readFile = JSON.parse(
    fs.readFileSync("db/db.json", {
      encoding: "utf-8",
    })
  );

  // Giving each note a unique id
  const noteSave = {
    title: req.body.title,
    text: req.body.text,
    id: nanoid(),
  };

  //Push the new object into the array
  readFile.push(noteSave);

  // Write file
  fs.writeFileSync("db/db.json", JSON.stringify(readFile));
  res.json(readFile);
});

//Route to delete the note
app.delete("/api/notes/:id", function (req, res) {
  // Read file

  //New array
  let newNotes = [];
  let readFile = JSON.parse(
    fs.readFileSync("db/db.json", {
      encoding: "utf-8",
    })
  );

  //New array equals read file
  newNotes = readFile;

  //Defining the id
  const checkId = req.params.id;

  //Filtering the id out
  newNotes = newNotes.filter(({ id }) => id !== checkId);

  res.json(newNotes);

  //Rewriting the notes after deleting the note
  fs.writeFileSync("db/db.json", JSON.stringify(newNotes));
});

//HTML routes

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(PORT, function () {
  console.log("App listening on PORT:" + PORT);
});
