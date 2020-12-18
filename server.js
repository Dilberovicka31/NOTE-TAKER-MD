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
  const readFile = JSON.parse(
    fs.readFileSync("db/db.json", {
      encoding: "utf-8",
    })
  );
  console.log(readFile);
  res.json(readFile);
});

app.post("/api/notes", function (req, res) {
  console.log(req.body);

  const readFile = JSON.parse(
    fs.readFileSync("db/db.json", {
      encoding: "utf-8",
    })
  );
  const noteSave = {
    title: req.body.title,
    text: req.body.text,
    id: nanoid(),
  };
  readFile.push(noteSave);

  fs.writeFileSync("db/db.json", JSON.stringify(readFile));
  res.json(readFile);
});

app.delete("/api/notes/:id", function (req, res) {
  console.log(req.params.id);
  //Access the :id from req.params.id
  //Use fs module to read the file
  //Then parse teh file contents  JSON.parse
  //Use the array.filter to filter out th id
  // myArray = myArray.filter(({ id }) => id !== req.params.id);
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(PORT, function () {
  console.log("App listening on PORT:" + PORT);
});
